var React = require('react'),
    ReactDOM = require('react-dom'),
    PingStat = require('prod-components').PingStat;

var numPingsUpperBenchmark = 21;

ReactDOM.render(
    <PingStat numPings={19}
              numPingsUpperBenchmark={numPingsUpperBenchmark}
              youtubeId={"ytid"}
              title={"Lorem ipsum dolor"}
              dateTimeLastPing={Date.now()} />,
    document.getElementById('cmp1'));

ReactDOM.render(
    <PingStat numPings={5}
              numPingsUpperBenchmark={numPingsUpperBenchmark}
              youtubeId={"ytid"}
              title={"sit amet, consectetur adipiscing elit"}
              dateTimeLastPing={Date.now()} />,
    document.getElementById('cmp2'));

ReactDOM.render(
    <PingStat numPings={1}
              numPingsUpperBenchmark={numPingsUpperBenchmark}
              youtubeId={"ytid"}
              title={"sed do"}
              dateTimeLastPing={Date.now()} />,
    document.getElementById('cmp3'));

var extraCss = 'body { background-color: #3f1255; }';
ReactDOM.render(<style>{extraCss}</style>, document.getElementById('css'));
