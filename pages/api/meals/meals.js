export default (request, response) => {
  const meals = [
    'breakfast',
    'lunch',
    'snack',
    'dinner'
  ]

  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(meals))
}
