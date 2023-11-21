const { liveresult_t20i } = require(`../modules/cricket/t20iResult`)
      express = require(`express`)
      t20i = express.Router();

module.exports = t20i.get(`/mens-result`, (req, res) => {
    const url = config.links.mens_results;
    liveresult_t20i(url, res)
})

module.exports = t20i.get(`/womens-result`, (req, res) => {
    const url = config.links.womens_results;
    liveresult_t20i(url, res)
})


