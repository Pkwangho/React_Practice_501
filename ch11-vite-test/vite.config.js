import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //추가
  resolve: {
    alias: {
      'react-virtualized': 'react-virtualized/dist/umd/react-virtualized.js',
    },
  },
  //추가
})
