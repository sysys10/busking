import ApplySong from '@/components/home/ApplySong'
import SetListTable from '@/components/home/SetListTable'
import Link from 'next/link'
import Image from 'next/image'
export default function Page() {
  return (
    <div className="w-full h-full flex flex-col px-4 overflow-hidden bg-main-bg">
      <header className="w-full pb-2 pt-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <Image src="/images/NONAME_LOGO.jpeg" alt="logo" width={100} height={100} />
          <div>
            <h1 className="text-4xl font-bold">노래 버스킹</h1>
          </div>
        </div>
        <p className="text-xl font-bold">오늘의 셋 리스트</p>
      </header>
      <div className="w-full flex-1 flex flex-col rounded-2xl bg-yellow-50">
        <SetListTable />
        <ApplySong />
      </div>
      <Footer />
    </div>
  )
}
function Footer() {
  return (
    <footer className="w-full text-center py-4">
      <div className="flex items-center justify-center gap-3">
        <Link href="https://www.instagram.com/bk.noname_?igsh=MTA1OWV5MHM4YTNvMQ%3D%3D&utm_source=qr">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </Link>
        <Link href="https://www.youtube.com/@%EB%AC%B4%EB%AA%850525">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        </Link>
      </div>
    </footer>
  )
}
