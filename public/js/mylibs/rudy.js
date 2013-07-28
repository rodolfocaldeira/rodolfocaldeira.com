/**
 * The application scripts file.
 * version : 0.1.0
 * date    : 2011-10-08
 * author : Rodolfo Caldeira, me@rodolfocaldeira.com
 **/
(function(window,document,undefined) {

    if(typeof rudy == "undefined" || !rudy) {
      window.rudy = {};
    };
    
    var rudy = window.rudy;
    
    rudy.Application = function(options) {
        
        /**
         * The default options.
         **/
        var o = {
            scrollingEl : 'body',
            scrollingY : 100,
            scrollingInterval : 1300,
            headEl : '#head'
        };
        
        $.extend(o, options);
        
        /** 
         * The scrolling timer used in the scrolling background effect.  
         **/
        var scrollingTimer = null;
        
        /**
         * The initial vertical background position.
         **/
        var scrollingPosition = -100;
        
        /**
         * Scrolling background effect. 
         **/
        var scrollingBackground = function() {
            $(o.scrollingEl).css('background-position','0px ' + scrollingPosition + 'px');
            scrollingPosition = scrollingPosition - 10;
        };
        
        /**
         * Starts the scrolling background effect.
         **/ 
        var startScrollingBackground = function() {
            scrollingTimer = setInterval(scrollingBackground, o.scrollingInterval);
        };
        
        /**
         * The head
         **/
        var head = $(o.headEl);
        
        /**
         * Indicates if the head has shrunk.
         **/
        var headShrunk = false;
        
        /**
         * Makes my head spin around.
         **/
        var spinningHead = function() {
            $(window).scroll(function(e) {
                var top = $(document).scrollTop(),
                    rotate = {
                        '-webkit-transform' : 'rotate(' + top + 'deg)',
                        '-moz-transform'    : 'rotate(' + top + 'deg)',
                        '-ms-transform'     : 'rotate(' + top + 'deg)',
                        '-o-transform'      : 'rotate(' + top + 'deg)',
                        'transform'         : 'rotate(' + top + 'deg)'
                    };
                head.css(rotate);
            });
        };
        
        /**
         * Shows my head.
         **/
        var showHead = function() {
            head.animate(
                { opacity : 1 },
                3000,
                'swing'
            );
        };
        
        /**
         * Makes my head rumble on mouseover.
         **/
        var headRumble = function() {
            head.jrumble({
             rangeX: 2,
             rangeY: 2,
             rangeRot: 1
            });
        };
        
        /**
         * On click flips the head.
         * Thank you for this Chris http://css-tricks.com/snippets/css/flip-an-image/
         **/ 
        var flipHead = function() {
            head.click(function(event) {
                $(this).toggleClass('flipped');
            });
        };
        
        /**
         * Returns the grow/shrink head properties.
         **/
        var getGrowShrinkProperties = function() {
            var grow = { 
                    width : '60%',
                    left  : '50px',
                    top   : '50px'
                },
                shrink = {
                    width : '25%',
                    left  : '100px',
                    top   : '140px'                    
                };
            
            if(headShrunk) {
                return grow;
            }
            return shrink;
        };
        
        /**
         * Grows my head effect.
         **/
        var growHead = function() {
            head.click(function(event) {
                head.animate(
                    getGrowShrinkProperties(),
                    1000,
                    'swing',
                    function() {
                        headRumble();
                        headShrunk = !headShrunk;
                    }
                );
            });
        };
        
        /**
         * Hide the head on click.
         **/
        var hideHead = function() {
            head.click(function(event) {
                head.fadeOut('slow');
            });
        };
        
        /**
         * To call when the dom is ready.
         **/
        var domReady = function() {
            // startScrollingBackground();
            // spinningHead();
            showHead();
            headRumble();
            // flipHead();
            // growHead();
            hideHead();
        };
        
        var publicMethods = {
          domReady : domReady
        }
        
        return publicMethods;
    };
})(this,document);