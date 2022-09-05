


function inittt(){
    let posY;
    let winH = $(window).height();
    let scrollTop;

    $(window).on('scroll',function(){
        scrollTop = $(window).scrollTop();

        $('.scroll').each(function(i){

            posY = $('.scroll').eq(i).offset().top;

            if(posY - winH < scrollTop){
                $('.scroll').eq(i).addClass('active');
            }
        });
    });
    $(window).trigger('scroll');
    //  trigger 강제로 이벤트를 시키는 명령어 

    
}
inittt()



// $(document).mouseup(function (e){
// 	if($(".background").has(e.target).length === 0){
// 		$(".background").hide();
// 	}
// });





$.ajax({
    url:"./js/data.json",
    success:function(data){
        let listTags='', slideTags='';
        $.each(data.items,function(k,v){
            listTags += `<li><a href="#"><p>0${k+1}.</p>${v.tittle}</a></li>`;
            slideTags += `<div class="swiper-slide">
                            <figure><img src="${v.imgurl}"></figure>
                                <div class="add">
                                    <button type="button"class="site_view"><a href="${v.siteview}" target="_blank">Site View</a></button>
                                    <button type="button" class="show"class="process_view" data-code="${k}"><a href="#">Process View</a></button>
                                                                                            
                                        <ul>
                                            <li>
                                                <p class="text_01">Project</p>
                                                <p class="text_02">"${v.Project}"</p>
                                            </li>
                                            <li>
                                                <p class="text_01">Date</p>
                                                <p class="text_02">"${v.Date}"</p>
                                            </li>
                                            <li>
                                                <p class="text_01">Paticipation</p>
                                                <p class="text_02">"${v.Role}"</p>
                                            </li>
                                        </ul>
                                </div>
                        </div>`;
        })
        $('.link').html(listTags);
        $('.swiper-wrapper').html(slideTags);
        $('.link li:first').addClass('active');

        workFn(data.items);

    }
})



function workFn(v){
    var swiper = new Swiper(".mySwiper", {
        direction: "vertical",

        mousewheel: true,
        pagination: {
        el: ".swiper-pagination_right",
        },
        on:{
            slideChange:function(e){
                let idx = e.realIndex;
                $('.swiper-pagination li').removeClass('active').eq(idx).addClass('active');
            }
        }
        
        
    });
    

    $('.swiper-pagination li').on('click',pageMove);
    
    let slideText = [
        {t:'Website <br>Profect', c:'#337885',d:'#99D2DD'},
        {t:'Website <br>Portfolio', c:'#5B5B5B',d:'#848493'},
        {t:'Website <br>Renewal', c:'#FEBD3D',d:'#FC8300'},
        {t:'Mobil App <br>Portfolio', c:'#D9D9D9',d:'#AEAEAE'}    
    ]
    // 폰트 #99D2DD #848493 #FC8300 #AEAEAE
    // 배경 #337885 #5B5B5B #FEBD3D #D9D9D9
    function pageMove(){
        event.preventDefault();
        let idx = $(this).index();
        
        $('.swiper-pagination li').removeClass('active').eq(idx).addClass('active');
        $('.swiper-pagination strong').html(slideText[idx].t);
        $('.swiper-pagination strong').css({color:slideText[idx].d});
        $('.swiper-pagination').css({backgroundColor:slideText[idx].c}); 
    
        swiper.slideTo(idx);
    
        
    }
    

    //  팝업창 열리는 곳 / 제일 하단에 넣기
    function show (n) {
        $('.background').css('display','block');
        //  167 번 명령에서 display none  - esc 버튼 누르고 나서 다시 show( block ) 을 넣어줘야지 다시 클릭해서 팝업창이 나올 수 있음
        event.preventDefault();
        document.querySelector(".background").className = "background show";


        popupTags = `<div class="background_process" style="background:${v[n].color}">
                        <div class="process">
                            <div class="left">
                                <h2 style="color:${v[n].textcolor}">${v[n].tittle} </h2>
                                <p class="h3">Project</p>
                                <p class="h4" style="color:${v[n].h4}">"${v[n].Project}"</p>
                                <p class="h3">Role</p>
                                <p class="h4" style="color:${v[n].h4}">"${v[n].Role}"</p>
                                <p class="h3">Overview</p>
                                <p class="h4" style="color:${v[n].h4}">"${v[n].Overview}"</p>
                                <button type="button"class="site_view"><a href="${v[n].siteview}" target="_blank">Site View</a></button>
                            </div>

                            <div class="right">
                                <figure><img src="${v[n].imgurl }"></figure>
                            </div>

                        </div>


                    </div>
                    <figure><img src="${v[n].Processview}"></figure>
                    <button class="btn" id="close"><i class="fa-solid fa-xmark"></i></button>`;
        $('.popup').html(popupTags);
        $(".background").on("click", close);
    }
    function close (e) {
        // console.log(e.target.className == 'window')
        if(e.target.className == 'window' || e.target.classList.contains('fa-solid')){
            document.querySelector(".background").className = "background";
        }
    }
    
    // document.querySelector("#show").addEventListener("click", show);
    $('.show').on('click',function(){
        let code = $(this).data('code');
        show(code);
        
    });
    
    $(document).keydown(function(e){
        //keyCode 구 브라우저, which 현재 브라우저
        var code = e.keyCode || e.which;

        if (code == 27) { // 27은 ESC 키번호
            $('.background').hide();
        }
    });



}
