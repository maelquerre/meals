import HappyMeals from '../../../model/HappyMeals'

const weekIntake = {
  monday: {
    breakfast: [
      { foodGroupId: 9, portions: 2 },
      { foodGroupId: 3, portions: 2 },
      { foodGroupId: 1, portions: 1 }
    ],
    lunch: [
      { foodGroupId: 9, portions: 1 },
      { foodGroupId: 5, portions: 1 },
      { foodGroupId: 1, portions: 2 }
    ]
  },
  tuesday: {
    breakfast: [
      { foodGroupId: 9, portions: 2 },
      { foodGroupId: 3, portions: 2 },
      { foodGroupId: 1, portions: 1 }
    ],
    lunch: [
      { foodGroupId: 4, portions: 2 },
      { foodGroupId: 9, portions: 1 },
      { foodGroupId: 1, portions: 2 }
    ]
  }
}

const meals = new HappyMeals(weekIntake)
console.log(meals.createMeals())
