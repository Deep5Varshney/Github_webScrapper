let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getRepoPageHtml=require("../Github_webScrapper/repoPages");
const pdfkit = require("pdfkit");
request(url,cb);
function cb(err,response, html){
    if(err){
        console.log(err);
    }
    else{
      //  console.log(html);
      getTopicLinks(html);
    }
}
function getTopicLinks(html){
    let $ = cheerio.load(html);
    let linkElem =$(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<linkElem.length;i++){
        let href = $(linkElem[i]).attr("href");
        //console.log(href);
        let topic  = href.split("/").pop();
        let fullLink = `https://github.com/${href}`;
        getRepoPageHtml(fullLink, topic);
    }
}