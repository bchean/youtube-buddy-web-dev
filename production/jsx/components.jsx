var React = require('react');

class PingStat extends React.Component {
    render() {
        return (
            <div class="pingstat">
                <PingStatBar numPings={this.props.numPings} />
                <PingStatVideoLink youtubeId={this.props.youtubeId}
                                   title={this.props.title} />
                <PingStatDateTime dateTimeLastPing={this.props.dateTimeLastPing} />
            </div>
        )
    }
}

class PingStatBar extends React.Component {
    render() {
        return (
            <span title={this.props.numPings}>
                bar placeholder
            </span>
        )
    }
}

class PingStatVideoLink extends React.Component {
    render() {
        var videoUrl = 'https://www.youtube.com/watch?v=' + this.props.youtubeId;
        return (
            <a href={videoUrl} target="_blank">
                {this.props.title}
            </a>
        )
    }
}

class PingStatDateTime extends React.Component {
    render() {
        var dateTimeCurrentLocale = new Date(this.props.dateTimeLastPing).toLocaleString();
        return (
            <span><i>{dateTimeCurrentLocale}</i></span>
        )
    }
}

module.exports = {
    PingStat: PingStat
};
