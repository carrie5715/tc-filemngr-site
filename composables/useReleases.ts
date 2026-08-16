import { collection, getDocs, type Timestamp } from 'firebase/firestore/lite'

export type ReleaseDownloads = {
  mac_universal?: string
  win?: string
  zip?: string
}

export type Release = {
  version: string
  tagName: string
  releaseName: string
  body: string
  publishedAt: Date
  isPrerelease: boolean
  hasBinary: boolean
  downloads: ReleaseDownloads | null
  syncedAt: Date
}

type ReleaseDoc = {
  version: string
  tagName: string
  releaseName: string
  body: string
  publishedAt: Timestamp
  isPrerelease: boolean
  hasBinary: boolean
  downloads: ReleaseDownloads | null
  syncedAt: Timestamp
}

function toRelease(doc: ReleaseDoc): Release {
  return {
    ...doc,
    publishedAt: doc.publishedAt.toDate(),
    syncedAt: doc.syncedAt.toDate(),
  }
}

// "v0.3.1" -> [0, 3, 1] のように比較用の数値配列に変換する
function parseVersion(version: string): number[] {
  return version
    .replace(/^v/, '')
    .split('.')
    .map((part) => Number(part) || 0)
}

// バージョン番号の降順で比較する。
// タグだけ作って GitHub Release を出していないバージョンは publishedAt が
// 同期実行日時になってしまい実際の新旧と食い違うため、publishedAt では並べない。
function compareVersionsDesc(a: Release, b: Release): number {
  const [aParts, bParts] = [parseVersion(a.version), parseVersion(b.version)]
  const length = Math.max(aParts.length, bParts.length)

  for (let i = 0; i < length; i++) {
    const diff = (bParts[i] ?? 0) - (aParts[i] ?? 0)
    if (diff !== 0) return diff
  }

  return 0
}

async function fetchReleases(): Promise<Release[]> {
  const { $firestore } = useNuxtApp()
  const releasesRef = collection($firestore, 'releases')
  const snapshot = await getDocs(releasesRef)

  return snapshot.docs.map((doc) => toRelease(doc.data() as ReleaseDoc)).sort(compareVersionsDesc)
}

/**
 * Firestore の releases コレクションからリリース情報を取得する機能。
 * FirstView の最新バージョン表示と、リリースノートページの一覧表示の両方から利用する想定。
 */
export function useReleases() {
  const releases = useState<Release[]>('releases', () => [])
  const pending = useState<boolean>('releases-pending', () => false)
  const error = useState<string | null>('releases-error', () => null)

  const latestRelease = computed(() => releases.value[0] ?? null)

  async function load() {
    if (pending.value || releases.value.length > 0) return

    pending.value = true
    error.value = null

    try {
      releases.value = await fetchReleases()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'リリース情報の取得に失敗しました'
    } finally {
      pending.value = false
    }
  }

  return { releases, latestRelease, pending, error, load }
}
