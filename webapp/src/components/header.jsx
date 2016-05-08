export default function(React, Link) {
    let HeaderProxy;

    HeaderProxy = React.createClass({
        render: render
    });

    return HeaderProxy;

    function render() {
        return (
            <nav>
                <div className="nav-wrapper light-blue">
                    <div className="container">
                        <Link to="app" className="brand-logo left">Songbox</Link>

                        <a href="/logout" className="right">&nbsp;&nbsp; Log out</a>
                        <span className="right">Welcome back!</span>
                    </div>
                </div>
            </nav>
        );
    }
};
