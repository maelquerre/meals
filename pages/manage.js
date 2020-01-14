import useSWR from 'swr'
import ManageView from '../components/ManageView'

function fetcher(url) {
  return fetch(url).then(response => response.json())
}

function Manage(props) {
  const { data, error } = useSWR('/api/meals/foods', fetcher)

  let message
  if (!data) message = 'Loading...'
  if (error) message = 'Failed to fetch food groups'

  console.log(data)

  return (
    <div>
      {message}
      {data && <ManageView foodGroups={data} />}
    </div>
  )
}

export default Manage
