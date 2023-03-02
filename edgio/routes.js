import { Router } from '@edgio/core'
import { nextRoutes } from '@edgio/next'
import { NEXT_CACHE_HANDLER, API_CACHE_HANDLER, IMAGE_CACHE_HANDLER } from './cache'

const router = new Router()

// API (Any backend) caching
router.match('/l0-api/:path*', API_CACHE_HANDLER)

// Image caching
router.match('/l0-opt', IMAGE_CACHE_HANDLER)

router.get('/service-worker.js', ({ serviceWorker }) => {
  serviceWorker('.next/static/service-worker.js')
})

// Sync rewrite as placed in next.config.js
router.get('/commerce/:name', ({ renderWithApp }) => {
  renderWithApp()
})

// The data in Next.js comes through _next/data/project-build-id route.
// For the route /product/product-slug, cache this SSR route's data
// it on the edge so that can be prefetched
router.match('/_next/data/:path*', NEXT_CACHE_HANDLER)

// Cache but not in edg dev mode
router.match('/', NEXT_CACHE_HANDLER)
router.match('/about', NEXT_CACHE_HANDLER)
router.match('/commerce', NEXT_CACHE_HANDLER)
router.match('/product/:name', NEXT_CACHE_HANDLER)
router.match('/commerce/:name', NEXT_CACHE_HANDLER)

// Fallback in case any request is not served by any routes above will be handled by default routes
router.use(nextRoutes)

export default router
