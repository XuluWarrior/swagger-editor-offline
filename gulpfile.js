const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-string-replace');

const path = require('path');

const editorSrcDir = "editorSrc";
const electronSrcDir = "electron/app";

gulp.task('clean:editorSrc', function () {
    return del([
        editorSrcDir
    ]);
});

gulp.task('swagger-editor', ['clean:editorSrc'], function () {
    // swagger-editor-dist doesn't resolve as the package.json main points to swagger-editor.js in the non-existent dist folder
    // Hard code location for now
//    const swaggerEditorDistDir = require.resolve('swagger-editor-dist');
    const swaggerEditorDistDir = 'node_modules/swagger-editor-dist';

    return gulp.src(swaggerEditorDistDir + "/**/*")
        .pipe(gulp.dest(editorSrcDir));
});

gulp.task('clean', ['clean:editorSrc']);

gulp.task('main', function() {
    return gulp.src('./main.js')
        .pipe(gulp.dest(electronSrcDir));
});

gulp.task('postinstall', ['swagger-editor']);

gulp.task('package.json', function () {
    return gulp.src('./package.json')
        .pipe(replace('dependencies', 'rendererDependencies'))
        .pipe(replace('electronDependencies', 'dependencies'))
        .pipe(gulp.dest(electronSrcDir));
});

gulp.task('src', function () {
    return gulp.src(editorSrcDir + "/*", { "base" : "." })
        .pipe(gulp.dest(electronSrcDir));
});


gulp.task('build', ['main', 'package.json', 'src']);

gulp.task('default', ['build']);