import {
    NavigationMenu,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList
} from '@/components/ui/navigation-menu'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogout, useGoogleLoginUrl } from '@/query/auth'
import { useAuthZustandStore } from '@/stores/auth'

export default function GlobalNavigationButton() {
    const [isHover, setIsHover] = useState(false)
    const [isSessionHover, setIsSessionHover] = useState(false)
    const [isAdmin, setIsAdmin] = useState(true)
    const [isAdminMoenuOpen, setIsAdminMoenuOpen] = useState(false)
    const navigate = useNavigate()
    const { mutate: logout, isPending: isLoggingOut } = useLogout()
    const { accessToken, logout: clearAuth, login, isLogin } = useAuthZustandStore()
    const { data: loginUrlData, isLoading: isLoadingLoginUrl } =
        useGoogleLoginUrl()

    return (
        <div className="fixed top-64 z-50 flex w-screen justify-between px-64">
            <NavigationMenu className="">
                {isAdminMoenuOpen ? (
                    <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/admin/auth">권한</Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/admin/recruit">지원서</Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/admin/session">세션자료</Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/admin/archive">아카이빙</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                ) : (
                    <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/">ABOUT US</Link>
                        </NavigationMenuItem>
                        <NavigationMenuList
                            className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 flex flex-row items-center gap-64 px-30 py-10 transition-all duration-300"
                            onMouseOver={() => {
                                setIsHover(true)
                            }}
                            onMouseOut={() => {
                                setIsHover(false)
                            }}>
                            ARCHIVE
                            {isHover && (
                                <>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to="/project"
                                            className="font-pretendard text-16 font-bold">
                                            PROJECTS
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to="/gallery"
                                            className="font-pretendard text-16 font-bold">
                                            GALLERY
                                        </Link>
                                    </NavigationMenuItem>
                                </>
                            )}
                        </NavigationMenuList>

                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/members">MEMBERS</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hover:bg-sub-seoultech-red hover:text-pri-white rounded-50 text-sub-seoultech-red px-30 py-10">
                            <Link to="/recruit">RECRUIT</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                )}
                {isAdmin && (
                    <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 ml-34 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                        <NavigationMenuItem
                            className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10"
                            onClick={() => setIsAdminMoenuOpen(prev => !prev)}>
                            ADMIN
                        </NavigationMenuItem>
                    </NavigationMenuList>
                )}
            </NavigationMenu>

            {isLogin() ? (
                <NavigationMenu className="">
                    <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                        <NavigationMenuList
                            className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 flex flex-row items-center gap-64 px-30 py-10 transition-all duration-300"
                        // onMouseOver={() => {
                        //     setIsSessionHover(true)
                        // }}
                        // onMouseOut={() => {
                        //     setIsSessionHover(false)
                        // }}
                        >
                            <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                <Link to="/session">SESSION</Link>
                            </NavigationMenuItem>
                            {/* {isSessionHover && (
                                <>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session',
                                                search: '?sessionType=pm'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            PM
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session',
                                                search: '?sessionType=design'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            DESIGN
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session',
                                                search: '?sessionType=fe'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            FE
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session',
                                                search: '?sessionType=be'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            BE
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session',
                                                search: '?sessionType=ai'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            AI
                                        </Link>
                                    </NavigationMenuItem>
                                </>
                            )} */}
                        </NavigationMenuList>
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/mypage">MY PAGE</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <button
                                onClick={() => {
                                    logout(undefined, {
                                        onSuccess: () => {
                                            clearAuth()
                                            navigate('/')
                                        }
                                    })
                                }}
                                disabled={isLoggingOut}
                                className="font-pretendard text-20 font-bold">
                                {isLoggingOut ? '로그아웃 중...' : 'LOGOUT'}
                            </button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            ) : (
                <NavigationMenu className="">
                    <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <button
                                onClick={() => {
                                    login()
                                    if (loginUrlData?.data) {
                                        window.location.href = loginUrlData.data
                                    }
                                }}
                                disabled={isLoadingLoginUrl}
                                className="font-pretendard text-20 font-bold">
                                {isLoadingLoginUrl ? '로딩 중...' : 'LOG IN'}
                            </button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            )}
        </div>
    )
}
