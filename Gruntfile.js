module.exports = function ( grunt ) { 
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.initConfig({
		jshint: {
			src: ['src/**/*.js', '!src/js/dest/*.js'],
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
		        	'src/js/dest/output.min.js': ['src/js/dest/built.js']
		      	}
		    }
		},
		concat: {
		    options: {
		    	separator: ';',
		    },
		    dist: {
				src: ['src/**/*.js', 'node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js'],
		      	dest: 'src/js/dest/built.js',
		    },
		 }
	});
	grunt.registerTask('checkjs', ['jshint']);
	grunt.registerTask('minify', ['uglify']);
	grunt.registerTask('makeonefile', ['concat']);
	grunt.registerTask('makejs', ['concat', 'uglify']);
	grunt.registerTask('default', ['jshint', 'uglify']);
};