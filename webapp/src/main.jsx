'use strict';

var request = require('request');
var React = require('react');
var Router = require('react-router');
var fluxtore = require('fluxtore');

// Stores

var songsStoreFactory = require('./stores/songsStore.jsx');
var songsStore = songsStoreFactory(fluxtore, request);

// Components

var cardFactory = require('./components/playlist/card.jsx');
var Card = cardFactory(React, songsStore);
var playlistFactory = require('./components/playlist/playlist.jsx');
var Playlist = playlistFactory(React, Card, songsStore);
var playerFactory = require('./components/common/player.jsx');
var Player = playerFactory(React, songsStore);

// Pages

var App = require('./components/app.jsx')(React, Router, songsStore);
var Home = require('./components/homePage.jsx')(React, Playlist, Player);
var About = require('./components/about/aboutPage.jsx')(React);
var NotFound = require('./components/notFound/notFoundPage.jsx')(React);

var routesFactory = require('./routes.jsx');
var routes = routesFactory(React, Router, App, Home, About, NotFound);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
