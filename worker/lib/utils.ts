export function log(...args: unknown[]) {
  console.info('[worker:info]', new Date().toISOString(), '-', ...args);
}
