import useEventListener from "@hooks/useEventListener"
import debounce from "@utils/debounce"
import { useCallback, useEffect, useRef, useState } from "react"

const LazyLoad = ({ render, loading: Loading }) => {
  const [canLoad, setCanLoad] = useState(false)
  const ref = useRef()

  const handleScroll = useCallback(
    debounce(() => {
      const el = ref.current
      if (!el) return
      const bounds = el.getBoundingClientRect()
      const lessThanInnerHeight = bounds.top <= window.innerHeight
      if (lessThanInnerHeight) setCanLoad(true)
    }, 500),
  [setCanLoad, ref])

  useEffect(handleScroll, [ref, setCanLoad])
  useEventListener('scroll', handleScroll)

  return <span ref={ref}>
    {canLoad ? render() : <Loading />}
  </span>
}

export default LazyLoad
