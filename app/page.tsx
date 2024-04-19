import { currentProfile } from "@/lib/current-profile"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const Home = async () => {
  currentProfile()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}

export default Home
