//nav_bar
$('#form_top .input__field--makiko').focus(function(e){$(this).parent().addClass('active')})
$('#form_top .input__field--makiko input[type=checkbox]').click(function(e){$(explain).html($(this).attr('data-data'))})
$('#form_top .input__field--makiko').keyup(function(e){
	if(e.key=="Enter"){
		let inputs=$(this).parent().find('>div input[type=checkbox]'),inputs_=$(this).parent().find('>div input[type=date]'),tab=[],tab_=[]
		alert(inputs.length)
		inputs.each(function(i,j){if(j.checked)tab.push(j.name)})
		alert(tab) 
		tab_.push(inputs_[0].value)
		tab_.push(inputs_[1].value)
		alert(tab_)
		if(tab.length!=0)
			$.get(
				"/_/search/"+tab.toString()+"/"+tab_.toString()+"/"+escape(this.value),
				function(xhr){
					alert(xhr)
				}
			)
		else alert("vous devez chosir une option de recherche ci-dessus pour lancer une recherche")
		
	}
})
$(".alert_top_msg span").each(function(i,j){
	let tmp=parseInt(j.innerHTML)
	tmp=new Date(tmp).toLocaleString()
	j.innerHTML=tmp
})
$(".alert_top_msg p").click(function(e){
	if($(this).parent().hasClass('active'))$(this).parent().removeClass('active')
	else $(this).parent().addClass('active')
	$.get(
		"/_/viewed/msgs_",
		function(xhr){
			alert("...vous avez vue vos messages......ils sont mtn maruqés 'read'\n\nil y a un transfert des msgs vers la table 'user_archive'")
		}
	)
})
$(btn_msgs).click(function(e){
	$("#alert_top_popups>div").slideUp()
	$(alert_top_popups).slideDown()
	$(alert_top_msgs).slideDown()
	$.get(
		"/_/viewed/msgs",
		function(xhr){
			alert(xhr+"...vous avez vue vos messages......ils sont mtn maruqés 'unread'")
		}
	)
})

$(btn_notifs).click(function(e){
	$("#alert_top_popups>div").slideUp()
	$(alert_top_popups).slideDown()
	$(alert_top_notifs).slideDown()
	
})

$(btn_other).click(function(e){
	$("#alert_top_popups>div").slideUp()
	$(alert_top_popups).slideDown()
	$(alert_top_other).slideDown()
	alert("espace publicitaire, les annonces des gens peuvent apparaitre ici...en fonction de ... des interet du membre....ou sur d'autre critères encore")
	
})