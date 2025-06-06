"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Lightbulb, Music, Flower, Utensils, Camera, Mic, Palette, Gift, Car, Users } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  description: string
  supplier: string
  rank: "A" | "B" | "C" | "D"
  price: number
  wholesalePrice: number
  wholesaleMinQuantity: number
  currentStock: number
}

interface SimpleProductCatalogProps {
  onProductSelect: (product: Product) => void
  selectedProductIds?: string[]
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
    rank: "A",
    price: 500000,
    wholesalePrice: 450000,
    wholesaleMinQuantity: 5,
    currentStock: 25,
  },
  {
    id: "2",
    name: "Sân Khấu Modular 4x6m",
    category: "stage",
    description: "Sân khấu lắp ghép, cao 1.2m",
    supplier: "Sân Khấu Pro",
    rank: "B",
    price: 1200000,
    wholesalePrice: 1000000,
    wholesaleMinQuantity: 3,
    currentStock: 5,
  },
  {
    id: "3",
    name: "Hoa Tươi Trang Trí Bàn",
    category: "decoration",
    description: "Hoa tươi trang trí cho từng bàn",
    supplier: "Hoa Tươi Đẹp",
    rank: "C",
    price: 150000,
    wholesalePrice: 130000,
    wholesaleMinQuantity: 10,
    currentStock: 8,
  },
  {
    id: "4",
    name: "Buffet Cao Cấp",
    category: "catering",
    description: "Buffet 5 món chính + tráng miệng",
    supplier: "Nhà Hàng Golden",
    rank: "A",
    price: 800000,
    wholesalePrice: 700000,
    wholesaleMinQuantity: 5,
    currentStock: 20,
  },
  {
    id: "5",
    name: "Bàn Tròn 10 Người",
    category: "furniture",
    description: "Bàn tròn sang trọng cho 10 người",
    supplier: "Nội Thất Sự Kiện",
    rank: "B",
    price: 300000,
    wholesalePrice: 250000,
    wholesaleMinQuantity: 8,
    currentStock: 12,
  },
]

export function SimpleProductCatalog({ onProductSelect, selectedProductIds = [] }: SimpleProductCatalogProps) {
  const [products] = useState<Product[]>(sampleProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([])

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

  const handleAddProduct = (product: Product) => {
    onProductSelect(product)
    setRecentlyAdded((prev) => [...prev.filter((id) => id !== product.id), product.id])
    setTimeout(() => {
      setRecentlyAdded((prev) => prev.filter((id) => id !== product.id))
    }, 2000)
  }

  useState(() => {
    filterProducts()
  }, [selectedCategory, searchTerm])

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "D":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="space-y-4">
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
          <SelectTrigger className="w-48">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredProducts.map((product) => {
          const category = productCategories.find((c) => c.id === product.category)
          const IconComponent = category?.icon || Gift
          const isSelected = selectedProductIds.includes(product.id)
          const isRecentlyAdded = recentlyAdded.includes(product.id)

          return (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {category?.name}
                        </Badge>
                        <Badge className={getRankColor(product.rank)}>Rank {product.rank}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{product.description}</p>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Tồn kho:</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`font-medium ${product.currentStock >= product.wholesaleMinQuantity ? "text-green-600" : "text-orange-600"}`}
                      >
                        {product.currentStock}
                      </span>
                      {product.currentStock >= product.wholesaleMinQuantity ? (
                        <span className="text-green-600 text-xs">✅</span>
                      ) : (
                        <span className="text-orange-600 text-xs">⚠️</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giá lẻ:</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(product.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giá sỉ (từ {product.wholesaleMinQuantity}):</span>
                    <span className="font-semibold text-green-600">{formatCurrency(product.wholesalePrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Nhà cung cấp:</span>
                    <span className="font-medium">{product.supplier}</span>
                  </div>
                </div>

                {product.currentStock < product.wholesaleMinQuantity && (
                  <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    ⚠️ Chỉ còn {product.currentStock} - Không đủ cho giá sỉ (cần {product.wholesaleMinQuantity})
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-2">
                  💡 Giá sỉ áp dụng khi mua ≥ {product.wholesaleMinQuantity} | Rank {product.rank}:
                  {product.rank === "A"
                    ? " -15%"
                    : product.rank === "B"
                      ? " -10%"
                      : product.rank === "C"
                        ? " -5%"
                        : " 0%"}{" "}
                  thêm
                </div>

                <Button
                  onClick={() => handleAddProduct(product)}
                  className={`w-full ${
                    isSelected
                      ? "bg-gray-400 hover:bg-gray-500"
                      : isRecentlyAdded
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  size="sm"
                  disabled={isSelected}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isSelected ? "Đã Thêm" : isRecentlyAdded ? "Đã Thêm!" : "Thêm Vào Sự Kiện"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
