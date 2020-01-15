import useSWR from 'swr'
import { fetcher } from '../utils'

import LoadingView from '../views/LoadingView'
import SettingsView from '../views/SettingsView'

export default () => {
  let response

  response = useSWR('/api/meals/foods', fetcher)
  const foods = response.data

  response = useSWR('/api/meals/recommendations', fetcher)
  const portionsPreferences = response.data

  return (
    <>
      {!(foods && portionsPreferences) && <LoadingView className="container" />}
      {foods && portionsPreferences && <SettingsView foodGroups={foods}
                                                     portionsPreferences={portionsPreferences} />}
    </>
  )
}
