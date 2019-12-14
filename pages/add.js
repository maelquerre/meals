import AddView from '../components/AddView'

export default () => {
  return (
    <>
      <header className="py-4 text-gray-800 bg-gray-200">
        <h1 className="w-11/12 max-w-6xl m-auto text-center">Add Meals</h1>
      </header>

      <AddView className="w-11/12 max-w-6xl m-auto" />
    </>
  )
}
