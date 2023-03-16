var root = document.getElementById('root');
var pageQuery = utils.getQuery(location.search);

root.innerText = "Hellow World !"

ajax('/api/xxx/xxx', 'POST', data, function(response) {
    console.log(response)
}, function(err) {
    console.log(err)
});    

function init() {
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    ajax('/api/xxx/xxx', 'POST', data, function(response) {
        console.log(response);
    }, function(err) {
        console.log(err);
    });  
    utils.addEvent(root, 'click', function() {
        root.innerText = "click"+ clientWidth + clientHeight;
    });
}

init();
