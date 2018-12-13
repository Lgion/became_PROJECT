function show_modal(x){
	
	$('#modals').css("display","block").animate({left:0,top:0,height:"100%",width:"100%"},1000,function(){$('#'+x).addClass('active');})
	// $('#'+x).show(1300);
	// $('#'+x).modal('show');
}
$(function(){
	
	if(typeof countries!='undefined')
		countries.forEach(function(i){
			$("#gauche .dropdown-menu").append("<li><a href='#"+i.name.replace(' ','-').toLowerCase()+"' data-data='"+i.code2+"'>"+i.name+"</a></li>")
			$("#gauche .dropdown-menu li:last")[0].bool=true;
			$("#gauche .dropdown-menu li:last").click(function(e){
				let self=this,tmp=$(this).find('a').attr('data-data').toLowerCase()
				$("#gauche .dropdown-menu li").removeClass('selected')
				$(this).addClass('selected')
				$("#la_carte .close")[0].data=tmp
				$("#la_carte .close").hide()
				
				$(this).closest('div').next().val(this.innerText)
				if(this.bool){
					// alert('ok')
					$.get(
						"/_/map/"+tmp,
						function(xhr){
							// alert(xhr)
							xhr=JSON.parse(xhr)
							self.obj=xhr
							get_mapped(self)
						}
					)
					//IL FAUT FAIRE bool=false SEULEMENT LORSQUE LES DONNEES SONT TELECHARGEES
					this.bool=false
				}else
				//ICI, AFFICHER LES DONNEES
				get_mapped(self)
			})
			if(user_parameters.pays==i.code2.toLowerCase()){
				// $("#gauche .dropdown-menu li:last")[0].bool=false
				$("#gauche .dropdown-menu li:last").trigger("click")
			}
		})
	if(typeof mises_en_avant!='undefined')
		mises_en_avant.forEach(function(i){
			$(pub).append("<div>je suis rajouté par  un forEach sur le fichier mises_en_avant.js</div>")
		})
	$("#left_search").keyup(function(e){
		alert(e.key+"\n- lorsqu'on tape 'enter', une recherche est faite sur tous les éléments présents sur la carte\n- rechere*che en 1er les mot-clés, puis lance la recherche sur tous lees élements de recherche (si aucun ot-clé) ou sur seulement le(ss) mot-clé(s) entré")
		if(e.key=="Enter"){
			
		}
	})
	$("#left_loupe").click(function(e){
		alert("- il faut afficher une loupe au passage de la souris sur la carte et permettre de cliquer\n- lorsqu'on clic, la carte est zoomé à l'endroti cliqué, et les éléments présent dans la loupe sont repositionnés en fonction du point gauche bas de la loup`\n\n- Après le 1er zoom, on peut encore utiliser la loup,e cette fois, cela permet de selectionner les éléments non-distinguables qui apparaissent tous dans les 5 pixel autour du clic(ce comportement devrais etre mit par défaut pour un clique là ou trop d'élement sont présents)")
	})
	$("#action_button").click(function(e){
		$(this).toggleClass('actived')
		// alert('ok')
		$(action).toggleClass('active')
		$(accueil).toggleClass('active')
	})
	$("#promo").click(function(e){
		// $(".add_to_map").removeClass('actived')
		// $(".promo").toggleClass('actived')
		show_modal('modal_promo')
		alert("ne pas oublier de rajouter, dans la fonction appelée après l'ajax (get_mapped()), les elements ajoutés à la carte par l'utilisateur")
	})
	$("#add_to_map").click(function(e){
		// $(".promo").removeClass('actived')
		// $(".add_to_map").toggleClass('actived')
		show_modal('modal_add')
		alert("- Il faut ajouter la selection de la région, ainsi que son insertion dans la bdd\n- Il faut pouvoir donner les coordonnées de l'élément (apartir d'une carte ou par n'importe quel moyen)\n- Il ne faut pas oublier de rajouter les éléments à la carte après la fonctin ajax (get_mapped())")
	})
	$(".modal_ .dropdown a").click(function(e){
		// $(".promo").removeClass('actived')
		// $(".add_to_map").toggleClass('actived')
		$(this).parent().parent().prev().html(this.innerText)
		$(this).closest('.dropdown').next().val($(this).attr('data-data'))
	})
	$("#modal_promo").click(function(e){
		// $(".promo").removeClass('actived')
		// $(".add_to_map").toggleClass('actived')
	})
	$("#map_carte").on('click','area',function(e){
		la_carte.className="carte_"+$("#la_carte .close")[0].data+"_"+this.id
		$("#la_carte .close").show()
		$("#dioceses").hide()
		$("#la_carte .la_class_des_elements_ajoutes").each(function(i,j){
			$(j).fadeIn()
			if($(j).attr('data-region')!=$(this).attr('data-data'))$(j).fadeOut()
		})
		alert("Et maintenant il faut réintégrer les éléments au sein de cette nouvelle carte\n\nje pense qu'il faut mettre un hide sur les ancien elements et dupliquer avec de nouvelles coordonnées les éléments qui persistent dans la nouvelle carte")
	})
	$("#dioceses").on("click","a",function(e){
		let i,j
		alert('ok')
		$("#la_carte .close").show()
		$("#dioceses").hide()
		$("#la_carte .la_class_des_elements_ajoutes").each(function(i,j){
			$(j).fadeIn()
			if($(j).attr('data-diocese')!=$(this).attr('data-data'))$(j).fadeOut()
		})
	})
	$("#dioceses").on("mouseover","a",function(e){
		this.style.color="green"
	}).on("mouseout","a",function(e){
		this.style=""
	})
	$("#legende a").click(function(e){
		let i,j
		alert('ok')
		$("#la_carte .la_class_des_elements_ajoutes").each(function(i,j){
			$(j).fadeIn()
			if($(j).attr('data-type')!=$(this).attr('data-data'))$(j).fadeOut()
		})
	})
	
	
	
	
	
	
	
	
	$("#gauche button").click(function(e){
		switch($(this).attr('data-data')){
			case"create_group":show_modal("create_group")
			break
			case"":
			break
			default:
			break
		}
	})
	$("#page>header .send_msg").click(function(e){
		let tmp=escape($(this).prev().val()),id=$(page).attr('data-data'),ajouteur=$(page).attr('data-data_'),ajouteur_=$(page).attr('data-_data')
		$.get(
			"/_/write_msg/"+id+"/"+ajouteur+"/"+ajouteur_+"/"+tmp,
			function(xhr){
				alert(xhr)
				if(xhr==0)alert('not ok')
				if(xhr==1)alert('ok')
			}
		)
	})
	$(".show_group").click(function(e){
		let xhr,self=this,a,i
		$.get(
			"/_/show_group/"+$(this).attr('data-data'),
			function(xhr){
				// alert('ok'+xhr)
				let xhr_=JSON.parse(xhr)
				let tmp=$(show_group),keyw=tmp.find(".modal_header .keywords"),ul=tmp.find(".modal_footer ul")
				tmp.find(".modal_header h4").html(self.innerHTML)
				tmp.find(".modal_header .descr").html(xhr_.descr)
				tmp.find(".modal_header .keywords").html("")
				xhr_.keywords.split(',').forEach(function(i){
					keyw.append(`<a href="#">${i}</a>`)
				})
				tmp.find(".modal_header img")[0].src=xhr_.img
				tmp.find(".modal_header img")[0].alt=self.innerHTML
				tmp.find(".modal_header img")[0].title=self.innerHTML
				tmp.find(".modal_header input[name=keywords]").val(xhr_.keywords)
				tmp.find(".modal_content iframe")[0].src=xhr_.iframe//xhr_.iframe=xhr_.img.tolowerCase()+xhr_.titre.replace(' ','_')
				tmp.find(".modal_content .other").html('')//TROUVER QUELQUE CHOSE A EMTTRE ICI
				xhr_.membres=JSON.parse(xhr_.membres) 
				for(a in xhr_.membres){
					ul.append(`<li data-data="${xhr_.membres[a]}">
						<a href="${$('#button_account a').attr('href').substring(0,$('#button_account a').attr('href').lastIndexOf('/'))}/${a}" >${a.replace('.',' ')}</a>
					</li>`) 
				}
				alert(objLength(xhr_.membres))
				tmp.find(".modal_header form").show()
				tmp.find(".modal_footer .edit_membre").show()
				if(objLength(xhr_.membres)==0)tmp.find(".modal_footer .nomembre").show()
				show_modal("show_group") 
			}
		)
	})
	$('.search_acted').on('keyup',function(e){
		let id=$('input[name=ajouteur_]')[0].value,acted=this.parentNode.parentNode.className
		// alert(e.key+"___"+id)
		if(e.key=='Enter'){
			$.get(
				"/_/search_acted/"+id+"/"+acted+"/keyup/"+escape(this.value),
				function(xhr){
					if(xhr=='0')alert('aucun resultats')
					else{
						alert(xhr)
					}
				}
			)
		}
	})
	$('.date_acted').on('change',function(e){
		let id=$('input[name=ajouteur_]')[0].value,acted=this.parentNode.parentNode.className,self=this
		// alert("___"+id)
		$.get(
			"/_/search_acted/"+id+"/"+acted+"/change/"+this.value,
			function(xhr){
				// alert(xhr)
				if(xhr=='0')alert('aucun resultats')
				else{
					$(self).parent().find('.search_result').html(xhr).prepend("<span class='close'>X</span>")				
				}
			}
		)
	})
	if(typeof feu_esprit!="undefined"){
		let tmp=$("#feu_esprit_points span.fire_value"),tmp_=0
		tmp.each(function(i,j){
			switch($(j).attr('data-data')){
				case"":
				break
				default:
				break
			}
		})
//CECI EST UNE NOTE ATTRIBUE AU HASARD
//MAIS IL FAUDRAIT POUVOIR TENIR COMPTE DE LA QUANTITE DE DONNEES RECENTES,
//POUR QUE LA NOTE FINAL PUISSE ETRE TRES ELEVEE SSI IL Y A BEAUCOUP DE DONNEES RECENTES
		tmp_=87
		$('#feu_esprit span').css({height:tmp_+"%"})
	}
	
	
	
	
	
	if(typeof counter_iwai!="undefined"){
		let iwai_left=$("#counter_iwai")
		
		let iwai_counter=iwai_left.find('.counter_iwai span')
		let iwai_counter_=iwai_counter.html()
		let now=+new Date()
		let decount=iwai_counter_-now
		let underTen=false
		if(decount<1000*60*60*24*10)underTen=true
		iwai_counter.html(decount)
		setInterval(function(){iwai_counter.html(iwai_counter.html()-1000)},1000)
		
		iwai_left.find('>a').click(function(e){
			$(iwai_contain).addClass("active")
			$(accueil).removeClass("active")
		})
		$('#gauche .btn-group>a').click(function(e){
			$(accueil).addClass("active")
			$(iwai_contain).removeClass("active")
		})
	}
	
	
	
	
	
	
	$('input[name=redirect]').val(document.URL)
	$("#modals").click(function(){$('#modals+div .active').removeClass("active");$("#modals").removeAttr("style")})
	$(".modal_").click(function(e){e.stopPropagation();})
	$(".nex").on('click',function(e){
		$(this).next().trigger('click')
	})
	$(".sh_nex").on('click',function(e){
		$(this).next().show()
	})
})



function get_mapped(element){
	let i,ii,j,tmp=$(element).find('a').attr('data-data').toLowerCase(),tmp_=$(pub).find('h4:first'),tmp__=$(dioceses).find('h3:first'),_tmp=$(legende).find('a')
	let xhr=element.obj
	// alert(xhr)
	//#gauche button
	// alert(xhr[2].length)
	$(action_button).find('i')[0].className='btn btn-danger btn-lg icon_'+tmp
	//publicité
	while(tmp_.next().length!=0)tmp_.next().remove()
	xhr[2].forEach(function(i){
		$(pub).append(`
			<div class="">
				<a href="#" data-data="${i.id_pub}" class="">
					<h4>${i.titre}</h4>
					<p>${i.descr}</p>
				</a>
			</div>
		`)
	})
	//carte
	xhr[0]=JSON.parse(xhr[0])
	// alert(typeof xhr[0])
	la_carte.className="carte_"+tmp
	map_carte.innerHTML=''
	ii=0
	xhr[0].regions.forEach(function(i){
		$(map_carte).append(`
			<area shape="poly" id="a_0${ii}" href="#" title="${i.generique}" alt="${i.generique}" coords="${i.coords}">
		`)
		ii++
	})
	//dioceses
	while(tmp__.next().length!=0)tmp__.next().remove()
	xhr[0].dioceses.forEach(function(i){
		$(dioceses).append(`
			<a href="#" data-data="${i.generique}">${i.nom}</a>
		`)
	})
	//legende
	_tmp.each(function(i,j){
		let tmp=typeof xhr[3][0][$(j).attr('data-data')]=='undefined'?0:xhr[3][0][$(j).attr('data-data')]
		$(j).find('span').html(tmp)
	})
	//createdmap
	
	//mapped
}