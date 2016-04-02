'use strict';

module.exports = function (React, Router, App, Home, About, NotFound) {
    var DefaultRoute = Router.DefaultRoute;
    var Route = Router.Route;
    var NotFoundRoute = Router.NotFoundRoute;

    return (
        <Route name="app" path="/" handler={App}>
            <DefaultRoute handler={Home}/>

            <Route name="about" handler={About}></Route>

            <NotFoundRoute handler={NotFound}/>
        </Route>
    );
};
