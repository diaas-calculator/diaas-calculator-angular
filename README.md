# What is this project

This is the angular frontend for the [Protein DIAAS calculator](https://www.diaas-calculator.com/)

See also the backend project [DIAAS calculator rust](https://github.com/diaas-calculator/diaas-calculator-rust).

# Running locally

There is no mock for the backend for now. If you need to work on the front without having the backend running locally, you can point to the production server: edit the `src/proxy.conf.json` with: 

```
    "target": "https://www.diaas-calculator.com/",
    "secure": true,
```

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

See https://github.com/diaas-calculator/diaas-calculator-rust?tab=readme-ov-file#contributing

# Contact us

See https://github.com/diaas-calculator/diaas-calculator-rust?tab=readme-ov-file#contact-us



