'use strict';

var $ = require('jquery');

var React = require('react');
var Router = require('react-router');

var routes = require('./routes.jsx')(React, Router);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
