"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { EventDashboard } from "./event-dashboard"
import { ApprovalDashboard } from "./approval-dashboard"
import { SupplierManagement } from "./supplier-management"
import { ProductManagement } from "./product-management"
import { QuotationManagement } from "./quotation-management"
import { UserManagement } from "./user-management"
import { GroupManagement } from "./group-management"
import { HomeDashboard } from "./home-dashboard"
import { NotificationsDashboard } from "./notifications-dashboard"
import { SettingsDashboard } from "./settings-dashboard"
import { OrganizationDashboard } from "./organization-dashboard"
import { PartnersDashboard } from "./partners-dashboard"
import { TourDashboard } from "./tour-dashboard"
import { OpportunitiesDashboard } from "./opportunities-dashboard"
import { TourCustomersDashboard } from "./tour-customers-dashboard"
import { TrainingDashboard } from "./training-dashboard"
import { ScorecardDashboard } from "./scorecard-dashboard"
import { StatisticsDashboard } from "./statistics-dashboard"

export function MainLayout() {
  const [currentView, setCurrentView] = useState("dashboard")

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <HomeDashboard />
      case "organization":
        return <OrganizationDashboard />
      case "user":
        return <UserManagement />
      case "group":
        return <GroupManagement />
      case "partners":
        return <PartnersDashboard />
      case "tour":
        return <TourDashboard />
      case "products":
        return <ProductManagement />
      case "suppliers":
        return <SupplierManagement />
      case "quotations":
        return <QuotationManagement />
      case "opportunities":
        return <OpportunitiesDashboard />
      case "tour-customers":
        return <TourCustomersDashboard />
      case "events-list":
        return <EventDashboard />
      case "events-approval":
        return <ApprovalDashboard />
      case "training":
        return <TrainingDashboard />
      case "scorecard":
        return <ScorecardDashboard />
      case "statistics":
        return <StatisticsDashboard />
      case "notifications":
        return <NotificationsDashboard />
      case "settings":
        return <SettingsDashboard />
      default:
        return <HomeDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
