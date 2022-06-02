$(function () {
    const form = layui.form
    const laypage = layui.laypage
    const q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 3, // 每页显示几条数据，默认每页显示2条
        cate_id: "", // 文章分类的 Id
        state: "", // 文章的发布状态
    }

    const initTable = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: res => {
                if (res.status !== 0) return layer.msg('获取列表失败')
                const htmlStr = template('tpl-table', res)
                $("tbody").html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    const initCate = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) return layer.msg('获取分类数据失败！')
                const htmlStr = template('tpl-cate', res)
                $("[name=cate_id]").html(htmlStr)
                form.render();
            }
        })
    }
    initTable()
    initCate()
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 筛选功能的实现
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initTable()
    })
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],// 每页展示多少条
            jump: function (obj, first) {
                console.log(first);
                // 将选中的页码值赋给显示的页数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 当点击调用后就会把first的值进行修改
                // 当仅仅是浏览器初始化时，就不会对first进行修改
                if (!first) {
                    // console.log(first);
                    initTable()
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function () {
        let len = $('.btn-delete').length
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: res => {
                    if (res.status !== 0) return layer.msg('删除文章失败！')
                    layer.msg('删除文章成功！')
                    if (len === 1)
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    initTable()
                }
            })
            layer.close(index)
        })
    })
})