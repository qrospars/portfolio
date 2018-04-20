var hauteur = 0;
var ticking = false;
var hauteur_total = window.innerHeight;
window.onload = function() {

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
    var imgs = ["Twitch.jpg\"", "Cytoo.png\"", "Lappart.png\""];
    var projects = ["'Twitch'", "'Cytoo'", "'Lappart'"];
    document.getElementById("js-work-grid-item-1").onclick = function() { // Decaler à gauche
        cpt = cpt - 1;
        for (i=1; i<=imgs.length;i++) {
            if (i == 2) { // Si l'element va etre celui du centre
                document.getElementById("js-work-grid-item-" + i).setAttribute("onclick","addOverlay(" + projects[mod((cpt+i),imgs.length)] + ")");
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/" + imgs[mod((cpt+i),imgs.length)] + ">";
            }
            else {
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/" + imgs[mod((cpt+i),imgs.length)] + ">";
            }
            console.log(-2%4);
        }
    };
    document.getElementById("js-work-grid-item-3").onclick = function() { // Decaler à droite
        cpt = cpt + 1;
        for (i=1; i<=imgs.length;i++) {
            if (i == 2) { // Si l'element va etre celui du centre
                document.getElementById("js-work-grid-item-" + i).setAttribute("onclick","addOverlay(" + projects[mod((cpt+i),imgs.length)] + ")");
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/" + imgs[mod((cpt+i),imgs.length)] + ">";
            }
            else {
                document.getElementById("js-work-grid-item-" + i).innerHTML = "<img src=\"images/" + imgs[mod((cpt+i),imgs.length)] + ">";
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
            document.getElementById("js-work-hover-text").innerHTML = "<div w3-include-html=\"pages/projects_sumUp/Cytoo.html\"></div>";
            w3IncludeHTML();
            break;
        case 'Twitch':
            document.getElementById("js-work-hover-text").innerHTML = "<div w3-include-html=\"pages/projects_sumUp/Twitch.html\"></div>";
            w3IncludeHTML();
            break;
        case 'Lappart':
            document.getElementById("js-work-hover-text").innerHTML = "<div w3-include-html=\"pages/projects_sumUp/Lappart.html\"></div>";
            w3IncludeHTML();
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
