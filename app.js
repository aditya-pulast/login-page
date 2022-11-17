const express = require("express");
const bodyParer = require("body-parser");
const request = require("request");
const http = require("http");
// const { Http2ServerRequest } = require("http2");
// const { url } = require("inspector");
const app = express();
app.use(express.static("public"));
app.use(bodyParer.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName, lastName, email);
  var data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
  };
const jsonData = JSON.stringify(data);
const url = "http://us9.api.mailchimp.com/3.0/lists/f033636f08";
const options = {
    method: "POST",
    auth: "adii:c3d2ff5d5a36e2fb7ffdac1f77e8f6b6-us9"
}
const request = http.request(url,options,function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();

});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(3000, function () {
  console.log("server is running ");
});



// c3d2ff5d5a36e2fb7ffdac1f77e8f6b6-us9
// f033636f08.