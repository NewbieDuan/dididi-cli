var ENUMS = {
    HZYBLX: [
        {
            label: '城镇职工',
            full_label: '城镇职工基本医疗保险',
            value: '01'
        },
        {
            label: '城镇居民',
            full_label: '城镇居民基本医疗保险',
            value: '02'
        },
        {
            label: '新农合',
            full_label: '新型农村合作医疗',
            value: '03'
        },
        {
            label: '贫困救助',
            full_label: '贫困救助',
            value: '04'
        },
        {
            label: '商业保险',
            full_label: '商业医疗保险',
            value: '05'
        },
        {
            label: '公费',
            full_label: '全公费',
            value: '06'
        },
        {
            label: '自费',
            full_label: '全自费',
            value: '07'
        },
        {
            label: '其他保险',
            full_label: '其他社会保险',
            value: '08'
        },
        {
            label: '其他',
            full_label: '其他',
            value: '99'
        }
    ]
};

var utils = {
    addEvent: function(obj, eventType, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(eventType, fn);
        } else if (obj.attachEvent) {
            // obj[eventType + fn] = function() {
            //     fn.call(fn)
            // };
            obj.attachEvent('on' + eventType, fn)
        } else {
            obj['on' + eventType] = fn;
        }
    },
    removeEvent: function(obj, eventType, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(eventType, fn);
        } else if (obj.detachEvent) {
            obj.detachEvent(eventType, fn);
        } else {
            obj['on' + eventType] = null;
        }
    },
    stopBubble: function(e) {
        var e = e || window.event
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
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