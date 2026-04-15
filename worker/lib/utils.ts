export function log(...args: unknown[]) {
  console.info('[worker:info]', new Date().toISOString(), '-', ...args);
}

export function sevenDays() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toUTCString();
}
