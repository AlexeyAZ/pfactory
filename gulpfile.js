const folders = {
  build: 'build',
  src: 'src',
  static: 'static'
};

const localServer = {
  options: {
    server: {
      baseDir: './' + folders.build
    },
    open: true,
    notify: false
  }
};


const gulp = require('gulp');
const bs = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const bulkSass = require('gulp-sass-bulk-import');
const moduleImporter = require('sass-module-importer');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const prefix = require('gulp-autoprefixer');
const watch = require('gulp-watch');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const eslint = require('gulp-eslint');
const devip = require('dev-ip');
const imagemin = require('gulp-imagemin');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const pugI18n = require('gulp-pug-i18n');
const siteConfig = require('./src/config/siteConfig');


console.log('ip list: ' + devip()); // show all ip list. Need for browsersync host option

function onError(err) {
  console.log(err);
}


gulp.task('browserSync', function () {
  bs.init(localServer.options);
});


gulp.task('static', function () {
  return gulp.src([folders.static + '/**/*.*'])
    .pipe(gulp.dest(folders.build));
});

gulp.task('lint', function () {
  return gulp.src([folders.src + '/scripts/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('scripts', function () {
  return gulp.src([folders.src + '/scripts/app.js'])
    .pipe(webpackStream({
      optimization: {
        minimize: true
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components|vendor.js)/,
            loader: 'babel-loader'
          }
        ]
      },
      output: {
        filename: 'app.js'
      },
      devtool: 'source-map'
    }, webpack))
    .pipe(gulp.dest(folders.build + '/scripts'))
    .pipe(bs.stream());
});

gulp.task('pug', function () {
  gulp.src(folders.src + '/views/*.pug')
    .pipe(pugI18n({
      i18n: {
        locales: 'src/locales/*.json',
        filename: '{{basename}}.{{lang}}.html',
        namespace: 'translate'
      },
      data: {
        langOptions: siteConfig.langOptions
      },
      pretty: true
    }))
    .on('error', onError)
    .pipe(gulp.dest(folders.build))
    .pipe(bs.stream({ once: true }));
});


gulp.task('sass', function () {
  gulp.src(folders.src + '/styles/main.scss')
    .pipe(bulkSass())
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [folders.src + '/styles/', folders.src + '/components/'],
      importer: moduleImporter()
    })
      .on('error', sass.logError))
    .pipe(prefix('last 3 version', '> 1%', 'ie 10'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(folders.build + '/styles'))
    .pipe(bs.stream());
});


gulp.task('img', function () {
  gulp.src([folders.src + '/img/**/*.png', folders.src + '/img/**/*.jpg', folders.src + '/img/**/*.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest(folders.build + '/img'));
});


gulp.task('fonts', function () {
  gulp.src([folders.src + '/fonts/**/*.*'])
    .pipe(gulp.dest(folders.build + '/fonts'));
});


gulp.task('data', function () {
  gulp.src([folders.src + '/data/**/*.*'])
    .pipe(gulp.dest(folders.build + '/data'));
});


gulp.task('svgSpriteBuild', function () {
  return gulp.src(folders.src + '/img/for_sprite/**/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: `../../../${folders.build}/img/sprite.svg`,
          render: {
            scss: {
              dest: '../../../src/styles/_sprite.scss',
              template: folders.src + '/styles/svg-templates/_sprite_template.scss'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(folders.build + '/img/'));
});


gulp.task('build', [
  'static',
  'fonts',
  'data',
  'img',
  'pug',
  'sass',
  'scripts',
  'lint',
  'svgSpriteBuild'
]);


gulp.task('watch', function () {

  watch([folders.src + '/views/**/*.pug'], function () {
    gulp.start('pug');
  });

  watch([folders.src + '/styles/**/*.scss'], function () {
    gulp.start('sass');
  });

  watch([folders.src + '/scripts/**/*.js'], function () {
    gulp.start(['lint', 'scripts']);
  });
});


gulp.task('default', ['lint', 'build', 'browserSync', 'watch']);
