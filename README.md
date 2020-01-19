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


## Stylesheets

The styles are written in [PostCSS](https://postcss.org/) to improve development efficiency.


## Data structure

### Intakes

The intakes are contained in an array of 'intake' objects. Each intake object is defined for a specific day and meal, with corresponding foodGroup ID and portions.

#### Example

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

### Portions preferences (recommendations)

Portions preferences are quantities of food groups that are preferred to be eaten within a day or a week.

The [Project's API](/Glascode/meals/tree/master/pages/api/meals) gives recommendations as default portions preferences, based on [PNNS](https://www.mangerbouger.fr/PNNS/Le-PNNS/Qu-est-ce-que-le-PNNS).

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

### Included preferences

Included preferences are food groups that are preferred to eat at specific meals.

#### Example

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
