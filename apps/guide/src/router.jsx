import { useEffect, useState, createContext, useContext, useCallback, forwardRef } from 'react'
import { stripBase, withBase } from './basePath.js'

// ─────────────────────────────────────────────────────────────────────────
// A minimal client-side router. No dependencies. Clean URLs via the History
// API; the 404.html shim + index.html unpack make deep links survive refresh
// on GitHub Pages. Routes are flat strings: '/', '/toolbox', etc.
// ─────────────────────────────────────────────────────────────────────────

const RouterContext = createContext(null)

function normalize(path) {
  if (!path || path === '') return '/'
  const bare = path.split('#')[0].split('?')[0]
  if (bare.length > 1 && bare.endsWith('/')) return bare.slice(0, -1)
  return bare
}

function scrollToHash(hash) {
  if (!hash || hash === '#') return
  window.requestAnimationFrame(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(normalize(stripBase(window.location.pathname)))

  useEffect(() => {
    const onPop = () => {
      setPath(normalize(stripBase(window.location.pathname)))
      scrollToHash(window.location.hash)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to) => {
    const hashIndex = to.indexOf('#')
    const pathPart = hashIndex >= 0 ? to.slice(0, hashIndex) : to
    const hash = hashIndex >= 0 ? to.slice(hashIndex) : ''
    const next = normalize(pathPart)
    const nextUrl = `${next}${hash}`
    if (next === normalize(stripBase(window.location.pathname)) && hash === window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      scrollToHash(hash)
      return
    }
    const rooted = withBase(next)
    const rootedUrl = `${rooted}${hash}`
    window.history.pushState(null, '', rootedUrl)
    setPath(next)
    window.scrollTo({ top: 0, behavior: 'auto' })
    scrollToHash(hash)
  }, [])

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used within RouterProvider')
  return ctx
}

// A link that uses the router instead of a full page load.
export const Link = forwardRef(function Link({ to, className, children, onClick }, ref) {
  const { navigate } = useRouter()
  return (
    <a
      ref={ref}
      href={withBase(to)}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        if (onClick) onClick()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
})
