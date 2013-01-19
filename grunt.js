/*global module:false*/
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-jasmine-runner');

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */'
        },
        lint: {
            files: ['grunt.js', 'src/**/*.js', 'spec/**/*.js', 'js/**/*.js']
        },
        jasmine: {
            src: [/* defined in the template */],
            specs: [/* defined in the template */],
            timeout: 10000,
            template: {
                src: "spec/template/_SpecRunner.tmpl"
            },
            junit: {
                output: "test-results"
            }
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', 'src/namespace.js' ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: false,
		$: true,
                describe: false,
                it: false,
		xit: false,
                expect: false,
		beforeEach: false,
		loadFixtures: false,
		_: false,
		Backbone: false,
		Fractan: true
            }
        },
        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint concat min');

};
