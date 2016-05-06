export default function(React) {
    let songsItemProxy;

    songsItemProxy = React.createClass({
        propTypes: {
            title: React.PropTypes.string.isRequired,

            path: React.PropTypes.string.isRequired,

            clickHandlerCallback: React.PropTypes.func.isRequired,

            currentSongPath: React.PropTypes.string // optional param intended
        },

        render: render
    });

    return songsItemProxy;

    function render() {
        let className = 'collection-item';
        className += this.props.path === this.props.currentSongPath ? ' active' : '';

        return (
            <li className={ className }>
                <a className="truncate" onClick={ handleClick(this) }>
                    { this.props.title }
                </a>

                <a onClick={ handleClick(this) } className="secondary-content pointer">
                    <i className="el el-play-circle"></i>
                </a>
            </li>
        );
    }

    function handleClick(ctx) {
        return () => {
            ctx.props.clickHandlerCallback(ctx.props.path);
        };
    }
};
