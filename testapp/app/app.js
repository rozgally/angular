'use strict';

// Declare app level module which depends on views, and components
var testApp = angular.module('testApp', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'ui.grid',
  'ui.grid.resizeColumns',
  'ui.grid.pagination',
  'ui.grid.autoResize',
  'ui.grid.selection',
  'ui.grid.expandable',
  'ui.bootstrap'
]).
config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.when('','/home').when('/','/home');
  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('test',{
  						 abstract:true,
  						 template:'<ui-view />',
  				})
  				.state('home',{
  						url:'/home',
  						templateUrl:'partials/home.html',
  						controller:"homeController",
  						//resolve:homeController.resolve,
  				})
}]);
