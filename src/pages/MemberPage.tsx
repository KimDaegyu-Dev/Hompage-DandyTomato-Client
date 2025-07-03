import FilterButton from '@/components/archive/FilterButton'
import HighlightenTitle from '@/components/HighlightenTitle'
import MemberCard from '@/components/member/MemberCard'
import MemberItem from '@/components/member/MemberItem'
import useHorizontalScroll from '@/hooks/useHorizontalScroll'
import { RefObject, useRef, useState } from 'react'
import DefaultImage from '@/assets/images/MemberCardDefault.png'
import gsap from 'gsap'
export default function MemberPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const memberRef = useRef<HTMLDivElement>(null)
    const tlRef = useRef<GSAPTimeline>(null)
    const dimmedRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    useHorizontalScroll(containerRef as RefObject<HTMLDivElement>)

    const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        setIsOpen(true)
        setIsAnimating(true)

        if (!memberRef.current) return
        const targetRect = e.currentTarget.getBoundingClientRect()
        const memberRect = memberRef.current.getBoundingClientRect()

        // 중심 좌표 계산
        const fromX = targetRect.left + targetRect.width / 2
        const fromY = targetRect.top + targetRect.height / 2

        const toX = memberRect.left + memberRect.width / 2
        const toY = memberRect.top + memberRect.height / 2

        // 애니메이션 시작 지점 = 클릭 요소 중심에서 타깃 요소 중심까지의 상대 이동 거리
        const dx = fromX - toX
        const dy = fromY - toY

        // 기존 타임라인 정리
        if (tlRef.current) tlRef.current.kill()

        // 애니메이션 적용
        tlRef.current = gsap.timeline()
        tlRef.current.from(memberRef.current, {
            x: dx,
            y: dy,
            scaleX: 286 / memberRect.width,
            scaleY: 286 / memberRect.height,
            duration: 1,
            transformStyle: 'preserve-3d',
            transform: 'rotateZ(0deg)',
            rotateY: 180,
            rotateX: dx / 100,
            rotateZ: -dx / 100,
            ease: 'power1',
            onComplete: () => {
                setIsAnimating(false)
            }
        })
        tlRef.current.from(
            dimmedRef.current,
            {
                opacity: 0,
                duration: 1,
                ease: 'power1.out'
            },
            '-=1'
        )

        console.log(memberRect.width, memberRect.height)
        tlRef.current.restart() // 애니메이션 재시작
    }
    const handleClose = () => {
        if (isAnimating) return
        setIsOpen(false)
        if (tlRef.current) tlRef.current.kill()
        if (memberRef.current) {
            memberRef.current.style.transform = 'none'
        }
    }
    const members = Array.from({ length: 30 }).map((_, index) => ({
        name: `김철수${index}`,
        image: DefaultImage,
        part: '프론트엔드',
        generation: '1기'
    }))
    return (
        <>
            <MemberCard
                isOpen={isOpen}
                handleClose={handleClose}
                name={members[0].name}
                major={'도예학과'}
                image={members[0].image}
                part={members[0].part}
                generation={members[0].generation}
                email={'bogus_j@naver.com'}
                description={
                    '기획으로 들어오게 된 정재현이라고 합니다! 잘 부탁드립니다~!'
                }
                links={['https://github.com/bogus-j']}
                ref={memberRef as RefObject<HTMLDivElement>}
                dimmedRef={dimmedRef as RefObject<HTMLDivElement>}
            />
            <div
                className={`fixed top-185 right-100 z-10 flex flex-row gap-12`}>
                <FilterButton
                    text="전체 기수"
                    options={[
                        { label: '전체 기수', value: 'all' },
                        { label: '1기', value: '1' },
                        { label: '2기', value: '2' },
                        { label: '3기', value: '3' },
                        { label: '4기', value: '4' }
                    ]}
                />
                <FilterButton
                    text="전체 파트"
                    options={[
                        { label: '전체 파트', value: 'all' },
                        { label: '프론트엔드', value: 'frontend' },
                        { label: '백엔드', value: 'backend' },
                        { label: '디자이너', value: 'designer' },
                        { label: '기획', value: 'planning' },
                        { label: 'AI', value: 'ai' }
                    ]}
                />
            </div>
            <div
                className={`flex h-screen w-screen flex-col items-baseline justify-baseline gap-78 pt-185 pr-100 pb-128 pl-128`}
                ref={containerRef}>
                <HighlightenTitle
                    text="멤버 소개"
                    className="text-nowrap"
                />
                <section
                    className="grid w-fit h-full gap-36 pr-100"
                    style={{
                        gridTemplateColumns: `repeat(${Math.ceil(
                            members.length / 2
                        )},  max-content)`
                    }}>
                    {members.map(member => (
                        <MemberItem
                            key={member.name}
                            {...member}
                            onClick={handleOpen}
                        />
                    ))}
                </section>
            </div>
        </>
    )
}
