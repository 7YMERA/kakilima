import { useId } from "react";
import { cn } from "@/lib/cn";

// Magic UI's DotPattern (magicui.design/docs/components/dot-pattern), rebuilt as a static SVG
// <pattern> so it renders on the server and costs nothing at runtime. The glow animation is
// left out on purpose. Here it draws the raised dots of the yellow tactile paving on a kaki lima.
export function DotPattern({
  size = 14,
  radius = 2.5,
  className,
}: {
  size?: number;
  radius?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg aria-hidden="true" focusable="false" className={cn("pointer-events-none", className)}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
