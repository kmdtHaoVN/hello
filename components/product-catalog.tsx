"use client"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductEditForm } from "./product-edit-form"
import { ProductDetailView } from "./product-detail-view"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

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
  currentStock: number
  rank: "A" | "B" | "C" | "D"
  specifications?: string
  warranty?: string
  origin?: string
}

interface PriceRank {
  rank: "A" | "B" | "C" | "D"
  priceMultiplier: number
}

interface ProductCatalogProps {
  initialProducts?: Product[]
  priceRanks?: PriceRank[]
  onProductUpdate?: (products: Product[]) => void
  addToCart?: (product: Product, quantity: number) => void
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Đèn LED Sân Khấu 200W",
    category: "lighting",
    price: 500000,
    wholesalePrice: 450000,
    unit: "cái",
    description: "Đèn LED chuyên dụng cho sân khấu, ánh sáng trắng/màu",
    supplier: "Công ty Ánh Sáng ABC",
    inStock: true,
    minQuantity: 1,
    wholesaleMinQuantity: 5,
    currentStock: 25,
    rank: "A",
    specifications: "LED 200W, IP65, 3000K-6500K",
    warranty: "24 tháng",
    origin: "Việt Nam",
  },
  {
    id: "2",
    name: "Máy Chiếu Mini HD",
    category: "projectors",
    price: 800000,
    wholesalePrice: 720000,
    unit: "cái",
    description: "Máy chiếu nhỏ gọn, độ phân giải HD, kết nối HDMI/USB",
    supplier: "Điện Tử XYZ",
    inStock: true,
    minQuantity: 1,
    wholesaleMinQuantity: 10,
    currentStock: 8,
    rank: "B",
    specifications: "HD, 1200 Lumens, Keystone Correction",
    warranty: "12 tháng",
    origin: "Trung Quốc",
  },
  {
    id: "3",
    name: "Loa Bluetooth Di Động",
    category: "speakers",
    price: 350000,
    wholesalePrice: 315000,
    unit: "cái",
    description: "Loa không dây, âm thanh stereo, chống nước IPX5",
    supplier: "Âm Thanh Số 1",
    inStock: false,
    minQuantity: 2,
    wholesaleMinQuantity: 20,
    currentStock: 0,
    rank: "C",
    specifications: "Bluetooth 5.0, 10W, 8 giờ chơi nhạc",
    warranty: "6 tháng",
    origin: "Việt Nam",
  },
  {
    id: "4",
    name: "Micro Karaoke Không Dây",
    category: "microphones",
    price: 600000,
    wholesalePrice: 540000,
    unit: "bộ",
    description: "Micro karaoke chuyên nghiệp, hút âm tốt, chống ồn",
    supplier: "Thiết Bị Karaoke",
    inStock: true,
    minQuantity: 1,
    wholesaleMinQuantity: 5,
    currentStock: 15,
    rank: "A",
    specifications: "UHF, phạm vi 30m, 2 micro/bộ",
    warranty: "12 tháng",
    origin: "Trung Quốc",
  },
  {
    id: "5",
    name: "Tai Nghe Kiểm Âm Studio",
    category: "headphones",
    price: 450000,
    wholesalePrice: 405000,
    unit: "cái",
    description: "Tai nghe closed-back, âm thanh trung thực, thoải mái",
    supplier: "Studio Pro",
    inStock: true,
    minQuantity: 1,
    wholesaleMinQuantity: 10,
    currentStock: 12,
    rank: "B",
    specifications: "45mm drivers, 10Hz-20kHz, 32 Ohms",
    warranty: "24 tháng",
    origin: "Đức",
  },
]

export function ProductCatalog({
  initialProducts = sampleProducts,
  priceRanks = [
    { rank: "A", priceMultiplier: 0.85 },
    { rank: "B", priceMultiplier: 0.9 },
    { rank: "C", priceMultiplier: 0.95 },
    { rank: "D", priceMultiplier: 1.0 },
  ],
  onProductUpdate = () => {},
  addToCart = () => {},
}: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductDetail, setShowProductDetail] = useState(false)
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([])

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const handleSaveProduct = (product: Product) => {
    if (product.id) {
      const updatedProducts = products.map((p) => (p.id === product.id ? product : p))
      setProducts(updatedProducts)
      onProductUpdate(updatedProducts)
    } else {
      const newProduct = { ...product, id: Math.random().toString(36).substring(7) }
      const updatedProducts = [...products, newProduct]
      setProducts(updatedProducts)
      onProductUpdate(updatedProducts)
    }
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId)
    setProducts(updatedProducts)
    onProductUpdate(updatedProducts)
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const getPriceByRankAndQuantity = useCallback((product: Product, quantity: number) => {
    if (quantity > product.currentStock) {
      return product.price
    }

    if (quantity >= product.wholesaleMinQuantity && product.currentStock >= product.wholesaleMinQuantity) {
      switch (product.rank) {
        case "A":
          return product.wholesalePrice * 0.85
        case "B":
          return product.wholesalePrice * 0.9
        case "C":
          return product.wholesalePrice * 0.95
        case "D":
          return product.wholesalePrice
        default:
          return product.wholesalePrice
      }
    }
    return product.price
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🛍️ Quản Lý Sản Phẩm</h2>
          <p className="text-gray-600">Quản lý danh mục sản phẩm và dịch vụ</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Thêm Sản Phẩm Mới</Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Chỉnh Sửa Sản Phẩm" : viewingProduct ? "Chi Tiết Sản Phẩm" : "Thêm Sản Phẩm Mới"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {editingProduct ? (
                <ProductEditForm
                  product={editingProduct}
                  onSave={handleSaveProduct}
                  onCancel={() => setEditingProduct(null)}
                />
              ) : viewingProduct ? (
                <ProductDetailView
                  product={viewingProduct}
                  onEdit={() => {
                    setEditingProduct(viewingProduct)
                    setViewingProduct(null)
                  }}
                  formatCurrency={formatCurrency}
                  getPriceByRankAndQuantity={getPriceByRankAndQuantity}
                />
              ) : (
                <ProductEditForm
                  product={{
                    id: "",
                    name: "",
                    category: "",
                    price: 0,
                    wholesalePrice: 0,
                    unit: "",
                    description: "",
                    supplier: "",
                    inStock: true,
                    minQuantity: 1,
                    wholesaleMinQuantity: 10,
                    currentStock: 0,
                    rank: "D" as const,
                  }}
                  onSave={handleSaveProduct}
                  onCancel={() => setIsDialogOpen(false)}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "Có sẵn" : "Hết hàng"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Rank:</span>
                    <Badge variant={product.rank === "A" ? "default" : product.rank === "B" ? "secondary" : "outline"}>
                      Rank {product.rank}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Tồn kho:</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`font-medium ${product.currentStock >= product.wholesaleMinQuantity ? "text-green-600" : "text-orange-600"}`}
                      >
                        {product.currentStock} {product.unit}
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
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(product.price)}/{product.unit}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Giá sỉ (từ {product.wholesaleMinQuantity} {product.unit}):
                    </span>
                    <span
                      className={`font-semibold ${product.currentStock >= product.wholesaleMinQuantity ? "text-green-600" : "text-gray-400"}`}
                    >
                      {formatCurrency(product.wholesalePrice)}/{product.unit}
                    </span>
                  </div>

                  {product.currentStock < product.wholesaleMinQuantity && (
                    <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                      ⚠️ Chỉ còn {product.currentStock} {product.unit} - Không đủ cho giá sỉ (cần tối thiểu{" "}
                      {product.wholesaleMinQuantity})
                    </div>
                  )}

                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    💡 <strong>Giá sỉ:</strong> Mua từ {product.wholesaleMinQuantity} {product.unit} trở lên
                    <br />💡 <strong>Rank {product.rank}:</strong> Giảm thêm{" "}
                    {product.rank === "A" ? "15%" : product.rank === "B" ? "10%" : product.rank === "C" ? "5%" : "0%"}{" "}
                    trên giá sỉ
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Số lượng"
                    min={product.minQuantity}
                    max={product.currentStock}
                    defaultValue={product.minQuantity}
                    className="flex-1"
                    id={`quantity-${product.id}`}
                  />
                  <Button variant="outline" size="sm" onClick={() => setViewingProduct(product)}>
                    Chi tiết
                  </Button>
                  <Button
                    onClick={() => {
                      const quantityInput = document.getElementById(`quantity-${product.id}`) as HTMLInputElement
                      const quantity = Number.parseInt(quantityInput.value) || product.minQuantity

                      if (quantity > product.currentStock) {
                        alert(`Chỉ còn ${product.currentStock} ${product.unit} trong kho!`)
                        return
                      }

                      const finalPrice = getPriceByRankAndQuantity(product, quantity)
                      addToCart({ ...product, price: finalPrice }, quantity)
                      quantityInput.value = product.minQuantity.toString()
                      setRecentlyAdded((prev) => [...prev, product.id])
                      setTimeout(() => {
                        setRecentlyAdded((prev) => prev.filter((id) => id !== product.id))
                      }, 2000)
                    }}
                    disabled={!product.inStock || product.currentStock === 0}
                    className={cn(
                      "bg-blue-600 hover:bg-blue-700",
                      recentlyAdded.includes(product.id) && "bg-green-600 hover:bg-green-700",
                    )}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    {recentlyAdded.includes(product.id) ? "Đã thêm!" : "Thêm"}
                  </Button>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                    Sửa
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={showProductDetail} onOpenChange={setShowProductDetail}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi Tiết Sản Phẩm</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductDetailView
              product={selectedProduct}
              onEdit={() => {
                setShowProductDetail(false)
                setEditingProduct(selectedProduct)
                setIsDialogOpen(true)
              }}
              formatCurrency={formatCurrency}
              getPriceByRankAndQuantity={getPriceByRankAndQuantity}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
