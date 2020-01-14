import useSWR from 'swr'
import ManageView from '../views/ManageView'
import LoadingView from '../views/LoadingView'

function fetcher(url) {
  return fetch(url).then(response => response.json())
}

function Manage() {
  const { data, error } = useSWR('/api/meals/foods', fetcher)

  return (
    <>
      {!data && <LoadingView className="container" />}
      {data && <ManageView foodGroups={data} />}
    </>
  )
}

export default Manage
