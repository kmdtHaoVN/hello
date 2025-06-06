"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DocumentsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📄 Tài Liệu</h1>
        <p className="text-gray-600">Quản lý tài liệu và file đính kèm</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thư Viện Tài Liệu</CardTitle>
          <CardDescription>Tất cả tài liệu trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Chức năng đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  )
}
