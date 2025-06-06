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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
  Star,
  Eye,
} from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  category: string
  instructor: string
  duration: number // hours
  maxStudents: number
  currentStudents: number
  startDate: string
  endDate: string
  status: "draft" | "active" | "completed" | "cancelled"
  price: number
  rating: number
  completionRate: number
  materials: string[]
  requirements: string[]
}

interface Student {
  id: string
  name: string
  email: string
  department: string
  enrolledCourses: string[]
  completedCourses: string[]
  totalHours: number
  certificates: number
  averageScore: number
}

interface TrainingRecord {
  id: string
  studentId: string
  courseId: string
  enrollDate: string
  completionDate?: string
  progress: number
  score?: number
  status: "enrolled" | "in-progress" | "completed" | "failed" | "dropped"
  attendance: number
}

export function TrainingDashboard() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Quản lý Sự kiện Chuyên nghiệp",
      description: "Khóa học toàn diện về quản lý sự kiện từ A-Z",
      category: "Event Management",
      instructor: "Nguyễn Văn A",
      duration: 40,
      maxStudents: 30,
      currentStudents: 25,
      startDate: "2024-06-10",
      endDate: "2024-07-10",
      status: "active",
      price: 5000000,
      rating: 4.8,
      completionRate: 85,
      materials: ["Slide bài giảng", "Video hướng dẫn", "Case study"],
      requirements: ["Kinh nghiệm 1 năm", "Tiếng Anh cơ bản"],
    },
    {
      id: "2",
      title: "Marketing Digital cho Sự kiện",
      description: "Học cách marketing sự kiện trên các nền tảng số",
      category: "Marketing",
      instructor: "Trần Thị B",
      duration: 24,
      maxStudents: 25,
      currentStudents: 20,
      startDate: "2024-06-15",
      endDate: "2024-07-05",
      status: "active",
      price: 3000000,
      rating: 4.6,
      completionRate: 78,
      materials: ["E-book", "Template", "Tools"],
      requirements: ["Hiểu biết cơ bản về marketing"],
    },
    {
      id: "3",
      title: "Kỹ năng Thuyết trình",
      description: "Phát triển kỹ năng thuyết trình và giao tiếp",
      category: "Soft Skills",
      instructor: "Lê Văn C",
      duration: 16,
      maxStudents: 20,
      currentStudents: 18,
      startDate: "2024-05-20",
      endDate: "2024-06-20",
      status: "completed",
      price: 2000000,
      rating: 4.9,
      completionRate: 95,
      materials: ["Handbook", "Video practice"],
      requirements: ["Không yêu cầu"],
    },
  ])

  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Nguyễn Văn X",
      email: "x@company.com",
      department: "Marketing",
      enrolledCourses: ["1", "2"],
      completedCourses: ["3"],
      totalHours: 56,
      certificates: 1,
      averageScore: 8.5,
    },
    {
      id: "2",
      name: "Trần Thị Y",
      email: "y@company.com",
      department: "Sales",
      enrolledCourses: ["1"],
      completedCourses: ["2", "3"],
      totalHours: 40,
      certificates: 2,
      averageScore: 9.2,
    },
  ])

  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>([
    {
      id: "1",
      studentId: "1",
      courseId: "1",
      enrollDate: "2024-06-10",
      progress: 65,
      status: "in-progress",
      attendance: 90,
    },
    {
      id: "2",
      studentId: "1",
      courseId: "3",
      enrollDate: "2024-05-20",
      completionDate: "2024-06-18",
      progress: 100,
      score: 8.5,
      status: "completed",
      attendance: 95,
    },
  ])

  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [showEnrollDialog, setShowEnrollDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("courses")

  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    category: "",
    instructor: "",
    duration: 0,
    maxStudents: 0,
    price: 0,
    materials: [],
    requirements: [],
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.instructor) {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title,
        description: newCourse.description || "",
        category: newCourse.category || "",
        instructor: newCourse.instructor,
        duration: newCourse.duration || 0,
        maxStudents: newCourse.maxStudents || 0,
        currentStudents: 0,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "draft",
        price: newCourse.price || 0,
        rating: 0,
        completionRate: 0,
        materials: newCourse.materials || [],
        requirements: newCourse.requirements || [],
      }
      setCourses([...courses, course])
      setNewCourse({
        title: "",
        description: "",
        category: "",
        instructor: "",
        duration: 0,
        maxStudents: 0,
        price: 0,
        materials: [],
        requirements: [],
      })
      setShowCreateCourse(false)
    }
  }

  const statusLabels = {
    draft: "Bản nháp",
    active: "Đang diễn ra",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  }

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    active: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const totalStudents = students.length
  const totalCourses = courses.length
  const activeCourses = courses.filter((c) => c.status === "active").length
  const completedCourses = courses.filter((c) => c.status === "completed").length
  const totalRevenue = courses.reduce((sum, course) => sum + course.price * course.currentStudents, 0)
  const averageRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length || 0

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🎓 Quản Lý Đào Tạo</h1>
          <p className="text-gray-600">Hệ thống quản lý đào tạo và phát triển nhân sự</p>
        </div>
        <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo Khóa Học
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo Khóa Học Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tên Khóa Học *</Label>
                  <Input
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="Nhập tên khóa học"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Danh Mục</Label>
                  <Select
                    value={newCourse.category}
                    onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Event Management">Quản lý Sự kiện</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Soft Skills">Kỹ năng mềm</SelectItem>
                      <SelectItem value="Technical">Kỹ thuật</SelectItem>
                      <SelectItem value="Leadership">Lãnh đạo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Mô Tả</Label>
                <Textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Mô tả về khóa học"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Giảng Viên *</Label>
                  <Input
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    placeholder="Tên giảng viên"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Thời Lượng (giờ)</Label>
                  <Input
                    type="number"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số Học Viên Tối Đa</Label>
                  <Input
                    type="number"
                    value={newCourse.maxStudents}
                    onChange={(e) => setNewCourse({ ...newCourse, maxStudents: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Học Phí (VNĐ)</Label>
                  <Input
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowCreateCourse(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreateCourse}>Tạo Khóa Học</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Khóa Học</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">+2 khóa mới tháng này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang Diễn Ra</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeCourses}</div>
            <p className="text-xs text-muted-foreground">Khóa học đang hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Học Viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Học viên đã đăng ký</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn Thành</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCourses}</div>
            <p className="text-xs text-muted-foreground">Khóa học đã hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh Thu</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Tổng doanh thu đào tạo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh Giá TB</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">Điểm đánh giá trung bình</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Khóa Học</TabsTrigger>
          <TabsTrigger value="students">Học Viên</TabsTrigger>
          <TabsTrigger value="progress">Tiến Độ</TabsTrigger>
          <TabsTrigger value="analytics">Thống Kê</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Danh Sách Khóa Học</CardTitle>
                  <CardDescription>Quản lý tất cả khóa học đào tạo</CardDescription>
                </div>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm khóa học..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Lọc trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="active">Đang diễn ra</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Khóa Học</TableHead>
                    <TableHead>Giảng Viên</TableHead>
                    <TableHead>Thời Lượng</TableHead>
                    <TableHead>Học Viên</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Đánh Giá</TableHead>
                    <TableHead>Học Phí</TableHead>
                    <TableHead>Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.category}</div>
                        </div>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.duration}h</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>
                            {course.currentStudents}/{course.maxStudents}
                          </span>
                          <Progress value={(course.currentStudents / course.maxStudents) * 100} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[course.status]}>{statusLabels[course.status]}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {course.rating.toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(course.price)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh Sách Học Viên</CardTitle>
              <CardDescription>Quản lý thông tin học viên</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Họ Tên</TableHead>
                    <TableHead>Phòng Ban</TableHead>
                    <TableHead>Khóa Đang Học</TableHead>
                    <TableHead>Đã Hoàn Thành</TableHead>
                    <TableHead>Tổng Giờ Học</TableHead>
                    <TableHead>Chứng Chỉ</TableHead>
                    <TableHead>Điểm TB</TableHead>
                    <TableHead>Hành Động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.enrolledCourses.length}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{student.completedCourses.length}</Badge>
                      </TableCell>
                      <TableCell>{student.totalHours}h</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          {student.certificates}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {student.averageScore.toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tiến Độ Học Tập</CardTitle>
              <CardDescription>Theo dõi tiến độ học tập của học viên</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Học Viên</TableHead>
                    <TableHead>Khóa Học</TableHead>
                    <TableHead>Ngày Đăng Ký</TableHead>
                    <TableHead>Tiến Độ</TableHead>
                    <TableHead>Điểm Danh</TableHead>
                    <TableHead>Điểm Số</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingRecords.map((record) => {
                    const student = students.find((s) => s.id === record.studentId)
                    const course = courses.find((c) => c.id === record.courseId)
                    return (
                      <TableRow key={record.id}>
                        <TableCell>{student?.name}</TableCell>
                        <TableCell>{course?.title}</TableCell>
                        <TableCell>{new Date(record.enrollDate).toLocaleDateString("vi-VN")}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={record.progress} className="w-20 h-2" />
                            <span className="text-sm">{record.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{record.attendance}%</TableCell>
                        <TableCell>{record.score ? record.score.toFixed(1) : "-"}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              record.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : record.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : record.status === "failed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }
                          >
                            {record.status === "completed"
                              ? "Hoàn thành"
                              : record.status === "in-progress"
                                ? "Đang học"
                                : record.status === "failed"
                                  ? "Trượt"
                                  : record.status === "dropped"
                                    ? "Bỏ học"
                                    : "Đã đăng ký"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thống Kê Theo Danh Mục</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Event Management", "Marketing", "Soft Skills", "Technical"].map((category) => {
                    const categoryCount = courses.filter((c) => c.category === category).length
                    const percentage = (categoryCount / totalCourses) * 100
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm text-gray-500">{categoryCount} khóa</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiệu Quả Đào Tạo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">85%</div>
                    <p className="text-sm text-gray-500">Tỷ lệ hoàn thành trung bình</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">4.7/5</div>
                    <p className="text-sm text-gray-500">Điểm hài lòng trung bình</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">92%</div>
                    <p className="text-sm text-gray-500">Tỷ lệ áp dụng kiến thức</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
