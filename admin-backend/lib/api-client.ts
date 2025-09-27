class ApiClient {
  private baseUrl: string
  private token: string | null

  constructor() {
    this.baseUrl = "/api"
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

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "API request failed")
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

    if (response.success && response.token) {
      this.setToken(response.token)
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
    return this.request("/menus", {
      method: "PUT",
      body: JSON.stringify({ id, ...menuData }),
    })
  }

  async deleteMenu(id: number) {
    return this.request(`/menus?id=${id}`, {
      method: "DELETE",
    })
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
    return this.request("/news", {
      method: "PUT",
      body: JSON.stringify({ id, ...newsData }),
    })
  }

  async deleteNews(id: number) {
    return this.request(`/news?id=${id}`, {
      method: "DELETE",
    })
  }

  // Upload methods
  async getUploads() {
    return this.request("/uploads")
  }

  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return this.request("/uploads", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    })
  }

  async deleteUpload(id: number) {
    return this.request(`/uploads?id=${id}`, {
      method: "DELETE",
    })
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
    return this.request("/users", {
      method: "PUT",
      body: JSON.stringify({ id, ...userData }),
    })
  }

  async deleteUser(id: number) {
    return this.request(`/users?id=${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()
