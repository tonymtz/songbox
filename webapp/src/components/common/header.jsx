'use strict';

module.exports = function (React, Router) {
    var Link = Router.Link;

    return React.createClass({
        render: function () {
            return (
                <nav>
                    <div className="nav-wrapper light-blue">
                        <div className="container">
                            <Link to="app" className="brand-logo left">Songbox</Link>

                            <ul className="right">
                                <li>
                                    <Link to="app">
                                        <i className="material-icons">library_music</i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="about">
                                        <i className="material-icons">info</i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }
    });
};
