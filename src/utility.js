const deploySucceededMessage = () => {
    return "Deploy succeeded for {{site}}";
};

const replaceAll = (str,mapObj) => {
    const re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
};

module.exports = {
    replaceAll: replaceAll,
    deploySucceededMessage: deploySucceededMessage
};
