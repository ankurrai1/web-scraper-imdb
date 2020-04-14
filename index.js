const request = require("request-promise")
const cherio = require("cheerio")
const fs = require(fs)
const json2csv = require("json2csv").Parser()


const movie = "https://www.imdb.com/title/tt0242519/?ref_=nv_sr_srsg_3"

(async ()=>{
    let imdb_data = []
    const response = request({
        uri: movie,
        headers:{
           "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,",
           "Accept-Encoding" : "gzip, deflate, br",
           "Accept-Language" : "en-US,en;q=0.5",
           "Host" : "www.imdb.com"
        },
        gzip : true
    })
})()