/**
 * Tiny classnames helper. shadcn / Aceternity components paste in with
 * `import { cn } from "@/lib/utils"` expectations. Returns a single
 * space-separated string of truthy class fragments.
 *
 * For more complex merges (e.g. de-duping conflicting tailwind classes),
 * upgrade to `clsx` + `tailwind-merge` when a component actually needs it.
 */

export function cn(
  ...args: Array<string | number | false | null | undefined>
): string {
  return args.filter(Boolean).join(" ");
}
