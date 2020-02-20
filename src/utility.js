module.exports.replaceAll = function (str, mapObj) {
    const re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
};

module.exports.normalize = function (str) {
    return str.replace("https://", "");
};
