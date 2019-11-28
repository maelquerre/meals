import Link from 'next/link'

// import demo from '../api/meals/demo'

function getPosts() {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
  ]
}

export default () => {
  return (
    <>
      <h1>My Blog</h1>

      <Link href="/add"><a className="btn btn--primary">Add +</a></Link>
    </>
  )
}
