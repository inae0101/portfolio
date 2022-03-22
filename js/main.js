const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menuMo"); 

btnCall.onclick = function(e){
    e.preventDefault(); 

    btnCall.classList.toggle("on"); 
    menuMo.classList.toggle("on"); 

}

const btnOpen = document.querySelector("img"); 
const aside = document.querySelector("aside"); 
const _top = aside.querySelector(".top"); 
const _right = aside.querySelector(".right"); 
const _bottom = aside.querySelector(".bottom"); 
const _left = aside.querySelector(".left");

btnOpen.addEventListener("click",e=>{
    e.preventDefault(); 

    aside.style.display = "block";

    new Anime(_top,{
        prop:"width", 
        value: "100%", 
        duration: 800, 
        callback :()=>{
            new Anime(_right,{
                prop: "height", 
                value :"100%", 
                duration: 800, 
                callback :()=>{
                    new Anime(_bottom,{
                        prop:"width", 
                        value:"100%", 
                        duration:800, 
                        callback:()=>{
                            new Anime(_left, {
                                prop:"height", 
                                value:"100%", 
                                duration:800     
                            })
                        }
                    })
                }
            })
        }
    })
});