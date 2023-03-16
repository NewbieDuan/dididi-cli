function ajax(url, method, params, successCb, failCb) {
    params = params || {};
    params.url = url;
    params.method = method;
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var respose = JSON.parse(xhr.responseText);
            if (respose.success) {
                successCb(respose);
            } else {
                failCb(respose);
            }
        }
    }
    xhr.open('POST', '/api', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(params));

    return xhr;
}
