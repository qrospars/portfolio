var hauteur = 0;
var ticking = false;
var hauteur_total = window.innerHeight;
var imageFullscreen = false;
window.onload = function() {
    
    /* There is a better way to do the following: 
    I have to create an element of the desired color for each panel. It would be much more smooth. */
    function changeColor(position_scroll) {
        if ((hauteur > 2.95 * hauteur_total) ||
            (hauteur < 1.95 * hauteur_total && hauteur > 0.95 * hauteur_total)) {
            document.getElementById("home-button").style.color = "#f9f8fa";
        }
        else {
            document.getElementById("home-button").style.color = "#323232";
        }
    }

    window.addEventListener('scroll', function (e) {
        hauteur = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                changeColor(hauteur);
                ticking = false;
            });
        }
        ticking = true;
    });
    /* TODO: add the followinf to each images, but only into the description panel. I can use class names for that 
    document.getElementsByTagName("img").addEventListener('click', function(this) {
        if(!imageFullscreen) {
            this.position = "fixed";
            this.width = "100vw";
            this.height = "100vh";
        }
        else {
            this.position = "relative";
            this.width = "";
            this.height = "";
        }
        imageFullscreen = !imageFullscreen
    });
    */

    /* Script pour le "Smooth Scroll"

    Src : http://www.design-fluide.com/17-11-2013/un-defilement-anime-smooth-scroll-en-jquery-sans-plugin/

    */

    $(document).ready(function () {
        $('.js-scrollTo').on('click', function () { // Au clic sur un élément
            var page = $(this).attr('href'); // Page cible
            var speed = 750; // Durée de l'animation (en ms)
            $('html, body').animate({scrollTop: $(page).offset().top}, speed); // Go
            return false;
        });
    });


    /** WORK GRID **/
    var cpt = -1;
    var imgs = ["Twitch.jpg\"", "POCS_1.png\"", "Cytoo.png\"", "Artelia.jpg\"", "Lappart.png\""];
    var projects = ["'Twitch'", "'POCS'", "'Cytoo'","'Artelia'","'Lappart'"];
    document.getElementById("js-work-grid-item-1").onclick = function() { // Decaler à gauche
        cpt = cpt - 1;
        for (i=1; i<=imgs.length;i++) {
            if (i == 2) { // Si l'element va etre celui du centre
                document.getElementById("js-work-grid-item-" + i).setAttribute("onclick",
                    "addOverlay(" + projects[mod((cpt+i),imgs.length)] + ")");
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/"
                    + imgs[mod((cpt+i),imgs.length)] + ">";
            }
            else {
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/"
                    + imgs[mod((cpt+i),imgs.length)] + ">";
            }
            console.log(-2%4);
        }
    };
    document.getElementById("js-work-grid-item-3").onclick = function() { // Decaler à droite
        cpt = cpt + 1;
        for (i=1; i<=imgs.length;i++) {
            if (i == 2) { // Si l'element va etre celui du centre
                document.getElementById("js-work-grid-item-" + i).setAttribute("onclick",
                    "addOverlay(" + projects[mod((cpt+i),imgs.length)] + ")");
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/"
                    + imgs[mod((cpt+i),imgs.length)] + ">";
            }
            else {
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/"
                    + imgs[mod((cpt+i),imgs.length)] + ">";
            }
        }
    };


};

// Gestion de l'overlay
function addOverlay(projectName) {
    switch(projectName) {
        case 'Abzu':
            break;
        case 'Cytoo':
            document.getElementById("js-work-hover-text").innerHTML = "<div w3-include-html=\"pages/" +
                "projects_sumUp/Cytoo.html\"></div>";
            includeHTML();
            break;
        case 'Artelia':
            document.getElementById("js-work-hover-text").innerHTML = "<div w3-include-html=\"pages/" +
                "projects_sumUp/Artelia.html\"></div>";
            includeHTML();
            break;
        case 'Twitch':
            document.getElementById("js-work-hover-text").innerHTML = "<div w3-include-html=\"pages/" +
                "projects_sumUp/Twitch.html\"></div>";
            includeHTML();
            break;
        case 'Lappart':
            document.getElementById("js-work-hover-text").innerHTML = "<div w3-include-html=\"pages/" +
                "projects_sumUp/Lappart.html\"></div>";
            includeHTML();
            break;
        default:
            alert("Erreur");
    }
    document.getElementById("js-work-hover").style.transform = "translateX(30vw)";
    document.getElementById("js-overlay").style.opacity = "0.4";
    document.getElementById("js-overlay").style.zIndex = "999";
    document.getElementById("js-body").style.overflow = "hidden";
}

function removeOverlay() {
    document.getElementById("js-work-hover").style.transform = "translateX(100vw)";
    document.getElementById("js-overlay").style.opacity = "0";
    document.getElementById("js-overlay").style.zIndex = "-999";
    document.getElementById("js-body").style.overflow = "visible";
}

// SLEEP Function
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

// Function modulo qui gerre les nombres negatifs
function mod(n, m) {
    return ((n % m) + m) % m;
}

// Fonction Include W3
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}
