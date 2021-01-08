$(function () {
    var form = layui.form;
    var layer = layui.layer;

    initArtCateList();
    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败!');
                }
                // console.log(res);
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
            }
        })
    }

    //为添加类别按钮绑定点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    //通过事件委托给form绑定事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章失败!');
                }
                initArtCateList();
                layer.msg('新增文章成功!');
                //根据索引关闭对应的弹出层
                layer.close(indexAdd);
            }
        })
    })

    //通过事件委托给编辑按钮绑定事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function (e) {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id');
        //发起请求获取对应分类的请求
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data);
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章分类失败!');
                }
                initArtCateList();
                layer.msg('更新文章分类成功!');
                //根据索引关闭对应的弹出层
                layer.close(indexEdit);
            }
        })
    })

    //通过事件委托给删除按钮添加点击事件
    $('tbody').on('click', '.btn-delete', function (e) {
        var id = $(this).attr('data-id');
        //提示用户删除的弹出框
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败!');
                    }
                    layer.msg('删除文章分类成功!');
                    layer.close(index);
                    initArtCateList();
                }
            })
        });
    })
})