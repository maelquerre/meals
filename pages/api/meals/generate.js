import HappyMeals from './HappyMeals'

export default (request, response) => {
  console.log(request.body)

  const meals = new HappyMeals(request.body.intakes, request.body.portionsPreferences, request.body.includedPreferences)

  meals.createMeals(data.days, data.meals).then(intakes => {
    this.updateIntakes(intakes)
  })
}
