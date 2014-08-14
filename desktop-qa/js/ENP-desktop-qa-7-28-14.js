<script>
    /*LATEST GLOBAL*/
    $(window).ready(function(){
    /*Changes the home page text when user is logged in*/
    if ($('.sitehome').length){
        if($('.ui-res-profile-login-loggedin-msg').length){
            $('.search-location-criteria > .diff-font').replaceWith("<div class='diff-font'>Select a Location</div>");
        }
    }
});
$(window).load(function() {
    /*on click of the checkout link this will run the MCP goToCheckout function*/
    $('.cartLink').click(function() {
        goToCheckout(); 
        return false;
    });
    /*Fix to disable update button on load of the page, and check if time/date has changed from original time/date*/
    if($('.menu, .review-and-checkout').length){
        $('#change-pick-time-link-internals-order-status').click(function() {
            $('#update-pick-time-btn-internals-order-status').prop('disabled', true);
            $('form#update-pick-up-time-form-internals-order-status .update-btn').addClass('update-btn-off');
        });

        var CurrentTimeSelected = $.trim($('.estimated-pickup-time-hours').text());
        var CurrentDateSelected = $.trim($('.estimated-pickup-time-date').text());

        $('select[name="selectOrderTime"], select[name="selectOrderDate"]').change(function() {
            var valTimeSelected = $.trim($('select[name="selectOrderTime"]').find('option:selected').val());
            var valDateSelected = $.trim($('select[name="selectOrderDate"]').find('option:selected').val());
            if(CurrentTimeSelected != valTimeSelected || CurrentDateSelected != valDateSelected){
                $('#update-pick-time-btn-internals-order-status').prop('disabled', false);
                $('form#update-pick-up-time-form-internals-order-status .update-btn').removeClass('update-btn-off');
            }else{
                $('#update-pick-time-btn-internals-order-status').prop('disabled', true);
                $('form#update-pick-up-time-form-internals-order-status .update-btn').addClass('update-btn-off');
            }
        });   
    }
    /*Checks the URL for 'offline' text and hides the buttons if found and inserts some text*/
    if(window.location.href.indexOf("offline") > -1) {
        $('.view-menu-btn, .change-date-time-btn button.change-date-time-btn').hide();
        var offlineTxtLocation = $('.change-date-time-btn button.change-date-time-btn:hidden').closest('.ui-res-address-det-btns');
        $('<div><strong>Currently this store is not accepting online orders</strong></div>').insertAfter(offlineTxtLocation);
    }
    /*Shows and hides a stores pickup time drop downs.*/
    $('.change-date-time-btn').live('click', function() {
        var onclickValue = $(this).attr('onclick');
        setTimeout(function(){

            if( $('.estimated-pickup-time-date').is(':empty') ) {
                $('.estimated-pickup-time-date').closest('.ui-res-address-det-container').find('table').hide();
                $('.select-date-time-container').text('Store is currently closed');
            }
            $('.select-date-time-container select').attr('disabled', true);
        },500 );
    });
    $('input:radio[name="showOrderDateTime"]').live('change',function(){
        var $nextAvailRadioBtn = $('#showFirstOrderDateTime');
        var $laterRadioBtn = $('#showSelectOrderDateTime');


        if ($laterRadioBtn.is(':checked')){
            $('.select-date-time-container select').prop('disabled', false);
        }
        if ($nextAvailRadioBtn.is(':checked')){
            $('.select-date-time-container select').prop('disabled', true);
        }
    });
    //Redirect checkout page to review & checkout page
    //This is a temporary fix as naples works to resolve it
    //This only occurs when checking out as guest/sign in when checking out from perpetual cart
    //you get redirected to checkout.jsp instead of review & checkout.jsp
    //By: OS 3/11/2014
    //putting in meta so it redirects before entire page loads
    /*if(window.location.href.indexOf("myres/order/checkout.jsp") > -1) {
    window.location = ("/myres/order/reviewAndCheckout.jsp");
  }*/

    /*Fix put in place by Naples 3-24-14 YPA*/
    /*
if($('.checkout').length){
 window.location = ("/myres/order/reviewAndCheckout.jsp");
}*/

    $('.review-and-checkout-page-b, .login-page-b, .my-account-page-b, .my-past-orders-page-b, .my-favorite-orders-page-b, .menu-page-b, .create-account-page-b, .create-group-order-page-b, .my-group-orders-page-b, .review-group-order-page-b, .edit-account-page-b, .group-order-invitation-sent-page-b, .review-open-group-order-page-b, .review-cancelled-group-order-page-b, .review-closed-group-order-page-b, .edit-billing-address-page-b, .terms-and-conditions-page-b, .privacy-policy-page-b, .order-summary-page-b, .checkout-page-b, .order-confirmation-page-b, .my-invitee-groups-page-b, .create-or-update-invitee-group-page-b').children().not('.left-sidebar, .ui-res-order-status-container, .ui-res-menu-dropdown-container, .accordion-menu').wrapAll('<div class="Sub-wrap">');
    if($('.login').length){
        $('.Sub-wrap').children().not('.sign-in').after().wrapAll('<div class="Sub-signin-wrap">');
    } 
    $('input[name=country]').val('US').attr('disabled','disabled');

    $('#city').attr('value','City');
    $('#zipCode').attr('value','Zip Code');

    $('.ui-res-order-basket-items-container.module.basket-items .ui-res-order-basket-item-container').each(function(){
        var $localItemName = $(this).find('.item-name');
        var $localButtons = $(this).find('.res-order-basket-items-remove-btn, .multi-level-mods-edit');
        $localButtons.insertAfter($localItemName).wrapAll('<span class="cc-edit-remove" />');
    });

    $('.ui-res-email-club-sign-up').insertBefore('.ui-res-checkout-btn-container'); 
    /*YPA 8-14-14 - Hides pickup time if group order limit element exists*/
    if ($('.group-order-menu-order-limit').length){
        $('#order-pick-up-time-comp').hide();
    }
    if($('.ui-res-order-status-container').length){
        /*Takes ui-res-group-order-for-container and group-order-menu-order-limit system components and adds them to the order-status component*/
        $('.ui-res-order-status-container.order-status').prepend($('.ui-res-group-order-for-container'), $('.group-order-menu-order-limit'));

        /*var elementsToHide = $('#order-pick-up-time-comp, .ui-res-order-basket-items-container, .ui-res-order-total-container');*/
        var elementsToHide = $('.ui-res-order-total-container');

        if($.trim($('#ui-res-header-account-and-cart-navigation-items-in-cart-value').text())==0){
            elementsToHide.hide();
            if($('.menu').length){
                $('.ui-res-order-location-container').after('<div class="custom-null-container container"><div class="title">Item Summary</div ><div class="title-sub-text">- You haven\'t added any items yet. -</div ></div>');
            }
        }
        $('.location-links-container').find('#change-location-link').after('<span style="color: #808080; line-height: 13px;" class="float-left">|</span>');        
    }
    if ($('.confirmationdes').length){
        $('.custom-null-container.container').hide();
        //$('#order-pick-up-time-comp').show();
        $('<div class="needsomething">Need to change something? Call us at the number above</div>').insertAfter('#order-pick-up-time-comp');
    }

    if($('.order-confirmation').length && !$('.custom-confirmation-change-something').length){
        //$('#order-pick-up-time-comp').show();
        $('#order-pick-up-time-comp').after('<div class="custom-confirmation-change-something container">Need to change something? Call us at the number above.</div>');
    }

    //Order confirmation page does not have Directions Link for some reason from MCP.. Using this as workaround.
    if($('.order-confirmation').length && !$('.location-links-container').length){
        var locationsDirectionsLink = '<div class="location-links-container container"><a href="#" onclick="doShowDirections(); return false;" class="float-left">Directions</a></div>';
        $('.location-details-container').after(locationsDirectionsLink);
    }

    if($('.menu').length && $('.selected-menu-category-item-title').length){
        /*adds a class to style the category description coming from mycentral for only the Specials & Deals category layout*/
        var x = $('.selected-menu-category-item-title').text(); 
        if( x === 'Specials & Deals'){
            $('.ui-myres-category-descrip-value').addClass('awardwinning2');
        }
        //Wraps every three items with a div in order to fix menu item label overlap issue.
        var divs = $('.ui-res-menu-grid-div');
        for(var i = 0; i < divs.length; i+=3) {
            divs.slice(i, i+3).wrapAll("<div class='menu-items-wrap'></div>");
        }
        /*Specials temp jquery functionality*/
        $('.promo-1, .promo-2, .promo-3, .promo-4').wrapAll('<div class="promo-wrap"/>');

        if($('.selected-menu-category-item-title:contains("Deals")').length){
            $('.menu-grid').hide();
            $('.promo-wrap').show(); 
        }else{
            $('.menu-grid').show();
        }
        $('.selected-menu-category-item-title').after('<div class="headerdot" />');
        var menuTitleContainer = 548;
        var menuTitleWidth = $('.selected-menu-category-item-title').width();
        $('.headerdot').width(menuTitleContainer-menuTitleWidth-20);

        /*Adding Menu title to Accordion component*/        
        $('.ui-res-accordion-menu-list').prepend('<li class="ui-res-accordion-menu-item-li  collapser"><div  id="dummy0" class="ui-res-accordion-menu-item ui-res-accordion-menu-item-level-0 " ><span class="menu-spacer"></span><span>OUR MENU</span></div></li>');

        var selectedTitle = $('.selected-menu-category-item-title:first').text();
        /*$('.ui-res-dropdown-menu-list li span[name=displayText]:contains("'+selectedTitle+'")').addClass('active-menu-item');*/
        $('.ui-res-accordion-menu-list li span[name=displayText]:contains("'+selectedTitle+'")').addClass('active-menu-item');

        var activeMenuItem = $('.ui-res-accordion-menu-list .active-menu-item').text();
        /*var activeMenuItem = $('.ui-res-dropdown-menu-list .active-menu-item').text();*/
        var menuArrayMap = {
            'Appetizers' : 'Jump-start your appetite!',
            'Beef & Pork' : 'That\'s what\'s for dinner!',
            'Beverages' : 'Wet your whistle!',
            'Breakfast Smiles' : 'Find the Smile that fits you!',
            'Burgers' : 'Award-Winning!',
            'Celiac Menu' : 'For our guests who cannot eat foods with gluten.',
            'Chicken' : 'Tender, juicy, and delicious! ',
            "Eat'n Smart Menu" : 'Great items under 500 calories!',
            'Pasta' : 'Mangia, Mangia!',
            'Salads' : 'We like it fresh!',
            'Sandwiches' : 'The best stuff between bread.',
            'Seafood' : 'Our fish is wild-caught!',
            'Smaller Portions' : 'For smaller appetities!',
            'Smiley Cookies' : 'After all, we are The Place for Smiles!'
        };

        $.each(menuArrayMap, function(key, value) {
            if(key==activeMenuItem){
                $('.ui-res-selected-menu-category-title-container .selected-menu-category-title').append('<div class="awardwinning">'+value+'<div>');
            }
        });

    }

    $('.ui-res-header-account-and-cart-navigation-items-in-cart, .ui-res-header-content-container').show();

    if($('.my-past-orders,.my-favorite-orders').length){

        /*Past orders page, hides the past order note if there is a no result text on the page*/
        if($('.past-orders-no-result').length || $('.favorites-no-result').length){
            $('.past-orders-note').hide();
            $('.favorites-note').hide();
        }
        $('.past-orders-detail,.favorites-detail').each(function() {
            var currentOrderDetails = $(this);
            currentOrderDetails.appendTo(currentOrderDetails.prevAll('ul').first().find('li:last'));
        });
        $(".show-details-link").each(function() {
            var details = $(this);
            details.appendTo(details.closest('li'));
        });
        if($('.my-favorite-orders').length){
            $( "ul.favorites-list-header li:contains('Date')" ).text('Last Ordered');
        }   
        /*Changes html location of Favorite Remove link*/
        $(document).ready(function() {
            $('.favorites-list ul').each(function(){
                var $this = $(this);
                var $localDetailsLink = $this.find('.show-details-link');
                var $localButtons = $this.find('.remove-fav-link');
                $localButtons.insertAfter($localDetailsLink);
            });
        });
    }

    if($('select[name=state]').length){
        /*Naples must fix by adding empty option above Alberta (AB) which is default selected state to avoid this hack*/
        if($('select[name=state] option:selected').val()=='AB'){
            $('select[name=state]').prepend('<option value=" " selected="selected"> </option>');
        }
    }

    if($('.checkout').length){
        var $specialInfo = $('.form-item.specialInstruction-lbl').closest('.form-row');
        $('label[for=orderNickName]').closest('tbody').append($specialInfo);
    }

    if($('.my-group-orders-page-b').length){
        var groupOrdersList = $.trim($('.ui-res-group-order-my-group-orders-list-data-container').text());
        var groupOrderingURL = $('.ui-res-header-account-and-cart-navigation-group-ordering').attr('href');
        if(groupOrdersList==''){

            $('.ui-res-group-order-my-group-orders-info-text').html("You haven't created any group orders yet. <a href='"+groupOrderingURL+"' target='_self' class='first-group-order' style='color:#CB0000;'>Click here to start one now!</a>");
            $('.ui-res-group-order-my-group-orders-list-container').hide();
        }
    }


    if($('.order-confirmation').length){
        /*moving print button to correct spot*/
        $('.print-btn').prependTo('.store-details-return-home');
    }


    if($('.review-and-checkout').length){
        /*Hides the stored credit card field tr if there are no cards stored*/
        if($('.storedCard-input option').length == 1){
            $('.stored-card-tr').hide();
        }
        /*Changes the maxlength attr from mcp default 24 to 16*/
        $('.specialInstruction-input input').attr('maxlength','16');

        /*Adds the maxlength attr of 34 to the name your meal field*/
        $('[name=orderNickName]').attr('maxlength','34');

        /*Temp fix for details link for modifiers*/
        $('.info-container').hide();
        $('<div class="cc-details-btn"><span>[+]</span>Details</div>').insertAfter('.info-container');
        $('.ui-res-order-basket-items-container.module.basket-items .ui-res-order-basket-item-container').each(function(){

            var $localItemInfo = $(this).find('.info-container');
            var $localItemDetailsBtn = $(this).find('.cc-details-btn');

            /*YPA 4-28-14 need to fix. Should hide details section if multi-level-mods is not rendered.*/
            /*var $localDetailsContent = $(this).find('.customization .multi-level-mods');
    if (!$($localDetailsContent).length){
       ($localItemInfo).hide();
    }*/
            $($localItemDetailsBtn).click(function() {
                $(this).prev($localItemInfo).slideToggle(400);
            }).toggle(function() {
                $(this).children("span").text("[-]");
            }, function() {
                $(this).children("span").text("[+]");
            });
        });
        /* $('.simple-basket-items-list').append($('.ui-res-vouchers-container'));*/    
        $('.ui-res-order-basket-items-container.module.basket-items, .ui-res-order-subtotal-container, .ui-res-orders-totals-container.totals, .ui-res-vouchers-container').wrapAll('<div class="cc-basket-wrap"></div>');
        /*Checks the value of the Coupon Discount and hides the coupon field if it is greater than 0*/
        var voucher = $('.ui-res-order-overall-voucherDiscount-container .amount').text();
        var voucherSplitter = voucher.split('$');
        var voucherAmount = (voucherSplitter[1]);
        if ( voucherAmount > 0){
            $('.vouchers-container').hide();
        }
        /*Checkout and review page- Disables the email field input if the user is signed in based on the order nickname being on the page.*/
        if ($('input[name="orderNickName"]').length){
            $(".emailAddress-input input").prop('disabled', true);
        }

        /*Checkout and review page - inserts the error message below the headerdot class*/
        $('div [name=res-msg-checkoutDetails-parent]').insertAfter('.review-and-checkout .headerdot');

        /*moving special instructions field*/
        /*
var $paymentTable = $('.paymentMethod-lbl').closest("table");
var $specialInstructionsTable = $('.specialInstruction-lbl').closest('tr');

if ($('input[name="orderNickName"]').length){
$('form .ui-res-checkout-input-table:nth-child(4)').append($specialInstructionsTable);
}
else {
   $('.specialInstruction-lbl').closest('tr').wrap('<table class="ui-res-checkout-input-table form-panel specialInstructions-table" />');
   $('.specialInstructions-table').insertBefore($paymentTable);
   $('<div class="ui-res-checkout-section-separator separator-2"></div>').insertAfter('.specialInstructions-table');
}
*/
        $('.ui-res-checkout-btn-container button').live('click',function(){
            if($.trim($('div[name=res-general-error-container]').text()) != ''){
                $('html,body').animate({
                    scrollTop: $('.ui-res-error-msg-item-container').offset().top
                });
            }
        });

        /*Confirm Modal wrap
        $(document).on("dialogopen", ".ui-res-modal", function(event, ui) {
             $('.review-and-checkout .ui-res-modal .ui-res-confirm-dialog').children().not('.message-container').wrapAll('<div class="confirm-wrap"></div>');
        });*/

        /*CHRISTMAS ADDS BY OMAR CLOSE BUTTON IN CONFIRM START*/
        $(document).on("dialogopen", ".ui-res-modal", function(event, ui) {
            var $confirmCloseBtn = $('.review-and-checkout .ui-res-modal .ui-res-confirm-dialog').find('.confirm-close-btn');
            if(!$confirmCloseBtn.length){
                $('.review-and-checkout .ui-res-modal .ui-res-confirm-dialog').find('.btns-container').append('<button class="button button-1 confirm-close-btn" type="button">CLOSE</button>');
            }
            $('.confirm-close-btn').live('click',function(){
                $(this).closest('.ui-res-modal').remove();
                $('.ui-widget-overlay').remove();
            });
        });
        /*CHRISTMAS ADDS BY OMAR CLOSE BUTTON IN CONFIRM END*/
    }
});


$(document).ready(function() {
    /*change pickup time in sidebar perpetual cart - we need a better way to hook into id or class from NAPLES so we can do it with css*/
    $("button[id^='update-pick-time-btn']").addClass('greenbtn');

    $('#ui-res-header-account-and-cart-navigation-items-in-cart-value').wrap('<span class="cart-count-brackets" />').before('<span>(</span>').after('<span>)</span>');

    $(".ui-res-locations-state-code-container").each(function() {
        var item = $(this);
        item.insertAfter(item.next());
    });

    if($('.checkout').length){
        function paymentTextUpdate(){
            var paymentType = $('.ui-res-input-select[name=paymentMethod]').find('option:selected').val();
            var $paymentTitle = $('.ui-res-checkout-input-table-header').find('label[for=billingInformationSection] h2:first');
            if(paymentType=='Cash'){
                $paymentTitle.text('Contact Information:');
            } else if(paymentType=='CreditDebitCard'){
                $paymentTitle.text('Billing Information:');
            }
        }

        $('.ui-res-input-select[name=paymentMethod]').change(function(){
            paymentTextUpdate();
        });
        paymentTextUpdate();//run on page load too
    }

    if($('.menu-page-b').length){
        $('span[name="displayText"]:contains("MENU")').closest('.ui-res-dropdown-menu-item').removeAttr('onclick');
        $('span[name="displayText"]:contains("MENU")').attr('name','displayTextx');
    }

    if($('.my-account-page-b, .my-past-orders-page-b, .my-favorite-orders-page-b, .edit-account-page-b, .edit-billing-address-page-b').length){
        $('.ui-res-my-account-navigation-container').before('<div class="menu-nav-welcome">Welcome</div>');
    }

    /*Take this out once editable label text is in place for Please enter your email address. A message will be sent to the email address specified containing the instructions on how to reset your password.*/
    if($('.forgot-password-page-b').length){
        $('.ui-res-forgot-password-input-table-container').find('.ui-res-note').html('Enter your email address to reset your password.').css('line-height','18px');
    }
    /*end label remove*/
    /* Hide Menu Modifiers Until Checked START */
    var $modifierCheckbox = $('.ui-res-upsell-item').find('.config-item-chkbox input[type="checkbox"]');
    $modifierCheckbox.live('change',function(){
        var $closestMoifier = $(this).closest('.ui-res-upsell-item').find('.config-prompts-modifiers');
        this.checked ? $closestMoifier.show() : $closestMoifier.hide()
    });
    /* Hide Menu Modifiers Until Checked END */

    var $elementsToHide = $('input[name="buildingName"], input[name="buildingNumber"], input[name="floorNumber"], input[name="organizationName"], input[name="roomNumber"]');
    $elementsToHide.closest('tr').hide();

    $('.ui-res-menu-grid-item-main-controls-modalscreen-container').siblings().wrapAll('<div class="Sub-upsell-wrap" />');


    if($('.menu-page-b').length){
        $('.ui-res-menu-grid-item-modalscreen-container').children().not('.ui-res-menu-grid-item-main-controls-modalscreen-container').wrapAll('<div class="Sub-menu-wrap">');
    }

    if($('.my-order,.checkout').length){
        $('select[name=quantity]').replaceWith('<span>1</span>');
        $('button[data-tag=rw-update-order-quantity-click]').hide();
    }

    if($('.menu,.review-and-checkout').length){
        scrollHeightFunc = function(){
            var $specMenuItem = $('.overview-modalscreen-container:visible');
            var desiredHeight = $specMenuItem.height();
            var $customModalScrollAreaTarget = $specMenuItem.closest('.ui-res-menu-grid-item-main-controls-modalscreen-container').find('.config-main-controls-modalscreen-container');
            $customModalScrollAreaTarget.css('height',desiredHeight+15);
        }

        menuColumnsFunc = function(){
            $('.config-grp-values').each(function() {
                var lis = $('> div', this);
                var splitCount = lis.length / 2;
                var rounedSplitCount = Math.ceil(splitCount);
                for(var i = 0; i < lis.length; i+=rounedSplitCount) {
                    lis.slice(i, i+rounedSplitCount).wrapAll('<div class="new_wrap_li" />');
                }
            });
        }

        upsellSidebarFunc= function(){
            if(!$('.upsell-sidebar:visible').length){ 
                $('.ui-res-menu-grid-item-main-controls-modalscreen-container').after('<div class="upsell-sidebar" />');
                $('.upsell-sidebar:visible').height($('.ui-res-menu-grid-item-main-controls-modalscreen-container:visible').height());
            }
        }

        /* modal stuff here */
        $(document).on("dialogopen", ".ui-res-modal", function(event, ui) {
            $('<div class="home_store_title">MY HOME STORE LOCATION</div>').insertBefore('.my-profile .ui-res-locations-search-result-container, .confirm-wrap');
        });
        if($('.menu,.review-and-checkout').length){
            $(document).on("dialogopen", ".ui-res-modal", function(event, ui) {
                /*If store offline, redirect when clicking ok btn + background div message padding + change Our Menu title to We're Sorry + hide headerdot from next to We're Sorry*/
                if($('.ui-mres-menu-store-offline-popup-ok-btn').length){
                    $('.ui-mres-menu-store-offline-popup-ok-btn').hide();
                    $('.ui-mres-menu-store-offline-popup-ok-btn').after('<a class="ui-mres-menu-store-offline-popup-ok-custom-redirect-btn button button-1" href="/myres/locations/searchLocationsResults.jsp?offline">Ok</a>');
                    $('.ui-res-menu-grid-container').addClass('paddingLeft');
                    $('.selected-menu-category-item-title').html("We’re sorry!");
                    $('.selected-menu-category-title .headerdot').hide();
                }

                /*$('.ui-res-menu-grid-item-modalscreen-container').children().not('.ui-res-menu-grid-item-main-controls-modalscreen-container,.add-update-order').wrapAll('<div class="upsell-sidebar" />');*/

                $('.item-nutrition-facts').siblings('button').addClass('heightToggler');

                //Naples must allow us to remove jsscroll pane when neccessary to avoid jittering hack
                /*if($('.config-main-controls-modalscreen-container .jspPane').length){
              $('.config-main-controls-modalscreen-container').html($('.config-main-controls-modalscreen-container .jspPane').html());	
          }*/
                //Naples must allow to customize text max field lengths in cog as option
                if(!$('.ui-res-menu-grid-item-modalscreen-container:visible').find('.disclaimer-warning').length){
                    $('.ui-res-menu-grid-item-specialinstructions-modalscreen-container input, .ui-res-menu-grid-item-specialinstructions-container input').attr('maxlength','16').after('<div class="disclaimer-warning">If you have any allergy concerns, please call the restaurant to place your order, so that we can be sure to take the proper care in preparing your meal.</div>');
                }

                /* 
    $('.config-main-controls-modalscreen-container .expand-collapse-btn').live('click',function(){
          //Naples must allow us to remove jsscroll pane when neessary to avoid jittering hack
          if($('.config-main-controls-modalscreen-container .jspPane').length){
              $('.config-main-controls-modalscreen-container').html($('.config-main-controls-modalscreen-container .jspPane').html());	
          }
    });*/

                $('.heightToggler').live('click',function(){
                    /*scrollHeightFunc();*/
                    var nutritionFacts = $.trim($(this).siblings('.item-nutrition-facts').text());
                    if(nutritionFacts =='') { $(this).siblings('.item-nutrition-facts').text('None Available.'); }
                });
            });
        }
    }

    $('#wrap').after('<div class="clear" id="Lbckg">&nbsp;</div><div id="Rbckg">&nbsp;</div>');

    /*var $cartInfo = $('.ui-res-header-account-and-cart-navigation-my-order[data-tag=rw-my-order-click]');*/ /*Removed data-tag reference because in group orders there is no data tag*/
    var $cartInfo = $('.ui-res-header-account-and-cart-navigation-my-order');
    var cartLink = $cartInfo.attr('href');
    var cartCount = $cartInfo.find('#basketItemCountValue').text().replace(/[^0-9]/g, '');

    var $cartDisplay = $('.ui-res-header-account-and-cart-navigation-items-in-cart');
    var $cartDisplayCount = $cartDisplay.find('#ui-res-header-account-and-cart-navigation-items-in-cart-value');

    $cartDisplay.wrap('<a class="cartLink" href="'+cartLink+'">');
    $cartDisplayCount.text(cartCount);

    $('.ui-res-main-section-header').after('<div class="headerdot">&nbsp;</div>');
    /*doFindLocation = function(viewall) {

	var $errMsgContainer = $("[name=res-msg-searchLocationsCriteria-parent]");
	clearErrors($errMsgContainer);

	var $zipCode = $("#zipCode"); 
	var $stateCode = $("#stateCode"); 
	var zipCode = $zipCode.val().trim();
	var stateCode = $stateCode.val();
	var viewAllLocations = "N";
	var options = {};

	var $city = $("#city");
	var city = null;
	if ($city.length) {
		if (!$city.hasClass("activatedDefaultValue")) {
			city = $city.val();
		}
	}

	if (viewall) {
		options = {VIEW_ALL_LOCATIONS: "Y"};
		$("#viewAllLocations").val("Y");
    $zipCode.val("");
    if ($stateCode && $stateCode.length) {
      $stateCode.append("<option value=''></option>");
      $stateCode.val("");
    }
    $city.val("");
	} else if (zipCode !== null && $.trim(zipCode) !== "" && $.trim(zipCode) != "Enter Zip Code") {
		if (!doValidateZipCode()) {
			return;
		}
		options = {ZIP_CODE : $.trim(zipCode), SHOW_DISTANCE : true};
	} else if (stateCode !== null && stateCode !== "") {
		options = {STATE_CODE : stateCode, CITY : city};
	} else {
		doAddErrorMsg($.trim($("[name=res-locations-search-error-no-criteria]").html()), $errMsgContainer);
		return;
	}

	$.showPageLoadingMsg();
	var resultContainer = getSearchResultContainer();
	if (resultContainer && resultContainer.length) {
		// Locations Result Component is present, append the data to it
		resultContainer = [0].innerHTML = "";

		$.post("/myres/includes/locations/searchLocationsResultBody.jsp", 
				options, processFindLocationResult)
		.success(function() {})
		.error(function() {})
		.complete(function() {
			$.hidePageLoadingMsg();
			myresRedoTemplateLayout(resultContainer);
			window.setTimeout(function(){try { myresRedoTemplateLayout(resultContainer); } catch(e) {}}, 20);
		});
	} else {
		// Locations Result Component is not present, redirect to locations page
		var $form = $("form[name=searchLocationsCriteriaForm]");

    var _zipVal = $zipCode.val();
		if (_zipVal !== null && _zipVal.toLowerCase() == "enter zip code") {
			$zipCode.val("");
		}
    var _cityVal = $city.val();
		if (_cityVal !== null && _cityVal.toLowerCase() == "city") {
			$city.val("");
		} 

		$form[0].submit();
	}	
};
*/

    if (typeof processFindLocationResultNew !== "undefined") {
        processFindLocationResult = processFindLocationResultNew;
    }
    /*Checkout button modal fix - DISABLED TEMPORARILY AS IT MESSES UP GROUP ORDERING MODAL BUTTONS*/
    /*if(!$('body').is('.review-and-checkout')){
$('.message-container').before('<div class="modaltitle">Create Account?</div>');
$('.btns-container').insertAfter('.message'); 
}*/

    $('.ui-res-profile-login-loggedin-msg').html('<div class="diff-font">You Are Now Signed In!</div><span>To get started, please enter your ZIP code or city/state to select a restaurant location.</span>');
    $(".ui-res-order-status-container .ui-res-order-location-container .title").html("Your Location");
    $('.selected-menu-category-parent-item-title').css('display','none');
    $('.selected-menu-category-parent-item-title-separator').css('display','none');
    $('.search-locations-criteria-and-result-page-b .ui-res-main-section-header h1').html('SELECT A PICK-UP LOCATION');
    /*group order confirmation page*/
    if($('.group-order-invitation-sent').length){
        $('.ui-res-group-order-selected-store-container, .ui-res-group-order-selected-order-date-time-container, .ui-res-group-order-confirmation-number-container, .ui-res-group-order-group-name-container, .ui-res-group-order-group-name-container').wrapAll('<div class="confirm_sent_info">');
    }
});

$(window).ready(function(){

    /*MCP must allow both menus to have signin/signout - not just the cart header one*/
    /*if($('.ui-res-header-account-and-cart-navigation-sign-in:contains("Sign Out")').length){
    $('.ui-res-header-main-navigation-container li a:contains("Sign In")').hide();
    $('.ui-res-header-account-and-cart-navigation-sign-in').css('margin-right','16px');
  }*/

    if((!$('.ui-res-order-status-container.order-status').find('.container:visible').length && !$('.welcome-text-right-sidebar').length) || ($('body').is('.aboutus, .contact') && $('.location-title-container').length)){
        if($('.firstName-input').length){
            var firstName= $.trim($('.firstName-input').text());
            var displayText= '<span class="first-name-welcome-display">'+firstName+'</span>'

            } else {
                var displayText= "to Eat'n Park";
            }

        if($('body').is('.aboutus, .contact') && $('.location-title-container').length){
            var welcomeAreaText = '<div class="parent-container welcome-text-right-sidebar"><div class="container"><a class="ui-res-login-create-account" href="/myres/menu/menu.jsp">Back to menu</a></p></div></div>';
        } else {
            var welcomeAreaText = '<div class="parent-container welcome-text-right-sidebar"><div class="welcome-container container"><span class="title">Welcome '+displayText+'!</span></div><div class="container">Ready to start your order? <br>Choose your location.<p><a class="ui-res-login-create-account" href="/myres/locations/searchLocationsResults.jsp">Start Order</a></p></div></div>';
        }
        $('.ui-res-order-status-container.order-status').prepend(welcomeAreaText);
        $('.ui-res-my-account-navigation-container').find('li#MENU a').text('Start Your Order');
    }
});

$(window).load(function(){
    /*This removes the class that hides the subcategory menu item when the category is active. Naples created fix 3-11-14*/
    /*
var selectedTitle = $('.selected-menu-category-item-title').text();
var subcategoryActive = $('.subcategory .active-menu-item').text();
if (selectedTitle == subcategoryActive){
	$('.subcategory').removeClass('ui-helper-hidden');
}*/

    //Naples should hide this on edit billing page - won't work with css as they put display block important inline...
    //$('.billing-address-buildingName-container').removeAttr('style').hide();

    $('header .cartLink').show();
});


/* Additional jQuery Scripts */
/*      MCP: Used to mask inputs for phone on profile page
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

//Used to mask phone field in profile area
$(document).ready(function(){
    $('input[name="contactTelephonePrimary"]').mask("(999) 999-9999");
});
</script>
