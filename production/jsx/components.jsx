var React = require('react');

class ListOfPingStat extends React.Component {
    render() {
        // TODO Replace attribute-based data injection with ajax.
        return (
            <div className="listofpingstat">
                {this.props.propsList.map(function(pingStatProps) {
                    return <PingStat {...pingStatProps} />;
                })}
            </div>
        )
    }
}

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
            <div className="pingstatbar" title={this.props.numPings}>
                {boxesMarkup}
            </div>
        )
    }

    calculateNumFilledBoxes() {
        var n = this.props.numPings / this.props.numPingsUpperBenchmark;
        n = n * this.props.numBoxesToDisplay;
        n = Math.round(n);
        n = Math.max(n, 1);
        return n;
    }
}
PingStatBar.defaultProps = {
    numBoxesToDisplay: 10
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
    ListOfPingStat: ListOfPingStat,
    PingStat: PingStat
};
