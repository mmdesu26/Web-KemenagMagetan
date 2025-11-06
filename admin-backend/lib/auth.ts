export interface AdminUser {
  username: string
  loginTime: string
  role: "admin" | "superadmin"
}

export const getAdminAuth = (): AdminUser | null => {
  if (typeof window === "undefined") return null

  const auth = localStorage.getItem("adminAuth")
  if (!auth) return null

  try {
    return JSON.parse(auth)
  } catch {
    return null
  }
}

export const isAdminAuthenticated = (): boolean => {
  return getAdminAuth() !== null
}

export const logoutAdmin = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminAuth")
  }
}

export const requireAuth = () => {
  if (typeof window !== "undefined" && !isAdminAuthenticated()) {
    window.location.href = "/admin/login"
  }
}

