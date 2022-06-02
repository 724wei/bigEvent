$(function () {
    const initArtCateList = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: res => {
                // 成功后渲染模板字符串中的数据
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }
    initArtCateList()
    const layer = layui.layer;
    let indexAdd = null
    $('#btnAddCate').click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg("新增分类失败！");
                initArtCateList();
                layer.msg("新增分类成功！");
                layer.close(indexAdd);
            }
        })
    })

    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        // 获取点击的列表项的id值
        const id = $(this).attr('data-id')
        $.ajax({
            type: 'GET',
            url: "/my/article/cates/" + id,
            success: res => {
                layui.form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', "#form-edit", function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg("更新分类数据失败！")
                layer.msg("更新分类数据成功！")
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id')
        // e.preventDefault()
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" },
            function (index) {
                $.ajax({
                    type: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: res => {
                        if (res.status !== 0) return layer.msg('删除文章分类失败')
                        layer.msg('删除文章分类成功')
                        layer.close(index)  
                        initArtCateList()
                    }
                })
            }
        )
    })
})