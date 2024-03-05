export const generateIconCss = (className?: string) =>
  className?.includes("h-") || className?.includes("w-")
    ? className
    : `${className} h-6 w-6`;
