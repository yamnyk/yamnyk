    $(document).ready(function () {
        masonryHiddenPhoto();
        masonry();
        butonClick(photoList());
        masonryButton();
        navbarScroll();
        imazinNavbarClick();

////////////////TABS//////////////
$(".services-tab-item").not(":first").hide();
$(".services-tab-link").click(function() {
    $(".services-tab-link").removeClass("services-tab-active").eq($(this).index()).addClass("services-tab-active");
    $(".services-tab-item").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("services-tab-active");

$('ham-button').click(function (event) {
    $('')
});
///////////MODAL/////////////////
$(".btn-mdl").click(function(e){
    $('.modal').addClass('modal-win');
    $(".modal-overlay").addClass('overlay-open');
});
$(".modal-overlay").click(function(e){
    // console.log($(e.target).hasClass('overlay'));
    $('.modal').removeClass('modal-win');
    $(".modal-overlay").removeClass('overlay-open');
});
$(".form-button").click(function(e){
    // console.log($(e.target).hasClass('overlay'));
    $('.modal').removeClass('modal-win');
    $(".modal-overlay").removeClass('overlay-open');
});
$(".networks-button").click(function(e){
    // console.log($(e.target).hasClass('overlay'));
    $('.modal').removeClass('modal-win');
    $(".modal-overlay").removeClass('overlay-open');
});
/////////slider/////////////////
        $(".review-main-item").not(":first").hide();
        $('.navlist-img').click(function () {
            let currentIndex = $('.navlist-img-active').index();
            $(".review-main-item").eq(currentIndex).hide();
            $('.navlist-img-active').removeClass('navlist-img-active');
            $(this).addClass('navlist-img-active');
            $(".review-main-item").eq($(this).index()).fadeIn()
        });

        $('#prev').click(function () {
            let currentIndex = $('.navlist-img-active').index();
            $(".review-main-item").eq(currentIndex).hide();
            $('.navlist-img-active').removeClass('navlist-img-active');
            $('.navlist-img').eq(currentIndex-1).addClass('navlist-img-active');
            $(".review-main-item").eq(currentIndex-1).fadeIn();
        });

        $('#next').click(function () {
            let currentIndex = $('.navlist-img-active').index();

            $(".review-main-item").eq(currentIndex).hide();
            currentIndex = currentIndex === $('.navlist-img').length-1 ? -1 : $('.navlist-img-active').index();
            $('.navlist-img-active').removeClass('navlist-img-active');
            $('.navlist-img').eq(currentIndex+1).addClass('navlist-img-active');
            $(".review-main-item").eq(currentIndex+1).fadeIn();
        });
    /////////Imazing menu click/////////////////
    function imazinNavbarClick() {
        $('.portfolio_filter').click(function () {
            showPhoto();
            let itemList;
            switch ($(this).attr('id')) {
                case 'graphic':
                    hidePhoto('graphic-foto')
                    itemList = $('.graphic-foto')
                    break;
                case 'web':
                    hidePhoto('web-foto')
                    itemList = $('.web-foto')
                    break;
                case 'landing':
                    hidePhoto('landing-foto')
                    itemList = $('.landing-foto')
                    break;
                case 'wordpress':
                hidePhoto('wordpress-foto')
                itemList = $('.wordpress-foto')
                break;
                default:
                showPhoto();
                itemList = $('.portfolio_gallery img')
                break;
            }
            removeActiveClass();
            $(this).addClass('portfolio_active');
            count = 0;
            $('.portfolio_category_title').text($(this).text())
            $('.portfolio_gallery').css({'height': `${height}`});
            $('#portfolio_load_batton').css('display', 'inline-block')
        })
    }

    /////////Button for best photo block/////////////////

    function butonClick() {

        $('#portfolio_load_batton').click(function () {
            loadAnimation('#imazing-photo-button');
            setTimeout(function () {
                stopAnimation('#imazing-photo-button');
                if (coutOfPhotos() >= 24 + count*12) {
                    $('.portfolio_gallery').css({'height': `${height + height*(count+1)}`});
                } else {
                    $('.portfolio_gallery').css({'height': `auto`});
                }
                count++;
                if (count == 2) {
                    $('#portfolio_load_batton').css('display', 'none')
                }
            }, 2000)
        })
    }

    /////////Scroll/////////////////

    function navbarScroll() {
        $('.navbar_item_link').click(function (e) {
            e.preventDefault();
            let id = $(this).attr('href');
            let pos = $(id).offset().top;
            $('html, body').animate({scrollTop: pos}, 1500)
        })
    }

    /////////Masonry/////////////////
    function masonry() {
    $('.best_images_gallery').imagesLoaded(function () {
        $('.best_images_gallery').masonry({
            itemSelector: '.best-photo',
            columnWidth: 370,
            gutter: 10,
            fitWidth: true,
        });
    })
    }

    function masonryHiddenPhoto() {
        let selector = $('.best_images_gallery .best-photo');

        for (let i = 9; i < selector.length; i++) {
            $(selector[i]).addClass('hidden-photo');
        }
    }

    function masonryShowPhoto() {
        let selector = $('.best_images_gallery .best-photo');
        for (let i = 0; i < selector.length; i++) {
            $(selector[i]).removeClass('hidden-photo')
        }
    }

    function masonryButton() {
        $('#best-images-button').click(function () {
            loadAnimation('#best-images-button');
            setTimeout(function () {
                stopAnimation('#best-images-button');
                masonryShowPhoto();
                masonry();
                $('.best_images_gallery').css({'margin-bottom': '100px'})
                $('#best-images-button').hide()
            }, 2000)
        })
    }

    /////////Animation/////////////////
    function loadAnimation(button) {
        $('.anime-container').css('display', 'block');
        $(button).css('opacity', '100%');
    }

    function stopAnimation(button) {
        $('.anime-container').css('display', 'none');
        $(button).css('display', 'inline-block');
    }

    /////////Helped Functions/////////////////

    function removeActiveClass() {
        let selectors = $('.portfolio_filter');
        for (let i = 0; i < selectors.length; i++ ) {
            $(selectors[i]).removeClass('portfolio_active')
        }
    }

    let count = 0;
    let height = $('.portfolio_gallery').height();

    function photoList() {
        return $('.portfolio_gallery img');
    }

    function coutOfPhotos() {
        let quantity = 0;
        for (let i = 0; i < photoList().length; i++) {
            if ($(photoList()[i]).css('display') != 'none') {
                quantity++;
            }
        }

        return quantity;
    }

    function hidePhoto(name) {
        for (let i = 0; i < photoList().length; i++) {
            if ($(photoList()[i]).attr('class') != name) {
                $(photoList()[i]).css('display', 'none')
            }
        }
    }

    function showPhoto() {
        for (let i = 0; i < photoList().length; i++) {
            $(photoList()[i]).css('display', 'block')
        }
    }

})