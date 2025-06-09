'use client'

import supabaseClient from '@/lib/supabase'
import { useEffect, useState } from 'react'
type SetList = {
  id: number
  title: string
  singer: string
  order: number
  vocal: string | null
}
export default function SetListTable() {
  const [setList, setSetList] = useState<SetList[]>([])
  useEffect(() => {
    const fetchSetList = async () => {
      const supabase = supabaseClient()
      const { data, error } = await supabase
        .from('setLists')
        .select('*')
        .eq('isAvaible', true)
        .order('order', { ascending: true })
      if (error) {
        console.error(error)
      } else {
        setSetList(data)
      }
    }
    fetchSetList()
  }, [])
  return (
    <div className="flex-1 w-full flex flex-col justify-between">
      <div className="w-full px-3 pt-3 overflow-y-auto" style={{ flex: '1 1 0' }}>
        <div className="w-full divide-y">
          {setList.length > 0 ? (
            setList.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-12 py-3 items-center">
                <div className="col-span-2 text-center">{idx + 1}</div>
                <div className="col-span-7">{item.title}</div>
                <div className="col-span-3 text-gray-600">
                  {item.singer} ({item.vocal})
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-gray-500">아직 셋 리스트가 없습니다.</div>
          )}
        </div>
      </div>
      <div className="text-base font-medium text-center">
        <p className="select-all">3333-13-1347021 카카오뱅크(Team Noname)</p>
      </div>
    </div>
  )
}
