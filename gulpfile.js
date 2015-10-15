var gulp = require("gulp");
var sass = require("gulp-sass");
var nano = require("gulp-cssnano");
//var sourcemaps = require("gulp-sourcemaps");

gulp.task("build", function () {
    gulp.src("./sass/**/*.scss")
        //.pipe(sourcemaps.init())
        .pipe(sass({
            //outputStyle: "compressed",
            includePaths: [
                "./bower_components/bourbon/app/assets/stylesheets/",
                "./bower_components/civil-css/sass/"
            ]
        }))
        .pipe(nano())
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./css"));
});

gulp.task("dev", ["build"], function () {
    gulp.watch("./sass/**/*.scss", ["build"]);
});

gulp.task("default", ["build"]);