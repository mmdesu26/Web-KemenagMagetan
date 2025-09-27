"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  loading?: boolean
}

export default function AnimatedButton({ children, loading = false, disabled, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: loading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Button disabled={loading || disabled} {...props}>
        <motion.div
          animate={loading ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
          transition={loading ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY } : {}}
        >
          {children}
        </motion.div>
      </Button>
    </motion.div>
  )
}
