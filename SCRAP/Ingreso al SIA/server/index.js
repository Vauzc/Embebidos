const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

const scrapers = require('./scrapers');


app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.post('/creators', async (req, res) => {
    const channelData = await scrapers.scrapeChannel(req.body.user, req.body.pass)
    const creators =await [channelData.Nom, channelData.Fac,channelData.Car,channelData.PA,channelData.Av,channelData.Cit,channelData.Hor]
    console.log(creators)
    process.kill(process.pid, 'SIGTERM')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))