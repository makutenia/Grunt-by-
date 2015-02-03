module.exports = function (grunt) 
{
    // initConfigの中に各タスクの設定を行っていきます。
    grunt.initConfig( 
    {
		// htmlmin HTMLの圧縮
		htmlmin: {
		  all: {
			options: {
			  removeComments: true,
			  removeCommentsFromCDATA: true,
			  removeCDATASectionsFromCDATA: true,
			  collapseWhitespace: true,
			  removeRedundantAttributes: true,
			  removeOptionalTags: true
			},
			expand: true,
			cwd: 'src/',
			src: ['**/*.html'],
			dest: 'dist/'
		  }
		},
    	//sassファイル
        sass :
        {
            options : 
            {
                style : 'compressed', //CSSのスタイル
                sourcemap : true, //ソースマップを書き出す
                noCache : true//キャッシュファイルを生成しない
            },
            styles : 
            {
                expand : true, cwd : 'src/scss/', src : '*.scss', //SCSSファイル
                dest : 'src/css', //CSSファイル
                ext : '.css', 
            }
        },
        //fixerを作るファイル
        autoprefixer : 
        {
            target : {
                expand : true, src : ['src/css/**/*.css', '!*.min.css'], dest : './', ext : '.css' 
            },
            options : {
                // 対象とするブラウザをこのように指定することができます。
                browsers : ['last 2 version', 'ie 8', 'ie 9'] 
            }
        },
        //cssを圧縮
        cssmin : 
        {
            target : 
            {
                expand : true, // dist/css以下のcss。ただしmin.cssで終わっていないものに限る
                cwd : 'src/', // マッチするsrcはこのパスの相対
                src : ['css/**/*.css', '!*.min.css'], // 出力先はそのまま
                dest : 'dist',
                ext : '.css' 
            }
        },
        //cssの整理を行う
        csscomb : 
        {
            options : {
                config : 'csscomb-config.json' 
            },
            target : {
                expand : true, src : ['dist/css/**/*.css', '!*.min.css'], dest : './', ext : '.css' 
            }
        },
        /*
        //JSを纏めます。
         concat: {
           options: {
             separator: ';',
           },
           dist: {
             src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
             dest: 'dist/built.js',
           },
         },
         */
        //JSの圧縮
        uglify : 
        {
            target : 
            {
                files : [ {
                    expand : true, // jsフォルダ以下にあるすべてのjs
                    cwd : 'src/', src : 'js/**/*.js', // 出力先フォルダ
                    dest : 'dist' 
                }] 
            }
        },
        //JSのコードチェック
        jshint : 
        {
            files : [ 'Gruntfile.js', 'src/js/**/*.js', '.jshintrc' ], options : {
                jshintrc : '.jshintrc' 
            }
        },
        //画像の劣化
        imagemin : 
        {
            target : {
                files : [ {
                    expand : true, cwd : 'src/', src : ['images/**/*.{png,jpg,gif}'], dest : 'dist' 
                }] 
            }
        },
        //ローカルサーバの作成
        browserSync : 
        {
            default_options : 
            {
                bsFiles : {
                    src : [ "src/index.html", "src/css/*.css" ] 
                },
                options : 
                {
                    watchTask : true, ghostMode : {
                        scroll : true, links : true, forms : true 
                    },
                    server : {
                        baseDir : "./src", index : "index.html" 
                    }
                }
            }
        },
		 // copy ファイルのコピー
		 copy: {
		 //プラグインを使わないなら解放
		   //html: {
			//expand: true,
			//cwd: 'src/',
			//src: ['**/*.html'],
			//dest: 'dist/'
		   //},
		   //css: {
			 //expand: true,
			 //cwd: 'src/',
			 //src: ['**/*.css'],
			 //dest: 'dist/'
		   //},
		   //images: {
			 //expand: true,
			 //cwd: 'src/',
			 //src: ['img/**'],
			 //dest: 'dist/'
		   //},
		   //js: {
			 //expand: true,
			 //cwd: 'src/',
			 //src: ['js/**'],
			 //dest: 'dist/'
		   //},
		   files: {
			 expand: true,
			 cwd: 'src/',
			 src: ['files/**'],
			 dest: 'dist/',
			 filter: 'isFile'
		   }
		 },
		// clean 不要ファイルを削除
		 clean: {
		   // 最初にdistディレクトリ内を削除
		   deleteReleaseDir: {
			 src: 'dist/'
		   }
		 },
        // watchタスク: ファイルの変更を監視します。
        watch : 
        {
			// html
			html: {
			  files: 'src/**/*.html',
			  tasks: []
			},
            // cssの変更監視
            scss : {
                files : ['src/scss/*.scss'], //監視対象のファイル
                tasks : ['sass'] //実行するタスク
            },
            css : {
                files : ['src/css/*.css'], //監視対象のファイル
                tasks : ['autoprefixer'] //実行するタスク
            },
            script : {
                files : ['src/js/**/*.js'], tasks : ['uglify'] 
            },
            images : {
                files : ['src/images/**/*.{png,jpg,gif}'], tasks : ['imagemin'] 
            }
        }
    });
    // grunt.loadNpmTasks('プラグイン名');でプラグインを読み込みます。
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('dist', ['clean','htmlmin','copy','sass', 'autoprefixer', 'cssmin','csscomb', 'imagemin', 'uglify']);
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // gruntコマンドのデフォルトタスクにwatchを追加します。
    grunt.registerTask('default', ["browserSync", "watch"]);
};