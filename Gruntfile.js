module.exports = function ( grunt ) { 
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.initConfig({
		jshint: {
			src: ['src/**/*.js'],
			gruntfile: ['Gruntfile.js'],
			options: {
				curly:  true,
				immed:  true,
				newcap: true,
				noarg:  true,
				sub:    true,
				boss:   true,
				eqnull: true,
				node:   true,
				undef:  true,
				globals: {
					_:       false,
					jQuery:  false,
					angular: false,
					moment:  false,
					console: false,
					$:       false
				}
			}
		},
		uglify: {
			my_target: {
		      	files: {
		        	'src/js/dest/output.min.js': ['src/js/*.js']
		      	}
		    }
		}
	});
	grunt.registerTask('checkjs', ['jshint']);
	grunt.registerTask('minify', ['uglify']);
	grunt.registerTask('default', ['jshint', 'uglify']);
};