"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Users, Wrench, Leaf, PlayCircle, Star, UserCircle, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { TrialBanner } from "@/components/TrialBanner"

const navItems = [
  { name: "Dashboard",    href: "/",           icon: Home },
  { name: "DIY Projects", href: "/projects",   icon: Wrench },
  { name: "Workshop",     href: "/workshop",   icon: PlayCircle },
  { name: "Resources",    href: "/resources",  icon: BookOpen },
  { name: "Tool Reviews", href: "/tools",      icon: Star },
  { name: "Contractors",  href: "/contractors", icon: Users },
  { name: "Inventory",    href: "/inventory",  icon: Package },
  { name: "Account",      href: "/account",    icon: UserCircle },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-lg md:top-0 md:bottom-auto md:border-t-0 md:border-b border-border/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-background shadow-sm">
              <Leaf className="h-6 w-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-xl font-bold text-foreground leading-none">
                SteadCraft
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary/80 mt-1 hidden sm:block">
                The Homestead Is Our Craft
              </span>
            </div>
          </Link>

          <div className="flex flex-1 justify-center md:justify-end">
            <div className="flex gap-1 sm:gap-2 lg:gap-4 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-md px-2 py-2 text-[10px] font-medium transition-colors md:flex-row md:text-sm whitespace-nowrap",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Trial countdown banner — renders just below the top nav, hidden on mobile bottom nav */}
      <div className="hidden md:block">
        <TrialBanner />
      </div>
    </>
  )
}
