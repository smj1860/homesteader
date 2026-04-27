"use client"

import { useState } from "react"
import { useSupabaseClient } from "@/supabase"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Loader2, CheckCircle2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ResetPasswordPage() {
  const supabase = useSupabaseClient()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password/confirm`,
    })

    if (error) {
      toast({
        title: "Could not send reset email",
        description: error.message,
        variant: "destructive",
      })
    } else {
      setSent(true)
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
          <h1 className="font-headline text-2xl font-bold text-foreground">Reset your password</h1>
          <p className="text-center text-sm text-muted-foreground">
            Enter your account email and we&apos;ll send a reset link.
          </p>
        </div>

        <Card className="w-full border-border/40 bg-card shadow-sm">
          {sent ? (
            <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <div>
                <p className="font-headline font-bold text-foreground">Check your inbox</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We sent a reset link to <strong>{email}</strong>. It expires in 1 hour.
                </p>
              </div>
              <Button variant="outline" className="mt-2 border-border/40" asChild>
                <Link href="/signup">Back to sign in</Link>
              </Button>
            </CardContent>
          ) : (
            <>
              <CardHeader className="pb-4">
                <CardTitle className="font-headline text-xl">Forgot password</CardTitle>
                <CardDescription>We&apos;ll email you a secure link to set a new one.</CardDescription>
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
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold h-12 text-sm uppercase tracking-wider"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center pb-6 pt-0">
                <Link href="/signup" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-3 w-3" /> Back to sign in
                </Link>
              </CardFooter>
            </>
          )}
        </Card>

      </main>
    </div>
  )
}
