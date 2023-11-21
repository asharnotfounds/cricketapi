const { match } = require('assert');
      axios = require('axios');
      cheerio = require('cheerio');

function getAllFixtures(url, res) {
  axios.get(url).then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const matches = [];
      $('.match-block').each((index, element) => {
        const matchtype = $(element).find('.match-block__type').text();
        const dataAndTime = $(element).find('.match-block__date--local').text();
        const {date, time} = extractDate(dataAndTime)
            // 
        const team1 = $(element).find('.match-block__teams-inner .match-block__team').eq(0).text();
        const team2 = $(element).find('.match-block__teams-inner .match-block__team').eq(1).text();

        const venueInfo = extractVenueInfo($(element).find('.match-block__summary').text());

        const matchInfo = {
          matchNumber: index + 1,
          matchtype : matchtype,
          time : time,
          date : date,
          teams: [
            { name: team1.trim()},
            { name: team2.trim()},
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

function extractVenueInfo(venueString) {
  const parts = venueString.split('|');
  if (parts.length > 1) {
    return parts[1].trim();
  } else {
    return venueString.trim();
  }
}

  
module.exports.getAllFixtures = getAllFixtures