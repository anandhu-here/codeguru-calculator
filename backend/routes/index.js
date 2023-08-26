const routes = [
    require('./auth'),
    require('./calculator')

];


module.exports = function router(app, db){
    return routes.forEach(route=>{
        route(app, db);
    })
}