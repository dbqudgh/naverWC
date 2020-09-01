const request = require('request')
const cheerio = require('cheerio')
const filenamify =require('filenamify')
const fs = require('fs')
const {down} = require('../lib/down')

const {ID,
    mainUrl,
    subjectUrl,
    dir,
    DOWNLOAD_SPEED,
    options} = require("../config/config");




    function createFolder(directory,name){//저장할곳, 이름



        const dir = directory+'/'+filenamify(name); // 이름을 알맞게 변환해줍시다
    
    
    
        if(!fs.existsSync(dir)){//폴더가 없다면 생성합니다.
    
            fs.mkdirSync(dir) //디렉토리를 생성합니다
    
        }
    
    }
    
    



function delay(item) { return new Promise(resolve => setTimeout(() => { console.log(item); resolve(); }, DOWNLOAD_SPEED*300) ); }


//imgs download function
async function imgdownload(info){
    
    const title = info.title
    const subject = info.subject

    createFolder(dir,title)
    
    for(let i = 0; i < subject; i++){
        
        await createFolder(dir+'/'+title,title+`${i+1}`)

            const src = await getSrc(subjectUrl+`${i+1}`)

            for(let h = 0; h < src.length; h++){
        
                down(dir+'/'+title+'/'+title+`${i+1}`,src[h],title,h,subjectUrl+`${i+1}`,2)
            
            }
        
            
           await delay()
    }


    
    //{dir,url,name,i,src}
}


//get img src List function

function getSrc(url){

    options.uri = url

    let  imgSrc  = []

    
    return new Promise(resolve=>{


        request(options,(err,response,body)=>{


            if(err) console.log(err)

            const $ = cheerio.load(body)
    
    
            const $imgs = $('.wt_viewer > img')

            $imgs.each(function(){
                imgSrc.push($(this).attr('src'))
            })

            resolve(imgSrc)

            
        })


    }).then(function(result){
        return imgSrc
    })

}

// subject get funtion

function getInfo(){

    let info = {}

    return new Promise(resolve=>{

        request(options,(err,response,body)=>{

            if(err) console.log(err)

            const $ = cheerio.load(body)

            let title = $('.detail > h2').first().text().trim()//제목 추출
            const actor = $('.wrt_nm').text().trim() //작가정보를 받아서 제목을 얻어오기위한
            title = title.split(actor)[0].trim() //제목을 가저옴
            //tilte 제목 링크에 게수를 구하여 length 를 넣어줌
            const $a = $(".title > a").attr('href').split("no=")[1].replace(/[^0-9]/g,"")
            
            console.log($a)

            info = {
                title:title,
                subject:parseInt($a)
            }

            
        resolve(info)

        })

    }).then(function(result){
        return info
    })

}


function checkedDir(dir){

    if(!fs.existsSync(dir)){//폴더가 없다면 콜백으로 err를 넣어줍니다
        const err = true
        return err;
    }

}

module.exports = {
    getInfo,
    imgdownload,
    checkedDir
}



