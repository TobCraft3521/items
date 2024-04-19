import { currentProfile } from "@/lib/current-profile"

const Home = async () => {
  currentProfile()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}

export default Home
