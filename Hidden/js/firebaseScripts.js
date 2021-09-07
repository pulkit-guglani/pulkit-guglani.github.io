document.getElementById('appYes').checked= false;
document.getElementById('appNo').checked= false;
document.getElementById('likedYes').checked = false;
document.getElementById('likedNo').checked = false;
document.getElementById("suggestion").value = "";
document.getElementById("name").value = "";
var submitButton = document.getElementById("submitButton");
var PlayStoreMessage = "Choose Yes or No for \"Game should be published or not\"";
var likedGameMessage = "Choose yes or No for \" whether you liked this game or not \"";
var submitterNameMessage = "Write your name ...."
function submit()
{
    var suggestion = document.getElementById("suggestion").value;
    var name = document.getElementById("name").value;
    var toPublishOnPlayStore = null;
    var liked = null;
    
    
   if (document.getElementById('appYes').checked)
   {
       toPublishOnPlayStore = 'yes';
   }
   else if (document.getElementById('appNo').checked)
   {
       toPublishOnPlayStore = 'No'
   }

    if (document.getElementById('likedYes').checked)
    {
        liked = 'yes';
    }
    else if (document.getElementById('likedNo').checked)
    {
       liked = 'No'
    }
   
   
   
  if(toPublishOnPlayStore != null && name !=="" && liked != null)
  {
      firebase.database().ref('Feedback/' + name).set({
          Liked:liked,
          App: toPublishOnPlayStore,
          Suggestion : suggestion
      });
      window.alert("Thanks for your suggestions, Have a nice Day"); 
      submitButton.disabled = true;
     // submitButton.style.backgroundColor = "black";
      submitButton.style.color = "grey";
      submitButton.style.border = "0px"
      submitButton.innerText = "Submitted";

  }
  else
  {
     window.alert((toPublishOnPlayStore == null ?"\n" + PlayStoreMessage : "") + (name === "" ?"\n" + submitterNameMessage:"") + (liked == null ?"\n" + likedGameMessage:"")) 
  }
  /*else if (toPublishOnPlayStore == null && name ==="")
  {
      window.alert("1. Choose Yes or No for \"Game should be published or not\" \n2. Write your name ....");
  }
  else if(toPublishOnPlayStore == null)
  {
      window.alert("Choose Yes or No for game should be published option");
  }
  else if (name ==="")
  {
      window.alert("Write your name ....")
  }*/
  
   
   // firebaseRef.child("Feedback").child("Pulkit").child("PlayStore").set("Yes");
}