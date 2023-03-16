var $$ = window.$;
var $template = window.template;
var $utils = window.utils;
var $echarts = window.echarts;

function queryPost(url, data, success, fail) {
    $$.ajax({
        url:  url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            if (res.success) {
                success(res.data);
            } else {
                if (fail) {
                    fail(res);
                } else {
                    // todo
                }
            }
        }
    });
}

function init() {
    let data={a:1,b:2}
    var html = $template('template_script', data);
    $$('#template').html(html);
}


$$(document).ready(function () {
    init();
});

