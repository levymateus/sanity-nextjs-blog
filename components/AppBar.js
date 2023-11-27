import useEventListener from "@hooks/useEventListener"
import useScroll from "@hooks/useScroll"
import NavLink from "@components/NavLink"
import If from "@components/If"
import clsx from "clsx"
import { useState } from "react"
import useConfig from "@hooks/useConfig"
import dynamic from "next/dynamic"

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false })
const HamburgerMenu = dynamic(() => import("./HamburgerMenu"), { ssr: false })

function AppBar({ onToggleMenu }) {
  const [appBarState, setAppBarState] = useState('')
  const [isAltKeyPressed, setAltKeyIsPressed] = useState(false)
  const { config } = useConfig()

  useScroll('on-scroll-down', () => {
    setAppBarState('bounce-top')
  })

  useScroll('on-scroll-up', () => {
    setAppBarState('bounce-bottom')
  })

  useScroll('on-scroll-top', () => {
    setAppBarState('bounce-bottom')
  })

  useEventListener('keydown', (evt) => {
    setAltKeyIsPressed(evt.altKey)
  })

  useEventListener('keyup', (evt) => {
    setAltKeyIsPressed(evt.altKey)
  })

  return <>
    <div className={clsx("fixed top-0 left-0 right-0 px-4 mx-auto sm:max-w-screen-md bg-white dark:bg-black z-10", appBarState)}>
      <div className="flex flex-row items-center pt-8 pb-2 place-content-between relative">
        <div className="visible sm:hidden">
          <HamburgerMenu onToggleMenu={onToggleMenu} />
        </div>
        <div className="hidden sm:flex flex-row">
          <NavLink accessKey="h" href="/">
            {isAltKeyPressed ? <><span className="underline underline-offset-4">H</span>ome</> : 'Home'}
          </NavLink>
          <NavLink accessKey="g" href="/blog">
            {isAltKeyPressed ? <>Blo<span className="underline underline-offset-4">g</span></> : 'Blog'}
          </NavLink>
          <NavLink accessKey="s" href="/snippets">
            {isAltKeyPressed ? <><span className="underline underline-offset-4">S</span>nnipets</> : 'Snnipets'}
          </NavLink>
          <If stmt={config.contact}>
            <NavLink accessKey="c" href="/#contact">
              {isAltKeyPressed ? <><span className="underline underline-offset-4">C</span>ontact</> : 'Contact'}
            </NavLink>
          </If>
          <NavLink accessKey="u" href="/about">
            {isAltKeyPressed ? <>Abo<span className="underline underline-offset-4">u</span>t</> : 'About'}
          </NavLink>
        </div>
        <ThemeToggle />
      </div>
    </div>
  </>
}

export default AppBar
