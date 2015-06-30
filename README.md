# Angular Boilerplate

> An Angular website starting point. Has all the infrastructure needed to rapidly build an application.

---

To set up, run the following:

```
npm install
bower install
gulp
```

---

## Gulp tasks

#### default

```
gulp
```

Runs the `clean`, `styles`, `scripts`, and `watch` tasks.

---

#### clean

```
gulp clean
```

Deletes the `assets/dist/style.css` and `assets/dist/app.min.js` files.

---

### styles

```
gulp styles
```

Creates the `assets/dist/style.css` file by compiling any stylus files in the `assets/css/` directory.

---

### scripts

```
gulp scripts
```

Creates the `assets/dist/app.min.js` file by compiling the js files in the `app/` directory. The `app.js` and then `app.routes` files are prioritized.

---

### watch

```
gulp watch
```

Watch the `assets/css/` and `app/` directories for file changes, and run the `styles` or `scripts` tasks.