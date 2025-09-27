"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

export default function LoadingSpinner({ size = "md", color = "text-green-600" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full ${color}`}
        style={{
          borderTopColor: "currentColor",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
