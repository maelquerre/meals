export default (request, response) => {
  const foods = [
    {
      id: 1,
      name: 'Fruits and vegetables'
    },
    {
      id: 2,
      name: 'Legume'
    },
    {
      id: 3,
      name: 'Cereals and carbohydrates'
    },
    {
      id: 4,
      name: 'White fish'
    },
    {
      id: 5,
      name: 'Oily fish'
    },
    {
      id: 6,
      name: 'White meat'
    },
    {
      id: 7,
      name: 'Red meat'
    },
    {
      id: 8,
      name: 'Cold cuts'
    },
    {
      id: 9,
      name: 'Dairy products'
    }
  ]

  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(foods))
}
