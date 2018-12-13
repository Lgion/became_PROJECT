//FONCTIONS POUR DOCUMENT HTML-JAVASCRIPT A ACTUALISER POUR UN
function setCookie(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookies(){return document.cookie.split(';');}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
	}
	return false;
}
function checkCookie(cname){
    var user = getCookie(cname);
    if (user != false) return true
	else return false
}
function objLength(obj){var k=0;for(var i in obj)k++;return k}
function objDis(obj){var k=kk="";for(var i in obj){k+=i+"||";kk+=obj[i]};return k+"\n\n"+kk;}