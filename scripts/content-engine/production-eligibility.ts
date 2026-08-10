import type { PublishReadinessReport } from "./types.ts";

export type AssessedProject<T> = {
  project: T;
  readiness: PublishReadinessReport;
};

/** Single production allowlist boundary shared by every future consumer. */
export function onlyProductionEligible<T>(items: readonly AssessedProject<T>[]): AssessedProject<T>[] {
  return items.filter(({ readiness }) => readiness.productionEligible);
}
