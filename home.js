
      
      const API_KEY = 'AIzaSyBPsZJstA4soxiFjDSwtblKJOvObCgEkmg';
      const clientId = '183058898586-ld3n87r7erfmj104c1a41c4ng625hsjv.apps.googleusercontent.com'
      const SHEET_ID = '1NaRLeOsIKkO7N47wqsa-kchYcVOQ9C-HqpaDpdkzCgQ';
      const RANGE = 'Event Participants';

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

      var eventParticipants = [];

      fetch(url)
         .then(response => response.json())
         .then(data => {

            eventParticipants = data.values;
            console.log("sheetData = ", eventParticipants);

            for(i=1;i<eventParticipants.length;i++){

            
              var name = eventParticipants[i][1];
              var skills = eventParticipants[i][5];
              var profilePic = eventParticipants[i][10];

              if (typeof profilePic === 'undefined'){
               profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfaPyeDyTpc2U7lR96etWzLQU5s77awUPs1Zt17g8LwWLs9vzTmIxlgYHLdpDYRK9Mxj8&amp;usqp=CAU";
              }else{
               var params = new URLSearchParams(new URL(profilePic).search);
               var id = params.get("id"); 
                profilePic = `https://lh3.googleusercontent.com/d/${id}=w1024?authuser=0`;
              }  
                 
               var participantCard = `<li cardno="${i}" class="result-item">
                 <img class="profileImg" src="${profilePic}" atl="profile img of Alice">
                 <div class="details">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Skills:</strong> ${skills}</p>
                 </div>
              </li>`
              
             
              $("#resultsList").append(participantCard)
            }

           

         })
         .catch(error => console.error('Error fetching data:', error));

         
            $('#resultsList').on('click', '.result-item', function() {
              
               var cardno = $(this).attr("cardno");
               var url = `profile.html?cardno=${cardno}`;
               window.location = url;

            }); 

            $("#nameInput").on("keyup change",function(e){
               var inputtxt=$("#nameInput").val().toUpperCase();
               
               for(i=1;i<eventParticipants.length;i++){
                  var name = eventParticipants[i][1]; 
                  var txtcheck=name.toUpperCase();
                  
                  if(txtcheck.includes(inputtxt)){
                     $("#resultsList").find(`[cardno="${i}"]`).show();
                  }
                  else{
                     $("#resultsList").find(`[cardno="${i}"]`).hide();
                  }
               }
            });
            $("#filterkey").on("click",function(){
                  if($(this).css("width")==="30vh"){
                     $(this).css("width","0vh");
                  }
                  else{
                    $(this).css("width","30vh");
                  }
            });