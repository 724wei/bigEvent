function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: res => {
            if (res.status !== 0) return layer.msg('获取信息失败！')
            console.log(res);
            renderAvatar(res.data)
        },
        // complete: res => {
        //     if (res.message === '身份认证失败！' && res.status === 1) {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户列表
const renderAvatar = (user) => {
    // 获取用户名
    let uname = user.nickname || user.username
    // 设置欢迎语
    $('#welcome').html(`欢迎${uname}`)
    // 判断用户时候有头像图片
    if (user.user_pic !== null) {
        // 将用户对象中的图片渲染到页面上
        $('.layui-nav-img').attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        // 将用户名首字母大写，渲染到头像位置
        $('.text-avatar').html(uname[0].toUpperCase())
    }
}
$('#quitBtn').click(() => {
    layer.confirm('是否退出？', { icon: 3, title: "提示" }, function (index) {
        localStorage.removeItem('token')
        location.href = "/login.html"
    })
})
getUserInfo()

function change() {
    $('#change').attr('class', 'layui-this').next().attr('class', '')
}