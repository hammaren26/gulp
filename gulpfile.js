const gulp = require('gulp'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      del = require('del'),
      browserSync = require('browser-sync').create(),
      sass = require('gulp-sass'),
      cssbeautify = require('gulp-cssbeautify');
      imagemin = require('gulp-imagemin');


      sass.compiler = require('node-sass');


// Порядок подключения css
// const sassFiles = [];

// Порядок подключения js
// const jsFiles = ['./src/js/lib.js', './src/js/main.js'];



// Таск на стили
function styles() {
	return 	gulp.src('./src/sass/**/*.scss')
			.pipe(concat('style.scss'))
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				cascade: false,
				overrideBrowserslist: ['last 4 versions'],
			}))
			.pipe(cleanCSS({
				level: 2
			}))
			// .pipe(cssbeautify({
			//             indent: '    ',
			//             openbrace: 'end-of-line',
			//             autosemicolon: true
			//         }))
			.pipe(gulp.dest('./build/css/'))
			.pipe(browserSync.stream());
}


// Таск на скрипты
function scripts() {
	return gulp.src('./src/js/**/*.js')
			.pipe(concat('script.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('./build/js/'))
			.pipe(browserSync.stream());
}

function clean () {
	return del(['build/*']);
}


function watch () {
	browserSync.init({
	        server: {
	            baseDir: "./"
	        }
	    });
	gulp.watch('./src/sass/**/*.scss', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
// Таск для очистки папки build
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));


// Таск на уменьшение графики
gulp.task('compress', function() {
  gulp.src('./src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./build/images'))
});














// function defaultTask(cb) {
//   cb();
//   console.log('Hello');
// }
// exports.default = defaultTask;