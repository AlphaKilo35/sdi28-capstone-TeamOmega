import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const VITE_PORT = parseInt(process.env.VITE_PORT,10) || 5173; //5173 is default

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: VITE_PORT}
})
