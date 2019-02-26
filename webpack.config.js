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

module.exports = webpackDefaults
