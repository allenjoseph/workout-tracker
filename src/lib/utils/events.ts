export function debounce<T = void>(
  func: (...args: unknown[]) => T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
