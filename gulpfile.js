var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var config      = require('./config/env');

var runSequence = require('run-sequence');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


var onError = function (err) {
    plugins.util.beep();
    console.log(err);
};

gulp.task("clean", function(){
    return gulp.src(config.clean.dest)
        .pipe(plugins.clean());
})

gulp.task('scripts',function(done){
    gulp.src(config.js.all)
        .pipe(plugins.plumber({
            errorHandler: onError
        })) //使用plumber
        .pipe(plugins.babel({presets: ['es2015']}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.js.dest))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('scss',function(done){
    gulp.src(config.css.all)
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.sass({outputStyle: 'compressed'}))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'iOS >=7'],
            grid: false
        }))
        .pipe(gulp.dest(config.css.dest))
        .pipe(reload({stream: true}));
    done();
});

gulp.task('img', (done) =>{
    return gulp.src(config.images.all)
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(config.images.dest))
});

gulp.task('moveFonts', (done) =>{
    return gulp.src("./fonts/*.*")
        .pipe(gulp.dest("./build/fonts"))
})

gulp.task('watch', (done)=>{
    gulp.watch(config.css.all, ['scss']);
    gulp.watch(config.js.all, ['scripts']);
    gulp.watch(config.images.all, ['img']);
    gulp.watch("*.html",reload);
    done();
})

gulp.task('server',function(done){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
});

gulp.task('default', function(done){
    runSequence( 'img', 'moveFonts', ['scss','scripts'],'watch',function() {
        gulp.start(['server'])
        done();
    });
});