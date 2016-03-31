'use strict';

module.exports = function (React, Router, songsStore) {
    var Header = require('./common/header.jsx')(React, Router);
    var Playlist = require('./playlist/playlist.jsx')(React, songsStore);
    var RouterHandler = Router.RouteHandler;

    return React.createClass({
        render: function () {
            return (
                <div>
                    <Header/>
                    <Playlist/>
                    <RouterHandler/>
                </div>
            );
        }
    });
};
