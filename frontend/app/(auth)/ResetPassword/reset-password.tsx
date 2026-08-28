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
import { useState } from "react"

export function ResetPasswordPage() {
//   const [showPassword, setShowPassword] = useState(false)
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
          <CardTitle>Lupa Password</CardTitle>
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
                placeholder="Masukkan Nomor Induk Karyawan"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2 mb-4">
        <Button type="submit" className="w-full bg-btn-primary-bg text-navy-dark">
          Kirim ke Email
        </Button>
        <Button variant="outline" className="w-full">
          Kembali ke Login
        </Button>
      </CardFooter>
    </Card>
  )
}
