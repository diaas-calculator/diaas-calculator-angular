# What is this project

This is the code for the [Protein DIAAS calculator](https://www.diaas-calculator.com/)

# Architecture

This is now a 1-tier application: everything is handled by this project. 

Another version of this application exists with a 3-tier architecture. 

More info : 

- see [DIAAS calculator rust](https://github.com/diaas-calculator/diaas-calculator-rust) : the backend and more info about the 3-tier application
- see tag *v1.0_3-tier-architecture* in this project for the code that was working with the rust backend

# Running locally

Install the dependencies with: 

```
npm i
```

Start the application with: 

```
npm start
```

Access the application on: 

```
http://127.0.0.1:4200/
```

# Build for production

```
ng build --configuration=production
```

# Contributing

## Code

This is an opensource project. All the contributions are welcome!

In case something inspires you, here's the top of my todo list (please contact me on slack before starting anything significant): 

- add food as doses by default instead of 100g (1 egg, 1 portion of xxx = x grams)
- pagination (don't display all food items, just 10 or 20 and paginate the next results)
- equivalent g of complete protein
- crude to cooked factor + in app conversion
- unit test, ci-cd
- mode compare: food items and/or mix
- add more details about studies in case links go dead (name, authors, date, journal). new table?Front

- android/IOS app
- display details about the types of DIAAS in the detailed view. ex DIAAS-rat-> DIAAS on rodents
- switch to other age diaas (it is a simple multiplication)
- search that starts running without entering "search" button (after a pause in typing)
- more elements translated in the GUI

## Translation

You can help with food item translation into other languages. See for example `utils/food_i18n.csv` for the expected format

## Dataset

You can enrich our current dataset by adding lines in the `utils/food.csv` and `utils/food_i18n.csv` files and directly send us what you would like to see added.

### Points of attention

- Preparation of the food: see https://www.diaas-calculator.com/diaas-information#limitations-and-precautions
- Score standard, animal model, digestibility model : see the [diaas information](https://www.diaas-calculator.com/diaas-information#score-types-in-the-app)
- Age reference pattern: the reference pattern used is often `6month->3years` (it is the default one as per the FAO recommendations). We display the information for the reference pattern `>3y` by default. It is a simple multiplicative factor to get from the 6m->3y to the >3y pattern: 

| his  | iso        | leu        | lys    | met+cys    | phe+tyr    | thr  | trp        | val   |
| ---- | ---------- | ---------- | ------ | ---------- | ---------- | ---- | ---------- | ----- |
| 1,25 | 1,06666667 | 1,08196721 | 1,1875 | 1,17391304 | 1,26829268 | 1,24 | 1,28787879 | 1,075 |

To convert from the *PDCAAS* *2-5 years old* reference pattern to the *DIAAS* *>3 years old* reference pattern, use those coefficients: 

| his    | iso        | leu        | lys        | met+cys    | phe+tyr    | thr  | trp        | val   |
| ------ | ---------- | ---------- | ---------- | ---------- | ---------- | ---- | ---------- | ----- |
| 1,1875 | 0,93333333 | 1,08196721 | 1,20833333 | 1,08695652 | 1,53658537 | 1,36 | 1,66666667 | 0,875 |

### Computing the DIAAS

Sometimes it is required to gather data from different sources and compute the DIAAS, especially when it comes to processing (extrusion, baking, cooking...) for which data is really scarse. Or it may be required when a study results are incoherent or when some data is missing or not publicly available.

To do this, the excel sheet in this meta-study is really helping: https://data.mendeley.com/datasets/gz3cx7d5f4/1

Feel free to ask my latest version on slack. I have also initiated one for PDCAAS scores.

## Content reviewing

Feel free to reach us should you find any error

# Contact us

Feel free to [contact us on slack](https://join.slack.com/t/diaascalculator/shared_invite/zt-36621afxv-gmKslovnBh3lH0OWS9yjSg) if you have any questions or want to discuss anything about this project.



