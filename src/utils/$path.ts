export const pagesPath = {
  "create": {
    $url: (url?: { hash?: string }) => ({ pathname: '/create' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
