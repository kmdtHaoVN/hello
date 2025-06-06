"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Package, Search } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  description: string
  supplier: string
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

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Đèn LED Sân Khấu 200W",
      category: "lighting",
      description: "Đèn LED chuyên dụng cho sân khấu, ánh sáng trắng/màu",
      supplier: "Công ty Ánh Sáng ABC",
    },
    {
      id: "2",
      name: "Sân Khấu Modular 4x6m",
      category: "stage",
      description: "Sân khấu lắp ghép, cao 1.2m",
      supplier: "Sân Khấu Pro",
    },
    {
      id: "3",
      name: "Hoa Tươi Trang Trí Bàn",
      category: "decoration",
      description: "Hoa tươi trang trí cho từng bàn",
      supplier: "Hoa Tươi Đẹp",
    },
    {
      id: "4",
      name: "Buffet Cao Cấp",
      category: "catering",
      description: "Buffet 5 món chính + tráng miệng",
      supplier: "Nhà Hàng Golden",
    },
    {
      id: "5",
      name: "Bàn Tròn 10 Người",
      category: "furniture",
      description: "Bàn tròn sang trọng cho 10 người",
      supplier: "Nội Thất Sự Kiện",
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    description: "",
    supplier: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.supplier) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description || "",
        supplier: newProduct.supplier,
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        category: "",
        description: "",
        supplier: "",
      })
      setShowAddDialog(false)
    }
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📦 Quản Lý Sản Phẩm</h1>
          <p className="text-gray-600">Quản lý danh mục sản phẩm và dịch vụ cho sự kiện</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm Sản Phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm Sản Phẩm Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên Sản Phẩm *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh Mục *</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Nhà Cung Cấp *</Label>
                <Input
                  id="supplier"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                  placeholder="Tên nhà cung cấp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô Tả</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Mô tả về sản phẩm"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleAddProduct}>Thêm Sản Phẩm</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Sản Phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Danh Mục</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(products.map((p) => p.category)).size}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhà Cung Cấp</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(products.map((p) => p.supplier)).size}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Sản Phẩm</CardTitle>
          <CardDescription>Quản lý thông tin sản phẩm và dịch vụ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {productCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Sản Phẩm</TableHead>
                <TableHead>Danh Mục</TableHead>
                <TableHead>Nhà Cung Cấp</TableHead>
                <TableHead>Mô Tả</TableHead>
                <TableHead>Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Không tìm thấy sản phẩm nào</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  const category = productCategories.find((c) => c.id === product.category)
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{category?.name || product.category}</Badge>
                      </TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
