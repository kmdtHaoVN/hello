"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users, Search } from "lucide-react"

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  leader: string
  department: string
}

export function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Nhóm Marketing",
      description: "Phụ trách marketing và truyền thông",
      memberCount: 8,
      leader: "Trần Thị B",
      department: "Marketing",
    },
    {
      id: "2",
      name: "Nhóm IT",
      description: "Phát triển và bảo trì hệ thống",
      memberCount: 12,
      leader: "Nguyễn Văn A",
      department: "IT",
    },
    {
      id: "3",
      name: "Nhóm Sales",
      description: "Kinh doanh và chăm sóc khách hàng",
      memberCount: 15,
      leader: "Lê Văn C",
      department: "Sales",
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Quản Lý Nhóm</h1>
          <p className="text-gray-600">Quản lý các nhóm làm việc và phân công</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Nhóm Mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo Nhóm Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tên Nhóm</Label>
                <Input placeholder="Nhập tên nhóm" />
              </div>
              <div className="space-y-2">
                <Label>Mô Tả</Label>
                <Input placeholder="Mô tả về nhóm" />
              </div>
              <div className="space-y-2">
                <Label>Trưởng Nhóm</Label>
                <Input placeholder="Tên trưởng nhóm" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Nhóm</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groups.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Thành Viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groups.reduce((sum, g) => sum + g.memberCount, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TB Thành Viên/Nhóm</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(groups.reduce((sum, g) => sum + g.memberCount, 0) / groups.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Nhóm</CardTitle>
          <CardDescription>Quản lý các nhóm làm việc</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm nhóm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Nhóm</TableHead>
                <TableHead>Mô Tả</TableHead>
                <TableHead>Trưởng Nhóm</TableHead>
                <TableHead>Phòng Ban</TableHead>
                <TableHead>Số Thành Viên</TableHead>
                <TableHead>Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                  <TableCell>{group.leader}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{group.department}</Badge>
                  </TableCell>
                  <TableCell>{group.memberCount} người</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
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
    </div>
  )
}
