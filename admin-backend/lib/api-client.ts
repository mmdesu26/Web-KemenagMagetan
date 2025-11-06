class ApiClient {
  private baseUrl: string
  private token: string | null

  constructor() {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"
    this.baseUrl = `${base.replace(/\/$/, "")}/admin`
    this.token = null
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token)
    }
  }

  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token")
    }
    return null
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const token = this.getToken()

    const isFormData = options.body instanceof FormData

    const config: RequestInit = {
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "API request failed")
      }

      return data
    } catch (error) {
      console.error("API request error:", error)
      throw error
    }
  }

  // Auth methods
  async login(username: string, password: string) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    if (response.success && response.data?.token) {
      this.setToken(response.data.token)
    }

    return response
  }

  async logout() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token")
    }
  }

  // Menu methods
  async getMenus() {
    return this.request("/menus")
  }

  async createMenu(menuData: any) {
    return this.request("/menus", {
      method: "POST",
      body: JSON.stringify(menuData),
    })
  }

  async updateMenu(id: number, menuData: any) {
    return this.request(`/menus/${id}`, {
      method: "PUT",
      body: JSON.stringify(menuData),
    })
  }

  async deleteMenu(id: number) {
    return this.request(`/menus/${id}`, { method: "DELETE" })
  }

  // News methods
  async getNews(params?: { category?: string; status?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append("category", params.category)
    if (params?.status) searchParams.append("status", params.status)
    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())

    const query = searchParams.toString()
    return this.request(`/news${query ? `?${query}` : ""}`)
  }

  async createNews(newsData: any) {
    return this.request("/news", {
      method: "POST",
      body: JSON.stringify(newsData),
    })
  }

  async updateNews(id: number, newsData: any) {
    return this.request(`/news/${id}`, {
      method: "PUT",
      body: JSON.stringify(newsData),
    })
  }

  async deleteNews(id: number) {
    return this.request(`/news/${id}`, { method: "DELETE" })
  }

  // Upload methods
  async getUploads() {
    return this.request("/uploads")
  }

  async uploadFiles(files: FileList | File[]) {
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append("files", file)
    })

    return this.request("/uploads", {
      method: "POST",
      body: formData,
    })
  }

  async deleteUpload(id: number) {
    return this.request(`/uploads/${id}`, { method: "DELETE" })
  }

  // User methods
  async getUsers() {
    return this.request("/users")
  }

  async createUser(userData: any) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id: number, userData: any) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: number) {
    return this.request(`/users/${id}`, { method: "DELETE" })
  }

  async updateUserPassword(id: number, password: string) {
    return this.request(`/users/${id}/password`, {
      method: "PATCH",
      body: JSON.stringify({ password }),
    })
  }
}

export const apiClient = new ApiClient()
