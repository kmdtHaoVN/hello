"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ReportsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📊 Báo Cáo</h1>
        <p className="text-gray-600">Thống kê và báo cáo chi tiết</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Báo Cáo Tổng Quan</CardTitle>
          <CardDescription>Thống kê hoạt động hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Chức năng đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  )
}
