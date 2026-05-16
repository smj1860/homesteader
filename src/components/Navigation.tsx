"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Home, Package, Users, Wrench, PlayCircle,
  Star, UserCircle, BookOpen, LogOut, Sprout
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TrialBanner } from "@/components/TrialBanner"
import { useSupabaseClient } from "@/supabase"
import { Button } from "@/components/ui/button"

const FOREST = '#264228'
const GOLD   = '#A88032'

const navItems = [
  { name: "Home",         short: "Home",      href: "/",             icon: Home },
  { name: "Projects",     short: "Projects",  href: "/projects",     icon: Wrench },
  { name: "Homesteading", short: "Homestead", href: "/homesteading", icon: Sprout },
  { name: "Workshop",     short: "Workshop",  href: "/workshop",     icon: PlayCircle },
  { name: "Resources",    short: "Resources", href: "/resources",    icon: BookOpen },
  { name: "Reviews",      short: "Reviews",   href: "/tools",        icon: Star },
  { name: "Contractors",  short: "Pros",      href: "/contractors",  icon: Users },
  { name: "Inventory",    short: "Inventory", href: "/inventory",    icon: Package },
]

export function Navigation() {
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = useSupabaseClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (event === 'SIGNED_OUT') {
        router.push('/')
        router.refresh()
      }
    })
    return () => subscription.unsubscribe()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* ── Top Desktop Nav ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/apple-touch-icon.png"
              alt="SteadCraft"
              width={34}
              height={34}
              className="rounded-md"
              priority
            />
            <span
              className="font-serif text-xl font-bold leading-none"
              style={{ color: FOREST }}
            >
              SteadCraft
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{
                  color: pathname === item.href ? FOREST : `${FOREST}99`,
                  fontWeight: pathname === item.href ? 700 : 500,
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
<div className="flex items-center gap-2 shrink-0">
  {user ? (
    <Button
      variant="outline"
      className="border-border/50 hover:bg-primary/5"
      style={{ color: FOREST }}
      asChild
    >
      <Link href="/account">Account</Link>
    </Button>
  ) : (
    <>
      <Button variant="ghost" style={{ color: FOREST }} asChild>
        <Link href="/signup?mode=signin">Sign In</Link>
      </Button>
      <Button
        className="font-bold"
        style={{ backgroundColor: FOREST, color: '#F7F3EB' }}
        asChild
      >
        <Link href="/signup">Join Now</Link>
      </Button>
    </>
  )}
</div>
        </div>
      </nav>

      {/* ── Mobile Bottom Nav ───────────────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/97 backdrop-blur-lg md:hidden">
        <div className="flex h-16 items-center overflow-x-auto no-scrollbar px-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px]"
                style={{
                  backgroundColor: isActive ? `${FOREST}12` : 'transparent',
                  color: isActive ? FOREST : `${FOREST}77`,
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[9px] font-semibold">{item.short}</span>
              </Link>
            )
          })}

          {user && (
            <Link
              href="/account"
              className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px]"
              style={{
                backgroundColor: pathname === '/account' ? `${FOREST}12` : 'transparent',
                color: pathname === '/account' ? FOREST : `${FOREST}77`,
              }}
            >
              <UserCircle className="h-5 w-5" />
              <span className="text-[9px] font-semibold">Account</span>
            </Link>
          )}

          {user && (
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px]"
              style={{ color: `${FOREST}77` }}
            >
              <LogOut className="h-5 w-5" />
              <span className="text-[9px] font-semibold">Sign Out</span>
            </button>
          )}
        </div>
      </nav>

      <div className="h-16 md:hidden" />
      <TrialBanner />
    </>
  )
}
