export default function(React) {
    let playlistsItemProxy;

    playlistsItemProxy = React.createClass({
        propTypes: {
            title: React.PropTypes.string.isRequired,

            clickHandlerCallback: React.PropTypes.func.isRequired,

            currentPlaylist: React.PropTypes.string
        },

        render: render
    });

    return playlistsItemProxy;

    function render() {
        let anchorClassName = 'collection-item truncate';
        let iconClassName = 'el';

        if (this.props.title === this.props.currentPlaylist) {
            anchorClassName += ' active';
            iconClassName += ' el-folder-open';
        } else {
            iconClassName += ' el-folder';
        }

        return (
            <a
                className={ anchorClassName }
                onClick={ handleClick(this) }
            >
                <i className={ iconClassName }></i>
                { this.props.title }
            </a>
        );
    }

    function handleValueChange(ctx) {
        return (event) => {
            ctx.setState(Object.assign(ctx.state, {
                value: event.target.value
            }));
        };
    }

    function handleKeyDown(ctx) {
        return (event) => {
            if (event.keyCode == 13) {
                ctx.props.onChangeSkill({
                    id: ctx.props.id,
                    strength: ctx.state.strength,
                    value: ctx.state.value
                });

                toggleEditing(ctx);
            }
        };
    }

    function handleSelectStrengthChange(ctx) {
        return (event) => {
            ctx.setState(Object.assign(ctx.state, {
                strength: event.target.value
            }));
        }
    }

    function handleClick(ctx) {
        return () => {
            ctx.props.clickHandlerCallback(ctx.props.title);
        };
    }

    function toggleEditing(ctx) {
        ctx.setState(Object.assign(ctx.state, {
            editing: !ctx.state.editing
        }));
    }
};
