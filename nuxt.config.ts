export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxt/eslint'],
  css: ['~/assets/styles/main.scss'],
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: 'AIzaSyDmJmbTY3WHlWkdwV82OsQ1soI1gzl6AL0',
        authDomain: 'tc-filemngr-site.firebaseapp.com',
        projectId: 'tc-filemngr-site',
        storageBucket: 'tc-filemngr-site.firebasestorage.app',
        messagingSenderId: '403381544162',
        appId: '1:403381544162:web:571e696d949529be55eabb',
        measurementId: 'G-7CDVNB9FVW',
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables" as *;',
        },
      },
    },
  },
})
