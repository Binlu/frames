/*
	#author		lut000
	#date 		2018/06/13
*/
require.config({
    baseUrl:'js',
    paths:{
        'common':['common-fn']
    },
    shim:{
        'common':{
            exports:'common'
        },
    }
});

require(['common'],function(common){
	var container=document.querySelector('.js-container');
	var canvas=container.querySelector('.js-canvas');

	common.init(container,canvas);	
});