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

export const validateAdminCredentials = (username: string, password: string): AdminUser | null => {
  if (typeof window === "undefined") return null

  // Get stored admin users
  const savedUsers = localStorage.getItem("adminUsers")
  if (!savedUsers) {
    // Fallback to hardcoded credentials if no users stored
    const validCredentials = [
      { username: "admin", password: "admin123", role: "admin" as const },
      { username: "superadmin", password: "super123", role: "superadmin" as const },
    ]

    const validUser = validCredentials.find((cred) => cred.username === username && cred.password === password)

    if (validUser) {
      return {
        username: validUser.username,
        loginTime: new Date().toISOString(),
        role: validUser.role,
      }
    }
    return null
  }

  try {
    const users = JSON.parse(savedUsers)
    const user = users.find((u: any) => u.username === username && u.isActive)

    if (user) {
      // In a real app, you'd hash and compare passwords
      // For demo, we'll use the hardcoded passwords
      const validCredentials = [
        { username: "admin", password: "admin123" },
        { username: "superadmin", password: "super123" },
      ]

      const isValidPassword = validCredentials.some((cred) => cred.username === username && cred.password === password)

      if (isValidPassword) {
        // Update last login
        const updatedUsers = users.map((u: any) =>
          u.username === username ? { ...u, lastLogin: new Date().toISOString() } : u,
        )
        localStorage.setItem("adminUsers", JSON.stringify(updatedUsers))

        return {
          username: user.username,
          loginTime: new Date().toISOString(),
          role: user.role,
        }
      }
    }

    return null
  } catch {
    return null
  }
}
