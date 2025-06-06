"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info, X } from "lucide-react"

export function NotificationsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🔔 Thông Báo</h1>
          <p className="text-gray-600">Quản lý tất cả thông báo hệ thống</p>
        </div>
        <Button variant="outline">Đánh dấu tất cả đã đọc</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông Báo Mới</CardTitle>
          <CardDescription>5 thông báo chưa đọc</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Yêu cầu phê duyệt mới</p>
                  <p className="text-sm text-gray-600">Sự kiện "Gala Từ Thiện" cần được phê duyệt</p>
                  <p className="text-xs text-gray-500">2 phút trước</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
