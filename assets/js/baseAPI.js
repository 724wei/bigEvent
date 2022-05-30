//在每次调用$.get()和$.post或$.ajax的时候，会先调用该函数
// 在该函数中可以拿到ajax提供的配置对象，即/api/xx 
$.ajaxPrefilter((options) => {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})