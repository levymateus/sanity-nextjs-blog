import Head from "next/head"
import NextApp from "next/app"

import "@styles/globals.css"

import Layout from "@components/Layout"
import useProgress from "@hooks/useProgress"
import useEventListener from "@hooks/useEventListener"
import useTheme from "@hooks/useTheme"
import RemoteConfig from "context/RemoteConfig"
import client from "@utils/client"

const App = ({ Component, pageProps }) => {
  useTheme()
  useProgress()
  useEventListener('keydown', () => {
    if (!document.activeElement) {
      window.focus()
    }
  })

  return (
    <RemoteConfig>
      <Layout>
        <Head>
          <title className="capitalize">{pageProps.site.title}</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </RemoteConfig>
  )
}

App.getInitialProps = async (ctx) => {
  const appProps = await NextApp.getInitialProps(ctx)
  const site = await client.fetch(`*[_type == "site"][0]{title}`)
  return { ...appProps, pageProps: { site } }
}

App.displayName = 'App'

export default App
