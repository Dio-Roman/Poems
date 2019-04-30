const gulp = require ("gulp");
const plumber = require ("gulp-plumber")
const postcss = require ("gulp-postcss");
const autoprefixer = require ("autoprefixer");
const minify = require ("gulp-csso");
const rename = require ("gulp-rename");
const concatCss = require("gulp-concat-css");

gulp.task ("style-main", function(done) {
   return gulp.src (["./public/css/main.css", "./public/css/footer.css", "./public/css/nav-left.css" ])
   .pipe (concatCss("bundle.css")) 
   .pipe (postcss([
      autoprefixer()
    ]))
    .pipe (minify ())
    .pipe (rename ("main.min.css"))
    .pipe (gulp.dest ("./public/css-min")) 
})

gulp.task ("style-about", function(done) {
  return gulp.src (["./public/css/about.css", "./public/css/footer.css", "./public/css/nav-left.css" ])
  .pipe (concatCss("bundle1.css")) 
  .pipe (postcss([
     autoprefixer()
   ]))
   .pipe (minify ())
   .pipe (rename ("about.min.css"))
   .pipe (gulp.dest ("./public/css-min")) 
})

gulp.task ("style-card", function(done) {
  return gulp.src (["./public/css/card.css", "./public/css/footer.css", "./public/css/nav-left.css" ])
  .pipe (concatCss("bundle2.css")) 
  .pipe (postcss([
     autoprefixer()
   ]))
   .pipe (minify ())
   .pipe (rename ("card.min.css"))
   .pipe (gulp.dest ("./public/css-min")) 
})

gulp.task ("style-add", function(done) {
  return gulp.src (["./public/css/add.css", "./public/css/footer.css", "./public/css/nav-left.css" ])
  .pipe (concatCss("bundle3.css")) 
  .pipe (postcss([
     autoprefixer()
   ]))
   .pipe (minify ())
   .pipe (rename ("add.min.css"))
   .pipe (gulp.dest ("./public/css-min")) 
})

gulp.task("default", gulp.parallel("style-main", "style-about", "style-card", "style-add"));