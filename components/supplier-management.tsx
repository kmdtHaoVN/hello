"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Building, Phone, Mail, MapPin } from "lucide-react"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  category: string
  description: string
}

export function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "Công ty Ánh Sáng ABC",
      contactPerson: "Nguyễn Văn A",
      phone: "0123456789",
      email: "contact@anhsangabc.com",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      category: "Ánh sáng & Đèn",
      description: "Chuyên cung cấp thiết bị ánh sáng cho sự kiện",
    },
    {
      id: "2",
      name: "Sân Khấu Pro",
      contactPerson: "Trần Thị B",
      phone: "0987654321",
      email: "info@sankhau-pro.com",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
      category: "Sân khấu & Âm thanh",
      description: "Thiết kế và thi công sân khấu chuyên nghiệp",
    },
    {
      id: "3",
      name: "Nhà Hàng Golden",
      contactPerson: "Lê Văn C",
      phone: "0369852147",
      email: "catering@golden.com",
      address: "789 Đường DEF, Quận 7, TP.HCM",
      category: "Tiệc & Đồ ăn",
      description: "Dịch vụ catering cao cấp cho sự kiện",
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    category: "",
    description: "",
  })

  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.contactPerson) {
      const supplier: Supplier = {
        id: Date.now().toString(),
        name: newSupplier.name,
        contactPerson: newSupplier.contactPerson,
        phone: newSupplier.phone || "",
        email: newSupplier.email || "",
        address: newSupplier.address || "",
        category: newSupplier.category || "",
        description: newSupplier.description || "",
      }
      setSuppliers([...suppliers, supplier])
      setNewSupplier({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
        category: "",
        description: "",
      })
      setShowAddDialog(false)
    }
  }

  const handleEditSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(suppliers.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s)))
    setShowEditDialog(false)
    setEditingSupplier(null)
  }

  const handleDeleteSupplier = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
      setSuppliers(suppliers.filter((s) => s.id !== id))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏢 Quản Lý Nhà Cung Cấp</h1>
          <p className="text-gray-600">Quản lý thông tin các nhà cung cấp sản phẩm và dịch vụ</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm Nhà Cung Cấp
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm Nhà Cung Cấp Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên Công Ty *</Label>
                  <Input
                    id="name"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    placeholder="Nhập tên công ty"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Người Liên Hệ *</Label>
                  <Input
                    id="contactPerson"
                    value={newSupplier.contactPerson}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                    placeholder="Tên người liên hệ"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số Điện Thoại</Label>
                  <Input
                    id="phone"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    placeholder="Email liên hệ"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Danh Mục</Label>
                <Input
                  id="category"
                  value={newSupplier.category}
                  onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
                  placeholder="Ví dụ: Ánh sáng & Đèn, Catering, Sân khấu..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa Chỉ</Label>
                <Input
                  id="address"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                  placeholder="Địa chỉ công ty"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô Tả</Label>
                <Textarea
                  id="description"
                  value={newSupplier.description}
                  onChange={(e) => setNewSupplier({ ...newSupplier, description: e.target.value })}
                  placeholder="Mô tả về dịch vụ của nhà cung cấp"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={handleAddSupplier}>Thêm Nhà Cung Cấp</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chỉnh Sửa Nhà Cung Cấp</DialogTitle>
            </DialogHeader>
            {editingSupplier && (
              <SupplierEditForm
                supplier={editingSupplier}
                onSave={handleEditSupplier}
                onCancel={() => {
                  setShowEditDialog(false)
                  setEditingSupplier(null)
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Nhà Cung Cấp</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Danh Mục</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(suppliers.map((s) => s.category).filter(Boolean)).size}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Danh Mục</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(suppliers.map((s) => s.category).filter(Boolean)).size}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Nhà Cung Cấp</CardTitle>
          <CardDescription>Quản lý thông tin các nhà cung cấp</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Công Ty</TableHead>
                <TableHead>Người Liên Hệ</TableHead>
                <TableHead>Liên Hệ</TableHead>
                <TableHead>Danh Mục</TableHead>
                <TableHead>Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-gray-500">{supplier.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {supplier.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {supplier.phone}
                        </div>
                      )}
                      {supplier.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" />
                          {supplier.email}
                        </div>
                      )}
                      {supplier.address && (
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {supplier.address}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category && <Badge variant="outline">{supplier.category}</Badge>}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingSupplier(supplier)
                          setShowEditDialog(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSupplier(supplier.id)}
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
        </CardContent>
      </Card>
    </div>
  )
}

interface SupplierEditFormProps {
  supplier: Supplier
  onSave: (supplier: Supplier) => void
  onCancel: () => void
}

const SupplierEditForm: React.FC<SupplierEditFormProps> = ({ supplier, onSave, onCancel }) => {
  const [editedSupplier, setEditedSupplier] = useState(supplier)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setEditedSupplier((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên Công Ty *</Label>
          <Input id="name" value={editedSupplier.name} onChange={handleInputChange} placeholder="Nhập tên công ty" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Người Liên Hệ *</Label>
          <Input
            id="contactPerson"
            value={editedSupplier.contactPerson}
            onChange={handleInputChange}
            placeholder="Tên người liên hệ"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Số Điện Thoại</Label>
          <Input id="phone" value={editedSupplier.phone} onChange={handleInputChange} placeholder="Số điện thoại" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={editedSupplier.email}
            onChange={handleInputChange}
            placeholder="Email liên hệ"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Danh Mục</Label>
        <Input
          id="category"
          value={editedSupplier.category}
          onChange={handleInputChange}
          placeholder="Ví dụ: Ánh sáng & Đèn, Catering, Sân khấu..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Địa Chỉ</Label>
        <Input id="address" value={editedSupplier.address} onChange={handleInputChange} placeholder="Địa chỉ công ty" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Mô Tả</Label>
        <Textarea
          id="description"
          value={editedSupplier.description}
          onChange={handleInputChange}
          placeholder="Mô tả về dịch vụ của nhà cung cấp"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={() => onSave(editedSupplier)}>Lưu Thay Đổi</Button>
      </div>
    </div>
  )
}
