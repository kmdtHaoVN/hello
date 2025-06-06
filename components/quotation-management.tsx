"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, FileText, Search, Package, Calculator, Download, Send, Eye } from "lucide-react"
import { QuotationProductCatalog } from "./quotation-product-catalog"

interface QuotationItem {
  id: string
  productId: string
  productName: string
  category: string
  supplier: string
  quantity: number
  unit: string
  wholesalePrice: number
  retailPrice: number
  selectedPrice: number
  priceType: "wholesale" | "retail"
  discount: number
  totalPrice: number
  notes?: string
}

interface Quotation {
  id: string
  quotationNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  status: "draft" | "sent" | "approved" | "rejected"
  createdDate: string
  validUntil: string
  items: QuotationItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  notes: string
}

export function QuotationManagement() {
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: "1",
      quotationNumber: "BG-2024-001",
      customerName: "Công ty ABC",
      customerEmail: "contact@abc.com",
      customerPhone: "0123456789",
      customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
      status: "sent",
      createdDate: "2024-06-01",
      validUntil: "2024-06-15",
      items: [],
      subtotal: 50000000,
      discount: 5000000,
      tax: 4500000,
      total: 49500000,
      notes: "Báo giá cho sự kiện gala cuối năm",
    },
    {
      id: "2",
      quotationNumber: "BG-2024-002",
      customerName: "Khách sạn XYZ",
      customerEmail: "events@xyz.com",
      customerPhone: "0987654321",
      customerAddress: "456 Đường XYZ, Quận 3, TP.HCM",
      status: "draft",
      createdDate: "2024-06-05",
      validUntil: "2024-06-20",
      items: [],
      subtotal: 75000000,
      discount: 0,
      tax: 7500000,
      total: 82500000,
      notes: "Báo giá dịch vụ trang trí tiệc cưới",
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [newQuotation, setNewQuotation] = useState<Partial<Quotation>>({
    quotationNumber: `BG-2024-${String(quotations.length + 1).padStart(3, "0")}`,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    status: "draft",
    validUntil: "",
    items: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    notes: "",
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch =
      quotation.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.customerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || quotation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCreateQuotation = () => {
    if (newQuotation.customerName) {
      const quotation: Quotation = {
        id: Date.now().toString(),
        quotationNumber: newQuotation.quotationNumber!,
        customerName: newQuotation.customerName,
        customerEmail: newQuotation.customerEmail || "",
        customerPhone: newQuotation.customerPhone || "",
        customerAddress: newQuotation.customerAddress || "",
        status: "draft",
        createdDate: new Date().toISOString().split("T")[0],
        validUntil: newQuotation.validUntil || "",
        items: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        notes: newQuotation.notes || "",
      }
      setQuotations([...quotations, quotation])
      setNewQuotation({
        quotationNumber: `BG-2024-${String(quotations.length + 2).padStart(3, "0")}`,
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        customerAddress: "",
        status: "draft",
        validUntil: "",
        items: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        notes: "",
      })
      setShowCreateDialog(false)
    }
  }

  const handleEditQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation)
    setShowEditDialog(true)
  }

  const handleDeleteQuotation = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa báo giá này?")) {
      setQuotations(quotations.filter((q) => q.id !== id))
    }
  }

  const statusLabels = {
    draft: "Bản nháp",
    sent: "Đã gửi",
    approved: "Đã duyệt",
    rejected: "Từ chối",
  }

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    sent: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📋 Quản Lý Báo Giá</h1>
          <p className="text-gray-600">Tạo và quản lý báo giá cho khách hàng</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Báo Giá
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo Báo Giá Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số Báo Giá</Label>
                  <Input value={newQuotation.quotationNumber} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Hiệu Lực Đến</Label>
                  <Input
                    type="date"
                    value={newQuotation.validUntil}
                    onChange={(e) => setNewQuotation({ ...newQuotation, validUntil: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tên Khách Hàng *</Label>
                <Input
                  value={newQuotation.customerName}
                  onChange={(e) => setNewQuotation({ ...newQuotation, customerName: e.target.value })}
                  placeholder="Nhập tên khách hàng"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newQuotation.customerEmail}
                    onChange={(e) => setNewQuotation({ ...newQuotation, customerEmail: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Số Điện Thoại</Label>
                  <Input
                    value={newQuotation.customerPhone}
                    onChange={(e) => setNewQuotation({ ...newQuotation, customerPhone: e.target.value })}
                    placeholder="0123456789"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Địa Chỉ</Label>
                <Textarea
                  value={newQuotation.customerAddress}
                  onChange={(e) => setNewQuotation({ ...newQuotation, customerAddress: e.target.value })}
                  placeholder="Địa chỉ khách hàng"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Ghi Chú</Label>
                <Textarea
                  value={newQuotation.notes}
                  onChange={(e) => setNewQuotation({ ...newQuotation, notes: e.target.value })}
                  placeholder="Ghi chú về báo giá"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreateQuotation}>Tạo Báo Giá</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Báo Giá</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotations.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Gửi</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {quotations.filter((q) => q.status === "sent").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Duyệt</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {quotations.filter((q) => q.status === "approved").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Giá Trị</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(quotations.reduce((sum, q) => sum + q.total, 0))}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Báo Giá</CardTitle>
          <CardDescription>Quản lý tất cả báo giá cho khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm báo giá..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="sent">Đã gửi</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Số Báo Giá</TableHead>
                <TableHead>Khách Hàng</TableHead>
                <TableHead>Ngày Tạo</TableHead>
                <TableHead>Hiệu Lực</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Tổng Tiền</TableHead>
                <TableHead>Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell className="font-medium">{quotation.quotationNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{quotation.customerName}</div>
                      <div className="text-sm text-gray-500">{quotation.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(quotation.createdDate).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell>{new Date(quotation.validUntil).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[quotation.status]}>{statusLabels[quotation.status]}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-blue-600">{formatCurrency(quotation.total)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditQuotation(quotation)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuotation(quotation.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Quotation Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi Tiết Báo Giá - {selectedQuotation?.quotationNumber}</DialogTitle>
          </DialogHeader>
          {selectedQuotation && (
            <QuotationEditor quotation={selectedQuotation} onClose={() => setShowEditDialog(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface QuotationEditorProps {
  quotation: Quotation
  onClose: () => void
}

function QuotationEditor({ quotation, onClose }: QuotationEditorProps) {
  const [items, setItems] = useState<QuotationItem[]>(quotation.items)
  const [showProductCatalog, setShowProductCatalog] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const handleAddProduct = (product: any, quantity: number, priceType: "wholesale" | "retail") => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      category: product.category,
      supplier: product.supplier,
      quantity,
      unit: product.unit,
      wholesalePrice: product.wholesalePrice,
      retailPrice: product.retailPrice,
      selectedPrice: priceType === "wholesale" ? product.wholesalePrice : product.retailPrice,
      priceType,
      discount: 0,
      totalPrice: (priceType === "wholesale" ? product.wholesalePrice : product.retailPrice) * quantity,
      notes: "",
    }
    setItems([...items, newItem])
    setShowProductCatalog(false)
  }

  const updateItem = (itemId: string, updates: Partial<QuotationItem>) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, ...updates }
          if (updates.quantity || updates.selectedPrice || updates.discount) {
            updatedItem.totalPrice =
              (updatedItem.selectedPrice * updatedItem.quantity * (100 - updatedItem.discount)) / 100
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Thông Tin Khách Hàng</TabsTrigger>
          <TabsTrigger value="products">Sản Phẩm ({items.length})</TabsTrigger>
          <TabsTrigger value="summary">Tổng Kết</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Khách Hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tên Khách Hàng</Label>
                  <Input value={quotation.customerName} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={quotation.customerEmail} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Số Điện Thoại</Label>
                  <Input value={quotation.customerPhone} />
                </div>
                <div>
                  <Label>Hiệu Lực Đến</Label>
                  <Input type="date" value={quotation.validUntil} />
                </div>
              </div>
              <div>
                <Label>Địa Chỉ</Label>
                <Textarea value={quotation.customerAddress} rows={2} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Danh Sách Sản Phẩm</h3>
            <Dialog open={showProductCatalog} onOpenChange={setShowProductCatalog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Sản Phẩm
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Chọn Sản Phẩm</DialogTitle>
                </DialogHeader>
                <QuotationProductCatalog onProductSelect={handleAddProduct} />
              </DialogContent>
            </Dialog>
          </div>

          {items.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Chưa có sản phẩm nào trong báo giá</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản Phẩm</TableHead>
                      <TableHead>Số Lượng</TableHead>
                      <TableHead>Đơn Giá</TableHead>
                      <TableHead>Loại Giá</TableHead>
                      <TableHead>Giảm Giá (%)</TableHead>
                      <TableHead>Thành Tiền</TableHead>
                      <TableHead>Hành Động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.productName}</div>
                            <div className="text-sm text-gray-500">{item.supplier}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.selectedPrice}
                            onChange={(e) => updateItem(item.id, { selectedPrice: Number(e.target.value) })}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.priceType}
                            onValueChange={(value: "wholesale" | "retail") => {
                              const newPrice = value === "wholesale" ? item.wholesalePrice : item.retailPrice
                              updateItem(item.id, { priceType: value, selectedPrice: newPrice })
                            }}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wholesale">Sỉ</SelectItem>
                              <SelectItem value="retail">Lẻ</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.discount}
                            onChange={(e) => updateItem(item.id, { discount: Number(e.target.value) })}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell className="font-semibold">{formatCurrency(item.totalPrice)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tổng Kết Báo Giá</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Tạm tính:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Thuế VAT (10%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Xuất PDF
        </Button>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Gửi Báo Giá
        </Button>
      </div>
    </div>
  )
}
