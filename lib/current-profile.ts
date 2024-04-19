import { auth, redirectToSignIn } from "@clerk/nextjs"
import { db } from "./db"

export const currentProfile = async () => {
  const { userId, user } = auth()
  console.log(userId)
  if (!userId) return redirectToSignIn()
  let profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })
  if (!profile) {
    console.log("making profile")
    profile = await db.profile.create({
      data: {
        userId,
        email: user?.emailAddresses[0].emailAddress || "",
        name: user?.firstName + " " + user?.lastName || "",
        imageUrl: user?.profileImageUrl || "",
      },
    })
  }
}
