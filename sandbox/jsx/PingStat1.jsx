var React = require('react'),
    ReactDOM = require('react-dom'),
    PingStat = require('prod-components').PingStat;

ReactDOM.render(
    <PingStat numPings={6}
              numPingsUpperBenchmark={13}
              youtubeId={"ytid"}
              title={"title"}
              dateTimeLastPing={Date.now()} />,
    document.getElementById('cmp-goes-here'));
