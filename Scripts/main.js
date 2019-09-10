var isMobile;
var lastWindowSize;
var scrollUpdateInterval;

function getEmPixels(element) {
    "use strict";

    var documentElement = document.documentElement,
        important = "!important;",
        style = "position:absolute" + important + "visibility:hidden" + important + "width:1em" + important + "font-size:1em" + important + "padding:0" + important,
        extraBody;

    if (!element) {
        // Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
        element = extraBody = document.createElement("body");
        extraBody.style.cssText = "font-size:1em" + important;
        documentElement.insertBefore(extraBody, document.body);
    }

    // Create and style a test element
    var testElement = document.createElement("i");
    testElement.style.cssText = style;
    element.appendChild(testElement);

    // Get the client width of the test element
    var value = testElement.clientWidth;

    if (extraBody) {
        // Remove the extra body element
        documentElement.removeChild(extraBody);
    } else {
        // Remove the test element
        element.removeChild(testElement);
    }

    // Return the em value in pixels
    return value;
}

var header, headerBg, menu, menuContent, menuUl, padder, rem;

var breakpoint = 0;
const UP = 0;
const DOWN = 1;

function getElems() {
    "use strict";
    header = document.getElementsByClassName('header')[0];
    headerBg = document.getElementsByClassName('header-bg')[0];
    menu = document.getElementsByClassName('menu')[0];
    padder = document.getElementsByClassName('padder')[0];
    rem = getEmPixels();
    menuUl = document.getElementsByClassName('menu-ul')[0];
}

function scrollUpdate(e) {
    "use strict";
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shouldShrink = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) > (window.innerHeight + 7 * rem);

    if (shouldShrink) {
        if (distanceY >= 2 * rem && breakpoint == 0) {
            breakpoint = 1;
            firstBreakGoing(DOWN);
        }
        if (distanceY >= 5.5 * rem && breakpoint == 1) {
            breakpoint = 2;
            secondBreakGoing(DOWN);
        }
        if (distanceY >= 7 * rem && breakpoint == 2) {
            breakpoint = 3;
            thirdBreakGoing(DOWN);
        }
    }
    if (distanceY < 7 * rem && breakpoint == 3) {
        breakpoint = 2;
        thirdBreakGoing(UP);
    }
    if (distanceY < 5.5 * rem && breakpoint == 2) {
        breakpoint = 1;
        secondBreakGoing(UP);
    }
    if (distanceY < 2 * rem && breakpoint == 1) {
        breakpoint = 0;
        firstBreakGoing(UP);
    }
}

function firstBreakGoing(dir) {
    if (dir == UP) {
        padder.style.cssText = '';
        header.className = 'header';
    } else {
        padder.style.cssText = 'height:5rem';
        header.className = 'header small';
    }
}

function secondBreakGoing(dir) {
    if (dir == UP) {
        padder.style.cssText = 'height: 5rem';
        menu.className = 'menu';
        menuUl.style.visibility = 'visible';
    } else {
        padder.style.cssText = 'height: 10rem';
        menu.className = 'menu small';
        if (window.innerWidth <= 760) {
            menuUl.style.visibility = 'hidden';
        }
    }
}

function thirdBreakGoing(dir) {
    if (dir == UP) {
        headerBg.className = 'header-bg';
    } else {
        headerBg.className = 'header-bg active';
    }
}


function resizeUpdate() {
    wasMobile = isMobile;
    isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (wasMobile && !isMobile) {
        scrollUpdateInterval = setInterval(() => {
            scrollUpdate();
        }, 100);
    }
    else if(isMobile && !wasMobile) {
        clearInterval(scrollUpdateInterval);
        goMobile();
    }
    if (lastWindowSize > 760 && window.innerWidth <= 760) {
        if (menu.className == 'menu small') {
            menuUl.style.visibility = 'hidden'
        }
    } else if (lastWindowSize <= 760 && window.innerWidth > 760) {
        menuUl.style.visibility = 'visible'
    }
    lastWindowSize = window.innerWidth;
}

function goToPortfolio() {
    "use strict";
    if (isMobile) {
        window.scrollTo(0, 0);
        if (window.innerWidth <= 760) {
            showMenu();
        }
    } else if (document.getElementById('other').className == 'hidden') {
        window.scrollTo(0, 7 * rem);
        if (window.innerWidth <= 760) {
            showMenu();
        }
    }
    document.getElementById('other').className = 'hidden';
    document.getElementById('portfolio').className = '';
}

function goToAbout() {
    "use strict";
    if (isMobile && window.innerWidth <= 760) {
        showMenu();
    }
    document.getElementById('other').className = '';
    document.getElementById('portfolio').className = 'hidden';
}

function showMenu() {
    "use strict"
    if (menuUl.style.visibility == 'hidden') {
        menuUl.style.visibility = 'visible';
    } else {
        menuUl.style.visibility = 'hidden';
    }
}

function toggleVisibilty(el) {
    "use strict";
    if (isMobile) {
        var a, i;
        if (el.style.opacity == 1) {
            el.style.opacity = 0;
            a = el.getElementsByTagName('a');
            for (i = 0; i < a.length; i++) {
                a[i].style.visibility = 'hidden';
            }
        } else {
            el.style.opacity = 1;
            a = el.getElementsByTagName('a');
            for (i = 0; i < a.length; i++) {
                a[i].style.visibility = 'visible';
            }
        }
    }
}

function goMobile() {
    menu.className = 'menu small';
    header.className = 'header small';
    headerBg.className = 'header-bg active';
    padder.style.cssText = 'height: 3rem';
    document.getElementsByClassName('container')[0].style.cssText = 'min-height: calc(100vh - 5rem)';
}

/* menu scroll stuff */
function init() {
    "use strict";
    getElems();
    isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (isMobile) {
        goMobile();
    } else {
        scrollUpdateInterval = setInterval(() => {
            scrollUpdate();
        }, 100);
    }
    setInterval(() => {
        resizeUpdate();
    }, 100);
    document.getElementById('other').className = 'hidden';
}

window.onload = init;
