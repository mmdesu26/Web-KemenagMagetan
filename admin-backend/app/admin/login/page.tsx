"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { motion, type Variants } from "framer-motion"
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSpinner, FaCheckCircle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { validateAdminCredentials } from "@/lib/auth"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call delay with loading animation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const validUser = validateAdminCredentials(username, password)

    if (validUser) {
      setSuccess(true)
      // Store admin session
      localStorage.setItem("adminAuth", JSON.stringify(validUser))

      // Delay for success animation
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 1000)
    } else {
      setError("Username atau password salah, atau akun tidak aktif")
      setLoading(false)
    }
  }

   const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  }

  const inputVariants: Variants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-6">
            <motion.div
              className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
              }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <FaUser className="text-white text-2xl" />
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Admin Kemenag Magetan
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">Masuk ke panel administrasi</CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: 2 }}>
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Login Berhasil!</h3>
                  <p className="text-gray-600">Mengalihkan ke dashboard...</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  onSubmit={handleLogin}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <motion.div className="relative" variants={inputVariants} whileFocus="focus">
                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Masukkan username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 h-12 border-2 border-gray-200 focus:border-green-400 transition-all duration-200"
                        required
                        disabled={loading}
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <motion.div className="relative" variants={inputVariants} whileFocus="focus">
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-12 h-12 border-2 border-gray-200 focus:border-green-400 transition-all duration-200"
                        required
                        disabled={loading}
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={loading}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </motion.button>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div
                          className="flex items-center"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <FaSpinner className="animate-spin mr-2" />
                          Memproses...
                        </motion.div>
                      ) : (
                        "Masuk"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {!success && (
              <motion.div
                className="mt-6 text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="font-medium mb-2">Demo Credentials:</p>
                <div className="space-y-1">
                  <p>
                    <span className="font-mono bg-white px-2 py-1 rounded">admin</span> /{" "}
                    <span className="font-mono bg-white px-2 py-1 rounded">admin123</span>
                  </p>
                  <p>
                    <span className="font-mono bg-white px-2 py-1 rounded">superadmin</span> /{" "}
                    <span className="font-mono bg-white px-2 py-1 rounded">super123</span>
                  </p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
