const routes = [
    require('./auth'),
    require('./calculator')

];


module.exports = function router(app, pool){
    return routes.forEach(route=>{
        route(app, pool);
    })
}