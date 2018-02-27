var src = '';
var build = './build';   

module.exports = {
    js:{
        all: src +'js/**/*.js',
        dest:build+'/js'
    },
    images:{
        all:src + 'img/**/*.+(jpg|jpeg|gif|png)',
        dest:build+'/img'
    },
    css:{
        all:src+'css/**/*.scss',
        dest:build+'/css'
    },
    clean:{
        dest:build
    }
}