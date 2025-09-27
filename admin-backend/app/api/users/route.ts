import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const adminUsers = [
      {
        id: 1,
        username: "admin",
        name: "Administrator",
        email: "admin@kemenagmagetan.go.id",
        role: "admin",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        lastLogin: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        username: "superadmin",
        name: "Super Administrator",
        email: "superadmin@kemenagmagetan.go.id",
        role: "superadmin",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        lastLogin: "2024-01-15T09:30:00Z",
      },
    ]

    return NextResponse.json({ success: true, data: adminUsers })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    const newUser = {
      id: Date.now(),
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }

    return NextResponse.json({ success: true, data: newUser })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    const updatedUser = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: updatedUser })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
