// import { setupWorker } from 'msw/browser'
// import { handlers } from './handler'

// export const worker = setupWorker(...handlers)

// // MSW 설정에서 외부 API 요청은 무시
// worker.events.on('request:start', ({ request }) => {
//     const url = new URL(request.url)
//     if (url.hostname === 'localhost' && url.port === '5001') {
//         // 외부 Docker 서비스 요청은 MSW에서 제외
//         return
//     }
// })
