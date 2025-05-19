'use client'

import { useState, useEffect } from 'react'
import { Button } from '@workspace/ui/components/button'
import { createClient } from '@supabase/supabase-js'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Edit2, Trash2, Save, X, MoreVertical } from 'lucide-react'

// Supabase 클라이언트 설정 (환경변수 필요)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
)

type SetList = {
  id: number
  title: string
  singer: string
  order: number
  isAvaible: boolean // 데이터베이스의 컬럼명이 isAvaible (오타)
  vocal: string | null
  created_at: string
}

// 모바일용 카드 컴포넌트
function SortableCard({
  item,
  index,
  onEdit,
  onDelete,
  isEditing,
  editForm,
  setEditForm,
  onSave,
  onCancel,
}: {
  item: SetList
  index: number
  onEdit: (item: SetList) => void
  onDelete: (id: number) => void
  isEditing: boolean
  editForm: any
  setEditForm: (form: any) => void
  onSave: () => void
  onCancel: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg p-4 mb-3 ${isDragging ? 'shadow-lg' : 'shadow-sm'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <button
            {...attributes}
            {...listeners}
            className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1"
          >
            <GripVertical size={20} />
          </button>
          <span className="font-semibold text-lg text-gray-900">#{index + 1}</span>
        </div>
        <span
          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
            item.isAvaible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {item.isAvaible ? '연주 가능' : '연주 불가'}
        </span>
      </div>

      {isEditing ? (
        // 수정 모드
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">곡명</label>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="곡명을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">가수</label>
            <input
              type="text"
              value={editForm.singer}
              onChange={(e) => setEditForm({ ...editForm, singer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="가수명을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">보컬 (선택사항)</label>
            <input
              type="text"
              value={editForm.vocal || ''}
              onChange={(e) => setEditForm({ ...editForm, vocal: e.target.value || null })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="보컬을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">셋리 포함 여부</label>
            <select
              value={editForm.isAvaible.toString()}
              onChange={(e) => setEditForm({ ...editForm, isAvaible: e.target.value === 'true' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">연주 가능</option>
              <option value="false">연주 불가</option>
            </select>
          </div>
          <div className="flex space-x-2 pt-2">
            <Button onClick={onSave} className="flex-1">
              <Save size={16} className="mr-2" />
              저장
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              <X size={16} className="mr-2" />
              취소
            </Button>
          </div>
        </div>
      ) : (
        // 일반 모드
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
            <p className="text-gray-600">{item.singer}</p>
            {item.vocal && <p className="text-sm text-gray-500">보컬: {item.vocal}</p>}
          </div>
          <div className="flex space-x-2 pt-3">
            <Button size="sm" variant="outline" onClick={() => onEdit(item)} className="flex-1">
              <Edit2 size={16} className="mr-2" />
              수정
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(item.id)}
              className="flex-1"
            >
              <Trash2 size={16} className="mr-2" />
              삭제
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// 데스크톱용 테이블 행 컴포넌트
function SortableRow({
  item,
  index,
  onEdit,
  onDelete,
  isEditing,
  editForm,
  setEditForm,
  onSave,
  onCancel,
}: {
  item: SetList
  index: number
  onEdit: (item: SetList) => void
  onDelete: (id: number) => void
  isEditing: boolean
  editForm: any
  setEditForm: (form: any) => void
  onSave: () => void
  onCancel: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-gray-50 ${isDragging ? 'shadow-lg' : ''}`}
    >
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            {...attributes}
            {...listeners}
            className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} />
          </button>
          <span className="font-medium">{index + 1}</span>
        </div>
      </td>

      {isEditing ? (
        // 수정 모드
        <>
          <td className="px-4 py-3">
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="곡명"
            />
          </td>
          <td className="px-4 py-3">
            <input
              type="text"
              value={editForm.singer}
              onChange={(e) => setEditForm({ ...editForm, singer: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="가수"
            />
          </td>
          <td className="px-4 py-3">
            <input
              type="text"
              value={editForm.vocal || ''}
              onChange={(e) => setEditForm({ ...editForm, vocal: e.target.value || null })}
              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="보컬 (선택사항)"
            />
          </td>
          <td className="px-4 py-3 text-center">
            <select
              value={editForm.isAvaible.toString()}
              onChange={(e) => setEditForm({ ...editForm, isAvaible: e.target.value === 'true' })}
              className="px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">O</option>
              <option value="false">X</option>
            </select>
          </td>
          <td className="px-4 py-3 text-center">
            <div className="space-x-1">
              <Button size="sm" onClick={onSave} className="px-2">
                <Save size={16} />
              </Button>
              <Button size="sm" variant="outline" onClick={onCancel} className="px-2">
                <X size={16} />
              </Button>
            </div>
          </td>
        </>
      ) : (
        // 일반 모드
        <>
          <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-xs truncate">
            {item.title}
          </td>
          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{item.singer}</td>
          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{item.vocal || '-'}</td>
          <td className="px-4 py-3 text-center">
            <span
              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                item.isAvaible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {item.isAvaible ? 'O' : 'X'}
            </span>
          </td>
          <td className="px-4 py-3 text-center">
            <div className="space-x-1">
              <Button size="sm" variant="outline" onClick={() => onEdit(item)} className="px-2">
                <Edit2 size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(item.id)}
                className="px-2"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </td>
        </>
      )}
    </tr>
  )
}

export default function AdminPage() {
  const [setList, setSetList] = useState<SetList[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    singer: '',
    vocal: null as string | null,
    isAvaible: true,
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // 신청곡 목록 가져오기
  const fetchSetList = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('setLists')
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching setlist:', error)
      alert('데이터를 불러오는 중 오류가 발생했습니다.')
    } else {
      setSetList(data || [])
    }
    setIsLoading(false)
  }

  // 신청곡 삭제
  const deleteItem = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    const { error } = await supabase.from('setLists').delete().eq('id', id)

    if (error) {
      console.error('Error deleting item:', error)
      alert('삭제 중 오류가 발생했습니다.')
    } else {
      fetchSetList()
    }
  }

  // 수정 시작
  const startEditing = (item: SetList) => {
    setEditingId(item.id)
    setEditForm({
      title: item.title,
      singer: item.singer,
      vocal: item.vocal,
      isAvaible: item.isAvaible,
    })
  }

  // 수정 저장
  const saveEdit = async () => {
    if (!editingId) return

    const { error } = await supabase
      .from('setLists')
      .update({
        title: editForm.title,
        singer: editForm.singer,
        vocal: editForm.vocal,
        isAvaible: editForm.isAvaible,
      })
      .eq('id', editingId)

    if (error) {
      console.error('Error updating item:', error)
      alert('수정 중 오류가 발생했습니다.')
    } else {
      setEditingId(null)
      fetchSetList()
    }
  }

  // 수정 취소
  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ title: '', singer: '', vocal: null, isAvaible: true })
  }

  // 드래그 앤 드롭 핸들러
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = setList.findIndex((item) => item.id === active.id)
      const newIndex = setList.findIndex((item) => item.id === over?.id)

      const newSetList = arrayMove(setList, oldIndex, newIndex)
      setSetList(newSetList)

      // 새로운 순서로 업데이트
      try {
        const updates = newSetList.map((item, index) =>
          supabase
            .from('setLists')
            .update({ order: index + 1 })
            .eq('id', item.id),
        )

        await Promise.all(updates)
        fetchSetList() // 최신 상태로 다시 가져오기
      } catch (error) {
        console.error('Error updating order:', error)
        alert('순서 변경 중 오류가 발생했습니다.')
        fetchSetList() // 오류 시 원래 상태로 복구
      }
    }
  }

  // 모든 신청곡 삭제
  const clearAllSongs = async () => {
    if (!confirm('모든 신청곡을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

    const { error } = await supabase.from('setLists').delete().neq('id', 0) // 모든 행 삭제

    if (error) {
      console.error('Error clearing all songs:', error)
      alert('삭제 중 오류가 발생했습니다.')
    } else {
      alert('모든 신청곡이 삭제되었습니다.')
      fetchSetList()
    }
  }

  // 가능/불가능 일괄 변경
  const bulkUpdateAvailability = async (isAvaible: boolean) => {
    const confirmMessage = isAvaible
      ? '모든 곡을 "가능"으로 변경하시겠습니까?'
      : '모든 곡을 "불가능"으로 변경하시겠습니까?'

    if (!confirm(confirmMessage)) return

    const { error } = await supabase.from('setLists').update({ isAvaible }).neq('id', 0) // 모든 행 업데이트

    if (error) {
      console.error('Error bulk updating availability:', error)
      alert('업데이트 중 오류가 발생했습니다.')
    } else {
      fetchSetList()
    }
  }

  useEffect(() => {
    fetchSetList()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">어드민 페이지 - 신청곡 관리</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={fetchSetList} variant="outline" className="w-full sm:w-auto">
            새로고침
          </Button>
          <Button
            onClick={() => bulkUpdateAvailability(true)}
            variant="secondary"
            className="w-full sm:w-auto text-sm"
          >
            모든 곡 가능으로
          </Button>
          <Button
            onClick={() => bulkUpdateAvailability(false)}
            variant="secondary"
            className="w-full sm:w-auto text-sm"
          >
            모든 곡 불가능으로
          </Button>
          <Button onClick={clearAllSongs} variant="destructive" className="w-full sm:w-auto">
            모든 곡 삭제
          </Button>
        </div>
      </div>

      {setList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">등록된 신청곡이 없습니다.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={setList.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {isMobile ? (
              // 모바일 카드 뷰
              <div className="space-y-3">
                {setList.map((item, index) => (
                  <SortableCard
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={startEditing}
                    onDelete={deleteItem}
                    isEditing={editingId === item.id}
                    editForm={editForm}
                    setEditForm={setEditForm}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                  />
                ))}
              </div>
            ) : (
              // 데스크톱 테이블 뷰
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 min-w-20">
                          순서
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 min-w-40">
                          곡명
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 min-w-32">
                          가수
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 min-w-32">
                          보컬
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 min-w-24">
                          셋리 포함
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 min-w-36">
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {setList.map((item, index) => (
                        <SortableRow
                          key={item.id}
                          item={item}
                          index={index}
                          onEdit={startEditing}
                          onDelete={deleteItem}
                          isEditing={editingId === item.id}
                          editForm={editForm}
                          setEditForm={setEditForm}
                          onSave={saveEdit}
                          onCancel={cancelEdit}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
