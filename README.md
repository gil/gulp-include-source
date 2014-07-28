# gulp-include-source

Gulp plugin to include scripts and styles into your HTML files automatically.



## Install

Install with [npm](https://npmjs.org/package/gulp-ngmin)

```
npm install gulp-include-source --save-dev
```



## Example

#### gulpfile.js

```js
gulp.task('html', function() {
  return gulp.src( './client/index.html' )
    .pipe( includeSources() )
    .pipe( gulp.dest('build/') );
});
```

#### index.html

```html
<html>
<head>
  <!-- include:css(style/**/*.css) -->
</head>
<body>
  <!-- include:js(list:vendorList) -->
  <!-- include:js(script/**/*.js) -->
</body>
</html>
```

#### scriptList

```
bower_components/jquery/dist/jquery.js
bower_components/angular/angular.js
```

#### Result:

```html
<html>
<head>
  <link rel="stylesheet" href="style/main.css">
</head>
<body>
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="bower_components/angular/angular.js"></script>
  <script src="app.js"></script>
  <script src="controllers/LoginController.js"></script>
  <script src="controllers/MainController.js"></script>
  <script src="services/LoginService.js"></script>
</body>
</html>
```



## API

### includeSources(options)

#### options.cwd

Type: `String`

Base directory from where the plugin will search for source files.

#### options.scriptExt

Type: `String`

When available, will override script extension in resulted HTML code.

#### options.styleExt

Type: `String`

When available, will override style extension in resulted HTML code.



## License

MIT © [André Gil](http://somepixels.net)