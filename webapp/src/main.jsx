/*
 * Start Point
 */

import React  from 'react';
import { render }  from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import fluxtore from 'fluxtore';
import request from 'request';
import lodash from 'lodash';

let PATH = {
    SONGS: window.isProd ? 'https://songbox.xyz/v1/songs' : 'http://localhost:8080/v1/songs'
};

/*
 * Stores
 */

import spinnerStoreFactory from './stores/spinner-store';
let spinnerStore = spinnerStoreFactory(fluxtore);

import musicStoreFactory from './stores/music-store';
let musicStore = musicStoreFactory(fluxtore, request, lodash, PATH, spinnerStore);

import playerStoreFactory from './stores/player-store';
let playerStore = playerStoreFactory(fluxtore, request, PATH, musicStore);

/*
 * Components
 */

import HeaderFactory from './components/header.jsx';
let Header = HeaderFactory(React, Link);

import PlaylistsItemFactory from './components/playlists-item.jsx';
let PlaylistsItem = PlaylistsItemFactory(React, Link);

import SongsItemFactory from './components/songs-item.jsx';
let SongsItem = SongsItemFactory(React, Link);

/*
 * Containers
 */

import PlayerFactory from './containers/player.jsx';
let Player = PlayerFactory(React, playerStore, musicStore);

import SpinnerFactory from './containers/spinner.jsx';
let Spinner = SpinnerFactory(React, spinnerStore);

import PlaylistsFactory from './containers/playlists.jsx';
let Playlists = PlaylistsFactory(React, musicStore, PlaylistsItem);

import SongsFactory from './containers/songs.jsx';
let Songs = SongsFactory(React, musicStore, SongsItem);

/*
 * Routes
 */

import AppFactory from './components/app.jsx';
let App = AppFactory(React, Header, Spinner, Player);

import HomePageFactory from './components/home-page.jsx';
let HomePage = HomePageFactory(React, Playlists, Songs);

/*
 * App
 */

let routes = (
    <Router history={browserHistory}>
        <Route path="/app" component={ App }>
            <IndexRoute component={ HomePage }/>
        </Route>
    </Router>
);

render(routes, document.getElementById('app'));
