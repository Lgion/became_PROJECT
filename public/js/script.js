var chrono_courses,masocket,liveblob=[]
var crossfile,compiled={},fil_a,xhr_onunload={}
var b_lang="fr",b_pays="fr"
type_to_icon={"zip":"File Archive Outline","dir":"folder","img":"File Image Outline","audio":"File Audio Outline","video":"File Video Outline","html":"Html5","pdf":"File Pdf Outline","pwp":"File Powerpoint Outline","txt":"File Text","unkown":"file","excel":"File Excel Outline","word":"File Word Outline"}
ext_to_type={jpg:"img",png:"img",mp4:"video",mp3:"audio",html:"html"},ajax_path={_:"local",local:"",distant:"/bnet",distant_:"/_"}
type_to_tag={"img":"img","audio":"audio","video":"video"}
colors_array=["red","blue","green","purple","gold","pink","orange","black","brown"]
//STARTING POINT FOR NEXT JOB
// alert(`mettre des boutons pour pouvoir ré-afficher left_output & main_section_\n
// `)

$(function(){
		art_h=$(main_article).find(">header>h2")
		art_hi=$(main_article).find(">header>img")
		art_m=$(main_article).find(">.main>p")
		art_m_=$(main_article).find(">.main>p:last")
		art_mv=$(main_article).find(">.main>video")
		art_mi=$(main_article).find(">.main>iframe")
		art_f=$(main_article).find(">footer")
		
		$nav_h3s=$('#left h3')
		$menu_as=$('header menu>li>a')
		$menu_h2s=$('header menu>li>a h2')
		$menu_lis=$('header menu>li')
		$menu_lis_as=$('header menu>li>ul a')
		$fil=$("#fildariane")
		$left=$("#left")
		$left_output=$("#left ul")
		$left_h=$("#left hgroup")
		$left_h3s=$("#left hgroup h3")
		$main_section=$(main_section)
		$main_section_=$(main_section_)
		$main_article=$(main_article)
		$main_output_form=$(main_output_form)
		$main_output=$(main_output)
		$section=$(outputs)
		
		$s_course=$s_ressource=$s_classe=$s_qr=$s_prof=""

		
// INITIALISATIONS
		start_defaut_behavior()
		
		// $tmp=$left_h3s.add($menu_h2s)
		// alert($menu_lis_as.length)
		$left_h3s.each(function(i,j){
			$(j).html($(j).text().replace(/\w/g,"<span>$&</span>"))
			j.onclick=function(e){$(this).closest('nav').addClass('actived')}
		})
		$(fildariane).data('data','compiled')
		
		$menu_lis_as.on('click',function(e){
				// alert('aussi')
				let $menu=$(this).closest('menu'),menuLi=$(this).closest('menu>li'),bool=true,xhr
				// alert('ok'+menuLi.index()+"\n"+$left_h3s.length+"\n"+$left_h3s[0].innerText)
//JE PENSE QUE L'INTRUCTION SUIVANTE PEUT ETRE BEA1UCXOUP PLUS SIMPLE: //$('#menu_principal').add($main_section).find(".actived").removeClass("actived")
				$('#menu_principal .actived').add($main_section).add($main_section.find('.actived')).add($left).add($left.find('.actived')).add($main_section_).add($main_section_.find('.actived')).removeClass("actived")
				menuLi.addClass("actived")
				$(this).addClass('actived')
				// alert(menuLi.html())
				// $main_output_form.addClass('nodisplay_')
				console.log($left_h3s)
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
//menu principal ON SUIT LA FLECHE NORMAL, ON PASSE PAR $main_section
							fonction_qui_traite_la_reponse_xhr_vers_$main_section({context:this})
				}else{
//menu principal ON PASSE DIRECTEMENT A $left_output
							fonction_qui_traite_la_reponse_xhr_vers_$left_output({context:this,_:true})
				}
				
				//
				//request some datas to ouput them into $left_output
				//and fill them into $left_output
				//
				
		})
		
//ectte evenement délégué ci-dessous doit pouvoir exploiter des données empilés dans une variable
		$main_section.on('click','a',function(e){
				$(this).addClass('actived')
				fonction_qui_traite_la_reponse_xhr_vers_$left_output({context:this})
		})
//ectte evenement délégué ci-dessous doit pouvoir exploiter des données empilés dans une variable
		$left_output.on('click','a',function(e){
				$(this).addClass('actived')
				fonction_qui_traite_la_reponse_xhr_vers_$main_section_({context:this})
				
				//
				//request some datas to ouput them into $main_section_ and $main_article
				//
		})
//ectte evenement délégué ci-dessous doit pouvoir exploiter des données empilés dans une variable
		$main_section_.on('click','a',function(e){
				$(this).addClass('actived')
				fonction_qui_traite_la_reponse_xhr_vers_$main_output({context:this})
				
				//
				//request some datas to ouput them into $main_output
				//and add some abilities to $main_output_form
				//
		})
		
		
		
		$("#menu_secondaire>li:not(.dropmedown)").on('click',function(e){
				alert($(this).attr("data-data"))
		})
		$("#menu_secondaire>li.dropmedown ul").on('click','li',function(e){
				// alert($(this).attr("data-data"))
				show_modal("modals")
				
				switch($(this).find('a')[0].dataset.data){
						case"niveaux":
						case"filieres":
						case"matieres":
						case"sujets":
								$("#modals+div").html(modals.nfms).addClass($(this).find('a')[0].dataset.data)
						break
						default:
							$("#modals+div").html(modals[$(this).find('a')[0].dataset.data]).addClass($(this).find('a')[0].dataset.data)
						break
				}
// profs_id PEUT PRENDRE PLUSIEURS VALEURS POUR CHAQUE USER
// AINSI LE onchange SUR LE select[name=matieres] DOIT REP2RER, GRÂCE A L'OBJECT req_obj.profs_id, SI LE USER PEUT PRETENDRE CONTINUER POUR  CREER UN COURS
// , OU S'IL DOIT CREER UN PROFESSEUR DANS LA MATIERE CHOISIE AVANT DE CREER LE COURS DANS CETTE MATIERE..
				$("#form_add_things input[name=profs_id]").val(req_obj.profs_id)
				
				$("#form_add_things .values input[name=type]").val($(this).find('a')[0].dataset.data)
				$('#modals+div select').material_select()
				$('#modals+div textarea').trigger('autoresize');
				$("#form_add_things header h2."+$(this).find('a')[0].dataset.data).addClass("dis")
				// $("#form_add_things .values .input-field."+$(this).find('a')[0].dataset.data).addClass("dis").prev().addClass("dis").prev().addClass("dis").prev().addClass("dis")
				if($(this).find('a')[0].dataset.data!="niveaux")$('#form_add_things .input-field.niveaux label:first').remove();else $('#form_add_things .input-field.niveaux label:last').remove()
				$("#form_add_things .values>.input-field select").on("change",function(){
						let self=$(this).closest('.input-field')[0],self_=this,tmp,tmp_
						// console.log($(self).closest('form'))
						// console.log($(self).closest('form').parent())
						if(self_.name!="upper")
								if($(self).closest('form').parent()[0].className!=self_.name){
										if($(self).closest('form').parent()[0].className!=$(self_).closest(".input-field").next().find("select")[0].name&&self_.name!="sujets")$(self_).closest(".input-field").next().find("label:first").remove()
										$.post("/_/form_get_things/"+self_.name+"/"+self_.value,function(xhr){
												// console.log(xhr)
												// console.log($(self).next().find('select')[0])
												$(self).next().slideDown()
												$(self).next().find('select').html('')
												$(self).next().find('select').attr('required')
												xhr=JSON.parse(xhr)
												// alert(xhr)
												// console.log(xhr)
												tmp_=$("<option/>").attr({value:"void","data-icon":"/imgs/select_void.png"}).html(b_translates.for_modals.nfms.inputs.select)
												$(self).next().find('select').append(tmp_)
												xhr.forEach(function(i){
														tmp=JSON.parse(i[req_obj.lang]);
														tmp_=$("<option/>").attr({value:i['id_'+$(self).find('select')[0].name],"data-icon":tmp.img.src}).html(tmp.html);
														// console.log(tmp)
														// console.log($(self)[0])
														// console.log($(self).next()[0])
														$(self).next().find('select').append(tmp_)
												})
												// $(self).next().material_select()
												$('#modals+div select').material_select()
										})
								}else if($(self).closest('form').parent()[0].className!=$(self_).closest(".input-field").next().find("select")[0].name&&self_.name!="sujets"){
										console.log($(self_).closest(".input-field").next().find("label:last")[0])
										$(self_).closest(".input-field").next().find("label:last").remove()
								}
				})
				$("#form_add_things").submit(function(e){
						e.preventDefault()
						$.ajax({url:"/_/form_add_things",data:new FormData(form_add_things),success:
								function(xhr,b,c){console.log(c);if(xhr=='0')alert(b_translates.errors.saving+" "+b_translates.errors.retry);else{modals.click();if(confirm(b_translates.success.form_validated+"\n"+b_translates.success.toreload)){window.location('/');alert('it should reload the page now')}}},type:"post",error:function(err){console.log(err)},processData:false,contentType:false
						})
						// return false
				})
		})
		$("#menu_secondaire .dropmedown").on('click','a',function(e){
			
		})
		$main_article.find('footer').on("click","button",function(){
				switch(this.className){
						case"open_output":		$main_output_form.addClass('actived')
						break
						case"suggestions":
						break
						case"questions":
						break
						default:
						break
				}
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
		$("#main output,#main output .ressource nav.w25,#main output .ressource nav.w25").on("click",".ressource div.w50>div,.ressource nav.w25>div,.ressource nav.w25>button",function(e){
				let type=this.className
				// alert('ok'+type)
				switch(type){
						case"likes":
						break
						case"shares":
						break
						case"views":
						break
						case"coms":
						break
						case"language":
						break
						case"media":
						break
						case"direct":
						break
						case"price":
						break
						case"tags":
						break
						case"profs":
						break
						case"type":
						break
						case"descr":$(this).closest('div').find('p.description').toggleClass('actived')
						break
						default:
						break
				}
				// alert("Il s'agit ici, d'ouvrir le div.inmodal et d'y insérer quelquechose, en fonction de données dans les attributs")
		})
		$main_output_form.find('.choose button').click(function(e){$main_output.find('>div').removeClass("actived");$main_output.find("."+this.parentNode.className.substring(1)).addClass("actived")})
		// $main_output.on("click",".courses .top a,.ressources .top a",function(e){receive_link(e)})
		$main_output.find('.output').on("click",".top a",function(){
				$(this).closest('.output').find('>div').removeClass('actived')
				$(this).closest('.four').addClass('actived')
				ancre_type_second($(this).closest('.output')[0].className.match(/(classes|profs|ressources|courses|qr)/)[0],this.href,$(this).closest('.four')[0])
		})
		
		$section.find('.un').on("click","header>div:not(.act):not(.acted)",function(e){
			$(this).parent().find('.acted').fadeIn()
			alert('il reste a faire la reste :(')
		})
		$section.find('.output').on("click","._modal>button",function(e){$(this).toggleClass('actived')})
		$section.find('.output').on("click","._modal>button.reduce",function(e){$(bod).removeClass('section_modal');})
		$section.find('.ressources,.courses').on("click",".main button:not(.fr),.prof .r .scrolly button",function(e){$(this).toggleClass('actived');$(this).find('i').toggleClass('open')})
		$section.find('.ressources').on("click","footer>.title>button.fr",function(e){if($(this).closest('footer').find('.actived').length!=0){$(bod).addClass('section_modal');$(this).closest('.ressources').find('._modal>h3').html($(this).closest('.ressources').find('.main .actived')[0].innerText).next().html($(this).closest('.ressources').find('.main .actived')[0].title);$(this).closest('.ressources').find('._modal .contain').html($(this).closest('.ressources').find('footer .containers .actived')[0].outerHTML)}else alert("Veuillez chosir une ressource d'abord moherfuker b!iiiiiiiiiatch")})
		$section.find('.ressources').on("click",".main a:not(.zip)",function(e){
				$(this).closest('.scrolly').find('li:not(.zip)').removeClass('actived')
				$(this).parent().addClass('actived')
				e.preventDefault()
				let tmp=type_to_tag[this.dataset.data]?type_to_tag[this.dataset.data]:"iframe"
				let tmp_=$(this).closest('.ressources').find('footer .containers')
				tmp_.find('>*').slideUp()
				tmp_.find('>*').removeClass('actived')
				tmp_.find('>'+tmp).slideDown()
				tmp_.find('>'+tmp).addClass('actived')
				tmp_.find('>'+tmp)[0].src=this.href
				
		})
		$section.find('.ressources').on("click","._modal>button.view",function(e){$(this).find('~.contain').toggleClass('view');})
		$section.find('.ressources').on("click","._modal>button.color",function(e){$(this).find('~.contain').toggleClass('color');})
		$section.find('.courses').on("click","footer button",function(e){
				let self=this,span=$(this).closest('article').find('span._modal')[0],tmp=$main_output.find('.courses .actived'),done=JSON.parse(span.dataset.done),started=span.dataset.start-(+new Date())>0?false:true,ended=span.dataset.end-(+new Date())>0?false:true
				$(bod).addClass('section_modal')
				// alert(this.dataset.id)
				
				// alert("localStorage[+'tl_'+this.dataset.id] : "+localStorage["tl_"+self.dataset.id])
				// if(localStorage["tl_"+self.dataset.id])
				// span.tl=localStorage["tl_"+self.dataset.id]
				// else
				new Promise(function(res,rej){
						if(done.indexOf(self.dataset.id)==-1)
								$.get(
										ajax_path[ajax_path._]+"/_/courses_/"+tmp[0].obj_.ressource_ids+"/"+self.dataset.id,
										function(xhr){
												xhr=JSON.parse(xhr)
												if(!xhr[0])rej(xhr)
												
												span.ressources=xhr[0]
												if(!span.arrayressources)span.arrayressources=[]
												span.arrayressources[self.dataset.id]=xhr[0]
												done.push(self.dataset.id)
												span.dataset.done=JSON.stringify(done)
												span.tl=JSON.parse(xhr[1][0].tl)
												if(!span.tl.phases&&span.className.indexOf('prof')!=-1){
//	CETTE CONDITION NEST JAMAIS ATTEINTE, LE span NA JAMAIS LA CLASS .prof PUISQUE TOUS LES MODES DOIVENT JOUER LA TIMELINE
														// $(span).find('.timeline .line .tl').addClass("actived")
												}else{
														get_tl()
														$(self).closest('.courses').find('._modal .prof').addClass('addable')
														$(self).closest('.courses').find('._modal .void').addClass("nodisplay")
												}
												$(span).find('.load').click()
												res('ok')
										}
								)
						else{
								alert("il semble qu'il y a quelque chose d'illogique dans cette condition if else\ntrouver l'illogisme")
								span.ressources=span.arrayressources[self.dataset.id];res("ok")
						}
				}).then(function(r){
						// alert(started)
						// alert(ended)
						if(!started){
								let timing=parseInt(span.dataset.start)-(+new Date())
								alert(timing)
								if(timing<0)alert('a problem occured here, checkit please')
								if(timing<18000000){//18000000 millisecondes = 5heures
									chrono_courses=setTimeout(function(){chrono_courses=null;alert('yo');run_tl()},timing)
									// alert('yoyoyo')
								}
						}else if(!ended){run_tl()
								alert("course already started but not ended yet")
						}
						else{
								run_tl("replay")
								alert("replaying course")
						}
				}).catch(function(e){alert("an error occured, see console");console.log(e)})
		})
		$section.find('.courses').on('mousemove','._modal .timeline .tl',function(e){
				let rt=$(this).find('.rendertime')
				// console.log(e.offsetX+" ___ "+e.offsetY+" ___ "+this.clientWidth)
				let tmp=(e.offsetX/this.clientWidth).toFixed(2),tmp_
				// console.log(tmp)
				tmp=parseInt($(this)[0].dataset.duree)*tmp
				// console.log(tmp)
				// console.log("tmp : "+tmp+" ___ tmp/60 : "+tmp/60+" ___ "+Math.floor(tmp/60))
				tmp_=Math.floor(tmp/60)+""
				tmp_=tmp_.length==1?"0"+tmp_:tmp_
				_tmp=Math.floor(tmp%60)+""
				_tmp=_tmp.length==1?"0"+_tmp:_tmp
				// console.log(tmp_+" ___ "+tmp_.length)
				// console.log(_tmp+" ___ "+_tmp.length)
				tmp=tmp_+":"+_tmp
				// console.log(tmp)
				rt.html(tmp)
				// alert("je repère la position X et Y du clic dnas le conteneur et je lance toutes les actions qui ont lieu du point présent jusqu'au cette instant cliqué")
		})
		$section.find('.courses').on('change','._modal .timeline .options>select',function(){
				if(this.value!="void"){
						let data=$(this).find('option:nth('+tl_select.selectedIndex+')')[0].data
						console.log($(this).find('option:nth('+tl_select.selectedIndex+')'))
						console.log(data)
						tl_opts_time.min=data.start;				tl_opts_time_.min=data.start;				tl_opts_time.max=data.end;				tl_opts_time_.max=data.end
						tl_opts_time.value=data.start;				tl_opts_time_.value=data.end
						tl_add_rsc_time.min=data.start;				tl_add_rsc_time.max=data.end
						tl_add_rsc_time_.value=data.end
						tl_opts_phs.value=data.title
						$section.find('.courses .prof .tl>div').removeClass('boxS')
						$section.find('.courses .prof .tl>div:nth('+this.value.substring(1)+')').addClass('boxS')
				}
		})
		$section.find('.courses').on('click','._modal .timeline .options>input[type=submit]',function(){
				let span=$(this).closest('span'),tl=span[0].tl,bool=false,bool_=true
				// alert(tl)
				if(tl_opts_add_rsc.rsc){
						console.log(tl_select.value+"="+"void"+"___"+tl_add_rsc_time.value+"="+tl_add_rsc_time.min+"___"+tl_add_rsc_time.value+"="+tl_add_rsc_time.max)
						console.log(tl_select.value!="void"+"___"+tl_add_rsc_time.value>=tl_add_rsc_time.min+"___"+tl_add_rsc_time.value<=tl_add_rsc_time.max)
						if(tl_select.value!="void"&&tl_add_rsc_time.value>=tl_add_rsc_time.min&&tl_add_rsc_time.value<=tl_add_rsc_time.max){
								if(!tl.items)tl.items=[]
								// alert(tl_opts_add_rsc.rsc[0].href)
								// alert(tl_opts_add_rsc.rsc[0].dataset.data)
								// alert(tl_opts_add_rsc.rsc[0].innerText)
								let i={id_phase:tl_select.value,href:tl_opts_add_rsc.rsc[0].href,type:tl_opts_add_rsc.rsc[0].dataset.data,title:tl_opts_add_rsc.rsc[0].innerText,time:tl_add_rsc_time.value}
								tl.items.push(i)
						}else{bool_=false; alert("eueoneunVeuillez d'abord chosiir une ressource\nVeuillez indiquer l'instant de départevpijeijif")}
						$(this).closest('.timeline').addClass('afterfull')
						$(this).closest('.options').removeClass('actived')
						$section.find('._modal .timeline').addClass('afterfull')
						$section.find('._modal .options').removeClass('actived')
						tl_add_rsc_time.disabled=true
						tl_opts_phs.disabled=false
						tl_opts_time.disabled=false
						tl_opts_time_.disabled=false
						tl_opts_add_rsc.value=""
						tl_add_rsc_time.value="00:00"
						tl_opts_add_rsc.rsc=null
				}else if(tl_opts_modify.value!=""){
						let tmp=JSON.stringify($(tl_select).find('option:nth('+tl_select.selectedIndex+')')[0].data)
						let ok=confirm("orjoVous etes sur le point de modifier cete phase :\n"+tmp+"\nEts-vous sûr ?obnienoe")
						if(ok)
								$.get(ajax_path[ajax_path._]+'/_/tls_/modifyphase_dkddonfn',function(xhr){
										tl_opts_modify.value=""
								})
						else bool_=false
				}else if(tl_opts_phs.value!=""&&tl_opts_time.value<=tl_opts_time.max&&tl_opts_time.value>=tl_opts_time.min&&tl_opts_time_.value<tl_opts_time_.max&&tl_opts_time_.value>=tl_opts_time_.min&&tl_opts_time.value<tl_opts_time_.value){
						alert(tl_opts_time.value+"\n"+tl_opts_time_.value)
						alert('IL FAUT EMPECHER QUE DEUX PHASES SE CHEVAUCHENT')
						if(!tl.phases){bool=true;tl.phases=[]}
						let i={start:tl_opts_time.value,end:tl_opts_time_.value,title:tl_opts_phs.value}
						tl.phases.push(i)
						// if!(xhr_onunload.tls)xhr_onunload.tls=[]
						// xhr_onunload.tls[$(this).closest('.courses').find('footer button')[0].dataset.id]=tl
						if(bool){
								alert("eofijVous pouvez maintenant ajouter des éléments dans la timelineeljfofv\nPour ajouter de nouveaux éléments, il faut selectionner la phase à laquelle ils appartiendront")
								$(this).closest('.prof').addClass('addable')
								$(span).find('.timeline .line .void').addClass("nodisplay")
						}		
				}
				else{bool_=false; alert("rbgonorgviVous devez entrer un titre pour la phase, et un instant durant le course (début et fin),fivf")
				}
				if(bool_){
						get_tl(span.tl)
						let tmp=escape(JSON.stringify(tl)).replace(/\//g,'_--_')
						alert(tmp)
						alert($(this).closest('.courses').find('footer button')[0].dataset.id)
						$.get(ajax_path[ajax_path._]+"/_/tls/"+$(this).closest('.courses').find('footer button')[0].dataset.id+"/"+tmp,function(xhr){alert(xhr)})
				}
		})
		$section.find('.courses').on("click","._modal .r .scrolly a",function(e){			e.preventDefault()					})
		$section.find('.courses').on("click","._modal .r .scrolly ul a",function(){
				let cls=this.className,a=$(this).parent().parent().prev();addable=$(this).closest('.prof.addable').length==1,ended=JSON.parse($(this).closest('.prof')[0].dataset.ended),end=+new Date()<(+new Date($(this).closest('.prof')[0].dataset.end)),started=JSON.parse($(this).closest('.prof')[0].dataset.started)
				$(this).closest('ol').find('li').removeClass('actived')
				$(this).closest('li').addClass('actived')
				// alert($(this)[0])
				// alert($(this).parent()[0])
				// alert($(this).parent().parent()[0])
				// alert($(this).parent().parent().prev()[0])
				switch(cls){
					case"add_tl":if(!end&&addable){
							console.log(a)
							tl_opts_add_rsc.value=a.contentText
							tl_opts_add_rsc.rsc=a
							tl_opts_phs.disabled=true
							tl_add_rsc_time.disabled=false
							tl_opts_time.disabled=true
							tl_opts_time_.disabled=true
							$(this).closest('.prof').find('.timeline').removeClass('afterfull')
							$(this).closest('.prof').find('.options').addClass('actived')
					}else alert("Aucune phase n'a été créé dns la timeline!\nSinon ce message ne devrai jamais pouvoir s'afficher car si le coursest déjà terminé la fenetre '.prof' n'est pas sencé pouvoir etre affiché")
					break
					case"show_r":
							$(this).closest('.scrolly').find('li').removeClass('actived')
							$(this).closest('li').closest('li').addClass('actived')
							let tmp=type_to_tag[this.dataset.data]?type_to_tag[this.dataset.data]:"iframe"
							let tmp_=$(this).closest('span').find('.contain .r')
							tmp_.find('>*').slideUp()
							tmp_.find('>*').removeClass('actived')
							tmp_.find('>'+tmp).slideDown() 
							tmp_.find('>'+tmp).addClass('actived')
							tmp_.find('>'+tmp)[0].src=a[0].href
					break
					case"br_r":if(started&&!end){
							alert("i am broadcasting rassource in live....nigger b!iaaatch")
					}else alert("eoeXCette opératio ne prut etre effectuée que si le cours a déjà commencéofvnonoen")
					break
					default:break
				}
		})
		$section.find('.courses').on('click','._modal .r button.load',function(){
				let obj=$(this).closest('span')[0].ressources,startend=$(this).closest('span').find('.prof,.students'),ul=$(this).parent().find('.list'),choice=$('<div/>').append($('<ul/>').append($('<li/>').append($('<a/>').attr({href:"#","title":b_translates.section.courses._modal.prof.choice_add_tl}).addClass("add_tl").append($('<i/>').addClass("icon Map Outline")))).append($('<li/>').append($('<a/>').attr("title",b_translates.section.courses._modal.prof.choice_show_r).addClass("show_r").append($('<i/>').addClass("icon Unhide")))).append($('<li/>').append($('<a/>').attr("title",b_translates.section.courses._modal.prof.choice_br_r).addClass("br_r").append($('<i/>').addClass("icon Podcast")).append($('<i/>').addClass("icon Users")))))
				obj.forEach(function(i,j){			let tmp=extract_ressource_from_json(JSON.parse(i.json),i);tmp.find('li').each(function(i,j){$(j).append(choice.html())});ul.append($('<li/>').append($('<button/>').html(j).attr({'title':i.title}).data({data:tmp.html(),obj:tmp})))			})
				$(this).closest('.r').removeClass('not')
				$(this).remove()
		})
		$section.find('.courses').on('click','._modal .prof .r ul.list button',function(){$(this).closest('.list').find("button").attr("disabled","false");$(this).attr('disabled',"true");$(this).closest('.r').find('.scrolly').html($(this).data('data'))})
		$section.find('.courses').on('click','._modal .contain .live>div i.maximize',function(){$(this.parentNode).find("img,audio,video,iframe")[0].webkitRequestFullscreen()})
		$section.find('.courses').on('click','._modal .contain .rscs>div.actived button.fs',function(){$(this).closest('.rscs').find(".actived:not(div)")[0].webkitRequestFullscreen()})
		$section.find('.courses').on('change',"#rscs_opt_width",function(){$(this).closest('.rscs').find('.actived:not(div)')[0].style.width=this.value+"%"})
		$section.find(".courses").on('click','#rscs_opt_height',function(){$(this).closest('.rscs').find('.actived:not(div)')[0].style.height=this.value+"%"})
		$section.find('.courses').on('click','._modal .contain .live ul li',function(){
				let tmp=$(this).closest('section')[0],tmp_=$(this).closest('.live'),live=$(this).closest('.live')
				// alert(tmp+"\n"+tmp.className+"\n"+tmp.innerHTML)
				switch(this.className){
						case"fs":
								if(tmp.className.indexOf("live_file")!=-1){
										tmp_.find("."+tmp.dataset.tag).slideDown()
										alert('ok')
										tmp=tmp_.find("."+tmp.dataset.tag+" "+tmp.dataset.tag)[0]
								}
								if(tmp.className.indexOf("live_audio")!=-1||tmp.className.indexOf("live_video")!=-1)
										tmp="somethingelse"
								alert(tmp.outerHTML)
								tmp.webkitRequestFullscreen();tmp.mozRequestFullscreen()
						break
						case"open":
						break
						case"play_audio":
						break
						case"play_video":
						break
						case"play_file":tmp_=$(this).closest('section')[0];$(this).closest('.live').find('>.'+tmp_.dataset.tag).slideDown();$(this).closest('.live').find('>.'+tmp_.dataset.tag+">"+tmp_.dataset.tag)[0].src=tmp_.dataset.src
						break
				}
		})
		
		
		
		$fil.on("click","a",function(){$(main_article).remove();main.insertBefore(this.article[0],main_output_form);this.obj.click()})
		//CES LIGNES SUIVANTES SONT DEVENUES OBSELETES DEPUIS L'AJOUT DE L'INSTRUCTION CI-DESSUS
		/*
		$fil.on("click",".home",function(){action_click()})
		$fil.on("click",".un",function(){action_click(0)})
		$fil.on("click",".deux",function(){main_article.innerHTML=this.article;		$fil.find(".trois,.quatre,.upper").remove();					$left.removeClass('off');						$main_section.add($main_section_).removeClass('actived');						setTimeout(function(){$left.addClass('actived')},1000)})
		$fil.on("click",".trois",function(){main_article.innerHTML=this.article;		$fil.find(".quatre,.upper").remove();		setTimeout(function(){$(left).addClass('off')},1000);						$left.removeClass('actived');						$main_section_.addClass('actived')})
		$fil.on("click",".quatre",function(){main_article.innerHTML=this.article;	$fil.find(".upper").remove();					$main_output_form.removeClass('nodisplay_')})
		*/
		$("#modals").click(function(){$('#modals+div').removeAttr('class');$('#modals,#modals+div>.active').removeClass("active");$("#modals").removeAttr("style")})
		$(bod).on('click','.closejq',function(e){$(this).parent().slideUp();})
		$(bod).on('click','.closejq_',function(e){let tmp=this.className.replace('closejq','').split(' '),tmp_,self=this;tmp.forEach(function(i){if((tmp_=i.indexOf('until_'))==0){i=i.substring(tmp_+6);$(this).closest(i).slideUp();};if((tmp_=i.indexOf('Until_'))==0){i=i.substring(tmp_+6).replace("--","#").replace("-",".");$(this).parentsUntil(i).slideUp()};if((tmp_=i.indexOf('to_'))==0){i=parseInt(i.substring(tmp_+3));tmp_=$(self);while(i!=0){tmp_=tmp_.parent().slideUp();i--}}})})
		$('.close______________________').on('click',function(e){
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
		Materialize.updateTextFields();
})
function start_defaut_behavior(){
	let tmp=$('<div/>').html($(all_tpls).html())
	
	$fil.find('.home')[0].article=main_article.innerHTML
	
	// tmp.find(".ressource_tpl button.descr,.course_tpl button.descr").html(b_translates.sentences.main_output_btn_descr)
	
	$main_output[0].ressource_tpl=tmp.find('.ressources_tpl').html()
	$main_output[0].course_tpl=tmp.find('.courses_tpl').html()
	$main_output[0].qr_tpl=tmp.find('.qrs_tpl').html()
	$main_output[0].classe=tmp.find('.classes_tpl').html()
	$main_output[0].prof=tmp.find('.profs_tpl').html()
	
	$section[0].ressources_tpl=tmp.find('.ressource_tpl').html()
	$section[0].courses_tpl=tmp.find('.course_tpl').html()
	tmp.find('.course_tpl ._modal>.students').remove()
		$section[0].courses_tpl_prof=tmp.find('.course_tpl').html();	
		tmp.find('.course_tpl').html($section[0].courses_tpl)
	tmp.find('.course_tpl ._modal>.prof').remove()
		$section[0].courses_tpl_student=tmp.find('.course_tpl').html();	
		tmp.find('.course_tpl').html($section[0].courses_tpl)
	tmp.find('.course_tpl ._modal>.prof,.course_tpl ._modal>.students').remove()
		$section[0].courses_tpl_redif=tmp.find('.course_tpl').html()
		tmp.find('.course_tpl').html($section[0].courses_tpl)
	tmp.find('.course_tpl>footer').html(b_translates.section.courses.footer.discon);tmp.find('._modal').remove()
		$section[0].courses_tpl_discon=tmp.find('.course_tpl').html()
		tmp.find('.course_tpl').html($section[0].courses_tpl)
		
		
		
		
		
	modals.form_add_things=tmp.find("#form_add_things")[0].outerHTML
	tmp.find("#form_add_things section.courses,#form_add_things section.ressources,#form_add_things section.classes,#form_add_things section.profs").remove()
		modals.nfms=tmp.find("#form_add_things")[0].outerHTML
		tmp.find("#form_add_things")[0].outerHTML=modals.form_add_things
	tmp.find("#form_add_things section.nfms,#form_add_things section.ressources,#form_add_things section.classes,#form_add_things section.profs").remove()
		modals.courses=tmp.find("#form_add_things")[0].outerHTML
		tmp.find("#form_add_things")[0].outerHTML=modals.form_add_things
	tmp.find("#form_add_things section.courses,#form_add_things section.nfms,#form_add_things section.classes,#form_add_things section.profs").remove()
		modals.ressources=tmp.find("#form_add_things")[0].outerHTML
		tmp.find("#form_add_things")[0].outerHTML=modals.form_add_things
	tmp.find("#form_add_things section.courses,#form_add_things section.ressources,#form_add_things section.nfms,#form_add_things section.profs").remove()
		modals.classes=tmp.find("#form_add_things")[0].outerHTML
		tmp.find("#form_add_things")[0].outerHTML=modals.form_add_things
	tmp.find("#form_add_things section.courses,#form_add_things section.ressources,#form_add_things section.classes,#form_add_things section.nfms").remove()
		modals.profs=tmp.find("#form_add_things")[0].outerHTML
		tmp.find("#form_add_things")[0].outerHTML=modals.form_add_things
	
	
	$(all_tpls).remove()
}
function receive_link(event){
		//teste sur l'url pour identifier le type du hash
		//deux cas :
				//soit il s'agit d'une succession de lien a partir de la racine,
				//soit il s'agit d'un lien du second type qui fonctionne avec un identifint après le caractère '=', auquel celui (via un switch) actif la fonction associé
}
function ancre_type_second(type=false,url=false,object=false){
		let ext="",tmp,obj,obj_,h,m,f
		if(object===false){
				alert("chaque 'case:' doit etre une promesse\nqui lance la fonction (ancre_type_second()) récursivement en y insérant les parametre type,url et object\nsinonancre_type_second() ne fonctionnera pas pour les appel ne résultant d'evts click")
				switch(type){
						case"classes":		$main_output_form.addClass('actived')
						break
						case"profs":
						break
						case"ressources":
						break
						case"courses":
						break
						case"qr":
						break
						default:
						break
				}
				return
		}
		$section.addClass('actived')
		$section.find('.output').removeClass('actived')
		ext=""
		tmp=$section.find('.'+type).addClass('actived')
		obj=object.obj
		obj_=object.obj_
		$section[0].obj=obj
		$section[0].obj_=obj_
		h=tmp.find('header')
		m=tmp.find('.main')
		f=tmp.find('footer')
		// alert(JSON.stringify(obj))
		// alert(JSON.stringify(obj_))
		// alert(obj.langue)
		// alert(obj.pays)
		// alert(obj.note_)
		// alert(obj.type_)
		
		// alert(JSON.stringify(obj.user))
		switch(type){
				case"classes":	
				break
				case"profs":
				break
				case"ressources":
						obj.dl_relinked=obj.lien.html.replace(/ /g,'-')
						// alert(obj_.json)
						console.log(obj_.json)
						let cpt=JSON.parse(obj_.json)
						// alert(cpt)
						console.log(cpt)
						// alert(objLength(cpt))
						cpt=extract_ressource_from_json(cpt,obj_)
						// alert(cpt)
						obj.json=cpt.html()
				break
				case"courses":
						// alert(obj_.date)
						let tmp=+new Date(obj_.date)+(obj_.duree*60*1000),tmp_=+new Date(),_tmp=+new Date(obj_.date)
						console.log("_tmp"+_tmp+"\n"+"tmp_"+tmp_)
						obj._modalclass=""
						// alert(tmp+"\n"+tmp_)
						// alert(new Date(obj_.date)+"\n"+new Date())
						// alert(tmp-tmp_)
						if(req_obj.connected)
							// if(obj_.type_id==2)ext="_redif"
							if(tmp<tmp_)ext="_redif"
							else if(obj_.profs_id==req_obj.profs_id){
								obj._modalclass="prof"
								ext="_prof"
							}else ext="_student"
						else ext="_discon"
						obj.opened=tmp<tmp_?false:tmp-tmp_
						obj.opened_=tmp<tmp_?"nodisplay":""
						obj.start=_tmp
						obj.started=_tmp<tmp_
						obj.started_=_tmp<tmp_?"started":""
						obj.ended=tmp<tmp_
						obj.ended_=tmp<tmp_?"ended":""
						obj.end=tmp
						obj.duree_=((obj_.duree/60).toFixed(2)+"").replace('.',':')
						obj.duree_=obj.duree_.split(':')[0].length==1?"0"+obj.duree_:obj.duree_
						console.log(obj)
						console.log(obj_)
				break
				case"qrs":
				break
				default:
				break
		}
		// alert(obj.json)
		tmp.html(Mustache.render($section[0][type+"_tpl"+ext],{obj:obj,obj_:obj_}))
}
function extract_ressource_from_json(x,y,z=true){
		let a,aa,i,j,k,btn_dir,div_dir,tmp,cpt=$("<div/>"),result=$("<div/>"),obj_=y
		for(a in x){
				// alert(a+" ___ "+x[a])
				if(a.indexOf("dir_")==0){
						btn_dir=$("<button/>").html(x[a].dirname).append($("<i/>").attr({class:type_to_icon["dir"]+" icon r_type_dir",title:b_translates.section.ressources.main.type_title+"'directory'"}))
						
						div_dir=$("<div/>").addClass(x[a].dir_id)
						result.append(btn_dir)
						tmp=extract_ressource_from_json(x[a],y,false)
						div_dir.append(tmp)
						result.append(div_dir)
						
						if(z===false)cpt.append(result.find(">*"))
				}else if(a.indexOf("file_")==0)
						if(z===false)cpt.append($("<li/>").append($("<a/>").attr({href:"/ressources/_"+obj_.id_ressources+"/"+x[a].href,title:x[a].title,"data-data":x[a].type}).html(x[a].html).append($("<i/>").attr({class:type_to_icon[x[a].type]+" icon",title:b_translates.section.ressources.main.type_title[x[a]]}))))
						else result.append($("<li/>").append($("<a/>").attr({href:"/ressources/_"+obj_.id_ressources+"/"+x[a].href,title:x[a].title,"data-data":x[a].type}).html(x[a].html).append($("<i/>").attr({class:type_to_icon[x[a].type]+" icon",title:b_translates.section.ressources.main.type_title+x[a].type}))))
				// alert(a)
		}
		if(z===false)return cpt.find(">*")
		else return result.attr("id","ressource_hierarchy")
}
function get_tl(){
		let s,e,laps,proportion,left,tampon,tmp,h,m,m_,m__,nth
//	IL Y A UNE INCOHERENCE DANS LE MODE REPLAY (et qui rejailli dans tous les modes), en bref :LA TIMELINE NA PAS ETE CREE DANS LE MODE REPLAY
		let TL=$section.find(".courses ._modal .prof .line .tl,.courses ._modal .students .line .tl").html($section.find(".courses ._modal .line .tl .rendertime,.courses .render_time")[0].outerHTML),tl=$section.find(".courses>span")[0].tl,duree=parseInt(TL.data('duree')),line=$('<div/>'),prof=$section.find(".courses ._modal .prof").length==1?true:false,students=$section.find(".courses ._modal .students").length==1?true:false
		if(prof){tl_select.innerHTML=$(tl_select).find('option')[0].outerHTML}
// LA CONDITION SUIVANTE NE DOIT PLUS EXISTER, CEST UNE CONDITION TEMPORAIRE
		if($section.find(".courses ._modal .prof .line .tl,.courses ._modal .students .line .tl").length!=0){
				if(tl.phases)
						tl.phases.forEach(function(i,j){
								// s=parseInt(i.start.substring(0,2))*60+parseInt(i.start.substring(3)),e=parseInt(i.end.substring(0,2))*60+parseInt(i.end.substring(3)),laps=e-s
								s=conv_time_in_minutes(i.start),e=conv_time_in_minutes(i.end),laps=e-s
								proportion=(laps/duree)*100
								left=(s/duree)*100
								tampon=$('<div/>').attr({"data-start":i.start,"data-end":i.end,class:"phase _"+j,style:"width:"+proportion+"%;border:solid;height:0;color:"+colors_array[j]+";position:absolute;left:"+left+"%;top:"+(j*(100/tl.phases.length))+"%",title:i.title})
								tampon[0].data=i
								tampon.onmousemove=function(e){console.log("je repère la position X et Y du clic dnas le conteneur, et j'affiche la valeur 'time' de l'instant")}
								TL.append(tampon)
								if(prof){
										$(tl_select).append($("<option/>").attr({value:"_"+j}).html(i.title))
										$(tl_select).find('option:last')[0].data=i
								}
								// tmp=TL.find('>div:last')
								// $(tl_select).find('option:last')[0].obj=tmp
						})
				if(tl.items)
						tl.items.forEach(function(i,j){
								// console.log('yoyoyo')
								nth=parseInt(i.id_phase.substring(1))+1
								m=conv_time_in_minutes(i.time)
								m_=conv_time_in_minutes(TL.find(">div:nth("+nth+")")[0].dataset.start)
								m__=conv_time_in_minutes(TL.find(">div:nth("+nth+")")[0].dataset.end)
								// m=(parseInt(i.time.substring(0,2))*60)+parseInt(i.time.substring(3))
								// m_=(parseInt(TL.find(">div:nth("+nth+")")[0].dataset.start.substring(0,2))*60)+parseInt(TL.find(">div:nth("+nth+")")[0].dataset.start.substring(3))
								// m__=(parseInt(TL.find(">div:nth("+nth+")")[0].dataset.end.substring(0,2))*60)+parseInt(TL.find(">div:nth("+nth+")")[0].dataset.end.substring(3))
								// console.log(m+" ___ "+m_+" ___ "+m__)
								m=m-m_
								// console.log(m)
								m_=m__-m_
								// console.log(m_)
								tmp=(m/m_)*100
								// console.log(tmp)
								tampon=$('<div/>').attr({"data-time":i.time,class:"item",style:"z-index:100;position:absolute;left:"+tmp+"%;width:1em;height:1em;border-radius:5px;background:gold;border:1px solid;color:black;",title:i.title})
								tampon.data=i
								tmp=$('<ul/>')
									.append($('<li/>').attr({onclick:"$(this).closest('span').find('.contain .r>*').slideUp().removeClass('actived');$(this).closest('span').find('.contain .r '+type_to_tag[$(this).closest('div').dataset.data.type]?type_to_tag[$(this).closest('div').dataset.data]:'iframe').addClass('actived').slideDown()[0].src=$(this).closest('div').dataset.data.href"}).append($('<i>').addClass('icon unhide')))
									.append($('<li/>').attr({onclick:"delete $(this).closest('span').tl.items["+j+"];closest('div').remove();$.get(ajax_path[ajax_path._]+'/_/delete_tl/"+course_footer_btn.dataset.id+"/items/"+j+"',function(xhr){alert(xhr)})"}).append($('<i>').addClass('icon Delete Calendar')))
								tampon.append(tmp)
								TL.find(">div:nth("+nth+")").append(tampon)
						})
		}
}
function run_tl(x="live"){
		let tmp,tmp_,_tmp,span=$section.find('.courses ._modal'),tl=Object.assign({},span[0].tl),start=span.data('start'),end=span.data('end'),retard=Math.round((+new Date()-start)/1000),duree=span.data('duree')-(retard/60),ending=duree*60,interval,onesecond=100/(parseInt(span.data('duree'))*60),_now=start,now=retard,prof=span.find('>.prof').length==1?span.find('>.prof'):false,students=span.find('>.students').length==1?span.find('>.students'):false,contain=span.find('>.contain'),rtl=contain.find('>.render_time'),nextevent,nextime,endphase="119:59",nt
		if(!span[0].tl.live)span[0].tl.live=[]
		if(!span[0].tl_)span[0].tl_=JSON.stringify(span[0].tl)
		// alert(span[0].tl.live)
		if(typeof socketio=="undefined"){
				// alert('ok')
				let ok=$('<script/>').attr({src:"/socketio/socket.io.js",id:"socketio"})
				document.head.append(ok[0])
				setTimeout(function(){consocket(prof,students,span)},1000)
		}
		if(prof)if(!sessionStorage.becamenet)sessionStorage.becamenet='{}'
			// alert('___'+sessionStorage.becamenet)
		// console.log("en secondes")
		// console.log("retard : "+retard)
		// console.log("duree : "+duree*60)
		// console.log("ending : "+ending) 
		
		if(x=="replay")alert("this is a replay, u're not in live mode\n time already passed n!gger")
		
		// alert(prof)
		// alert(students)
		// console.log("100/("+parseInt(span.data('duree'))+"*60) ___ "+onesecond*parseInt(span.data('duree'))*60)
		
		tl.items.forEach(function(i,j){if(conv_time_in_minutes(i.time)*60<now){delete tl.items[j]}})
		tl.phases.forEach(function(i,j){if(conv_time_in_minutes(i.end)*60<now){delete tl.phases[j]}})
		interval=setInterval(function(){
				if(prof){running_tl.style.width=now*onesecond+"%";
						// console.log("now : "+now+" * onesecond : "+onesecond+" :: "+now*onesecond)
				}
				if(students){}
				if(!students&&!prof){}
				rtl.html(new Date(_now).getTime()+" ___ "+now+" ___ "+ending)
				if(span[0].changed){
						tl=span[0].tl
						span[0].changed=false
						tl.items.forEach(function(i,j){if(conv_time_in_minutes(i.time)*60<now){delete tl.items[j]}})
						tl.phases.forEach(function(i,j){if(conv_time_in_minutes(i.end)*60<now){delete tl.phases[j]}})
				}
				
				// alert(nextevent)
				if(!nextevent){nextime="119:59"
						// alert(Object.keys(tl.items).length+'ok'+Object.keys(tl.phases).length)
						tl.items.forEach(function(i,j){if(i.time<nextime){tmp=i;tmp_=j;nextime=i.time;console.log("looping into items")}})
						tl.phases.forEach(function(i,j){if(i.start<nextime){tmp=i;tmp_=j;nextime=i.start;alert("looping into phases")}})
						if(nextime=="119:59")nextevent={_:"items and phases are already all passed away"}
						else{
								// console.log(nextime+"___"+nextevent)
								nextevent=tmp
								// nextevent.j=tmp_
								// nextime=nextevent.start||nextevent.time
								if(tmp.time){
										delete tl.items[tmp_]
										nextevent._="item"
										// alert('nextevent :item'+JSON.stringify(tl.items))
										// if(nextphase)nextime=nextphase.start<=nextitem.time?nextphase.start:nextitem.time
								}else{						
										delete tl.phases[tmp_]
										nextevent._="phase"
										// alert('nextevent :phase'+JSON.stringify(tl.phases))
										// nextime=nextphase.start<=nextitem.time?nextphase.start:nextitem.time
										endphase=conv_time_in_minutes(tmp.end)*60
								}
								tmp=tmp_=null
						}
				}
				now+=1
				_now+=1000
				ending--
				nt=conv_time_in_minutes(nextime||"119:59")*60
				// console.log("nt :: "+nt+" ___ now :: "+now+" ----------- "+nextevent._)
				if(now>=nt){
						console.log("nextevent :: "+nextevent)
						console.log("type :: "+nextevent._)
						console.log("endphase :: "+(endphase)+" ___ ")
						console.log("type_to_tag[nextevent.type]?type_to_tag[nextevent.type]:'iframe' :: "+(type_to_tag[nextevent.type]?type_to_tag[nextevent.type]:"iframe"))
						console.log("nexttime :: "+nextime)
						console.log("nt :: "+nt)
						console.log("now :: "+now)
						if(nextevent.start){
								alert('changing phase')
								console.log('changing phase')
								console.log(tl.phases)
								contain.find('>h3').html(nextevent.title)
								if(prof)span.find('.prof .tl>div').each(function(i,j){if(j.title==nextevent.title)$(j).addClass('actived');else $(j).removeClass('actived')})
								msgflash('courses',b_translates.section.courses._modal.msgs.newphase)
						}
						if(nextevent.time){
								alert('changing item')
								console.log('changing item'+tl.items)
								let tmp=type_to_tag[nextevent.type]?type_to_tag[nextevent.type]:"iframe"
								contain.find(">.rscs>*:not(div)").removeClass('actived').removeAttr('style')
								// console.log(contain.find(">.rscs>"+tmp))
								// console.log(contain.find(">.rscs>"+tmp).addClass('actived'))
								// console.log(contain.find(">.rscs>"+tmp).addClass('actived').data("timestamp",nextevent.time))
								contain.find(">.rscs>"+tmp).addClass('actived').data("timestamp",nextevent.time)[0].src=nextevent.href
								contain.find(".rscs>h3").html(nextevent.title)
								msgflash('courses',b_translates.section.courses._modal.msgs.newitem)
						}
						console.log('yooooooooooooooooooooo')
						console.log(nextevent)
						nextevent=nextime=null
						console.log(nextime)
						console.log('yooooooooooooooooooooo')
				}ending--;ending--;ending--;ending--;
				if(now>=endphase){contain.find('>h3').html("");endphase=null;msgflash('courses',b_translates.section.courses._modal.msgs.endphase)}
			// alert('z'+sessionStorage.becamenet)
				if(prof){let tmp
				console.log(interval+"_   _"+now+" ___ "+now%5)
						if(now%5==0||ending<=0){
								console.log('five seconds')
								console.log(span[0].tl_)
								tmp=JSON.parse(sessionStorage.becamenet)
								tmp["course_"+course_footer_btn.dataset.id].tl=span[0].tl_
													// sessionStorage.becamenet=JSON.stringify(tmp)
								sessionStorage.becamenet=JSON.stringify(tmp)
						}
						if(ending<=0){
								alert("LE COURS EST TERMINEEEEEEEEEE!!!")
								console.log(tmp)
								console.log(sessionStorage.becamenet)
								// $.post("/_/endcourse/"+course_footer_btn.dataset.id+"/"+escape(sessionStorage.becamenet),function(xhr){alert("le cours est enregistré avec succès")})
								let url="/_/endcourse/"+course_footer_btn.dataset.id+"/"+escape(sessionStorage.becamenet).replace(/\//g,'|-|')
								$.post(url,function(xhr){if(xhr==1)alert("le cours est enregistré avec succès");else alert('error : '+xhr)})
								console.log(url)
								masocket.emit("disconnected",'course_'+$section.find('.courses>footer button').data('id'))
								clearInterval(interval)
								interval=null
						}
				}
				// if(now>(span.data("duree")*60000))
				if(ending<=0){masocket.close()}
		},1000)
}
function consocket(prof,students,span){
		let room='course_'+$section.find('.courses>footer button').data('id'),tmp
		// if(!span[0].tl_)span[0].tl_=Object.assign({},span[0].tl)
		
		console.log("consocket")
		masocket=io.connect(document.location.origin+"/courses",{query:"pseudo="+req_obj.user_.nom+" "+req_obj.user_.prenom+" "+req_obj.profs_id+"&avatar="+req_obj.user_.avatar+(prof?"&prof=true":"")})
		masocket.on('connected',(id)=>{
				console.log('connected with id : '+id)
				masocket.emit('room',room)
			// alert('un'+sessionStorage.becamenet)
				//alert(data)
				// oldmsg.innerHTML=data
				// masocket.emit('functions',function(){console.log('jenvoe une fonction')}) 
				// masocket.emit("okokiamin!","merci")
				// masocket.send('socket.send')
				// masocket.emit('pseudo','cyrille achi')
		})
		masocket.on('message',function(m){
				console.log('recieved "message"')
		})
		masocket.on('public_msg',function(m){alert('broadcasted '+m)
				console.log('recieved "public_msg"')
		})
		masocket.on('joined_',function(data){
				if(data.connected)	if($section.find('.students .status .professeur').html()=="")$section.find('.students .status .professeur').append($("<img/>").attr({src:data.img,title:data.pseudo,"data-id":data.id})).append($("<a/>").attr({href:"#",title:"blablabla"}).html('ueniuengIl faurait pouvoir insérer le lien du prof ici.ejej'))
											else{$section.find('.students .status .professeur').removeClass('leaved')}
				else if(data.newuser){data=data.newuser
						msgflash('courses',b_translates.section.courses.socketio.justcon)
						span.find('.contain>.stats .connected')[0].innerHTML=parseInt(span.find('.contain .stats .connected')[0].innerHTML)+1
						span.find('.contain>.stats .users').append($('<a/>').attr({title:data.pseudo,"data-id":data.id}).append($("<img/>").attr({src:data.img})))
				}
		})
		masocket.on('joined',function(data){
			// alert('deux'+sessionStorage.becamenet)
				console.log('recieved "joined"')
				span.find('.contain>.msgs').html(b_translates.section.courses.socketio.selfcon)
				span.find(".prof,.students").attr("data-id",data.self.id)
				span.find(".prof,.students")[0].id=data.self
				// if(prof||students){//CETTE CONDITION NEST PAS SENSE SERVIR VU QUE LON NE PEUT RECEVOIR VENANT DE socketio QUE SI prof OU students VAUT true
						// if(data.pseudo!=req_obj.user_.nom+" "+req_obj.user_.prenom+" "+req_obj.profs_id)span.find('.contain>.msgs').append($('<div/>').attr("class",'msgflash tr0').html(data.pseudo+b_translates.section.courses.socketio.justcon))
						// span.find('.contain>.stats .connected')[0].innerHTML=parseInt(span.find('.contain .stats .connected')[0].innerHTML)+1
						// span.find('.contain>.stats .users').append($('<a/>').attr({title:data.pseudo,"data-id":data.id}).append("<img/>").attr({src:data.img}))
						// span.find(".prof,.students").attr("data-id",data.id)
				// } 
				data.users.forEach(function(i){
						span.find('.contain>.stats .connected')[0].innerHTML=parseInt(span.find('.contain .stats .connected')[0].innerHTML)+1
						span.find('.contain>.stats .users').append($('<a/>').attr({title:data.pseudo,"data-id":data.id}).append($("<img/>").attr({src:data.img})))
				})
				if(prof){
					console.log("_ufduihiudfhuihdg_")
					console.log(span[0].tl)
					console.log(span[0].tl_)
						window.onbeforeunload=function(){masocket.emit("prof leave",{room:room})}
						let live=span.find('>.prof .live')
						live.find('.textarea input[type=submit],.textarea button').off("click")
						live.find('>button').each(function(i,j){
								if(j.className=="text"||j.className=="ask"){$(j).on("click",function(){live.find('.textarea').slideDown().find('.text_ask').slideDown().find('input[type=submit]')[0].type_=j.className;live.find('.textarea')[0].className="textarea pr nodisplay "+j.className;})}
								if(j.className=="audio"){/*audio:{optional:[{sourceId:s.value}]}*/j.obj={audio:true,video:false};$(j).click(function(){alert("impossible d'accéder au micro, va savoir pourquoi, ca a marché durant es premier essaie, pi d'un coup plus rien")})}
								if(j.className=="video"){/*j.obj={audio:true,video:true}*/j.obj={video:true}}
								if(j.className=="screencast"){j.obj={video:{mandatory:{chromeMediaSource:'screen'}}}}
								if(j.className=="file"){$(j).on("click",function(){live.find('.textarea').addClass('off');live.find('.textarea,.textarea form').slideDown();})}
								if(j.className=="audio"||j.className=="video"||j.className=="screencast"){$(j).on('click',function(){
										live.find('.gum').data('type',j.className);
										navigator.mediaDevices.getUserMedia(j.obj).then(function(stream){live.find('.gum')[0].type=j.className;live.find('.gum')[0].stream=stream;live.find('.gum '+(j.className!="screencast"?j.className:"video"))[0].src=URL.createObjectURL(stream);/*.srcObject=stream*/}).catch((r)=>{live.find('.textarea,.textarea .gum').slideUp();console.log(r);alert("yoyoyo"+r)})
										// navigator.getUserMedia(j.obj,function(stream){alert("ok")},(r)=>{live.find('.textarea,.textarea .gum').slideUp();console.log(r);alert("yoyoyo"+r)})
										live.find('.textarea').addClass('off');live.find('.textarea,.textarea .gum').slideDown();
								})}
								if(j.className=="asked"){}
						})
						live.find('.textarea .text_ask input[type=submit]').on("click",function(){
								// alert("live "+this.type_);
								let val=$(this).parent().find('textarea'),tmp={_:"live_"+this.type_,asks:[],answers:[],room:room,value:val.val(),timestamp:(+new Date()),commentaire:i_profsendftext_cb.checked}
								masocket.emit("live "+this.type_,tmp)
								fromproflive(tmp)
								let tl_=JSON.parse(span[0].tl_)
								tl_.live.push(tmp)
								span[0].tl_=JSON.stringify(tl_)
								val.val("")
								alert(tmp._)
						})
						live.find('form input[type=submit]').click(function(e){
								if(this.previousSibling.value!=""){
										e.preventDefault()
										let fd=new FormData(this.parentNode),timestamp=(+new Date()),tmp={asks:[],room:room,_:"live_file",timestamp:timestamp}
										console.log(fd)
										$.ajax({url:"/courses_live_profsendfile/"+"_-_public_-_files_-_courses_-__"+course_footer_btn.dataset.id+"_-_live_-_"+timestamp,type:"post",data:fd,success:function(xhr){
												tmp.value=xhr;
												alert(xhr);
												if(xhr!=0){
														let tl_
														masocket.emit("live file",tmp);
														fromproflive(tmp)
														tl_=JSON.parse(span[0].tl_)
														tl_.live.push(tmp)
														span[0].tl_=JSON.stringify(tl_)
												}else alert('error while emitting "live file"');
										},processData:false,contentType:false})
										// $.post(
												// "/courses_live_profsendfile/"+"_-_public_-_files_-_courses_-__"+course_footer_btn.dataset.id+"/live/"+timestamp,
												// fd,
												// function(xhr){alert(xhr);if(xhr!=0)masocket.emit("live file",{room:room,value:xhr,_:"live_file",timestamp:timestamp})}
												// ,"text"
										// )
								}else alert('ejvjvjiVeuillez charger un fichier avant de valider svp...oujzfdohof')
								$(this).closest('.textarea').slideUp().removeClass('off').slideUp()
						})
						live.find('.gum button').click(function(e){
								let to,start_btn=$(this).parent().find('.start')[0],gum_=$(this).closest('.gum')[0],type=(gum_.type=="video"||gum_.type=="screencast")?"video":"audio",mime=type=="video"?{mimeType:"video/webm"}:{mimeType:"audio/mp3"},r
								if(this.className=="start"){
										let self=this,i=-1
										self.paused=false
										// alert(self)
										if(!this.opened){
												self.obj={_:"live_"+gum_.type,type:type,asks:[],answers:[],room:room,value:"void",timestamp:(+new Date()),i:i}
												self.opened=true
												self.tosend=[]
												self.tokeep=[]
												self.r=new MediaRecorder(gum_.stream,mime)
												self.r.ondataavailable=function(buffer){/*i++;if(i%100==0)console.log(self.tosend);*/self.obj.i=i++;self.tosend.push(buffer.data);self.tokeep.push(buffer.data)}
												// alert(self.opened)
												// alert(start_btn.opened)
												
												masocket.emit("live stream",self.obj)
												let tl_=JSON.parse(span[0].tl_)
												tl_.live.push(self.obj)
												span[0].tl_=JSON.stringify(tl_)
												self.to=setInterval(function(){console.log(self.tosend);self.obj.value=self.tosend;console.log("_____");console.log(self.obj);masocket.emit("live stream",self.obj);self.tosend=[]},15000)
												self.r.start(100);
												fromproflive(self.obj)
										}
										if(self.paused){
												masocket.emit("live stream restarted",{room:room,_:"live_stream_restarted",type:type})
												self.to=setInterval(function(){self.obj.value=self.tosend;masocket.emit("live stream",self.obj);self.tosend=[]},15000)
												self.r.start(100);
										}
								}
								if(start_btn.opened){
										if(this.className=="pause"){start_btn.to=null;start_btn.paused=true;r.stop();masocket.emit("live stream paused",{room:room,_:"live_stream_pause",type:gum_.type})}
										if(this.className=="stop"){
												start_btn.r.stop();clearTimeout(start_btn.to);/*start_btn.r.close();*/console.log(start_btn.r);
												start_btn.obj=start_btn.to=start_btn.opened=start_btn.tosend=start_btn.tokeep=start_btn.r=null;
												// alert(gum_.stream);
												if(typeof gum_.stream!="undefined"){gum_.stream.getTracks().forEach(function(i){i.stop();alert('ok')});alert('video stopped');}else alert('void');
												live.find('.textarea,.textarea .gum').slideUp().removeClass('off')
										}
								}else alert("iueieuouzVeuillez d'abord lancer l'enregistrement avant de tenter une pause ou un arrêt svp.fuuenuoehoue")
						})
						let tmp=JSON.parse(sessionStorage.becamenet) 
						if(!tmp["course_"+course_footer_btn.dataset.id]){
								tmp["course_"+course_footer_btn.dataset.id]={}
								// alert("course_"+course_footer_btn.dataset.id)
								// alert(sessionStorage.becamenet["course_"+course_footer_btn.dataset.id])
								tmp["course_"+course_footer_btn.dataset.id].tl=span[0].tl_
								sessionStorage.becamenet=JSON.stringify(tmp)
						}
				}
				else if(students){
						window.onbeforeunload=function(){masocket.emit("student leave",{room:room})}
						if(data.connected)	if($section.find('.students .status .professeur').html()=="")$section.find('.students .status .professeur').append($("<img/>").attr({src:data.img,title:data.pseudo,"data-id":data.id})).append($("<a/>").attr({href:"#",title:"blablabla"}).html('ueniuengIl faurait pouvoir insérer le lien du prof ici.ejej'))
													else{alert('.....je ne sais pas quoi faire encore..')}
						
						span.find(".contain .live,.students .textarea input,.rscs .opts .help").off("click")
						span.find(".contain .live").on("click","li.ask",function(){let tmp=span.find('.students .textarea input');tmp.parent()[0].className="textarea b0 h25 w100 actived ask";span.find('.students .textarea label').html(tmp[0].dataset.ask);tmp[0].type_="ask";tmp[0].id_=$(this).closest('section').data('timestamp')})
						span.find(".rscs .opts .help").parent().on("click",function(){let tmp=span.find('.students .textarea input');tmp.parent()[0].className="textarea b0 h25 w100 actived ask";span.find('.students .textarea label').html(tmp[0].dataset.ask_);tmp[0].type_="ask";tmp[0].id_=span.find('.contain .rscs .actived:not(div)').data('timestamp');tmp[0].r=true})
						// span.find(".contain .live").on("click",".student_ask input",function(){let tmp={id:this.id_,room:room,value:this.previousSibling.value,timestamp:(+new Date())};masocket.emit('fromstudents ask',tmp)})
						span.find(".contain .live").on("click","li.answer",function(){let tmp=span.find('.students .textarea input');tmp.parent()[0].className="textarea b0 h25 w100 actived text";span.find('.students .textarea label').html(tmp[0].dataset.answer);tmp[0].type_="answer";tmp[0].id_=$(this).closest('section').data('timestamp')})
						// span.find(".contain .live").on("click",".asked button",function(){let tmp={id:this.id_,room:room,value:this.previousSibling.value,timestamp:(+new Date())};masocket.emit("fromstudents answer",tmp)})
						span.find(".students .textarea input").click(function(){let tmp={id:this.id_,id_:this.id_,type:this.type_,room:room,value:this.previousSibling.value,timestamp:(+new Date()),ressource:(this.r?true:false)};this.r=null;masocket.emit("fromstudents "+this.type_,tmp);span.find('.students textarea').val('');span.find('.students .textarea')[0].className="textarea b0 h25 w100"})
				}
				else{}
		})
		masocket.on('endmedialive',function(data){let tmp=span.find('.contain .live .video video[src!=""],.contain .live .audio audio[src!=""]')[0].src="";alert("iufudfuifvFin du médiaouuoeoue")})
		masocket.on('fromproflive',function(data){
				console.log('recieved "fromproflive"')
				console.log(data)
				fromproflive(data)
				// if((tmp=Object.keys(data).match(/(video_|audio_)/)))
						// span.find(".contain .live ."+tmp[0].substring(0,tmp.length-1)+" "+tmp[0].substring(0,tmp.length-1))[0].src=URL.createObjectURL("")
		})
		masocket.on('fromstudents',function(data){
				let tmp,bool=false
				console.log('recieved "fromstudents"')
				alert('recived_student_question')
				console.log(data)
				switch(data.type){
						case"ask":
						case"answer":
								if(data.ressource){bool=true}
								else {
//PETIT MANQUE ICI, LA CONDITION SUR LE bool NEST PAS COMPLETE : SI LE timestamp EST TROUVE DANS LE LIVE (partie manquante) ET SI IL EST TROUVE DANS LA tl
										span.find('.contain .live section').each(function(i,j){alert(j.dataset.timestamp+"=="+data.id);if(j.dataset.timestamp==data.id){bool=true;tmp=JSON.parse(j.dataset[data.type+"s"]);tmp.push(data);j.dataset[data.type+"s"]=JSON.stringify(tmp);console.log("fromstudents matched html")}})
										span[0].tl.live.forEach(function(i){if(i.timestamp==data.id){bool=true;i[data.type+"s"].push(data);console.log("fromstudents matched tl.live")}})
								}
								if(bool){
										span.find('.prof .notifications .'+data.type+'s')[0].innerHTML++
										span.find('.prof .notifications .'+data.type+'s_').append($('<div/>').html(JSON.stringify(data)))
										if(data.type=="answer")msgflash('courses',b_translates.section.courses._modal.live.msg_newanswer)
										else msgflash('courses',b_translates.section.courses._modal.live.msg_newask)
								}
								alert("!!! ATTENTION, il y a des données à insérer dans la timeline!")
						break
						break
						default:break
				}
				
		})
}
function fromproflive(data){
		let live=$section.find('.courses ._modal .contain .live'),bool=true,tmp,tmp_
		// ehieiif(!(tmp=this.obj))tmp=$("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Window Maximize')).attr({title:b_translates.section.courses._modal.live.opt_fs,"class":"fs"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))
		// Object.keys(data).forEach(function(i){
		// }
		console.log('okok'+data._) 
		switch(data._){
				case"prof_leave":$section.find('.students .status .professeur').addClass('leaved')
				break;case"live_text":if(data.commentaire){setTimeout(function(){$section.find('.contain .rscs .comments').removeClass('o1_')},60000);$section.find('.contain .rscs .comments').attr({"data-timestamp":data.timestamp}).addClass('o1_').find('.comment').html(data.value);}live.append($("<section/>").html(data.value).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-asks":"[]"}).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Window Maximize')).attr({title:b_translates.section.courses._modal.live.opt_fs,"class":"fs"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))))
				break;case"live_ask":if(data.commentaire){setTimeout(function(){$section.find('.contain .rscs .comments').removeClass('o1_')},60000);$section.find('.contain .rscs .comments').attr({"data-timestamp":data.timestamp}).addClass('o1_').find('.comment').html(data.value);}live.append($("<section/>").html(data.value).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-answers":"[]"}).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Window Maximize')).attr({title:b_translates.section.courses._modal.live.opt_fs,"class":"fs"})).append($("<li/>").append($("<i/>").addClass('icon Unhide')).attr({title:b_translates.section.courses._modal.live.opt_open,"class":"open"})).append($("<li/>").append($("<i/>").addClass('icon Write Square')).attr({title:b_translates.section.courses._modal.live.opt_answer,"class":"answer"}))))
				break;case"live_audio":live.find('.'+data._).each(function(i,j){if(j.dataset.timestamp==data.timestamp){bool=false;data.value.forEach(function(i){liveblob.push(i)})}});if(!bool)live.find('.'+data.type+" "+data.type).src=URL.createObjectURL();else live.append($("<section/>").html(b_translates.section.courses._modal.live.contenu_a).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-src":data.value}).append($("<audio/>").attr({/*src:data.value,*/controls:true})).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Volume Up')).attr({title:b_translates.section.courses._modal.live.opt_play,"class":"play_audio"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))))
				// break;case"live_video":case"live_screencast":live.find('.'+data._).each(function(i,j){if(j.dataset.timestamp==data.timestamp){bool=false;liveblob[liveblob.length]=[];data.value.forEach(function(i){liveblob[liveblob.length-1].push(i)})}});console.log("liveblob");/*console.log(liveblob);*/if(!bool)live.find('.'+data.type).slideDown().find(data.type)[0].src=URL.createObjectURL(new Blob(liveblob[liveblob.length-1]));else live.append($("<section/>").html(b_translates.section.courses._modal.live.contenu_v).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-src":data.value}).append($("<video/>").attr({/*src:data.value,*/controls:true})).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Record')).attr({title:b_translates.section.courses._modal.live.opt_play,"class":"play_video"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))))
				break;case"live_video":case"live_screencast":
			live.find('.'+data._).each(function(i,j){
				if(j.dataset.timestamp==data.timestamp){
					let tmp=live.find('.'+data.type+" "+data.type)[0];
					if(!tmp.i)tmp.i=[];/*tmp.i.push((data.i*.1).toFixed(3));*/
					bool=false;
					data.value.forEach(function(i){liveblob.push(i)});
					if(!tmp.onended){
						tmp.to=setInterval(function(){console.log(tmp.duration);if(tmp.duration!="Infinity"&&!isNaN(tmp.duration)){clearInterval(tmp.to);tmp.i.push(tmp.duration)}},500);
						live.find('.'+data.type+",."+data.type+" "+data.type).slideDown();
						tmp.src=URL.createObjectURL(new Blob(liveblob,{type:"video/webm"}));
						tmp.onended=function(){
							tmp.src=URL.createObjectURL(new Blob(liveblob,{type:"video/webm"}));
							tmp.to=setInterval(function(){console.log(tmp.duration);if(tmp.duration!="Infinity"&&!isNaN(tmp.duration)){console.log((tmp.duration!="Infinity")+" ___ "+(!isNaN(tmp.duration)));clearInterval(tmp.to);tmp.i.push(tmp.duration.toFixed(0))}},500);
							tmp.currentTime=tmp.i[tmp.dataset.i++];
							console.log(tmp.currentTime+" ___ "+tmp.duration+" ___ "+tmp.i[parseInt(tmp.dataset.i)-1]+" ___ "+tmp.dataset.i);
						};
					};
				}
			});/*console.log("liveblob");console.log(liveblob);*/
			if(bool)live.append($("<section/>").html(b_translates.section.courses._modal.live.contenu_v).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-src":data.value}).append($("<video/>").attr({/*src:data.value,*/controls:true})).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Record')).attr({title:b_translates.section.courses._modal.live.opt_play,"class":"play_video"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))))
				break;case"live_audio_":live.append($("<section/>").html(b_translates.section.courses._modal.live.contenu_playing).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-src":data.value}).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Volume Up')).attr({title:b_translates.section.courses._modal.live.opt_play,"class":"play_audio"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))))
				break;case"live_video_":live.append($("<section/>").html(b_translates.section.courses._modal.live.contenu_playing).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-src":data.value}).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon Record')).attr({title:b_translates.section.courses._modal.live.opt_play,"class":"play_video"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))))
				break;case"live_file":let tmp=ext_to_type[data.value.substring(data.value.lastIndexOf('.')+1)]||"unkown";alert(tmp);live.append($("<section/>").html(b_translates.section.courses._modal.live.thisis_afile).attr({"class":data._+" w50 pr fr_","data-timestamp":data.timestamp,"data-tag":type_to_tag[tmp],"data-src":data.value,"data-asks":"[]"}).append($("<ul/>").append($("<li/>").append($("<i/>").addClass('icon '+type_to_icon[tmp])).attr({title:b_translates.section.courses._modal.live.opt_play,"class":"play_file"})).append($("<li/>").append($("<i/>").addClass('icon Help Circle Outline')).attr({title:b_translates.section.courses._modal.live.opt_ask,"class":"ask"}))))
				break;case"live_stream_paused":alert(b_translates.section.courses._modal.live.stream_paused);live.find('.'+data.type+" "+data.type).pause()
				break;case"live_stream_restarted":data.type=data.type=="screencast"?"video":data.type;live.find('.'+data.type+" "+data.type).play()
				break;case"live_stream_finished":alert("il faut créer un blob amintenant"),liveblob=[]
				break;default:break
		}
		msgflash('courses',b_translates.section.courses._modal.students.msgs_psl)
}
function msgflash(type,msg){switch(type){case"courses":$section.find('.courses ._modal .contain>.msgs').append($('<div/>').attr("class",'msgflash tr0').html(msg));break;default:break}}





























function action_click(type=""){
	switch(type){
		case "":
		break
		case 0:
		// alert("do alls visuals actions in here")
		break
		default:
		break
	}
}
function fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(article){
		// alert(typeof article)
		// alert(article)
		// alert(article.header)
		// alert(article.header.h)
		// alert(article.main.p)
		// alert(article.footer)
		// alert(article.footer.template)
		art_h.html(article.header.h)
		art_hi.attr({src:article.header.img.src,alt:article.header.img.alt,title:article.header.img.title})
		art_m_.html(article.main.p)
		art_f.html(article.footer.template?article.footer.template:"")
		if($(art_f).find(".suggestions,.questions").length==0){
			art_f.append($("<button/>").attr({class:"suggestion"}).html(b_translates.buttons.artf.suggestions))
			art_f.append($("<button/>").attr({class:"questions"}).html(b_translates.buttons.artf.questions))
			art_f.append($("<button/>").attr({class:"open_output"}).html(b_translates.buttons.artf.open_output))
		}
		
		fil_a.article_=main_article.innerHTML
}
function _0(xhr){
		// alert('ok')
		let temp,tmp
		fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(JSON.parse(xhr[0][0].article))
		action_click(0)
		setTimeout(function(){$(left).addClass('off')},1000)
		$main_section.addClass('actived')
		$main_output_form.removeClass('actived')
		$main_output_form.find('.choose .oprofs,.choose .oressources,.choose .ocourses,.choose .oclasses').hide()
		if((temp=$main_section.find('>nav.'+xhr[0][0].id)).length==0){
				tmp=$("<nav/>").addClass('childs_fl '+xhr[0][0].id)
				xhr[1].forEach(function(i,j){
						// alert(JSON.stringify(i))
						// alert(i.lien)
						i.lien=JSON.parse(i.lien) 
						// alert(i.lien)
						// alert(i.lien.html)
						let tmp_=i.lien.html.substring(0,1),_tmp
						// alert(tmp_)
						if(tmp.find('.'+tmp_.toLowerCase()).length==0)
								tmp.append(`<span class="${tmp_.toLowerCase()}">${tmp_}</span><div></div>`)
						let div=tmp.find('.'+tmp_.toLowerCase()+'+div')
						// alert(div.length)
						let a=$("<a/>")
						a.attr({href:document.URL+"&"+i.lien.href,title:i.lien.title,class:"filieres"}).data('data',i.id_filieres).html(i.lien.html)
						let img=$('<img>').attr({src:i.lien.img.src,alt:i.lien.img.alt,title:i.lien.img.title,class:"ui avatar image abs"})
						a.append(img)
						// alert(JSON.stringify(a.data())+i.id_filieres)
						div.append(a)
				})
				$main_section.append(tmp)
				temp=tmp
		}
		// alert(temp)
		// alert(temp.length)
		// alert(temp[0])
		// alert(temp.html())
		$main_section.find('>nav:not(.tags)').slideUp()
		temp.slideDown()
		
		fil_a.article=$(main_article).clone()
}
function fonction_qui_traite_la_reponse_xhr_vers_$main_section(obj){
		let xhr={}
	
		$(fildariane).find('.un').add($(fildariane).find('.deux')).add($(fildariane).find('.trois')).add($(fildariane).find('.quatre')).add($(fildariane).find('.upper')).remove()
		// fil_a=addH(fildariane,'a',obj.context.innerText,{class:"un",href:obj.context.href,title:obj.context.innerText})
		fil_a=$(obj.context).clone().addClass("un")[0]
		fil_a.obj=obj.context
		$(fildariane).append(fil_a)
		console.log("niveaux_"+$(obj.context).data('data'));		console.log(ajax_path[ajax_path._]+"/_/filieres/"+$(obj.context).data('data'))
		
		if(typeof(xhr=compiled["niveaux_"+$(obj.context).data('data')])=="undefined")
			$.get(
					ajax_path[ajax_path._]+"/_/filieres/"+$(obj.context).data('data'),
					function(xhr){
							// alert(xhr)
							xhr=JSON.parse(xhr)
							compiled["niveaux_"+$(obj.context).data('data')]=xhr
							_0(xhr)
					}
			)
		else{
				_0(xhr)
		}
}
function _1(xhr){
		fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(JSON.parse(xhr[0][0].article))
		$left.removeClass('off')
		$main_section.add($main_section_).removeClass('actived')
		$main_output_form.removeClass('actived')
		$main_output_form.find('.choose .oprofs,.choose .oressources,.choose .ocourses').hide()
		$main_output_form.find('.choose .oclasses').show()
		setTimeout(function(){$left.addClass('actived')},1000)
		// $main_article.find('footer').append("<h3>"+b_translates.sentences.classes_footerh3+"</h3>").append("<ul class='classes'></ul>")
		let tmp=$left_output.find('li'),tmp_=$main_article.find('footer ul.classes')
		tmp.remove()
		
		xhr[1].forEach(function(i,j){
				// alert(JSON.stringify(i))
				// alert(i.lien)
				// alert(JSON.stringify(i))
				if(typeof i.lien=="string")
						i.lien=JSON.parse(i.lien) 
				let li=$("<li/>")
				let a=$("<a/>")
				a.attr({href:document.URL+"="+i.lien.href,title:i.lien.title,class:"matieres"}).data('data',i.id_matieres).html(i.lien.html).append('<img>').attr({src:i.lien.img.src,alt:i.lien.img.alt,title:i.lien.img.title})
				let img=$('<img>').attr({src:i.lien.img.src,alt:i.lien.img.alt,title:i.lien.img.title,class:"ui avatar image abs"})
				a.append(img)
				li.append(a)
				$left_output.append(li)
		})
		xhr[2].forEach(function(i,j){
				// alert(JSON.stringify(i))
				if(i.eleves==null)i.eleves=[]
				else i.eleves=i.eleves.split('||')
				i.profs=i.profs.split('||')
				tmp=$("<li/>")
				tmp.append(
						$("<a/>").attr({href:"#!"+b_translates.urls.classes+"="+b_params.urls.classes+i.href,title:i.title,class:"classes"}).html(i.name).data('data',i.id_classes)
				).append(
						$("<span><i class='pays_"+i.pays+"'></i><i class='langue_"+i.langue+"'></i><i class='eleves' title='"+b_translates.sentences.main_output.eleves_nbr+"'>"+i.eleves.length+"</i><i class='profs' title='"+b_translates.sentences.main_output.profs_nbr+"'>"+i.profs.length+"</i><i class='cl_type'>"+i.type+"</i><i class='date'>"+i.date+"</i></span>")
				)
				// tmp_.append(tmp)
		})
		
		fil_a.article=$(main_article).clone()
}
function fonction_qui_traite_la_reponse_xhr_vers_$left_output(obj){
		let xhr={}
		let classname="deux",tmp=""
	
		if(obj._){	classname="un";$(fildariane).find('.un').remove()	}
		else tmp=$(fildariane).find('.un')[0].title+" "
		$(fildariane).find('.deux').add($(fildariane).find('.trois')).add($(fildariane).find('.quatre')).add($(fildariane).find('.upper')).remove()
		// let fil_a=addH(fildariane,'a',obj.context.innerText,{class:classname,href:obj.context.href,title:tmp+obj.context.innerText})
		fil_a=$(obj.context).clone().addClass(classname)[0]
		fil_a.obj=obj.context
		$(fildariane).append(fil_a)
		console.log("filieres_"+$(obj.context).data('data'))
		
		if(typeof(xhr=compiled["filieres_"+$(obj.context).data('data')])=="undefined"){
				$.get(
						ajax_path[ajax_path._]+"/_/matieres/"+$(obj.context).data('data'),
						function(xhr){
								// alert(xhr)
								xhr=JSON.parse(xhr)
								compiled["filieres_"+$(obj.context).data('data')]=xhr
								_1(xhr)
						}
				)
		}else{
				_1(xhr)
		}
}
function _2(xhr){
		let temp,tmp,div,a,img
		fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(JSON.parse(xhr[0][0].article))
		setTimeout(function(){$(left).addClass('off')},1000)
		$left.removeClass('actived')
		$main_section_.addClass('actived')
		$main_output_form.removeClass('actived')
		$main_output_form.find('.choose .oressources,.choose .ocourses').hide()
		$main_output_form.find('.choose .oprofs').show()
		// $main_article.find('footer').append("<h3>"+b_translates.sentences.profs_footerh3+"</h3>").append("<ul class='classes'></ul>")
		
		if((temp=$main_section_.find('>nav.'+xhr[0][0].id)).length==0){
				temp=$("<nav/>").addClass('childs_fl '+xhr[0][0].id)
				xhr[1].forEach(function(i,j){
						// alert(JSON.stringify(i))
						// alert(i.lien)
						i.lien=JSON.parse(i.lien) 
						// alert(i.lien)
						// alert(i.lien.html)
						tmp=i.lien.html.substring(0,1)
						// alert(tmp)
						if(temp.find('.'+tmp.toLowerCase()).length==0)
								temp.append(`<span class="${tmp.toLowerCase()}">${tmp}</span><div></div>`)
						div=temp.find('.'+tmp.toLowerCase()+'+div')
						// alert(i.id_sujets)
						a=$("<a/>")
						a.attr({href:document.URL+"&"+i.lien.href,title:i.lien.title,class:"sujets"}).data('data',i.id_sujets).html(i.lien.html)
						img=$('<img>').attr({src:i.lien.img.src,alt:i.lien.img.alt,title:i.lien.img.title,class:"ui avatar image abs"})
						a.append(img)
						// alert(JSON.stringify(a.data())+i.id_filieres)
						div.append(a)
				})
				$main_section_.append(temp)
				tmp=$main_article.find('footer ul.classes')
				xhr[2].forEach(function(i,j){
						// alert(JSON.stringify(i))
						li=$("<li/>")
						a=$("<a/>").attr({href:"#!"+b_translates.urls.profs+"="+b_params.urls.profs+i.href,title:i.title,class:"profs"}).data('data',i.id_profs).html(i.name)
						a[0].obj=i
						li.append(a)
						// tmp.append(li)
				})
		}
		// alert(temp)
		// alert(temp.length)
		// alert(temp[0])
		// alert(temp.html())
		$main_section_.find('>nav:not(.tags)').slideUp()
		temp.slideDown()
		
		fil_a.article=$(main_article).clone()
}
function fonction_qui_traite_la_reponse_xhr_vers_$main_section_(obj){
		let xhr={}
	
		let tmp=$(fildariane).find('.deux')[0]||$(fildariane).find('.un')[0]
		tmp=tmp.title+" "
		$(fildariane).find('.trois').add($(fildariane).find('.quatre')).add($(fildariane).find('.upper')).remove()
		// let fil_a=addH(fildariane,'a',obj.context.innerText,{class:"trois",href:obj.context.href,title:tmp+obj.context.innerText})
		fil_a=$(obj.context).clone().addClass('trois')[0]
		fil_a.obj=obj.context
		$(fildariane).append(fil_a)
		
		if(typeof(xhr=compiled["matieres_"+$(obj.context).data('data')])=="undefined")
				$.get(
						ajax_path[ajax_path._]+"/_/sujets/"+$(obj.context).data('data'),
						function(xhr){
								// alert(xhr)
								xhr=JSON.parse(xhr)
								compiled["matieres_"+$(obj.context).data('data')]=xhr
								_2(xhr)
						}
				)
		else
				_2(xhr)
}
function _3(xhr){
		let temp,tmp,cpt,tab=[],tab_=[]
		console.log(xhr)
		fonction_qui_traite_la_reponse_xhr_pour_l_article_principal(JSON.parse(xhr[0][0].article))
		$main_section_.addClass('actived')
		$main_output_form.removeClass('actived')
		$main_output_form.find('.choose .oressources,.choose .ocourses').show()
		
		xhr[1].forEach(function(i){
				// alert('un')			
				cpt=i.tags.split('||')
				let d=$("<div/>"),a
				cpt.forEach(function(j){
						a=$("<a/>").attr({href:"#!"+b_translates.urls.tags+"="+j,title:b_translates.sentences.tags_title+" : "+j.substring(j.indexOf('_')+1),"data-data":j.substring(0,j.indexOf('_'))}).html(j.substring(j.indexOf('_')+1))
						d.append(a)
				})
				i.tags=d.html()
				i.likes_=JSON.parse(i.likes).length;			i.views_=JSON.parse(i.views);			i.coms_=JSON.parse(i.coms).length;			i.note_=JSON.parse(i.note);
				tmp=+new Date()-1000*60*60*24*30*3
				cpt=0
				i.views_.forEach(function(k){temp=+new Date(k);if(temp>tmp)cpt++})
				i.views_=i.views_.length;i.views__=cpt
				cpt=0
				i.note_.forEach(function(k){cpt+=k})
				i.note__=i.note_.length
				if(i.note_.length!=0)i.note_=cpt/i.note_.length;else i.note_=5
				tmp={id:i.id_courses,ids:i.ressources_ids,class:"courses",type:"course",lien:{href:"#!"+b_translates.urls.courses+"="+b_params.urls.courses+"-"+i.href,html:i.name,title:i.title},user:{href:"#!"+b_translates.urls.profs+"="+i.prof_href,html:i.prof_name,title:i.prof_title,data:"profs_"+i.id_profs},																																																																																				tags:i.tags,descr:i.short_descr,likes_:i.likes_,views_:i.views_,views__:i.views__,note_:i.note_,note__:i.note__,coms_:i.coms_,prix:i.prix}
				tab.push(tmp)
				tab_.push(i)
		}) 
		$main_output.find('.courses').html("")
		tab.forEach(function(i,j){
				$main_output.find('.courses').append(Mustache.render($main_output[0].course_tpl,{obj:i,obj_:tab_[j]}))
				$main_output.find('.courses>div:last')[0].obj=i
				$main_output.find('.courses>div:last')[0].obj_=tab_[j]
		})
		tab=[],tab_=[]
		xhr[2].forEach(function(i){
				// alert('deux')			
				cpt=i.tags.split('||')
				let d=$("<div/>"),a
				cpt.forEach(function(j){
						a=$("<a/>").attr({href:"#!"+b_translates.urls.tags+"="+j,title:b_translates.sentences.tags_title+" : "+j.substring(j.indexOf('_')+1),"data-data":j.substring(0,j.indexOf('_'))}).html(j.substring(j.indexOf('_')+1))
						d.append(a)
				})
				i.tags=d.html()
				i.likes_=JSON.parse(i.likes).length;			i.views_=JSON.parse(i.views);			i.coms_=JSON.parse(i.coms).length;			i.note_=JSON.parse(i.note);
				tmp=+new Date()-1000*60*60*24*30*3
				cpt=0
				i.views_.forEach(function(k){temp=+new Date(k);if(temp>tmp)cpt++})
				i.views_=i.views_.length;i.views__=cpt
				cpt=0
				i.note_.forEach(function(k){cpt+=k})
				i.note__=i.note_.length
				if(i.note_.length!=0)i.note_=cpt/i.note_.length;else i.note_=5
				tmp={id:i.id_ressources,class:"ressources",type:"ressource",lien:{href:"#!"+b_translates.urls.ressources+"="+b_params.urls.ressources+"-"+i.href,html:i.name,title:i.title},user:i.profs_id!=null?{href:"#!"+b_translates.urls.profs+"="+i.prof_href,html:i.prof_name,title:i.prof_title,data:"profs_"+i.id_profs}:{href:"#!"+b_translates.urls.users+"="+i.nom+"-"+i.prenom+"-"+i.pseudo,html:i.nom+"-"+i.prenom+"-"+i.pseudo,title:b_translates.sentences.users_title+":"+i.nom+"-"+i.prenom+"-"+i.pseudo,data:"users_"+i.id_user},tags:i.tags,descr:i.short_descr,likes_:i.likes_,views_:i.views_,views__:i.views__,note_:i.note_,note__:i.note__,coms_:i.coms_,prix:0}
				tab.push(tmp)
				tab_.push(i)
		})
		$main_output.find('.ressources').html("")
		tab.forEach(function(i,j){
				$main_output.find('.ressources').append(Mustache.render($main_output[0].ressource_tpl,{obj:i,obj_:tab_[j]}))
				$main_output.find('.ressources>div:last')[0].obj=i
				$main_output.find('.ressources>div:last')[0].obj_=tab_[j]
		})
		
		fil_a.article=$(main_article).clone()
}
function fonction_qui_traite_la_reponse_xhr_vers_$main_output(obj){
		let xhr={}
	
		let tmp=$(fildariane).find('.trois')[0].title+" "
		$(fildariane).find('.quatre').add($(fildariane).find('.upper')).remove()
		// let fil_a=addH(fildariane,'a',obj.context.innerText,{class:"quatre",href:obj.context.href,title:tmp+obj.context.innerText})
		fil_a=$(obj.context).clone().addClass('quatre')[0]
		fil_a.obj=obj.context
		$(fildariane).append(fil_a)
		 
		if(typeof(xhr=compiled["sujets_"+$(obj.context).data('data')])=="undefined")
				$.get(
						ajax_path[ajax_path._]+"/_/courses/"+$(obj.context).data('data'),
						function(xhr){
								// alert(xhr)
								// main_section_.innerHTML+=xhr
								xhr=JSON.parse(xhr)
								compiled["sujets_"+$(obj.context).data('data')]=xhr
								_3(xhr)
						}
				)
		else
				_3(xhr)
}















function show_modal(x){
		
		$('#modals').css("display","block").animate({left:0,top:0,height:"100%",width:"100%"},1000,function(){$('#'+x).addClass('active');})
		// $('#'+x).show(1300);
		// $('#'+x).modal('show');
	}
function objLength(obj){var k=0;for(var i in obj)k++;return k}
function objDis(obj){var k=kk="";for(var i in obj){k+=i+"||";kk+=obj[i]};return k+"\n\n"+kk;}
function conv_time_in_minutes(x){return (parseInt(x.substring(0,2))*60)+parseInt(x.substring(3))}