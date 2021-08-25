var {task , src, dest, watch ,parallel} = require('gulp'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	php2html = require("gulp-php2html"),
	fs = require('fs'),
	path = require('path'),
	buffer = require('vinyl-buffer'),
	spritesmith = require('gulp.spritesmith'),
	autoprefixer = require('gulp-autoprefixer');

var Paths = {
	scss: './scss/**/*.scss',
	html: './*.html',
	css: 'css/*.css',
	js: 'js/*.js',
	img: "img/",
	mobile: "m/",
	sprite: "sprite/",
	scssSrc: 'scss/',
	lib: 'lib/',
	png_template: 'sprite.support_2x.mustache',
}

var getFolders = function(dir) {
	return fs.readdirSync(dir).filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

function broserLive(done) {
	browsersync.init({
		server: {
			baseDir: "./"
		},
	});
	done();
}

function browserSyncReload(done) {
	browsersync.reload();
	done();
}

function scss(done) {
	src(Paths.scss, { sourcemaps: true })
		.pipe(sass({
			outputStyle: 'expanded', // nested, expanded, compact, compressed
			indentType: 'tab',
			precision:3,
			indentWidth: 1,
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(dest('./css', { sourcemaps: './' }))
		.pipe(browsersync.stream());
	done();
}

task('build', function () {
	src("./*.php")
		.pipe(php2html())
	.pipe(dest("./dist"));
})

task('mainjs', function () {
	return src([
		'js/jquery.js',
		'js/TweenMax.min.js',
		'js/swiper.min.js',
		'js/fullpage.min.js',
		'js/common.js',
		'js/main.js'
	], { sourcemaps: true }) 
		.pipe(concat('main.js')) 
		.pipe(uglify())
		.pipe(dest('dist/js',{ sourcemaps: './' }));
});

task('sprite', function(done) {
	var folders = getFolders(Paths.img + Paths.mobile + Paths.sprite);
	folders.map(function(folder) {
		var spriteData = src(Paths.sprite + folder + '/*.png', {cwd: Paths.img + Paths.mobile}).pipe(spritesmith({
			imgPath: '../' + Paths.img + Paths.mobile + 'sp_' + folder + '.png',
			imgName: 'sp_' + folder + '.png',
			cssName: '_sp_' + folder + '.scss',
			padding: 10,
			algorithm: 'binary-tree', //top-down, left-right, diagonal, alt-diagonal, binary-tree
			cssTemplate: Paths.scssSrc + Paths.lib + Paths.png_template,
			cssVarMap: function(sprite) {
				sprite.name = folder + '-' + sprite.name;
				sprite.origin = 'sp_' + folder;
			},
			cssSpritesheetName: 'sp_' + folder
		}));

		spriteData.img
			.pipe(buffer())
			.pipe(dest(Paths.img + Paths.mobile));
		spriteData.css.pipe(dest(Paths.scssSrc +Paths.lib));
	});
	done();
});

// Watch files
function watchFiles() {
	watch("./scss/**/*.scss", scss);
	watch(
		[
			Paths.html,
			Paths.css,
			Paths.js
		],
		browserSyncReload,
	)
}

const bs = parallel(broserLive,watchFiles);
exports.sass = scss;
exports.bs = bs;