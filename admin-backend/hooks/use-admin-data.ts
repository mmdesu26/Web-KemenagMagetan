"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"

export function useAdminMenus() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getMenus()
        if (response.success) {
          setMenus(response.data.filter((menu: any) => menu.isActive))
        }
      } catch (err) {
        setError("Failed to fetch menus")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [])

  return { menus, loading, error }
}

export function useAdminNews(category?: string) {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getNews({
        category,
        status: "published",
      })
      if (response.success) {
        setNews(response.data)
      }
    } catch (err) {
      setError("Failed to fetch news")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [category])

  return { news, loading, error, refetch: fetchNews }
}
