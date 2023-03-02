const express=require("express");
const bodyParser=require("body-parser");
const mailchimp=require("@mailchimp/mailchimp_marketing");


const app =express()

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

mailchimp.setConfig({
    apiKey: "06fd01189f1dcbc91cf76d82ab22d554-us18",
    server: "us18",
  });

app.post("/",function(req,res){
    const firstname=req.body.fName;
    const lastname=req.body.lName;
    const email=req.body.email;

    const listId="78cd6af814";

    const subscribingUser = {
        firstName: firstname,
        lastName: lastname,
        email: email,
      };

    async function run() {
    try{
        const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName,
      },
    });

    console.log("oldu sanırım")
   res.sendFile(__dirname + "/failure.html");

}catch(e){
   console.log(e);
   res.sendFile(__dirname + "/succes.html");
   
}
}
    run();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server 3000 de hazır");
})

//06fd01189f1dcbc91cf76d82ab22d554-us18

//78cd6af814