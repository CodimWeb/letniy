import JQuery from 'jquery';
window.$ = window.JQuery = JQuery;

import {Util, Modal, Collapse, Tab } from 'bootstrap';
import slick from 'slick-carousel';
import select2 from 'select2';
import Inputmask from "inputmask";
const fancybox = require("@fancyapps/fancybox");
import noUiSlider from 'nouislider';


import '../scss/style.scss';
import * as data from  './map.json';

setTimeout(function() {
    document.body.classList.remove('transition-off');
}, 50);


$(document).ready(function() {

    $(document).on('click', '.btn', function(){
        $(this).blur()
    });

    var mainNumContainer = $('.main-slider .num-container');

    $('.main-slider .slick-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        mainNumContainer.text(i + '/' + slick.slideCount);
    });

    $('.main-slider .slick-slider').slick({
        dots: true,
        speed: 300,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.main-slider .slick-prev'),
        nextArrow: $('.main-slider .slick-next'),
        appendDots: $('.main-slider .dots-container')
    });

    $('.main-reason .slick-slider').slick({
        dots: false,
        speed: 300,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.main-reason .slick-prev'),
        nextArrow: $('.main-reason .slick-next'),
        variableWidth: true,
        centerMode: true,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                variableWidth: false,
                centerMode: false,
                dots: true,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: false,
                centerMode: false,
              }
            },
          ]
    });

    $('.select-md').select2({
        width: '100%',
        selectionCssClass: 'select-md',
    });

    $('.select-sm').select2({
        width: '100%',
        selectionCssClass: 'select-sm',
    });

    var phones = document.querySelectorAll('.phone-input')
    if (phones) {
        Inputmask({ "mask": "+7(999) 999-99-99" }).mask(phones);
    }

    $('.selection-next-step').on('click', function(){
        $('.selection-track').addClass('step-2')
    })
    $('.selection-card--step-2 .selection-step').on('click', function(){
        $('.selection-track').removeClass('step-2')
    })

    var hypothecNumContainer = $('.hypothec .num-container');

    $('.hypothec .slick-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        hypothecNumContainer.text(i + '/' + slick.slideCount);
    });

    $('.hypothec .slick-slider').slick({
        dots: false,
        speed: 300,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.hypothec .slick-prev'),
        nextArrow: $('.hypothec .slick-next'),
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
              }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
          ]
    });




    var saleSliders =  $('.main-sales .slick-slider');

    saleSliders.each(function(index, item) {

        $(item).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $(`.sales-num-container-${index + 1}`).text(i + '/' + slick.slideCount);
        });

        $(item).slick({
            dots: false,
            speed: 300,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $(`.sales-slider-arrows-${index + 1} .slick-prev`),
            nextArrow: $(`.sales-slider-arrows-${index + 1} .slick-next`),
            responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 1,
                    dots: true,
                  }
                },
              ]
        });
    })



    var galeries =  $('.main-gallery .slick-slider');

    galeries.each(function(index, item) {

        $(item).slick({
            dots: false,
            speed: 300,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: $(`.main-gallery-arrows-${index + 1} .slick-prev`),
            nextArrow: $(`.main-gallery-arrows-${index + 1} .slick-next`),
            variableWidth: true,
            centerMode: true,
            responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                    variableWidth: false,
                    centerMode: false,
                    dots: true,
                  }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: false,
                        centerMode: false,
                        dots: true,
                    }
                },
            ]
        });

        $().fancybox({
            selector : `.main-gallery-fancy-${index + 1}`,
            backFocus : false,
            loop: true,
            transitionEffect: 'slide',
            beforeShow: function (instance, current) {
                var viedoLink = current.$thumb.prevObject.attr('data-video');
                $('.main-gallery-fancy-play').remove();
            },
            afterShow : function( instance, current ) {
                var slickIndex = current.$thumb.prevObject.closest('.slick-slide').attr('data-slick-index');
                current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', slickIndex, true);
                var viedoLink = current.$thumb.prevObject.attr('data-video');
                if(viedoLink) {
                    $('.fancybox-content').append(`
                        <a href='${viedoLink}' class='main-gallery-fancy-play' _target='blank'>
                                <svg width="231" height="231" viewBox="0 0 231 231" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="115.5" cy="115.5" r="114.5" stroke="white" stroke-width="2"/>
                                <path d="M135.801 119.882L111.559 136.043C111.387 136.157 111.187 136.223 110.98 136.233C110.774 136.243 110.568 136.196 110.386 136.099C110.204 136.001 110.051 135.856 109.945 135.678C109.839 135.501 109.782 135.298 109.782 135.091V102.769C109.782 102.563 109.839 102.36 109.945 102.182C110.051 102.005 110.204 101.86 110.386 101.762C110.568 101.664 110.774 101.618 110.98 101.628C111.187 101.638 111.387 101.703 111.559 101.818L135.801 117.979C135.957 118.083 136.086 118.225 136.174 118.391C136.263 118.557 136.31 118.742 136.31 118.93C136.31 119.119 136.263 119.304 136.174 119.47C136.086 119.636 135.957 119.777 135.801 119.882Z" fill="white"/>
                            </svg>
                        <a>
                    `)
                }
            }
        });
    })

    var processNumContainer = $('.process .num-container');

    $('.process .slick-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        processNumContainer.text(i + '/' + slick.slideCount);
    });

    $('.process .slick-slider').slick({
        dots: false,
        speed: 300,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.process .slick-prev'),
        nextArrow: $('.process .slick-next'),
        variableWidth: true,
        centerMode: true,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                variableWidth: false,
                centerMode: false,
                dots: true,
              }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                    centerMode: false,
                    dots: true,
                }
            },
        ]
    });

    $('.about-builder .slick-slider').slick({
        dots: true,
        arrows: true,
        speed: 300,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            },
        ]
    });
    
   


      // фиксим шапку при открытии модалки
    $('.modal').on('show.bs.modal', function (e) {
        var scrollBarWidth = getScrollbarWidth();
        $('.header').css('right', scrollBarWidth + 'px');
    })
    $('.modal').on('hidden.bs.modal', function (e) {
        $('.header').removeAttr('style');
    })

    function rangeSlider(slider) {
        var sliders = $('.range-sliders');

        for (var i = 0; i < sliders.length; i++) {
            noUiSlider.create(sliders[i], {
                start: [$(sliders[i]).data("min"), $(sliders[i]).data("max")],
                connect: true,
                step: 1,
                range: {
                    'min': [$(sliders[i]).data("min")],
                    'max': [$(sliders[i]).data("max")]
                }
            });

            sliders[i].noUiSlider.on('slide', addValues);
        }
    
        function addValues() {
            var allValues = [];
            var valueContainer = $('.filter-group-container');
            var minVal = $(valueContainer).find('.from-value');
            var maxVal = $(valueContainer).find('.to-value');
    
            for (var i = 0; i < sliders.length; i++) {
                allValues.push(sliders[i].noUiSlider.get());
                $(minVal[i]).val('От ' + Math.round(allValues[i][0]));
                $(maxVal[i]).val('До ' + Math.round(allValues[i][1]));
            };
        }
        addValues();
    }
    rangeSlider();

    $('.filter-dropdown .dropdown-item').on('click', function(e){
        e.preventDefault()
        var items = $(this).closest('.dropdown-menu').find('.dropdown-item');
        items.removeClass('active');
        $(this).addClass('active');
        var text = $(this).text();
        $(this).closest('.dropdown').find('.dropdown-toggle .dropdown-text').html(text);
    })

    $('#header-collapse').on('show.bs.collapse', function () {
        $('body').addClass('scroll-lock')
    })
    $('#header-collapse').on('hide.bs.collapse', function () {
        $('body').removeClass('scroll-lock')
    })


    $('.js-show-map-point').on('click', function(){
        $('body').addClass('scroll-lock');
        $('.map-content-wrap').addClass('open');
    })

    $('.map-content__header .icon-close').on('click', function(){
        $('body').removeClass('scroll-lock');
        $('.map-content-wrap').removeClass('open');
    })

    $('.js-show-filter').on('click', function(){
        $('body').addClass('scroll-lock');
        $('.catalog-filter').addClass('open');
    })

    $('.catalog-filter .icon-close').on('click', function(){
        $('body').removeClass('scroll-lock');
        $('.catalog-filter').removeClass('open');
    })
})

function getScrollbarWidth() { 
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure';
    document.body.appendChild(scrollDiv)
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
}


document.addEventListener("DOMContentLoaded", function(event) { 
    document.querySelector("#map").innerHTML = ''
    ymaps.ready(init);
    var groups = [
        {
            name: "ЖК",
            style: "islands#redIcon",
            template: `<div class="map-content__item">
                        <div class="map-content__item__icon">
                            <button class="btn btn-orange btn-map sm leto">
                                <!-- <img src="img/icon-map/icon-home.svg" alt=""> -->
                                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path class="fill-white" d="M5.5 9C5.89782 9 6.27936 8.84196 6.56066 8.56066C6.84196 8.27936 7 7.89782 7 7.5C7 7.10218 6.84196 6.72064 6.56066 6.43934C6.27936 6.15804 5.89782 6 5.5 6C5.10218 6 4.72064 6.15804 4.43934 6.43934C4.15804 6.72064 4 7.10218 4 7.5C4 7.89782 4.15804 8.27936 4.43934 8.56066C4.72064 8.84196 5.10218 9 5.5 9ZM7 13.5C7 13.8978 6.84196 14.2794 6.56066 14.5607C6.27936 14.842 5.89782 15 5.5 15C5.10218 15 4.72064 14.842 4.43934 14.5607C4.15804 14.2794 4 13.8978 4 13.5C4 13.1022 4.15804 12.7206 4.43934 12.4393C4.72064 12.158 5.10218 12 5.5 12C5.89782 12 6.27936 12.158 6.56066 12.4393C6.84196 12.7206 7 13.1022 7 13.5ZM5.5 21C5.69698 21 5.89204 20.9612 6.07403 20.8858C6.25601 20.8104 6.42137 20.6999 6.56066 20.5607C6.69995 20.4214 6.81044 20.256 6.88582 20.074C6.9612 19.892 7 19.697 7 19.5C7 19.303 6.9612 19.108 6.88582 18.926C6.81044 18.744 6.69995 18.5786 6.56066 18.4393C6.42137 18.3001 6.25601 18.1896 6.07403 18.1142C5.89204 18.0388 5.69698 18 5.5 18C5.10218 18 4.72064 18.158 4.43934 18.4393C4.15804 18.7206 4 19.1022 4 19.5C4 19.8978 4.15804 20.2794 4.43934 20.5607C4.72064 20.842 5.10218 21 5.5 21V21ZM13 7.5C13 7.89782 12.842 8.27936 12.5607 8.56066C12.2794 8.84196 11.8978 9 11.5 9C11.1022 9 10.7206 8.84196 10.4393 8.56066C10.158 8.27936 10 7.89782 10 7.5C10 7.10218 10.158 6.72064 10.4393 6.43934C10.7206 6.15804 11.1022 6 11.5 6C11.8978 6 12.2794 6.15804 12.5607 6.43934C12.842 6.72064 13 7.10218 13 7.5ZM11.5 15C11.8978 15 12.2794 14.842 12.5607 14.5607C12.842 14.2794 13 13.8978 13 13.5C13 13.1022 12.842 12.7206 12.5607 12.4393C12.2794 12.158 11.8978 12 11.5 12C11.1022 12 10.7206 12.158 10.4393 12.4393C10.158 12.7206 10 13.1022 10 13.5C10 13.8978 10.158 14.2794 10.4393 14.5607C10.7206 14.842 11.1022 15 11.5 15ZM13 19.5C13 19.8978 12.842 20.2794 12.5607 20.5607C12.2794 20.842 11.8978 21 11.5 21C11.1022 21 10.7206 20.842 10.4393 20.5607C10.158 20.2794 10 19.8978 10 19.5C10 19.1022 10.158 18.7206 10.4393 18.4393C10.7206 18.158 11.1022 18 11.5 18C11.8978 18 12.2794 18.158 12.5607 18.4393C12.842 18.7206 13 19.1022 13 19.5ZM17.5 21C17.697 21 17.892 20.9612 18.074 20.8858C18.256 20.8104 18.4214 20.6999 18.5607 20.5607C18.6999 20.4214 18.8104 20.256 18.8858 20.074C18.9612 19.892 19 19.697 19 19.5C19 19.303 18.9612 19.108 18.8858 18.926C18.8104 18.744 18.6999 18.5786 18.5607 18.4393C18.4214 18.3001 18.256 18.1896 18.074 18.1142C17.892 18.0388 17.697 18 17.5 18C17.1022 18 16.7206 18.158 16.4393 18.4393C16.158 18.7206 16 19.1022 16 19.5C16 19.8978 16.158 20.2794 16.4393 20.5607C16.7206 20.842 17.1022 21 17.5 21V21ZM1 32C0.734784 32 0.48043 31.8946 0.292893 31.7071C0.105357 31.5196 0 31.2652 0 31V3C0 2.20435 0.31607 1.44129 0.878679 0.87868C1.44129 0.316071 2.20435 0 3 0H15C15.7956 0 16.5587 0.316071 17.1213 0.87868C17.6839 1.44129 18 2.20435 18 3V12H21C21.7956 12 22.5587 12.3161 23.1213 12.8787C23.6839 13.4413 24 14.2044 24 15V31C24 31.2652 23.8946 31.5196 23.7071 31.7071C23.5196 31.8946 23.2652 32 23 32H1ZM2 3V30H6V25C6 24.7348 6.10536 24.4804 6.29289 24.2929C6.48043 24.1054 6.73478 24 7 24H17C17.2652 24 17.5196 24.1054 17.7071 24.2929C17.8946 24.4804 18 24.7348 18 25V30H22V15C22 14.7348 21.8946 14.4804 21.7071 14.2929C21.5196 14.1054 21.2652 14 21 14H17C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13V3C16 2.73478 15.8946 2.48043 15.7071 2.29289C15.5196 2.10536 15.2652 2 15 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3ZM16 26H13V30H16V26ZM11 26H8V30H11V26Z"/>
                                </svg>
                            </button>
                        </div>
                        <p class="map-content__item__text sm">ЖК</p>
                    </div>`,
            items: [
                {
                    center: [43.49468969958426, 39.91059422492982],
                    name: "ЖК &quot;Летний&quot;",
                    ico: "ico-leto"
                }
            ]},
        {
            name: "Пляж",
            style: "islands#redIcon",
            template: `<div class="map-content__item">
                        <div class="map-content__item__icon">
                            <button class="btn btn-primary btn-map sm active">
                                <!-- <img src="img/icon-map/icon-beach.svg" alt=""> -->
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path class="stroke-dark" d="M1.63281 26.0233L2.62889 27.3277C2.85155 27.5839 3.16796 27.7354 3.50781 27.7354C3.84766 27.7354 4.17579 27.5839 4.38673 27.3277L5.48831 26.0116C5.71097 25.7554 6.02738 25.604 6.36722 25.604C6.70707 25.604 7.0352 25.7554 7.24614 26.0116L8.34772 27.3277C8.57038 27.5839 8.88679 27.7354 9.22664 27.7354C9.56649 27.7354 9.89462 27.5839 10.1056 27.3277L11.2071 26.0116C11.4298 25.7554 11.7462 25.604 12.0861 25.604C12.4259 25.604 12.754 25.7554 12.965 26.0116L14.0666 27.3277C14.2892 27.5839 14.6056 27.7354 14.9455 27.7354C15.2853 27.7354 15.6135 27.5839 15.8244 27.3277L16.926 26.0116C17.1486 25.7554 17.465 25.604 17.8049 25.604C18.1447 25.604 18.4729 25.7554 18.6838 26.0116L19.7854 27.3277C20.008 27.5839 20.3245 27.7354 20.6643 27.7354C21.0042 27.7354 21.3323 27.5839 21.5432 27.3277L22.6448 26.0116C22.8675 25.7554 23.1839 25.604 23.5237 25.604C23.8636 25.604 24.1917 25.7554 24.4026 26.0116L25.5042 27.3277C25.7269 27.5839 26.0433 27.7354 26.3831 27.7354C26.723 27.7354 27.0511 27.5839 27.2621 27.3277L27.9418 26.5124" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path class="stroke-dark" d="M13.667 22.7505C15.2725 21.586 17.0655 20.7476 19.2101 20.7476H27.9993" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path class="stroke-dark" d="M26.5823 9.11313C26.9339 8.99666 27.2035 8.7055 27.309 8.3561C27.4144 7.99506 27.3323 7.62237 27.0979 7.3312C24.1448 3.66255 19.0939 2.05533 14.3712 3.68585C9.66021 5.31636 6.69531 9.69545 6.67188 14.389C6.67188 14.7617 6.8477 15.1111 7.15239 15.3207C7.45708 15.5304 7.84375 15.5886 8.19532 15.4721L26.5823 9.11313Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path class="stroke-dark" d="M14.3702 3.68604L13.6201 1.53125" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path class="stroke-dark" d="M17.3828 12.292L20.3478 20.7471" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <p class="map-content__item__text sm">Пляж</p>
                    </div>`,
            items: [
                {
                    center: [43.49511, 39.88238],
                    name: "Пляж &quot;Солнечный&quot;",
                    ico: "ico-beach"
                },
                {
                    center: [43.49371, 39.883332],
                    name: "Центрально городской пляж",
                    ico: "ico-beach"
                },
                {
                    center: [43.4907, 39.8848],
                    name: "Пляж  &quot;Дружбы народов &quot;",
                    ico: "ico-beach"
                }
            ]},
        {
            name: "Ювелирный магазин",
            style: "islands#greenIcon",
            template: `<div class="map-content__item">
                            <div class="map-content__item__icon">
                                <button class="btn btn-primary btn-map sm active">
                                    <!-- <img src="img/icon-map/icon-diamond.svg" alt=""> -->
                                    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class="fill-dark" d="M0.0703125 7.91816L5.82188 0.181641L20.3364 0.220139L26.0009 7.91816L13.0356 22.4097L0.0703125 7.91816ZM13.0356 19.5133L17.1895 8.54361H8.88165L13.0356 19.5133ZM15.1271 17.7908L15.2917 17.8871L23.6479 8.54361H18.6322L15.1271 17.7908ZM10.7892 17.8871L10.9538 17.7908L7.4486 8.55324H2.4329L10.7892 17.8871ZM19.0292 7.20607H23.8125L20.2493 2.41407L19.0292 7.20607ZM9.23024 7.20607H16.8409L13.0356 2.00991L9.23024 7.20607ZM2.25862 7.20607H7.04193L5.82188 2.41407L2.25862 7.20607ZM17.8673 6.34005L19.0873 1.55765H14.3621L17.8673 6.34005ZM8.21354 6.34005L11.7187 1.55765H6.99351L8.21354 6.34005Z"/>
                                    </svg>
                                </button>
                            </div>
                            <p class="map-content__item__text sm">Ювелирный магазин</p>
                        </div>`,
            items: [
                {
                    center: [43.4938, 39.9038],
                    name: "Ювелирный магазин &quot;Карат&quot;",
                    ico: "ico-diamond"
                },
                {
                    center: [43.4976, 39.91496],
                    name: "Ювелирный магазин &quot;Барокко&quot;",
                    ico: "ico-diamond"
                },
            ]},
        {
            name: "Музыкальная студия",
            style: "islands#orangeIcon",
            template: `<div class="map-content__item">
                        <div class="map-content__item__icon">
                            <button class="btn btn-primary btn-map sm active">
                                <!-- <img src="img/icon-map/icon-music.svg" alt=""> -->
                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path class="stroke-dark" fill-rule="evenodd" clip-rule="evenodd" d="M13.4618 16.4459C13.4618 14.6821 14.9327 13.2906 16.746 13.2906C16.8569 13.2906 17.0483 13.2906 17.2397 13.3298C17.3908 13.369 17.5419 13.2906 17.693 13.1828C17.8441 13.075 17.9147 12.8496 17.9147 12.7026V5.68652C17.9147 5.50034 17.8442 5.31414 17.7233 5.24555C17.5722 5.09856 17.421 5.05937 17.2296 5.05937L8.01169 6.08826C7.74976 6.12745 7.48781 6.38221 7.48781 6.67618V17.8766C7.48781 17.8766 7.48781 17.9157 7.48781 17.9451C7.44752 19.6012 5.97671 20.9927 4.24394 20.9927C2.47087 20.9927 1 19.562 1 17.8275C1 16.0637 2.47087 14.6723 4.24394 14.6723C4.39505 14.6723 4.54615 14.6723 4.73756 14.6723C4.92898 14.7115 5.08008 14.6723 5.23119 14.5645C5.38231 14.4567 5.42261 14.2705 5.42261 14.0843V2.69775L20 1.12012V16.5439C19.9597 18.2391 18.5292 19.5914 16.7561 19.5914C14.9327 19.6012 13.4618 18.1705 13.4618 16.4459Z" stroke-width="1.2" stroke-miterlimit="10"/>
                                </svg>
                            </button>
                        </div>
                        <p class="map-content__item__text sm">Музыкальная студия</p>
                    </div>`,
            items: [
                {
                    center: [43.49835, 39.918823],
                    name: "Музыкальная студия &quot;Страдивари&quot;",
                    ico: "ico-music"
                }
            ]},
        {
            name: "Велодорожки",
            style: "islands#blueIcon",
            template: `<div class="map-content__item">
                            <div class="map-content__item__icon">
                                <button class="btn btn-primary btn-map sm active">
                                    <!-- <img src="img/icon-map/icon-bike.svg" alt=""> -->
                                    <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class="stroke-dark" d="M19.542 7.38818C21.1169 7.38818 22.3936 6.11937 22.3936 4.5542C22.3936 2.98903 21.1169 1.72021 19.542 1.72021C17.9671 1.72021 16.6904 2.98903 16.6904 4.5542C16.6904 6.11937 17.9671 7.38818 19.542 7.38818Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path class="stroke-dark" d="M6.23352 28.1719C8.85856 28.1719 10.9866 26.0571 10.9866 23.4485C10.9866 20.8398 8.85856 18.7251 6.23352 18.7251C3.60848 18.7251 1.48047 20.8398 1.48047 23.4485C1.48047 26.0571 3.60848 28.1719 6.23352 28.1719Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path class="stroke-dark" d="M15.739 25.3379C14.6869 25.3379 13.8377 24.4939 13.8377 23.4485C13.8377 20.6143 12.266 18.0447 9.73099 16.7347C9.18596 16.4576 8.80566 15.9286 8.72961 15.3239C8.64089 14.7193 8.85638 14.1147 9.3 13.6865L14.4207 8.84953C14.8517 8.43386 15.4601 8.25751 16.0558 8.35828C16.6516 8.45905 17.1585 8.83695 17.4247 9.37858C17.4374 9.39118 18.8824 12.1119 21.43 12.1119C22.4821 12.1119 23.3313 12.9559 23.3313 14.0014C23.3313 15.0468 22.4821 15.8908 21.43 15.8908C18.6415 15.8908 16.6642 14.4044 15.4601 13.0818L13.6222 14.8201C16.1445 16.9489 17.6275 20.0727 17.6275 23.4485C17.6402 24.4939 16.791 25.3379 15.739 25.3379Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path class="stroke-dark" d="M25.2462 28.1719C27.8713 28.1719 29.9993 26.0571 29.9993 23.4485C29.9993 20.8398 27.8713 18.7251 25.2462 18.7251C22.6212 18.7251 20.4932 20.8398 20.4932 23.4485C20.4932 26.0571 22.6212 28.1719 25.2462 28.1719Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <p class="map-content__item__text sm">Велодорожки</p>
                        </div>`,
            items: [
                {
                    center: [43.4981, 39.915],
                    name: "Велодорожка &quot;Спорт круг&quot;",
                    ico: "ico-velo"
                },
                {
                    center: [43.493249, 39.895906],
                    name: "Велодорожка &quot;Полосатый рейс&quot;",
                    ico: "ico-velo"
                },
                {
                    center: [43.49430, 39.892086],
                    name: "Велодорожка &quot;ТЦ Арсус&quot;",
                    ico: "ico-velo"
                },
            ]},
            {
                name: "Кафетерий",
                style: "islands#blueIcon",
                template: `<div class="map-content__item">
                            <div class="map-content__item__icon">
                                <button class="btn btn-primary btn-map sm active">
                                    <!-- <img src="img/icon-map/icon-coffee.svg" alt=""> -->
                                    <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class="fill-dark" d="M11.4884 23.8979C8.55112 23.8979 5.7922 22.7616 3.70465 20.687C1.61709 18.6124 0.473633 15.8706 0.473633 12.9515C0.473633 12.4824 0.86178 12.0967 1.33384 12.0967H22.5241C24.5697 12.0967 26.2377 13.7543 26.2377 15.7872C26.2377 18.456 24.0557 20.6245 21.3702 20.6245H19.3141L19.2197 20.7183C17.1426 22.772 14.3942 23.8979 11.4884 23.8979ZM2.26749 14.1609C2.87592 18.7375 6.83072 22.1882 11.4884 22.1882C16.1461 22.1882 20.1009 18.7375 20.7093 14.1609L20.7513 13.8064H2.22549L2.26749 14.1609ZM22.4297 14.0983C22.2724 15.6412 21.7793 17.1112 20.9925 18.456L20.7198 18.9252H21.3807C23.1221 18.9252 24.5383 17.5178 24.5383 15.7872C24.5383 14.7968 23.7934 13.9419 22.7968 13.8168L22.4716 13.7751L22.4297 14.0983Z"/>
                                        <path class="fill-dark" d="M2.74009 27.3916C2.26803 27.3916 1.87988 27.0058 1.87988 26.5366C1.87988 26.0674 2.26803 25.6816 2.74009 25.6816H20.2273C20.6994 25.6816 21.0875 26.0674 21.0875 26.5366C21.0875 27.0058 20.6994 27.3916 20.2273 27.3916H2.74009Z"/>
                                        <path class="fill-dark" d="M12.7987 10.1572C12.3266 10.1572 11.9385 9.77151 11.9385 9.3024C11.9385 7.23827 12.3895 6.14366 12.7777 5.17415C13.1658 4.23591 13.491 3.42277 13.491 1.69225C13.491 1.22313 13.8792 0.837402 14.3512 0.837402C14.8233 0.837402 15.2114 1.22313 15.2114 1.69225C15.2114 3.75637 14.7604 4.85097 14.3722 5.82048C13.9841 6.75872 13.6589 7.57187 13.6589 9.3024C13.6589 9.78194 13.2707 10.1572 12.7987 10.1572Z"/>
                                        <path class="fill-dark" d="M8.61314 10.1572C8.14108 10.1572 7.75293 9.77151 7.75293 9.3024C7.75293 7.23827 8.204 6.14366 8.59214 5.17415C8.98027 4.23591 9.30546 3.42277 9.30546 1.69225C9.30546 1.22313 9.69361 0.837402 10.1657 0.837402C10.6377 0.837402 11.0259 1.22313 11.0259 1.69225C11.0259 3.75637 10.5748 4.85097 10.1867 5.82048C9.79853 6.75872 9.47334 7.56145 9.47334 9.3024C9.46285 9.78194 9.0852 10.1572 8.61314 10.1572Z"/>
                                    </svg>
                                </button>
                            </div>
                            <p class="map-content__item__text sm">Кафетерий</p>
                        </div>`,
                items: [
                    {
                        center: [43.4943939, 39.9025905],
                        name: "Кафе &quot;Теремок&quot;",
                        ico: "ico-cafe"
                    },
                    {
                        center: [43.493288, 39.90234],
                        name: "Кафе &quot;Мимино&quot;",
                        ico: "ico-cafe"
                    },
                    {
                        center: [43.493296, 39.903309],
                        name: "Пицерия &quot;Дивидыч&quot;",
                        ico: "ico-cafe"
                    },
                    {
                        center: [43.4931953, 39.9039423],
                        name: "Пицерия &quot;Мухомор&quot;",
                        ico: "ico-cafe"
                    },
                    {
                        center: [43.495032, 39.90812],
                        name: "Пицерия &quot;Большой Джон&quot;",
                        ico: "ico-cafe"
                    },
                ]}
    ];
    function init() {
        var myMap = new ymaps.Map('map', {
                center: [43.4937168033, 39.89659309],
                zoom: 14
            }, {
                searchControlProvider: 'yandex#search'
            }),              
        menu = $('.map-content__wapper'); 
        document.querySelector('.map-content__wapper').innerHTML='' 
        for (var i = 0, l = groups.length; i < l; i++) {
            createMenuGroup(groups[i]);
        }
        function createMenuGroup (group) {
            var menuItem = $(`${group.template}`),  
                collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
                submenu = $('<ul class="submenu"></ul>');
            myMap.geoObjects.add(collection);
            menuItem
                .append(submenu)
                .appendTo(menu)
                .bind('click', function (e) {
                    if (collection.getParent()) {
                        e.target.closest('.map-content__item').querySelector('button').classList.remove('active')
                        myMap.geoObjects.remove(collection);
                        submenu.hide();
                    } else {
                        e.target.closest('.map-content__item').querySelector('button').classList.add('active')
                        myMap.geoObjects.add(collection);
                        submenu.show();
                    }
                });
            for (var j = 0, m = group.items.length; j < m; j++) {
               createSubMenu(group.items[j], collection, submenu);
            }
        }    
        function createSubMenu (item, collection, submenu) {
                let placemark = new ymaps.Placemark(item.center, 
                    {hintContent: item.name },
                    {
                    iconLayout: 'default#image',
                    iconImageHref: `img/icon-map/${item.ico}.svg`,
                    iconImageSize: [40, 40],
                    iconImageOffset: [0, 0]
                });
    
            collection.add(placemark);
        }
        menu.appendTo($('.map-content__wapper'));
        myMap.setBounds(myMap.geoObjects.getBounds());
    }
  });
