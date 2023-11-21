const { liveresult_t20 } = require(`../modules/cricket/t20Result`)
      express = require(`express`)
      t20 = express.Router();

module.exports = t20.get(`/mens-result`, (req, res) => {
    const url = config.links.mens_results;
    liveresult_t20(url, res)
})

module.exports = t20.get(`/womens-result`, (req, res) => {
    const url = config.links.womens_results;
    liveresult_t20(url, res)
})


