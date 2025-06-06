"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Product {
  id: string
  name: string
  category: string
  price: number
  wholesalePrice: number
  unit: string
  description: string
  supplier: string
  image?: string
  inStock: boolean
  minQuantity: number
  wholesaleMinQuantity: number
  rank: "A" | "B" | "C" | "D"
  specifications?: string
  warranty?: string
  origin?: string
  currentStock: number
}

interface ProductEditFormProps {
  product: Product
  onSave: (product: Product) => void
  onCancel: () => void
}

const productCategories = [
  { id: "lighting", name: "Ánh Sáng & Đèn" },
  { id: "stage", name: "Sân Khấu & Âm Thanh" },
  { id: "decoration", name: "Trang Trí" },
  { id: "catering", name: "Tiệc & Đồ Ăn" },
  { id: "photography", name: "Chụp Ảnh & Quay Phim" },
  { id: "equipment", name: "Thiết Bị Khác" },
  { id: "furniture", name: "Bàn Ghế & Nội Thất" },
  { id: "gifts", name: "Quà Tặng & Lưu Niệm" },
  { id: "transport", name: "Vận Chuyển" },
  { id: "service", name: "Dịch Vụ Nhân Sự" },
]

export function ProductEditForm({ product, onSave, onCancel }: ProductEditFormProps) {
  const [formData, setFormData] = useState<Product>(product)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const updateField = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Thông Tin Cơ Bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    Tên Sản Phẩm *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base">
                      Danh Mục *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => updateField("category", value)}>
                      <SelectTrigger className="text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id} className="text-base">
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="text-base">
                      Đơn Vị *
                    </Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => updateField("unit", e.target.value)}
                      required
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier" className="text-base">
                    Nhà Cung Cấp *
                  </Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => updateField("supplier", e.target.value)}
                    required
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
                    rows={4}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications" className="text-base">
                    Thông Số Kỹ Thuật
                  </Label>
                  <Textarea
                    id="specifications"
                    value={formData.specifications || ""}
                    onChange={(e) => updateField("specifications", e.target.value)}
                    rows={3}
                    className="text-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="warranty" className="text-base">
                      Bảo Hành
                    </Label>
                    <Input
                      id="warranty"
                      value={formData.warranty || ""}
                      onChange={(e) => updateField("warranty", e.target.value)}
                      placeholder="VD: 24 tháng"
                      className="text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="origin" className="text-base">
                      Xuất Xứ
                    </Label>
                    <Input
                      id="origin"
                      value={formData.origin || ""}
                      onChange={(e) => updateField("origin", e.target.value)}
                      placeholder="VD: Việt Nam"
                      className="text-base"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pricing & Rank */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Giá & Rank Sản Phẩm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-base">
                      Giá Lẻ (VND) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateField("price", Number(e.target.value))}
                      required
                      className="text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wholesalePrice" className="text-base">
                      Giá Sỉ (VND) *
                    </Label>
                    <Input
                      id="wholesalePrice"
                      type="number"
                      value={formData.wholesalePrice}
                      onChange={(e) => updateField("wholesalePrice", Number(e.target.value))}
                      required
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rank" className="text-base">
                    Rank Sản Phẩm *
                  </Label>
                  <Select
                    value={formData.rank}
                    onValueChange={(value: "A" | "B" | "C" | "D") => updateField("rank", value)}
                  >
                    <SelectTrigger className="text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A" className="text-base">
                        Rank A (Giảm thêm 15%)
                      </SelectItem>
                      <SelectItem value="B" className="text-base">
                        Rank B (Giảm thêm 10%)
                      </SelectItem>
                      <SelectItem value="C" className="text-base">
                        Rank C (Giảm thêm 5%)
                      </SelectItem>
                      <SelectItem value="D" className="text-base">
                        Rank D (Không giảm thêm)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minQuantity" className="text-base">
                      SL Tối Thiểu (Lẻ)
                    </Label>
                    <Input
                      id="minQuantity"
                      type="number"
                      value={formData.minQuantity}
                      onChange={(e) => updateField("minQuantity", Number(e.target.value))}
                      min="1"
                      className="text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wholesaleMinQuantity" className="text-base">
                      SL Tối Thiểu (Sỉ) *
                    </Label>
                    <Input
                      id="wholesaleMinQuantity"
                      type="number"
                      value={formData.wholesaleMinQuantity}
                      onChange={(e) => updateField("wholesaleMinQuantity", Number(e.target.value))}
                      min="1"
                      required
                      className="text-base"
                      placeholder="Mặc định: 10"
                    />
                    <div className="text-xs text-gray-500">Số lượng tối thiểu để áp dụng giá sỉ</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-base">Thông Tin Giá & Ưu Đãi</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      • <strong>Giá Lẻ:</strong> Áp dụng khi mua dưới {formData.wholesaleMinQuantity}{" "}
                      {formData.unit || "sản phẩm"}
                    </p>
                    <p>
                      • <strong>Giá Sỉ:</strong> Áp dụng khi mua từ {formData.wholesaleMinQuantity}{" "}
                      {formData.unit || "sản phẩm"} trở lên
                    </p>
                    <p>
                      • <strong>Rank A:</strong> Sản phẩm cao cấp, giảm thêm 15% trên giá sỉ
                    </p>
                    <p>
                      • <strong>Rank B:</strong> Sản phẩm tốt, giảm thêm 10% trên giá sỉ
                    </p>
                    <p>
                      • <strong>Rank C:</strong> Sản phẩm tiêu chuẩn, giảm thêm 5% trên giá sỉ
                    </p>
                    <p>
                      • <strong>Rank D:</strong> Sản phẩm cơ bản, không giảm thêm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Trạng Thái Kho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => updateField("inStock", checked)}
                    />
                    <Label htmlFor="inStock" className="text-base">
                      Còn hàng trong kho
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentStock" className="text-base">
                      Số Lượng Tồn Kho
                    </Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={formData.currentStock}
                      onChange={(e) => updateField("currentStock", Number(e.target.value))}
                      min="0"
                      className="text-base"
                    />
                    <div className="text-xs text-gray-500">Số lượng hiện có trong kho</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
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
