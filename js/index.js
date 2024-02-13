//  비쥬얼 타이핑코드
(function(){
    const spanEl = document.querySelector("main h2 span");
    const txtArr = ['Web Publisher'];
    let index = 0;
    let currentTxt = txtArr[index].split("");
    function writeTxt(){
      spanEl.textContent  += currentTxt.shift(); 
      if(currentTxt.length !== 0){ 
        setTimeout(writeTxt, Math.floor(Math.random() * 100));
      }else{
        currentTxt = spanEl.textContent.split("");
        setTimeout(deleteTxt, 3000);
      }
    }
    function deleteTxt(){
      currentTxt.pop();
      spanEl.textContent = currentTxt.join("");
      if(currentTxt.length !== 0){
        setTimeout(deleteTxt, Math.floor(Math.random() * 100))
      }else{
        index = (index + 1) % txtArr.length;
        currentTxt = txtArr[index].split("");
        writeTxt();
      }
    }
    writeTxt();
})();

// 비쥬얼헤드에서 내려오면 헤더에 배경주기코드

$(function(){
  // 스크롤 시 header fade-in
  $(document).on('scroll', function(){
      if($(window).scrollTop() > 900){
          $("#navbar").removeClass("deactive");
          $("#navbar").addClass("active");
      }else{
          $("#navbar").removeClass("active");
          $("#navbar").addClass("deactive");
      }
  })

});

/* move.js */
/* 애니메이션 스크롤 이동 */
const animationMove = function(selector){
    // ① selector 매개변로 이동할 대상 요소 노드 가져오기
    const targetEl = document.querySelector(selector);
    // ② 현재 브라우저의 스크롤 정보(y 값)
    const browserScrollY = window.pageYOffset;
    // ③ 이동할 대상의 위치(y 값)
    const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
    // ④ 스크롤 이동
    window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
  };
  // 스크롤 이벤트 연결하기
  const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']"); 
  for(let i = 0; i < scollMoveEl.length; i++){
    scollMoveEl[i].addEventListener('click', function(e){
      const target = this.dataset.target;
      animationMove(target);
    });
  }




//   function update(n){
//     $('.navbar_menu li button').removeClass('active');
//     $(`.navbar_menu li button:eq(${n})`).addClass('active');
//   }
// project js
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
                                              <p class="text_01">PERIOD</p>
                                              <p class="text_02">"${v.Period}"</p>
                                          </li>
                                          <li>
                                              <p class="text_01">CONTRIBUTION</p>
                                              <p class="text_02">"${v.Language}"</p>
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
        {t:'Team <br>Profect', c:'#337885',d:'#99D2DD'},
        {t:'Project <br>Portfolio', c:'#5B5B5B',d:'#848493'},
        {t:'Project <br>Renewal', c:'#FEBD3D',d:'#FC8300'},
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
                                <p class="h4" style="color:${v[n].h4}">"${v[n].Contribution}"</p>
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
