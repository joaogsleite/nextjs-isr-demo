import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'

export interface IPost {
  id: string
  title: string
}

const Post: FC<IPost> = ({ id, title }) => {
  return id 
    ? (
      <article>
        <div>ID: {id}</div>
        <h2>{title}</h2>
      </article>
    )
    : (
      <div>NOT FOUND</div>
    )
}

export default Post

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string }
  const res = await fetch(`http://localhost:3001/posts/${id}`)
  const post = await res.json()

  return {
    props: {
      ...post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/posts')
  const posts = await res.json() as IPost[]

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id + '' },
  }))
  
  return { 
    paths,
    fallback: 'blocking'
  }
}