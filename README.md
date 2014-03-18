# gulp-include-source

Gulp plugin to include scripts and styles into your HTML files automatically.

## Install

Install with [npm](https://npmjs.org/package/gulp-ngmin)

```
npm install gulp-include-source --save-dev
```

## Example

```js
gulp.task('html', function() {

  return gulp.src( './client/index.html' )
    .pipe( includeSources() )
    .pipe( gulp.dest('build/') );
});
```

## API

### includeSources(options)

#### options.scriptExt

Type: `String`

When available, will override script extension in resulted HTML code.

#### options.styleExt

Type: `String`

When available, will override style extension in resulted HTML code.

## License

MIT © [André Gil](http://somepixels.net)