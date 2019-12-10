import MealsView from '../components/MealsView'

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
      <h1 className="mb-8">Meals</h1>

      <MealsView />

      {/*<Link href="/add"><a className="btn btn--primary">Add +</a></Link>*/}
    </>
  )
}
