import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/mysql"

// ✅ GET all news (with filter + pagination)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let sql = "SELECT * FROM news WHERE 1=1"
    const params: any[] = []

    if (category && category !== "all") {
      sql += " AND category = ?"
      params.push(category)
    }

    if (status && status !== "all") {
      sql += " AND status = ?"
      params.push(status)
    }

    sql += " ORDER BY createdAt DESC LIMIT ? OFFSET ?"
    params.push(limit, (page - 1) * limit)

    const data = await query(sql, params)

    const countRes: any = await query(
      "SELECT COUNT(*) as total FROM news WHERE 1=1" +
        (category && category !== "all" ? " AND category = ?" : "") +
        (status && status !== "all" ? " AND status = ?" : ""),
      params.slice(0, params.length - 2) // exclude limit & offset
    )

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: countRes[0].total,
        totalPages: Math.ceil(countRes[0].total / limit),
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ POST add news
export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, category, status, image } = await request.json()
    const now = new Date()

    const result: any = await query(
      "INSERT INTO news (title, content, excerpt, category, status, image, author, createdAt, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        content,
        excerpt,
        category,
        status,
        image,
        "Admin Kemenag",
        now,
        status === "published" ? now : null,
      ]
    )

    return NextResponse.json({
      success: true,
      data: { id: result.insertId, title, content, category, status, image },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ PUT update news
export async function PUT(request: NextRequest) {
  try {
    const { id, title, content, excerpt, category, status, image } = await request.json()
    const now = new Date()

    await query(
      "UPDATE news SET title=?, content=?, excerpt=?, category=?, status=?, image=?, updatedAt=?, publishedAt=? WHERE id=?",
      [
        title,
        content,
        excerpt,
        category,
        status,
        image,
        now,
        status === "published" ? now : null,
        id,
      ]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ DELETE news
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "News ID required" }, { status: 400 })
    }

    await query("DELETE FROM news WHERE id = ?", [id])

    return NextResponse.json({ success: true, message: "News deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
