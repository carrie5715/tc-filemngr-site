import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

// Firestore は静的ホスティングのブラウザから直接読み取るため client 限定で初期化する。
export default defineNuxtPlugin(() => {
  const { public: config } = useRuntimeConfig()

  const app = getApps().length ? getApp() : initializeApp(config.firebase)
  const firestore = getFirestore(app)

  return {
    provide: {
      firestore,
    },
  }
})
