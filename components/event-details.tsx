"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar,
  MapPin,
  User,
  FileText,
  Plus,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingCart,
  Package,
} from "lucide-react"
import { ProductCatalog } from "./product-catalog"

interface EventDetailsProps {
  event: any
  onClose: () => void
}

interface SelectedProduct {
  id: string
  name: string
  category: string
  price: number
  unit: string
  quantity: number
  totalPrice: number
  supplier: string
  notes?: string
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  const [costItems, setCostItems] = useState([
    { id: 1, category: "Địa điểm", item: "Thuê hội trường", amount: 50000000, note: "Grand Ballroom" },
    { id: 2, category: "Nhân sự", item: "MC chương trình", amount: 15000000, note: "MC nổi tiếng" },
    { id: 3, category: "Tiệc", item: "Buffet dinner", amount: 75000000, note: "250 suất ăn" },
    { id: 4, category: "Quà tặng", item: "Quà lưu niệm", amount: 10000000, note: "250 phần quà" },
  ])

  const [attendees, setAttendees] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@company.com", group: "Ban lãnh đạo", status: "confirmed", ticketPrice: 0 },
    { id: 2, name: "Trần Thị B", email: "b@company.com", group: "Nhân viên", status: "confirmed", ticketPrice: 500000 },
    { id: 3, name: "Lê Văn C", email: "c@partner.com", group: "Đối tác", status: "pending", ticketPrice: 1000000 },
    { id: 4, name: "Phạm Thị D", email: "d@vip.com", group: "Khách VIP", status: "confirmed", ticketPrice: 0 },
  ])

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([
    {
      id: "1",
      name: "Đèn LED Sân Khấu 200W",
      category: "lighting",
      price: 500000,
      unit: "cái",
      quantity: 8,
      totalPrice: 4000000,
      supplier: "Công ty Ánh Sáng ABC",
      notes: "Đặt ở 4 góc sân khấu",
    },
    {
      id: "4",
      name: "Sân Khấu Modular 4x6m",
      category: "stage",
      price: 15000000,
      unit: "bộ",
      quantity: 1,
      totalPrice: 15000000,
      supplier: "Sân Khấu Pro",
      notes: "Lắp đặt 1 ngày trước sự kiện",
    },
    {
      id: "12",
      name: "Bàn Tròn 10 Người",
      category: "furniture",
      price: 200000,
      unit: "cái",
      quantity: 25,
      totalPrice: 5000000,
      supplier: "Nội Thất Sự Kiện",
    },
  ])

  const [showProductCatalog, setShowProductCatalog] = useState(false)

  const [newCostItem, setNewCostItem] = useState({
    category: "",
    item: "",
    amount: 0,
    note: "",
  })

  const [newAttendee, setNewAttendee] = useState({
    name: "",
    email: "",
    group: "",
    ticketPrice: 0,
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const totalCost = costItems.reduce((sum, item) => sum + item.amount, 0)
  const totalProductCost = selectedProducts.reduce((sum, item) => sum + item.totalPrice, 0)
  const totalEventCost = totalCost + totalProductCost
  const confirmedAttendees = attendees.filter((a) => a.status === "confirmed").length
  const totalRevenue = attendees.filter((a) => a.status === "confirmed").reduce((sum, a) => sum + a.ticketPrice, 0)

  const addCostItem = () => {
    if (newCostItem.item && newCostItem.amount > 0) {
      setCostItems([
        ...costItems,
        {
          id: Date.now(),
          ...newCostItem,
        },
      ])
      setNewCostItem({ category: "", item: "", amount: 0, note: "" })
    }
  }

  const addAttendee = () => {
    if (newAttendee.name && newAttendee.email) {
      setAttendees([
        ...attendees,
        {
          id: Date.now(),
          ...newAttendee,
          status: "pending",
        },
      ])
      setNewAttendee({ name: "", email: "", group: "", ticketPrice: 0 })
    }
  }

  const handleProductsSelected = (products: SelectedProduct[]) => {
    setSelectedProducts(products)
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  const statusLabels = {
    draft: "Đang soạn",
    pending: "Đã gửi duyệt",
    approved: "Đã duyệt",
    completed: "Đã diễn ra",
    cancelled: "Đã huỷ",
  }

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const attendeeStatusLabels = {
    pending: "Chờ phản hồi",
    confirmed: "Đã xác nhận",
    declined: "Không tham gia",
  }

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(event.date).toLocaleDateString("vi-VN")}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {event.manager}
              </div>
            </div>
          </div>
          <Badge className={statusColors[event.status as keyof typeof statusColors]}>
            {statusLabels[event.status as keyof typeof statusLabels]}
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-sm text-blue-600">Chi Phí Cơ Bản</div>
            <div className="text-lg font-semibold text-blue-900">{formatCurrency(totalCost)}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-sm text-purple-600">Chi Phí Sản Phẩm</div>
            <div className="text-lg font-semibold text-purple-900">{formatCurrency(totalProductCost)}</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-sm text-red-600">Tổng Chi Phí</div>
            <div className="text-lg font-semibold text-red-900">{formatCurrency(totalEventCost)}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-green-600">Doanh Thu</div>
            <div className="text-lg font-semibold text-green-900">{formatCurrency(totalRevenue)}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-sm text-orange-600">Lợi Nhuận</div>
            <div className="text-lg font-semibold text-orange-900">{formatCurrency(totalRevenue - totalEventCost)}</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="products">Sản Phẩm</TabsTrigger>
          <TabsTrigger value="attendees">Người Tham Dự</TabsTrigger>
          <TabsTrigger value="costs">Chi Phí</TabsTrigger>
          <TabsTrigger value="schedule">Lịch Trình</TabsTrigger>
          <TabsTrigger value="documents">Tài Liệu</TabsTrigger>
          <TabsTrigger value="approval">Phê Duyệt</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Chung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Tên Sự Kiện</Label>
                  <p className="text-sm">{event.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Ngày Tổ Chức</Label>
                  <p className="text-sm">{new Date(event.date).toLocaleDateString("vi-VN")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Địa Điểm</Label>
                  <p className="text-sm">{event.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Người Phụ Trách</Label>
                  <p className="text-sm">{event.manager}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Sản Phẩm & Dịch Vụ ({selectedProducts.length})
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Tổng giá trị:{" "}
                    <span className="font-semibold text-purple-600">{formatCurrency(totalProductCost)}</span>
                  </p>
                </div>
                <Dialog open={showProductCatalog} onOpenChange={setShowProductCatalog}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Thêm Sản Phẩm
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Catalog Sản Phẩm & Dịch Vụ</DialogTitle>
                    </DialogHeader>
                    <ProductCatalog
                      eventId={event.id}
                      selectedProducts={selectedProducts}
                      onProductsSelected={handleProductsSelected}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {selectedProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Chưa có sản phẩm nào được chọn</p>
                  <p className="text-sm">Nhấn "Thêm Sản Phẩm" để bắt đầu</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản Phẩm</TableHead>
                      <TableHead>Danh Mục</TableHead>
                      <TableHead>Nhà Cung Cấp</TableHead>
                      <TableHead>Đơn Giá</TableHead>
                      <TableHead>Số Lượng</TableHead>
                      <TableHead>Thành Tiền</TableHead>
                      <TableHead>Ghi Chú</TableHead>
                      <TableHead>Hành Động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{product.supplier}</TableCell>
                        <TableCell>
                          {formatCurrency(product.price)}/{product.unit}
                        </TableCell>
                        <TableCell>
                          {product.quantity} {product.unit}
                        </TableCell>
                        <TableCell className="font-semibold text-purple-600">
                          {formatCurrency(product.totalPrice)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{product.notes || "-"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProduct(product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Danh Sách Người Tham Dự ({attendees.length})</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Người Tham Dự
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Add New Attendee Form */}
              <div className="grid grid-cols-5 gap-2 mb-4 p-4 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Họ tên"
                  value={newAttendee.name}
                  onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={newAttendee.email}
                  onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                />
                <Select
                  value={newAttendee.group}
                  onValueChange={(value) => setNewAttendee({ ...newAttendee, group: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Nhóm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                    <SelectItem value="Đối tác">Đối tác</SelectItem>
                    <SelectItem value="Ban lãnh đạo">Ban lãnh đạo</SelectItem>
                    <SelectItem value="Khách VIP">Khách VIP</SelectItem>
                    <SelectItem value="Khách ngoài">Khách ngoài</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Giá vé"
                  value={newAttendee.ticketPrice}
                  onChange={(e) => setNewAttendee({ ...newAttendee, ticketPrice: Number(e.target.value) })}
                />
                <Button onClick={addAttendee} size="sm">
                  Thêm
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Họ Tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nhóm</TableHead>
                    <TableHead>Giá Vé</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell>{attendee.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{attendee.group}</Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(attendee.ticketPrice)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {attendee.status === "confirmed" && <CheckCircle className="h-4 w-4 text-green-500 mr-1" />}
                          {attendee.status === "declined" && <XCircle className="h-4 w-4 text-red-500 mr-1" />}
                          {attendee.status === "pending" && <Clock className="h-4 w-4 text-yellow-500 mr-1" />}
                          <span className="text-sm">
                            {attendeeStatusLabels[attendee.status as keyof typeof attendeeStatusLabels]}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Quản Lý Chi Phí</CardTitle>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Chi Phí Cơ Bản</div>
                  <div className="text-xl font-bold text-blue-600">{formatCurrency(totalCost)}</div>
                  <div className="text-sm text-gray-500">Chi Phí Sản Phẩm</div>
                  <div className="text-lg font-bold text-purple-600">{formatCurrency(totalProductCost)}</div>
                  <div className="text-sm text-gray-500 border-t pt-1 mt-1">Tổng Cộng</div>
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(totalEventCost)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Add New Cost Item Form */}
              <div className="grid grid-cols-5 gap-2 mb-4 p-4 bg-gray-50 rounded-lg">
                <Select
                  value={newCostItem.category}
                  onValueChange={(value) => setNewCostItem({ ...newCostItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Địa điểm">Địa điểm</SelectItem>
                    <SelectItem value="Nhân sự">Nhân sự</SelectItem>
                    <SelectItem value="Quà tặng">Quà tặng</SelectItem>
                    <SelectItem value="Tiệc">Tiệc</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Hạng mục"
                  value={newCostItem.item}
                  onChange={(e) => setNewCostItem({ ...newCostItem, item: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Số tiền"
                  value={newCostItem.amount}
                  onChange={(e) => setNewCostItem({ ...newCostItem, amount: Number(e.target.value) })}
                />
                <Input
                  placeholder="Ghi chú"
                  value={newCostItem.note}
                  onChange={(e) => setNewCostItem({ ...newCostItem, note: e.target.value })}
                />
                <Button onClick={addCostItem} size="sm">
                  Thêm
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loại</TableHead>
                    <TableHead>Hạng Mục</TableHead>
                    <TableHead>Số Tiền</TableHead>
                    <TableHead>Ghi Chú</TableHead>
                    <TableHead>Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell className="text-red-600 font-semibold">{formatCurrency(item.amount)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{item.note}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch Trình Sự Kiện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold">18:00 - 18:30</div>
                  <div className="text-sm text-gray-600">Đón khách và cocktail chào mừng</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="font-semibold">18:30 - 19:00</div>
                  <div className="text-sm text-gray-600">Lễ khai mạc và phát biểu chào mừng</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="font-semibold">19:00 - 20:30</div>
                  <div className="text-sm text-gray-600">Tiệc buffet dinner</div>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <div className="font-semibold">20:30 - 22:00</div>
                  <div className="text-sm text-gray-600">Chương trình văn nghệ và khiêu vũ</div>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="font-semibold">22:00 - 23:00</div>
                  <div className="text-sm text-gray-600">Trao quà lưu niệm và kết thúc</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tài Liệu Đính Kèm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <div className="font-medium">Proposal Sự Kiện Gala.pdf</div>
                      <div className="text-sm text-gray-500">2.5 MB • Tải lên 2 ngày trước</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <div className="font-medium">Banner Sự Kiện.jpg</div>
                      <div className="text-sm text-gray-500">1.8 MB • Tải lên 1 ngày trước</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-purple-500 mr-3" />
                    <div>
                      <div className="font-medium">Kế Hoạch Chi Tiết.docx</div>
                      <div className="text-sm text-gray-500">856 KB • Tải lên 3 giờ trước</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch Sử Phê Duyệt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Đã được phê duyệt</div>
                    <div className="text-sm text-gray-600">Bởi: Giám đốc Nguyễn Văn X</div>
                    <div className="text-sm text-gray-500">Thời gian: 15/11/2024 14:30</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Ghi chú: "Sự kiện được phê duyệt với ngân sách đã đề xuất. Lưu ý kiểm soát chi phí trong quá trình
                      thực hiện."
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Đã gửi yêu cầu duyệt</div>
                    <div className="text-sm text-gray-600">Bởi: {event.manager}</div>
                    <div className="text-sm text-gray-500">Thời gian: 14/11/2024 09:15</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">Tạo sự kiện</div>
                    <div className="text-sm text-gray-600">Bởi: {event.manager}</div>
                    <div className="text-sm text-gray-500">Thời gian: 13/11/2024 16:45</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Đóng
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Xuất Báo Cáo</Button>
      </div>
    </div>
  )
}
