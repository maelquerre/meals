import useSWR from 'swr'
import HomeView from '../views/HomeView'
import LoadingView from '../views/LoadingView'

function fetcher(url) {
  return fetch(url).then(response => response.json())
}

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
