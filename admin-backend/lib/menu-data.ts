export interface MenuItem {
  id: number
  name: string
  path: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const getMenus = (): MenuItem[] => {
  if (typeof window === "undefined") return []

  const savedMenus = localStorage.getItem("adminMenus")
  if (savedMenus) {
    return JSON.parse(savedMenus)
  }

  return []
}

export const getActiveMenus = (): MenuItem[] => {
  return getMenus()
    .filter((menu) => menu.isActive)
    .sort((a, b) => a.order - b.order)
}

export const saveMenus = (menus: MenuItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminMenus", JSON.stringify(menus))
  }
}
