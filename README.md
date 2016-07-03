# assemble-component-builder

This repo has for objectif to set a static site generator based on [assemble](https://github.com/assemble/assemble).

Before going forward, ensure that your node and npm are up to date.
Clone the repo then install assemble globaly, and all the depencies for this repo:
```
npm install assemble -g
npm install
```

A quick way to start building a component is to use the command create:
```
assemble create --component=foo
```
It creates a correct folder structure in `src/component` as well as a collection of files required for your component.
```
src/components/foo
│   foo.hbs
│
└── sass
│   │ foo.scss
│
└── js
│   │ foo.js
│
└── partials
│   │ foo.hbs
│
└── data
    │ foo.json
```

To compile the project and to start the server, run:
```
assemble
```

The server will open at: [http://localhost:3000/html/](http://localhost:3000/html/)

To compile and minify the project, run:
```
assemble prod
```
