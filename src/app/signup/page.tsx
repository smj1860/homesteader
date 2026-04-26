"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@/supabase"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Mode = "signin" | "signup"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = useSupabaseClient()

  const [mode, setMode] = useState<Mode>("signup")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoading(true)

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        toast({
          title: "Account created!",
          description: "Welcome to Rootstock. Let's get building.",
        })
        router.push("/projects")
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        toast({
          title: "Welcome back!",
          description: "You are now signed in.",
        })
        router.push("/projects")
      }
    } catch (err: any) {
      toast({
        title: mode === "signup" ? "Sign up failed" : "Sign in failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnonymous = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInAnonymously()
      if (error) throw error
      toast({
        title: "Continuing as guest",
        description: "You can create an account any time to save your work.",
      })
      router.push("/projects")
    } catch (err: any) {
      toast({
        title: "Could not continue as guest",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto flex max-w-md flex-col items-center px-4 pt-12">

        {/* Logo mark */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Leaf className="h-8 w-8 fill-current" />
          </div>
          <h1 className="font-headline text-3xl font-bold text-foreground">Rootstock</h1>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "signup"
              ? "Create your free account to start building."
              : "Welcome back — sign in to continue."}
          </p>
        </div>

        <Card className="w-full border-border/40 bg-card shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="font-headline text-xl text-card-foreground">
              {mode === "signup" ? "Create account" : "Sign in"}
            </CardTitle>
            <CardDescription className="text-card-foreground/70">
              {mode === "signup"
                ? "Free forever. No credit card required."
                : "Enter your email and password below."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-background border-border/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                  className="bg-background border-border/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-bold h-12 text-sm uppercase tracking-wider"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : mode === "signup" ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-border/40 text-card-foreground h-12 text-sm"
              onClick={handleAnonymous}
              disabled={isLoading}
            >
              Continue as Guest
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center pb-6 pt-0">
            {mode === "signup" ? (
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            )}
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing up you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </main>
    </div>
  )
}