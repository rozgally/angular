module.exports = function(config){
  config.set({

    basePath : '',

    frameworks:['jasmine'],

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'app/bower_components/angular-ui-grid/ui-grid.min.js',
      'app/bower_components/angular-resource/angular-resource.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/lib/ui-bootstrap-tpls-1.2.2.min.js',
      'app/components/**/*.js',
      'app/*.js',
      'app/controllers/*.js',
      'app/services/*.js',
      'app/directives/*.js',
      'app/test/*.js'
    ],
    preprocessors:{
      'app/partials/*.html':'ng-html2js',
      'app/controllers/*.js':'coverage',
      'app/services/*.js':'coverage',
      'app/directives/*.js':'coverage'
    },
    ngHtml2JsPreprocessor:{
      stripPrefix:'app/',
      moduleName:'directive-templates'
    },
    autoWatch : true,

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-htmlfile-reporter',
            'karma-coverage'
            ],
    reporters:['progress','coverage','html'],
    htmlReporter:{
        outputFile: 'target/karma-reports/unit-tests-report.html',
        //optional
        pageTitle:'Unit Tests',
        subPageTitle:'Report'
    },
    coverageReporter:{
      reporters:[{type:'html'}],
      dir:'coverage/'
    },
    port:9876,

    colors:true,
    logLevel:config.LOG_INFO,
    browsers:['Chrome'],
    singleRun:false

  })
}
