"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Trash2, Package } from "lucide-react"
import { SimpleProductCatalog } from "./simple-product-catalog"

interface EventFormProps {
  onClose: () => void
  onSave: (event: any) => void
}

interface SelectedProduct {
  id: string
  name: string
  category: string
  description: string
  supplier: string
}

export function EventForm({ onClose, onSave }: EventFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    manager: "",
    notes: "",
    status: "draft",
    totalCost: 0,
    attendees: 0,
  })

  const [attachments, setAttachments] = useState<File[]>([])
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const eventData = {
      ...formData,
      products: selectedProducts,
    }
    onSave(eventData)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleProductSelect = (product: SelectedProduct) => {
    // Kiểm tra xem sản phẩm đã được thêm chưa
    const exists = selectedProducts.find((p) => p.id === product.id)
    if (!exists) {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Thông Tin Cơ Bản</TabsTrigger>
          <TabsTrigger value="details">Chi Tiết</TabsTrigger>
          <TabsTrigger value="products">Sản Phẩm ({selectedProducts.length})</TabsTrigger>
          <TabsTrigger value="attachments">Tài Liệu</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Sự Kiện</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên Sự Kiện *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên sự kiện"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày Tổ Chức *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô Tả Ngắn Gọn</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả về sự kiện..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Địa Điểm *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Nhập địa điểm tổ chức"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Người Phụ Trách *</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="Tên người phụ trách"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chi Tiết Bổ Sung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalCost">Tổng Chi Phí Dự Kiến (VNĐ)</Label>
                  <Input
                    id="totalCost"
                    type="number"
                    value={formData.totalCost}
                    onChange={(e) => setFormData({ ...formData, totalCost: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Số Người Tham Dự Dự Kiến</Label>
                  <Input
                    id="attendees"
                    type="number"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng Thái Khởi Tạo</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Bản Nháp</SelectItem>
                    <SelectItem value="pending">Gửi Duyệt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi Chú Nội Bộ</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ghi chú cho nội bộ..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Catalog */}
            <Card>
              <CardHeader>
                <CardTitle>Catalog Sản Phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleProductCatalog
                  onProductSelect={handleProductSelect}
                  selectedProductIds={selectedProducts.map((p) => p.id)}
                />
              </CardContent>
            </Card>

            {/* Selected Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Sản Phẩm Đã Chọn ({selectedProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Chưa có sản phẩm nào được chọn</p>
                    <p className="text-sm">Chọn sản phẩm từ catalog bên trái</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedProducts.map((product) => {
                      const category = productCategories.find((c) => c.id === product.category)
                      return (
                        <div key={product.id} className="flex items-start justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.description}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {category?.name}
                              </Badge>
                              <span className="text-xs text-gray-500">• {product.supplier}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tài Liệu Đính Kèm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-2">Kéo thả file hoặc click để chọn</div>
                <div className="text-xs text-gray-500 mb-4">Hỗ trợ: PDF, DOC, DOCX, JPG, PNG (Tối đa 10MB)</div>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" variant="outline">
                    Chọn File
                  </Button>
                </Label>
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>File Đã Chọn:</Label>
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Lưu Sự Kiện
        </Button>
      </div>
    </form>
  )
}
