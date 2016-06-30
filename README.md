# assemble-component-builder

This repo has for objectif to set a static site generator based on [assemble](https://github.com/assemble/assemble).

Before going forward, ensure that your node and npm are up to date.
Clone the repo then run:

```
npm install assemble -g
npm install
assemble
```

##### Current workflow:
- `clean` deletes the dist folder
- `html.load` loads all the partials, layouts, pages, and data required for assemble.
- `html.build` renders all the pages, except index.hbs.
- `html.load.index` creates a custom instance of data for assemble.
- `html.load.build` renders index.hbs.
- `browserSync` runs the server.
- any changes on .hbs or .json are reflected in the dist folder under the `watch` task.

##### Current defect: 
- If `html.load.index` and `html.load.build` are present in the workflow, all changes on .hbs or .json are NOT reflected.

---
Feel free to participate via pull request
