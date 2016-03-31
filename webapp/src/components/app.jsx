'use strict';

module.exports = function (React, Router) {
    var Header = require('./common/header.jsx')(React, Router);
    var RouterHandler = Router.RouteHandler;

    return React.createClass({
        render: function () {
            return (
                <div>
                    <Header/>
                    <RouterHandler/>
                </div>
            );
        }
    });
};
