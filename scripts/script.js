$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    //Меню
    $('#burger').click(function () {
        $('#menu').addClass('show');
    });

    $('.hide-menu').click(function () {
        $('#menu').removeClass('show');
    });

    $('a.link').click(function () {
        $('#menu').removeClass('show');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top + 'px'
        }, {
            duration: 1000,
            easing: 'swing'
        });
        return false;
    });

    //pop-up-image
    $('.image-link').magnificPopup({type: 'image'});


    //product-more-active
    $('.product-more span').click(function () {
        let product = $('.product-active');
        let more = $('.product-more');
        let moreSpan = $('.product-more span');

        if (!more.hasClass("more-active")) {
            product.css('display', 'flex');
            moreSpan.text("Скрыть");
            moreSpan.addClass("arrowSpan");
            more.addClass("more-active");
        } else {
            product.css('display', 'none');
            moreSpan.text("Показать еще 3 проекта");
            moreSpan.removeClass("arrowSpan");
            more.removeClass("more-active");
        }

    })

    //Слайдер
    $('.slider-main').slick({
        centerMode: true,
        variableWidth: true,
        focusOnSelect: true,
        infinite: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1126,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: false,
                    variableWidth: false,
                    arrows: false
                }
            },
            {
                breakpoint: 978,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false,
                    arrows: false
                }
            },
        ]
    });

    //Форма
    let name = $('.name');
    let phone = $('.phone');
    let loader = $('.loader');

    name[0].onkeypress = function () {
        let result = parseInt(event.key);
        if (!isNaN(result)) {
            event.preventDefault();
        }
    };

    name[1].onkeypress = function () {
        let result = parseInt(event.key);
        if (!isNaN(result)) {
            event.preventDefault();
        }
    };

    phone[0].onkeypress = function () {
        let result = parseInt(event.key);
        if (isNaN(result)) {
            event.preventDefault();
        }
    }

    phone[1].onkeypress = function () {
        let result = parseInt(event.key);
        if (isNaN(result)) {
            event.preventDefault();
        }
    }
    phone.mask("+380 (99) 99-99-999");


    //Валидация
    $('.button-valid').click(function () {

        //Поиск элементов по событию клика
        let element = $(this);

        let formID = element.closest('.form');
        let elementInputResult = element.siblings('.input-form-block');
        let checkboxResult = element.siblings('.form-checkbox');
        let checkbox = checkboxResult.children('.checkbox');
        let name = elementInputResult.children('.name');
        let phone = elementInputResult.children('.phone');

        // Сброс стилей на стандартные значения
        elementInputResult.children('.input-err').hide();
        elementInputResult.children('.name').css('borderColor', 'white');
        elementInputResult.children('.phone').css('borderColor', 'white');
        checkbox.removeClass('noChecked');

        let err = false;

        //Проверка полей
        if (!name.val()) {
            err = true;
            name.next().show();
            name.css('borderColor', 'red');
        }

        if (phone.val().length < 19) {
            err = true;
            phone.next().show();
            phone.css('borderColor', 'red');
        }

        if (!checkbox.prop('checked')) {
            err = true;
            checkbox.addClass('noChecked');
        }

        if (!err) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    console.log(msg)
                    loader.css('display', 'none');
                    if (msg.success === 1) {
                        if (formID.hasClass('form-consultation')) {
                            $('.form-consultation').hide();
                            $('.form-success-order').css('display', 'flex');
                        } else if (formID.hasClass('form-excursion')) {
                            element.parent('.form-content').hide();
                            $('.form-success-excursion').css('display', 'flex');
                        }
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам по номеру телефона +380 (96) 73-67-281");
                    }
                });
        }
    })

    // pop-up-form
    let excursionBlock = $('.form-excursion-container');
    let excursionClose = $('.pop-up-close');

    $('.button-excursion').click(function () {
        excursionBlock.css('display', 'flex');
    })

    $(excursionBlock || excursionClose).click((e) => {
        if (e.target.id === 'form-excursion-container' || e.target.id === 'pop-up-close') {
            excursionBlock.hide();
        }
    })

    //Блок с технологиями

    if ($(window).width() <= 1250) {
        $('.technology-figure1').addClass('active');
    }

    $('.figure').click(function () {

        if ($(window).width() <= 1250) {
            let technologyText = $('.technology-advantage');
            let clickElement = $(this);
            let figure = $('.figure');

            technologyText.removeClass('active');
            figure.removeClass('active');

            if (clickElement.hasClass('technology-figure1')) {
                technologyText.eq(0).addClass('active');
                clickElement.addClass('active');
            }

            if (clickElement.hasClass('technology-figure2')) {
                technologyText.eq(1).addClass('active');
                clickElement.addClass('active');
            }

            if (clickElement.hasClass('technology-figure3')) {
                technologyText.eq(2).addClass('active');
                clickElement.addClass('active');
            }

            if (clickElement.hasClass('technology-figure4')) {
                technologyText.eq(3).addClass('active');
                clickElement.addClass('active');
            }

            if (clickElement.hasClass('technology-figure5')) {
                technologyText.eq(4).addClass('active');
                clickElement.addClass('active');
            }
        }
    })
});