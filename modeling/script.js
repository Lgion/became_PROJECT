var crossfile
//STARTING POINT FOR NEXT JOB
alert(`mettre des boutons pour pouvoir ré-afficher left_output & main_section_\n
`)

$(function(){
		art_h=$(main_article).find(">header>h2")
		art_hi=$(main_article).find(">header>img")
		art_m=$(main_article).find(">main>p")
		art_mv=$(main_article).find(">main>video")
		art_mi=$(main_article).find(">main>iframe")
		art_f=$(main_article).find(">footer")
		
		$nav_h3s=$('#left h3')
		$menu_as=$('header menu>li>a')
		$menu_h2s=$('header menu>li>a h2')
		$menu_lis=$('header menu>li')
		$menu_lis_as=$('header menu>li>ul a')
		$fil=$("#fildariane")
		$left=$("#left")
		$left_output=$("#left ul")
		$left_h3s=$("#left hgroup h3")
		$main_section=$(main_section)
		$main_section_=$(main_section_)
		$main_article=$(main_article)
		$main_output_form=$(main_output_form)
		$main_output=$(main_output)
		
		start_defaut_behavior()
		
		// $tmp=$nav_h3s.add($menu_h2s)
		// alert($menu_lis_as.length)
		$nav_h3s.each(function(i,j){
			$(j).html($(j).text().replace(/\w/g,"<span>$&</span>"))
		})
		
		$menu_lis_as.on('click',function(e){
				let $menu=$(this).closest('menu'),menuLi=$(this).closest('menu>li'),bool=true,xhr
				// alert('ok'+menuLi.index()+"\n"+$left_h3s.length+"\n"+$left_h3s[0].innerText)
				// alert('ok')
				$('header menu .actived').add($main_section).add($left).add($main_section_).removeClass("actived")
				menuLi.addClass("actived")
				$(this).addClass('actived')
				// alert(menuLi.html())
				// $main_output_form.addClass('nodisplay_')
				$left_h3s.slideUp()
				switch(menuLi.index()){
						case 1:crossfile="ecole"
						case 2:crossfile="universite"
						$($left_h3s[0]).slideDown()
						break;
						case 3:crossfile="profession"
						$($left_h3s[1]).slideDown()
						break;
						case 4:crossfile="hobbie"
						$($left_h3s[2]).slideDown()
						break;
						default:break
				}
				
//SI L'ATTRIBUT data-bool EXISTE, ALORS ON SAUTE L'ETAPE $main_section POUR ALLER DIRECTEMENT A $left_output				
				if(!$(this).attr("data-bool")){
//ON SUIT LA FLECHE NORMAL, ON PASSE PAR $main_section
							fonction_qui_traite_la_reponse_xhr_vers_$main_section({context:this})
				}else{
//ON PASSE DIRECTEMENT A $left_output
							fonction_qui_traite_la_reponse_xhr_vers_$left_output({context:this,_:true})
				}
				
				//
				//request some datas to ouput them into $left_output
				//and fill them into $left_output
				//
				
		})
		
//ectte evenement délégué ci-dessous doit pouvoir exploiter des données empilés dans une variable
		$main_section.on('click','a',function(e){
				fonction_qui_traite_la_reponse_xhr_vers_$left_output({context:this})
		})
//ectte evenement délégué ci-dessous doit pouvoir exploiter des données empilés dans une variable
		$left_output.on('click','a',function(e){
				fonction_qui_traite_la_reponse_xhr_vers_$main_section_({context:this})
				
				//
				//request some datas to ouput them into $main_section_ and $main_article
				//
		})
//ectte evenement délégué ci-dessous doit pouvoir exploiter des données empilés dans une variable
		$main_section_.on('click','a',function(e){
				fonction_qui_traite_la_reponse_xhr_vers_$main_output({context:this})
				
				//
				//request some datas to ouput them into $main_output
				//and add some abilities to $main_output_form
				//
		})
		
		
		
		$("#menusecondary>li:not(.dropmedown)").on('click',function(e){
			alert($(this).attr("data-data"))
		})
		$("#menusecondary>li.dropmedown ul").on('click','li',function(e){
			// alert($(this).attr("data-data"))
			show_modal("form_"+$(this).attr("data-data"))
		})
		$("#menusecondary .dropmedown").on('click','a',function(e){
			
		})
		$(".alphabet").on('mouseout','a',function(e){$(this).closest('section').find('.alpha_tagname').html("")})
		$(".alphabet").on('mouseover','a',function(e){
				if(typeof $(this).attr('data-data')!="undefined"){
						//do something
				}else{
						//factices datas
						let dup="<a href=''>#TAG_</a>",i=0,dup_="<p>Je suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentationJe suis un texte type orem ipsum de présentation</p>"
						$(this).closest('section').find('.alpha_tagname').html((dup+i++)+(dup+i++)+(dup+i++)+(dup+i++)+(dup+i++)+(dup+i++)+(dup+i++)+(dup+i++)+(dup+i++))
						$(this).closest('section').find('.alpha_tagname').append(dup_)
						// alert('ok'+$(this).closest('section').find('.alpha_tagname').length);
				}
		})
		$("main output .tr0>div>div").click(function(e){
			let type=this.className
			switch(type){
				case"likes":
				break
				case"views":
				break
				case"etc":
				break
				default:
				break
			}
			alert("Il s'agit ici, d'ouvrir le div.inmodal et d'y insérer quelquechose, en fonction de données dans les attributs")
		})
		
		
		
		
		
		
		$fil.on("click",".home",function(){main_article.innerHTML=this.article;		$fil.find(".un,.deux,.trois,.quatre,.upper").remove();								$('header menu .actived').add($main_section).add($left).add($main_section_).removeClass("actived")})
		$fil.on("click",".un",function(){main_article.innerHTML=this.article;			$fil.find(".deux,.trois,.quatre,.upper").remove();					setTimeout(function(){$(left).addClass('off')},1000);			$left.add($main_section_).removeClass("actived");		$main_section.addClass('actived');				})
		$fil.on("click",".deux",function(){main_article.innerHTML=this.article;		$fil.find(".trois,.quatre,.upper").remove();					$left.removeClass('off');						$main_section.add($main_section_).removeClass('actived');						setTimeout(function(){$left.addClass('actived')},1000)})
		$fil.on("click",".trois",function(){main_article.innerHTML=this.article;		$fil.find(".quatre,.upper").remove();		setTimeout(function(){$(left).addClass('off')},1000);						$left.removeClass('actived');						$main_section_.addClass('actived')})
		$fil.on("click",".quatre",function(){main_article.innerHTML=this.article;	$fil.find(".upper").remove();						fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(xhr);						$main_section_.removeClass('actived');						$main_output_form.removeClass('nodisplay_')})
		$("#modals").click(function(){$('#modals+div>.active').removeClass("active");$("#modals").removeAttr("style")})
		$('.close').on('click',function(e){
				if(this.className.indexOf(' ')!=-1&&!$(this).attr('data-done')){
						let classe=this.className.replace('close ',''),second=classe.replace('close_','').replace("0_",".").replace('1_','#'),last=classe.substring(classe.length-1)
						// alert(classe)
						// alert(second)
						// alert(last)
						if(second=="")$(this).parent().removeClass('actived')
						else if(second=="_")$(this).parent().slideUp()
						else if(last!="_")$(this).closest(second).removeClass('actived')
						else $(this).closest(second).slideUp()
							
						$(this).attr('data-done',"true")
				}
		})
		$('exemple').add().on('click','span.desactive',function(e){
				$(this).parent().removeClass('actived')
		})
		$('exemple').add().on('click','span.close',function(e){
				$(this).parent().slideUp()
		})
})
function start_defaut_behavior(){
	$fil.find('.home')[0].article=main_article.innerHTML
}




































function fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(article){
		art_h.html(article.h)
		art_m.html(article.m)
		art_f.html(article.f)
}

function fonction_qui_traite_la_reponse_xhr_vers_$main_section(obj){
		let xhr={}
	
		$(fildariane).find('.un').add($(fildariane).find('.deux')).add($(fildariane).find('.trois')).add($(fildariane).find('.quatre')).add($(fildariane).find('.upper')).remove()
		let fil_a=addH(fildariane,'a',obj.context.innerText,{class:"un",href:obj.context.href,title:obj.context.innerText})
		
		//$.get(
				// "/klkchose",
				// function(xhr){
						// xhr=JSON.parse(xhr)
						xhr.article={h:"l class le niveau le secteur d'activité la discipline",m:"corps du sujetcorps du sujetcorps du sujetcorps du sujet",f:"pied de pagepied de pagepied de pagepied de page"}
						fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(xhr.article)
						setTimeout(function(){$(left).addClass('off')},1000)
						$main_section.addClass('actived')
						$main_section.find('>nav').slideUp()
						$main_section.find('>nav.'+crossfile).slideDown()
						fil_a.article=main_article.innerHTML
						
				// }
		// )
}
function fonction_qui_traite_la_reponse_xhr_vers_$left_output(obj){
		let xhr={}
		let classname="deux",tmp=""
	
		if(obj._){	classname="un";$(fildariane).find('.un').remove()	}
		else tmp=$(fildariane).find('.un')[0].title+" "
		$(fildariane).find('.deux').add($(fildariane).find('.trois')).add($(fildariane).find('.quatre')).add($(fildariane).find('.upper')).remove()
		let fil_a=addH(fildariane,'a',obj.context.innerText,{class:classname,href:obj.context.href,title:tmp+obj.context.innerText})
		//$.get(
				// "/klkchose",
				// function(xhr){
						// xhr=JSON.parse(xhr)
						xhr.article={h:"la filiere le métier la variété",m:"corps du sujetcorps du sujetcorps du sujetcorps du sujet",f:"pied de pagepied de pagepied de pagepied de page"}
						fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(xhr.article)
						$left.removeClass('off')
						$main_section.removeClass('actived')
						setTimeout(function(){$left.addClass('actived')},1000)
						fil_a.article=main_article.innerHTML
						//remplacer prepend() par html()
						// $left_output.prepend(`<span onclick="$(this).closest('nav').removeClass('actived')" class="close">X</span>`)
				// }
		// )
}
function fonction_qui_traite_la_reponse_xhr_vers_$main_section_(obj){
		let xhr={}
	
		let tmp=$(fildariane).find('.deux')[0]||$(fildariane).find('.un')[0]
		tmp=tmp.title+" "
		$(fildariane).find('.trois').add($(fildariane).find('.quatre')).add($(fildariane).find('.upper')).remove()
		let fil_a=addH(fildariane,'a',obj.context.innerText,{class:"trois",href:obj.context.href,title:tmp+obj.context.innerText})
		
		//$.get(
				// "/klkchose",
				// function(xhr){
						// xhr=JSON.parse(xhr)
						xhr.article={h:"la matière la compétence le topic",m:"corps du sujetcorps du sujetcorps du sujetcorps du sujet",f:"pied de pagepied de pagepied de pagepied de page"}
						fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(xhr.article)
						setTimeout(function(){$(left).addClass('off')},1000)
						$left.removeClass('actived')
						$main_section_.addClass('actived')
						fil_a.article=main_article.innerHTML
				// }
		// )
}
function fonction_qui_traite_la_reponse_xhr_vers_$main_output(obj){
		let xhr={}
	
		let tmp=$(fildariane).find('.trois')[0].title+" "
		$(fildariane).find('.quatre').add($(fildariane).find('.upper')).remove()
		let fil_a=addH(fildariane,'a',obj.context.innerText,{class:"quatre",href:obj.context.href,title:tmp+obj.context.innerText})
		
		//$.get(
				// "/klkchose",
				// function(xhr){
						// xhr=JSON.parse(xhr)
						xhr.article={h:"le sujetle sujetle sujetle sujet",m:"corps du sujetcorps du sujetcorps du sujetcorps du sujet",f:"pied de pagepied de pagepied de pagepied de page"}
						fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(xhr.article)
						$main_section_.removeClass('actived')
						$main_output_form.removeClass('nodisplay_')
						fil_a.article=main_article.innerHTML
				// }
		// )
}
















function show_modal(x){
		
		$('#modals').css("display","block").animate({left:0,top:0,height:"100%",width:"100%"},1000,function(){$('#'+x).addClass('active');})
		// $('#'+x).show(1300);
		// $('#'+x).modal('show');
	}