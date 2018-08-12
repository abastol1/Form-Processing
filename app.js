var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var contactArray= [
    {
        name: 'Mr. Arjun Bastola',
        address: '30 Knox Terrace Wayne NJ 07470',
        contactPhone: '5512928331',
        contactMail: 'No',
        contactEmail:'abastola@ramapo.edu'
    },
    {
        name: 'Mr. Bishnu Bastola',
        address: '35 Street Gauriganj Chitwan 07430',
        contactPhone: '9845067255',
        contactMail: 'Yes',
        contactEmail:'bishnupbas@gmail.edu'
    },
    {
        name: 'Mrs. Parbati Bastola',
        address: '39 Ashwok Chowk Gauriganj Chitwan 07430',
        contactPhone: '9845332420',
        contactMail: 'No',
        contactEmail:'pbastola@gmail.edu'
    }
];
var app = express();
// Use static files 
app.use(express.static(__dirname));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// Get form data using get-from-data module 

app.get('/mailer', function(req, res){
    res.sendFile(__dirname+ '/project1.html');
});

// Post request after clicking on submit button 
app.post('/mailer', urlencodedParser, function(req, res){
    var mailBool = "No";
    console.log("I am her on post")
    if (req.body.mail == "Mail"){
        console.log("I am inside Yes");
        mailBool = "Yes";
    }
    console.log(mailBool);
    var info = {
        name: req.body.prefix +" "+ req.body.firstName + " " + req.body.lastName,
        address: req.body.street +" "+ req.body.city +" "+ req.body.state +" "+ req.body.zip,
        contactPhone: req.body.phone,
        contactMail: mailBool,
        contactEmail: req.body.email
    }
    contactArray.push(info);
    console.log(contactArray);
    // Default --> looks in views folder for templating
    res.render("enteredResult", {info: info});
});

app.get('/contacts', function(req, res){
    console.log("I am in contacts html");
    console.log(contactArray.length);
    res.render("contacts", {contactArray: contactArray});
});

app.listen(3000);
console.log("App Listening to port 3000");