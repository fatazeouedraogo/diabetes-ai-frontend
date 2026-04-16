"use client"

import { Activity, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onStartClick: () => void
}

export function Header({ onStartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Compensation pour le header fixe (64px = h-16)
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("hero") }} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white text-lg">DiabetesAI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => scrollToSection("hero")} 
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection("prediction")} 
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              Prediction
            </button>
            <button 
              onClick={() => scrollToSection("models")} 
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              Modeles
            </button>
            <button 
              onClick={() => scrollToSection("dataset")} 
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              Dataset
            </button>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5">
                  Docs
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  Guide API
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Integration Python
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Exemples
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              size="sm" 
              onClick={onStartClick}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Commencer
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-1">
              <button 
                onClick={() => scrollToSection("hero")} 
                className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md text-left transition-colors"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection("prediction")} 
                className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md text-left transition-colors"
              >
                Prediction
              </button>
              <button 
                onClick={() => scrollToSection("models")} 
                className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md text-left transition-colors"
              >
                Modeles
              </button>
              <button 
                onClick={() => scrollToSection("dataset")} 
                className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md text-left transition-colors"
              >
                Dataset
              </button>
              <div className="pt-3 mt-2 border-t border-white/10">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white" onClick={onStartClick}>
                  Commencer
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}