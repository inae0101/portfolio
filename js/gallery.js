const frame = document.querySelector("main"); 
const base = "https://www.flickr.com/services/rest/?";
const method_interest = "flickr.interestingness.getList";
const key = "1765faf0803ccd7b809bb3f4eb7b63dd";
const per_page = 50; 
const url = `${base}method=${method_interest}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

callData(url);



frame.addEventListener("click", e=>{
    let pop = frame.querySelector(".pop"); 

    //팝업이 있을 경우에만 코드 실행 
    if(pop){
        let close = pop.querySelector(".close"); 
        //close버튼을 클릭했을 때만 코드 실행 
        if(e.target == close){
            pop.remove(); 
            frame.style.overflow = "auto"; 
        }
    }
    
})

function callData(url){

    frame.classList.remove("on"); 
    // loading.classList.remove("off"); 

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
        frame.append(pop);
        //팝업생성시 스크롤 없애기  
        frame.style.overflow = "hidden"; 
    }   
});

function imgLoaded(){     
    const thumbs = document.querySelectorAll(".pic img"); 
    const len = thumbs.length; 
    let count = 0; 

    thumbs.forEach(thumb =>{
    
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
    
    
}

