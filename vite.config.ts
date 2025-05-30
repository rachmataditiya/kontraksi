import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon-16x16.png', 'favicon-32x32.png'],
      manifest: {
        name: 'Pemantau Kontraksi',
        short_name: 'Kontraksi',
        id: 'com.kontraksi.app',
        description: 'Aplikasi pemantau kontraksi untuk ibu hamil',
        theme_color: '#1E4C94',
        background_color: '#F5F7FF',
        display: 'standalone',
        orientation: 'portrait',
        launch_handler: {
          client_mode: ['navigate-existing', 'auto']
        },
        screenshots: [
          {
            src: 'screenshot-1.png',
            sizes: '1080x2400',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Timer Kontraksi'
          },
          {
            src: 'screenshot-2.png',
            sizes: '1080x2400',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Riwayat Kontraksi'
          },
          {
            src: 'screenshot-3.png',
            sizes: '1080x2400',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Panduan Kontraksi'
          }
        ],
        categories: ['health', 'medical', 'lifestyle'],
        dir: 'ltr',
        lang: 'id',
        iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',
        prefer_related_applications: false,
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: 'favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    target: 'esnext'
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});