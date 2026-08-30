"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className="size-10 p-0 border-[3px] border-border bg-secondary-background rounded-none shadow-[2px_2px_0px_0px_var(--border)] text-foreground">
        <Sun className="size-5" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      className="size-10 p-0 border-[3px] border-border bg-secondary-background rounded-none shadow-[2px_2px_0px_0px_var(--border)] hover:bg-accent-muted hover:text-white transition-all text-foreground"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Açık Mod'a Geç" : "Koyu Mod'a Geç"}
    >
      {isDark ? (
        <Sun className="size-5 stroke-foreground" />
      ) : (
        <Moon className="size-5 stroke-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
