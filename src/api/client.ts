/**
 * Mock API client.
 *
 * Every domain module in this folder goes through the same contract so a real
 * backend can be connected later without touching the UI: replace the mock
 * implementation of a module with real fetch()/axios calls that return the
 * same shapes — the types in src/types and the context store stay unchanged.
 */

export const DEFAULT_DELAY = 550

export function delay(ms = DEFAULT_DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
