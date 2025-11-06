const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = data?.message || "Permintaan gagal"
    throw new Error(message)
  }
  return data?.data ?? null
}

export const apiClient = {
  async get(path, params) {
    const url = new URL(`${BASE_URL}${path}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value)
        }
      })
    }
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    return handleResponse(response)
  },
}
