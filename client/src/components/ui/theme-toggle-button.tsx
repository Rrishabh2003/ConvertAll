
import React, { useState, useRef, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

interface ThemeToggleButtonProps {
  showLabel?: boolean
  variant?: "default" | "circle" | "circle-blur" | "gif"
  start?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  url?: string
  className?: string
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  showLabel = false,
  variant = "default",
  start = "top-left",
  url,
  className
}) => {
  const { theme, setTheme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    
    if (variant === "circle" || variant === "circle-blur") {
      setIsAnimating(true)
      animateThemeChange(newTheme)
    } else {
      setTheme(newTheme)
    }
  }

  const animateThemeChange = (newTheme: string) => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    
    // Calculate start position based on variant
    let startX, startY
    switch (start) {
      case "top-left":
        startX = rect.left
        startY = rect.top
        break
      case "top-right":
        startX = rect.right
        startY = rect.top
        break
      case "bottom-left":
        startX = rect.left
        startY = rect.bottom
        break
      case "bottom-right":
        startX = rect.right
        startY = rect.bottom
        break
      case "center":
      default:
        startX = rect.left + rect.width / 2
        startY = rect.top + rect.height / 2
        break
    }

    // Create animation circle
    const circle = document.createElement("div")
    circle.style.position = "fixed"
    circle.style.left = `${startX}px`
    circle.style.top = `${startY}px`
    circle.style.width = "0px"
    circle.style.height = "0px"
    circle.style.borderRadius = "50%"
    circle.style.backgroundColor = newTheme === "dark" ? "#1a1a1a" : "#ffffff"
    circle.style.zIndex = "9999"
    circle.style.pointerEvents = "none"
    circle.style.transform = "translate(-50%, -50%)"
    circle.style.transition = "all 0.5s ease-out"
    
    if (variant === "circle-blur") {
      circle.style.filter = "blur(10px)"
    }

    document.body.appendChild(circle)

    // Trigger animation
    requestAnimationFrame(() => {
      const maxDimension = Math.max(window.innerWidth, window.innerHeight) * 2
      circle.style.width = `${maxDimension}px`
      circle.style.height = `${maxDimension}px`
    })

    // Change theme after animation starts
    setTimeout(() => {
      setTheme(newTheme)
    }, 250)

    // Clean up
    setTimeout(() => {
      circle.remove()
      setIsAnimating(false)
    }, 500)
  }

  if (variant === "gif" && url) {
    return (
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          "relative overflow-hidden rounded-lg border-2 border-transparent hover:border-primary/20 transition-all duration-200",
          className
        )}
        disabled={isAnimating}
      >
        <img
          src={url}
          alt="Theme toggle"
          className="w-12 h-12 object-cover"
        />
        {showLabel && (
          <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5">
            {theme === "light" ? "Dark" : "Light"}
          </span>
        )}
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors",
        isAnimating && "pointer-events-none",
        className
      )}
      disabled={isAnimating}
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      {showLabel && (
        <span className="text-sm">
          {theme === "light" ? "Light" : "Dark"}
        </span>
      )}
    </button>
  )
}

export default ThemeToggleButton
