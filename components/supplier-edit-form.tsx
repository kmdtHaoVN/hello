"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  category: string
  description: string
}

interface SupplierEditFormProps {
  supplier: Supplier
  onSave: (supplier: Supplier) => void
  onCancel: () => void
}

export function SupplierEditForm({ supplier, onSave, onCancel }: SupplierEditFormProps) {
  const [formData, setFormData] = useState<Supplier>(supplier)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const updateField = (field: keyof Supplier, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Thông Tin Nhà Cung Cấp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Tên Công Ty *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Nhập tên công ty"
                  required
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-base">
                  Người Liên Hệ *
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => updateField("contactPerson", e.target.value)}
                  placeholder="Tên người liên hệ"
                  required
                  className="text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  Số Điện Thoại
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="Số điện thoại"
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Email liên hệ"
                  className="text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-base">
                Danh Mục
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="Ví dụ: Ánh sáng & Đèn, Catering, Sân khấu..."
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-base">
                Địa Chỉ
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Địa chỉ công ty"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Mô Tả
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Mô tả về dịch vụ của nhà cung cấp"
                rows={4}
                className="text-base"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} size="lg">
            Hủy
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" size="lg">
            Lưu Thay Đổi
          </Button>
        </div>
      </form>
    </div>
  )
}
