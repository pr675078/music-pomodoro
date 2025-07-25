"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { TimelinePage } from "@/components/timeline-page"
import { TodoPage } from "@/components/todo-page"
import { AchievementsPage } from "@/components/achievements-page"
import { TimerPage } from "@/components/timer-page"
import { ThemeProvider } from "@/components/theme-provider"
import { useState } from "react"

export function ProductivityDashboard() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <DashboardContent />
      case "timer":
        return <TimerPage />
      case "timeline":
        return <TimelinePage />
      case "todo":
        return <TodoPage />
      case "achievements":
        return <AchievementsPage />
      default:
        return <DashboardContent />
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <SidebarProvider defaultOpen={true}>
          <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <SidebarInset>{renderPage()}</SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
