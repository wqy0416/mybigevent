$(function () {
    //点击‘去注册账号’链接
    $('#link_login').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击‘去登录’链接
    $('#link_reg').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;

    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致!';
            }
        }
    })

    //发起注册请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                // 模拟点击登录事件
                $('#link_reg').click();
            }
        })
    })

    //发起登录请求
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            //快速获取表单内容
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!');
                }
                layer.msg('登录成功!');
                //将登录成功得到的token字符串，保存到localstorage中
                localStorage.setItem('token', res.token);
                // 跳转到首页
                location.href = '../../index.html';
            }
        })
    })
})