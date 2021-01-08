$(function () {
    var obj = $.parseJSON(sessionStorage.getItem('obj'));
    console.log(obj);
    $('[name=title]').val(obj.title);
    $('[name=cate_id]').val(obj.cate_id);
    $('[name=content]').val(obj.content);
})