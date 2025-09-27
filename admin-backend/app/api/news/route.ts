import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Sample news data
    const sampleNews = [
      {
        id: 1,
        title: "Pelaksanaan Sholat Jumat di Masjid Agung",
        content:
          "Kemenag Magetan mengumumkan jadwal sholat Jumat di Masjid Agung dengan protokol kesehatan yang ketat.",
        excerpt: "Jadwal sholat Jumat dengan protokol kesehatan ketat",
        category: "Keagamaan",
        status: "published",
        image: "/majestic-masjid.png",
        author: "Admin Kemenag",
        publishedAt: "2024-01-15T10:00:00Z",
        createdAt: "2024-01-15T09:00:00Z",
      },
      {
        id: 2,
        title: "Program Bantuan Sosial Ramadhan 2024",
        content: "Kemenag Magetan meluncurkan program bantuan sosial untuk masyarakat kurang mampu di bulan Ramadhan.",
        excerpt: "Program bantuan sosial untuk masyarakat kurang mampu",
        category: "Sosial",
        status: "published",
        image: "/bantuan-sosial.jpg",
        author: "Admin Kemenag",
        publishedAt: "2024-01-14T08:00:00Z",
        createdAt: "2024-01-14T07:00:00Z",
      },
    ]

    let filteredNews = sampleNews

    if (category && category !== "all") {
      filteredNews = filteredNews.filter((news) => news.category === category)
    }

    if (status && status !== "all") {
      filteredNews = filteredNews.filter((news) => news.status === status)
    }

    const startIndex = (page - 1) * limit
    const paginatedNews = filteredNews.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      data: paginatedNews,
      pagination: {
        page,
        limit,
        total: filteredNews.length,
        totalPages: Math.ceil(filteredNews.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newsData = await request.json()

    const newNews = {
      id: Date.now(),
      ...newsData,
      author: "Admin Kemenag",
      createdAt: new Date().toISOString(),
      publishedAt: newsData.status === "published" ? new Date().toISOString() : null,
    }

    return NextResponse.json({ success: true, data: newNews })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    const updatedNews = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString(),
      publishedAt: updateData.status === "published" ? new Date().toISOString() : null,
    }

    return NextResponse.json({ success: true, data: updatedNews })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "News ID required" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "News deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
