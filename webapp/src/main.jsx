'use strict';

var $ = require('jquery');

var React = require('react');
var Router = require('react-router');
var fluxtore = require('fluxtore');

var songsStoreFactory = require('./stores/songsStore.jsx');
var routesFactory = require('./routes.jsx');

var songsStore = songsStoreFactory(fluxtore);
var routes = routesFactory(React, Router, songsStore);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
