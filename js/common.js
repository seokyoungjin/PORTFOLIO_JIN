$('.header_blackground').load('inc.html .header_blackground');
$('.header_blackground').load('inc.html .header_blackground header',navi);

$('.cover_menu').load('inc.html .cover_menu');
$('.cover_menu').load('inc.html .cover_menu .menu');


function navi(){

    $('.cover_menu').hide();
    
    $('.menu_btn').on('click',function(){
        
        $('body').css({overflow:'hidden'})
        $('.cover_menu').show().addClass('active');
    
        $('.closed_btn').on('click',function(){        
            $('.cover_menu').removeClass('active');
            $('body').css({overflow:'auto'})
            setTimeout(function(){
                $('.cover_menu').hide()
            },500)
        });
    });
}
let scrollTop;
$(window).on('scroll',function(){
    
    let scrollTop = $(this).scrollTop();
    if(scrollTop > 20 ){
        $('.header_blackground').css('background-color','rgba(0,0,0,0.7)');
    }else{
        $('.header_blackground').css('background-color','');
    }

});