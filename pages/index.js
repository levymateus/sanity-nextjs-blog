import Heading from "@components/Heading"
import Text from "@components/Text"
import Avatar from "@components/Avatar"
import PostCard from "@components/PostCard"
import Card from "@components/Card"
import If from "@components/If"
import Link from "next/link"
import { ArrowRight } from "react-feather"
import useConfig from "@hooks/useConfig"
import client from "@utils/client"
import { blurDataURL } from "@utils/blurDataURL"
import '../envs'

const HomePage = ({ bio, posts }) => {
  const { config } = useConfig()
  return <>
    <section className="flex pt-10 flex-col sm:flex-row">
      <Avatar
        src={bio.imageUrl}
        alt={bio.imageCaption}
        blurDataURL={bio.blurDataURL}
        placeholder="blur"
        loading="lazy"
        className="order-1 sm:order-2"
      />
      <div className="flex-1 mt-8 sm:mt-0 flex-col order-2 sm:order-1">
        <Heading size="xl" asChild>
          <h1>{bio.name}</h1>
        </Heading>
        <Heading className="mt-2" size="md" asChild>
          <h2>{bio.role}</h2>
        </Heading>
        <Text className="mt-6" size="md" asChild>
          <p>{bio.bio}</p>
        </Text>
      </div>
    </section>
    <If stmt={posts.length}>
      <section className="pt-14" >
        <Heading size="xl" asChild>
          <h3>Featured Posts</h3>
        </Heading>
        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-7 mt-6 fade-in">
          <PostCard
            slug={posts[0]?.slug.current}
            description={posts[0]?.title} color="teal"
          />
          <If stmt={posts.length >= 2}>
            <PostCard
              slug={posts[1]?.slug.current}
              description={posts[1]?.title}
              color="indigo"
            />
          </If>
          <If stmt={posts.length >= 3}>
            <PostCard
              slug={posts[2]?.slug.current}
              description={posts[2]?.title}
              color="purple"
            />
          </If>
        </div>
        <Link className="text-neutral-500" href="/blog" passHref>
          <div className="flex items-center space-y-1 pt-6 pb-6 text-black hover:text-blue-600 dark:hover:text-white text-md dark:text-neutral-500">Read all posts <ArrowRight width={14} height={14} /></div>
        </Link>
      </section>
    </If>
    <If stmt={config?.contact}>
      <section id="contact" className="pt-14">
        <Card />
      </section>
    </If>
  </>
};

export async function getStaticProps() {
  const bio = await client.fetch(`*[_type == "bio"][0]{
    name,
    role,
    bio,
    "imageUrl": image.asset->url,
    "imageCaption": image.caption
  }`)
  bio.blurDataURL = await blurDataURL(bio.imageUrl, "image/jpeg")
  const site = await client.fetch(`*[_type == "site"][0]`)
  const posts = await client.fetch(`*[_type == "post"][0...3]{ slug, title } | order(releaseDate desc) | order(_createdAt asc)`)
  return {
    props: {
      bio: bio,
      site: site,
      posts: posts,
    }
  }
}

export default HomePage
