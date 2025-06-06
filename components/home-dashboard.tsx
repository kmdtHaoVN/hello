"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  BarChart3,
  Package,
} from "lucide-react"

export function HomeDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏠 Trang Chủ</h1>
          <p className="text-gray-600">Tổng quan hệ thống quản lý sự kiện Gala</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Tạo Sự Kiện Mới
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sự Kiện Tháng Này</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Người Tham Dự</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+15% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Ngân Sách</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1250000000)}</div>
            <p className="text-xs text-muted-foreground">+8% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ Lệ Thành Công</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Thao Tác Nhanh</CardTitle>
            <CardDescription>Các chức năng thường dùng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Sự Kiện Mới
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Thêm Sản Phẩm
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Import Khách Mời
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Xem Báo Cáo
            </Button>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sự Kiện Gần Đây</CardTitle>
            <CardDescription>Các sự kiện được tạo hoặc cập nhật gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Gala Từ Thiện Cuối Năm 2024</p>
                    <p className="text-sm text-gray-500">15/12/2024 • Khách sạn Grand Plaza</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Đã duyệt</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Tiệc Tất Niên Công Ty</p>
                    <p className="text-sm text-gray-500">28/12/2024 • Trung tâm Hội nghị ABC</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Gala Kỷ Niệm 10 Năm</p>
                    <p className="text-sm text-gray-500">20/01/2025 • Khách sạn Intercontinental</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">Bản nháp</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Yêu Cầu Chờ Duyệt
            </CardTitle>
            <CardDescription>Các sự kiện cần được phê duyệt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Hội Nghị Khách Hàng Q4</p>
                  <p className="text-sm text-gray-500">Gửi bởi: Nguyễn Văn A • 2 ngày trước</p>
                </div>
                <Button size="sm">Xem Chi Tiết</Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Workshop Đào Tạo Nội Bộ</p>
                  <p className="text-sm text-gray-500">Gửi bởi: Trần Thị B • 1 ngày trước</p>
                </div>
                <Button size="sm">Xem Chi Tiết</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Thông Báo Hệ Thống
            </CardTitle>
            <CardDescription>Cập nhật và thông báo quan trọng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cập nhật hệ thống thành công</p>
                  <p className="text-sm text-gray-500">Phiên bản 2.1.0 đã được cài đặt</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Backup dữ liệu hoàn tất</p>
                  <p className="text-sm text-gray-500">Dữ liệu đã được sao lưu an toàn</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium">Bảo trì hệ thống</p>
                  <p className="text-sm text-gray-500">Dự kiến: 15/06/2024 từ 2:00-4:00 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
