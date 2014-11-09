module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			dist: 'dist',
			asset: 'assets',
			icon: '<%= path.asset %>/icons'
		},

		clean: {
			dist: '<%= path.dist %>'
		},
		less: {
			development: {
				options: {
					comporess: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'style.css.map',
					sourceMapFilename: '<%= path.dist %>/<%= path.asset %>/css/style.css.map',
				},
				files: {
					'<%= path.dist %>/<%= path.asset %>/css/style.css': 'src/less/style.less',
				},
			},
			minified: {
				options: {
					cleancss: true,
					report: 'min',
				},
				files: {
					'<%= path.dist %>/<%= path.asset %>/css/style.min.css': '<%= path.dist %>/<%= path.asset %>/css/style.css',
				},
			},
		},
		concat: {
			options: {
				separator: ';',
			},
			javascript: {
				src: 'src/js/main.js',
				dest: '<%= path.dist %>/<%= path.asset %>/js/main.js',
			},
		},
		uglify: {
			options: {
				mangle: false,
				report: 'min',
			},
			frontend: {
				files: {
					'<%= path.dist %>/<%= path.asset %>/js/main.min.js': '<%= path.dist %>/<%= path.asset %>/js/main.js',
				},
			},
		},
		copy: {
			assets: {
				files: [
					{
						expand:true,
						cwd: 'src/',
						src:['fonts/**', 'img/**'],
						dest:'<%= path.dist %>/<%= path.asset %>/',
					},
				],
			},
			vendor: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'bower_components/jquery/dist/jquery.min.js',
							'bower_components/bootstrap/dist/js/bootstrap.min.js',
							'bower_components/html5shiv/dist/html5shiv.js',
							'bower_components/respond/dest/respond.min.js',
						],
						dest: '<%= path.dist %>/<%= path.asset %>/js/'
					},
					{
						expand: true,
						flatten: true,
						src: 'bower_components/bootstrap/dist/fonts/*',
						dest: '<%= path.dist %>/<%= path.asset %>/fonts/',
					},
				],
			},
		},
		processhtml: {
			options: {
				recursive: true,
				process: true,
				data: {
					path: {
						asset: '<%= path.asset %>',
						icon: '<%= path.icon %>'
					},
				},
			},
			dist: {
				files:[
					{
						expand: true,
						flatten: true,
						src: 'src/html/*.html',
						dest: '<%= path.dist %>/'
					}
				]
			}
		},
		jsbeautifier: {
			files : ['<%= path.dist %>/*.html'],
		},
		humans_txt: {
			options: {
				intro: '<%= pkg.description %>',
				commentStyle: 'u',
				includeUpdateIn: 'site',
				content: grunt.file.readJSON('src/humans.json'),
			},
			files: {
				dest: '<%= path.dist %>/humans.txt',
			},
		},
		favicons: {
			options: {
				trueColor: true,
				precomposed: true,
				appleTouchBackgroundColor: 'auto',
				coast: true,
				windowsTile: true,
				tileBlackWhite: false,
				tileColor: 'auto',
				HTMLPrefix: '<%= path.icon %>/',
				firefox: true,
				firefoxManifest: '<%= path.dist %>/manifest.webapp',
			},
			dist: {
				src: 'src/favicon.png',
				dest: '<%= path.dist %>/<%= path.icon %>',
			}
		},
		firefoxManifest: {
			dist: {
				options: {
					manifest: '<%= path.dist %>/manifest.webapp',
				},
			},
		},
		watch: {
			options: {
				livereload: false,
			},
			less: {
				files: 'src/less/*.less',
				tasks: 'less',
			},
			html: {
				files: 'src/html/**/*.html',
				tasks: 'processhtml',
			},
			js: {
				files: 'src/js/*.js',
				tasks: ['concat', 'uglify'],
			},
		},
		connect: {
			server: {
				options: {
					livereload: true,
					port: 9000,
					base: '<%= path.dist %>'
				}
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	// Task definition
	grunt.registerTask('assets', ['less', 'concat', 'uglify', 'copy']);
	grunt.registerTask('html', ['processhtml', 'jsbeautifier']);
	grunt.registerTask('dist', ['clean', 'assets', 'html', 'humans_txt', 'firefoxManifest', 'favicons']);
	grunt.registerTask('work', ['connect', 'watch']);
	grunt.registerTask('default', 'dist');
};
