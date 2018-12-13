function editFailed(x){alert('dsl, erruer')};function seeP(x,y){var z=new Array();var bool=true;x=x.childNodes;for(var i=0;i<x.length;i++)if(x[i]!=y&&x[i].nodeName!='#text'&&x[i].nodeName!='SPAN'&&x[i].id!='restoreAjax')z[z.length]=x[i];x=z;for(var i=0;i<x.length;i++){var xx=x[i];if(x[i].hasAttribute('class'))if(x[i].className.indexOf('see')!=-1){removeClass(x[i],'see');bool=false;if(i==x.length-1)addClass(x[0],'see');else addClass(x[i+1],'see');i=1000}}if(bool){getClass(x[1],'see')}};function seeN(x,y){var z=new Array();var bool=true;x=x.childNodes;for(var i=0;i<x.length;i++)if(x[i]!=y&&x[i].nodeName!='#text'&&x[i].nodeName!='SPAN'&&x[i].id!='restoreAjax')z[z.length]=x[i];x=z;for(var i=0;i<x.length;i++){var xx=x[i];if(x[i].hasAttribute('class'))if(x[i].className.indexOf('see')!=-1){removeClass(x[i],'see');bool=false;if(i==x.length-1)addClass(x[0],'see');else addClass(x[i+1],'see');i=1000}}if(bool){alert('ok');getClass(x[1],'see')}};function see(x,y){if(clas('see',x.parentNode).length!=0)if(typeof(y)=='undefined')removeClass(clas('see',x.parentNode)[0],'see');addClass(x,'see')};function clickover(x,y,z,zz){if(typeof zz!='undefined')var cpt='x.'+zz+'='+z+';';else if(typeof z!='undefined'&&!z.match('function'))var cpt='x.'+z+'=';tmp=y;y.onmousedown=function(){this.style.zIndex=-1};y.onmouseout=function(){this.setAttribute('style')};if(typeof z!='undefined'){if(typeof zz!='undefined')eval(cpt);else if(x.onclick!=null){x.onmouseup=z}if(!z.match('function'))eval(cpt+'x.onclick;')}else x.onmouseup=x.onclick;x.onclick=''};function addCss(x,y,z){if(typeof y=='string')if(typeof z=='undefined'){getCss(x,x.style.cssText+y)}else{getCss(x,x.style.cssText+y+':'+z+';')}else{var cpt='';for(var i=0;i<y.length;i++)cpt+=y[i]+':'+z[i]+';';getCss(x,x.style.cssText+cpt)}};function getCss(x,y){x.setAttribute('style',y)};function cleanCsss(x){try{if(typeof x.match(/html.*/))x.style.cssText=''}catch(e){for(var i=0;i<x.length;i++)x[i].style.cssText=''}};function cleanCss(x){x.removeAttribute('style')};function removeCss1(x,y){y=x.cssText.exec(y);y=x.cssText.substring(0,y)+x.cssText.substring(x.indexOf(y)+y.length)};function removeCss(x,y){y=y.split('!');for(var i=0;i<y.length;i++)if(x.style.cssText.indexOf(y[i])!=-1){var cpt=x.style.cssText.indexOf(y[i]);var c=x.style.cssText;var k=0;while((a=x.style.cssText.substring(cpt+y[i].length+k,cpt+y[i].length+k+1))!=';')k++;k++;var cptbis=cpt+y[i].length+k;x.style.cssText=x.style.cssText.substring(0,cpt)+x.style.cssText.substring(cptbis)}else alert(x.style.cssText.indexOf(y[y.length-1])+'\n'+y[y.length-1]+'\n'+x.style.cssText)};function gid(x){if(typeof x=='string')if(typeof document.getElementById(x)!='undefined')return document.getElementById(x);else{toast(x+" n'est pas un id du document html");return false}else{alert("x n'est pas de type string");return false}};function gID(x){if(typeof x=='string')if(typeof document.getElementById(x)!='undefined')return document.getElementById(x);else{toast(x+" n'est pas un id du document html");return false}else{alert("x n'est pas de type string");return false}};function getH(x,y){if(typeof(y)=='undefined'){return document.createElement(x);}else{x.innerHTML="";addH(x,y);}};function getHtml(y){y=document.createElement(y);return y};function crushHtml(x,y){if(typeof y=='string')y=document.createElement(y);if(typeof x=='string'){alert(x);$(x).innerHTML='';$(x).appendChild(y)}else{x.innerHTML='';x.appendChild(y)}if(typeof z=='undefined')return y};function getText(x,y){x.innerHTML=y};function _getText(x,y){x.innerHTML=y;return x;};function addText(x,y){x.innerHTML+=y};function getId(x,y){x.className=y};function addId(x,y){x.className+=' '+y};function getClass(x,y){x.className=y};function addClass(x,y){x.className+=' '+y};function clearHtml(x){x.innerHTML='';x.removeAttribute('style')};function clearhtmlLevel(x){for(var i=0;i<x.childNodes.length;i++)if(!x.childNodes[i].nodeName.match('#.*')){x.childNodes[i].innerHTML='';x.childNodes[i].removeAttribute('style')}};function getId(x,y){x.id=y};function preSib(x,y){if(typeof(y)!='undefined'){while(x.previousSibling.nodeName!=y.toUpperCase())if(x.previousSibling.nodeName=='#text')x=x.previousSibling.previousSibling;else x=x.previousSibling;return x.previousSibling}else{while(EV(x.previousSibling))if(x.previousSibling.nodeName=='#text')x=x.previousSibling;return x.previousSibling}};function nexSib(x,y){var xx=x;if(EV(y)){while(EV(xx.nextSibling)){if(xx.nextSibling.nodeName!=y.toUpperCase())xx=xx.nextSibling;else{x=xx;xx=xx.parentNode.lastChild}return x}}else{while(EV(xx.nextSibling)){if(xx.nextSibling.nodeName=='#text')xx=xx.nextSibling;else{x=xx.nextSibling;xx=xx.parentNode.lastChild}}alert(x);return x}};function tag(x,y){if(typeof y=='undefined')return document.getElementsByTagName(x);else return y.getElementsByTagName(x)};function clas(x,y){if(typeof y=='undefined')return document.getElementsByClassName(x);else return y.getElementsByClassName(x)};function close(x,y,z){addHtml(x,'span','X','class==closeit!!title==fermer');plus.getElementsByClassName('closeit')[0].addEventListener("click",function(event){alert('lmkml');this.param1.className='';this.param1.innerHTML=''},false)};function closeit_(x,y){addHtml(x,'span','X','class==closeit!!onclick==unsee(this.parentNode)')};function closeit(x){addH(x,'span','X','class==closeit!!onclick==unsee(this.parentNode)')};function closee(x,y,z,zz){x.innerHTML='';addHtml(x,'span','X','class==closeit!!title==fermer');x.firstChild.onclick=function(){alert('o');if(typeof x=='string'){$(x).innerHTML='';if(typeof $(y)!='undefined'){if(typeof z=='undefined')$(y).style.display='none';else eval(z)}if(typeof zz!='undefined'){if(zz=='both'){$(x).parentNode.removeChild($(x));$(y).parentNode.removeChild($(y))}if(zz=='close')$(x).parentNode.removeChild($(x))}}else{x.innerHTML='';if(typeof y!='undefined'){if(typeof z!='undefined')eval(z);else y.style.display='none'}if(typeof zz!='undefined'){if(zz=='both'){x.parentNode.removeChild(x);y.parentNode.removeChild(y)}if(zz=='close')x.parentNode.removeChild(x)}}}};function toast(x,y,z){if(!EV(z)){z=tag('body')[0]}var a=document.createElement('div');a.id='restoreAjax';addAtt(a,'style==position:fixed;box-sizing:border-box;overflow:hidden;');if(EV(y)&&!EV(z)){var toast_id="toast"+y;switch(y){case 0:addAtt(a,'id==restoreAjax!!class=='+toast_id);break;default:break}}else{if(EV(y))if(y==-1||y==""){if(typeof z=='number')var zz=z;else toast('param z n est pas un number')}if(!EV(zz))var zz=5000;var toast_id="toast";addAtt(a,'id==restoreAjax!!class==toast');tag('body')[0].insertBefore(a,tag('body')[0].firstChild)}getText(a,x);setTimeout(function(){tag('body')[0].removeChild(clas('toast')[0])},zz)};function EV(x){if(typeof(x)!='undefined'&&x!==null)return true;else return false};function EVS(x){if(typeof(x)=='string')return true;else return false};function EVO(x){if(typeof(x)=='object')return true;else return false};function EVN(x){if(typeof(x)=='number')return true;else return false};function EVE(x){if(typeof(x)=='string')if(x.length==0)return true;else return false};function EVI(x,y){if(typeof(x)=='string'&&typeof(y)=='string')if(x.indexOf(y)!=-1)return true;else return false};function _EVI(x,y){if(typeof(x)=='string'&&typeof(y)=='string')if(x.indexOf(y)!=-1)return x.indexOf(y);else return false};

//changed functions
function removeClass(x,y){var a=y.split(" ");for(var i=0;i<a.length;i++)x.className=x.className.replace(a[i],"").replace('  ',' ');};
function rmvClass(x,y){var a=y.split(" ");for(var i=0;i<a.length;i++)x.className=x.className.replace(a[i],"").replace('  ',' ');};
//*
//added
function addClass_(x,y){if(x.className.indexOf(y)==-1)addClass(x,y);};//il manque a changer le y en array avec un split(' ') (sur les caractères "espaces"), puis boucler le résultat sur la condition là
function hClass(x,y){alert("cette fonction est a amélioréer\r\nil faut vérifier que l'occurence trouvé correspond à un mot entier et pas un portion d'un mot entier");
if(x.className.indexOf(y)!="undefined")return true;else return false;
}
function hClass_(x,y){//La meme fonciton que hClass mais sans rechercher si l'occurence trouvé est un mot entier ou non
if(x.className.indexOf(y)!=-1)return true;else return false;
}
function for_(x){alert('avec les cours mobile sur js, faire une fonction sur la boucle for (puis while) intéressante et avec des variante');}
//*



function rmvH(x){if(typeof x!="undefined")x.parentNode.removeChild(x);}

/*cut-copy from admin.js to here*/
function EV(x,y) {if(typeof(y)!='undefined'){if(typeof x[y]!="undefined")return true;else return false;}else if(typeof(x)!='undefined'&&x!==null)return true;else return false;};
function EVS(x) {if(typeof(x)=='string')return true;else return false;};
function EVE(x) {if(typeof(x)=='string')if(x.length==0)return true;else return false;};
function EVO(x) {if(typeof(x)=='object')return true;else return false;};
function EVN(x) {if(typeof(x)=='number')return true;else return false;};
function EVF(x) {if(typeof(x)=='function')return true;else return false;};
function EVI(x,y) {if(typeof(x)=='string'){if(typeof(y)=='string')y[0]=y;for(var i=0;i<y.length;i++){if(x.indexOf(y[i])!=-1)return true;} return false;}		};
function _EVI(x,y) {if(typeof(x)=='string'&&typeof(y)=='string')if(x.indexOf(y)!=-1)return x.indexOf(y);else return false;};
//function TO(x) {if(typeof(x)!='undefined')return true;else return false;};
function EV_(x,y) {if(EVS(y)){if(EV(x[y]))return x[y];else return false;}};
function addAtt(x,y){	
					if(EVO(y)){for(var a in y)if(y.hasOwnProperty(a))
							if(a.substring(0,2)=='on'){
									if(EVS(y[a])){
											// alert(EVI(y[a],[';','alert(','prompt('])+"\r\n"+y[a]);
											if(!EVI(y[a],[';','alert(','prompt(']))var c=eval("typeof("+y[a]+")");
											else var c="";
											// if(c!="function"){
													// if(y[a].substring(y[a].length-1)!=';')y[a]=y[a]+';';
													// y[a]="function(){"+y[a]+"};";
											// }
											y[a]="var g="+y[a];
											// alert(y[a]);
											eval(y[a]);
											y[a]=g;
											// alert(y[a]+"\r\n"+g);
									}
									if(EVF(y[a])){	
											// alert("y[a] "+y[a]);
											x.addEventListener(a.substring(2), y[a], false);
									}else alert('erreur');
							}else{x.setAttribute(a,y[a]);}
							// }else{alert(a+" a\r\ny[a]"+y[a]);x.setAttribute(a,y[a]);}
					}
					if(EVS(y)){for(var i=0;i<y.split('!!').length;i++)x.setAttribute(y.split('!!')[i].split('==')[0],y.split('!!')[i].split('==')[1]);}
}

function addH(x,y,z,zz,xy,xz){
	// alert("lmlllmk");
	if(EVS(x))if(EV(gID(x)))x=gID(x);else if(EV(document.createElement(x)))x=document.createElement(x);else toast("l'élément x n'est pas valide");
	//	Dans y, on peut spécifier un #identifiannt conteneur en indiquant un # en début
	//	Il permet de spécifier un #identifiant au lieu d'un nom de conteneur comme par défaut
	if(EVS(y))if(y.indexOf('#')==0)y=gID(shiftS(y));else y=document.createElement(y);
	
	x.appendChild(y);
	
	if(!EV(z)){return y;}else if(z!=''||z!='*'){addText(y,z);}else return;
	if(!EV(zz))return y;else if(zz!=''||zz!='*'){	addAtt(y,zz);}else return;
	if(!EV(xy)){return y;}else if(EVO(xy)){var tmp='';var yx={};var yy={};	for(var a in xy){if(!EVI(a,'data-')){		if(a.substring(0,2)=='on')yy[a]=xy[a];		else yx['data-'+a]=xy[a];}else 		{yx[a]=xy[a];}}addAtt(y,yx);		_addAtt(y,yy);paramCLASS(y);}
	if(!EV(xz)){return y;}else {alert('noReturnValue');return ;}
	// alert('end');
}
function _addH(x,y,z,zz,xy,xz){
	// alert("lmlllmk");
	if(typeof x=='string')if(EV(gID(x)))x=gID(x);else if(EV(document.createElement(x)))x=document.createElement(x);else toast("l'élément x n'est pas valide");
	if(typeof y=='string')if(y.indexOf('#')!=-1)y=gID(shiftS(y));else y=document.createElement(y);
	
	x.appendChild(y);
	
	if(!EV(z)){return x;}else if(z!=''||z!='*'){addText(y,z);}else return;
	if(!EV(zz))return x;else if(zz!=''||zz!='*'){	addAtt(y,zz);}else return;
	if(!EV(xy)){return x;}else if(EVO(xy)){var tmp='';var yx={};var yy={};	for(var a in xy){if(!EVI(a,'data-')){		if(a.substring(0,2)=='on')yy[a]=xy[a];		else yx['data-'+a]=xy[a];}else 		{yx[a]=xy[a];}}addAtt(y,yx);		_addAtt(y,yy);paramCLASS(y);}
	if(!EV(xz)){return x;}else {alert('noReturnValue');return ;}
	// alert('end');
}

function ajaxm(fonction,fichierphp,jsondata,settins){
	function submitForm()
{ 
  var xhr=createXHR();
  xhr.open("GET", "ajax-get.txt",true);
  xhr.onreadystatechange=function()
  { 
    if(xhr.readyState == 4)
    {
      document.getElementById("zone").innerHTML= xhr.responseText;	
    } 
  }; 
  xhr.send(null); 
}
}
function ajaxme(fonction,fichierphp,jsondata,settins){
		// alert(is_array(settins));
		//EXEMPLE D'UTILISATION
		// ajaxme(function(a){okk(a);},'./../creation.php','jesuisla&paslaenmemetemps',{'method':'GET'});

		if(!EV(settins)){var method="POST";settin1="Content-Type";settin2="application/x-www-form-urlencoded";
		// if(!EV(settins)){var method="POST";settin1="Content-Type";settin2="application/json; Charset=UTF-8";
		}else{	if(!EV(settins['method']))	var method="POST";else method=settins['method'];
				if(EV(settins['setting']))	
						if(is_array(settins['setting'])){	var settin1=settins['setting'][0];	var settin2=settins['setting'][1];	
						}else{	settin1="Content-Type";settin2="application/json; Charset=UTF-8";	}
				else{settin1="Content-Type";settin2="application/json; Charset=UTF-8";}
		}
		var tmp="";
		for(a in jsondata)if(jsondata.hasOwnProperty(a))tmp+=a+"="+jsondata[a]+"&";
		tmp=popS(tmp,'');
		// alert(method+settin1+"\r\n"+settin2+"tmp = "+tmp);
		var xhr = new XMLHttpRequest(); 
		xhr.onload = function(bi) {	//	alert("kok");	
		};
		xhr.onreadystatechange = function(bi) {
				//	alert(xhr.status+"OK"+fonction+fichierphp);
				// 	if (xhr.readyState == 1) {	fonction(xhr)	}
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
						// alert("KOK"+xhr.responseText);
						fonction(xhr);
				}
		};
		// alert(method);
		xhr.open(method, fichierphp);
		xhr.setRequestHeader(settin1, settin2);
		// xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(tmp);
}
function ajaxxme(fonction,fichierphp,requete,z){
		var create='';var complete='';var interactive='';var loaded='';var loading='';var success='';var uninitialized='';var xyz='';
		for(var i=0;i<fonction.length;i=i+2)
				switch(fonction[i]){
					case'onCreate':create=fonction[i+1];break;
					case'onComplete':complete=fonction[i+1];break;
					case'onInteractive':interactive=fonction[i+1];break;
					case'onLoaded':loaded=fonction[i+1];break;
					case'onLoading':loading=fonction[i+1];break;
					case'onSuccess':success=fonction[i+1];break;
					case'onUninitialized':uninitialized=fonction[i+1];break;
					case'onXYZ':xyz=fonction[i+1];break;
					default:break
				}
		var url=fichierphp;var pars=requete;
		var myAjax=new Ajax.Request(url,{
									method:'post',
									postBody:pars,
									onCreate:create,onComplete:complete,onInteractive:interactive,onLoaded:loaded,onloading:loaded,onSuccess:success,onFailure:editFailed,onUninitialized:uninitialized,onXYZ:xyz,
									}
							)
};
function _tag(x,y,z){
		if(typeof y=='undefined')
				x= document.getElementsByTagName(x);
		else x= y.getElementsByTagName(x);
		if(typeof z=="undefined")return x;
		else{
				if(z=="_")	return properArray(x);
				else		
						for(var a in x)if(x.hasOwnProperty(a))if(!isNaN(parseInt(a)))if(a==z) return properArray(x[a]);
				//	typeof z == int
						
		}
};

function affich_a(x,y,z){if(typeof z!="undefined"){
		
		// if(typeof(x[y])=="undefined")x[y]=
		
}else alert('erreur, fill_L() doit avoir 3 paramètres ! ! !');		
}
function _affich_l(x,y,z){if(typeof x=="object"){	var cpt="\r\n\r\n";
		for(var a in x)	if(x.hasOwnProperty(a))if(typeof x[a]=="object")cpt+=a+" :\r\n "+affich_l_(x[a])+"\r\n";else cpt+=a+" :    "+x[a]+"\r\n\r\n\r\n";
		return cpt;
}else alert('erreur, x nest pas un objet '+typeof x);		
}
function affich_l(x,y,z){if(typeof x=="object"){	var cpt="\r\n\r\n";
		for(var a in x)	if(x.hasOwnProperty(a))if(typeof x[a]=="object")cpt+=a+" :\r\n "+affich_l_(x[a])+"\r\n";else cpt+=a+" :    "+x[a]+"\r\n\r\n\r\n";
		return cpt;
}else alert('erreur, x nest pas un objet '+typeof x);		
}
function affich_l_(x,y,z){if(typeof x=="object"){	var cpt="";
		for(var a in x)	if(x.hasOwnProperty(a))cpt+="            "+a+" :    "+x[a]+"\r\n\r\n";
		return cpt;
}else alert('erreur, fill_L() doit avoir 3 paramètres ! ! !');		
};