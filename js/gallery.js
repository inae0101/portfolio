//이미지등 모든 요소가 로드되면 
window.addEventListener("load", ()=>{
    const grid = new Isotope(".wrap", { //배치할 요소의 부모요소명 
        itemSelector : "article", //배치할 요소명 
        columnWidth: "article", //너비값 기준 요소나 클래스명 
        transitionDuration :"0.8s" //화면 재배치시 요소의 움직이는 속도 
    });


    //sort 버튼 변수에 저장 
    const btns = document.querySelectorAll(".inner .btnG li"); 
    
    for(let el of btns){
        //sort버튼 클릭했을 때 
        el.addEventListener("click", e=>{
            e.preventDefault(); 

            //클릭한 sort버튼읜 자식인 a의 href값 구해서 저장 
            const sort = e.currentTarget.querySelector("a").getAttribute("href"); 

            // sort값에 따라 필터링하고 재배치 
            grid.arrange({
                filter:sort
            });

            //모든 버튼을 비활성화 하고 
            for(let el of btns){
                el.classList.remove("on"); 
            }
            //현재 클릭한 버튼만 활성화 
            e.currentTarget.classList.add("on"); 

        })
}



})
