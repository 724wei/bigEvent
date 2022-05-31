$(function () {
    // 用户信息校验
    const form = layui.form
    form.verify({
        nickname: val => {
            if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    })

    // 获取用户数据
    const getUser = () => {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) return layer.msg('获取用户信息失败！')
                // 将信息返回到页面上
                form.val('formUserInfo', res.data)
            }
        })
    }
    getUser()

    //重置功能
    $('#resetBtn').click(e => {
        e.preventDefault()
        // 重新调用一下用户信息，渲染到页面上
        getUser()
    })
    // 提交用户修改信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('获取失败')
                layer.msg('获取成功')
                window.parent.getUserInfo()

            }
        })
    })
})