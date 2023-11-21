const { match } = require('assert');
      axios = require('axios');
      cheerio = require('cheerio');

function liveresult_t20i(url, res) {
  axios.get(url).then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const matches = [];
      $('.match-block.t-t20i').each((index, element) => {
        const matchtype = $(element).find('.match-block__type').text();
        const date = $(element).find('.match-block__date--desktop').text();
        const endResult = $(element).find('.match-block__result').text();
            // 
        const team1 = $(element).find('.match-block__team-content').eq(0);
        const team2 = $(element).find('.match-block__team-content').eq(1);
  
        const team1Name = team1.find('.match-block__team-name').text();
        const team2Name = team2.find('.match-block__team-name').text();
  
        const team1Runs = team1.find('.match-block__score').text().trim();
        const team2Runs = team2.find('.match-block__score').text().trim();
  
        const runsAndOutt1 = separateRunsAndWickets(team1Runs);
        const runsAndOutt2 = separateRunsAndWickets(team2Runs);
        const venueInfo = extractVenueInfo($(element).find('.match-block__summary').text());

        const matchInfo = {
          matchNumber: index + 1,
          matchtype : matchtype,
          date : date,
          endResult : endResult,
          teams: [
            { name: team1Name, runs: runsAndOutt1.runs, wickets: runsAndOutt1.wickets},
            { name: team2Name, runs: runsAndOutt2.runs, wickets: runsAndOutt2.wickets },
          ],
          venueInfo : venueInfo
        };
        matches.push(matchInfo);
      });
  
      return res.json(matches);
    } else {
      console.error('Failed to retrieve the web page.');
    }
  }).catch((error) => {
    console.error('Error:', error);
  });
}
  
function separateRunsAndWickets(runsString) {
  const matches = runsString.match(/(\d+)\/(\d+)/);
  if (matches && matches.length === 3) {
    const runs = parseInt(matches[1], 10);
    const wickets = parseInt(matches[2], 10);
    return {
      runs,
      wickets,
    };
  } else {
    return {
      runs: runsString,
      wickets: 0,
    };
  }
}
function extractVenueInfo(venueString) {
  const parts = venueString.split('|');
  if (parts.length > 1) {
    return parts[1].trim();
  } else {
    return venueString.trim();
  }
}
function extractDate(timeString) {
  const regex = /(\w+ \d+ \w+), (\d+:\d+)/;
  const match = regex.exec(timeString);
  
  if (match) {
    const date = match[1];
    const time = match[2];
    return {
      date, time
    }
  } else {
    console.log("Unable to extract date and time.");
  }
}
  
module.exports.liveresult_t20i = liveresult_t20i