var React = require('react'),
    $ = require('jquery');

class ListOfPingStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pingStatPropsList: [],
            statusLabel: 'Loading...'
        };
    }

    componentDidMount() {
        if (this.props.restEndpoint) {
            this.serverRequest = $.get({
                url: this.props.restEndpoint,
                data: {sinceDateTime: this.props.sinceDateTime},
                dataType: 'json'
            })
            .done(function(res) {
                this.updateListContents(res);
            }.bind(this))
            .fail(function(jqXHR, textStatus, errThrown) {
                // TODO Response error handling.
                this.setState({
                    statusLabel: 'Load error: ' + textStatus
                });
            });
        } else if (this.props.pingStatPropsList) {
            // This prop exists only for testing purposes.
            this.updateListContents(this.props.pingStatPropsList);
        } else {
            throw new Error('Invalid props passed to component.');
        }
    }

    updateListContents(pingStatPropsList) {
        var newStatusLabel = pingStatPropsList.length ? null : 'No recent pings';
        this.setState({
            pingStatPropsList: pingStatPropsList,
            statusLabel: newStatusLabel
        });
    }

    componentWillUnmount() {
        if (this.serverRequest) {
            this.serverRequest.abort();
        }
    }

    render() {
        if (this.state.statusLabel) {
            return (
                <div className="listofpingstat">
                    <label className="status">{this.state.statusLabel}</label>
                </div>
            );
        } else {
            var numPingsUpperBound = this.props.numPingsUpperBound;
            return (
                // Using a globally unique value (youtube id) for the key since these PingStats may move around later.
                <div className="listofpingstat">
                    {this.state.pingStatPropsList.map(function(pingStatProps) {
                        return <PingStat {...pingStatProps}
                                         numPingsUpperBound={numPingsUpperBound}
                                         key={pingStatProps.youtubeId} />;
                    })}
                </div>
            );
        }
    }
}
ListOfPingStat.propTypes = {
    restEndpoint: React.PropTypes.string.isRequired,
    sinceDateTime: React.PropTypes.string.isRequired,
    numPingsUpperBound: React.PropTypes.number.isRequired,
    // Optional prop for testing purposes.
    pingStatPropsList: React.PropTypes.array
};

class PingStat extends React.Component {
    render() {
        return (
            <div className="pingstat">
                <PingStatBar {...this.props} />
                <PingStatVideoLink {...this.props} />
                <PingStatDateTime {...this.props} />
            </div>
        )
    }
}

class PingStatBar extends React.Component {
    render() {
        var numFilledBoxes = this.calculateNumFilledBoxes();
        var numEmptyBoxes = this.props.numBoxesToDisplay - numFilledBoxes;
        var boxesMarkup = [];
        // Using a weak key (index) since the boxes will never move around.
        for (var i = 0; i < numEmptyBoxes; i++) {
            boxesMarkup.push(<div className="pingstatbarbox" key={i}></div>);
        }
        for (var i = numEmptyBoxes; i < this.props.numBoxesToDisplay; i++) {
            boxesMarkup.push(<div className="pingstatbarbox filled" key={i}></div>);
        }
        return (
            <div className="pingstatbar" title={this.props.numRecentPings}>
                {boxesMarkup}
            </div>
        )
    }

    calculateNumFilledBoxes() {
        var n = this.props.numRecentPings / this.props.numPingsUpperBound;
        n = n * this.props.numBoxesToDisplay;
        n = Math.round(n);
        n = Math.max(n, 1);
        return n;
    }
}
PingStatBar.propTypes = {
    numRecentPings: React.PropTypes.number.isRequired
};
PingStatBar.defaultProps = {
    numBoxesToDisplay: 20
};

class PingStatVideoLink extends React.Component {
    render() {
        var videoUrl = 'https://www.youtube.com/watch?v=' + this.props.youtubeId;
        return (
            <div className="pingstatvideolink">
                <a href={videoUrl} target="_blank">
                    {this.props.title}
                </a>
            </div>
        )
    }
}
PingStatVideoLink.propTypes = {
    youtubeId: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
};

class PingStatDateTime extends React.Component {
    render() {
        var dateTimeCurrentLocale = new Date(this.props.dateTimeLastPing).toLocaleString();
        return (
            <div className="pingstatdatetime">
                <span>{dateTimeCurrentLocale}</span>
            </div>
        )
    }
}
PingStatDateTime.propTypes = {
    dateTimeLastPing: React.PropTypes.string.isRequired
};

module.exports = {
    ListOfPingStat: ListOfPingStat
};
