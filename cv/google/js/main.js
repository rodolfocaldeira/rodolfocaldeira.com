var supports3DTransforms = document.body.style['webkitPerspective'] !== undefined ||
    document.body.style['MozPerspective'] !== undefined;

// http://jsfiddle.net/hakim/Ht6Ym/
function linkify(selector) {
    if(supports3DTransforms) {
        var nodes = document.querySelectorAll(selector);

        for(var i = 0, len = nodes.length; i < len; i++) {
            var node = nodes[i];
            if(node.className === 'is-3d') {
                node.innerHTML = '<span data-title="' + node.text + '">' + node.innerHTML + '</span>';
            }
        }
    }
}

linkify('a');