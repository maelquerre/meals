const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

const meals = [
  'breakfast',
  'lunch',
  'snack',
  'dinner'
]

const foodGroups = [
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

export { days, meals, foodGroups, recommendations }
