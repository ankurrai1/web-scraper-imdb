const request = require("request-promise")
const cherio = require("cheerio")
const fs = require("fs")
const json2csv = require("json2csv").Parser;


const movie = "https://www.imdb.com/title/tt0242519/?ref_=nv_sr_srsg_3";

(async ()=>{
    let imdb_data = []
    const response = await request({
        uri: movie,
        headers:{
           "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,",
           "Accept-Encoding" : "gzip, deflate, br",
           "Accept-Language" : "en-US,en;q=0.5",
           "Host" : "www.imdb.com"
        },
        gzip : true
    })
    let $ = cherio.load(response)
    let title = $('div[class="title_wrapper"] > ').text().trim()
    let rating = $('div[class="ratingValue"] > strong > span').text()
    let summary = $('div[class="summary_text"] > ').text().trim()
    let releaseDate = $('div[class="title_wrapper"] > ').text().trim()

    imdb_data.push({
        title,
        rating,
        summary,
        releaseDate
    })

    const j2cv = new json2csv()
    const csv = j2cv.parse(imdb_data)

    fs.writeFileSync('./imdb.csv',csv,'utf-8')

}
)()