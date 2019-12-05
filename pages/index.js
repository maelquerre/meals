import Link from 'next/link'
import MealsView from '../components/MealsView'

import { days, foodGroups, recommendations } from '../api/meals/data'


function getPosts() {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
  ]
}


export default () => {
  let activeDay = 'monday'

  return (
    <>
      <h1>Meals</h1>

      <MealsView />

      {/*<Link href="/add"><a className="btn btn--primary">Add +</a></Link>*/}
    </>
  )
}
