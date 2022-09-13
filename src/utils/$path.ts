export const pagesPath = {
  "addAccount": {
    $url: (url?: { hash?: string }) => ({ pathname: '/addAccount' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
