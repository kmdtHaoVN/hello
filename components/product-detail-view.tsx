import type React from "react"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/types"
import { Label } from "@/components/ui/label"

interface ProductDetailViewProps {
  product: Product
  getPriceByRankAndQuantity: (product: Product, quantity: number) => number
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, getPriceByRankAndQuantity }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-base font-medium">Số Lượng Tối Thiểu (Lẻ)</Label>
          <div className="text-lg">
            {product.minQuantity} {product.unit}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-base font-medium">Số Lượng Tối Thiểu (Sỉ)</Label>
          <div className="text-lg font-semibold text-blue-600">
            {product.wholesaleMinQuantity} {product.unit}
          </div>
          <div className="text-xs text-gray-500">Mua từ số lượng này để được giá sỉ</div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-3">Chính Sách Giá</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>
              Giá Lẻ (1 - {product.wholesaleMinQuantity - 1} {product.unit}):
            </span>
            <span className="font-semibold text-blue-600">{formatCurrency(product.price)}</span>
          </div>
          <div className="flex justify-between">
            <span>
              Giá Sỉ (≥ {product.wholesaleMinQuantity} {product.unit}):
            </span>
            <span className="font-semibold text-green-600">{formatCurrency(product.wholesalePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>
              Giá Sỉ + Rank {product.rank} (≥ {product.wholesaleMinQuantity} {product.unit}):
            </span>
            <span className="font-semibold text-purple-600">
              {formatCurrency(getPriceByRankAndQuantity(product, product.wholesaleMinQuantity))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailView
