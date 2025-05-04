import { useEffect, useState } from 'react'

async function initMsw() {
    if (typeof window === 'undefined') {
        const { server } = await import('./server')
        server.listen()
    } else {
        const { worker } = await import('./browser')
        await worker.start()
    }
}

export default function WithMockServer() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const shouldMock = import.meta.env.MODE === 'development'

        if (!shouldMock) return

        const init = async () => {
            await initMsw()
            setReady(true)
        }

        if (!ready) {
            init()
        }
    }, [ready])

    if (!ready && import.meta.env.MODE === 'development') {
        return (
            <p className="text-sm text-gray-500">
                🧪 Mock server initializing...
            </p>
        )
    }

    if (ready && import.meta.env.MODE === 'development') {
        return (
            <p className="text-sm text-gray-500">🎉 Mock server initialized</p>
        )
    }

    return null
}
