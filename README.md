# Meals

A meals manager built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) 10 or later
- MacOS, Windows (including WSL), and Linux are supported

### Installation

1. Clone the repo
```sh
git clone https://glascode.github.io/meals
```
2. Install dependencies
```sh
npm install
```

### Development

Start Next.js in development mode:
```
npm run dev
```

This starts a development server on http://localhost:3000.


### Production

Build the application for production usage:
```
npm run build
```

### Static HTML Export

Build and export the app to static HTML, which can be run standalone without the need of a Node.js server:
```
npm run export
```

A static version of the app will be built in the `out` directory.

### Usage

On the homepage, add the food groups you already ate for different meals in the different days. Click on the 'Generate meals' button to generate the recommendations. You can choose to not enter any meal before generating the recommendations, it will just generate all the meals for you.

On the settings page (cogwheel button in the top bar), you can set some preferences for the meals that will be generated:
- How much you eat: for setting the minimum or maximum portions you'll want to have.
- What you eat and when: for setting your eating habits for the different meals.


## Stylesheets

The styles are written in [PostCSS](https://postcss.org/) to improve development efficiency.


## Project structure

```
meals/
  components/ # JSX components
  data/       # Simple js data
  model/      # The Meal class
  pages/      # The pages of the app
    api/      # The API of the app
  public/     # Public assets
  styles/     # App styles
  views/      # Main views of the app
  utils.js    # Javascript utility functions
```


### Data

#### Intakes

The intakes are an array of _intake_ objects. Each _intake_ object is defined with a specific day, meal, foodGroup ID and portions.

##### Example

```javascript
intakes: [
  {
    day: 'monday',
    meal: 'breakfast',
    foodGroupId: 1,
    portions: 1
  }
]
```

#### Portions preferences (recommendations)

Portions preferences are quantities of food groups that are preferred to be eaten within a day or a week.

The [Project's API](https://github.com/Glascode/meals/tree/master/pages/api/meals) gives recommendations as default portions preferences, based on [PNNS](https://www.mangerbouger.fr/PNNS/Le-PNNS/Qu-est-ce-que-le-PNNS).

<details>
<summary>Recommendations</summary>
<p>

```javascript
recommendations: [
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
```

</p>
</details>

#### Included preferences

Included preferences are food groups that are preferred to eat at specific meals.

##### Example

```javascript
includedPreferences: [
  {
    meal: 'breakfast',
    foodGroupId: 1
  },
  {
    meal: 'lunch',
    foodGroupId: 7
  }
]
```
