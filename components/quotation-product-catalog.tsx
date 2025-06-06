"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  Lightbulb,
  Music,
  Flower,
  Utensils,
  Camera,
  Mic,
  Palette,
  Gift,
  Car,
  Users,
  ShoppingCart,
} from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  description: string
  supplier: string
  unit: string
  wholesalePrice: number
  retailPrice: number
  inStock: boolean
  minQuantity: number
}

interface QuotationProductCatalogProps {
  onProductSelect: (product: Product, quantity: number, priceType: "wholesale" | "retail") => void
}

const productCategories = [
  { id: "lighting", name: "Ánh Sáng & Đèn", icon: Lightbulb },
  { id: "stage", name: "Sân Khấu & Âm Thanh", icon: Music },
  { id: "decoration", name: "Trang Trí", icon: Flower },
  { id: "catering", name: "Tiệc & Đồ Ăn", icon: Utensils },
  { id: "photography", name: "Chụp Ảnh & Quay Phim", icon: Camera },
  { id: "equipment", name: "Thiết Bị Khác", icon: Mic },
  { id: "furniture", name: "Bàn Ghế & Nội Thất", icon: Palette },
  { id: "gifts", name: "Quà Tặng & Lưu Niệm", icon: Gift },
  { id: "transport", name: "Vận Chuyển", icon: Car },
  { id: "service", name: "Dịch Vụ Nhân Sự", icon: Users },
]

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Đèn LED Sân Khấu 200W",
    category: "lighting",
    description: "Đèn LED chuyên dụng cho sân khấu, ánh sáng trắng/màu",
    supplier: "Công ty Ánh Sáng ABC",
    unit: "cái",
    wholesalePrice: 450000,
    retailPrice: 500000,
    inStock: true,
    minQuantity: 1,
  },
  {
    id: "2",
    name: "Đèn Spotlight 500W",
    category: "lighting",
    description: "Đèn chiếu điểm chuyên nghiệp",
    supplier: "Công ty Ánh Sáng ABC",
    unit: "cái",
    wholesalePrice: 720000,
    retailPrice: 800000,
    inStock: true,
    minQuantity: 1,
  },
  {
    id: "3",
    name: "Sân Khấu Modular 4x6m",
    category: "stage",
    description: "Sân khấu lắp ghép, cao 1.2m",
    supplier: "Sân Khấu Pro",
    unit: "bộ",
    wholesalePrice: 13500000,
    retailPrice: 15000000,
    inStock: true,
    minQuantity: 1,
  },
  {
    id: "4",
    name: "Hệ Thống Âm Thanh 2000W",
    category: "stage",
    description: "Hệ thống âm thanh chuyên nghiệp",
    supplier: "Audio Tech",
    unit: "bộ",
    wholesalePrice: 7200000,
    retailPrice: 8000000,
    inStock: true,
    minQuantity: 1,
  },
  {
    id: "5",
    name: "Hoa Tươi Trang Trí Bàn",
    category: "decoration",
    description: "Hoa tươi trang trí cho từng bàn",
    supplier: "Hoa Tươi Đẹp",
    unit: "bộ",
    wholesalePrice: 270000,
    retailPrice: 300000,
    inStock: true,
    minQuantity: 1,
  },
  {
    id: "6",
    name: "Buffet Cao Cấp",
    category: "catering",
    description: "Buffet 5 món chính + tráng miệng",
    supplier: "Nhà Hàng Golden",
    unit: "suất",
    wholesalePrice: 720000,
    retailPrice: 800000,
    inStock: true,
    minQuantity: 50,
  },
  {
    id: "7",
    name: "Bàn Tròn 10 Người",
    category: "furniture",
    description: "Bàn tròn sang trọng cho 10 người",
    supplier: "Nội Thất Sự Kiện",
    unit: "cái",
    wholesalePrice: 180000,
    retailPrice: 200000,
    inStock: true,
    minQuantity: 1,
  },
]

export function QuotationProductCatalog({ onProductSelect }: QuotationProductCatalogProps) {
  const [products] = useState<Product[]>(sampleProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [priceType, setPriceType] = useState<"wholesale" | "retail">("retail")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }

  const handleAddToQuotation = () => {
    if (selectedProduct) {
      onProductSelect(selectedProduct, quantity, priceType)
      setShowAddDialog(false)
      setSelectedProduct(null)
      setQuantity(1)
      setPriceType("retail")
    }
  }

  // Filter products when category or search changes
  useState(() => {
    filterProducts()
  }, [selectedCategory, searchTerm])

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              filterProducts()
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value)
            filterProducts()
          }}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất Cả Danh Mục</SelectItem>
            {productCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Tabs */}
      <Tabs
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value)
          filterProducts()
        }}
      >
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="all" className="text-xs">
            Tất Cả
          </TabsTrigger>
          {productCategories.slice(0, 9).map((category) => {
            const IconComponent = category.icon
            return (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                <IconComponent className="h-3 w-3 mr-1" />
                <span className="hidden lg:inline">{category.name.split(" ")[0]}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const category = productCategories.find((c) => c.id === product.category)
              const IconComponent = category?.icon || Gift

              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg bg-blue-100 text-blue-600`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {category?.name}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "Có sẵn" : "Hết hàng"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{product.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Giá sỉ:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(product.wholesalePrice)}/{product.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Giá lẻ:</span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(product.retailPrice)}/{product.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Nhà cung cấp:</span>
                        <span>{product.supplier}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Số lượng tối thiểu:</span>
                        <span>
                          {product.minQuantity} {product.unit}
                        </span>
                      </div>
                    </div>

                    <Dialog open={showAddDialog && selectedProduct?.id === product.id} onOpenChange={setShowAddDialog}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setSelectedProduct(product)
                            setQuantity(product.minQuantity)
                            setShowAddDialog(true)
                          }}
                          disabled={!product.inStock}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Thêm Vào Báo Giá
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Thêm Sản Phẩm Vào Báo Giá</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-base font-medium">{product.name}</Label>
                            <p className="text-sm text-gray-600">{product.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Số Lượng</Label>
                              <Input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min={product.minQuantity}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Loại Giá</Label>
                              <Select
                                value={priceType}
                                onValueChange={(value: "wholesale" | "retail") => setPriceType(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="wholesale">
                                    Giá Sỉ - {formatCurrency(product.wholesalePrice)}
                                  </SelectItem>
                                  <SelectItem value="retail">Giá Lẻ - {formatCurrency(product.retailPrice)}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Thành tiền:</span>
                              <span className="text-xl font-bold text-blue-600">
                                {formatCurrency(
                                  (priceType === "wholesale" ? product.wholesalePrice : product.retailPrice) * quantity,
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-4">
                            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                              Hủy
                            </Button>
                            <Button onClick={handleAddToQuotation}>Thêm Vào Báo Giá</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
