import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Faster HMR in development
      fastRefresh: true,
    }),
  ],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    // Security: restrict CORS in dev server
    cors: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Use terser for more aggressive minification (variable renaming)
    minify: 'esbuild',
    target: 'es2020',
    // Warn when chunks exceed 500 KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Fingerprinted assets for long-term caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          'router':     ['react-router-dom'],
          'animations': ['framer-motion'],
          'icons':      ['react-icons'],
        },
      },
    },
  },
  // Security: remove console.log and debugger calls in production
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    // Remove pure annotations to reduce bundle size
    treeShaking: true,
  },
  // Optimise pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
