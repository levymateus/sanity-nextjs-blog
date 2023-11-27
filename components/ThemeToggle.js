import { Moon } from "react-feather"
import useTheme from "@hooks/useTheme"
import If from "@components/If"
import Toggle from "@components/Toggle"
import Button from "@components/Button"

export default function ThemeToggle() {
  const [theme, setAsDark, setAsLight] = useTheme()
  return <If stmt={theme}>
    <Toggle defaultValue={theme === 'light'}>
      <Toggle.On>
        {(off) => <Button accessKey="l" onClick={() => { setAsDark(); off() }}>
          <Moon />
        </Button>}
      </Toggle.On>
      <Toggle.Off>
        {(on) => <Button accessKey="l" onClick={() => { setAsLight(); on() }}>
          <Moon />
        </Button>}
      </Toggle.Off>
    </Toggle>
  </If>
}