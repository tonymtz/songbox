export default function(React, musicStore, PlaylistItem) {
    let playlistContainerProxy;

    playlistContainerProxy = React.createClass({
        getInitialState: () => getState(),

        componentWillMount: componentWillMount,

        componentWillUnmount: componentWillUnmount,

        onMusicStoreChange: onMusicStoreChange,

        render: render
    });

    return playlistContainerProxy;

    function getState() {
        return {
            currentPlaylist: musicStore.getCurrentPlaylist(),

            playlists: musicStore.getPlaylists()
        };
    }

    function componentWillMount() {
        musicStore.addChangeListener(this.onMusicStoreChange);
    }

    function componentWillUnmount() {
        musicStore.removeChangeListener(this.onMusicStoreChange);
    }

    function onMusicStoreChange() {
        this.setState(getState());
    }

    function render() {
        let items = createItemCollection(this.state.playlists, this.state.currentPlaylist);

        return (
            <div className="collection playlists">
                { items }
            </div>
        );
    }

    function createItemCollection(collection, currentPlaylist) {
        return collection.map((item, index) => (
            <PlaylistItem
                key={ index }
                title={ item }
                currentPlaylist={ currentPlaylist }
                clickHandlerCallback={ onPlaylistClick }
            >
            </PlaylistItem>
        ));
    }

    function onPlaylistClick(playlist) {
        musicStore.changeToPlaylist(playlist);
    }

    function onChangeSkill(skill) {
        profileStore.updateSkill(skill);
    }
};
