"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, Users, DollarSign, FileText } from "lucide-react"
import { EventForm } from "./event-form"
import { EventDetails } from "./event-details"

interface GalaEvent {
  id: string
  name: string
  date: string
  status: "draft" | "pending" | "approved" | "completed" | "cancelled"
  totalCost: number
  manager: string
  location: string
  attendees: number
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

export function EventDashboard() {
  const [events, setEvents] = useState<GalaEvent[]>([
    {
      id: "1",
      name: "Gala Từ Thiện Cuối Năm 2024",
      date: "2024-12-15",
      status: "approved",
      totalCost: 150000000,
      manager: "Nguyễn Văn A",
      location: "Khách sạn Grand Plaza",
      attendees: 250,
    },
    {
      id: "2",
      name: "Tiệc Tất Niên Công Ty",
      date: "2024-12-28",
      status: "pending",
      totalCost: 80000000,
      manager: "Trần Thị B",
      location: "Trung tâm Hội nghị ABC",
      attendees: 150,
    },
    {
      id: "3",
      name: "Gala Kỷ Niệm 10 Năm Thành Lập",
      date: "2025-01-20",
      status: "draft",
      totalCost: 200000000,
      manager: "Lê Văn C",
      location: "Khách sạn Intercontinental",
      attendees: 300,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<GalaEvent | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      setEvents(events.filter((e) => e.id !== eventId))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Quản Lý Sự Kiện Gala</h1>
          <p className="text-gray-600">Quản lý toàn bộ sự kiện gala từ lập kế hoạch đến thực hiện</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Sự Kiện</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã Duyệt</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {events.filter((e) => e.status === "approved").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Người Tham Dự</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + e.attendees, 0)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Ngân Sách</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(events.reduce((sum, e) => sum + e.totalCost, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
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
          </div>

          <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Thêm Sự Kiện
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Thêm Sự Kiện Gala Mới</DialogTitle>
                <DialogDescription>Điền thông tin chi tiết để tạo sự kiện gala mới</DialogDescription>
              </DialogHeader>
              <EventForm
                onClose={() => setShowEventForm(false)}
                onSave={(newEvent) => {
                  const eventWithProducts = {
                    ...newEvent,
                    id: Date.now().toString(),
                    // Calculate total cost including products
                    totalCost:
                      newEvent.totalCost +
                      (newEvent.products || []).reduce((sum: number, p: any) => sum + p.totalPrice, 0),
                  }
                  setEvents([...events, eventWithProducts])
                  setShowEventForm(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Sự Kiện</CardTitle>
            <CardDescription>Quản lý tất cả các sự kiện gala của tổ chức</CardDescription>
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
                  <TableHead>Số Người Tham Dự</TableHead>
                  <TableHead className="text-right">Hành Động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{event.name}</div>
                        <div className="text-sm text-gray-500">{event.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[event.status]}>{statusLabels[event.status]}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(event.totalCost)}</TableCell>
                    <TableCell>{event.manager}</TableCell>
                    <TableCell>{event.attendees} người</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedEvent(event)
                              setShowEventDetails(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem Chi Tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh Sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Event Details Dialog */}
        <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi Tiết Sự Kiện</DialogTitle>
            </DialogHeader>
            {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setShowEventDetails(false)} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
