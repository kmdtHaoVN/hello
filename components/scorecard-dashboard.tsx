"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  Users,
  Cog,
  GraduationCap,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Download,
} from "lucide-react"

interface KPI {
  id: string
  name: string
  category: "financial" | "customer" | "process" | "learning"
  currentValue: number
  targetValue: number
  unit: string
  trend: "up" | "down" | "stable"
  trendPercentage: number
  status: "excellent" | "good" | "warning" | "critical"
  description: string
  lastUpdated: string
}

interface ScorecardPerspective {
  id: string
  name: string
  description: string
  weight: number
  score: number
  kpis: KPI[]
}

export function ScorecardDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [selectedView, setSelectedView] = useState("overview")

  const [perspectives, setPerspectives] = useState<ScorecardPerspective[]>([
    {
      id: "financial",
      name: "Tài Chính",
      description: "Hiệu quả tài chính và lợi nhuận",
      weight: 25,
      score: 85,
      kpis: [
        {
          id: "revenue",
          name: "Doanh Thu",
          category: "financial",
          currentValue: 2500000000,
          targetValue: 3000000000,
          unit: "VNĐ",
          trend: "up",
          trendPercentage: 12,
          status: "good",
          description: "Tổng doanh thu từ các sự kiện",
          lastUpdated: "2024-06-06",
        },
        {
          id: "profit_margin",
          name: "Tỷ Suất Lợi Nhuận",
          category: "financial",
          currentValue: 18,
          targetValue: 20,
          unit: "%",
          trend: "up",
          trendPercentage: 2,
          status: "warning",
          description: "Tỷ lệ lợi nhuận trên doanh thu",
          lastUpdated: "2024-06-06",
        },
        {
          id: "cost_efficiency",
          name: "Hiệu Quả Chi Phí",
          category: "financial",
          currentValue: 92,
          targetValue: 95,
          unit: "%",
          trend: "stable",
          trendPercentage: 0,
          status: "good",
          description: "Tỷ lệ chi phí được kiểm soát",
          lastUpdated: "2024-06-06",
        },
      ],
    },
    {
      id: "customer",
      name: "Khách Hàng",
      description: "Sự hài lòng và giữ chân khách hàng",
      weight: 25,
      score: 92,
      kpis: [
        {
          id: "satisfaction",
          name: "Độ Hài Lòng",
          category: "customer",
          currentValue: 4.6,
          targetValue: 4.5,
          unit: "/5",
          trend: "up",
          trendPercentage: 8,
          status: "excellent",
          description: "Điểm đánh giá trung bình từ khách hàng",
          lastUpdated: "2024-06-06",
        },
        {
          id: "retention",
          name: "Tỷ Lệ Giữ Chân",
          category: "customer",
          currentValue: 88,
          targetValue: 85,
          unit: "%",
          trend: "up",
          trendPercentage: 5,
          status: "excellent",
          description: "Tỷ lệ khách hàng quay lại",
          lastUpdated: "2024-06-06",
        },
        {
          id: "new_customers",
          name: "Khách Hàng Mới",
          category: "customer",
          currentValue: 45,
          targetValue: 50,
          unit: "khách/tháng",
          trend: "down",
          trendPercentage: -3,
          status: "warning",
          description: "Số khách hàng mới mỗi tháng",
          lastUpdated: "2024-06-06",
        },
      ],
    },
    {
      id: "process",
      name: "Quy Trình",
      description: "Hiệu quả vận hành và quy trình",
      weight: 25,
      score: 78,
      kpis: [
        {
          id: "event_success",
          name: "Tỷ Lệ Thành Công",
          category: "process",
          currentValue: 94,
          targetValue: 95,
          unit: "%",
          trend: "stable",
          trendPercentage: 0,
          status: "good",
          description: "Tỷ lệ sự kiện thành công",
          lastUpdated: "2024-06-06",
        },
        {
          id: "delivery_time",
          name: "Thời Gian Giao Hàng",
          category: "process",
          currentValue: 3.2,
          targetValue: 3.0,
          unit: "ngày",
          trend: "down",
          trendPercentage: -5,
          status: "warning",
          description: "Thời gian trung bình hoàn thành dự án",
          lastUpdated: "2024-06-06",
        },
        {
          id: "quality_score",
          name: "Điểm Chất Lượng",
          category: "process",
          currentValue: 87,
          targetValue: 90,
          unit: "%",
          trend: "up",
          trendPercentage: 3,
          status: "good",
          description: "Điểm chất lượng dịch vụ",
          lastUpdated: "2024-06-06",
        },
      ],
    },
    {
      id: "learning",
      name: "Học Hỏi & Phát Triển",
      description: "Phát triển nhân sự và năng lực",
      weight: 25,
      score: 88,
      kpis: [
        {
          id: "training_hours",
          name: "Giờ Đào Tạo",
          category: "learning",
          currentValue: 32,
          targetValue: 40,
          unit: "giờ/người",
          trend: "up",
          trendPercentage: 15,
          status: "good",
          description: "Số giờ đào tạo trung bình mỗi nhân viên",
          lastUpdated: "2024-06-06",
        },
        {
          id: "skill_improvement",
          name: "Cải Thiện Kỹ Năng",
          category: "learning",
          currentValue: 85,
          targetValue: 80,
          unit: "%",
          trend: "up",
          trendPercentage: 8,
          status: "excellent",
          description: "Tỷ lệ nhân viên cải thiện kỹ năng",
          lastUpdated: "2024-06-06",
        },
        {
          id: "innovation_projects",
          name: "Dự Án Sáng Tạo",
          category: "learning",
          currentValue: 12,
          targetValue: 15,
          unit: "dự án",
          trend: "up",
          trendPercentage: 20,
          status: "good",
          description: "Số dự án sáng tạo được triển khai",
          lastUpdated: "2024-06-06",
        },
      ],
    },
  ])

  const formatValue = (value: number, unit: string) => {
    if (unit === "VNĐ") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        notation: "compact",
      }).format(value)
    }
    return `${value}${unit}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "good":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-600" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const overallScore = perspectives.reduce((sum, p) => sum + (p.score * p.weight) / 100, 0)

  const perspectiveIcons = {
    financial: DollarSign,
    customer: Users,
    process: Cog,
    learning: GraduationCap,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">⚖️ Bảng Điểm Cân Bằng</h1>
          <p className="text-gray-600">Balanced Scorecard - Đánh giá hiệu suất tổng thể theo 4 góc độ</p>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Tháng hiện tại</SelectItem>
              <SelectItem value="quarter">Quý hiện tại</SelectItem>
              <SelectItem value="year">Năm hiện tại</SelectItem>
              <SelectItem value="ytd">Từ đầu năm</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất Báo Cáo
          </Button>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Điểm Tổng Thể</h2>
              <p className="text-gray-600">Balanced Scorecard tổng hợp</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{overallScore.toFixed(1)}/100</div>
              <div className="flex items-center justify-end mt-2">
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+3.2% so với tháng trước</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Perspective Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {perspectives.map((perspective) => {
          const IconComponent = perspectiveIcons[perspective.id as keyof typeof perspectiveIcons]
          return (
            <Card key={perspective.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{perspective.name}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{perspective.score}/100</div>
                <p className="text-xs text-muted-foreground mb-3">{perspective.description}</p>
                <Progress value={perspective.score} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">Trọng số: {perspective.weight}%</span>
                  <Badge variant="outline" className="text-xs">
                    {perspective.kpis.length} KPI
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="financial">Tài Chính</TabsTrigger>
          <TabsTrigger value="customer">Khách Hàng</TabsTrigger>
          <TabsTrigger value="process">Quy Trình</TabsTrigger>
          <TabsTrigger value="learning">Học Hỏi & PT</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiệu Suất Theo Góc Độ</CardTitle>
                <CardDescription>So sánh điểm số các góc độ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {perspectives.map((perspective) => (
                  <div key={perspective.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{perspective.name}</span>
                      <span className="text-sm text-gray-500">{perspective.score}/100</span>
                    </div>
                    <Progress value={perspective.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPI Cần Chú Ý</CardTitle>
                <CardDescription>Các chỉ số cần cải thiện</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {perspectives
                    .flatMap((p) => p.kpis)
                    .filter((kpi) => kpi.status === "warning" || kpi.status === "critical")
                    .slice(0, 5)
                    .map((kpi) => (
                      <div key={kpi.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(kpi.status)}
                          <div>
                            <div className="font-medium text-sm">{kpi.name}</div>
                            <div className="text-xs text-gray-500">{kpi.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{formatValue(kpi.currentValue, kpi.unit)}</div>
                          <div className="text-xs text-gray-500">
                            Mục tiêu: {formatValue(kpi.targetValue, kpi.unit)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {perspectives.map((perspective) => (
          <TabsContent key={perspective.id} value={perspective.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      {React.createElement(perspectiveIcons[perspective.id as keyof typeof perspectiveIcons], {
                        className: "h-5 w-5 mr-2",
                      })}
                      {perspective.name}
                    </CardTitle>
                    <CardDescription>{perspective.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{perspective.score}/100</div>
                    <div className="text-sm text-gray-500">Trọng số: {perspective.weight}%</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {perspective.kpis.map((kpi) => (
                    <Card key={kpi.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{kpi.name}</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">{kpi.description}</p>
                          </div>
                          <Badge className={getStatusColor(kpi.status)}>
                            {kpi.status === "excellent"
                              ? "Xuất sắc"
                              : kpi.status === "good"
                                ? "Tốt"
                                : kpi.status === "warning"
                                  ? "Cảnh báo"
                                  : "Nguy hiểm"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Hiện tại:</span>
                          <span className="text-lg font-bold text-blue-600">
                            {formatValue(kpi.currentValue, kpi.unit)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Mục tiêu:</span>
                          <span className="text-sm font-medium">{formatValue(kpi.targetValue, kpi.unit)}</span>
                        </div>
                        <Progress value={(kpi.currentValue / kpi.targetValue) * 100} className="h-2" />
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(kpi.trend)}
                            <span
                              className={`text-sm ${
                                kpi.trend === "up"
                                  ? "text-green-600"
                                  : kpi.trend === "down"
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {kpi.trendPercentage > 0 ? "+" : ""}
                              {kpi.trendPercentage}%
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Cập nhật: {new Date(kpi.lastUpdated).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Chi tiết
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Cập nhật
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
