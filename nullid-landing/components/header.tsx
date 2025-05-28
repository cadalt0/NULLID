"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span>NullID</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("telegram")}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Telegram
            </button>
          </nav>
          <ThemeToggle />
          <Button
            data-tally-open="w8ydlA"
            data-tally-layout="modal"
            data-tally-align-left="1"
            data-tally-overlay="1"
            data-tally-emoji-text="🛡️"
            data-tally-emoji-animation="wave"
            className="rounded-md bg-primary text-white hover:bg-primary/90"
          >
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <button
                  onClick={() => {
                    scrollToSection("features")
                  }}
                  className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    scrollToSection("how-it-works")
                  }}
                  className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => {
                    scrollToSection("telegram")
                  }}
                  className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Telegram
                </button>
                <Button
                  data-tally-open="w8ydlA"
                  data-tally-layout="modal"
                  data-tally-align-left="1"
                  data-tally-overlay="1"
                  data-tally-emoji-text="🛡️"
                  data-tally-emoji-animation="wave"
                  className="mt-4"
                >
                  Join Waitlist
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
