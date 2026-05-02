"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home, Package, Users, Wrench, PlayCircle,
  Star, UserCircle, BookOpen, LogOut, LogIn
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TrialBanner } from "@/components/TrialBanner"
import { useSupabaseClient } from "@/supabase"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home",       short: "Home",      href: "/",           icon: Home },
  { name: "Projects",   short: "Projects",  href: "/projects",   icon: Wrench },
  { name: "Workshop",   short: "Workshop",  href: "/workshop",   icon: PlayCircle },
  { name: "Resources",  short: "Resources", href: "/resources",  icon: BookOpen },
  { name: "Reviews",    short: "Reviews",   href: "/tools",      icon: Star },
  { name: "Contractors",short: "Pros",      href: "/contractors", icon: Users },
  { name: "Inventory",  short: "Inventory", href: "/inventory",  icon: Package },
]

export function Navigation() {
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = useSupabaseClient()
  const [user, setUser] = useState<any>(null)

  // Fixes the "timing" issue by listening to auth changes in real-time
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (event === 'SIGNED_OUT') {
        router.push('/')
        router.refresh() // Force refresh to clear cookies/middleware cache
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
      {/* Top Desktop Nav */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="font-serif text-xl font-bold text-leather">
            Steadcraft
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-leather">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/account">
                <Button variant="outline" className="border-leather text-leather hover:bg-leather/10">
                  Account
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signup?mode=signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-leather text-white">Join Now</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/97 backdrop-blur-lg md:hidden">
        <div className="flex h-16 items-center overflow-x-auto no-scrollbar px-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px]",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}>
                <Icon className="h-5 w-5" />
                <span className="text-[9px] font-semibold">{item.short}</span>
              </Link>
            )
          })}
          
          {user && (
            <Link href="/account" className={cn(
              "flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px]",
              pathname === '/account' ? "bg-primary/10 text-primary" : "text-muted-foreground"
            )}>
              <UserCircle className="h-5 w-5" />
              <span className="text-[9px] font-semibold">Account</span>
            </Link>
          )}

          {user && (
            <button onClick={handleSignOut} className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 min-w-[56px] text-muted-foreground">
              <LogOut className="h-5 w-5" />
              <span className="text-[9px] font-semibold">Sign Out</span>
            </button>
          )}
        </div>
      </nav>

      <div className="h-16 md:hidden" /> {/* Spacer */}
      <TrialBanner />
    </>
  )
}
