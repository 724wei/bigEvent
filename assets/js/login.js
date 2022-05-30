$(function () {
    // 登录注册
    $('#link_reg').click(() => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').click(() => {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 引入form模块
    const form = layui.form
    // 自定义校验规则
    form.verify({
        // 密码规则校验
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 两次密码一致校验
        repwd: (value) => {

            const pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) return "密码不一致，请重新输入"
        }
    })
    // 获取layer内置模块
    const layer = layui.layer
    // 注册事件
    $('#form_reg').on('submit', e => {
        // 阻止默认点击事件
        e.preventDefault()
        // 获取用户输入的值
        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: {
                // 从页面上获取用户输入的值
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: res => {
                //通过res判断状态是否注册成功
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg("注册成功！")
                // 注册成功后自动点击事件，转到登录界面
                $('#link_login').click()
            }
        })
    })

    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // 获取用户输入的值，格式为username=username&passwoed=password
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功')
                // 登录成功后将该用户的token存储到本地
                localStorage.setItem('token', res.token)
                // 存储过token后将页面跳转到主页面
                location.href = '/index.html'
            }
        })
    })
})

