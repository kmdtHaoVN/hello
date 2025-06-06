"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SettingsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">⚙️ Cài Đặt</h1>
        <p className="text-gray-600">Quản lý cài đặt hệ thống</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cài Đặt Chung</CardTitle>
          <CardDescription>Cấu hình cơ bản của hệ thống</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Tên Công Ty</Label>
            <Input id="company" defaultValue="Công ty ABC" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Hệ Thống</Label>
            <Input id="email" type="email" defaultValue="admin@company.com" />
          </div>
          <Button>Lưu Cài Đặt</Button>
        </CardContent>
      </Card>
    </div>
  )
}
