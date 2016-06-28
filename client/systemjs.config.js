// map tells the System loader where to look for things
var map = {
    'app':                              '', // 'dist',
    'rxjs':                             'lib/rxjs',
    '@angular':                         'lib/@angular',
    'angular2-jwt':                     'lib/angular2-jwt/angular2-jwt.js',
    'angular2-google-maps':             'lib/angular2-google-maps'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
    'app':                              {main: 'main', defaultExtension: 'js'},
    'rxjs':                             {defaultExtension: 'js'},
    "angular2-jwt":                     {defaultExtension: 'js'},
    'angular2-google-maps/core':        {defaultExtension: 'js', main: 'index.js'}
};

var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
];

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

System.config({
    map: map,
    packages: packages
});