# Meals

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

A static version of your app will be built in the `out` directory.

## Data structure

### Intakes

The intakes are contained in an array of 'intake' objects. Each intake object is defined for a specific day and meal, with corresponding foodGroup ID and portions.

Example:
```
intakes: [
  {
    day: 'monday',
    meal: 'breakfast',
    foodGroupId: 1,
    portions: 1
  }
]
```
