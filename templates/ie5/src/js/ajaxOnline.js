function ajax(url, method, params, successCb, failCb) {
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
    var m = method.toUpperCase();
    if (m === 'GET') {
        var pArr = [];
        for (key in params) {
            pArr.push(key + '=' + params[key]);
        }
        var pStr = pArr.join('&');
        url = url + '?' + pStr;
    }
    xhr.open(m, url, true);
    if (m === 'POST') {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(params));
    } else if (m === 'GET') {
        xhr.send();
    }
    return xhr;
}