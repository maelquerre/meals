import useSWR from 'swr'
import { fetcher } from '../utils'

import HomeView from '../views/HomeView'
import LoadingView from '../views/LoadingView'

function Index() {
  const { data, error } = useSWR('/api/meals/foods', fetcher)

  return (
    <>
      {!data && <LoadingView className="container" />}
      {data && <HomeView foodGroups={data} />}
    </>
  )
}

export default Index
