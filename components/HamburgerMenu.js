import { Menu, X } from "react-feather"
import Button from "@components/Button"
import useStore from "@hooks/useStore"

export default function HamburgerMenu({ onToggleMenu }) {
  const [sidebarIsOpen, setSidebarOpen] = useStore(({ sidebarIsOpen, setSidebarOpen }) => [sidebarIsOpen, setSidebarOpen])

  function handleClick(value) {
    setSidebarOpen(value)
    onToggleMenu(value)
  }

  if (sidebarIsOpen) {
    return <Button
      variant="secondary"
      onClick={() => handleClick(false)}
    >
      <X />
    </Button>
  }

  return <Button
    variant="secondary"
    onClick={() => handleClick(true)}
  >
    <Menu />
  </Button>
}
