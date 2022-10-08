$(function(){

    $('.shop-content__filter-btn').on('click', function () {
        $('.shop-content__filter-btn').removeClass('.shop-content__filter-btn--active');
        $(this).addClass('shop-content__filter-btn--active');
    });
    $('.button-list').on('click', function(){
        $('.product-item').addClass('product-item--list');
        $('.shop-content__inner').addClass('shop-content__nogrid');
    });
    $('.button-grid').on('click', function(){
        $('.product-item').removeClass('product-item--list');
        $('.shop-content__inner').removeClass('shop-content__nogrid');
    });

    $('.shop__filter-btn').on('click', function(){
        $('.shop__filters').slideToggle();
    });
    

    $('.menu__btn').on('click', function(){
        $('.menu__list').toggleClass('menu__list--active');
    });

    $('.footer__top-title').on('click', function(){
        $(this).next().slideToggle();
        $(this).toggleClass('active');
    });

    $('.product-tabs__top-item').on('click', function(e){
        e.preventDefault();
        $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
        $(this).addClass('product-tabs__top-item--active');

        $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
        $($(this).attr('href')).addClass('product-tabs__content-item--active');
    });

    $('.blog-page__slider').slick({
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="7px" height="14px" viewBox="0 0 7 14" version="1.1"><g><path d="M 5.25 12.25 C 5.027344 12.25 4.800781 12.164062 4.632812 11.992188 L 0.257812 7.617188 C -0.0859375 7.277344 -0.0859375 6.722656 0.257812 6.382812 L 4.632812 2.007812 C 4.972656 1.664062 5.527344 1.664062 5.867188 2.007812 C 6.210938 2.347656 6.210938 2.902344 5.867188 3.242188 L 2.113281 7 L 5.871094 10.757812 C 6.210938 11.097656 6.210938 11.652344 5.871094 11.996094 C 5.699219 12.164062 5.472656 12.25 5.25 12.25 Z M 5.25 12.25 "/></g></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="7px" height="14px" viewBox="0 0 7 14" version="1.1"><g><path d="M 1.75 12.25 C 1.527344 12.25 1.300781 12.164062 1.132812 11.992188 C 0.789062 11.652344 0.789062 11.097656 1.132812 10.757812 L 4.890625 7 L 1.132812 3.242188 C 0.789062 2.902344 0.789062 2.347656 1.132812 2.003906 C 1.472656 1.664062 2.027344 1.664062 2.367188 2.003906 L 6.742188 6.378906 C 7.085938 6.722656 7.085938 7.277344 6.742188 7.617188 L 2.367188 11.992188 C 2.199219 12.164062 1.972656 12.25 1.75 12.25 Z M 1.75 12.25 "/></g></svg></button>',
        infinite: false,
    });

    

    $('.select-style, .product-one__num').styler();

    $('.filter-price__input').ionRangeSlider({
        type: "double",
        prefix: "$",
        onStart: function (data){
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
        },
        onChange: function (data) {
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
        },
    });

    $('.product-slide__thumb').slick({
        asNavFor: '.product-slide__big',
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        draggable: false
    });

    $('.product-slide__big').slick({
        asNavFor: '.product-slide__thumb',
        draggable: false,
        arrows: false, 
        fade: true
    });

    $('.top-slider__inner').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000
    });

    $(".stars").rateYo({
        starWidth: "17px",
        normalFill: "#ccccce",
        ratedFill: "#ffc35b",
        readOnly: true
    });

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor(total / (1000 * 60 * 60 * 24));
        const days = Math.floor(total / (1000 *60 *60 *24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function initializeClock(id, endtime) {
        const clock = document.querySelector('.promo__clock');
        const daysSpan = clock.querySelector('.promo__days');
        const hoursSpan = clock.querySelector('.promo__hours');
        const minutesSpan = clock.querySelector('.promo__minutes');
        const secondsSpan = clock.querySelector('.promo__seconds');

        function updateClock() {
            const t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
    }

    const deadline = $('.promo__clock').attr('data-time');
    initializeClock('promo__clock', deadline);

   


});



// let map;

// function initMap() {
//     map - new google.maps.Map (document.getElementById("map")
//     , {
//         center: { lat: -34.397, lng: 150.644},
//         zoom: 8,
//     });
// }