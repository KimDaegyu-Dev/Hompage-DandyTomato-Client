import { useRef } from 'react'
import GalleryGrid from '@/components/archive/GalleryGrid'
import useHorizontalScroll from '@/hooks/useHorizontalScroll'
import FilterButton from '@/components/archive/FilterButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import ProjectGrid from '@/components/archive/ProjectGrid'
import { useNavigate } from 'react-router-dom'

export default function ProjectPage() {
    const projectItems = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `프로젝트 ${i + 1}`,
        description: `프로젝트 ${i + 1}에 대한 설명입니다.`,
        tag: ['아이디어톤', '중앙해커톤', '정기세션'][i % 3]
    }))

    const containerRef = useRef<HTMLDivElement>(null)
    useHorizontalScroll(containerRef as React.RefObject<HTMLDivElement>)
    const navigate = useNavigate()
    return (
        <>
            <div
                className="h-screen w-screen pl-128 pt-189 pb-128 pr-100 flex flex-col gap-82 items-start justify-between"
                ref={containerRef}>
                <HighlightenTitle
                    text="프로젝트"
                    className=""
                />

                <ProjectGrid projectItems={projectItems} onClick={() => {
                    navigate('/project/1')
                }} />
            </div>
            <div className="fixed box-border flex flex-row content-stretch items-center justify-end gap-16 right-100 top-189 z-10">
                <FilterButton
                    text="기수"
                    options={[
                        { label: '2025', value: '2025' },
                        { label: '2024', value: '2024' },
                        { label: '2023', value: '2023' }
                    ]}
                />
                <FilterButton
                    text="전체"
                    options={[
                        { label: '전체', value: '전체' },
                        { label: '정기세션', value: '정기세션' },
                        { label: '중앙활동', value: '중앙활동' },
                        { label: '자체활동', value: '자체활동' },
                        { label: '친목활동', value: '친목활동' }
                    ]}
                />
            </div>
        </>
    )
}
