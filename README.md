# Meals

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

## Static HTML export

To generate a static HTML site, simply run:

```
npm run export
```
