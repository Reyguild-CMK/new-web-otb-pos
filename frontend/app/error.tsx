"use client"

import Link from "next/link"
import { useState } from "react"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
  setIsRetrying(true)

  if (typeof reset === "function") {
    reset()
    return
  }

  window.location.reload()
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-light px-6 py-12">
      <div className="w-full max-w-md text-center">
        <div className="text-8xl font-bold leading-none text-alert-error-border">ERROR</div>
        <div className="mt-4 text-2xl font-semibold text-navy-dark">Terjadi kesalahan</div>
        <div className="mt-3 text-sm leading-6 text-gray-medium">
          Halaman belum dapat dimuat. Silakan coba lagi beberapa saat.
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-btn-primary-bg px-4 text-sm font-semibold text-btn-primary-text hover:bg-btn-primary-bg/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isRetrying && <span className="h-4 w-4 animate-spin rounded-full border-2 border-btn-primary-text/30 border-t-btn-primary-text" aria-hidden="true" />}
            {isRetrying ? "Memuat ulang..." : "Coba lagi"}
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-white px-4 text-sm font-medium text-navy-dark hover:bg-gray-light"
          >
            Ke halaman awal
          </Link>
        </div>
      </div>
    </main>
  )
}