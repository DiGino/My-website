// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Importing Gulp-related packages to use
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
// const minify = require('gulp-minify');

// File paths
const files = {
	cssPath: 'css/*.css',
	jsPath: 'js/**/*.js',
};

// Compiles css
function cssTask() {
	return src(files.cssPath, { sourcemaps: true }) // set source and turn on sourcemaps
		.pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
		.pipe(dest('dist', { sourcemaps: '.' })); // put final CSS in dist folder with sourcemap
}

// Compiles js
function jsTask(){
    return src([files.jsPath], { sourcemaps: true })
        .pipe(concat('app.js'))
        // .pipe(minify())
        .pipe(dest('dist', { sourcemaps: '.' })
    );
}

// Cachebust
function cacheBustTask() {
	var cbString = new Date().getTime();
	return src(['index.html'])
		.pipe(replace(/cb=\d+/g, 'cb=' + cbString))
		.pipe(dest('.'));
}

// Watch task: watch CSS and JS files for changes
// If any change, run css and js tasks simultaneously
function watchTask() {
	watch(
		[files.cssPath, files.jsPath],
		{ interval: 1000, usePolling: true }, //Makes docker work
		series(parallel(cssTask, jsTask), cacheBustTask)
	);
}

// Export the default Gulp task so it can be run
// Runs the css and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(cssTask, jsTask), 
    cacheBustTask, 
    watchTask
);
