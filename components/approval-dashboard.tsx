"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  DollarSign,
  Package,
  FileText,
  Eye,
  Filter,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ApprovalEvent {
  id: string
  name: string
  date: string
  status: "pending" | "approved" | "rejected" | "draft"
  totalCost: number
  manager: string
  location: string
  attendees: number
  submittedBy: string
  submittedDate: string
  description: string
  products: any[]
  documents: any[]
}

const statusLabels = {
  pending: "Chờ duyệt",
  approved: "Đã duyệt",
  rejected: "Từ chối",
  draft: "Bản nháp",
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  draft: "bg-gray-100 text-gray-800",
}

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  draft: FileText,
}

export function ApprovalDashboard() {
  const [events, setEvents] = useState<ApprovalEvent[]>([
    {
      id: "1",
      name: "Gala Từ Thiện Cuối Năm 2024",
      date: "2024-12-15",
      status: "pending",
      totalCost: 150000000,
      manager: "Nguyễn Văn A",
      location: "Khách sạn Grand Plaza",
      attendees: 250,
      submittedBy: "Trần Thị B",
      submittedDate: "2024-06-01",
      description: "Sự kiện gây quỹ từ thiện cho trẻ em vùng cao",
      products: [
        {
          id: "1",
          name: "Đèn LED Sân Khấu 200W",
          category: "lighting",
          quantity: 8,
          totalPrice: 4000000,
        },
        {
          id: "4",
          name: "Sân Khấu Modular 4x6m",
          category: "stage",
          quantity: 1,
          totalPrice: 15000000,
        },
      ],
      documents: [
        { name: "Proposal Sự Kiện.pdf", size: "2.5 MB", type: "pdf" },
        { name: "Ngân Sách Chi Tiết.xlsx", size: "1.2 MB", type: "excel" },
      ],
    },
    {
      id: "2",
      name: "Tiệc Tất Niên Công Ty",
      date: "2024-12-28",
      status: "pending",
      totalCost: 80000000,
      manager: "Lê Văn C",
      location: "Trung tâm Hội nghị ABC",
      attendees: 150,
      submittedBy: "Phạm Thị D",
      submittedDate: "2024-06-02",
      description: "Tiệc tất niên tổng kết hoạt động năm 2024",
      products: [
        {
          id: "5",
          name: "Hệ Thống Âm Thanh 2000W",
          category: "stage",
          quantity: 1,
          totalPrice: 8000000,
        },
        {
          id: "10",
          name: "Buffet Cao Cấp",
          category: "catering",
          quantity: 150,
          totalPrice: 120000000,
        },
      ],
      documents: [
        { name: "Kế Hoạch Tổ Chức.docx", size: "1.8 MB", type: "word" },
        { name: "Danh Sách Khách Mời.xlsx", size: "0.8 MB", type: "excel" },
      ],
    },
    {
      id: "3",
      name: "Gala Kỷ Niệm 10 Năm Thành Lập",
      date: "2025-01-20",
      status: "approved",
      totalCost: 200000000,
      manager: "Hoàng Văn E",
      location: "Khách sạn Intercontinental",
      attendees: 300,
      submittedBy: "Ngô Thị F",
      submittedDate: "2024-05-25",
      description: "Sự kiện kỷ niệm 10 năm thành lập công ty",
      products: [
        {
          id: "8",
          name: "Backdrop Sân Khấu",
          category: "decoration",
          quantity: 1,
          totalPrice: 2000000,
        },
        {
          id: "12",
          name: "Bàn Tròn 10 Người",
          category: "furniture",
          quantity: 30,
          totalPrice: 6000000,
        },
      ],
      documents: [
        { name: "Concept Sự Kiện.pdf", size: "3.5 MB", type: "pdf" },
        { name: "Lịch Trình Chi Tiết.docx", size: "1.5 MB", type: "word" },
      ],
    },
    {
      id: "4",
      name: "Hội Nghị Khách Hàng Thường Niên",
      date: "2024-11-10",
      status: "rejected",
      totalCost: 120000000,
      manager: "Vũ Thị G",
      location: "Khách sạn Sheraton",
      attendees: 200,
      submittedBy: "Đặng Văn H",
      submittedDate: "2024-05-20",
      description: "Hội nghị gặp gỡ và tri ân khách hàng thân thiết",
      products: [
        {
          id: "6",
          name: "Micro Không Dây",
          category: "stage",
          quantity: 4,
          totalPrice: 6000000,
        },
        {
          id: "11",
          name: "Cocktail Chào Mừng",
          category: "catering",
          quantity: 200,
          totalPrice: 30000000,
        },
      ],
      documents: [
        { name: "Kế Hoạch Tổ Chức.pdf", size: "2.2 MB", type: "pdf" },
        { name: "Danh Sách Khách Mời.xlsx", size: "1.0 MB", type: "excel" },
      ],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<ApprovalEvent | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [approvalComment, setApprovalComment] = useState("")
  const [activeTab, setActiveTab] = useState("pending")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.manager.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || event.status === statusFilter

    const matchesTab =
      (activeTab === "pending" && event.status === "pending") ||
      (activeTab === "approved" && event.status === "approved") ||
      (activeTab === "rejected" && event.status === "rejected") ||
      activeTab === "all"

    return matchesSearch && matchesStatus && matchesTab
  })

  const handleApprove = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
            ...event,
            status: "approved",
          }
          : event,
      ),
    )
    setShowEventDetails(false)
    setApprovalComment("")
  }

  const handleReject = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
            ...event,
            status: "rejected",
          }
          : event,
      ),
    )
    setShowEventDetails(false)
    setApprovalComment("")
  }

  const pendingCount = events.filter((e) => e.status === "pending").length
  const approvedCount = events.filter((e) => e.status === "approved").length
  const rejectedCount = events.filter((e) => e.status === "rejected").length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🧑‍⚖️ Phê Duyệt Sự Kiện Gala</h1>
          <p className="text-gray-600">Xem xét và phê duyệt các yêu cầu tổ chức sự kiện gala</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ Duyệt</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã Duyệt</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Từ Chối</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Yêu Cầu</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{events.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc trạng thái" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Chờ Duyệt ({pendingCount})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Đã Duyệt ({approvedCount})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Từ Chối ({rejectedCount})
            </TabsTrigger>
            <TabsTrigger value="all">Tất Cả</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Yêu Cầu Phê Duyệt</CardTitle>
            <CardDescription>Xem xét và phê duyệt các yêu cầu tổ chức sự kiện gala</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Sự Kiện</TableHead>
                  <TableHead>Thời Gian</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Tổng Chi Phí</TableHead>
                  <TableHead>Người Phụ Trách</TableHead>
                  <TableHead>Người Gửi</TableHead>
                  <TableHead>Ngày Gửi</TableHead>
                  <TableHead className="text-right">Hành Động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Không tìm thấy yêu cầu phê duyệt nào</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => {
                    const StatusIcon = statusIcons[event.status]
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{event.name}</div>
                            <div className="text-sm text-gray-500">{event.location}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(event.date)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Badge className={statusColors[event.status]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusLabels[event.status]}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(event.totalCost)}</TableCell>
                        <TableCell>{event.manager}</TableCell>
                        <TableCell>{event.submittedBy}</TableCell>
                        <TableCell>{formatDate(event.submittedDate)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedEvent(event)
                              setShowEventDetails(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem Chi Tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Event Details Dialog */}
        <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi Tiết Yêu Cầu Phê Duyệt</DialogTitle>
              <DialogDescription>Xem xét thông tin chi tiết và đưa ra quyết định</DialogDescription>
            </DialogHeader>

            {selectedEvent && (
              <div className="space-y-6">
                {/* Event Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(selectedEvent.date)}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedEvent.location}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {selectedEvent.manager}
                      </div>
                    </div>
                  </div>
                  <Badge className={statusColors[selectedEvent.status]}>{statusLabels[selectedEvent.status]}</Badge>
                </div>

                <Separator />

                {/* Submission Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{selectedEvent.submittedBy.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Người gửi: {selectedEvent.submittedBy}</p>
                        <p className="text-sm text-gray-500">Ngày gửi: {formatDate(selectedEvent.submittedDate)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Trạng thái</p>
                      <Badge className={statusColors[selectedEvent.status]}>{statusLabels[selectedEvent.status]}</Badge>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Thông Tin Chi Phí
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tổng chi phí:</span>
                        <span className="font-bold text-xl text-red-600">
                          {formatCurrency(selectedEvent.totalCost)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Số người tham dự:</span>
                        <span className="font-semibold">{selectedEvent.attendees} người</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Chi phí bình quân:</span>
                        <span className="font-semibold">
                          {formatCurrency(selectedEvent.totalCost / selectedEvent.attendees)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Tài Liệu Đính Kèm
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedEvent.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                              <span>{doc.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">{doc.size}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mô Tả Sự Kiện</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedEvent.description}</p>
                  </CardContent>
                </Card>

                {/* Products */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Sản Phẩm & Dịch Vụ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên Sản Phẩm</TableHead>
                          <TableHead>Danh Mục</TableHead>
                          <TableHead>Số Lượng</TableHead>
                          <TableHead>Thành Tiền</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEvent.products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.category}</Badge>
                            </TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{formatCurrency(product.totalPrice)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Approval Actions */}
                <div className="space-y-4">
                  <Textarea
                    placeholder="Nhập ghi chú phê duyệt hoặc lý do từ chối..."
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    rows={3}
                  />

                  <DialogFooter className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setShowEventDetails(false)}>
                      Đóng
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedEvent.id)}
                      disabled={selectedEvent.status !== "pending"}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Từ Chối
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedEvent.id)}
                      disabled={selectedEvent.status !== "pending"}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Phê Duyệt
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
