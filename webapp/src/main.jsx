'use strict';

var request = require('request');
var React = require('react');
var Router = require('react-router');
var fluxtore = require('fluxtore');
var Promise = require('bluebird');
var _ = require('lodash');

var PATH = {
    SONGS: window.isProd ? 'https://songbox.xyz/v1/songs' : 'http://localhost:8080/v1/songs'
};

// Stores

// var songStoreFactory = require('./stores/songStore.jsx');
// var songStore = songStoreFactory(fluxtore, request, PATH);
var spinnerStoreFactory = require('./stores/spinnerStore.jsx');
var spinnerStore = spinnerStoreFactory(fluxtore);
var playlistStoreFactory = require('./stores/playlistStore.jsx');
var playlistStore = playlistStoreFactory(fluxtore, request, PATH, Promise, _, spinnerStore);
var playerStoreFactory = require('./stores/playerStore.jsx');
var playerStore = playerStoreFactory(fluxtore, playlistStore, spinnerStore);

playerStore.init();

// Components

var spinnerFactory = require('./components/common/spinner.jsx');
var Spinner = spinnerFactory(React, spinnerStore);
var cardFactory = require('./components/playlist/card.jsx');
var Card = cardFactory(React, playerStore, playlistStore);
var playlistFactory = require('./components/playlist/playlist.jsx');
var Playlist = playlistFactory(React, Card, playlistStore, _);
var playerFactory = require('./components/common/player.jsx');
var Player = playerFactory(React, playerStore, playlistStore);

// Pages

var App = require('./components/app.jsx')(React, Router, Player, Spinner);
var Home = require('./components/homePage.jsx')(React, Playlist);
var About = require('./components/about/aboutPage.jsx')(React);
var NotFound = require('./components/notFound/notFoundPage.jsx')(React);

var routesFactory = require('./routes.jsx');
var routes = routesFactory(React, Router, App, Home, About, NotFound);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
