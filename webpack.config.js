const webpack = require('webpack')
const webpackDefaults = require('systematic').webpack_get_defaults(__dirname)

function getOr (x, dflt = null) {
  return x ? JSON.stringify(x) : dflt
}

webpackDefaults.plugins.push(
  new webpack.DefinePlugin({
    MDP_API_URL: getOr(process.env.MDP_API_URL),
  })
)

webpackDefaults.module.rules.push(
  { test: /\.otf(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=50000' },
)

module.exports = webpackDefaults
