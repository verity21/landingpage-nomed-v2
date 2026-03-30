import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ViewTransitionLike = {
  ready: Promise<void>;
};

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    );

    const nextTheme = isDark ? "light" : "dark";
    const applyTheme = () => setTheme(nextTheme);

    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => ViewTransitionLike;
    };

    if (typeof documentWithTransition.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    const transition = documentWithTransition.startViewTransition(() => {
      flushSync(applyTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        } as KeyframeAnimationOptions,
      );
    });
  }, [duration, isDark, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn(
        "theme-toggle-btn relative inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 hover:scale-105",
        isDark
          ? "border-slate-700 bg-slate-900 text-white hover:border-slate-500"
          : "border-slate-300 bg-white text-black hover:border-slate-400",
        className,
      )}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      data-testid="theme-toggle-btn"
      {...props}
    >
      {isDark ? <Sun size={18} className="theme-toggle-icon text-white" /> : <Moon size={18} className="theme-toggle-icon text-black" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
