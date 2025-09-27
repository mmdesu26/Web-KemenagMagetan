import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Hardcoded admin credentials (can be moved to database later)
    const adminUsers = [
      { id: 1, username: "admin", password: "admin123", role: "admin", name: "Administrator" },
      { id: 2, username: "superadmin", password: "super123", role: "superadmin", name: "Super Administrator" },
    ]

    const user = adminUsers.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session token
    const sessionToken = btoa(
      JSON.stringify({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString(),
      }),
    )

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      },
      token: sessionToken,
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
