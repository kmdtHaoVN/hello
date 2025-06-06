"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BudgetDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">💰 Ngân Sách</h1>
        <p className="text-gray-600">Quản lý ngân sách và chi phí sự kiện</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tổng Quan Ngân Sách</CardTitle>
          <CardDescription>Theo dõi chi phí và ngân sách</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Chức năng đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  )
}
