/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_barrio_subtheme = {
    attach: function (context, settings) {
      $(window).scroll(function () {
        $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
        if (!$('#superfish-main--2-accordion').hasClass('sf-expanded')) {
          $('#superfish-main--2-toggle').click().hide();
        }
        if (!$('#superfish-main-navigation-2--2-accordion').hasClass('sf-expanded')) {
          $('#superfish-main-navigation-2--2-toggle').click().hide();
        }
      });
      $('button.navbar-toggler').click(function () {
        if (!$('#superfish-main-accordion').hasClass('sf-expanded')) {
          $('#superfish-main-toggle').click().hide();
        }
      });
      $('button.navbar-toggler').click(function () {
        if (!$('#superfish-main-navigation-2-accordion').hasClass('sf-expanded')) {
          $('#superfish-main-navigation-2-toggle').click().hide();
        }
      });
      



    }
  };

})(jQuery, Drupal);
;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/*
 * This is not the original jQuery Superfish plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.superfish = function(op){
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          if ($$.children('.sf-clicked').length == 0){
            o.retainPath=($.inArray($$[0],o.$path)>-1);
            $$.hideSuperfishUl();
            if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
          }
        },o.delay);
      },
      getMenu = function($menu){
        var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels),
      p = o.$path;
      for (var l = 0; l < p.length; l++){
        p.eq(l).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass);
      }
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) addArrow( $(this).children('a:first-child, span.nolink:first-child') );
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();

      var $a = $('a, span.nolink',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows){
        menuClasses.push(c.shadowClass);
      }
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};

  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {opacity:'show'},
    speed: 'fast',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function(){}, // callback functions
    onBeforeShow: function(){},
    onShow: function(){},
    onHide: function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
          .children('ul').addClass('sf-hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        sh = sf.c.shadowClass+'-off',
        $ul = this.addClass(o.hoverClass)
          .children('ul.sf-hidden').hide().removeClass('sf-hidden');
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ o.onShow.call($ul); });
      return this;
    }
  });
})(jQuery);;
/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);;
/*
 * sf-Smallscreen v1.3b - Provides small-screen compatibility for the jQuery Superfish plugin.
 *
 * Developer's note:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish)
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
  */

(function($){
  $.fn.sfsmallscreen = function(options){
    options = $.extend({
      mode: 'inactive',
      type: 'accordion',
      breakpoint: 768,
      breakpointUnit: 'px',
      useragent: '',
      title: '',
      addSelected: false,
      menuClasses: false,
      hyperlinkClasses: false,
      excludeClass_menu: '',
      excludeClass_hyperlink: '',
      includeClass_menu: '',
      includeClass_hyperlink: '',
      accordionButton: 1,
      expandText: 'Expand',
      collapseText: 'Collapse'
    }, options);

    // We need to clean up the menu from anything unnecessary.
    function refine(menu){
      var
      refined = menu.clone(),
      // Things that should not be in the small-screen menus.
      rm = refined.find('span.sf-sub-indicator'),
      // This is a helper class for those who need to add extra markup that shouldn't exist
      // in the small-screen versions.
      rh = refined.find('.sf-smallscreen-remove'),
      // Mega-menus has to be removed too.
      mm = refined.find('ul.sf-multicolumn');
      for (var a = 0; a < rh.length; a++){
        rh.eq(a).replaceWith(rh.eq(a).html());
      }
      if (options.accordionButton == 2 || options.type == 'select'){
        for (var b = 0; b < rm.length; b++){
          rm.eq(b).remove();
        }
      }
      if (mm.length > 0){
        mm.removeClass('sf-multicolumn');
        var ol = refined.find('div.sf-multicolumn-column > ol');
        for (var o = 0; o < ol.length; o++){
          ol.eq(o).replaceWith('<ul>' + ol.eq(o).html() + '</ul>');
        }
        var elements = ['div.sf-multicolumn-column','.sf-multicolumn-wrapper > ol','li.sf-multicolumn-wrapper'];
        for (var i = 0; i < elements.length; i++){
          obj = refined.find(elements[i]);
          for (var t = 0; t < obj.length; t++){
            obj.eq(t).replaceWith(obj.eq(t).html());
          }
        }
        refined.find('.sf-multicolumn-column').removeClass('sf-multicolumn-column');
      }
      refined.add(refined.find('*')).css({width:''});
      return refined;
    }

    // Creating <option> elements out of the menu.
    function toSelect(menu, level){
      var
      items = '',
      childLI = $(menu).children('li');
      for (var a = 0; a < childLI.length; a++){
        var list = childLI.eq(a), parent = list.children('a, span');
        for (var b = 0; b < parent.length; b++){
          var
          item = parent.eq(b),
          path = (item.is('a') && !!item.attr('href')) ? item.attr('href') : '',
          // Class names modification.
          itemClone = item.clone(),
          classes = (options.hyperlinkClasses) ? ((options.excludeClass_hyperlink && itemClone.hasClass(options.excludeClass_hyperlink)) ? itemClone.removeClass(options.excludeClass_hyperlink).attr('class') : itemClone.attr('class')) : '',
          classes = (options.includeClass_hyperlink && !itemClone.hasClass(options.includeClass_hyperlink)) ? ((options.hyperlinkClasses) ? itemClone.addClass(options.includeClass_hyperlink).attr('class') : options.includeClass_hyperlink) : classes;
          // Retaining the active class if requested.
          if (options.addSelected && item.hasClass('active')){
            classes += ' active';
          }
          classes = (classes) ? ' class="' + classes + '"' : '';
          // <option> has to be disabled if the item is not a link.
          disable = (path == '') || (path == '#') ? ' disabled="disabled"' : '',
          // Crystal clear.
          subIndicator = 1 < level ? Array(level).join('-') + ' ' : '';
          // Preparing the <option> element.
          items += '<option value="' + path + '"' + classes + disable + '>' + subIndicator + $.trim(item.text()) +'</option>',
          childUL = list.find('> ul');
          // Using the function for the sub-menu of this item.
          for (var u = 0; u < childUL.length; u++){
            items += toSelect(childUL.eq(u), level + 1);
          }
        }
      }
      return items;
    }

    // Create the new version, hide the original.
    function convert(menu){
      var menuID = menu.attr('id'),
      // Creating a refined version of the menu.
      refinedMenu = refine(menu);
      // Currently the plugin provides two reactions to small screens.
      // Converting the menu to a <select> element, and converting to an accordion version of the menu.
      if (options.type == 'accordion'){
        var
        toggleID = menuID + '-toggle',
        accordionID = menuID + '-accordion';
        // Making sure the accordion does not exist.
        if ($('#' + accordionID).length == 0){
          var
          // Getting the style class.
          styleClass = menu.attr('class').split(' ').filter(function(item){
            return item.indexOf('sf-style-') > -1 ? item : '';
          }),
          // Creating the accordion.
          accordion = $(refinedMenu).attr('id', accordionID);
          // Removing unnecessary classes.
          accordion.removeClass('sf-horizontal sf-vertical sf-navbar sf-shadow sf-js-enabled');
          // Adding necessary classes.
          accordion.addClass('sf-accordion sf-hidden');
          // Removing style attributes and any unnecessary class.
          accordion.find('li').each(function(){
            $(this).removeAttr('style').removeClass('sfHover').attr('id', $(this).attr('id') + '-accordion');
          });
          // Doing the same and making sure all the sub-menus are off-screen (hidden).
          accordion.children('ul').removeAttr('style').not('.sf-hidden').addClass('sf-hidden');
          // Creating the accordion toggle switch.
          var toggle = '<div class="sf-accordion-toggle ' + styleClass + '"><a href="#" id="' + toggleID + '"><span>' + options.title + '</span></a></div>';

          // Adding Expand\Collapse buttons if requested.
          if (options.accordionButton == 2){
            accordion.addClass('sf-accordion-with-buttons');
            var parent = accordion.find('li.menuparent');
            for (var i = 0; i < parent.length; i++){
              parent.eq(i).prepend('<a href="#" class="sf-accordion-button">' + options.expandText + '</a>');
            }
          }
          // Inserting the according and hiding the original menu.
          menu.before(toggle).before(accordion).hide();

          var
          accordionElement = $('#' + accordionID),
          // Deciding what should be used as accordion buttons.
          buttonElement = (options.accordionButton < 2) ? 'a.menuparent,span.nolink.menuparent' : 'a.sf-accordion-button',
          button = accordionElement.find(buttonElement);

          // Attaching a click event to the toggle switch.
          $('#' + toggleID).on('click', function(e){
            // Preventing the click.
            e.preventDefault();
            // Adding the sf-expanded class.
            $(this).toggleClass('sf-expanded');

            if (accordionElement.hasClass('sf-expanded')){
              // If the accordion is already expanded:
              // Hiding its expanded sub-menus and then the accordion itself as well.
              accordionElement.add(accordionElement.find('li.sf-expanded')).removeClass('sf-expanded')
              .end().children('ul').hide()
              // This is a bit tricky, it's the same trick that has been in use in the main plugin for some time.
              // Basically we'll add a class that keeps the sub-menu off-screen and still visible,
              // and make it invisible and removing the class one moment before showing or hiding it.
              // This helps screen reader software access all the menu items.
              .end().hide().addClass('sf-hidden').show();
              // Changing the caption of any existing accordion buttons to 'Expand'.
              if (options.accordionButton == 2){
                accordionElement.find('a.sf-accordion-button').text(options.expandText);
              }
            }
            else {
              // But if it's collapsed,
              accordionElement.addClass('sf-expanded').hide().removeClass('sf-hidden').show();
            }
          });

          // Attaching a click event to the buttons.
          button.on('click', function(e){
            // Making sure the buttons does not exist already.
            if ($(this).closest('li').children('ul').length > 0){
              e.preventDefault();
              // Selecting the parent menu items.
              var parent = $(this).closest('li');
              // Creating and inserting Expand\Collapse buttons to the parent menu items,
              // of course only if not already happened.
              if (options.accordionButton == 1 && parent.children('a.menuparent,span.nolink.menuparent').length > 0 && parent.children('ul').children('li.sf-clone-parent').length == 0){
                var
                // Cloning the hyperlink of the parent menu item.
                cloneLink = parent.children('a.menuparent').clone();
                // Removing unnecessary classes and element(s).
                cloneLink.removeClass('menuparent sf-with-ul').children('.sf-sub-indicator').remove();
                // Wrapping the hyerplinks in <li>.
                cloneLink = $('<li class="sf-clone-parent" />').html(cloneLink);
                // Adding a helper class and attaching them to the sub-menus.
                parent.children('ul').addClass('sf-has-clone-parent').prepend(cloneLink);
              }
              // Once the button is clicked, collapse the sub-menu if it's expanded.
              if (parent.hasClass('sf-expanded')){
                parent.children('ul').slideUp('fast', function(){
                  // Doing the accessibility trick after hiding the sub-menu.
                  $(this).closest('li').removeClass('sf-expanded').end().addClass('sf-hidden').show();
                });
                // Changing the caption of the inserted Collapse link to 'Expand', if any is inserted.
                if (options.accordionButton == 2 && parent.children('.sf-accordion-button').length > 0){
                  parent.children('.sf-accordion-button').text(options.expandText);
                }
              }
              // Otherwise, expand the sub-menu.
              else {
                // Doing the accessibility trick and then showing the sub-menu.
                parent.children('ul').hide().removeClass('sf-hidden').slideDown('fast')
                // Changing the caption of the inserted Expand link to 'Collape', if any is inserted.
                .end().addClass('sf-expanded').children('a.sf-accordion-button').text(options.collapseText)
                // Hiding any expanded sub-menu of the same level.
                .end().siblings('li.sf-expanded').children('ul')
                .slideUp('fast', function(){
                  // Doing the accessibility trick after hiding it.
                  $(this).closest('li').removeClass('sf-expanded').end().addClass('sf-hidden').show();
                })
                // Assuming Expand\Collapse buttons do exist, resetting captions, in those hidden sub-menus.
                .parent().children('a.sf-accordion-button').text(options.expandText);
              }
            }
          });
        }
      }
      else {
        var
        // Class names modification.
        menuClone = menu.clone(), classes = (options.menuClasses) ? ((options.excludeClass_menu && menuClone.hasClass(options.excludeClass_menu)) ? menuClone.removeClass(options.excludeClass_menu).attr('class') : menuClone.attr('class')) : '',
        classes = (options.includeClass_menu && !menuClone.hasClass(options.includeClass_menu)) ? ((options.menuClasses) ? menuClone.addClass(options.includeClass_menu).attr('class') : options.includeClass_menu) : classes,
        classes = (classes) ? ' class="' + classes + '"' : '';

        // Making sure the <select> element does not exist already.
        if ($('#' + menuID + '-select').length == 0){
          // Creating the <option> elements.
          var newMenu = toSelect(refinedMenu, 1),
          // Creating the <select> element and assigning an ID and class name.
          selectList = $('<select' + classes + ' id="' + menuID + '-select"/>')
          // Attaching the title and the items to the <select> element.
          .html('<option>' + options.title + '</option>' + newMenu)
          // Attaching an event then.
          .change(function(){
            // Except for the first option that is the menu title and not a real menu item.
            if ($('option:selected', this).index()){
              window.location = selectList.val();
            }
          });
          // Applying the addSelected option to it.
          if (options.addSelected){
            selectList.find('.active').attr('selected', !0);
          }
          // Finally inserting the <select> element into the document then hiding the original menu.
          menu.before(selectList).hide();
        }
      }
    }

    // Turn everything back to normal.
    function turnBack(menu){
      var
      id = '#' + menu.attr('id');
      // Removing the small screen version.
      $(id + '-' + options.type).remove();
      // Removing the accordion toggle switch as well.
      if (options.type == 'accordion'){
        $(id + '-toggle').parent('div').remove();
      }
      // Remove inline CSS display property; less clear than simply using .show(), but respects stylesheet
      $(id).css('display', '');
    }

    // Return original object to support chaining.
    // Although this is unnecessary because of the way the module uses these plugins.
    for (var s = 0; s < this.length; s++){
      var
      menu = $(this).eq(s),
      mode = options.mode;
      // The rest is crystal clear, isn't it? :)
      if (menu.children('li').length == 0){
        // Skip empty menu which will not be visible and don't want to suddenly make it visible.
      }
      else if (mode == 'always_active'){
        convert(menu);
      }
      else if (mode == 'window_width'){
        var breakpoint = (options.breakpointUnit == 'em') ? (options.breakpoint * parseFloat($('body').css('font-size'))) : options.breakpoint,
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        timer;
        if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint){
          convert(menu);
        }
        else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
          convert(menu);
        }
        $(window).resize(function(){
          clearTimeout(timer);
          timer = setTimeout(function(){
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint){
              convert(menu);
            }
            else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
              convert(menu);
            }
            else {
              turnBack(menu);
            }
          }, 50);
        });
      }
      else if (mode == 'useragent_custom'){
        if (options.useragent != ''){
          var ua = RegExp(options.useragent, 'i');
          if (navigator.userAgent.match(ua)){
            convert(menu);
          }
        }
      }
      else if (mode == 'useragent_predefined' && navigator.userAgent.match(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i)){
        convert(menu);
      }
    }
    return this;
  }
})(jQuery);
;
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 *
 * Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
 * Special thanks to Karl Swedberg for valuable input.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */
/*
 * This is not the original jQuery Supposition plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.supposition = function(){
    var $w = $(window), /*do this once instead of every onBeforeShow call*/
    _offset = function(dir) {
      return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset']
      || document.documentElement && document.documentElement[dir=='y' ? 'scrollTop' : 'scrollLeft']
      || document.body[dir=='y' ? 'scrollTop' : 'scrollLeft'];
    },
    onHide = function(){
      this.css({bottom:''});
    },
    onBeforeShow = function(){
      this.each(function(){
        var $u = $(this);
        $u.css('display','block');
        var $mul = $u.closest('.sf-menu'),
        level = $u.parents('ul').length,
        menuWidth = $u.width(),
        menuParentWidth = $u.closest('li').outerWidth(true),
        menuParentLeft = $u.closest('li').offset().left,
        totalRight = $w.width() + _offset('x'),
        menuRight = $u.offset().left + menuWidth,
        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;
        if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
          if (menuParentLeft < exactMenuWidth) {
            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)){
              $u.css({left:0,right:'auto'});
            }
            else {
              $u.css({left:menuParentWidth + 'px',right:'auto'});
            }
            $u.parent().addClass('sf-supposition-active');
          }
        }
        else {
          if (menuRight > totalRight && menuParentLeft > menuWidth) {
            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)){
              $u.css({right:0,left:'auto'});
            }
            else {
              $u.css({right:menuParentWidth + 'px',left:'auto'});
            }
            $u.parent().addClass('sf-supposition-active');
          }
        }
        var windowHeight = $w.height(),
        offsetTop = $u.offset().top,
        menuParentShadow = ($mul.hasClass('sf-shadow') && $u.css('padding-bottom').length > 0) ? parseInt($u.css('padding-bottom').slice(0,-2)) : 0,
        menuParentHeight = ($mul.hasClass('sf-vertical')) ? '-' + menuParentShadow : $u.parent().outerHeight(true) - menuParentShadow,
        menuHeight = $u.height(),
        baseline = windowHeight + _offset('y');
        var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
        if (expandUp) {
          $u.css({bottom:menuParentHeight + 'px',top:'auto'});
        }
        $u.css('display','none');
      });
    };

    return this.each(function() {
      var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

      /* if callbacks already set, store them */
      var _onBeforeShow = o.onBeforeShow,
      _onHide = o.onHide;

      $.extend($.fn.superfish.o[this.serial],{
        onBeforeShow: function() {
          onBeforeShow.call(this); /* fire our Supposition callback */
          _onBeforeShow.call(this); /* fire stored callbacks */
        },
        onHide: function() {
          onHide.call(this); /* fire our Supposition callback */
          _onHide.call(this); /* fire stored callbacks */
        }
      });
    });
  };
})(jQuery);;
/*
 * Supersubs v0.4b - jQuery plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($){ // $ will refer to jQuery within this closure
  $.fn.supersubs = function(options){
    var opts = $.extend({}, $.fn.supersubs.defaults, options);
    // return original object to support chaining
    // Although this is unnecessary due to the way the module uses these plugins.
    for (var a = 0; a < this.length; a++) {
      // cache selections
      var $$ = $(this).eq(a),
      // support metadata
      o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      // Jump one level if it's a "NavBar"
      if ($$.hasClass('sf-navbar')) {
        $$ = $$.children('li').children('ul');
      }
      // cache all ul elements
      var $ULs = $$.find('ul');
      if ($ULs.length) {
        // get the font size of menu.
        // .css('fontSize') returns various results cross-browser, so measure an em dash instead
        var fontsize = $('<li id="menu-fontsize">&#8212;</li>'),
        size = fontsize.attr('style','padding:0;position:absolute;top:-99999em;width:auto;')
        .appendTo($$)[0].clientWidth; //clientWidth is faster than width()
        // remove em dash
        fontsize.remove();

        // loop through each ul in menu
        for (var b = 0; b < $ULs.length; b++) {
          var
          // cache this ul
          $ul = $ULs.eq(b);
          // If a multi-column sub-menu, and only if correctly configured.
          if (o.multicolumn && $ul.hasClass('sf-multicolumn') && $ul.find('.sf-multicolumn-column').length > 0){
            // Look through each column.
            var $column = $ul.find('div.sf-multicolumn-column > ol'),
            // Overall width.
            mwWidth = 0;
            for (var d = 0; d < $column.length; d++){
              resize($column.eq(d));
              // New column width, in pixels.
              var colWidth = $column.width();
              // Just a trick to convert em unit to px.
              $column.css({width:colWidth})
              // Making column parents the same size.
              .parents('.sf-multicolumn-column').css({width:colWidth});
              // Overall width.
              mwWidth += parseInt(colWidth);
            }
            // Resizing the columns container too.
            $ul.add($ul.find('li.sf-multicolumn-wrapper, li.sf-multicolumn-wrapper > ol')).css({width:mwWidth});
          }
          else {
            resize($ul);
          }
        }
      }
    }
    function resize($ul){
      var
      // get all (li) children of this ul
      $LIs = $ul.children(),
      // get all anchor grand-children
      $As = $LIs.children('a');
      // force content to one line and save current float property
      $LIs.css('white-space','nowrap');
      // remove width restrictions and floats so elements remain vertically stacked
      $ul.add($LIs).add($As).css({float:'none',width:'auto'});
      // this ul will now be shrink-wrapped to longest li due to position:absolute
      // so save its width as ems.
      var emWidth = $ul.get(0).clientWidth / size;
      // add more width to ensure lines don't turn over at certain sizes in various browsers
      emWidth += o.extraWidth;
      // restrict to at least minWidth and at most maxWidth
      if (emWidth > o.maxWidth) {emWidth = o.maxWidth;}
      else if (emWidth < o.minWidth) {emWidth = o.minWidth;}
      emWidth += 'em';
      // set ul to width in ems
      $ul.css({width:emWidth});
      // restore li floats to avoid IE bugs
      // set li width to full width of this ul
      // revert white-space to normal
      $LIs.add($As).css({float:'',width:'',whiteSpace:''});
      // update offset position of descendant ul to reflect new width of parent.
      // set it to 100% in case it isn't already set to this in the CSS
      for (var c = 0; c < $LIs.length; c++) {
        var $childUl = $LIs.eq(c).children('ul');
        var offsetDirection = $childUl.css('left') !== undefined ? 'left' : 'right';
        $childUl.css(offsetDirection,'100%');
      }
    }
    return this;
  };
  // expose defaults
  $.fn.supersubs.defaults = {
    multicolumn: true, // define width for multi-column sub-menus and their columns.
    minWidth: 12, // requires em unit.
    maxWidth: 27, // requires em unit.
    extraWidth: 1 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
  };
})(jQuery); // plugin code ends
;
/**
 * @file
 * The Superfish Drupal Behavior to apply the Superfish jQuery plugin to lists.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * jQuery Superfish plugin.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior to an applicable <ul> element.
   */
  Drupal.behaviors.superfish = {
    attach: function (context, drupalSettings) {
      // Take a look at each menu to apply Superfish to.
      $.each(drupalSettings.superfish || {}, function (index, options) {
        var $menu = $('ul#' + options.id, context);

        // Check if we are to apply the Supersubs plug-in to it.
        if (options.plugins || false) {
          if (options.plugins.supersubs || false) {
            $menu.supersubs(options.plugins.supersubs);
          }
        }

        // Apply Superfish to the menu.
        $menu.superfish(options.sf);

        // Check if we are to apply any other plug-in to it.
        if (options.plugins || false) {
          if (options.plugins.touchscreen || false) {
            $menu.sftouchscreen(options.plugins.touchscreen);
          }
          if (options.plugins.smallscreen || false) {
            $menu.sfsmallscreen(options.plugins.smallscreen);
          }
          if (options.plugins.supposition || false) {
            $menu.supposition();
          }
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
