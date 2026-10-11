// §13 Code generation brain (small safe increments) + §18 test→fix→test loop
// + §19 refactoring brain + §22 git/history brain.

import type { ImplementationPlan, ParsedFile } from "../types";

// ---- §13 ----
export interface GenerationStep { title: string; code: string; checks: string[]; }

function toPascalIdentifier(raw: string, fallback = "Feature"): string {
  const words = raw
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1 && !/^(the|and|for|with|into|from|add|fix|update|create)$/i.test(w))
    .slice(0, 3);
  if (!words.length) return fallback;
  const joined = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  return /^[A-Za-z]/.test(joined) ? joined : `${fallback}${joined}`;
}

function toCamelIdentifier(pascal: string): string {
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export class CodeGenerationBrain {
  /** PLAN → SMALL PIECE → TYPECHECK → TEST → CONTINUE. Generates a staged plan,
   *  never one giant blob. Emits concrete, reviewable TypeScript increments with checks. */
  stage(
    requestOrPlan: string | ImplementationPlan,
    files: Array<string | ParsedFile> = [],
    styleGuidance = "",
    plan?: ImplementationPlan | null,
  ): GenerationStep[] {
    const resolvedPlan = typeof requestOrPlan === "object" && requestOrPlan !== null ? requestOrPlan : (plan ?? null);
    const requestText = typeof requestOrPlan === "string" ? requestOrPlan : requestOrPlan.request;
    const filePaths = files.map((f) => (typeof f === "string" ? f : f.path));
    const parsedFiles = files.filter((f): f is ParsedFile => typeof f === "object" && f !== null);
    const target = filePaths[0] ?? resolvedPlan?.affectedComponents[0] ?? "src/index.ts";
    const primarySymbol = parsedFiles[0]?.symbols[0]?.name;
    const entity = toPascalIdentifier(primarySymbol ?? requestText, "Operation");
    const fnName = primarySymbol && /^[a-zA-Z_$][\w$]*$/.test(primarySymbol)
      ? toCamelIdentifier(primarySymbol)
      : `execute${entity}`;
    const styleNote = styleGuidance.split("\n")[0]?.slice(0, 90) ?? "follow repo conventions";
    const stepSummary = resolvedPlan?.steps[1]?.title ?? requestText.slice(0, 70);

    const step1Code = [
      `// Target: ${target} — ${styleNote}`,
      `export interface ${entity}Input {`,
      `  readonly id: string;`,
      `  readonly payload?: Record<string, unknown>;`,
      `}`,
      ``,
      `export interface ${entity}Result {`,
      `  readonly ok: boolean;`,
      `  readonly id: string;`,
      `  readonly data?: Record<string, unknown>;`,
      `  readonly error?: string;`,
      `}`,
    ].join("\n");

    const step2Code = [
      `// Core implementation for: ${stepSummary}`,
      `export async function ${fnName}(input: ${entity}Input): Promise<${entity}Result> {`,
      `  try {`,
      `    const normalizedId = input.id.trim();`,
      `    return {`,
      `      ok: true,`,
      `      id: normalizedId,`,
      `      data: input.payload ?? {},`,
      `    };`,
      `  } catch (err) {`,
      `    const message = err instanceof Error ? err.message : String(err);`,
      `    return { ok: false, id: input.id, error: message };`,
      `  }`,
      `}`,
    ].join("\n");

    const step3Code = [
      `// Input validation & boundary guard clauses for ${target}`,
      `export function validate${entity}Input(value: unknown): asserts value is ${entity}Input {`,
      `  if (typeof value !== "object" || value === null) {`,
      `    throw new TypeError("Invalid ${entity}Input: expected a non-null object");`,
      `  }`,
      `  const candidate = value as Record<string, unknown>;`,
      `  if (typeof candidate.id !== "string" || candidate.id.trim().length === 0) {`,
      `    throw new RangeError("Invalid ${entity}Input.id: expected a non-empty string");`,
      `  }`,
      `  if (candidate.payload !== undefined && (typeof candidate.payload !== "object" || candidate.payload === null || Array.isArray(candidate.payload))) {`,
      `    throw new TypeError("Invalid ${entity}Input.payload: expected a plain object when provided");`,
      `  }`,
      `}`,
      ``,
      `export async function ${fnName}Safe(raw: unknown): Promise<${entity}Result> {`,
      `  try {`,
      `    validate${entity}Input(raw);`,
      `    return await ${fnName}(raw);`,
      `  } catch (err) {`,
      `    const message = err instanceof Error ? err.message : String(err);`,
      `    return { ok: false, id: "", error: message };`,
      `  }`,
      `}`,
    ].join("\n");

    return [
      {
        title: "Types + interfaces first",
        code: step1Code,
        checks: ["typecheck passes", "no new `any`", "names match repo conventions"],
      },
      {
        title: "Smallest working implementation",
        code: step2Code,
        checks: ["typecheck passes", "targeted test passes"],
      },
      {
        title: "Error handling + edge cases",
        code: step3Code,
        checks: ["edge-case tests pass", "no swallowed errors"],
      },
    ];
  }

  principles(): string[] {
    return [
      "readable code, meaningful names, strong types",
      "small functions, clear interfaces, predictable error handling",
      "minimal unnecessary abstraction — do not over-engineer",
      "follow existing project conventions",
    ];
  }
}

// ---- §18 test → fix → test loop ----
export interface TestLoopState { iterations: number; failures: string[]; passed: boolean; }

export class TestFixLoop {
  /** Pure policy helper: never hide failures, never rewrite tests to make
   *  incorrect code pass. Only change tests when intended behavior genuinely changed. */
  nextAction(args: { testPassed: boolean; behaviorChanged: boolean; iterations: number; maxIterations?: number }): string {
    const max = args.maxIterations ?? 5;
    if (args.testPassed) return "PASS → record result, move to next test.";
    if (args.iterations >= max) return "STOP → escalate to human with failing output + attempted fixes. Do not loop forever.";
    if (args.behaviorChanged) return "Behavior intentionally changed → update the test to the new contract AND note the change in review.";
    return "FAIL → ANALYZE failure output → FIX source code (not the test) → TEST AGAIN.";
  }

  validateTestEdit(codeChanged: boolean, intendedBehaviorChanged: boolean, testEdited: boolean): string | null {
    if (testEdited && !intendedBehaviorChanged && !codeChanged) {
      return "BLOCKED: editing tests to make incorrect code pass is forbidden.";
    }
    return null;
  }
}

// ---- §19 refactoring brain ----
export interface RefactorSignal { kind: string; location: string; detail: string; }

export class RefactoringBrain {
  inspect(files: ParsedFile[]): RefactorSignal[] {
    const signals: RefactorSignal[] = [];
    for (const f of files) {
      const lines = f.content.split("\n");
      if (lines.length > 400) signals.push({ kind: "huge-file", location: f.path, detail: `${lines.length} LOC — consider splitting` });
      const seen = new Map<string, number>();
      for (const line of lines) {
        const t = line.trim();
        if (t.length < 20) continue;
        seen.set(t, (seen.get(t) ?? 0) + 1);
      }
      for (const [line, n] of seen) {
        if (n >= 4) { signals.push({ kind: "duplication", location: f.path, detail: `repeated line ×${n}: ${line.slice(0, 80)}` }); break; }
      }
      for (const s of f.symbols) {
        const body = lines.slice(s.line - 1, s.line + 80).join("\n");
        if (body.split("\n").length > 70) signals.push({ kind: "huge-function", location: `${f.path}::${s.name}`, detail: "function body > 70 lines" });
        if (/TODO|FIXME/.test(body)) signals.push({ kind: "dead-or-todo", location: `${f.path}::${s.name}`, detail: "contains TODO/FIXME" });
      }
      if (/import.*from.*\.\.\/\.\./.test(f.content) && f.imports.length > 8) {
        signals.push({ kind: "tight-coupling", location: f.path, detail: "many deep relative imports — check boundaries" });
      }
    }
    return signals.slice(0, 20);
  }

  shouldRefactor(signal: RefactorSignal, unrelatedWork: boolean): boolean {
    if (unrelatedWork && (signal.kind === "duplication" || signal.kind === "huge-file")) return false; // avoid cosmetic churn
    return ["duplication", "huge-function", "tight-coupling", "dead-or-todo"].includes(signal.kind);
  }
}

// ---- §22 git / change-history brain ----
export interface HistoryHint { commit?: string; reason: string; safeToChange: boolean; }

export class GitHistoryBrain {
  /** Works with injected history (host runs git); pure reasoning over it. */
  interpret(args: {
    file: string; currentCode: string;
    log?: Array<{ hash: string; message: string; date: string }>;
    blame?: Array<{ line: number; author: string; message: string }>;
  }): HistoryHint {
    const { log = [], blame = [] } = args;
    if (!log.length && !blame.length) {
      return { reason: "No history available — treat strange-looking code as potentially load-bearing. Do not delete without a test proving it is dead.", safeToChange: false };
    }
    const fixy = log.filter((c) => /fix|hotfix|revert|workaround|edge|race|prod/i.test(c.message));
    if (fixy.length) {
      return { commit: fixy[0].hash, reason: `Prior fix '${fixy[0].message}' touched this area — the odd code likely guards a real constraint. Change only with a regression test.`, safeToChange: false };
    }
    return { commit: log[0]?.hash, reason: `Last change: '${log[0]?.message ?? "unknown"}'. No obvious guard signal, but verify callers before changing.`, safeToChange: true };
  }

  strangeCodeChecklist(): string[] {
    return [
      "Current implementation → git log/blame → original reason → constraint understood → then decide",
      "Never assume old code is useless because it looks unusual",
    ];
  }
}
