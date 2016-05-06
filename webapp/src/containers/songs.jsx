export default function(React, musicStore, SongsItem) {
    let songsContainerProxy;

    songsContainerProxy = React.createClass({
        getInitialState: () => getState(),

        componentWillMount: componentWillMount,

        componentWillUnmount: componentWillUnmount,

        onProfileChange: onProfileChange,

        render: render
    });

    return songsContainerProxy;

    function getState() {
        return {
            currentSong: musicStore.getCurrentSong(),

            songs: musicStore.getSongs()
        };
    }

    function componentWillMount() {
        musicStore.addChangeListener(this.onProfileChange);
    }

    function componentWillUnmount() {
        musicStore.removeChangeListener(this.onProfileChange);
    }

    function onProfileChange() {
        this.setState(getState());
    }

    function render() {
        let items = createItemCollection(this.state.songs, this.state.currentSong);

        if (items.length > 0) {
            return (
                <ul className="collection songs">
                    { items }
                </ul>
            );
        }

        return (
            <div className="valign-wrapper no-songs">
                <span className="valign"><i className="el el-exclamation-sign"></i> It seems like you haven't added any songs yet. Try to add something to your <a
                    href="https://dropbox.com/home" target="_blank">Dropbox</a> first!</span>
            </div>
        );
    }

    function createItemCollection(collection, currentSong) {
        return collection.map((item, index) => (
            <SongsItem
                key={ index }
                title={ item.title }
                path={ item.path }
                currentSongPath={ currentSong.path }
                clickHandlerCallback={ onPlaylistClick }
            >
            </SongsItem>
        ));
    }

    function onPlaylistClick(songPath) {
        musicStore.changeToPath(songPath);
    }

    function onChangeSkill(skill) {
        profileStore.updateSkill(skill);
    }
};
