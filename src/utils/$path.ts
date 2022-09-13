export const pagesPath = {
  "addWallet": {
    $url: (url?: { hash?: string }) => ({ pathname: '/addWallet' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
