import React from 'react'
import meals from '../data/meals'

import PortionsCard from '../components/cards/PortionsCard'
import FoodCard from '../components/cards/FoodCard'
import NewFoodCard from '../components/cards/NewFoodCard'
import { ChevronRight, ChevronDown } from 'react-feather'

class SettingsView extends React.Component {
  constructor(props) {
    super(props)

    this.meals = meals

    this.state = {
      portionsPreferences: props.portionsPreferences,
      includedPreferences: [],
      expandPortionsPreferences: false,
      expandIncludedPreferences: false
    }

    this.includeFoodGroup = this.includeFoodGroup.bind(this)
  }

  updatePreferences(name, preferences) {
    localStorage.setItem(name, JSON.stringify(preferences))
    this.setState({ [name]: preferences })
  }

  updateFoodPortionPreference(foodGroupId, amount, kind) {
    let portionsPreferences = [...this.state.portionsPreferences]

    // Check if the intake to add already exists
    const index = portionsPreferences.findIndex(preference => preference.foodGroupId == foodGroupId)

    // If the intake already exists
    if (index > -1) {
      // Just update the existing intake's portions
      portionsPreferences[index][kind] += amount
    }
    this.updatePreferences('portionsPreferences', portionsPreferences)
  }



  includeFoodGroup(newFoodGroup) {
    /* Get includedPreferences array to update it after */
    let includedPreferences = [...this.state.includedPreferences]

    // Check if the food group to add already exists
    const alreadyIncluded = includedPreferences.some(includedFoodGroup => {
      return includedFoodGroup.foodGroupId == newFoodGroup.foodGroupId && includedFoodGroup.meal === newFoodGroup.meal
    })

    // If the food group doesn't exist
    if (!alreadyIncluded) {
      // Add the new food group
      includedPreferences.push({
        meal: newFoodGroup.meal,
        foodGroupId: newFoodGroup.foodGroupId
      })
    }

    /* Update includedPreferences with the updated array */
    this.updatePreferences('includedPreferences', includedPreferences)
  }

  excludeFoodGroup(foodGroup) {
    /* Get included preferences array to update it after */
    let includedPreferences = JSON.parse(localStorage.getItem('includedPreferences'))

    const index = includedPreferences.findIndex(includedFoodGroup => {
      return includedFoodGroup.foodGroupId == foodGroup.foodGroupId && includedFoodGroup.meal === foodGroup.meal
    })

    if (index > -1) {
      includedPreferences.splice(index, 1)
      this.updatePreferences('includedPreferences', includedPreferences)
    }
  }

  setFromStorage(item) {
    if (!localStorage.getItem(item)) {
      localStorage.setItem(item, JSON.stringify(this.state[item]))
    } else {
      this.setState({ [item]: JSON.parse(localStorage.getItem(item)) })
    }
  }

  componentDidMount() {
    this.setFromStorage('portionsPreferences')
    this.setFromStorage('includedPreferences')
  }

  render() {
    return (
      <div className="container">
        <div className="mb-4 bg-gray-200 rounded-lg md:rounded-xl">
          <div onClick={() => this.setState({ expandPortionsPreferences: !this.state.expandPortionsPreferences })}
               className="flex justify-between py-2 px-4 md:py-4 md:px-8 cursor-pointer">
            <h2 className="font-semibold text-lg md:text-2xl">How much you eat</h2>
            <div className="pointer-events-none flex items-center text-gray-700">
              {!this.state.expandPortionsPreferences && <ChevronRight size={18} />}
              {this.state.expandPortionsPreferences && <ChevronDown size={18} />}
            </div>
          </div>

          <div className={"grid columns-2 md:columns-4 gapx-4 gapy-8 overflow-hidden"
          + (this.state.expandPortionsPreferences ? ' h-auto p-4 md:p-8' : ' h-0 p-0')}>
            {this.state.portionsPreferences.map((portionsPreference, index) => {
              const foodGroup = this.props.foodGroups.find(foodGroup => foodGroup.id === portionsPreference.foodGroupId)
              return (
                <PortionsCard key={index}
                              id={foodGroup.id}
                              name={foodGroup.name}
                              min={portionsPreference.min}
                              max={portionsPreference.max}
                              period={portionsPreference.period}
                              updateFoodPortionPreference={(amount, kind) => this.updateFoodPortionPreference(foodGroup.id, amount, kind)} />
              )
            })}
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg md:rounded-xl">
          <div onClick={() => this.setState({ expandIncludedPreferences: !this.state.expandIncludedPreferences })}
               className="flex justify-between py-2 px-4 md:py-4 md:px-8 cursor-pointer">
            <h2 className="font-semibold text-lg md:text-2xl">What you eat and when</h2>
            <div className="pointer-events-none flex items-center text-gray-700">
              {!this.state.expandIncludedPreferences && <ChevronRight size={18} />}
              {this.state.expandIncludedPreferences && <ChevronDown size={18} />}
            </div>
          </div>

          <div className={"overflow-hidden" + (this.state.expandIncludedPreferences ? ' h-auto p-4 md:p-8' : ' h-0 p-0')}>
            {this.meals.map((meal, index) => {
              const includedFoodGroups = this.state.includedPreferences.filter(foodGroup => foodGroup.meal === meal)
              return (
                <div key={index}
                     className="mb-8">
                  <h2 className="headline mb-4">{meal}</h2>
                  <div className="grid columns-2 md:columns-4 gapx-4 gapy-8 overflow-hidden">
                    {includedFoodGroups.map((includedFoodGroup, index) => {
                      const foodGroupName = this.props.foodGroups.find(({ id }) => id == includedFoodGroup.foodGroupId).name
                      return <FoodCard key={index}
                                       id={includedFoodGroup.foodGroupId}
                                       name={foodGroupName}
                                       excludeFoodGroup={() => this.excludeFoodGroup({
                                         foodGroupId: includedFoodGroup.foodGroupId,
                                         meal
                                       })} />
                    })}
                    <NewFoodCard className="spanx-row md:spanx-1"
                                 foodGroups={this.props.foodGroups}
                                 includeFoodGroup={foodGroupId => this.includeFoodGroup({ foodGroupId, meal })} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsView
