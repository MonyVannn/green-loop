import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, Factory, TrendingUp, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-green-900" />
            <span className="text-xl font-bold text-green-900">GreenLoop</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Turn Industrial Waste Into Valuable Resources
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  GreenLoop connects waste producers with businesses that can use waste as raw materials, creating a
                  sustainable circular economy.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] bg-gradient-to-b from-green-900/20 to-transparent rounded-full flex items-center justify-center">
                <div className="absolute inset-4 bg-white dark:bg-gray-950 rounded-full flex items-center justify-center">
                  <Recycle className="h-32 w-32 text-green-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform offers a comprehensive solution for industrial waste management and resource recovery.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-900 text-white">
                <Factory className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Waste Listing & Matching</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily list your industrial waste and get matched with businesses that can use it as raw material.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-900 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Impact Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Track your sustainability metrics and see the environmental impact of your waste reduction efforts.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-900 text-white">
                <Shield className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure Transactions</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage inquiries and track transaction status with our secure communication system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Join the Circular Economy?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Sign up today and start turning waste into resources.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg">Sign Up Now</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Recycle className="h-5 w-5 text-green-900" />
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 GreenLoop. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline underline-offset-4 dark:text-gray-400">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline underline-offset-4 dark:text-gray-400">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline underline-offset-4 dark:text-gray-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

