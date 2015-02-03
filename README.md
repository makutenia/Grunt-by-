# Grunt-by-Uchida ver 0.1

### ロードとタスクは以下になります。
```javascript
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-csscomb');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-browser-sync');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-clean');

grunt.registerTask('dist', ['clean','htmlmin','copy','sass', 'autoprefixer', 'cssmin','csscomb', 'imagemin', 'uglify']);
// gruntコマンドのデフォルトタスクにwatchを追加します。
grunt.registerTask('default', ["browserSync", "watch"]);
```
