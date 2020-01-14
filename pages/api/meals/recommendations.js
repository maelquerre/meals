export default (request, response) => {
  const recommendations = [
    {
      foodGroupId: 1,
      min: 5,
      period: 'day'
    },
    {
      foodGroupId: 2,
      min: 2,
      period: 'week'
    },
    {
      foodGroupId: 3,
      min: 1,
      period: 'day'
    },
    {
      foodGroupId: 4,
      max: 1,
      period: 'week'
    },
    {
      foodGroupId: 5,
      max: 1,
      period: 'week'
    },
    {
      foodGroupId: 6,
      min: 1,
      max: 2,
      period: 'day'
    },
    {
      foodGroupId: 7,
      max: 5,
      period: 'week'
    },
    {
      foodGroupId: 8,
      max: 2,
      period: 'week'
    },
    {
      foodGroupId: 9,
      min: 2,
      period: 'day'
    }
  ]

  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(recommendations))
}
