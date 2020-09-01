//메인 웹툰 다운로드 기능

const {getInfo,imgdownload,checkedDir} = require("../lib/core");
const {dir} = require("../config/config").dir;

async function main(){
    
    try{


        const check = await checkedDir(dir) //디렉토리가 존제하는지 검사하는 함수

        if(check){
            return; //만약에 check dir 함수를 실행하였는데 err 라면
            //기본 err 값은 true 
        }


        const info = await getInfo();
        await imgdownload(info)

        await console.log("다운로드완료");
        
    }
    
    catch(err){
        console.log("다운로드실패")
        console.log(err)
    }

    finally{
        console.log("프로그램 종료");

    }
}

module.exports = {
    main
}


