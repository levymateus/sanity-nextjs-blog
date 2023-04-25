import { createContext, useState } from "react"

export const RemoteConfigContext = createContext({ config: {
  contact: true
}})

const RemoteConfig = ({ children }) => {
  const [config] = useState({ contact: true })
  return <RemoteConfigContext.Provider value={{ config }}>
    {children}
  </RemoteConfigContext.Provider>
}

export default RemoteConfig
