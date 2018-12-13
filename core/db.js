let mysql=require('mysql')
let transac=require('node-mysql-transaction')
let settings=require('./settings')
function objLength(obj){var k=0;for(var i in obj)k++;return k}

exports.executeSql=(sql,cb,bdd=false)=>{
	let params=settings.dbConfig
	// let params=settings.dbConfig_plesk
	if(bdd!==false)params.database=bdd
	let connection=mysql.createConnection(params)
	connection.connect((err)=>{
		if(err){
			console.log(err+"\nimpossible de se connecter avec les données : "+settings.dbConfig)
			cb(null,err)
		}
	})
	connection.query(sql,(err,res)=>{
			if(err){
				console.log(err+"\nerreur dans la requete sql : "+sql)
				// console.log("\nsql : "+sql)
				cb(null,err)
			}else {
				// console.log(sql+"___!!!res!!!___"+res)
				cb(res)
			}
	})
}
function executeSql_(sql,cb,bdd=false){
	let params=settings.dbConfig
	if(bdd!==false)params.database=bdd
	let connection=mysql.createConnection(params)
	connection.connect((err)=>{
		if(err){
			console.log("executeSql_:: "+err+"\nimpossible de se connecter avec les données : \n"+settings.dbConfig)
			console.log(settings.dbConfig)
			cb(null,err)
		}
	})
	connection.query(sql,(err,res)=>{
			if(err){
				console.log(err+"\nerreur dans la requete sql : "+sql)
				// console.log("\nsql : "+sql)
				cb(null,err)
			}else {
				// console.log(sql+"___!!!res!!!___"+res)
				cb(res)
			}
	})
}
function executeTransaction_(sql,cb,connection="",bdd=false,t=[]){
	if(typeof sql=="string")sql=[sql]
	let params=settings.dbConfig
	if(bdd!==false)params.database=bdd
	if(connection==""){
		connection=mysql.createConnection(params)
		connection.connect((err)=>{
			if(err){
				console.log("executeTransaction_:: "+err+"\nimpossible de se connecter avec les données : "+settings.dbConfig)
				cb(null,err)
			}
		})
	}
	let i=0,error="",tab=[],sql_=""
	sql.forEach(function(i,j){
		// console.log(i+"___"+sql[j])
		// console.log(j)
		// console.log(sql.length-1)
		// console.log(j+"__"+sql.length-1)
		if(j!=0)tab.push(i)
		else sql_=i
	})
	console.log(sql_)
			console.log("\n\n\n\n-------------")
			console.log(t)
			console.log("--------------\n\n\n\n")
	executeSql_(sql_,(data,err)=>{
			console.log("\n\n\n\n-------------")
			console.log(t)
			console.log("--------------\n\n\n\n")
		if(err)throw err
		t.push(data)
		if(tab.length!=0)executeTransaction_(tab,cb,connection,bdd,t)
		else cb(t)
	})
}
exports.executeTransaction=(sql,cb,connection="",bdd=false)=>{executeTransaction_(sql,cb,connection,bdd)}
function transaction_(sql,cb,bdd,keys="",t=[],chain=""){
	// console.log(t)
	console.log(typeof t.length)
	if((typeof t.length!="undefined"&&t.length==0)||(typeof t.length=="undefined"&&objLength(t)==0)){
		let params=settings.dbConfig
		if(bdd!==false)params.database=bdd
		console.log(params)
		tr=transac({connection:[mysql.createConnection,params],dynamicConnection:32,idleConnectionCutoffTime:1000,timeout:600})
		chain=tr.chain()
	}
	
	let sql_=sql.shift()
	// chain.on("commit",function(){cb(t)}).on("rollback",function(err){console.log('yo nigger');throw err})
	chain.on("commit",function(){cb(t)}).on("rollback",function(err){console.log(err.code);cb(null,err)})
	chain.query(sql_).on('result',function(data){
		if(keys=="")t.push(data)
		else t[keys.shift()]=data
		console.log(t)
		console.log("ok")
		if(sql.length==0)chain.commit()
		else transaction_(sql,cb,bdd,keys,t,chain)
	})
}
exports.transaction=(sql,cb,keys=[],bdd=false)=>{
	if(keys.length!=0){
		if(sql.length==keys.length)transaction_(sql,cb,bdd,keys,{})
		else{console.log("les tailles des arrays 'sql' et 'key' ne correspondent pas");cb({error:"les tailles des arrays 'sql' et 'key' ne correspondent pas"})
		}
	}else transaction_(sql,cb,bdd)
}