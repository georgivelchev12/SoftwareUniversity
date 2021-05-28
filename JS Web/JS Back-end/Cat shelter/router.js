const handlers = {};

function match(url) {
    // Look for hanlder

    // return hanlder
}

function registerHandler(url, handler) {
    handlers[url] = handler;

    if(handler == undefined){
        return defaultHandler;
    } else{
        return handler;
    }
}

function defaultHandler(req, res) {
    res.statusCode = 404;
    res.write('Not found');
    res.end();
}


module.exports = {
    registerHandler,
    match
}