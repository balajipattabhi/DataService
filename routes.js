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
			}).
			catch(function (err) {
				   res.send(err);
                   console.log("Promise Rejected due to error " + err);
            });
	});

	app.post('/read', function (req, res) {
		var collection = req.body.collection;
		var dbName = req.body.dbname;
		var findcontent = req.body.findcontent;
		if(typeof(findcontent)=='undefined'){
				findcontent={};
		}
		else {
				findcontent=JSON.parse(findcontent);
		}

		dbHandle.connect(dbName).
			then(function(db){
				return dbHandle.find(db, collection, findcontent);
			}).
			then(function(docs){
				res.send(docs);
			}).
			catch(function (err) {
				   res.send(err);
                   console.log("Promise Rejected due to error " + err);
            });
	});


	app.post('/delete', function (req, res) {
		var collection = req.body.collection;
		var dbName = req.body.dbname;
		var deletecontent = req.body.deletecontent;
		if(typeof(deletecontent)=='undefined'){
				deletecontent={};
		}
		else {
				deletecontent=JSON.parse(deletecontent);
		}

		dbHandle.connect(dbName).
			then(function(db){
				return dbHandle.delete(db, collection, deletecontent);
			}).
			then(function(result){
				res.send(result);
			}).
			catch(function (err) {
				   res.send(err);
                   console.log("Promise Rejected due to error " + err);
            });
	});

}