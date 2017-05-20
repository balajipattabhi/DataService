const bodyParser = require('body-parser')



module.exports = function(app, dbHandle){
	app.use(bodyParser.urlencoded({ extended: false }));

	app.post('/create', function (req, res) {	
		var collection = req.body.collection;
		var dbName = req.body.dbname;
		var document = JSON.parse(req.body.document);

		dbHandle.connect(dbName).
			then(function(db){
				return dbHandle.insertDocument(db, collection, document)
			}).
			then(function(result){
				res.send(result);
				//dbHandle.close(db);
			}).
			catch(err => {
        		res.send(err)
      		});
	});

	app.post('/read', function (req, res) {
		var collection = req.body.collection;
		var dbName = req.body.dbname;
		var findcontent = req.body.findcontent;

		if(findcontent=='undefined'){
				findcontent={};
		}
		else{
				findcontent=JSON.parse(findcontent);
		}

		dbHandle.connect(dbName).
			then(function(db){
				return dbHandle.find(db, collection, findcontent);
			}).
			then(function(docs){
				res.send(docs);
				//dbHandle.close(db);
			}).
			catch(err => {
        		res.send(err)
      		});
	});

}