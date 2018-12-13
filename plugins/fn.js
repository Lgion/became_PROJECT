const fs=require('fs')

//objects
exports.objLength=(obj)=>{var k=0;for(var i in obj)k++;return k}
exports.objDup=(obj)=>{var tmp={};for(var i in obj)tmp[i]=obj[i];return tmp}
exports.objGetkeys=(obj,array=false)=>{var tmp=[];for(var i in obj)tmp.push(i);if(array!==false)return tmp;else return tmp.toString()}

//array
exports.arrMerge=(arr,arr_)=>{arr_.forEach(function(i){arr.push(i)})}
exports.arrMerge_=(arr,arr_)=>{arr_.forEach(function(i){if(arr.indexOf(i)==-1)arr.push(i)})}

//array of objects
exports.arrobjCompkeyval=(arr,key,array=false)=>{var tmp=[];arr.forEach(function(i){tmp.push(i[key]);});if(array!==false)return tmp;else return tmp.toString()}


//save files
exports.uploadfiles=(req,url,files,add="",gave_file_name=false)=>{
	let d=new Date(),newpath,imgs=[],error='imgs/error.png';	d=+d
	if(url.substr(0,1)!="/")console.log("petite erreur...la variable uploadfiles::url ne commence pas par '/'")
	return new Promise(
		function(resolve,reject){		
		files.forEach(function(file){	console.log(file.originalFilename.toLowerCase()+" "+gave_file_name);	let img=gave_file_name?url+file.originalFilename.toLowerCase().substring(file.originalFilename.lastIndexOf('.')):url+"/"+add+d+"_"+file.originalFilename.toLowerCase();				let oldpath = file.path;				let newpath =__dirname+"/../"+img;				fs.rename(oldpath, newpath, function (err) {					if (err){						console.log('une erreur est apparue en écrivant le fichier : '+newpath);		console.log(err);				imgs.push(error);				reject(err);		return false;					}					console.log('fichier '+file.originalFilename+' écrit à : '+newpath) ;				});				imgs.push(img);			});			resolve(imgs);		}
	)
}
exports.uploadfile=(req,url,file,add="")=>{
	let d=new Date(),error=url+"/error.png";d=+d
	if(url.substr(0,1)!="/")console.log("petite erreur...la variable uploadfiles::url ne commence pas par '/'")
	return new Promise(
		function(resolve,reject){			img=url+"/"+add+d+"_"+file.originalFilename.toLowerCase();			let oldpath=file.path;			let newpath = 'C:/wamp/www/work/nodejs/projects/1/public'+img;			fs.rename(oldpath, newpath, function (err) {				if (err){					console.log('error occured while writing : '+newpath);			reject(err);		return false;				}			console.log('fichier '+file.originalFilename+' écrit à : '+newpath);			});			return resolve(img);		}
	)
}