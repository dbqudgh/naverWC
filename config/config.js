const ID = "721948"

const mainUrl = `https://comic.naver.com/webtoon/list.nhn?titleId=${ID}`
const subjectUrl = `https://comic.naver.com/webtoon/detail.nhn?titleId=${ID}&no=1&weekday=`
const dir = "D:/웹툰"

let DOWNLOAD_SPEED = 5;




let options = { // user-Agent 우회하기
    
    uri: mainUrl,
    
    headers: {
        
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
        
        'Content-Type': 'application/x-www-form-urlencoded',
        
    },
    
    json:true 
    
};


module.exports = {
    ID,
    mainUrl,
    subjectUrl,
    dir,
    DOWNLOAD_SPEED,
    options

}