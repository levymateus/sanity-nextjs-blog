import { withErrorBoundary } from "react-error-boundary"
import ErrorFallback from "@components/Error"
import Markdown from "@components/Markdown"
import Heading from "@components/Heading"
import client from "@utils/client"

function About({ content }) {
  return (
    <div className="mt-10">
      <Heading size="xl">About Me</Heading>
      <Markdown className="mt-10 fade-in">{content}</Markdown>
    </div>
  );
}

export async function getStaticProps() {
  const about = await client.fetch(`*[_type == "bio"][0]{about}`)
  return {
    props: { content: about.about }
  };
}

export default withErrorBoundary(About, { FallbackComponent: ErrorFallback })
