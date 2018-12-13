function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (a, black, description, fr, ok, undefined, white) {
buf.push("<!DOCTYPE html><html" + (jade.attr("lang", fr, true, true)) + "><head><title>" + (jade.escape((jade_interp = a) == null ? '' : jade_interp)) + " page d'accueil du moyen de 'became' un homme meilleur</title><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta" + (jade.attr("type", description, true, true)) + " content=\"je syius une description de contenu\"><script>console.log('its just fine')</script><style>body{margin:0;}</style></head><body" + (jade.attr("style", {color:black,background:white}, true, true)) + " id=\"bod\" class=\"bod h100 ui grid\"><header id=\"header\" class=\"sixteen wide column\"><nav id=\"fildariane\"><span>Fil d'ariane</span><a href=\"/#\" title=\"Page d'accueil\" class=\"home\">homepage</a></nav><menu id=\"menu_principal\" class=\"grid ui menu\">");
var menu=[["teste",["sous"]],["teste",["sous"]],["teste",["sous"]],["teste",["sous"]]]
buf.push("<span class=\"item one wide column\"></span>");
// iterate menu
;(function(){
  var $$obj = menu;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var val = $$obj[i];

var length=i==menu.length-1?"three":"four"
buf.push("<li" + (jade.cls(['item','column','w3-teal',"" + (length) + " wide"], [null,null,null,true])) + "><a href=\"#\"><h2 class=\"t0\">" + (jade.escape((jade_interp = val[0]) == null ? '' : jade_interp)) + "</h2><img src=\"/imgs/klkchoz.jpg\" alt=\"\" title=\"\" class=\"ui avatar image abs\"><i class=\"dropdown icon br0\"></i></a><ul class=\"scrolly\">");
// iterate val[1]
;(function(){
  var $$obj = val[1];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var j = $$obj[$index];

buf.push("<li><a href=\"#\" data-bool=\"false\">" + (jade.escape((jade_interp = j) == null ? '' : jade_interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var j = $$obj[$index];

buf.push("<li><a href=\"#\" data-bool=\"false\">" + (jade.escape((jade_interp = j) == null ? '' : jade_interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var val = $$obj[i];

var length=i==menu.length-1?"three":"four"
buf.push("<li" + (jade.cls(['item','column','w3-teal',"" + (length) + " wide"], [null,null,null,true])) + "><a href=\"#\"><h2 class=\"t0\">" + (jade.escape((jade_interp = val[0]) == null ? '' : jade_interp)) + "</h2><img src=\"/imgs/klkchoz.jpg\" alt=\"\" title=\"\" class=\"ui avatar image abs\"><i class=\"dropdown icon br0\"></i></a><ul class=\"scrolly\">");
// iterate val[1]
;(function(){
  var $$obj = val[1];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var j = $$obj[$index];

buf.push("<li><a href=\"#\" data-bool=\"false\">" + (jade.escape((jade_interp = j) == null ? '' : jade_interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var j = $$obj[$index];

buf.push("<li><a href=\"#\" data-bool=\"false\">" + (jade.escape((jade_interp = j) == null ? '' : jade_interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("<div class=\"ui simple dropdown item h100 tl0 abs one wide column black\"><i class=\"plus icon\"></i><i class=\"dropdown icon\"></i><ul id=\"menusecondary\" class=\"menu\"><li class=\"item\"><a href=\"#\" title=\"\">Devenir membre/S'enregistrer</a></li><li class=\"item\"><a href=\"#\" title=\"\">Se connecter</a></li><li class=\"item dropmedown\"><a href=\"#\" title=\"Participer à l'évolution de la plateforme, et ajouter un élément à une de ses composantes\">Ajouter</a><ul><li data-data=\"cours\"><a href=\"#\" title=\"AJOUTER UN COURS (niveau&gt;filière&gt;matière&gt;sujet&gt;cours)\">AJOUTER UN COURS (niveau>filière>matière>sujet>cours)</a></li><li data-data=\"niveau\"><a href=\"#\" title=\"Ajouter : un classe scolaire, un niveau universitaire, un secteur professionnel, ou une discline quelconque\">Ajouter un niveau (élément du menu principale)</a></li><li data-data=\"filiere\"><a href=\"#\" title=\"\">Ajouter une filière (niveau>filière)</a></li><li data-data=\"matiere\"><a href=\"#\" title=\"\">Ajouter une matière (niveau>filière>matière)</a></li><li data-data=\"sujet\"><a href=\"#\" title=\"\">Ajouter un sujet (niveau>filière>matière>sujet)</a></li></ul></li></ul></div></menu></header><nav id=\"left\" class=\"one wide column purple off\"><hgroup><h3>MATIERES</h3><h3>COMPETENCES</h3><h3>TOPICS</h3></hgroup>");
var left=[{class:"snowflake icon",src:"/",alt:"tutoriel.tv mathématique etc",title:"tutoriel.tv mathématique etc",href:"#",html:"Mathématique"}]
buf.push("<output><ul>");
// iterate left
;(function(){
  var $$obj = left;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var val = $$obj[i];

buf.push("<li><a" + (jade.attr("href", "" + (val.href) + "", true, true)) + (jade.attr("title", "" + (val.title) + "", true, true)) + "><i" + (jade.cls(["" + (val.class) + ""], [true])) + "></i><img" + (jade.attr("src", "" + (val.src) + "", true, true)) + (jade.attr("alt", "" + (val.alt) + "", true, true)) + (jade.attr("title", "" + (val.title) + "", true, true)) + ">" + (jade.escape((jade_interp = val.html) == null ? '' : jade_interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var val = $$obj[i];

buf.push("<li><a" + (jade.attr("href", "" + (val.href) + "", true, true)) + (jade.attr("title", "" + (val.title) + "", true, true)) + "><i" + (jade.cls(["" + (val.class) + ""], [true])) + "></i><img" + (jade.attr("src", "" + (val.src) + "", true, true)) + (jade.attr("alt", "" + (val.alt) + "", true, true)) + (jade.attr("title", "" + (val.title) + "", true, true)) + ">" + (jade.escape((jade_interp = val.html) == null ? '' : jade_interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("</ul></output></nav><main id=\"main\" class=\"sixteen wide column scrolly\">");
var testemesuit=true
buf.push("<section id=\"main_section\"><span class=\"close close_\">X</span><form id=\"2_keyword_search_form\" method=\"POST\" action=\"/\"><label for=\"2_keyword_search\">Rechercher quelque chose par mot-clé</label><input id=\"2_keyword_search\" name=\"search\" placeholder=\"Mot-clé (tag)\"></form><hr><nav class=\"childs_fl\"><span class=\"a\"><div class=\"alphabet\"></div></span><span class=\"b\"><div class=\"alphabet\"></div></span><span class=\"c\"><div class=\"alphabet\"></div></span><span class=\"d\"><div class=\"alphabet\"></div></span><span class=\"e\"><div class=\"alphabet\"></div></span><span class=\"f\"><div class=\"alphabet\"></div></span><span class=\"g\"><div class=\"alphabet\"></div></span><span class=\"h\"><div class=\"alphabet\"></div></span><span class=\"j\"><div class=\"alphabet\"></div></span><span class=\"i\"><div class=\"alphabet\"></div></span><span class=\"k\"><div class=\"alphabet\"></div></span><span class=\"l\"><div class=\"alphabet\"></div></span><span class=\"m\"><div class=\"alphabet\"></div></span><span class=\"n\"><div class=\"alphabet\"></div></span><span class=\"o\"><div class=\"alphabet\"></div></span><span class=\"p\"><div class=\"alphabet\"></div></span><span class=\"q\"><div class=\"alphabet\"></div></span><span class=\"r\"><div class=\"alphabet\"></div></span><span class=\"s\"><div class=\"alphabet\"></div></span><span class=\"t\"><div class=\"alphabet\"></div></span><span class=\"u\"><div class=\"alphabet\"></div></span><span class=\"v\"><div class=\"alphabet\"></div></span><span class=\"w\"><div class=\"alphabet\"></div></span><span class=\"x\"><div class=\"alphabet\"></div></span><span class=\"y\"><div class=\"alphabet\"></div></span><span class=\"z\"><div class=\"alphabet\"></div></span></nav><nav class=\"tags alpha_tagname\"></nav></section>");
var testemesuit=true
buf.push("<section id=\"main_section_\"><span class=\"close close_\">X</span><form id=\"2_keyword_search_form_\" method=\"POST\" action=\"/\"><label for=\"2_keyword_search_\">Rechercher quelque chose par mot-clé</label><input id=\"2_keyword_search_\" name=\"search\" placeholder=\"Mot-clé (tag)\"></form><hr><nav class=\"childs_fl\"><span class=\"a\"><div class=\"alphabet\"></div></span><span class=\"b\"><div class=\"alphabet\"></div></span><span class=\"c\"><div class=\"alphabet\"></div></span><span class=\"d\"><div class=\"alphabet\"></div></span><span class=\"e\"><div class=\"alphabet\"></div></span><span class=\"f\"><div class=\"alphabet\"></div></span><span class=\"g\"><div class=\"alphabet\"></div></span><span class=\"h\"><div class=\"alphabet\"></div></span><span class=\"j\"><div class=\"alphabet\"></div></span><span class=\"i\"><div class=\"alphabet\"></div></span><span class=\"k\"><div class=\"alphabet\"></div></span><span class=\"l\"><div class=\"alphabet\"></div></span><span class=\"m\"><div class=\"alphabet\"></div></span><span class=\"n\"><div class=\"alphabet\"></div></span><span class=\"o\"><div class=\"alphabet\"></div></span><span class=\"p\"><div class=\"alphabet\"></div></span><span class=\"q\"><div class=\"alphabet\"></div></span><span class=\"r\"><div class=\"alphabet\"></div></span><span class=\"s\"><div class=\"alphabet\"></div></span><span class=\"t\"><div class=\"alphabet\"></div></span><span class=\"u\"><div class=\"alphabet\"></div></span><span class=\"v\"><div class=\"alphabet\"></div></span><span class=\"w\"><div class=\"alphabet\"></div></span><span class=\"x\"><div class=\"alphabet\"></div></span><span class=\"y\"><div class=\"alphabet\"></div></span><span class=\"z\"><div class=\"alphabet\"></div></span></nav><nav class=\"tags alpha_tagname\"></nav></section><article id=\"main_article\"><header><h2></h2><img src=\"\" alt=\"\" title=\"\"></header><main><video><source></video><iframe src=\"/\"></iframe><p>blablabla</p></main><footer></footer></article><hr><form id=\"main_output_form\" class=\"ui grid\"><h2 class=\"four wide column\">Choisir un cours</h2><output id=\"main_output\" for=\"main_section_\" form=\"main_output_form\" class=\"fifteen wide column ui grid scrolly\"></output><div class=\"six wide column like_menu\"><h4>Legende</h4><ul><li>blablabla</li></ul></div><div class=\"six wide column like_menu\"><h4>Filtrer les résultats</h4><div><button class=\"button\"></button></div></div><div class=\"one wide column\"><button id=\"mo_btn_fix\" title=\"accrocher le cadre à l'écran\" onclick=\"alert('do somethig')\"></button><i class=\"icon snowflake\"></i><label for=\"radio_input\"><i class=\"icon snowflake\"></i></label><div><i class=\"icon snowflake\"></i><input id=\"radio_input\" type=\"radio\" name\"radio_input></div><label for=\"radio_input_\"><i class=\"icon snowflake\"></i></label><div><i class=\"icon snowflake\"></i><input id=\"radio_input_\" type=\"radio\" name\"radio_input_></div><label for=\"checkbox_input\"><i class=\"icon snowflake\"></i></label><div><i class=\"icon snowflake\"></i><input id=\"checkbox_input\" type=\"radio\" name\"checkbox_input></div><label for=\"checkbox_input_\"><i class=\"icon snowflake\"></i></label><div><i class=\"icon snowflake\"></i><input id=\"checkbox_input_\" type=\"radio\" name\"checkbox_input_></div></div></form></main><footer>");
if ( ok)
{
buf.push("<whaaaaaat></whaaaaaat>");
}
else
{
buf.push("<heeen>, i prefer sluty durty b:tch</heeen>");
}
buf.push("<!--include:markdown ./../package.json--></footer><div id=\"modals\"></div><div><form id=\"form_cours\" action=\"/\" method=\"POST\" class=\"modal_\"></form></div></body><link href=\"/css/scss.css\" rel=\"stylesheet\"><link href=\"/css/style.css\" rel=\"stylesheet\"><link href=\"/css/style_.css\" rel=\"stylesheet\"><link href=\"/css/ad-min.css\" rel=\"stylesheet\"><link href=\"/css/w3.css\" rel=\"stylesheet\"><link href=\"/apis/ui/semantic.min.css\" rel=\"stylesheet\"><script src=\"/js/jquery.min.js\"></script><script src=\"/apis/ui/semantic.min.js\"></script><script src=\"/js/fn.js\"></script><script src=\"/js/script.js\"></script><script src=\"/js/script_.js\"></script><script src=\"/js/ad-min.js\"></script></html>");}.call(this,"a" in locals_for_with?locals_for_with.a:typeof a!=="undefined"?a:undefined,"black" in locals_for_with?locals_for_with.black:typeof black!=="undefined"?black:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"fr" in locals_for_with?locals_for_with.fr:typeof fr!=="undefined"?fr:undefined,"ok" in locals_for_with?locals_for_with.ok:typeof ok!=="undefined"?ok:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined,"white" in locals_for_with?locals_for_with.white:typeof white!=="undefined"?white:undefined));;return buf.join("");
}