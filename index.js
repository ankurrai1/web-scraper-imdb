const request = require("request-promise")
const cherio = require("cheerio")
const fs = require("fs")
const json2csv = require("json2csv").Parser

// these are the movies link to find out data about 
// these links are added only for educational purpose there is no industrial use of this scraper with this link
const movies = ["https://www.imdb.com/title/tt0242519/?ref_=nv_sr_srsg_3",
"https://www.imdb.com/title/tt0111161/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=1HNTW8EF4JKV9JVPBBCV&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_1",
"https://www.imdb.com/title/tt0068646/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=1HNTW8EF4JKV9JVPBBCV&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_2",
"https://www.imdb.com/title/tt0468569/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=5K21YKXBKKKES99KX67W&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_4",
"https://www.imdb.com/title/tt0050083/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=5K21YKXBKKKES99KX67W&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_5",
"https://www.imdb.com/title/tt0108052/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=5K21YKXBKKKES99KX67W&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_6",];

// a asynchronous function which is called imidiatly after define
(async ()=>{
    let imdb_data = []
    for(let movie of movies){
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
        
        // following are selectors to get data form page link
        // in the following code > denotes the child element and trim is used to remove extra leading spaces
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
    }
    const j2cv = new json2csv()
    const csv = j2cv.parse(imdb_data)

    // write to file name it will create file if it does not exist
    // this is not ment to be append data it will overwrite file data
    // ./imdb.csv is file name can change later
    fs.writeFileSync('./imdb.csv',csv,'utf-8')

}
)()
// the above fuction is like lembda function it is called as soon as it is defined
