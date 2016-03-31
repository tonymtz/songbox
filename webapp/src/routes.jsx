'use strict';

module.exports = function (React, Router, songsStore) {
    var DefaultRoute = Router.DefaultRoute;
    var Route = Router.Route;
    var NotFoundRoute = Router.NotFoundRoute;

    var App = require('./components/app.jsx')(React, Router, songsStore);

    // Pages

    var Home = require('./components/homePage.jsx')(React);
    var About = require('./components/about/aboutPage.jsx')(React);
    var NotFound = require('./components/notFound/notFoundPage.jsx')(React);

    return (
        <Route name="app" path="/" handler={App}>
            <DefaultRoute handler={Home}/>

            <Route name="about" handler={About}></Route>

            <NotFoundRoute handler={NotFound}/>
        </Route>
    );
};
