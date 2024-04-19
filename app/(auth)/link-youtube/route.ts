import { google } from "googleapis"
import { NextResponse } from "next/server"

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  if (code) {
    console.log(searchParams.get("code"))
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const response = await google
      .youtube({
        version: "v3",
        auth: oauth2Client,
      })
      .channels.list({
        part: ["snippet"],
        mine: true,
      })
    console.log(response?.data?.items![0].snippet?.title)
    return NextResponse.json({
      title: response?.data?.items![0].snippet?.title,
    })
  } else {
    return NextResponse.redirect(await getNewToken())
  }
}

const getNewToken = async () => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.readonly"],
  })
  return url
}
