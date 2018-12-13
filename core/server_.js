const express=require('express')
const app=express.Router()

const session=require('express-session')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const passport=require('passport')
const m=require('multiparty')
// const fs=require('fs')
// const mysql=require('mysql')

const log=require('./connect')

const rsc=require('../controller/ressource')
const fn=require('../plugins/fn')
const settings=require('./settings')

const http=require('http').Server(app)
const io=require('socket.io')(http)
// const io=require('socket.io')(8082,{path:"/teste",serveClient:false,pingInterval:10000,pingTimeout:5000,cookie:false})
// const io=require('socket.io')({path:"/teste",serveClient:false})
// io.attach(8082,{pingInterval:10000,pingTimeout:5000,cookie:false})

app.get("/sql",(req,res)=>{rsc.show_sql_on_screen(req,res)})


//
//
//
//
//
//
//
//
//
//
//
// app.use("/",express.static('../')) ;
app.use((req,res,next)=>{console.log(req.url);next()})
app.use((req,res,next)=>{
	// if(req.url.indexOf('{{')==-1&&req.url.indexOf('}}')==-1){
	if(req.url.indexOf('%7B%7B')==-1&&req.url.indexOf('%7D%7D')==-1){
		console.log(unescape(req.url))
		let tmp=req.url.substring(req.url.lastIndexOf('/')+1)
		tmp.replace(/_--_/g,'/')
		if(tmp.indexOf('.')==-1||tmp.indexOf('.')!=tmp.lastIndexOf('.')||tmp.substring(tmp.indexOf('.')).length>5){
			next()
		}else {console.log(tmp.indexOf('.')+"_________"+tmp.lastIndexOf('.')+"\n"+tmp+" ___ "+tmp.substring(tmp.indexOf('.'))+" ___ "+tmp.substring(tmp.indexOf('.')).length)
				res.end('chemin fichier')}
	}else if(req.url.indexOf('%7B%7B')!=-1&&req.url.indexOf('%7D%7D')!=-1)res.end('chemin invalide')
	else next()
})
app.use((req,res,next)=>{console.log(req.url);next()})

//
//

app.use(["/teste",/myregex/],(req,res,next)=>{
	
	next()
})
app.use(["teste_error",/myregexp/],(err,req,res,next)=>{
	
	next()
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser('ok'))
app.use(session({
	secret:"ok",resave:false,saveUninitialized:true,cookie:{secure:false}
}))
app.use(passport.initialize())
app.use(passport.authenticate('session'))
app.use((req,res,next)=>{
//my own middleware for persisting cookie  connection

	next()
})
app.use((req,res,next)=>{
		if(!req.session.req_){req.session.req_={},req.session.context={}}
		if(!req.session.req_.pays){
			req.session.req_.pays="ci"
			req.session.req_.lang="fr"
			req.session.req_.connected=1
			req.session.context.periph="pc"
		}
		next()
})

// SELECT t_.fr as meta,t__.fr as data,t.fr as article FROM menus m inner join _text t on t.id=concat("menus_",m.id) inner join _text_ t_ on t_.id=concat("menus_",m.id) inner join _text_ t__ on m.id=t__.id where t_.username="meta" and t__.username="menus" and t.username="article"


app.get('/_/filieres/:id/:lang',(req,res)=>rsc.filieres(req,res))
app.get('/_/filieres/:id',(req,res)=>rsc.filieres(req,res))
app.get('/_/matieres/:id/:lang',(req,res)=>rsc.matieres(req,res))
app.get('/_/matieres/:id',(req,res)=>rsc.matieres(req,res))
app.get('/_/sujets/:id/:lang',(req,res)=>rsc.sujets(req,res))
app.get('/_/sujets/:id',(req,res)=>rsc.sujets(req,res))
app.get('/_/courses/:id/:lang',(req,res)=>rsc.courses(req,res))
app.get('/_/courses/:id',(req,res)=>rsc.courses(req,res))
app.get('/_/courses_/:id/:id_c',(req,res)=>rsc.courses_(req,res))
app.get('/_/tls/:id/:tl',(req,res)=>rsc.tls(req,res))
app.get('/_/delete_tl/:id/:theme/:tl_theme_id',(req,res)=>rsc.delete_tl(req,res))
// app.get('/_/endcourse/:id/:tl',(req,res)=>{console.log("yoyoyoooooooo");rsc.endcourse(req,res);console.log('yep')})
app.get('/_/*',(req,res)=>{
	console.log("requete ajax : "+req.url)
	
})
app.post('/_/endcourse/:id/:tl',(req,res)=>{console.log("yoyoyoooooooo");rsc.endcourse(req,res)})
app.post('/_/form_add_things',(req,res)=>{console.log('form_add_things');rsc.form_add_things(req,res)})
app.post('/_/form_get_things/:type/:type_id',(req,res)=>{console.log('form_get_things');rsc.form_get_things(req,res)})
app.post('/_/*',(req,res)=>{
	console.log("requete ajax : "+req.url)
	
})
app.get('/',(req,res)=>{
	console.log('ok')
	rsc.renderHome(req,res)
	
})
app.get('/get_var/:id',(req,res)=>rsc.get_var(req,res,req.params.id))
app.get('/testee',(req,res)=>{
	// res.sendFile(__dirname+"/multiparty.html")
	rsc.testee(req,res)
})
app.post('/testee',(req,res)=>{
	let form=new m.Form(),a,reqBody={}
	console.log('lllllllllll')
	form.parse(req,function(err,fields,files){
		for(a in fields)console.log('________'+a)
		for(a in files)console.log('________'+a)
			console.log(err)
	})
	res.sendFile(__dirname+"/multiparty.html")
})
app.post('/courses_live_profsendfile/:path',(req,res)=>{
	let form=new m.Form(),a,reqBody={},path=req.params.path.replace(/_-_/g,"/")
	console.log(path)
	form.parse(req,function(err,fields,files){
		for(a in fields)reqBody[a]=fields[a][0]
		for(a in files)reqBody[a]=files[a]
		// for(a in fields)console.log('________'+a)
		// for(a in files)console.log('________'+a)
		rsc.courses_live_profsendfile(req,res,reqBody)
	})
})
app.get('/socket',(req,res)=>{
	res.sendFile(__dirname+"/socket_test.html")
})
let rooms={}
io.of('/courses').on('connection',(s)=>{
	s.emit("connected",s.id)
	s.on("disconnected",function(room){if(s.id==rooms[room+"_"].id)delete rooms[room];let a=s.disconnect(true);let b=s.disconnect();console.log(a+"\n"+b)})
	s.on('room',function(name){
		if(!rooms[name])rooms[name]=[]
		console.log(rooms[name])
		let self={pseudo:s.request._query.pseudo,img:s.request._query.avatar,id:s.id},user=Object.assign({},self),users=[],prof={connected:true}
		
		console.log(s.request._query)
		console.log("__"+name)
		
		s.join(name)
		
		prof=rooms[name+"_"]?Object.assign(Object.assign({},prof),rooms[name+"_"]):s.request._query.prof?prof:{connected:false}
		delete prof._
		
		if(s.request._query.prof)s.broadcast.to(name).emit('joined_',prof)
		else s.broadcast.to(name).emit('joined_',{newuser:self})
	
		rooms[name].forEach(function(i){let tmp=Object.assign({},i);delete tmp._;users.push(tmp)})
		console.log(rooms[name])
		console.log(users)
		user._=s
		if(s.request._query.prof)rooms[name+"_"]=user
		else rooms[name].push(user)
		console.log("__"+name)
		console.log({prof:prof,users:users,self:self}) 
		s.emit('joined',{prof:prof,users:users,self:self})
		console.log("__"+name)
	})
	// s.use((packet,next)=>{
		// console.log("okokok")
		// console.log(packet)
		// next()
	// })
	s.on('live text',function(data){
		// console.log(rooms)
		console.log('live text ___ room : '+data.room)
		s.broadcast.to(data.room).emit('fromproflive',data)
		// s.emit('fromproflive',{_:"live_text",value:data.value,live_id:(rooms[data.room+"_"].live++),timestamp:(+new Date())})
		// rooms[data.room].forEach(function(i){
			// i._.emit('fromproflive',{_:"live_text",value:data.value,live_id:(rooms[data.room+"_"].live++),timestamp:(+new Date())})
		// })
	})
	s.on('prof leave',function(data){
		s.broadcast.to(data.room).emit('fromprof',{_:"prof_leave"})
	})
	s.on('live ask',function(data){
		s.broadcast.to(data.room).emit('fromproflive',data)
	})
	s.on('live file',function(data){
		s.broadcast.to(data.room).emit("fromproflive",data)
	})
	s.on('live stream',function(data){
		s.broadcast.to(data.room).emit("fromproflive",data)
	})
	s.on('live stream restarted',function(data){
		s.broadcast.to(data.room).emit("fromproflive",data)
	})
	s.on('live audio_',function(data){
		
	})
	s.on('live video_',function(data){
		
	})
	
	
	
	s.on('fromstudents ask',function(data){
			console.log("fromstudents ask")
			console.log(data)
			rooms[data.room+"_"]._.emit('fromstudents',data)
	})
	s.on('fromstudents answer',function(data){
			console.log(data)
			rooms[data.room+"_"]._.emit('fromstudents',data)
	})
	s.on('test',function(m){console.log(m)})
})
/*
io.on('connection',(s)=>{
	console.log(s.request._query)
	console.log("io.origins() : "+io.origins())
	// io.serveClient(Boolean)
	console.log("io.sockets() : "+io.sockets)
	console.log("io.path() : "+io.path())
	console.log("io.adapter() : "+io.adapter())
	console.log("socket.id : "+s.id)
	console.log("socket.client :"+s.client)
	console.log("socket.conn :"+s.conn)
	console.log("socket.request :"+s.request)
	
	console.log(s.request._query.pseudo)
	console.log(s.request._query.aa)
	
	s.use((packet,next)=>{
		// console.log(packet);console.log('iam a middleware (socket.use())')
		next()
	})
	s.emit('connected',"you're connected")
	// s.send("you're connected")
	s.on('okokiamin!',function(m){
		console.log(m)
		s.send('yoyoyo')
	})
	s.on('message',function(m){console.log(m)})
	s.on('functions',function(func){console.log(""+func);func()})
// s.join ET s.leave
//io.sockets.in ET s.broadcast.to 
	s.on('room',function(name){
		s.join(name)
		s.broadcast.to(name).emit('joined',"nouvel utilisateur connecté")
		io.sockets.in(name).emit('joined_',"yomatherfuckerb!iaaaaaaaaaatcj")
	})
	console.log("io.of('/').connected : "+io.of('/').connected)
	io.sockets.emit("ok","moi compris, j'ai broadcasté à tout le monde")//BROAD CAST A TOU LES USER
	s.broadcast.emit('ok',"j'ai broadcasté à tous sauf à moi")
// s.set ET s.get NE FONCTIONNENT PAS.......
	// s.on('pseudo',function(pseudo){s.set('pseudo',pseudo,function(){s.emit('setting','setting "pseudo"="'+pseudo+'" successed')})})
})
io.of('/').on('connection',function(s){s.send('je suis socketio namespaced principal')})
io.of('/').on('connection',function(s){s.send('je peux envoyer atant d emshg que je veux')})
io.of('/').on('connection',function(s){s.send('blablabla')})
// LES NAMESPACES
socket0=io.of('/zero')
socket0.on('connection',function(s){s.send('je suis socketio namespaced 0')})
socket1=io.of('/un').on('connection',function(s){s.send('je suis socketio namespaced 1')})
socket2=io.of('/deux').on('connection',function(s){s.send('je suis socketio namespaced 2')})
*/


// http.listen(settings.port,()=>console.log('(http://became.net) || localhost/'+settings.port+'/ is just running fine right now'))
module.exports=app