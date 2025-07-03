import FilterButton from '@/components/archive/FilterButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import useHorizontalScroll from '@/hooks/useHorizontalScroll'
import { useRef, useState } from 'react'
import GalleryGrid from '@/components/archive/GalleryGrid'

const ArchivePage = () => {
    const [galleryItems, setGalleryItems] = useState<any[]>(Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `갤러리 ${i + 1}`,
        description: `갤러리 ${i + 1}에 대한 설명입니다.`,
        tag: ['정기세션', '중앙활동', '자체활동', '친목활동'][i % 4]
    })))

    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useHorizontalScroll(containerRef as React.RefObject<HTMLDivElement>)

    return (
        <>
            <div className="h-screen w-full flex flex-col z-10 gap-82 pl-128 pt-189 pb-128 pr-100 items-start justify-start"
                ref={containerRef}>
                <HighlightenTitle
                    text="갤러리"
                    className=""
                />

                <GalleryGrid
                    galleryItems={galleryItems}
                    scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
                />

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

export default ArchivePage
