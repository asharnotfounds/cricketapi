
const bodyParser = require('body-parser');
      express = require(`express`);
      config = require(`./config.json`)
      cheerio = require('cheerio');
      axios = require('axios');
      app = module.exports = express()



app.use(express.json());
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/cricket/odi', require('./routes/odi'));
app.use('/cricket/t20', require('./routes/t20'));
app.use('/cricket/t20i', require('./routes/t20i'));

app.get('/', (req, res) => {
    res.render('index')
});
app.get('/cricket/all-fixtures', (req, res) => {
    const { getAllFixtures } = require(`./modules/cricket/all-fixtures`) 
    const url = config.links.all_fixtures
    getAllFixtures(url, res)
});


app.listen(3000)
console.log(`Started`)