import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Sample uploaded files
    const sampleFiles = [
      {
        id: 1,
        name: "masjid-agung.jpg",
        url: "/majestic-masjid.png",
        type: "image/jpeg",
        size: 245760,
        uploadedAt: "2024-01-15T10:00:00Z",
        uploadedBy: "Admin Kemenag",
      },
      {
        id: 2,
        name: "bantuan-sosial.jpg",
        url: "/bantuan-sosial.jpg",
        type: "image/jpeg",
        size: 189440,
        uploadedAt: "2024-01-14T08:00:00Z",
        uploadedBy: "Admin Kemenag",
      },
      {
        id: 3,
        name: "pengajian.jpg",
        url: "/pengajian.jpg",
        type: "image/jpeg",
        size: 156672,
        uploadedAt: "2024-01-13T15:30:00Z",
        uploadedBy: "Admin Kemenag",
      },
    ]

    return NextResponse.json({ success: true, data: sampleFiles })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Simulate file upload
    const uploadedFile = {
      id: Date.now(),
      name: file.name,
      url: `/uploads/${file.name}`,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Admin Kemenag",
    }

    return NextResponse.json({ success: true, data: uploadedFile })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "File ID required" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "File deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
