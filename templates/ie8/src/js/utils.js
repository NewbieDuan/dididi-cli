var utils = {
    getQuery: function(search) {
        if (search.indexOf('?') == 0) {
            search = search.substr(1)
        }
        var queryObj = {};
        var queryArr = search.split('&');
        for(var i = 0, _i = queryArr.length; i < _i; i++) {
            var query = queryArr[i].split('=');
            queryObj[query[0]] = query[1];
        }

        return queryObj;
    }
};