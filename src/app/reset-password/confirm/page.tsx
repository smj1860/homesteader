"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@/supabase"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordConfirmPage() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  // Supabase sends an auth event when the magic link is clicked
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setSessionReady(true)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" })
      return
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" })
      return
    }
    setIsLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      toast({ title: "Could not update password", description: error.message, variant: "destructive" })
    } else {
      setDone(true)
      setTimeout(() => router.push("/"), 2500)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto flex max-w-md flex-col items-center px-4 pt-12">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Leaf className="h-8 w-8 fill-current" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-foreground">Set new password</h1>
        </div>

        <Card className="w-full border-border/40 bg-card shadow-sm">
          {done ? (
            <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <div>
                <p className="font-headline font-bold text-foreground">Password updated!</p>
                <p className="text-sm text-muted-foreground mt-1">Taking you back to the app…</p>
              </div>
            </CardContent>
          ) : !sessionReady ? (
            <CardContent className="pt-8 pb-8 flex flex-col items-center gap-3 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Verifying your reset link…</p>
            </CardContent>
          ) : (
            <>
              <CardHeader className="pb-4">
                <CardTitle className="font-headline text-xl">Choose a new password</CardTitle>
                <CardDescription>At least 6 characters.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      className="bg-background border-border/40"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      placeholder="Same as above"
                      className="bg-background border-border/40"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold h-12 text-sm uppercase tracking-wider"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  )
}
