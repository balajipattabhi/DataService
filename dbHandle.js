const config =require('./config')
const MongoClient = require('mongodb').MongoClient;


module.exports ={

	connect: function(dbname) {
			       return new Promise(function (resolve, reject) {
						MongoClient.connect(config.url+"/"+dbname, function(err, db) {
						if(err) { 
						  	reject(err)
						  	return;
						}
						resolve(db)
				  });
			});
	},

	insertDocument: function (db, collectionName, document, callback){
				return new Promise(function (resolve, reject) {
				  var collection = db.collection(collectionName);
				  collection.insert(document, {w:1}, function(err, result) {
				  		if(err)
				  			reject(err);
				  		else
				  			resolve(result);
				  });
			 });
	},

	find: function(db, collectionName, findcontent){
		return new Promise(function (resolve, reject) {
			var collection = db.collection(collectionName);				
			if(findcontent=='undefined'){
				findcontent={};
			}
			collection.find(findcontent).toArray(function(err, docs) {
				if(err)
					reject(err);
				else
	    			resolve(docs);  
	    	});
	    });
	},

	close:function(db){
				db.close();
	}

};

