'use client'
import { useState } from 'react'
import supabaseClient from '@/lib/supabase'
import { Button } from '../../../../../packages/ui/src/components/button'

export default function ApplySong() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [singer, setSinger] = useState('')
  const [vocal, setVocal] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !singer) return

    setIsSubmitting(true)

    try {
      const supabase = supabaseClient()
      const { error } = await supabase.from('setLists').insert([
        {
          title,
          singer,
          order: 0,
        },
      ])

      if (error) throw error

      setTitle('')
      setSinger('')
      alert('신청이 완료되었습니다!')
    } catch (error) {
      console.error('신청 중 오류가 발생했습니다:', error)
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full rounded-b-2xl flex flex-col gap-2 px-4 py-2">
      <Button onClick={() => setIsOpen(true)} className="text-lg">
        노래 신청하기
      </Button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4 w-full max-w-md mx-4"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">신청곡 남기기</h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col items-center gap-3">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="신청자 이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="노래 제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="가수"
                  value={singer}
                  onChange={(e) => setSinger(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="보컬지정 (선택사항)"
                  value={vocal}
                  onChange={(e) => setVocal(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="text-lg mt-2">
                {isSubmitting ? '신청 중...' : '신청하기'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
