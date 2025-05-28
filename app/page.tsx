import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FeaturedPapers } from "@/components/featured-papers"
import { HeroStats } from "@/components/hero-stats"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Access Past Exam Papers for Academic Success
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Prepare effectively with our comprehensive collection of previous years' examination papers from all
                streams and departments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link href="/papers">Browse Papers</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Students studying with exam papers"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <form className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Search by subject, course code, or keyword..."
                className="flex-1 bg-white/80 text-gray-900 placeholder:text-gray-500 border-0"
              />
              <Button type="submit" className="bg-white text-primary hover:bg-white/90">
                <SearchIcon className="mr-2 h-4 w-4" /> Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <HeroStats />

      {/* Featured Papers */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Exam Papers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular examination papers across various departments and streams
            </p>
          </div>
          <FeaturedPapers />
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/papers">View All Papers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How EduArchive Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get access to past examination papers in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Search",
                description: "Find papers by department, stream, year, or keyword",
                icon: "🔍",
              },
              {
                title: "Subscribe",
                description: "Choose a plan that suits your academic needs",
                icon: "💳",
              },
              {
                title: "Download",
                description: "Access and download papers in PDF format",
                icon: "📥",
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Student Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what students have to say about using EduArchive for their exam preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "EduArchive helped me improve my grades significantly. Having access to past papers made my exam preparation much more effective.",
                name: "Sarah Johnson",
                role: "Computer Science Student",
              },
              {
                quote:
                  "The variety of papers available is impressive. I found papers for all my courses, which helped me understand the exam pattern better.",
                name: "Michael Chen",
                role: "Engineering Student",
              },
              {
                quote:
                  "The search functionality is amazing! I could easily find papers by specific topics or years, saving me a lot of time.",
                name: "Priya Sharma",
                role: "Business Administration Student",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6">
                  <div className="text-4xl text-primary absolute -top-5 left-4">"</div>
                  <p className="mb-4 pt-4 italic">{testimonial.quote}</p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Exams?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already benefiting from our comprehensive exam paper repository.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/papers">Browse Papers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
