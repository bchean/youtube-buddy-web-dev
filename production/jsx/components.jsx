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
                <div className="listofpingstat">
                    {this.state.pingStatPropsList.map(function(pingStatProps) {
                        return <PingStat {...pingStatProps}
                                         numPingsUpperBound={numPingsUpperBound} />;
                    })}
                </div>
            );
        }
    }
}
// TODO Make props required.

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
        for (var i = 0; i < numEmptyBoxes; i++) {
            boxesMarkup.push(<div className="pingstatbarbox"></div>);
        }
        for (var i = 0; i < numFilledBoxes; i++) {
            boxesMarkup.push(<div className="pingstatbarbox filled"></div>);
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

module.exports = {
    ListOfPingStat: ListOfPingStat
};
