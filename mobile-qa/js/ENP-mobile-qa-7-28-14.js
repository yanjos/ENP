<!-- Debug for Chrome LATEST 4-30-14 --><script src="/js/bootstrap.min.js" type="text/javascript"></script><script>
/*Shows and hides a stores pickup time drop downs.*/
        $('input:radio[name="showOrderDateTime"]').live('change',function(){
        var $nextAvailRadioBtn = $('#showFirstOrderDateTime');
        var $laterRadioBtn = $('#showSelectOrderDateTime');

        if ($laterRadioBtn.is(':checked')){
            $('.select-date-time-container select').show();
        }
        if ($nextAvailRadioBtn.is(':checked')){
            $('.select-date-time-container select').hide();
        }
    });
    /*Removes colon basket items on review and checkout page*/
    $('.ui-res-order-basket-items-container .total').each(function(){
         var newValue = $(this).text().replace(':', '');
         $(this).text( newValue );
    });

    $.ajaxSetup({ cache: true });
      $('.ui-res-locations-search-criteria-container, .ui-res-locations-search-result-container, .ui-res-search-locations-by-current-location-container').wrapAll('<div class="center-wrapper" />');

      $('.ui-res-order-date-time-input, .ui-res-order-status-container, .ui-res-menu-dropdown-container').wrapAll('<div class="center-wrapper" />');

    
      var $elementsToHide = $('input[name="buildingName"], input[name="buildingNumber"], input[name="floorNumber"], input[name="organizationName"], input[name="roomNumber"]');
      $elementsToHide.closest('tr').hide();
      $('input[name=country]').val('US').attr('disabled','disabled');
      


/*Modal*/
$(".menu-page-b, .review-and-checkout-page-b, .my-account-page-b, .my-favorite-orders-page-b").children().wrapAll('<div class="custom-wrapped-menu"/>');
$(document).on("dialogopen", ".ui-res-modal", function(event, ui) {
     /*Updates Special Instruction form input field to maxlength of 16 on menu and review and checkout page*/
    $('.specialInstruction-input input, .ui-res-menu-grid-item-specialinstructions-modalscreen-container input').attr('maxlength','16');

    /*Changes the Update Order button text to lower case*/
    function changeToLowerCaseFunction(btnName) {
        var newBtnLabel = $(btnName).text().toLowerCase();
        $(btnName).text(newBtnLabel);
    }

    changeToLowerCaseFunction('button.add-update-order'); 
    changeToLowerCaseFunction('button.view-update-order-modal-screen-update-btn');
    
    /*Function to replace header title of modal popup. Passes the MCP close function (modalType) and Title of modal popup (selectedCategory)*/
    function selectedCategoryToTitleFunction(selectedCategory, modalType) {
        var onclickAttr = 'closeDisplayModalScreen';
        if(modalType=='updateMenuItem'){ onclickAttr = 'doCloseEditItemDialog'; }
        $('.ui-res-menu-grid-item-main-controls-modalscreen-container .title:first').replaceWith('<div class="customCategoryTitleModal cpointer" onclick="'+onclickAttr+'(this)"> <i class="fa fa-caret-left"></i> '+ selectedCategory+'</div>'); 
    }

     if(!$('.customCategoryTitleModal, .ui-res-main-section-header').length){
        var selectedCategory = $('.selected-menu-category-item-title').html();
        selectedCategoryToTitleFunction(selectedCategory)
    }

    if($('.ui-res-update-order-item-dialog').length){
        var selectedCategory = $('.ui-res-menu-grid-item-main-controls-modalscreen-container .title').html();
        selectedCategoryToTitleFunction(selectedCategory,'updateMenuItem');
    }

    $('button:contains("Close"),.expand-collapse-title').hide();
    $('.custom-wrapped-menu').hide();

    //Chrome on iOS & Android Devices needs the variables in a certain order - otherwise ordering a menu item will not work and return a validation error for not making a selection even though we have. Otherwise, we run the normal code because if we add the currentmenuitem* classes functionality within Android breaks.  
 var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid || navigator.userAgent.match('CriOS')) {
        $('.menu-page-b .ui-dialog, .my-profile .ui-dialog').first().addClass('currentMenuItemModal');
        $('.menu-page-b .ui-dialog').not('.currentMenuItemModal').addClass('currentMenuItemAdditionalModal');

        var $this = $(this);
        $('.custom-wrapped-menu').before($this);
    //    alert('Android');
    } else {
        var $this = $(this);
        $('.custom-wrapped-menu').before($this);

        $('.menu-page-b .ui-dialog, .my-profile .ui-dialog, .my-favorite-orders-page-b .ui-dialog').first().addClass('currentMenuItemModal');
        $('.menu-page-b .ui-dialog').not('.currentMenuItemModal').addClass('currentMenuItemAdditionalModal');
       // alert('Not Android');
    }

    /*Adding Modal Title to Edit Home Store Location modal or Credit Card Removal Modal*/
    if($('.my-profile').length){
       if(!$('.errorModal .customCategoryTitleModal').length){
           $('<div class="customCategoryTitleModal cpointer">Update Home Address</div>').prependTo('.ui-res-select-home-location-dialog');
    
           $('<div class="customCategoryTitleModal cpointer">Successful Credit Card Removal</div>').prependTo('.ui-res-my-account-remove-card-popup-content');
       }
    }
    if($('.ui-res-confirm-dialog').length){
        $('.center-wrapper > .ui-res-order-status-container:first-child').append($('.ui-res-confirm-dialog .ui-res-order-location-container'));
    }

    if($('.review-and-checkout').length){
        if(!$('.cancelBtn').length){
            $('.ui-res-menu-grid-item-modalscreen-container').append('<button class="button button-1 cancelBtn" onclick="doCloseEditItemDialog(this)">Cancel</a>');
        }
    }else{
         if(!$('.bckMenuBtn').length){
            $('.ui-res-menu-grid-item-modalscreen-container').append('<a href="/myres/menu/menu.jsp?RESET_MENU=Y" class="button button-1 bckMenuBtn">Back to Menu</a>');
        }
    }
    /*Hides first modal if a second modal opens*/
    if($('.currentMenuItemAdditionalModal').length){
       $('.currentMenuItemModal').hide();
    }
    /*unbinds the original function assigned to the onclick and replaces with the newEventHandler function*/
     var originalEventHandler = function(calledFunction) { 
           closeValidateAddToCartModal(this);
     };

    var newEventHandler = function() { 
         closeValidateAddToCartModal(this);
         $('.currentMenuItemModal').show();
    };
    $('.ui-res-menuGrid-add-order-validate-error-btns button').unbind('click', originalEventHandler).click(newEventHandler);
    
    $('.customCategoryTitleModal, .cancelBtn, #ui-res-remove-favourite-order-confirmation-btn-no').live('click',function(){
        $('.currentMenuItemModal').hide();
        $('.custom-wrapped-menu').show();
    });
    /*Closes the empty basket popup on click of button and shows the menu area*/
    $('.ui-res-empty-basket-message-popup-dialog .popup-body .btns').live('click',function(){
        $('.currentMenuItemModal').hide();
        $('.custom-wrapped-menu').show(); 
    });
    $('.remove-card-ok-btn button, .ui-dialog-buttonset button').live('click',function(){
        $('.custom-wrapped-menu').show();
    });
    /*On click of the Store offline button user is redirected to the home page*/
    $('.ui-mres-menu-store-offline-popup-ok-btn').live('click',function(){
        window.location = '/';
    });
    /*Switches the state and city order on the home page*/
    $(".ui-res-locations-state-code-container").each(function() {
		var item = $(this);
		item.insertAfter(item.next());
    });
});

  $(window).load(function() {
    if($('.my-favorite-orders, .my-past-orders').length){
     //Move Add To Order Button to Needed Area so it's not stuck in a column above expanding details (My Favorite Orders/My Past Orders)
     $('.favorites-add-to-order-btn, .past-orders-add-to-order-btn').each(function(){
        var $thisOrderBtn = $(this);
        var $nextDetails = $(this).closest('ul').nextAll('.favorites-detail, .past-orders-detail').first();
        $nextDetails.after($thisOrderBtn);
     });
     //Add border as with css it does too many as the ul containing order info are not unique..
     $('.favorites-add-to-order-btn, .past-orders-add-to-order-btn').after('<div class="past-orders-favorite-orders-border"/>');

     //On click of show/hide details prevent from jumping to top
     $('.show-details-link').click(function(e){
        e.preventDefault();
     });
    }

/*Menu page*/
if($('.login').length){ //move create account button to correct place. Incorrect placement by naples.
    $('a.ui-res-login-create-account').appendTo('.ui-res-login-btn-container');
}

if($('.menu').length){
  $(document).on("dialogopen", ".ui-res-modal", function(event, ui) {
       var nutritionFacts = $('.item-nutrition-facts').text();
       if(nutritionFacts =='') { $('.item-nutrition-facts').text('None Available.'); }
  });

if ( window.location.pathname.indexOf('select_menu') >= 0 )
{
   $('.menu-img').hide();
}

if ( window.location.pathname.indexOf('add_to_cart') >= 0 )
{
   $('.menu-img').hide();
}
}

if($('.order-confirmation').length){
     /*Finds the phone number and creates a tel link*/
     var locationTel = $('.location-details-telephone span').text();
     $('.location-details-telephone').append('<a href="tel:'+ locationTel +'">(Call)</a>');
     /* $('.location-details-telephone a').attr('href','tel:' + locationTel);*/
     
     /*Replaces 'You are ordering from' text on Confirmation page*/
     $('.location-title-container .title').text('Your Location');
     
     /*Inserts the 'Start Another Order' button*/
     $('.order-confirmation .ui-res-order-confirm-store-details-body').prepend('<a class="button button-1 startNewOrder float-left" href="/myres/menu/menu.jsp?RESET_MENU=Y">Start Another Order</a>');
}

$('.my-account-page-b').children().wrapAll('<div class="sub-wrapper"/>');
/*YPA 6-2-14 temp fix for coming soon page*/
$('.comingsoon-b').children().wrapAll('<div class="sub-wrapper"/>');
/*Disables all navigation links on coming soon page*/
$('.comingsoon .navbar-inner .jqm-bolt-cart-count').attr('onclick','');
$('.comingsoon .navbar-inner a').click(function(){
        return false;
});


/*Home pg Accordion fix for MCP*/
if($('.sitehome').length){
    $('.home-page-b').children().not('.home-title, .store-hrs,.home-create-account, .ui-res-search-locations-by-current-location-container').wrapAll('<div id="accordion"/>');
    $('.home-page-b').children().wrapAll('<div class="sub-wrapper"/>');
    $('<h3>Sign In</h3>').insertBefore('.login-form');
    $('<h3>Start New Order</h3>').insertBefore('.search-location-criteria');
    $('<h3>Start Group Order</h3>').insertBefore('.group-area');
    $('.ui-res-search-locations-by-current-location-container').insertBefore('.ui-res-locations-body');
         $( "#accordion" ).accordion({
             collapsible: true,
             active: false,
             icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
         });
    //Replaces email address with MCP defined name value for logged in user
    var newNameLabel = $('.ui-res-header-login-user a').text();
    $('.ui-res-profile-login-loggedin-msg a').text(newNameLabel);
}
$('.home-create-account').insertBefore($('#accordion'));

/*Dropdown caret*/
$('.ui-res-dropdown-menu-item, .ui-res-my-account-navigation-container li, .ui-res-accordion-menu-item').append('<i class="fa fa-caret-right"></i>');

/*Adds chevron to titles*/
$('.menu-title .richtext-wrapper, .location-txt .richtext-wrapper, .account-header .richtext-wrapper, .content-title').prepend('<a href="#" onclick="javascript:window.history.back(-1);return false;" class="ui-btn go-back-chevron"><i class="fa fa-caret-left"></i></a>');

/*Adds Custom Chevron to Past orders and Favorite Orders - hard coded relative links to myaccount page*/
$('.custom-header-text-with-back').prepend('<a href="../profile/myAccount.jsp" class="ui-btn go-back-chevron"><i class="fa fa-caret-left"></i></a>');
      
/*If accordion is visible then either add a chevron with a link to menu page or search locations page*/
if(!$('.ui-res-menu-accordion-container:visible').length){
     $('.selected-menu-category-title:first').prepend('<a href="//enp-mobile.testwebhotel.microsdc.us/myres/menu/menu.jsp?RESET_MENU=Y" class="ui-btn go-back-chevron"><i class="fa fa-caret-left"></i></a>');
}else{
    $('.selected-category-description').hide();
    $('.selected-menu-category-title:first').prepend('<a href="//enp-mobile.testwebhotel.microsdc.us/myres/locations/searchLocationsResults.jsp" class="ui-btn go-back-chevron"><i class="fa fa-caret-left"></i></a>');
}

/*Navigation Menu*/
    var $navMenu = $('.ui-res-header-main-navigation-container.nav > ul:first');
    $('.nav-collapse.collapse').append($navMenu);
    $('.nav-collapse.collapse > ul').addClass('nav');
    var $custNav = $(".cust-nav");
    var $custHeader = $('.jqm-header'); 
     
    var itemsCount = myresTopNav.utils.getBagItemCount();
      $custHeader.find(".count").html(itemsCount);
    
     
    var isUserLoggedIn = myresTopNav.utils.getLoginStatus(); 

    /*if user is signed in append sign out. if user is signed out append sign in. Show my account page link. Hide Create Account link when signed in*/
     if (isUserLoggedIn) {
	  var CreateAccountLink = $('#_2911');
      var myAccountLink = '<li id="MyAccount"><a href="/myres/profile/myAccount.jsp?LAST_ACTION=LOGIN_SUCCESS">My Account</a></li>'; 
      var SignOut = '<a data-tag="rw-header-logout-click" href="#" onclick="doLogout(false, false,true); return false;" class="ui-res-header-account-and-cart-navigation-sign-in">Sign Out</a>';
      $('ul.nav').append(myAccountLink+'<li id="SignStatus">'+SignOut+'</li>');
	  $(CreateAccountLink).hide();
    } else { 
      var SignIn = '<a data-tag="rw-header-login-click" href="/myres/profile/login.jsp?redirectToUrl=/myres/profile/myAccount.jsp" class="ui-res-header-account-and-cart-navigation-sign-in">Sign In</a>';
      $('ul.nav').append('<li id="SignStatus">'+SignIn+'</li>'); 
    }
    /*user sign/signout show my account link end*/

    var checkoutLink = $('.jqm-bolt-cart-count:first').attr('href');
    $('.jqm-bolt-header').find('.fa-shopping-cart').wrap('<a href="'+checkoutLink+'" />');

        var $logOutLink = $('.ui-res-header-account-and-cart-navigation-container-nav .ui-res-header-account-and-cart-navigation-sign-in[data-tag=rw-header-logout-click]');
        if($logOutLink.length){
            $('.nav-collapse.collapse > ul > li > a:contains("Login")').replaceWith($logOutLink);
        }

        if($('.review-and-checkout').length){
            /*Hides the finishing touches and checkout form when the cart is empty*/
            var cartCount =  $('.count').html();  
            if (cartCount == 0){
                    $('.checkout-form, .finishing-touches').hide();
            }
          
            $('.checkout-form .widget-collapsable').last().addClass('placeorder').removeClass('widget-collapsable');

            $('.ui-res-order-status-container,.ui-res-order-date-time-container').not(':first').hide();

            $('.ui-res-checkout-btn-container button').live('click',function(){
	        if($.trim($('div[name=res-general-error-container]').text()) != ''){
    	            $('html,body').animate({
  			scrollTop: $('.ui-res-error-msg-item-container').offset().top
		    });
                }
	    });
            /*Moves remove button div into the edit button div*/
            $('.res-order-basket-items-remove-btn').each(function(){
                 var removeBtn = $(this);
                 removeBtn.appendTo(removeBtn.closest('.ui-res-order-basket-item-container').find('.multi-level-mods-edit'));
            });
             /*Moves total div after item div*/
            $('.total').each(function(){
                 var itemPrice = $(this);
                 itemPrice.insertAfter(itemPrice.closest('.ui-res-order-basket-item-container').find('.item-name'));
            });
            /*Custom anchors for next btns*/
            $('.checkout-form').prepend('<a name="paymentInfo"></a>');
            /*function addingNextBtn(formSection, anchorName, linkTo) {
                   var sectionTable = $('[for="'+formSection+'"]').closest('.ui-res-checkout-input-table');
                   var linkTo = $('[for="'+linkTo+'"]')
                   $('<div class="btnContainer"><a href="#'+anchorName+'" class="button button-1 nextBtn">Next</a></div>').insertAfter(sectionTable);
                   $('<a name="'+anchorName+'"></a>').insertAfter(linkTo);
                   
            } Took out - client doesn't like*/

            addingNextBtn('paymentInformationSection', 'creditCardInfo', 'creditCardInformationSection');
            addingNextBtn('creditCardInformationSection', 'billingInfo', 'billingInformationSection'); 
           /*Hides the credit card next button on load when credit card table is not showing*/
               if($('.credit-card-info-table').css('display') == 'none' ){
                     $('[href="#creditCardInfo"]').closest('.btnContainer').hide();
               }
             /*When Payment method drop down changes this toggles visibility of buttons*/
            $('[name="paymentMethod"]').change(function() {
                if($('.credit-card-info-table').css('display') == 'none' ){
                          $('[href="#billingInfo"]').closest('.btnContainer').hide();
                } else {
                         $('[href="#billingInfo"]').closest('.btnContainer').show();
                         $('[href="#creditCardInfo"]').closest('.btnContainer').show();
                } 
             });
        }

        /*Naples must fix showing menu prices in Responsive Template from hidden item-price field to avoid this hack*/
        if($('.menu').length){
            $('.menu-list-item').each(function(){
                var $localItemPrice = $(this).find('.item-price');
                var localItemPriceValue = parseFloat($localItemPrice.val()).toFixed(2);
                $localItemPrice.before('<div class="menu-list-item-price">$'+localItemPriceValue+'</div>');
            });
        }
      if($('.my-profile').length){
          var firstname1 = $('.firstName-input span').html();
          if(window.location.href.indexOf("LAST_ACTION=CREATE_ACCOUNT_SUCCESS") > -1) {
              $('.welcometxt').append('Welcome '+ firstname1);
          }else{
              $('.welcometxt').append('Welcome Back '+ firstname1);
        }
          if ($('.ui-res-msg-item-container.ui-res-info-msg-item-container').length){
              $('.account-header, .ui-res-my-account-container, .ui-res-my-account-view-btn-container, .ui-res-billing-address-info.billing-address-info, .ui-res-my-account-payment-info-container.payment-information, .ui-res-home-store-location-container').hide();
               $('li#PROFILE.active').css( "color", "#000");
               $('#PROFILE').css("cursor","pointer");
               $('.my-account-navigation-bar').css("background-color","#F9EEDC");
               $('li#PROFILE.active').live('click',function(){
	            window.location = '../profile/myAccount.jsp'
                 });
          }
          if (!$('.ui-res-msg-item-container.ui-res-info-msg-item-container').length){
               $('.welcome-txt').hide();
               $('li#PROFILE.active').hide();
          }
      }
  }); 


/*Temp fix for details link for modifiers (review & checkout)*/
$(function() {
	if($('.review-and-checkout').length){
		$('.customization').hide();
		$('<div class="cc-details-btn"><span>[+]</span>Details</div>').insertAfter('.customization');
		$('.ui-res-order-basket-items-container.module.basket-items .ui-res-order-basket-item-container').each(function(){
		
			var $localItemInfo = $(this).find('.customization');
			var $localItemDetailsBtn = $(this).find('.cc-details-btn');
			var $localItemModsBtns = $(this).find('.multi-level-mods-edit');
            var $localItemContainer = $(this).find('.info-container');
            
            $localItemModsBtns.insertAfter($localItemContainer);
            
			/*Should hide details section if multi-level-mods is not rendered.*/
			var $localDetailsContent = $(this).find('.customization .multi-level-mods');
			if (!$localDetailsContent.length){
				$localItemInfo.show();
				$localItemDetailsBtn.hide();
			} else {
				$localItemDetailsBtn.click(function() {
					$(this).prev($localItemInfo).slideToggle(400);
				}).toggle(function() {
					$(this).children("span").text("[-]");
				}, function() {
					$(this).children("span").text("[+]");
				});
			}
		});
	}
	/*Checks error message on Create Account page and removes Error string*/
	$('.ui-res-error-msg-item-container li').text(function (originalString, returnString) {
    	return returnString.replace('AxisFault Error: null | ', '');
	})
});
</script><script>
$(document).ready(function() {
/*Naples Solution to Modal Validation Breaking when ui-dialog is moved with jquery into the DOM*/
    setTimeout(function() {
      menuGridSetupPageScopeVariables && menuGridSetupPageScopeVariables();
      menuGridSetupANP && menuGridSetupANP();
      menuGridSetupANP && menuGridSetupRestrictedCategory();
      menuGridSetupMultiLevelModifiersRelatedFunctions && menuGridSetupMultiLevelModifiersRelatedFunctions();
      menuGridPreLoadMenuItem && menuGridPreLoadMenuItem();
  }, 2000);
});
</script>