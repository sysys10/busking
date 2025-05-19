'use client'
import { useState } from 'react'
import supabaseClient from '@/lib/supabase'
import { Button } from '../../../../../packages/ui/src/components/button'

export default function ApplySong() {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [singer, setSinger] = useState('')
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
          order: Math.floor(Math.random() * 100), // 임시 순서 번호
        },
      ])

      if (error) throw error

      // 성공 후 입력 필드 초기화
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
    <div className="w-full bg-white rounded-b-2xl px-4 pb-4 pt-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">신청곡 남기기</h3>
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="이름"
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
        </div>
        {/* <button
          type="submit"
          className="w-full p-3 bg-amber-400 rounded-lg font-bold text-white hover:bg-amber-500 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? '신청 중...' : '신청하기'}
        </button> */}
        <Button type="submit" disabled={isSubmitting} className="text-lg">
          {isSubmitting ? '신청 중...' : '신청하기'}
        </Button>
      </form>
    </div>
  )
}
