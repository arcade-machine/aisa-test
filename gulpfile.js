var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var pug = require("gulp-pug");
var browserSync = require("browser-sync").create();
var useref = require("gulp-useref");
var minify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var minicss = require("gulp-csso");
var rename = require("gulp-rename");

gulp.task("less", function () {
    return gulp.src("source/less/styles.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("source/css"))
        .pipe(minicss())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("source/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("pug", function buildHTML() {
   return gulp.src("source/pug/*.pug")
       .pipe(plumber())
       .pipe(pug())
       .pipe(gulp.dest("source"))
});

gulp.task("watch", ["browserSync", "less", "pug"], function () {
    gulp.watch("source/less/**/*.less", ["less"]);
    gulp.watch("source/pug/*.pug", ["pug"]);
    gulp.watch("source/*.html", browserSync.reload);
    gulp.watch("source/js/*.js", browserSync.reload);
});

gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "source"
        },
    })
});