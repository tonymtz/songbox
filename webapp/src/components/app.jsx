export default function(React, Header, Spinner, Player) {
    class App extends React.Component {
        render() {
            return (
                <section>
                    <Header/>

                    { this.props.children }

                    <Spinner/>

                    <Player/>
                </section>
            );
        }
    }

    return App;
};
