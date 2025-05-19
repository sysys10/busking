'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home')
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="w-full h-full overflow-hidden bg-main-bg">
      <SplashScreen />
    </div>
  )
}

function SplashScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center z-50 bg-main-bg">
      <div className="relative w-full max-w-lg aspect-square">
        <Image src="/images/NONAME_LOGO.jpeg" alt="logo" priority fill className="animate-pulse" />
      </div>
    </div>
  )
}
