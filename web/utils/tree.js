export default {

    each: function (data, callback) {

        var shudownTraverse, fk;

        if (data.constructor == Array) {
            for (var i = 0,l=data.length; i < l; i++)
                if (shudownTraverse !== false) traverse(data[i], i, data, null, callback, 1);
        } else if (data.constructor == Object) {
            if (shudownTraverse !== false) traverse(data, 0, [data], null, callback, 1);
        }
        shudownTraverse = null;
        return this;

        function traverse(node, index, arr, parent, callback, root) {
            shudownTraverse = callback(node, index, arr, parent, root);
            if (shudownTraverse === false) return;
            var items = node.children || node.items;
            if (items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    if (shudownTraverse === false) break;
                    if (items[i]) {
                        traverse(items[i], i, items, node, callback);
                    }
                }
            }
        }
    }
}