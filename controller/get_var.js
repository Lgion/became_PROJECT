const db=require('../core/db')

module.exports={
	
	start:(req,res)=>{
		let data,sql=`select t.${req.session.req_.lang} as _values from _text_ t where t.username="start" and id=""`
		db.executeSql(sql,(data,err)=>{
			if(err)throw err
			else{
				data=data[0]._values
				data=JSON.parse(data)
				res.writeHead(200,{"Content-type":"text/plain;charset=utf8"})
				res.end(JSON.stringify(data))
			}
		})
	}
	,accueil:(req,res)=>{
		let data,sql=`select t.${req.session.req_.lang} as article,t_.${req.session.req_.lang} as lien from _text t inner join _text_ t_ on t.id=t_.username where t_.username="accueil" and id=""`
		db.executeSql(sql,(data,err)=>{
			if(err)throw err
			else{
				data=data[0]
				data.article=JSON.parse(data.article)
				data.lien=JSON.parse(data.lien)
				res.writeHead(200,{"Content-type":"text/plain;charset=utf8"})
				res.end(JSON.stringify(data))
			}
		})
	}
	,menus:(req,res)=>{
		let data,data_,sql=`SELECT id_menus,t_.${req.session.req_.lang} as lien,t.${req.session.req_.lang} as article FROM menus m inner join _text t on t.id=concat("menus_",id_menus) inner join _text_ t_ on id_menus=t_.id where t_.username="menus" and t.username="article"`
		db.executeSql(sql,(data,err)=>{
			if(err)throw err
			else{
				sql=`select fk,id_niveaux,t.${req.session.req_.lang} as lien from niveaux n inner join _text_ t on id_niveaux=t.id where t.username="niveaux"`
				db.executeSql(sql,(data_,err)=>{
					if(err)throw err
					else{
						let tmp=[]
						// console.log(data)
						data.forEach(function(i){
							// console.log(i.id_menus)
							// console.log("_______")
							// console.log(i.lien)
							i.lien=JSON.parse(i.lien)
							data_.forEach(function(j){
								console.log(i.id_menus+"=="+j.fk)
								if(i.id_menus==j.fk){
									j.lien=JSON.parse(j.lien)
									tmp.push(j)
								}
							})
							i.sousmenu=tmp
							tmp=[]
						})
						// console.log(JSON.stringify(data))
						res.writeHead(200,{"Content-type":"text/plain;charset=utf8"})
						res.end(JSON.stringify(data))
						// res.end(JSON.stringify(data).replace('\r\n',''))
					}
				})
			}
		})
	}
	// ,niveaux:(req,res)=>{}
	// ,filieres:(req,res)=>{}
	// ,matieres:(req,res)=>{}
	,b_translates:(req,res)=>{
		let data,data_,sql=`select ${req.session.req_.lang} from _text where username="b_translates"`
		db.executeSql(sql,(data,err)=>{
			if(err)throw err
			else{
				res.writeHead(200,{"Content-type":"text/plain;charset=utf8"})
				res.end(data[0][req.session.req_.lang])
			}
		})
	}
	,b_params:(req,res)=>{
		let data,data_,sql=`select ${req.session.req_.lang} from _varchar where username="b_params"`
		db.executeSql(sql,(data,err)=>{
			if(err)throw err
			else{
				res.writeHead(200,{"Content-type":"text/plain;charset=utf8"})
				res.end(data[0][req.session.req_.lang])
			}
		})
	}
}