const { liveresult_odi } = require(`../modules/cricket/odiResult`)
      express = require(`express`)
      odi = express.Router();

module.exports = odi.get(`/mens-result`, (req, res) => {
    const url = config.links.mens_results;
    liveresult_odi(url, res)
})

module.exports = odi.get(`/womens-result`, (req, res) => {
    const url = config.links.womens_results;
    liveresult_odi(url, res)
})


