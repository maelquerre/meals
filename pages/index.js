import useSWR from 'swr'
import { fetcher } from '../utils'

import HomeView from '../views/HomeView'
import LoadingView from '../views/LoadingView'

function Index() {
  let response

  response = useSWR('/api/meals/foods', fetcher)
  const foods = response.data

  response = useSWR('/api/meals/recommendations', fetcher)
  const portionsPreferences = response.data

  return (
    <>
      {!(foods && portionsPreferences) && <LoadingView className="container" />}
      {foods && portionsPreferences && <HomeView foodGroups={foods}
                                                 portionsPreferences={portionsPreferences} />}
    </>
  )
}

export default Index
