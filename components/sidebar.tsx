"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Building2,
  Handshake,
  MapPin,
  Package,
  Target,
  Users,
  GraduationCap,
  Scale,
  BarChart3,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
  User,
  Settings,
  Bell,
  Store,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

interface MenuItem {
  id: string
  label: string
  icon: any
  description?: string
  badge?: string
  badgeColor?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Bảng điều khiển",
    icon: LayoutDashboard,
    description: "Tổng quan hệ thống",
  },
  {
    id: "organization",
    label: "Cơ cấu/Tổ chức",
    icon: Building2,
    description: "Quản lý cơ cấu tổ chức",
    children: [
      {
        id: "user",
        label: "Người dùng",
        icon: User,
        description: "Danh sách người dùng",
        badge: "3",
      },
      {
        id: "group",
        label: "Đội/nhóm",
        icon: Users,
        description: "Danh sách nhóm",
        badge: "2",
        badgeColor: "bg-yellow-500",
      },
    ],
  },
  {
    id: "partners",
    label: "Đối tác",
    icon: Handshake,
    description: "Quản lý đối tác",
  },
  {
    id: "tour",
    label: "Tour",
    icon: MapPin,
    description: "Quản lý tour du lịch",
  },
  {
    id: "products-management",
    label: "Sản phẩm & Nhà cung cấp",
    icon: Package,
    description: "Quản lý sản phẩm và nhà cung cấp",
    children: [
      {
        id: "products",
        label: "Sản phẩm",
        icon: Package,
        description: "Quản lý sản phẩm",
      },
      {
        id: "suppliers",
        label: "Nhà cung cấp",
        icon: Store,
        description: "Quản lý nhà cung cấp",
      },
    ],
  },
  {
    id: "quotations",
    label: "Báo giá",
    icon: FileText,
    description: "Quản lý báo giá",
    badge: "2",
    badgeColor: "bg-purple-500",
  },
  {
    id: "opportunities",
    label: "Cơ hội",
    icon: Target,
    description: "Quản lý cơ hội kinh doanh",
  },
  {
    id: "tour-customers",
    label: "Khách hàng tour",
    icon: Users,
    description: "Quản lý khách hàng tour",
  },
  {
    id: "events",
    label: "Sự kiện",
    icon: Calendar,
    description: "Quản lý sự kiện",
    badge: "5",
    badgeColor: "bg-blue-500",
    children: [
      {
        id: "events-list",
        label: "Sự kiện",
        icon: Calendar,
        description: "Danh sách sự kiện",
        badge: "3",
      },
      {
        id: "events-approval",
        label: "Phê duyệt",
        icon: CheckCircle,
        description: "Phê duyệt sự kiện",
        badge: "2",
        badgeColor: "bg-yellow-500",
      },
    ],
  },
  {
    id: "training",
    label: "Đào tạo",
    icon: GraduationCap,
    description: "Quản lý đào tạo",
  },
  {
    id: "scorecard",
    label: "Bảng điểm cân bằng",
    icon: Scale,
    description: "Balanced Scorecard",
  },
  {
    id: "statistics",
    label: "Thống kê",
    icon: BarChart3,
    description: "Báo cáo và thống kê",
  },
]

const bottomMenuItems = [
  {
    id: "notifications",
    label: "Thông Báo",
    icon: Bell,
    badge: "5",
    badgeColor: "bg-red-500",
  },
  {
    id: "settings",
    label: "Cài Đặt",
    icon: Settings,
  },
]

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["events", "products-management"])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const Icon = item.icon
    const isActive = currentView === item.id
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedMenus.includes(item.id)
    const isChildActive = item.children?.some((child) => currentView === child.id)

    return (
      <div key={item.id}>
        <Button
          variant={isActive || isChildActive ? "default" : "ghost"}
          className={cn(
            "w-full justify-start h-auto p-3 mb-1",
            isActive || isChildActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100",
            isCollapsed && "justify-center px-2",
            level > 0 && "ml-4 w-[calc(100%-1rem)]",
          )}
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.id)
            } else {
              onViewChange(item.id)
            }
          }}
        >
          <div className="flex items-center space-x-3 w-full">
            <Icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
            {!isCollapsed && (
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge
                        className={cn(
                          "text-xs px-2 py-0.5",
                          item.badgeColor || "bg-blue-500",
                          (isActive || isChildActive) && "bg-white text-blue-600",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {hasChildren && (
                      <div className="ml-2">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    )}
                  </div>
                </div>
                {item.description && <p className="text-xs opacity-75 mt-0.5">{item.description}</p>}
              </div>
            )}
          </div>
        </Button>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="ml-4 space-y-1">{item.children?.map((child) => renderMenuItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">🎉 Gala Manager</h1>
              <p className="text-sm text-gray-500">Hệ thống quản lý sự kiện</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Nguyễn Văn Admin</p>
              <p className="text-xs text-gray-500">Quản lý hệ thống</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">{menuItems.map((item) => renderMenuItem(item))}</nav>

      <Separator />

      {/* Bottom Navigation */}
      <div className="p-4 space-y-1">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3",
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100",
                isCollapsed && "justify-center px-2",
              )}
              onClick={() => onViewChange(item.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge
                        className={cn(
                          "text-xs px-2 py-0.5",
                          item.badgeColor || "bg-blue-500",
                          isActive && "bg-white text-blue-600",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Button>
          )
        })}

        <Separator className="my-4" />

        {/* Logout */}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-auto p-3 text-red-600 hover:bg-red-50",
            isCollapsed && "justify-center px-2",
          )}
        >
          <div className="flex items-center space-x-3">
            <LogOut className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
            {!isCollapsed && <span className="font-medium">Đăng Xuất</span>}
          </div>
        </Button>
      </div>
    </div>
  )
}
