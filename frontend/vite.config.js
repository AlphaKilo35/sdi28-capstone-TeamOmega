import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const VITE_PORT = parseInt(process.env.VITE_PORT,10) || 5173; //5173 is default

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{ 
<<<<<<< HEAD
    port: VITE_PORT,
    watch: {
      usePolling: true
    },
    host: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.js',
=======
    port: VITE_PORT
>>>>>>> 9804e0298c01c2ba2f9d5d72b2d1d7b99c127558
  }
})
