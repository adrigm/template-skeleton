module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			dist: 'dist',
			asset: 'assets',
			icon: '<%= path.asset %>/icons',
		},
		clean: {
			dist: '<%= path.dist %>',
		},
		processhtml: {
			options: {
				recursive: true,
				process: true,
				data: {
					path: {
						asset: '<%= path.asset %>',
						icon: '<%= path.icon %>',
					},
					modernizrClass: '<%= modernizr.dist.extensibility.cssclassprefix %>',
				},
			},
			dist: {
				files:[
					{
						expand: true,
						flatten: true,
						src: 'src/html/*.html',
						dest: '<%= path.dist %>/',
					},
				],
			},
		},
		jsbeautifier: {
			files : ['<%= path.dist %>/*.html'],
			options: {
				html: {
					indentChar: "\t",
					indentSize: 1,
					endWithNewline: true,
				},
			},
		},
		watch: {
			options: {
				livereload: false,
			},
			html: {
				files: 'src/html/*.html',
				tasks: 'processhtml',
			},
		},
		connect: {
			server: {
				options: {
					livereload: true,
					port: 9000,
					base: '<%= path.dist %>',
				},
			},
		},
	});

	require('load-grunt-tasks')(grunt);

	// Task definition
	grunt.registerTask('dist', ['processhtml', 'jsbeautifier']);
	grunt.registerTask('work', ['connect', 'watch']);
	grunt.registerTask('default', 'dist');
};
