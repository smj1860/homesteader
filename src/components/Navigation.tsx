"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home, Package, Users, Wrench, Leaf, PlayCircle,
  Star, UserCircle, BookOpen, LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TrialBanner } from "@/components/TrialBanner"
import { useSupabaseClient } from "@/supabase"

// ── Primary nav items (shown everywhere) ─────────────────────────────────────
const navItems = [
  { name: "Home",       short: "Home",      href: "/",           icon: Home },
  { name: "Projects",   short: "Projects",  href: "/projects",   icon: Wrench },
  { name: "Workshop",   short: "Workshop",  href: "/workshop",   icon: PlayCircle },
  { name: "Resources",  short: "Resources", href: "/resources",  icon: BookOpen },
  { name: "Reviews",    short: "Reviews",   href: "/tools",      icon: Star },
  { name: "Contractors",short: "Pros",      href: "/contractors", icon: Users },
  { name: "Inventory",  short: "Inventory", href: "/inventory",  icon: Package },
  { name: "Account",    short: "Account",   href: "/account",    icon: UserCircle },
]

export function Navigation() {
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = useSupabaseClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <>
      {/* ── DESKTOP — top bar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block border-b border-border/40 bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-background shadow-sm">
              <Leaf className="h-6 w-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-xl font-bold text-foreground leading-none">
                SteadCraft
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary/70 mt-0.5">
                The Homestead Is Our Craft
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-0.5 lg:gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              )
            })}
            {/* Sign out — desktop */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-colors whitespace-nowrap ml-1"
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden lg:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE — bottom bar (scrollable) ──────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/40 bg-background/97 backdrop-blur-lg">
        <div
          className="flex h-16 items-center overflow-x-auto no-scrollbar px-2 gap-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px] transition-colors shrink-0",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px] font-semibold whitespace-nowrap">{item.short}</span>
              </Link>
            )
          })}
          {/* Sign out — mobile */}
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px] text-muted-foreground shrink-0"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-[9px] font-semibold">Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Trial banner — desktop only, below top nav */}
      <div className="hidden md:block">
        <TrialBanner />
      </div>
    </>
  )
}
