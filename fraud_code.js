var Converter = require("csvtojson").Converter;
// create a new converter object
var converter = new Converter({});

// convert CSV file to txt file with count info

converter.fromFile("tx-report-300571496330582-210217-060117.csv",function(err,result){
    // if an error has occured then handle it
    if(err){
        console.log("An Error Has Occured");
        console.log(err);  
    } 
    // create a variable called json and store
    // the result of the conversion
    var json = result;

    // log our json to verify it has worked
    //console.log(json);

    // store count information
    var count = {};

    for(var i = 0; i < json.length; i++) {

        var name = json[i]["Name"];

        if(name in count){
            count[name] = count[name]+1;
        } else {
            count[name] = 1;
        }
    }

    //console.log(JSON.stringify(count));

    for(var i = 0; i < json.length; i++) {

        json[i]["Count"] = count[json[i]["Name"]];
    }


    json.sort(function(a, b) {
        return parseFloat(a.Count) - parseFloat(b.Count);
    });

    console.log(JSON.stringify(json));

    // save the json object to Transaction_json.txt
    var fs = require('fs')

    for(var i = 0; i < json.length; i++) {

        fs.appendFile('Transaction_json.txt', JSON.stringify(json[i])+'\r\n', function (err) {
            if (err) {
                console.log('error');
            } else {
                console.log('writing');
            }
        })
    }

});


