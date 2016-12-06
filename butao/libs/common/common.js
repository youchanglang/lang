var common = common || {};

common.baseUrl = 'http://10.16.151.33/course-erp/';

// ajax 提交之前触发
$(document).ajaxSend(function () {
    if ($('.mask')[0]) {
        $('.mask').show();
    } else {
        $('<div class="mask"><i class="fa fa-spinner fa-spin"></i></div>').appendTo('body').show();
    }
    
}).ajaxComplete(function (event, XMLHttpRequest, ajaxOptions) {// ajax 请求完成后触发
    $('.mask').hide();
    if (ajaxOptions.dataType == 'html') {
        return false;
    }
    var obj = JSON.parse(XMLHttpRequest.responseText);
    if (!obj.state && obj.message == 'unauthorized') {
        window.location.href = 'login2.html';
    }
})