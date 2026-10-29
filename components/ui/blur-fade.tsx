import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

// Magic UI's BlurFade (magicui.design/docs/components/blur-fade), ported from Motion to a CSS
// keyframe (see --animate-blur-fade in globals.css). Content arrives with a short blur and lift
// when the page loads, is fully visible even if JavaScript never runs, and does not move at all
// under reduced motion (motion-safe).
export function BlurFade({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  return (
    <Tag
      className={cn("motion-safe:animate-blur-fade", className)}
      style={{ animationDelay: `${0.04 + delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
