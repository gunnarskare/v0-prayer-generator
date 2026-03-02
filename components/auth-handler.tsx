"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function AuthHandler() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if there's a hash fragment with auth data
      const hash = window.location.hash
      console.log("[v0] AuthHandler - hash:", hash)
      if (!hash || hash.length <= 1) {
        console.log("[v0] AuthHandler - no hash found, exiting")
        return
      }

      // Parse the hash fragment
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get("access_token")
      const refreshToken = params.get("refresh_token")
      const type = params.get("type")
      
      console.log("[v0] AuthHandler - type:", type)
      console.log("[v0] AuthHandler - has accessToken:", !!accessToken)
      console.log("[v0] AuthHandler - has refreshToken:", !!refreshToken)

      if (accessToken && refreshToken) {
        const supabase = createClient()
        
        // Set the session from the tokens
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (error) {
          console.error("[v0] AuthHandler - Error setting session:", error)
          return
        }
        
        console.log("[v0] AuthHandler - Session set successfully, redirecting...")

        // Clear the hash from the URL
        window.history.replaceState(null, "", window.location.pathname)

        // Redirect based on type
        if (type === "recovery") {
          router.push("/auth/nytt-passord")
        } else if (type === "signup" || type === "email_change") {
          // Email verified - redirect to dashboard or home
          router.push("/oversikt")
        } else {
          router.push("/")
        }
      }
    }

    handleAuthCallback()
  }, [router])

  return null
}
