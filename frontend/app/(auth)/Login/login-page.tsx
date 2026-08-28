"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Card size="sm" className="m-auto w-full max-w-sm [--card-spacing:--spacing(6)]">
      <CardHeader>
        <div className="flex flex-col items-center gap-2">
          <div className="relative mx-auto my-1 h-16 w-16">
            <Image 
              src="/image/logo/cmk.png"
                alt="logo"
                fill
                className="object-contain"
              />
          </div>
          <CardTitle>POS AREA</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                type="text"
                placeholder="Masukkan NIK"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative flex items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-0 h-full px-2 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none z-10 cursor-pointer"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2 mb-4">
        <Button type="submit" className="w-full px-2 bg-btn-primary-bg text-navy-dark">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Lupa Password
        </Button>
      </CardFooter>
    </Card>
  )
}
