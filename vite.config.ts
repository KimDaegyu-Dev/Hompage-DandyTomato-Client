import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }]
    },
    server: {
        port: 5173,
        proxy: {
            '/api/v1/recruit/wordcorrect': {
                target: 'http://localhost:5001',
                changeOrigin: true,
                secure: false
            }
        },
        hmr: {
            overlay: false
        }
    },
    test: {
        // environment: 'jsdom',
        // globals: true,
        // // setupFiles: './src/unit_tests/setup.ts',
        // exclude: [...configDefaults.exclude, 'src/e2e_tests/*'],
        // coverage: {
        //     provider: 'v8',
        //     reporter: ['text', 'html']
        // },
        // browser: {
        //     enabled: true
        // }
    }
})
