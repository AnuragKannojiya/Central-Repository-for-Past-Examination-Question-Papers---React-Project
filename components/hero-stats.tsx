"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, Download, School } from "lucide-react"
import { useEffect, useState } from "react"

// Mock data for stats
const statsData = [
  {
    title: "Exam Papers",
    value: 15000,
    icon: <FileText className="h-8 w-8 text-primary" />,
    description: "Comprehensive collection across all subjects",
  },
  {
    title: "Students",
    value: 50000,
    icon: <Users className="h-8 w-8 text-primary" />,
    description: "Active users improving their grades",
  },
  {
    title: "Downloads",
    value: 250000,
    icon: <Download className="h-8 w-8 text-primary" />,
    description: "Papers downloaded for exam preparation",
  },
  {
    title: "Institutions",
    value: 120,
    icon: <School className="h-8 w-8 text-primary" />,
    description: "Universities and colleges covered",
  },
]

export function HeroStats() {
  const [stats, setStats] = useState(statsData.map((stat) => ({ ...stat, displayValue: 0 })))

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat, index) => {
          const targetValue = statsData[index].value
          const currentValue = stat.displayValue
          const increment = Math.ceil(targetValue / 20)
          const newValue = Math.min(currentValue + increment, targetValue)

          return {
            ...stat,
            displayValue: newValue,
          }
        }),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{stat.displayValue.toLocaleString()}</h3>
                <p className="font-medium text-lg mb-1">{stat.title}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
