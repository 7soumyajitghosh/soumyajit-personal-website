// §11 Human-like planner + §12 Impact analyzer.

import type { ImplementationPlan, ImpactReport, ParsedFile, SymbolNode } from "../types";
import { SymbolGraph } from "../graph/SymbolGraph";

const AUTH_AREAS = [
  "authentication architecture", "user model", "session handling",
  "frontend login", "backend auth", "database", "middleware", "tests",
];

export class HumanPlanner {
  /** Understand → inspect → affected → deps → risks → plan → smallest safe change. */
  plan(
    request: string,
    relevant: ParsedFile[],
    symbols: Map<string, SymbolNode>,
    impact: ImpactReport | null,
  ): ImplementationPlan {
    const lower = request.toLowerCase();
    const isAuth = /login|auth|oauth|google|sso|session|jwt/i.test(request);
    const areas = isAuth ? AUTH_AREAS : this.deriveAreas(relevant);
    const investigation = areas.map((area) => ({
      area,
      findings: relevant
        .filter((f) => this.areaMatch(area, f.path, f.content))
        .slice(0, 3)
        .map((f) => `${f.path}: ${f.symbols.slice(0, 4).map((s) => s.name).join(", ") || "no symbols"}`),
    })).map((x) => ({ ...x, findings: x.findings.length ? x.findings : ["no direct match — needs broader search"] }));

    const affectedComponents = (impact ? [...impact.directlyAffected, ...impact.potentiallyAffected] : relevant.map((f) => f.path)).slice(0, 12);
    const dependencies = [...new Set(relevant.flatMap((f) => f.imports.map((i) => i.to)))].slice(0, 12);
    const risks = this.risks(request, relevant);
    const matchedSymbols = [...symbols.values()]
      .map((n) => n.symbol.name)
      .filter((name, idx, arr) =>
        arr.indexOf(name) === idx &&
        (lower.includes(name.toLowerCase()) || relevant.some((f) => f.symbols.some((s) => s.name === name))),
      )
      .slice(0, 6);
    const steps = this.stepsFor(request, relevant, affectedComponents, matchedSymbols);

    const verification: string[] = [
      "typecheck passes",
      "targeted tests pass",
      "no unrelated files changed",
      "manual repro of the reported behavior",
    ];
    if (/secur|auth|login|oauth|google|sso|session|jwt|token|secret|xss|inject/.test(lower)) {
      verification.push("security scan passes");
    }
    if (/perf|optimiz|slow|latency|cache|bundle|render|n\+1/.test(lower)) {
      verification.push("performance budget verified");
    }
    if (/api|route|endpoint|controller|schema|migration/.test(lower)) {
      verification.push("API and schema contracts verified");
    }
    if (matchedSymbols.length > 0) {
      verification.push(`callers of [${matchedSymbols.join(", ")}] verified`);
    }

    return {
      request,
      investigation,
      affectedComponents,
      dependencies,
      risks,
      steps,
      verification,
    };
  }

  private deriveAreas(relevant: ParsedFile[]): string[] {
    const dirs = [...new Set(relevant.map((f) => f.path.split("/").slice(0, 2).join("/")))];
    return (dirs.length ? dirs : ["relevant modules"]).slice(0, 8);
  }

  private areaMatch(area: string, path: string, content: string): boolean {
    const key = area.split(" ")[0].toLowerCase();
    return path.toLowerCase().includes(key) || content.toLowerCase().includes(key);
  }

  private risks(request: string, relevant: ParsedFile[]): string[] {
    const hay = `${request}\n${relevant.map((f) => f.content).join("\n")}`;
    const out = ["regression in callers of touched symbols"];
    if (/auth|session|token|password|login|oauth/i.test(hay)) out.push("auth/session breakage — verify login, logout, expiry paths");
    if (/prisma|migration|sql/i.test(hay)) out.push("schema change may require migration + seed updates");
    if (/await/i.test(hay)) out.push("async ordering / race conditions");
    return out;
  }

  private stepsFor(
    request: string,
    relevant: ParsedFile[],
    affected: string[],
    matchedSymbols: string[] = [],
  ): ImplementationPlan["steps"] {
    const primary = relevant[0]?.path ?? affected[0] ?? "src/";
    const symDetail = matchedSymbols.length ? ` Target symbols: ${matchedSymbols.join(", ")}.` : "";
    return [
      { title: "Reproduce / confirm current behavior", detail: `Run existing tests + manual repro for "${request.slice(0, 80)}" before editing.${symDetail}`, files: [], smallestSafeChange: true },
      { title: "Implement smallest safe change", detail: `Touch the narrowest surface in ${primary} that satisfies the request.${symDetail}`, files: [primary], smallestSafeChange: true },
      { title: "Wire dependents + update contracts", detail: `Update callers, API contracts, and types only as needed.${symDetail}`, files: affected.slice(0, 4), smallestSafeChange: false },
      { title: "Add/adjust tests", detail: "Cover normal, edge, and failure paths for the changed behavior.", files: [], smallestSafeChange: false },
    ];
  }
}

export class ImpactAnalyzer {
  constructor(private graph = new SymbolGraph()) {}

  analyze(
    targetFile: string,
    targetSymbol: string | null,
    files: ParsedFile[],
    symbols: Map<string, SymbolNode>,
  ): ImpactReport {
    const graphSymbols = this.graph.build(files);
    const effectiveSymbols = symbols.size > 0 ? symbols : graphSymbols;
    const direct = new Set<string>();
    const potential = new Set<string>();
    const reasoning: string[] = [];

    if (targetSymbol) {
      const id = `${targetFile}::${targetSymbol}`;
      const node = effectiveSymbols.get(id) ?? this.graph.get(id);
      const graphCallers = this.graph.callers(id);
      if (node || graphCallers.length) {
        const directCallers = new Set<string>([
          ...(node?.calledBy ?? []),
          ...graphCallers.map((c) => c.id),
        ]);
        for (const caller of directCallers) {
          const f = caller.split("::")[0];
          if (f) direct.add(f);
        }
        reasoning.push(`${directCallers.size} direct caller(s) of ${targetSymbol}`);
        const trans = new Set<string>([
          ...this.graph.transitiveDependents(id, 3),
        ]);
        const seen = new Set([id]);
        let frontier = [...directCallers];
        for (let d = 0; d < 2 && frontier.length; d++) {
          const next: string[] = [];
          for (const c of frontier) {
            if (seen.has(c)) continue;
            seen.add(c);
            trans.add(c);
            const cn = effectiveSymbols.get(c) ?? this.graph.get(c);
            if (!cn) continue;
            potential.add(cn.symbol.file);
            next.push(...cn.calledBy);
          }
          frontier = next;
        }
        for (const t of trans) {
          const tf = t.split("::")[0];
          if (tf && tf !== targetFile) potential.add(tf);
        }
      } else {
        reasoning.push(`symbol ${targetSymbol} not found — falling back to file-level analysis`);
      }
    } else {
      const fileSyms = files.find((f) => f.path === targetFile)?.symbols ?? [];
      let symbolCallerCount = 0;
      for (const s of fileSyms) {
        const id = `${targetFile}::${s.name}`;
        for (const callerNode of this.graph.callers(id)) {
          if (callerNode.symbol.file !== targetFile) {
            direct.add(callerNode.symbol.file);
            symbolCallerCount++;
          }
        }
        for (const transId of this.graph.transitiveDependents(id, 2)) {
          const tf = transId.split("::")[0];
          if (tf && tf !== targetFile) potential.add(tf);
        }
      }
      if (symbolCallerCount > 0) {
        reasoning.push(`${symbolCallerCount} symbol caller(s) across graph for ${targetFile}`);
      }
    }
    // file-level: who imports the target
    for (const f of files) {
      for (const imp of f.imports) {
        if (imp.to.includes(targetFile) || targetFile.includes(imp.to) || imp.to.includes(targetFile.split("/").pop() ?? "\u0000")) {
          direct.add(f.path);
        }
      }
    }
    direct.delete(targetFile);
    for (const d of direct) potential.delete(d);
    const tests = files.map((f) => f.path).filter((p) =>
      /\.test\.|\.spec\.|__tests__/.test(p) &&
      [...direct, targetFile].some((t) => p.toLowerCase().includes(t.split("/").pop()?.split(".")[0] ?? "\u0000")));
    const total = direct.size + potential.size;
    const risk: ImpactReport["risk"] = total === 0 ? "low" : total <= 4 ? "medium" : "high";
    reasoning.push(`${direct.size} file(s) directly import/call the target; ${potential.size} transitively reachable`);
    return {
      target: targetSymbol ? `${targetFile}::${targetSymbol}` : targetFile,
      directlyAffected: [targetFile, ...direct].slice(0, 12),
      potentiallyAffected: [...potential].slice(0, 12),
      testsRequiringUpdates: tests.slice(0, 8),
      risk,
      reasoning,
      note: "Engineering diagnostic based on static references — not an absolute prediction. Verify with tests.",
    };
  }
}
