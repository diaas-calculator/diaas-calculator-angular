# What is this project

This is the code for the [Protein DIAAS calculator](https://www.diaas-calculator.com/)

# Architecture

This is now a 1-tier application: everything is handled by this project. 

Another version of this application exists with a 3-tier architecture. More info : see 

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



