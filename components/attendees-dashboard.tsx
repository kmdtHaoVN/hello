"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AttendeesDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👥 Người Tham Dự</h1>
        <p className="text-gray-600">Quản lý danh sách người tham dự các sự kiện</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Người Tham Dự</CardTitle>
          <CardDescription>Tổng hợp tất cả người tham dự</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Chức năng đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  )
}
