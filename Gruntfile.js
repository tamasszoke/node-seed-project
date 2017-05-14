
var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-notify');

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	jshint: {
		files: ['static/js/dev/*.js'],
		options: {
			"-W032": true, /* ignores "unneccessary semicolon" warnings */
			ignores: ['static/js_dev/jquery.js', 'static/js_dev/jquery-ui.js']
		}
	},
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> v<%= pkg.version %> | Created by: <%= pkg.author %> | <%= pkg.contact %> | ' +
				'Last modified: <%= grunt.template.today("yyyy-mm-dd") %> */'
		},
		js_files: {
			files: {
				'static/js/config.min.js': ['static/js/dev/config.js'],
				'static/js/index.min.js': ['static/js/dev/index.js'],
				'static/js/socket.min.js': ['static/js/dev/socket.js']
			}
		}
	},
	sass: {
		dist: {
			options: {
				style: 'compressed',
				sourcemap: 'none'
			},
			files: [{
				expand: true,
				cwd: 'static/css/dev',
    			src: ['**/*.scss'],
    			dest: 'static/css',
				ext: '.css'
			}]
		}
	},
	notify: {
		completed: {
			options: {
				title: 'Node Seed Project Grunt',
				message: 'Build completed!'
			}
		}
	},
	watch: {
		css: {
			files: 'static/css/dev/*.scss',
			tasks: ['sass']
		},
		scripts: {
			files: ['static/js/dev/*.js'],
			tasks: ['jshint', 'uglify'],
			options: {
				spawn: false
			},
		},
		livereload: {
			files: ['views/*.ejs', 'views/components/*.ejs', 'views/pages/*.ejs', 'static/css/dev/*.scss', 'static/js/dev/*.js'],
			tasks: ['notify:completed'],
			options: {
				livereload: true
			},
		},
	}
});

grunt.registerTask('default', ['uglify', 'notify:completed']);
//grunt.registerTask('default', ['obfuscator:index', 'obfuscator:home', 'obfuscator:question']);