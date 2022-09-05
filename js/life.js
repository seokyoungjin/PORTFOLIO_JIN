function initt(){
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
initt()