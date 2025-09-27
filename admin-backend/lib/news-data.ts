export interface NewsItem {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  image: string
  status: "draft" | "published"
  author: string
  date: string
  createdAt: string
  updatedAt: string
}

export const getNews = (): NewsItem[] => {
  if (typeof window === "undefined") return []

  const savedNews = localStorage.getItem("adminNews")
  if (savedNews) {
    return JSON.parse(savedNews)
  }

  return []
}

export const getPublishedNews = (): NewsItem[] => {
  return getNews()
    .filter((news) => news.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getNewsByCategory = (category: string): NewsItem[] => {
  return getPublishedNews().filter((news) => news.category === category)
}

export const saveNews = (news: NewsItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminNews", JSON.stringify(news))
  }
}
