import { google } from "googleapis"

export const currentProfile = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  try {
    const response = await google
      .youtube({
        version: "v3",
        auth: oauth2Client,
      })
      .channels.list({
        part: ["snippet"],
        mine: true,
      })
      .then((response) => console.log(response.data.items![0].snippet?.title))
  } catch (e) {}
}
