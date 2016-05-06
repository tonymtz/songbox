export default function(React, Playlists, Songs) {
    let HomePageProxy;

    HomePageProxy = React.createClass({
        render: render
    });

    return HomePageProxy;

    function render() {
        return (
            <div className="main container">
                <div className="row">
                    <div className="col s3">
                        <Playlists/>
                    </div>
                    <div className="col s9">
                        <Songs/>
                    </div>
                </div>
            </div>
        );
    }
};
