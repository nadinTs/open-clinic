module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-html-build");




    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        less: {
            style: {
                files: {
                    //"build/css/style.css": "source/less/style.less",
                    "source/css/style.css": "source/less/style.less"
                }
            }
        },
        watch: {
            css: {
                files: "source/less/**/*.less",
                tasks: ["less", "cssmin:css"],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['source/js/app/*.js'],
                tasks: ['concat:js', 'uglify:js']
            },
            html: {
                files: ["source/templates/*.html", "source/layout/*.html"],
                tasks: ["htmlbuild:dist"]
            }
        },
        concat: {
            js: {
                src: ['source/js/app/*.js'],
                dest: 'source/js/app.js'
            }
        },
        autoprefixer: {
            options: {
                browsers: ["last 2 version", "ie 8", "ie 9", "ie 10"]
            },
            style: {
                src: "build/css/style.min.css"
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                        "fonts/**",
                        "img/**",
                        "js/app.min.js",
                        "css/style.min.css",
                        "*.html"
                    ],
                    dest: "build"
                }]
            }
        },
        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },

                files: [{
                    expand: true,
                    src: ["build/img/**/*.{png,jpg,gif,svg}"]
                }]
            }
        },
        cssmin: {
            css: {
                src: 'source/css/style.css',
                dest: 'source/css/style.min.css'
            }
        },
        uglify: {
            js: {
                src: 'source/js/app.js',
                dest: 'source/js/app.min.js'
            }
        },
        replace: {
            build: {
                options: {
                    patterns: [{
                        match: /[\"\']img\/([^\"\']+)[\"\']/g,
                        replacement: '"/static/img/$1"'
                    }, {
                        match: /[\"\']css\/([^\"\']+)[\"\']/g,
                        replacement: '"/static/css/$1"'
                    },{
                        match: /[\"\']css\/([^\"\']+)[\"\']/g,
                        replacement: '"/static/fonts/$1"'
                    }, {
                        match: /[\"\']js\/([^\"\']+)[\"\']/g,
                        replacement: '"/static/js/$1"'
                    }]
                }
            },
            files: [{
                expand: true,
                src: [
                    "build/css/style.min.css",
                    "build/*.html"
                ]
            }]
        },
        htmlbuild: {
            dist: {
                src: 'source/templates/*.html',
                dest: 'source/',
                options: {
                    beautify: true,
                    prefix: '//some-cdn',
                    relative: true,
                    sections: {
                        layout: {
                            header: '<%= fixturesPath %>source/layout/header.html',
                            footer: '<%= fixturesPath %>source/layout/footer.html'
                        }
                    },
                    data: {
                        // Data to pass to templates
                        version: "0.1.0",
                        title: "test"
                    }
                }
            }
        }
    });
    grunt.registerTask("build", [
        "copy",
        //"less",
        "autoprefixer",
        "imagemin"
    ]);
};