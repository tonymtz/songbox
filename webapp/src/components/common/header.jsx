'use strict';

module.exports = function (React, Router) {
    var Link = Router.Link;

    return React.createClass({
        render: function () {
            return (
                <nav>
                    <ul>
                        <li><Link to="app">Home</Link></li>
                        <li><Link to="about">About</Link></li>
                    </ul>
                </nav>
            );
        }
    });
};
