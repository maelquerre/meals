import React from 'react'
import { foodGroups } from '../pages/api/meals/data'
import PortionsPreferenceCard from '../components/PortionsPreferenceCard'
import { ChevronRight, ChevronDown } from 'react-feather'

class SettingsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      portionsPreferences: [],
      excludedPreferences: [],
      portionsPreferencesExpanded: false,
      excludedPreferencesExpanded: false
    }
  }

  componentDidMount() {
    /* Init the localStorage portionsPreferences if it doesn't already exist and link it with the state */
    if (!localStorage.getItem('portionsPreferences')) {
      localStorage.setItem('portionsPreferences', JSON.stringify(this.state.portionsPreferences))
    }
    this.setState({ portionsPreferences: JSON.parse(localStorage.getItem('portionsPreferences')) })

    /* Init the localStorage excludedPreferences if it doesn't already exist and link it with the state */
    if (!localStorage.getItem('excludedPreferences')) {
      localStorage.setItem('excludedPreferences', JSON.stringify(this.state.excludedPreferences))
    }
    this.setState({ excludedPreferences: JSON.parse(localStorage.getItem('excludedPreferences')) })
  }

  render() {
    return (
      <div className="container">
        <div className="mb-4 bg-gray-200 rounded-lg md:rounded-xl">
          <div onClick={() => this.setState({ portionsPreferencesExpanded: !this.state.portionsPreferencesExpanded })}
               className="flex justify-between p-4 cursor-pointer">
            <h2 className="headline">Food portions preferences</h2>
            <div className="pointer-events-none flex items-center text-gray-700">
              {!this.state.portionsPreferencesExpanded && <ChevronRight size={18} />}
              {this.state.portionsPreferencesExpanded && <ChevronDown size={18} />}
            </div>
          </div>

          <div className={"grid columns-2 md:columns-4 gapx-4 gapy-8 overflow-hidden"
          + (this.state.portionsPreferencesExpanded ? ' h-auto p-4 pt-8' : ' h-0 p-0')}>
            {this.state.portionsPreferences.map((portionsPreference, index) => {
              const foodGroup = foodGroups.find(foodGroup => foodGroup.id === portionsPreference.foodGroupId)
              return (
                <PortionsPreferenceCard key={index}
                                        id={foodGroup.id}
                                        name={foodGroup.name}
                                        min={portionsPreference.min}
                                        max={portionsPreference.max}
                                        period={portionsPreference.period} />
              )
            })}
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg md:rounded-xl">
          <div onClick={() => this.setState({ excludedPreferencesExpanded: !this.state.excludedPreferencesExpanded })}
               className="flex justify-between p-4 cursor-pointer">
            <h2 className="headline">Excluded food preferences</h2>
            <div className="pointer-events-none flex items-center text-gray-700">
              {!this.state.excludedPreferencesExpanded && <ChevronRight size={18} />}
              {this.state.excludedPreferencesExpanded && <ChevronDown size={18} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsView
