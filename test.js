/* global describe, it, before, after */
'use strict';

var assert = require('assert'),
    mockery = require('mockery'),
    File = require('vinyl');

var includeSources = null;

describe('gulp-include-source', function() {

  before(function() {

    // Mock node-glob to predict the result
    mockery.enable({ warnOnUnregistered : false });
    mockery.registerMock('glob', {
      sync: function() {
        return [
          'files/file1.ext',
          'files/file2.ext'
        ];
      }
    });

    includeSources = require('./index');
  });

  after(function() {
    mockery.disable();
  });

  describe('in buffer mode', function() {

    it('should replace the js placeholder with scripts', function(done) {

      var stream = includeSources();
      var fakeFile = new File({
        contents: new Buffer('<!-- include:js(scripts/**/*.js) -->')
      });

      stream.once('data', function(file) {
        assert( file.isBuffer() );
        assert.equal( file.contents.toString('utf8'), '<script src="files/file1.ext"></script>\n<script src="files/file2.ext"></script>' );
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

    it('should replace script files extension', function(done) {

      var stream = includeSources({ scriptExt : 'js' });
      var fakeFile = new File({
        contents: new Buffer('<!-- include:js(scripts/**/*.coffee) -->')
      });

      stream.once('data', function(file) {
        assert( file.isBuffer() );
        assert.equal( file.contents.toString('utf8'), '<script src="files/file1.js"></script>\n<script src="files/file2.js"></script>' );
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

    it('should replace the css placeholder with styles', function(done) {

      var stream = includeSources();
      var fakeFile = new File({
        contents: new Buffer('<!-- include:css(styles/**/*.css) -->')
      });

      stream.once('data', function(file) {
        assert( file.isBuffer() );
        assert.equal( file.contents.toString('utf8'), '<link rel="stylesheet" href="files/file1.ext">\n<link rel="stylesheet" href="files/file2.ext">' );
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

    it('should replace style files extension', function(done) {

      var stream = includeSources({ styleExt : 'css' });
      var fakeFile = new File({
        contents: new Buffer('<!-- include:css(styles/**/*.less) -->')
      });

      stream.once('data', function(file) {
        assert( file.isBuffer() );
        assert.equal( file.contents.toString('utf8'), '<link rel="stylesheet" href="files/file1.css">\n<link rel="stylesheet" href="files/file2.css">' );
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

    it('should replace multiple placeholders in the same file', function(done) {

      var stream = includeSources();
      var fakeFile = new File({
        contents: new Buffer('<!-- include:js(scripts/**/*.js) -->\n<!-- include:css(styles/**/*.css) -->')
      });

      stream.once('data', function(file) {
        assert( file.isBuffer() );
        assert.equal( file.contents.toString('utf8'), '<script src="files/file1.ext"></script>\n<script src="files/file2.ext"></script>\n<link rel="stylesheet" href="files/file1.ext">\n<link rel="stylesheet" href="files/file2.ext">' );
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

  });
});