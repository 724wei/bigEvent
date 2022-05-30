//在每次调用$.get()和$.post或$.ajax的时候，会先调用该函数
// 在该函数中可以拿到ajax提供的配置对象，即/api/xx 
$.ajaxPrefilter((options) => {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 判断是否含有/my/路径，有则注入token
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    // 判断是否含有token
    options.complete = res => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制删除token
            localStorage.removeItem('token')
            // 跳转到login页面
            location.href = '/login.html'
        }
    }
})