import useEventListener from "@hooks/useEventListener"
import { useCallback, useEffect, useRef, useState } from "react"

const LazyLoad = ({ render, loading: Loading }) => {
  const [canLoad, setCanLoad] = useState(false)
  const ref = useRef()

  const handleScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    const scrollTop = document.getElementById('root')?.scrollTop || 0
    const bounds = el.getBoundingClientRect()
    const lessThanInnerHeight = bounds.top <= window.innerHeight
    if (scrollTop >= bounds.top || lessThanInnerHeight) setCanLoad(true)
  }, [])

  useEffect(handleScroll, [ref, setCanLoad])
  useEventListener('scroll', handleScroll)

  return <span ref={ref}>
    {canLoad ? render() : <Loading />}
  </span>
}

export default LazyLoad
