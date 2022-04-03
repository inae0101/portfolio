const body = document.querySelector("body"); 
const frame = document.querySelector("main");   
const base = "https://www.flickr.com/services/rest/?"; 
const key = "1765faf0803ccd7b809bb3f4eb7b63dd";
const per_page = 12; 
const method_favorite = "flickr.favorites.getList"; 
const url_favorite = `${base}method=${method_favorite}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`;
/*
//userid가 올린 이미지 찾기 
const method_people = "flickr.people.getPhotos"; 
const username = "187597869@N08";

const url_people = `${base}method=${method_people}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`; 

userid가 좋아요 사진 찾기 
const method_favorite = "flickr.favorites.getList"; 
const url_favorite = `${base}method=${method_favorite}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`; 


//갤러리 사진 찾기 
const method_gallery = "flickr.galleries.getPhotos"; 
const gallery = "72157720542661824";
const url_gallery = `${base}method=${method_gallery}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}&gallery_id=${gallery}`; 
*/



//페이지로딩시 interstingness메소드 url 호출 
callData(url); 



//썸네일 클릭시 팝업생성 이벤트 연결 
frame.addEventListener("click", e=>{
    e.preventDefault(); 

    let target = e.target.closest(".item").querySelector(".pic img"); 

    //썸네일을 클릭했을 때만 코드실행 
    if(e.target === target){
        //클릭한 썸네일의 부모 a에서 href속성 구하기 
        let imgSrc = e.target.parentElement.getAttribute("href"); 

        let pop = document.createElement("aside"); 
        pop.classList.add("pop"); 
        let pops = `
                    <div class="con">
                        <img src="${imgSrc}">
                    </div>
                    <span class="close">close</span>
        `; 
        pop.innerHTML = pops; 
        body.append(pop);
        //팝업생성시 스크롤 없애기  
        body.style.overflow = "hidden"; 
    }   
});

body.addEventListener("click", e=>{
    let pop = body.querySelector(".pop"); 

    //팝업이 있을 경우에만 코드 실행 
    if(pop){
        let close = pop.querySelector(".close"); 
        //close버튼을 클릭했을 때만 코드 실행 
        if(e.target == close){
            pop.remove(); 
            body.style.overflow = "auto"; 
        }
    }
    
})

function callData(url){

    frame.classList.remove("on");  

    fetch(url)
    .then(data=>{   
        return data.json();    
    })
    .then(json=>{
        const items = json.photos.photo; 
        console.log(items); 
        createList(items);
        imgLoaded(); 
    })
}

function createList(items){
    let htmls =""; 
   // console.log(items); 
    items.forEach(data=>{
        htmls +=`
                <article class="item">
                    <div>
                        <a class="pic" href="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg">
                            <img src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg">
                        </a>

                        <p>${data.title}</p>
                        <div class="profile">
                            <img src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                            <span>${data.owner}</span>
                        </div>
                    </div>
                </article>
        `; 
    })

    frame.innerHTML = htmls;     
}

function imgLoaded(){     
    const thumbs = document.querySelectorAll(".pic img"); 
    const len = thumbs.length; 
    let count = 0; 

    thumbs.forEach(thumb =>{
        //썸네일 엑박일 경우 대체이미지 처리 
        thumb.onerror = ()=>{
            thumb.setAttribute("src", "img/k1.jpg");
        }
        //이미지 모두 로딩완료후 isotope적용 
        thumb.onload =()=>{
            count++; 
            if(count === len){
                new Isotope(frame,{
                    itemSelector :".item", 
                    columnWidth : ".item", 
                    transitionDuration :"0.8s"
                })

                //모든 이미지 로딩 끝나고 isotope적용시
                //frame과 loading에 모션 처리 
                frame.classList.add("on");  
            }
        }
    });
    
    //버디아이콘 엑박시 대체이미지 변경 
    const buddies = document.querySelectorAll(".profile img"); 
    buddies.forEach(buddy=>{
        buddy.onerror=()=>{
            buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif"); 
        }
    })
}