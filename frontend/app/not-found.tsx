"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export default function NotFound() {
    const router = useRouter()

    const handleBack = useCallback(() => {
        if (window.history.length > 1) {
            router.back()
            return
        }

        router.push("/")
    }, [router])

    return (
        <main className="flex min-h-screen items-center justify-center bg-blue-light px-6 py-12">
            <div className="w-full max-w-md text-center">
                <div className="text-8xl font-bold leading-none text-navy-dark">404</div>
                <div className="mt-4 text-2xl font-semibold text-navy-dark">Halaman tidak ditemukan</div>
                <div className="mt-3 text-sm leading-6 text-gray-medium">
                    Halaman yang Anda cari tidak tersedia atau alamatnya tidak sesuai.
                </div>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="h-10 rounded-md border border-border bg-white px-4 text-sm text-navy-dark hover:bg-gray-light"
                    >
                        Kembali
                    </button>
                    <Link
                        href="/"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-btn-primary-bg px-4 text-sm font-medium text-btn-primary-text hover:bg-btn-primary-bg/90"
                    >
                        Ke halaman awal
                    </Link>
                </div>
            </div>
        </main>
    )
}