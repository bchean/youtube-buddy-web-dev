var React = require('react');

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
        var numFilledBoxes = Math.round(this.props.numPings / this.props.numPingsUpperBenchmark * this.props.numBoxesToDisplay);
        var numEmptyBoxes = this.props.numBoxesToDisplay - numFilledBoxes;
        var boxesMarkup = [];
        for (var i = 0; i < numEmptyBoxes; i++) {
            boxesMarkup.push(<PingStatBarBox />);
        }
        for (var i = 0; i < numFilledBoxes; i++) {
            boxesMarkup.push(<PingStatBarBox isFilled={true} />);
        }
        return (
            <div className="pingstatbar" title={this.props.numPings}>
                {boxesMarkup}
            </div>
        )
    }
}
PingStatBar.defaultProps = {
    numBoxesToDisplay: 10
};

class PingStatBarBox extends React.Component {
    render() {
        var className = 'pingstatbarbox';
        if (this.props.isFilled) {
            className += ' filled';
        }
        return (
            <div className={className}></div>
        )
    }
}
PingStatBarBox.defaultProps = {
    isFilled: false
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
                <span><i>{dateTimeCurrentLocale}</i></span>
            </div>
        )
    }
}

module.exports = {
    PingStat: PingStat
};
