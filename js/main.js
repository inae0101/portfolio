const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menuMo"); 

btnCall.onclick = function(e){
    e.preventDefault(); 

    btnCall.classList.toggle("on"); 
    menuMo.classList.toggle("on"); 

}


const popup = document.querySelector("#popup"); 
const btnClose = document.querySelector(".close"); 
const isCookie = document.cookie.indexOf("today=done"); 
let isOn; 

(isCookie == -1) ? isOn = "block" : isOn = "none"; 
popup.style.display = isOn; 


btnClose.addEventListener("click", e=>{
    e.preventDefault();    
 
    let isChecked = popup.querySelector("input[type=checkbox]").checked; 
    if(isChecked) setCookie("today", "done", 1); 

    popup.style.display = "none";
})
 
 
//쿠키 생성 함수 
function setCookie(name, val, due){
    const today = new Date(); 
    const day = today.getDate(); 
    today.setDate(day + due); 
    const duedate = today.toGMTString();  
    document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
}

const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("#scrollB li");
const lis_arr = Array.from(lis);
let posArr = [];
let enableClick = true;
let base = -300;

for(let section of sections){
    posArr.push(section.offsetTop); 
}

window.addEventListener("scroll", e=>{
    //현재 스크롤한 값을 변수에 담아서 
    let scroll = window.scrollY||window.pageYOffset; 

    sections.forEach((el,index)=>{
        //scroll값이 해당섹션의 값보다 크거나 같을 경우 
        //해당 순번의 li, section만 활성화
        //base - posArr값에서 base값만큼 더해서 section이 브라우저 끝에 닿지 않아도 활성화되도록 처리 
        if(scroll>= posArr[index] +base){
            for(let i=0; i<sections.length; i++){
                lis[i].classList.remove("on"); 
                sections[i].classList.remove("on"); 
            } 
            lis[index].classList.add("on"); 
            sections[index].classList.add("on"); 

        }
    })
})

//ul li 버튼 클릭시 해당 섹션위치값으로 스크롤 이동 
lis.forEach((li, index)=>{
    li.addEventListener("click", e=>{         
        new Anime(window,{
            prop:"scroll", 
            value:posArr[index],
            duration:500
        })
    })
}); 