import fetch from 'isomorphic-unfetch'
import ManageView from '../components/ManageView'

function Manage(props) {
  return <ManageView foodGroups={props.foodGroups} />
}

Manage.getInitialProps = async ({ request }) => {
  const response = await fetch('http://localhost:3000/api/meals/foods')
  const foodGroups = await response.json()

  return { foodGroups }
}

export default Manage
