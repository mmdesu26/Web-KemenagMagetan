import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Default menu items for Kemenag website
    const defaultMenus = [
      { id: 1, name: "Beranda", url: "/", order: 1, isActive: true, icon: "home" },
      { id: 2, name: "Profil", url: "/profil", order: 2, isActive: true, icon: "user" },
      { id: 3, name: "Berita", url: "/berita", order: 3, isActive: true, icon: "newspaper" },
      { id: 4, name: "Layanan", url: "/layanan", order: 4, isActive: true, icon: "service" },
      { id: 5, name: "Agenda", url: "/agenda", order: 5, isActive: true, icon: "calendar" },
      { id: 6, name: "Kontak", url: "/kontak", order: 6, isActive: true, icon: "phone" },
    ]

    return NextResponse.json({ success: true, data: defaultMenus })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const menuData = await request.json()

    // Simulate saving to database
    const newMenu = {
      id: Date.now(),
      ...menuData,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: newMenu })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    // Simulate updating in database
    const updatedMenu = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: updatedMenu })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Menu ID required" }, { status: 400 })
    }

    // Simulate deleting from database
    return NextResponse.json({ success: true, message: "Menu deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
