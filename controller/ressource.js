const fs=require('fs')
const mysql=require('mysql')
const m=require('multiparty')
const f=require('formidable')

const fn=require('../plugins/fn')
const db=require('../core/db')
const httpMsgs=require('../core/httpMsgs')

const get_var=require('./get_var.js')



exports.testee=(req,res)=>{
	// db.executeSql("insert user(user,password) values('un','deux')",(data,err)=>{console.log(data)},'teste')
	// db.executeSql("select Name,Code2 from country",(data,err)=>{res.end(JSON.stringify(data))},'world')
	// db.executeSql("select id,fr as value from _varchar where username='c_type'",(data,err)=>{res.end(JSON.stringify(data))})
	db.executeSql("select id_tags as id,"+req.session.req_.lang+" as label from tags",(data,err)=>{res.end(JSON.stringify(err+"--\n--"+data))})
}

exports.renderHome=(req,res)=>{
	let tampons={dir:"",_href:""}
	// let tampons={dir:"2/",_href:"bnet/"}
	// let tampons={dir:"bnet/",_href:"bnet/"}
	let a,file=fs.readFileSync("./"+tampons.dir+"public/files/"+req.session.req_.lang+".js","utf8")
	eval(file)
	// console.log(b_translates.buttons)
	console.log(b_params)
	// accueil.article=JSON.parse(accueil.article);	accueil.lien=JSON.parse(accueil.lien)
	// menus.forEach(function(i){
		// console.log(i.article.substring(555))
		// console.log(i.article)
		// i.lien=JSON.parse(i.lien);	
		// i.article=JSON.parse(i.article)
	// })
	let obj={init:{accueil:accueil,menus:menus,start:start,values:{c_type:JSON.stringify(c_type),courses_tags:JSON.stringify(courses_tags)}},vars:{b_translates:JSON.stringify(b_translates),b_params:JSON.stringify(b_params),world_pays:JSON.stringify(world_pays),form_add_lang:JSON.stringify(form_add_lang),context:req.session.context,req:JSON.stringify(req.session.req_)}}
	// console.log(obj.init.menus)
	// console.log(obj.init.menus[0].sousmenu)
	// console.log("\n\n\n\n\n\n\n")
	res.render('index',obj)
}
exports.filieres=(req,res)=>{
	let id=req.params.id,lang=req.params.lang||req.session.lang,sql=[]
	sql.push(`select distinct t.fr as article,t.id from filieres f inner join _text t on t.id=concat("niveaux_",f.fk) where fk=${id} and t.username="article"`)
	sql.push(`select fk,id_filieres,t_.fr as lien from filieres f inner join _text_ t_ on id_filieres=t_.id where t_.username="filieres" and fk=${id}`)
	
			console.log("yooooooooooooooooo\n\n\n\n\n\n\n\n\n")
	db.executeTransaction(sql,(data,err)=>{
			console.log("yyyyyyyyyyyyyo\n\n\n\n\n\n\n\n\n")
		if(err)throw err
		else{
			res.end(JSON.stringify(data))
		}
	})
}
exports.matieres=(req,res)=>{
	let id=req.params.id,lang=req.params.lang||req.session.req_.lang,sql=[]
	// sql=[article parent || liste liens matieres-filiere || liste classes-filiere]
	sql.push(`select distinct t.fr as article,t.id from matieres m inner join _text t on t.id=concat("filieres_",m.fk) where fk=${id} and t.username="article"`)
	sql.push(`select fk,id_matieres,t_.fr as lien from matieres m inner join _text_ t_ on id_matieres=t_.id where t_.username="matieres" and fk=${id}`)
	sql.push(`select id_classes,langue,pays,c.href,c.name,c.title,c.short_descr,c.meta,group_concat(concat(u.nom,"-_-",u.prenom,"-_-",u.pseudo) separator'||') as eleves,v.${lang} as type,c.date,start,end,group_concat(concat(p.href,"-_-",p.name,"-_-",p.title,"-_-",id_profs) separator '||') as profs from classes c inner join _varchar v on type_id=id inner join profs p on id_profs in (prof_ids) left join users u on u.id_user in (c.eleve_ids) where filieres_id=${id} and v.username="cl_type"`)
	
	db.executeTransaction(sql,(data,err)=>{
		if(err)throw err
		else{
			res.end(JSON.stringify(data))
		}
	})
}
exports.sujets=(req,res)=>{
	let id=req.params.id,lang=req.params.lang||req.session.req_.lang,sql=[]
	// sql=[article parent || liste liens sujets-matiere || liste professeur-matiere]
	sql.push(`select distinct t.${lang} as article,t.id from sujets s inner join _text t on t.id=concat("matieres_",s.fk) where fk=${id} and t.username="article"`)
	sql.push(`select fk,id_sujets,t_.${lang} as lien from sujets s inner join _text_ t_ on id_sujets=t_.id where t_.username="sujets" and fk=${id}`)
	sql.push(`select * from profs p inner join users u on p.id_user=u.id_user where id_matieres=${id}`)
	
	db.executeTransaction(sql,(data,err)=>{
		if(err)throw err
		else{
			console.log("exports.sujets")
			console.log(data[0])
			console.log(data[1])
			console.log(data[2])
			res.end(JSON.stringify(data))
		}
	})
}
exports.courses=(req,res)=>{
	let id=req.params.id,lang=req.params.lang||req.session.req_.lang,sql=[]
	sql.push(`select distinct t.${lang} as article,t.id from courses c inner join _text t on t.id=concat("sujets_",c.fk) where fk=${id} and t.username="article"`)
	sql.push(`select id_courses,pays,langue,c.href,c.name,c.title,c.short_descr,descr,c.date,c.duree,c.likes,c.shares,c.views,c.note,c.coms,type_id,v.${lang} as type,group_concat(concat(id_tags,"_",tags.${lang}) separator "||") as tags,c.profs_id,id_profs,p.href as prof_href,p.name as prof_name,p.title as prof_title,id_user,							prix,c.ressource_ids,fk from courses c inner join profs p on profs_id=id_profs inner join _varchar v on type_id=id inner join tags on id_tags in (tag_ids) where fk=${id} and langue="${lang}" and v.username="c_type"`)
	sql.push(`select id_ressources,r.pays,r.langue,r.href,r.name,r.title,r.short_descr,r.date,r.likes,r.shares,r.views,r.note,r.coms,type_id,v.${lang} as type,group_concat(concat(id_tags,"_",tags.${lang}) separator "||") as tags,r.profs_id,id_profs,p.href as prof_href,p.name as prof_name,p.title as prof_title,u.id_user,			u.nom,u.prenom,u.pseudo,r.json from ressources r inner join users u on id_user=user_id inner join profs p on id_profs=profs_id inner join _varchar v on type_id=id inner join tags on id_tags in (r.tag_ids) where sujets_id=${id} and langue="${lang}" and v.username="r_type" group by id_ressources`)
	// let tmp=JSON.stringify(sql)
	// console.log(sql)
	
	db.executeTransaction(sql,(data,err)=>{
		if(err)throw err
		else{
			console.log(data)
			res.end(JSON.stringify(data))
			
		}
	})
}
exports.courses_=(req,res)=>{
	let id=req.params.id,l,id_c=req.params.id_c,lang=req.params.lang||req.session.req_.lang,sql=[]
	sql.push(`select id_ressources,r.name,r.title,r.json,r.href from ressources r where id_ressources in(${id})`)
	sql.push(`select tl from courses where id_courses=${id_c}`)
	// let tmp=JSON.stringify(sql)
	// console.log(sql)
	
	db.executeTransaction(sql,(data,err)=>{
		if(err)throw err
		else{
			res.end(JSON.stringify(data))
			// res.end(tmp)
			
		}
	})
}
exports.tls=(req,res)=>{
	let id=req.params.id,tl=unescape(req.params.tl).replace(/"/g,"\\\"").replace(/_--_/g,'/')
	console.log(tl)
	let sql="update courses set tl=\""+tl+"\" where id_courses="+id
	db.executeSql(sql,function(data,err){
		if(err)res.end('0')
		else res.end('1')
	})
	
}
exports.delete_tl=(req,res)=>{
	let id=req.params.id,theme=req.params.theme,tl_theme_id=req.params.tl_theme_id
	console.log(tl)
	let sql="select tl from courses where id_courses="+id
	db.executeSql(sql,function(data,err){
		if(err)res.end('0')
		else{
			let tl=JSON.parse(data[0].tl)
			tl=tl[theme][tl_theme_id]
			sql="update courses set tl=\""+tl+"\" where id_courses="+id
			db.executeSql(sql,function(data,err){
				if(err)res.end('0')
				else res.end('1')
			})
		}
	})
	
}
exports.courses_live_profsendfile=(req,res,reqBody)=>{
		let path=req.params.path.replace(/_-_/g,"/"),tmp
		console.log(reqBody)
		fn.uploadfiles(req,path,reqBody.live_sendfile,"",true).then(function(array_files){
				console.log("file(s) saved")
				console.log(array_files)
				tmp=array_files[0].substring(array_files[0].indexOf("course")-1)
				console.log(tmp)
				res.end(tmp)
		}).catch(function(err){console.log("erreur saving file!!!");console.log(err);res.end('0')})
}
exports.endcourse=(req,res)=>{
	let id=req.params.id,tl=unescape(req.params.tl).replace(/\|\-\|/g,"/").replace(/"/g,"\\\"")
	let sql=`update courses set tl_="${tl}" where id_courses=${id}`
	
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	console.log(sql)
	
	db.executeSql(sql,(data,err)=>{
		if(err)throw err
		else{
			res.end('1')
		}
	})
}
exports.form_add_things=(req,res)=>{
//POUR LES courses, IL FAUT QUE JE CHECK SI L'IDENTIFIANT DE LA RESSOURCE FOURNIE CORRESPOND AU sujets DU COURS
	// console.log(req.body)
	let form=new m.Form(),a,reqBody={}
	form.parse(req,function(err,fields,files){
		for(a in fields)reqBody[a]=fields[a][0]
		for(a in files)reqBody[a]=files[a]
		// console.log(reqBody)
		// console.log(fields)
		// for(a in fields)console.log('________'+a)
		// for(a in files)console.log('________'+a)
		let sql
		let fk=reqBody.filieres!="void"?
			reqBody.matieres!="void"?
				reqBody.sujets!="void"?
					reqBody.upper!="void"?
						reqBody.upper
					:reqBody.sujets
				:reqBody.matieres
			:reqBody.filieres
		:reqBody.niveaux
		console.log("reqBody.filieres = "+reqBody.filieres+"\n"+"reqBody.matieres = "+reqBody.matieres+"\n"+"reqBody.sujets = "+reqBody.sujets+"\n"+"reqBody.upper = "+reqBody.upper+"\n"+"reqBody.niveaux = "+reqBody.niveaux)
		console.log("fk = "+fk)
		console.log("reqBody['type'] = "+reqBody['type'])
		if(reqBody.type=="niveaux"||reqBody.type=="filieres"||reqBody.type=="matieres"||reqBody.type=="sujets")sql=`insert ${reqBody.type}(alias,user_id,fk) values("${reqBody.alias}","${reqBody.user_id}",${fk})`
		if(reqBody.type=="courses")sql=`insert ${reqBody.type}(pays,langue,tag_ids,href,name,title,short_descr,descr,tl,date,duree,likes,views,note,coms,type_id,prix,ressource_ids,profs_id,fk) values("${reqBody.pays}","${reqBody.langue}","${reqBody.htag}","${reqBody.url}","${reqBody.label}","${reqBody.titre}","${reqBody.sh_descr}","${reqBody.descr}","{}","${reqBody.date}","${reqBody.duration}","[]","[]","[]","[]","${reqBody.course_type}","${reqBody.prix}","${reqBody.rsc}",${reqBody.profs_id},${fk})`
		console.log(sql)
		db.executeSql(sql,(data,err)=>{
			if(err)res.end('0')
			else if(reqBody.type=="niveaux"||reqBody.type=="filieres"||reqBody.type=="matieres"||reqBody.type=="sujets"){
				let lang=`{"href":"${reqBody.url}","html":"${reqBody.label}","title":"${reqBody.titre}","img":{"src":"${reqBody.img}","title":"${reqBody.titre_img}","alt":"${reqBody.alt}"},"meta":{"title":"${reqBody.titre}","descr":"${reqBody.descr}","rs":[{"property":"og;title","content":"_"},{"property":"og:description","content":"_"}],"json-ld":"@content=Thing"}}`.replace(/"/g,"\\\"")
				sql=`insert _text_(username,id,${req.session.req_.lang}) values("${reqBody.type}","${data.insertId}","${lang}")`
				console.log(sql)
				db.executeSql(sql,(data,err)=>{
					if(err)res.end('0')
					else {
						sql=`insert _text(username,id,${req.session.req_.lang}) values("article","${reqBody.type}_${fk}","{}")`
						console.log(sql)
						db.executeSql(sql,(data,err)=>{
							if(err)res.end('0')
							else res.end('1')
						})
					}
				})
			}else res.end('1')
		})
	})
}
exports.form_get_things=(req,res)=>{
	let type=req.params.type,type_id=req.params.type_id
	let sql=`select ${req.session.req_.lang},id_${type} from ${type} inner join _text_ on _text_.username="${type}" and _text_.id=id_${type} where fk=${type_id}`
	
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	console.log(sql)
	
	db.executeSql(sql,(data,err)=>{
		if(err)res.end('0')
		else{
			res.end(JSON.stringify(data))
		}
	})
}











exports.teste=(req,res)=>{
}
exports.show_sql_on_screen=(req,res)=>{
	//	article et lien pour les menus 11/10
	// sql=`SELECT m.id as menus_id,t_.fr as lien,t.fr as article FROM menus m inner join _text t on t.id=concat("menus_",m.id_menus) inner join _text_ t_ on m.id=t_.id where t_.username="menus" and t.username="article"`
	//	article et lien pour accueil 11/10
	// sql=`select t.fr as article,t_.fr as lien from _text t inner join _text_ t_ on t.id=t_.username where t_.username="accueil" UNION SELECT m.id,t_.fr as lien,t.fr as article FROM menus m inner join _text t on t.id=concat("menus_",m.id_menus) inner join _text_ t_ on m.id=t_.id where t_.username="menus" and t.username="article"`
	//	lien pour les niveaux 11/10
	// sql=`select fk,id_niveaux,_text_.fr as lien from niveaux inner join _text_ on id_niveaux=_text_.id`
	// sql=``
	let sql=req.params.sql
	sql=`select niveaux.id as niveaux_id,_text_.fr as lien from niveaux natural join _text_`
	
	db.executeSql(sql,(data,err)=>{
		if(err)throw err
		else res.end(JSON.stringify(data))
	})
	
}
exports.get_var=(req,res,_var)=>get_var[_var]?get_var[_var](req,res):res.end('4044')