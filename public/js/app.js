/* 菜鸟课程代码
require.config({
	baseUrl: 'js',
	paths : {
		"jquery" : ["http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min"],
		"underscore" : ["http://apps.bdimg.com/libs/underscore.js/1.7.0/underscore-min"],
		"a" : "app/a"
	}
})
require(["jquery","underscore","a"], function($, _, a){
	$(function(){
		console.log(a);
		$("body").css("color", "white");
		_.each([1,2,3],alert);
	})
});
 
*/
/*尝试shim

require.config({
	baseUrl: 'js/lib',
	shim: {
        'app/a': ['jquery'],
        'app/b': ['underscore']
    },
	paths: {
		"jquery" : ["jquery.min"],
		app: '../app',
		"underscore" : ["underscore-min"]
	}
});

require(['jquery','underscore','app/a','app/b','app/c'],function($,_,a,b,c){
	_.each([1,2,3], alert);
});


 
*/
/*尝试shim2
require.config({
	baseUrl: 'js/lib',
	shim: {
		'jquery.min': ['underscore-min'],
		'app/a': ['jquery.min'],

	},
	paths: {
		app: '../app'
	}
});

require(['jquery.min','underscore-min','app/a','app/b','app/c'],function(jquery,underscore,a,b,c){
	console.log(a);
	$("body").css("color", "yellow");
	_.each([1,2,3], alert);
}); 

 
*/

require.config({
    baseUrl: 'libs',
    shim: {
        'jquery-ui.min': ['jquery.min'],
        'jquery.fullPage.min': ['jquery-ui.min'],
        'app/examples': ['jquery.fullPage.min']
    },
    paths: {
        app: '../js'
    }
});

require(['jquery.min', 'jquery-ui.min', 'jquery.fullPage.min','app/examples'], function() {
    console.log('a');
    $('#fullpage').fullpage({
            verticalCentered: false,

            //to avoid problems with css3 transforms and fixed elements in Chrome, as detailed here: https://github.com/alvarotrigo/fullPage.js/issues/208
            css3: false,
            navigation: true,
            navigationPosition: 'right'
        });
    /*
    $(document).ready(function() {
        
    });
    */
});
