module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		distPath: 'dist',
		assetPath: '<%= distPath %>/assets',

		clean: {
			dist: '<%= distPath %>'
		},
		less: {
			development: {
				options: {
					comporess: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'style.css.map',
					sourceMapFilename: '<%= assetPath %>/css/style.css.map',
				},
				files: {
					'<%= assetPath %>/css/style.css': 'src/less/style.less',
				},
			},
			minified: {
				options: {
					cleancss: true,
					report: 'min',
				},
				files: {
					'<%= assetPath %>/css/style.min.css': '<%= assetPath %>/css/style.css',
				},
			},
		},
		concat: {
			options: {
				separator: ';',
			},
			javascript: {
				src: 'src/js/main.js',
				dest: '<%= assetPath %>/js/main.js',
			},
		},
		uglify: {
			options: {
				mangle: false,
				report: 'min',
			},
			frontend: {
				files: {
					'<%= assetPath %>/js/main.min.js': '<%= assetPath %>/js/main.js',
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
						dest:'<%= assetPath %>/',
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
						dest: '<%= assetPath %>/js/'
					},
					{
						expand: true,
						flatten: true,
						src: 'bower_components/bootstrap/dist/fonts/*',
						dest: '<%= assetPath %>/fonts/',
					},
				],
			},
		},
		processhtml: {
			options: {
				recursive: true,
				process: true,
				data: {
					assetPath: '<%= assetPath %>'
				}
			},
			dist: {
				files:[
					{
						expand: true,
						flatten: true,
						src: 'src/html/*.html',
						dest: '<%= distPath %>/'
					}
				]
			}
		},
		jsbeautifier: {
			files : ['<%= distPath %>/*.html'],
		},
		humans_txt: {
			options: {
				intro: '<%= pkg.description %>',
				commentStyle: 'u',
				includeUpdateIn: 'site',
				content: grunt.file.readJSON('src/humans.json'),
			},
			files: {
				dest: '<%= distPath %>/humans.txt',
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
					base: '<%= distPath %>'
				}
			}
		},
	});

	require('load-grunt-tasks')(grunt);

	// Task definition
	grunt.registerTask('assets', ['less', 'concat', 'uglify', 'copy']);
	grunt.registerTask('dist', ['clean', 'assets', 'processhtml', 'humans_txt']);
	grunt.registerTask('work', ['connect', 'watch']);
	grunt.registerTask('default', 'dist');
};
