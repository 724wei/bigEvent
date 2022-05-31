// 引入form模块
const form = layui.form
// 自定义校验规则
form.verify({
    // 密码规则校验
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //  新旧密码检验
    samepwd: (value) => {
        if (value === $('[name=oldPwd').val()) return '新旧密码不能相同'
    },
    // 两次密码一致校验
    repwd: (value) => {
        if (value !== $('[name=newPwd').val()) return '两次输入不相同'
    }
})

// 更新密码 
$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $('.layui-form').serialize(),
        success: res => {
            if (res.status !== 0) return layer.msg("更新密码失败！");
            // 删除原本token
            localStorage.removeItem('token')
            window.parent.location.href = '/login.html'
        }
    })
})