
var POSTER_LOCATION = "uploads/eventImages/";
var GUESTS_LOCATION = "uploads/eventImages/eventGuests/";
var SPONSORS_LOCATION = "uploads/eventImages/eventSponsors/";
var sponsorImagePlaceholder = "img/placeholder2.jpg";
var eventImagePlaceholder = "img/noImage.jpg";
var eventManagmentOption = "<a href='#event-managment-panel' data-role='button'  data-theme='b' class='ui-btn-left' data-icon='gear' data-iconpos='right'>Settings</a>";
var accountManagmentOption = "<a href='#account-managment-panel' data-role='button'  data-theme='b' class='ui-btn-left' data-icon='gear' data-iconpos='right'>Settings</a>";
var BACK_BUTTON = "<a href='#' data-rel='back' class='left-panel-button ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-carat-l'>Back</a> ";
var SEARCH_BUTTON = "<a href='#event-categ-panel'   data-theme='d' class='left-panel-button ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all  ui-icon-search'  data-iconpos='right'   > Search </a> ";

var EVENT_PANEL_BUTTON = "<a href='#event-managment-panel'  id='search-button' data-theme='a' class='left-panel-button ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all  ui-icon-gear'    > Options </a> ";
var ACCOUNT_PANEL_BUTTON = "<a href='#account-managment-panel'  id='search-button' data-theme='a' class='left-panel-button ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all  ui-icon-gear'    > Options </a> ";

var total_ticket = 1;
var total_address = 1;
      var  total_sponsors = 1;
      var total_guest_field = 1;


var dateOptions = {
                    language:  "en",
                    weekStart: 1,
                    todayBtn:  1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0

                 };                

var timeOptions =   {
                      language:  "en",
                      weekStart: 1,
                      todayBtn:  1,
                      autoclose: 1,
                      todayHighlight: 1,
                      startView: 1,
                      minView: 0,
                      maxView: 1,
                      forceParse: 0

                   };                



var formOptions = {
                    
                    url:  "../includes/systemController.php", 
                    type: 'POST',
                    resetForm: false,
                    data: "",          
                    
                    beforesubmit: function (formData, jqForm, options) { 
                       $.mobile.loading('show');
                    },

                    success:    function (responseText, statusText, xhr, $form)  { 
                         
                                       $.mobile.loading('hide');
                         
                                       if(statusText === 'success'){
                                       
                                              $("#message-title").append('<h5 class="alert alert-success"> Upload Completed </h5>');
                                           
                                              $("#message-body").append(responseText);
                                              $("#modal-message").modal("show");
                                       
                                       } else if(statusText === 'error'){
                                       
                                                                      
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append(responseText);
                                            $("#modal-message").modal("show");
                                       }
                        
                    }, 
                    
                    uploadProgress: function(event, position, total, persentage){ } 
                    

                 };

function getEventDetails(data) {

    
        
       
        $('#event-name').text(data.event.name);

        $('#event-locat').text(data.event.city);
        $('#venue-name').text(data.event.venue);

        organizer = (data.event.organizer.name === null ) ? data.event.organizer.first_name+ " "+ data.event.organizer.last_name : data.event.organizer.name;  
        
        $('#organizer-name').text(organizer);
        $('#organizer-bio').text(data.event.organizer.bio);
        
        $('#eventDiscription').text(data.event.discription);
        $('#event-date').text(data.event.start_datetime);
        if(data.event.picture != null) {
           $('#event-detail-image').attr('src', POSTER_LOCATION+data.event.picture);
        } else {
                $('#event-detail-image').attr('src',eventImagePlaceholder);
        }
        ticket='';
        if(!data.event.tickets){
      
          $("#ticket-area").hide();
        } else {
        
        $("#ticket-area").show();
        total_created = data.event.tickets.length;
        sold_out = 0;
        for(x = 0; x < data.event.tickets.length; x++ ){
        
             ticket +=     "<tr >";
              ticket +=    "<td>";
              ticket += " <td> <h6 class='label label-info'><strong>" + data.event.tickets[x].name +"<strong></h6> </td>";
              ticket +=  "<h6 class='label label-warning'><i>"+ data.event.tickets[x].type+"</i></h6> </td>";
              ticket += " <td> <div class='label label-info'>" + data.event.tickets[x].discription +"</div> </td>";
                
              if(data.event.tickets[x].available >= 1 ) {
              ticket +=  "<td>";
              ticket  += "<h5 class='label label-success'>"+ data.event.tickets[x].available +"</h5>";
              ticket += "</td>";
              
              } else {
                sold_out = sold_out + 1;

                ticket +=  "<td>";
              ticket  += "<h5 class='label label-info'> SOLD OUT </h5>";
              ticket += "</td>";
              

              }
              ticket +=  "<td>";
              ticket += "<h4 class='label label-success' ><strong>"+data.event.tickets[x].price  +"</strong></h6>";
              ticket += "</td>";
              ticket +=  "</tr>";
        }
        if(sold_out == total_created){
          $("#get-ticket-button").addClass('ui-disabled');
        }
          $("#tickets-table-body").empty().append(ticket);
          $("#get-ticket-button").removeClass('ui-disabled');
        
        }


      guest='';
    
      if(data.event.guests == undefined ){
          $("#guest-area").hide();
      } else {
        $("#guest-area").show();
            for(x = 0; x < data.event.guests.length; x++ ){
                
                    guest +=  "<div class='col-sm-6 col-md-3'>";
                    guest += "<div class='thumbnail'>";
                    if(data.event.guests[x].image){
                      guest += "<img href='#' class='media-object img-responsive' width='100px' src='uploads/eventImages/eventSponsors/"+ data.event.guests[x].image +"'   alt='No Image'>";
                    } else {
                      guest += "<img href='#' class='media-object img-responsive' width='100px' src='"+sponsorImagePlaceholder+"'   alt=''>";
                    }
                    guest += "<div class='caption'>";
                    if(data.event.guests[x].aka_name){
                      guest += "<h5> "+data.event.guests[x].aka_name+"</h5> ";
                    } 
                    guest += "<p class='media-heading'>"+data.event.guests[x].first_name +" "+data.event.guests[x].last_name  +" </p>";
                    
                    guest += "</div>";
                    guest += "</div>";
                     guest += "</div>";

            }

          $("#guests-container").empty().append(guest); 
}


         
      
         if(data.event.sponsors == undefined){
      $("#sponsors-area").hide();
    } else {
      $("#sponsors-area").show();
      sponsors = '';

              for(x = 0; x < data.event.sponsors.length; x++ ){ 
                    sponsors +=  "<li>";
                    if(data.event.sponsors[x].image != null ) {
                        sponsors += "<img   src='uploads/eventImages/eventSponsors/"+ data.event.sponsors[x].image +"' alt=''  class=' img-thumbnail img-responsive'>";
                    }else {
                            sponsors += "<img   src='"+ sponsorImagePlaceholder +"' alt='' class=' img-thumbnail img-responsive'>";      
                    }
                    sponsors += "<p> "+data.event.sponsors[x].name+" </p>";
                    sponsors += "</li>";
              }
              $("#sponsors-container").empty().append(sponsors);
      }


       comments = '';
          if(data.event.comments != undefined) {
              for(x = 0; x < data.event.comments.length; x++ ){ 
                
                        comments += "<li>";
                    comments += "<h3>"+data.event.comments[x].name+"</h3>";
                     
                     comments += "<p><strong>"+ data.event.comments[x].content +"</strong>.</p>";
                      comments += "<p class='ui-li-aside'><strong>"+data.event.comments[x].commented_on+"</strong></p>";
                      comments += "</li>";
                      

              }


        $("#comments-container").empty().append(comments).listview('refresh');        
         
      }
        $("#available-tickets").table("refresh");

         $('#event-map').locationpicker({
                                    location: {latitude: data.event.latitude , longitude:   data.event.longitude},
                     });

}


$(document).on("click", ".ticket-type", function(){

      selected_type = $(this).val();

      alert(selected_type);
});


function new_ticket_slot(){
        total_ticket = total_ticket + 1;
    ticket_elements = "<tr>"+
                              "<td>"+
                                  "<fieldset class='ui-field-contain'>"+
                                      "<label for='ticket-type"+total_ticket+"' class='ui-hidden-accessible'> Ticket Type </label>"+
                                      "<select name='ticket-type[]' data-role='flipswitch' required='required' id='ticket-type"+total_ticket+"'   >"+
                                          "<option value='free' selected='selected' > Free </option>"+
                                          "<option value='paid' > Paid </option>"+
                                      "</select>"+
                                  "</fieldset>"+
                              "</td>"+
                              "<td>"+
                                  "<fieldset class='ui-field-contain'>"+
                                      "<label for='ticket-name"+total_ticket+"' class='ui-hidden-accessible'> Ticket Name </label>"+
                                      "<input type='text' name='ticket-name[]'  required='required' placeholder='Name like (vip, normal...)' id='ticket-name"+total_ticket+"'  speech-input >"+
                                          
                                      
                                  "</fieldset>"+
                              "</td>"+
                              "<td>"+
                                  "<fieldset class='ui-field-contain'>"+
                                      "<label for='ticket-quantity"+total_ticket+"' class='ui-hidden-accessible'> Available Tickets </label>"+
                                      "<input type='number'  data-clear-btn='true' required='required' placeholder='Available Tickets' min='0' max='10000' name='ticket-quantity[]' id='ticket-quantity"+total_ticket+"'  >"+
                                  "</fieldset>"+
                              "</td>"+
                              "<td>"+
                                  "<fieldset class='ui-field-contain'>"+
                                      "<label for='ticket-price"+total_ticket+"' class='ui-hidden-accessible'> Ticket Price </label>"+
                                      "<input type='number'  id='ticket-price"+total_ticket+"' required='required'  name='ticket-price[]' placeholder='Price' min='0' max='10000' >"+
                                  "</fieldset>"+
                              "</td>"+
                              "<td>"+
                                  "<label for='ticket-discription"+total_ticket+"' class='ui-hidden-accessible'> Ticket Discription </label>"+
                                  "<textarea  name='ticket-discription[]' required='required' id='ticket-discription"+total_ticket+"' placeholder='Ticket Discription' ></textarea>"+
                              "</td>"+
                              "<td>"+
                                  "<a   data-role='button' data-icon='delete' data-iconpos='notext' data-theme='e'  class='deleteticket ui-corner-all'  "+
                                  "placeholder='delete Ticket'  > delete </a>"+
                              "</td>"+
                          "</tr>";
                            
                  return ticket_elements;
}


function get_sponsor_field(total_sponsors){
   sponsor_field = '<tr class="sponsor-field">'+ 
                            
                            '<td class="sponsor-name">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="sponsor-name'+total_sponsors+'" class="ui-hidden-accessible"> Sponsor Name </label>'+
                                    '<input type="text"  required="required"  name="sponsor-name[]" id="sponsor-name'+total_sponsors+'"  '+
                                    'placeholder="Sponsor name or Compant Name"  />'+
                                '</fieldset>'+
                            '</td>'+
                            '<td class="add-sponsor">'+
                                    '<a  data-role="button"  data-mini="true" data-icon="camera" data-iconpos="notext" class="add-sponsor-image" > Add Image </a>  '+  
                            ' </td> '+
                            '<td class="sponsor-image-cell selected-file " >'+
                             ' <img src="../'+sponsorImagePlaceholder+'" width="100px"  class="img-thumbnail sponsor-image-preview img-responsive" />'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="sponsor-image'+total_sponsors+'" class="ui-hidden-accessible"> Sponsor Image </label>'+
                                    '<input type="file" class=" ui-hidden-accessible accept="image/*" sponsor-image" data-enhanced="true" data-btn-clear="false"  name="sponsor-image[]" '+ 
                                      ' />'+
                                '</fieldset>'+
                             '</td>'+                           
                            '<td class="sponsor-remove">' +
                                '<a data-role="button" data-icon="delete" data-theme="e" data-iconpos="notext" class="remove-sponsor" class="ui-shadow ui-corner-all" > Remove </a>'+
                             '</td>'+
                        '</tr>';

                return sponsor_field;
}



function get_guest_field(total_guests){

 guest_field = '<tr class="guest-field">'+ 
                            
                            '<td class="guest-firstname">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-first-name'+total_guests+'" class="ui-hidden-accessible"> First Name (Required) </label>'+
                                    '<input type="text"  required="required"  name="guest-first-name[]" id="guest-first-name'+total_guests+'"  '+
                                    'placeholder="First Name (Required)"  class="speech-input"/>'+
                                '</fieldset>'+
                            '</td>'+
                            '<td class="guest-lastname">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-last-name'+total_guests+'" class="ui-hidden-accessible"> Last Name (Required) </label>'+
                                    '<input type="text"  required="required"  name="guest-last-name[]" id="guest-last-name'+total_guests+'"  '+
                                    'placeholder="Last Name (Required)"  class="speech-input"/>'+
                                '</fieldset>'+
                            '</td>'+
                            '<td class="guest-akaname">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-aka-name'+total_guests+'" class="ui-hidden-accessible"> guest Name </label>'+
                                    '<input type="text"   name="guest-aka-name[]" id="guest-aka-name'+total_guests+'"  '+
                                    'placeholder="Stage Name Or Nick Name (Optional)"  class="speech-input"/>'+
                                '</fieldset>'+
                            '</td>'+
                          
                            
                            '<td class="selected-file">'+
                                               '<a href="#" class="add-guest-image" > <img src="../'+sponsorImagePlaceholder+' " '+
                                              'width="100px"  class="img-thumbnail guest-image-preview img-responsive" /> </a>  '+  
                                                   '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-image'+total_guests+'" class="ui-hidden-accessible"> guest Image </label>'+
                                    '<input type="file" class=" ui-hidden-accessible ui-shadow ui-corner-all guest-image" accept="image/*" data-clear-btn="false"  name="guest-image[]" '+ 
                                      '  />'+
                                '</fieldset>'+
                            '</td > '+
                            
                             '<td class="guest-remove">'+
                                '<a data-role="button" data-icon="delete" data-theme="e" data-iconpos="notext" class="remove-guest" class="ui-shadow ui-corner-all" > Remove </a>'+
                                
                            ' </td> '+
                        '</tr>';
        

          return guest_field;
}

  
     


function initialize_guest_fields(data, total_guests){
  var image = '../img/placeholder2.jpg';
  

      if(data.image) {
        image = '../'+GUESTS_LOCATION+data.image;
      }
      
          guest_field = '<tr class="guest-field">'+ 
                            
                            '<td class="guest-firstname">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-first-name-update'+total_guests+'" class="ui-hidden-accessible"> First Name (Required) </label>'+
                                    '<input type="text"  required="required"  name="guest-first-name-update[]" id="guest-first-name-update'+total_guests+'"  '+
                                    'placeholder="First Name (Required)" value="'+data.first_name+'"  class="speech-input"/>'+
                                '</fieldset>'+
                            '</td>'+
                            '<td class="guest-lastname">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-last-name-update'+total_guests+'" class="ui-hidden-accessible"> Last Name (Required) </label>'+
                                    '<input type="text"  required="required"  name="guest-last-name-update[]" id="guest-last-name-update'+total_guests+'"  '+
                                    'placeholder="Last Name (Required)" value="'+data.last_name+'"  class="speech-input"/>'+
                                '</fieldset>'+
                            '</td>'+
                            '<td class="guest-akaname">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-aka-name-update'+total_guests+'" class="ui-hidden-accessible"> guest Name </label>'+
                                    '<input type="text"   name="guest-aka-name-update[]" id="guest-aka-name-update'+total_guests+'"  '+
                                    'placeholder="Stage Name Or Nick Name (Optional)" value="'+data.aka_name+'"  class="speech-input"/>'+
                                '</fieldset>'+
                            '</td>'+
                            '<td class="add-guest">'+
                            
                                    '<a href="#" class="add-guest-image" > <img src="'+image+'" width="100px" class="img-thumbnail guest-image-preview img-responsive" /></a>  '+  
                                    '<fieldset class="ui-field-contain">'+
                                    '<label for="guest-image-update'+total_guests+'" class="ui-hidden-accessible"> guest Image </label>'+
                                    '<input type="file" class="ui-hidden-accessible accept="image/*" ui-shadow ui-corner-all guest-image" id="guest-image-update'+total_guests+'" data-clear-btn="false"  name="guest-image-update[]" '+ 
                                     '  />'+
                                '</fieldset>'+
                            '</td > '+
                            
                                                                      
                                      
                            
                             '<td class="guest-remove">'+
                             '<input type="text" class=" ui-hidden-accessible " data-clear-btn="false"  name="guest-id[]" value="'+data.GUEST_ID+'"  />'+
                                '<a href="#" data-role="button" data-icon="delete" data-theme="e" data-iconpos="notext" id="'+data.GUEST_ID+'" class="remove-guest" class="ui-shadow ui-corner-all" > Remove </a>'+
                                
                            ' </td> '+
                        '</tr>';
        

        $("#guest-preview").append(guest_field).enhanceWithin();
        $("#guest-preview").closest('table').table('refresh');             
                                                                        
}



function initialize_sponsor_fields(data, total_sponsors){

  var image = '../img/placeholder2.jpg';
      if(data.image) {
        image = '../'+SPONSORS_LOCATION+data.image;
      }
  
   sponsor_field = '<tr class="sponsor-field">'+ 
             
                            '<td class="sponsor-name">'+
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="sponsor-name-update'+total_sponsors+'" class="ui-hidden-accessible"> Sponsor Name </label>'+
                                    '<input type="text"  required="required"  name="sponsor-name-update[]" id="sponsor-name-update'+total_sponsors+'"  '+
                                    'placeholder="Sponsor name or Compant Name" value="'+data.name+'"  class="speech-input" />'+
                                '</fieldset>'+
                            '</td>'+
                            '<td class="add-sponsor">'+
                                       '<a  data-role="button"  data-mini="true" data-icon="camera" data-iconpos="notext" class="add-sponsor-image" > Add Image </a>  '+  
                                    
                            ' </td> '+
                            '<td class="sponsor-image-cell selected-file " >'+
                         '<img src="'+image+'" width="100px" class="img-thumbnail sponsor-image-preview img-responsive" /></a> </a>  '+  
                                '<fieldset class="ui-field-contain">'+
                                    '<label for="sponsor-image-update'+total_sponsors+'" class="ui-hidden-accessible"> Sponsor Image </label>'+
                                    '<input type="file" class="ui-hidden-accessible  accept="image/*" sponsor-image" data-enhanced="true" data-btn-clear="true"  name="sponsor-image-update[]" '+ 
                                      ' />'+
                                '</fieldset>'+
                             '</td>'+                           
                            '<td class="sponsor-remove">' +
                            '<input type="text" data-enhanced="true" class=" ui-hidden-accessible " data-clear-btn="false"  name="sponsor-id[]" value="'+data.SPONSOR_ID+'"  />'+
                                '<a data-role="button" data-icon="delete" data-theme="e" data-iconpos="notext" class="remove-sponsor" id="'+data.SPONSOR_ID+'"  class="ui-shadow ui-corner-all" > Remove </a>'+
                             '</td>'+
                        '</tr>';
     

        $("#sponsor-box").append(sponsor_field).enhanceWithin();
        $("#sponsor-box").closest('table').table('refresh');

        
}

var CONFIRMATION =  '<h4 class="alert alert-warning " > Are You Sure You Want To Delete This Item ??? </h4>'+
                 
                    '<button type="button" class="answer" data-theme="e" id="yes" > Yes </button> '+
             
                    '<button type="button" class="answer"  id="cancel" data-theme="b" > Cancel </button> ';
                
                    
function initialize_ticket(data) {

event_tickets = '';

    for(i=0 ; i < data.length ; i++) {
                                    
                                          event_tickets += '<tr>';
                                          event_tickets += '<td>';
                                          event_tickets += '<fieldset class="ui-field-contain">';
                                          event_tickets +=  '<label for="ticket-type-update'+i+'" class="ui-hidden-accessible"> Ticket Type </label>';
                                          event_tickets +=  '<select name="ticket-type-update[]" required="required" id="ticket-type-update'+i+'" data-role="flipswitch" >';
                                                                  
                               if(data[i].type == 'free'){
                              
                                          event_tickets +=  '<option value="free"  selected="selected" > Free </option>';
                                          event_tickets +=   '<option value="paid" > Paid </option>';
                              
                                 } else {
                                          event_tickets +=    '<option value="free"   > Free </option>';
                                          event_tickets +=    '<option value="paid" selected="selected" > Paid </option>';
                                  }
                                                                
                                                                
                                          event_tickets +=     '</select>';
                                          event_tickets +=    '</fieldset>';
                                          event_tickets +=   '</td>';
                                          event_tickets +=    '<td>';
                                          event_tickets +=    '<fieldset class="ui-field-contain">';
                                          event_tickets +=     '<label for="ticket-name-update'+i+'" class="ui-hidden-accessible"> Name </label>';
                                          event_tickets +=     '<input type="text" required="required" minlength="3"  data-clear-btn="true" placeholder="Name" name="ticket-name-update[]" id="ticket-name-update'+i+'" class="speech-input" value="'+data[i].name+'" >';
                                          event_tickets +=   '</fieldset>';
                                          event_tickets +=    '</td>';
                                          event_tickets +=                 '<td>';
                                          event_tickets +=                      '<fieldset class="ui-field-contain">';
                                          event_tickets +=                          ' <label for="ticket-quantity-update'+i+'" class="ui-hidden-accessible"> Available Tickets </label>';
                                          event_tickets +=                        '<input type="number" required="required"  data-clear-btn="true" placeholder="Available Tickets" min="0" max="100000" value="'+data[i].available+'" name="ticket-quantity-update[]" id="ticket-quantity-update'+i+'" class="speech-input" >';
                                          event_tickets +=                       '</fieldset>';
                                          event_tickets +=                    '</td>';
                                          event_tickets +=    '<td>';
                                          event_tickets +=                      '<fieldset class="ui-field-contain">';
                                          event_tickets +=                            '<label for="ticket-price-update'+i+'" class="ui-hidden-accessible"> Ticket Price </label>';
                                          event_tickets +=                          '<input type="number" name="ticket-price-update[]" required="required"  id="ticket-price-update'+i+'"  placeholder="Price" min="0" max="10000" value="'+data[i].price+'" class="speech-input">';
                                          event_tickets +=                         '</fieldset>';
                                          event_tickets +=                    '</td>';
                                          event_tickets +=                    '<td>';
                                          event_tickets +=                       '<label for="ticket-discription-update'+i+'" class="ui-hidden-accessible"> Ticket Discription </label>';
                                          event_tickets +=                      '<textarea rows="3" cols="20" name="ticket-discription-update[]" required="required" id="ticket-discription-update'+i+'" placeholder="Ticket Discription" class="speech-input">'+data[i].discription+'</textarea>';
                                          event_tickets +=                   '</td>';
                                          event_tickets +=                    '<td>';
                                          event_tickets +=      '<input  type="text" name="ticket_id[]" data-enhanced="true" class="ui-hidden-accessible" value="'+data[i].TIK_ID+'"  >';
                                          event_tickets +=                 '<a  data-role="button" data-icon="delete" data-iconpos="notext" data-theme="e" class="ui-btn-icon-right ui-btn-e ui-corner-all deleteticket " id="'+data[i].TIK_ID+'"  placeholder="delete Ticket" class="speech-input" > Remove </a>';
                                          event_tickets +=                    '</td>';
                                          event_tickets +=                 '</tr>';
                            }
                            
                            
      $("#ticket-box").empty();
      $("#ticket-box").append(event_tickets).enhanceWithin();
                      table = $("#ticket-box").closest('table');
                      table.table('refresh');
        
       
                  
}

$(document).on('change', '.change-status', function() {
var CHANGE = null;
        
        if($(this).val() === 'ON' ) {
          CHANGE = 'ACTIVE';
        } else {
          CHANGE = 'DRAFT';
        }

        var Event = $(this).attr('id');

        $.ajax({
                  url: 'includes/systemController.php',
                  data: {get: 'change_status', event_id : Event , organizer_id: localStorage.organizer_id, change_to: CHANGE },
                  dataType : 'JSON',
                  type: 'GET',
                  cache : false,
                  success : function(data, resultText, jqxhr ) {

                       
                            $("#message-body").empty();
                            $("#message-body").append( data.message);
                            $("#modal-message").modal('show');
                          
                  }, 
                  error: function(data, error, errorCode){
                    alert(error +' '+errorCode);
                  }
        });

});

function display_event_summary(data, statusText, jqxhr) {

  

  status_change =  '<select class="change-status" id="'+data.EVNT_ID+'" data-role="flipswitch" >';
  status_change +=  '<option value="OFF"  selected="selected" >  Deactivate </option>';
  status_change +=   '<option value="ON" > Make Active </option>';
  status_change += '</select>';

  $("#change-status").empty();
        $('#change-status').append(status_change).enhanceWithin();
                              
          if(statusText === 'success') {
            
             $("#selected-event-image").empty();
            
            if(data.picture != null){
                $("#selected-event-image").append(                
                '<img src="uploads/eventImages/'+data.picture+'"class="img-responsive" /> ');  
            } else {
                $("#selected-event-image").append(                
                '<img src="'+eventImagePlaceholder+'"  class="img-responsive " /> ');  
            }
           
            
             $("#selected-event").text(data.name);

            $("#selected-event-venue").text(data.venue);
            $("#selected-event-location").text(data.location);
            $("#selected-event-start").text(data.start_date);
            $("#selected-event-end").text(data.end_date);
            $("#selected-event-about").text(data.discription);
            $("#selected-event-status").text(data.status);
            $("#selected-event-basics").listview('refresh');
            var ticket = '';
        
              if(data.ticket) { 
              for(i = 0; i < data.ticket.length; i++) {
                ticket += "<li>"+

                              "<h4>"+data.ticket[i].name+" </h4> <p> "+data.ticket[i].discription+" </td>"+
                                  "<td>"+data.ticket[i].type+"</td>"+
                                      "<td>"+data.ticket[i].quantity+"</td>"+
                                          "<td>"+data.ticket[i].available+"</td>"+
                                          "<td>"+data.ticket[i].price+"</td>"+
                                          "<td>"+(data.ticket[i].price * (data.ticket[i].quantity - data.ticket[i].available ) )+"</td>"+
                                          "<td>"+data.ticket[i].sale_start+"</td>"+
                                          "<td>"+data.ticket[i].sale_end+"</td>"+
                                  "</tr>";
              }

               $("#selected-event-ticket").empty();
              $("#selected-event-ticket").append(ticket).enhanceWithin();
              $("#selected-event-ticket").closest('table').table('refresh');
            }


             
              
var sponsor_field = '  <li data-role="list-divider"> Event Sponsors  </li>';
             if(data.sponsor) {

                  for(i=0 ; i < data.sponsor.length; i++ ) {
                    sponsor_field =  "<li>";
                    if(data.image) {
                    sponsor_field += "<img src='uploads/eventImages/eventSponsors/"+ data.image +"' width='80' class='img-responsive img-thumbnail'  />  ";
                    }
                     sponsor_field += "<img src='"+sponsorImagePlaceholder+"' width='80' class='img-responsive img-thumbnail'  />  ";
                    sponsor_field +=  "<h3 >"+ data.name +"</h3>  "; 
                    sponsor_field += "</li>";
                  }

                  $("#selected-event-sponsor").empty();
                  $("#selected-event-sponsor").append(sponsor_field);
                   $("#selected-event-sponsor").listview('refresh');
              }
var guest_field = '  <li data-role="list-divider"> Event Guest  </li>';
              if(data.guest) {

                  for(i=0 ; i < data.guest.length; i++ ) {
                    guest_field =  "<li>";
                    if(data.image) {
                    guest_field += "<img src='uploads/eventImages/eventGuest/"+ data.image +"' width='80' class='img-responsive img-thumbnail'  />  ";
                    }
                     guest_field += "<img src='"+sponsorImagePlaceholder+"' width='80' class='img-responsive img-thumbnail'  />  ";
                    guest_field +=  "<h3 >"+ data.name +"</h3>  "; 
                    guest_field += "</li>";
                  }

                  $("#selected-event-guest").empty();
                  $("#selected-event-guest").append(guest_field);
                   $("#selected-event-guest").listview('refresh');
              }
          }

          
}

function initialize_address_form(data){
var address_form = ''; 

$("#address-container").empty();
      for(i=0; i < data.length; i++){

      address_form = "<tr class='address-field'>";
      address_form += "<td>";
      address_form +=     "<fieldset class='ui-field-contain'>";
      address_form +=         "<label for='organization-country"+total_address+"' class='ui-hidden-accessible'> Country </label>";
      address_form +=          "<input type='text' name='organization-country-update[]' id='organization-country"+total_address+"' value='"+data[i].country+"' data-clear-btn='true' placeholder='Country'  />";
      address_form +=      "</fieldset>";                         
      address_form += "</td>";
      address_form += "<td>";
      address_form +=        "<fieldset class='ui-field-contain'>";
      address_form +=             "<label for='organization-city"+total_address+"' class='ui-hidden-accessible'> City </label>";
       address_form +=             "<input type='text' name='organization-city-update[]' id='organization-city"+total_address+"' data-clear-btn='true' placeholder='City' value='"+data[i].city+"'  />";
      address_form +=         "</fieldset>";                          
      address_form += "</td>";
      address_form += "<td>";
      address_form +=          "<fieldset class='ui-field-contain'>";
      address_form +=             "<label for='organization-sub-city"+total_address+"' class='ui-hidden-accessible'> sub city </label>";
      address_form +=             "<input type='text' name='organization-sub-city-update[]' id='organization-sub-city"+total_address+"' data-clear-btn='true' placeholder='Sub City' value='"+data[i].sub_city+"'  />";
      address_form +=         "</fieldset>";
      address_form += "</td>";
      address_form += "<td>";
      address_form +=          "<fieldset class='ui-field-contain'>";
      address_form +=              "<label for='common-name"+total_address+"' class='ui-hidden-accessible'> Common or Building Name </label>";
      address_form +=              "<input type='text' name='common-name-update[]' id='common-name"+total_address+"'   placeholder='Common or Building Name' value='"+data[i].location+"'  />";
      address_form +=          "</fieldset>";   
      address_form += "</td>";
      address_form += "<td>";
      address_form += " <a href='#event-map-popup"+total_address+"' data-transition='slideup' data-rel='popup' class='ui-btn ui-btn-c  ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-plus'  data-position-to='window' > Use Map</a> ";                       
      address_form +=  " <div data-role='popup' id='event-map-popup"+total_address+"' class='ui-content' data-overlay-theme='c' data-theme='b' >";
      address_form +=       "<a href='#'  data-rel='back' data-role='button' data-transition='slidedown' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right' > Close</a>";
      address_form +=           "<div id='organization-map"+total_address+"'  class='ui-body-b' style='margin-top: 10px;  width: 300px; height: 150px;'> </div>";
      address_form +=            "<fieldset class='ui-field-contain'>";
      address_form +=               "<label for='organization-longitude"+total_address+"' class='ui-hidden-accessible'> Longtiude </label>";
      address_form +=               "<input type='text' name='organization-longitude-update[]' data-clear-btn='false'  value='"+data[i].longitude+"' readonly id='organization-longitude"+total_address+"' />";
      address_form +=             "</fieldset>";
      address_form +=             "<fieldset class='ui-field-contain'>";
      address_form +=                "<label for='organization-latitude"+total_address+"' class='ui-hidden-accessible'> Longtiude </label>";
      address_form +=                "<input type='text' name='organization-latitude-update[]'   data-clear-btn='false' value='"+data[i].latitude+"' readonly id='organization-latitude"+total_address+"' />";
      address_form +=              "</fieldset>";
      address_form +=          "</div>"
      address_form += "</td>";
      address_form += "<td>";
      address_form +=          "<input type='text' name='address-id[]' id='address-id"+total_address+"' class='ui-hidden-accessible' value='"+data[i].ORG_ADD_ID+"' data-enhanced='true'  />";
      address_form += "<a  data-role='button'  class=' delete-address ui-btn ui-btn-e  ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-delete' id='"+data[i].ORG_ADD_ID+"' >Delete</a> ";
      address_form += "</td>";
      address_form +=  "</tr>"
      

        $("#address-container").append(address_form);
                  $("#address-container").enhanceWithin();   
                     $("#address-table").table('refresh');
                     $("#organization-map"+total_address).locationpicker({
                            location: {latitude: data[i].latitude  , longitude:   data[i].longitude},
                            enableAutocomplete: true,
                            radius: 20,
                            inputBinding: {
                                              latitudeInput: $('#organization-latitude'+total_address),
                                              longitudeInput: $('#organization-longitude'+total_address),

                                             
                                            },
                                onchanged: function(currentLocation, radius, isMarkerDropped) {
                              //  alert("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude +", "+ currentLocation.locationNameInput +" )");
                              var addressComponents = $(this).locationpicker('map').location.addressComponents;
                                  $('#organization-city'+total_address).val(addressComponents.city);
                                   $('#organization-country'+total_address).val(addressComponents.country);
                              },
                               oninitialized: function(component){
                                                   var addressComponents = $(component).locationpicker('map').location.addressComponents;
                                              }
                              });

               

        total_address = total_address + 1;            
      }
      

      
                     
}


function create_address_form(){
  

      address_form = "<tr class='address-field'>";
      address_form += "<td>";
      address_form +=     "<fieldset class='ui-field-contain'>";
      address_form +=         "<label for='organization-country"+total_address+"' class='ui-hidden-accessible'> Country </label>";
      address_form +=          "<input type='text' name='organization-country[]' id='organization-country"+total_address+"' data-clear-btn='true' placeholder='Country'  />";
      address_form +=      "</fieldset>";                         
      address_form += "</td>";
      address_form += "<td>";
      address_form +=        "<fieldset class='ui-field-contain'>";
      address_form +=             "<label for='organization-city"+total_address+"' class='ui-hidden-accessible'> City </label>";
       address_form +=             "<input type='text' name='organization-city[]' id='organization-city"+total_address+"' data-clear-btn='true' placeholder='City'  />";
      address_form +=         "</fieldset>";                          
      address_form += "</td>";
      address_form += "<td>";
      address_form +=          "<fieldset class='ui-field-contain'>";
      address_form +=             "<label for='organization-sub-city"+total_address+"' class='ui-hidden-accessible'> sub city </label>";
      address_form +=             "<input type='text' name='organization-sub-city[]' id='organization-sub-city"+total_address+"' data-clear-btn='true' placeholder='Sub City'  />";
      address_form +=         "</fieldset>";
      address_form += "</td>";
      address_form += "<td>";
      address_form +=          "<fieldset class='ui-field-contain'>";
      address_form +=              "<label for='common-name"+total_address+"' class='ui-hidden-accessible'> Common or Building Name </label>";
      address_form +=              "<input type='text' name='common-name[]' id='common-name"+total_address+"'   placeholder='Common or Building Name'  />";
      address_form +=          "</fieldset>";   
      address_form += "</td>";
      address_form += "<td>";
      address_form += " <a href='#event-map-popup"+total_address+"' data-transition='slideup' data-rel='popup' class='ui-btn ui-btn-c  ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-plus'  data-position-to='window' > Use Map</a> ";                       
      address_form +=  " <div data-role='popup' id='event-map-popup"+total_address+"' class='ui-content' data-overlay-theme='c' data-theme='b' >";
      address_form +=       "<a href='#'  data-rel='back' data-role='button' data-transition='slidedown' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right' > Close</a>";
      address_form +=           "<div id='organization-map"+total_address+"'  class='ui-body-b' style='margin-top: 10px;  width: 300px; height: 150px;'> </div>";
      address_form +=            "<fieldset class='ui-field-contain'>";
      address_form +=               "<label for='organization-longitude"+total_address+"' class='ui-hidden-accessible'> Longtiude </label>";
      address_form +=               "<input type='text' name='organization-longitude[]' data-btn-clear='false' class='ui-hidden-accessible' readonly id='organization-longitude"+total_address+"' />";
      address_form +=             "</fieldset>";
      address_form +=             "<fieldset class='ui-field-contain'>";
      address_form +=                "<label for='organization-latitude"+total_address+"' class='ui-hidden-accessible'> Longtiude </label>";
      address_form +=                "<input type='text' name='organization-latitude[]'   data-btn-clear='false' class='ui-hidden-accessible' readonly id='organization-latitude"+total_address+"' />";
      address_form +=              "</fieldset>";
      address_form +=          "</div>"
      address_form += "</td>";
      address_form += "<td>";

      address_form += "<a  data-role='button' class=' delete-address ui-btn ui-btn-e  ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-delete'>Delete</a> ";
      address_form += "</td>";
      address_form +=  "</tr>"
      


                $("#address-container").append(address_form)
                  $("#address-container").enhanceWithin();   
                     $("#address-table").table('refresh');
                     $("#organization-map"+total_address).locationpicker({
                            location: {latitude: 9.005401  , longitude:   38.763611},
                            enableAutocomplete: true,
                            radius: 20,
                            inputBinding: {
                                              latitudeInput: $('#organization-latitude'+total_address),
                                              longitudeInput: $('#organization-longitude'+total_address),

                                             
                                            },
                                onchanged: function(currentLocation, radius, isMarkerDropped) {
                              //  alert("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude +", "+ currentLocation.locationNameInput +" )");
                              var addressComponents = $(this).locationpicker('map').location.addressComponents;
                                  $('#organization-city'+total_address).val(addressComponents.city);
                                   $('#organization-country'+total_address).val(addressComponents.country);
                              },
                               oninitialized: function(component){
                                                   var addressComponents = $(component).locationpicker('map').location.addressComponents;
                                              }
                              });
                            
                          

        total_address = total_address + 1;            
}


$(document).on("mobileinit", function() {
      
      $.extend(  $.mobile , {
                              pageLoadErrorMessage: 'Sorry Error Loading Page...',
                              defaultPageTransition: "slide",
                              defaultDialogTransition: 'slideup',
                              loadingMessage: "Loading Request...",
                              loadingMessageTextVisible: true,
                              loadingMessageTheme: "b",
                              pageLoadErrorMessageTheme: "e",                     
                              hashListeningEnabled: true
                        //   subPageUrlKey: "E-gate",
                            }
              );

  // LOADING
      $.mobile.loader.prototype.options.text = "loading";
      $.mobile.loader.prototype.options.textVisible = true;
      $.mobile.loader.prototype.options.disabled = false;
      $.mobile.loader.prototype.options.theme = "a";
      $.mobile.loader.prototype.options.html = "";
      
     $.mobile.ajaxEnabled = true;
     $.mobile.linkBindingEnabled = true; //external Page ajax load
  //    $.mobile.ajaxEnabled = false;
//$.mobile.linkBindingEnabled = false;
//$.mobile.hashListeningEnabled = false;
//$.mobile.pushStateEnabled = false;
//$.mobile.changePage.defaults.changeHash = false;
      
    //LISTVIEW WIDGET SETTING
      $.mobile.listview.prototype.options.splitIcon = 'gear';
      $.mobile.listview.prototype.options.splitTheme = 'b';
      $.mobile.listview.prototype.options.inset = false;
      $.mobile.listview.prototype.options.dividerTheme = 'b';
      $.mobile.listview.prototype.options.autodividersSelector = true;
      $.mobile.listview.prototype.options.filter = false;
      $.mobile.listview.prototype.options.filterTheme = 'b';
      $.mobile.listview.prototype.options.filterPlaceholder = 'Search...';
    //$.mobile.listview.prototype.options.filterCallback = customFilter;

    //$.mobile.page.prototype.options.keepNative = 'button';
   $.mobile.toolbar.prototype.options.addBackBtn = true;
   //   $.mobile.dialog.prototype.options.addBackBtn = true;
      $.mobile.page.prototype.options.domCache =  false; 
     $.mobile.dialog.prototype.options.backBtnText = "Back";
      $.mobile.textinput.prototype.options.clearBtnText = "Remove";
      $.mobile.textinput.prototype.options.mini = true;
      $.mobile.textinput.prototype.options.clearBtn = true;

//$.mobile.dialog.prototype.options.theme = "d";
      $.mobile.dialog.prototype.options.overlayTheme = "a";
      
  
   //  $.mobile.ignoreContentEnabled = true;
      $.mobile.orientationChangeEnabled = false;
    


});





$(function(){
      
      $( window ).orientationchange();
      $( window ).on( "orientationchange", function( event ) {

          if(event.orientation === "landscape"){
            
            } else if (event.orientation === "portrait"){
                
            }
      });

});

$( document ).ajaxComplete(function( event, request, settings ) {
       $.mobile.loading("hide");
});

$.ajaxSetup({

      url: 'processor.php',      
 
});


$( document ).ajaxSend(function( event, jqxhr, settings ) {
      
      $.mobile.loading("show");

});


$( document ).ajaxError(function( event, request, settings ) {

  //$("body").pagecontainer("change", "#info-dialog", {transition: 'slidedown'});
   //  $("#info-dialog-content").append("<h1> error occured in loading "+ settings.url +  " page </h1> ");
     
});

$( document ).ajaxStart(function() {

});

$( document ).ajaxStop(function() {
 $.mobile.loading("hide");

});



$(window).unload(function(){

  if(localStorage.organizer_id !== 'undefined'){
    localStorage.removeItem(localStorage.organizer_id);
  }
});

/*
$(document).on('pagebeforecreate', '[data-role=page]', function () {
  if ($(this).find('[data-role=panel]').length === 0) {
    $('[data-role=header]').before(panel);
  }
});

*/


$(document).on("click", ".remove-guest" ,function(){
  
          row = $(this);
          
          var    guest = $(this).attr('id');

 
        $("#message-body").empty();
        $("#message-body").append(CONFIRMATION);
        $("#message-body").enhanceWithin();
        $("#modal-message").modal("show");

               
        $(document).on("click", '.answer', function() {
                  
              answer = $(this).attr('id');

              if(answer == 'yes'){
              
                  if(guest) {  
                        
                        $.ajax({
                                  url: '../includes/systemController.php',
                                  data: {get: 'delete_guest', guest_id : guest, organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event },
                                  type : 'GET',
                                  
                                  success: function(data, result, jqxhr ){

                                      if(result == 'success'){
                                         
                                          $("#message-body").empty();
                                          $("#message-body").append(data);
                                                                                 
                                        } else {
                                       
                                          alert('error deleting');
                                       
                                        }
                                   
                                    }
                        });

                    } else {
                      
                      $("#modal-message").modal("hide");
                             
                    }  
                      
              row.closest('tr').remove(); 
                                         
              } else {
                  
                  $("#modal-message").modal("hide");
              
              }

          });

                
});




$(function(){
    
           
});


 $(document).on("click","#log-off-button", function(e) {
              
                 

                  $.ajax({

                          url: 'logChecker.php',
                          data: {get: 'log_out'},
                          dataType: 'JSON',
                          type: 'GET',
                          cache: false,
                          success: function(data){
                              if(data.success === 'true'){
                                 update_navigation_to('normal');

                                  $("#menu-button").text("Menu");
                                      
                                      $( "body").pagecontainer( "change", "#homePage", { transition: "slide" });
                                                                   
                                 
                              } else {

                                    alert('error login out');
                              }
                          }
                  });
                    
                  


        });






$(document).on('pagecreate', '#signUpForm', function(){  
      

        $('#registeration-form').validate({
        
          rules : {
            'organizer-re-password': {
              required: true,
              equalTo: '#organizer-password'
            }
          },
          messages: {

              'organizer-first-name': 'Please Provide Your First Name',
              'organizer-last-name': 'Please Provide Your Last Name',
              'organizer-password': 'Please Provide Password',
              
              'organizer-email' : 'Please Enter Valid Email address format like example@domain.com',
            'organizer-re-password': {
              required: "Please provide a password",

              equalTo: "Password Does't match"
            }
          }
        });


        
        formOptions.data = { form: 'sign_up'};

        $('#registeration-form').ajaxForm({
                    
                    url:  'includes/systemController.php', 
                    type: 'POST',
                    resetForm: false,
                    dataType: 'JSON',
                    data: { form: 'sign_up'},          
                    
                    beforesubmit: function (formData, jqForm, options) { 
                       $.mobile.loading('show');
                    },

                    success:    function (data, statusText, xhr, $form)  { 
                         
                                       $.mobile.loading('hide');
                         
                                       if(statusText === 'success'){
                                       
                                       if(data.success == 'true'){


                                              $("#message-title").append('<h5 class="alert alert-success"> Success!!! </h5>');
                                           update_navigation_to('admin');
                                              $("#message-body").append(data.message);
                                              $("#menu-button").text(response.organizer_name);
                                              $("#modal-message").modal("show");
                                              $.mobile.back();

                                       } else {
                                              $("#message-body").append(data.message);
                                              $("#modal-message").modal("show");
                                       }


                                       } else if(statusText === 'error'){
                                       
                                                                      
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append(responseText);
                                            $("#modal-message").modal("show");
                                       }
                        
                    }, 
                    
                    uploadProgress: function(event, position, total, persentage){ } 
                    

                 });


                  
                  
            
    
});




$(document).on("pagebeforecreate", "#homePage", function(event, data){
      
      $.ajax(
              {
                  url:'includes/systemController.php',
                  type:'GET',
                  dataType: 'json',
                  data :{get : 'trending_events'},

                  cache : false,
                 
                    beforeSend: function() {
                                      //Show ajax spinner
                                        $.mobile.loading("show"); 
                                      },
              
                  
                  success : function(data, status_code, jqXHR) {
                        
                                if(status_code == 'success') {
             
                                    box = '';
                                      
                                      for($i = 0 ; $i < data.length ; $i++ ){
                                         // box += "<li data-role='list-divider' style='display:none;'>On Friday, July 21, 2017 </li>";
                                          box += "<li >";
                                          box += "<a href='#' id='"+data[$i].EVNT_ID +"'  class='show-detail'  >";
                                          box += "<img src='uploads/eventImages/"+ data[$i].picture +"' class='ui-li-thumb'>";
                                          box += "<h2>"+ data[$i].name+"</h2>";
                                          box += "<p>"+  data[$i].start_date+"</p>";
                                          box += "<p class='ui-li-aside'>Free</p>";
                                          box += "</a>";
                                          box += "<a href='#'></a>"
                                          box += "</li>";
                                      }

                                      $("#trending-events-box").append(box).listview("refresh");

                    
                                } else  {
                                          alert('Error While Loading Page Please Refresh Your Browser...');
                                }
                            
                            },
                               error : function(yey, uuu, xxx, yyy) {
                                console.log(data);
                    alert('error Getting Trending Events '+ yey +' '+uuu + '  '+ xxx, +'  '+ yyy);
                  } ,


                        
                        complete: function(jqXHR, status_code){
                            //  alert(status_code +'   '+ jqXHR.responseJSON);  
                         $.mobile.loading("hide"); 
                        }
              }

            );

});  

$(document).on('click', ".show-detail", function(e){

        localStorage.selected_event = $(this).attr('id');
        
        $('body').pagecontainer("change", "#eventsDetail", {transition: "slide"} );
        

});



// Update the contents of the toolbars
$( document ).on( "pagebeforeshow", "[data-role='page']", function() {
    

    var activePage = $.mobile.pageContainer.pagecontainer( "getActivePage" );
    $( "[data-role='header'] a.left-panel-button" ).remove();
    if($(activePage).hasClass('account-setting')){
      $( "[data-role='header']#main-header" ).prepend(ACCOUNT_PANEL_BUTTON);
    } else if($(activePage).hasClass('event-setting')) {
      $( "[data-role='header']#main-header" ).prepend(EVENT_PANEL_BUTTON);
    } else if($(activePage).hasClass('search-button')) {
      $( "[data-role='header']#main-header" ).prepend(SEARCH_BUTTON);
    } else if($(activePage).hasClass('back-button')) {
      
      
      $( "[data-role='header']#main-header" ).prepend(BACK_BUTTON);

    }
    var current = $( activePage ).jqmData( "title" );// Change the heading
    $( "[data-role='header'] h1" ).text( current );
    // Remove active class from nav buttons
    $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
    // Add active class to current nav button
    $( "[data-role='navbar'] a" ).each(function() {
        if ( $( this ).text() === current ) {
            $( this ).addClass( "ui-btn-active" );
        }
    });
});



$(document).on("click", "#event-creation-page-btn", function(e){
  /*
  currentFile = document.location.pathname.match(/[^\/]+$/)[0];
         
        var  Url = 'pages/eventCreationPage.html';
         
         if(currentFile != 'index.html'){
         
          Url = 'eventCreationPage.html';
         
         }
          
          */    


          Url = 'http://eventabis.000webhostapp.com/pages/eventCreationPage.html';
        $.ajax({
                  url: 'logChecker.php',
                  type: 'GET',
                  data:{get: 'is_logged'},
                  dataType: 'json',
                
                 
                  success: function (data, statusText, jqXHR) {

                                if(data.loged === 'true') {
                                  
                                 $( "body").pagecontainer( "change", Url , {transition : 'flip'});
                            
                                } else {
                                    $("body").pagecontainer( "change", "#signUpForm", { transition: "slideup" });
                                }
                         },
                  error: function (request,error, errorMessage) {
                              
                    alert('error checking if loged in '+error+ '  '+ errorMessage);
                              }
              });

                     
                 
});    




function update_navigation_to(value) {

  if(value === "admin") {
     admin_functions = '<li class="admin-panel"> <a href="#events-managment-page"> Manage Events </a> </li> '+
                    '<li class="admin-panel"> <a href="#account-managment">  Manage Account </a>   </li>'+
                    '<li class="admin-panel"><a href="#" id="log-off-button"> Log Out </a></li>';
    
                      $('.normal-panel').remove();
                      if($('.admin-panel').length == 0){
                          $("#menu").append(admin_functions);
                          $("#menu-button").text(localStorage.organizer_name);
                      }
                      $("#menu").listview("refresh");
                      
                   
                      
        


                       localStorage.user = 'admin';
     } else if (value === 'normal') {

          normal_functions = '  <li class="normal-panel" ><a href="#signUpForm" data-rel="dialog"> Sign Up </a></li>'+
                              '<li class="normal-panel" ><a href="#log-in-popup" data-position-to="window" data-rel="popup"> Log in </a></li>';


                      $('.admin-panel').remove();
                      if($('.normal-panel').length == 0){
                          $("#menu").append(normal_functions);
                      }
                         $("#menu").listview("refresh");
                      
                      
                      

                       localStorage.user = 'normal';


     }
  

}

var subscriptionOptions = {
                    
                    url:  'includes/systemController.php', 
                    type: 'POST',
                    resetForm: true,
                    data: '',    
                    dataType: 'JSON',      
                    
                    beforesubmit: function (formData, jqForm, options) { 
                       $.mobile.loading('show');
                    },

                    success:    function (data, statusText, xhr, $form)  { 
                         
                                       $.mobile.loading('hide');
                         
                                       if(statusText === 'success'){
                                            if(data.success === 'true') {
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append('<div class="alert alert-success" > '+data.message + ' </div>');
                                            $("#modal-message").modal("show");
                                                
                                                localStorage.subscriber_id = data.subscriber_id;
                                                $('body').pagecontainer("change", "#subscription-page" );  
                                          }else{
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append('<div class="alert alert-danger" > '+data.message + ' </div>');
                                            $("#modal-message").modal("show");
                                          }
                                       } else if(statusText === 'error'){
                                       
                                                                      
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append(responseText);
                                            $("#modal-message").modal("show");
                                       }
                                            
                        
                    }, 
                    
                
                    

                 };
          $(document).on('click', "#new-subscription-btn", function(){
            
            subscriptionOptions.data =  {form: 'subscriber' , option : 'NEW' };
              localStorage.subscription_option = 'new';
                        
            $("#subscription-mail-form").ajaxForm(subscriptionOptions);

        });
        
        $(document).on('click', "#update-subscription-btn", function(){
        
            subscriptionOptions.data =  {form: 'subscription' , option : 'UPDATE' };
            localStorage.subscription_option = 'update';
            $("#subscription-mail-form").ajaxForm(subscriptionOptions);
        
        });

        $(document).on('click', "#cancel-subscription-btn", function(){
            subscriptionOptions.data =  {form: 'subscription' , option : 'CANCEL' };
            $("#subscription-mail-form").ajaxForm(subscriptionOptions);
        });


$(document).on("popuponcreate", "#subscription-options-popup", function(){

        $("#subscription-mail-form").validate({
                                     messages: { 'subscriber-mail': "Please Provide The Email address you used to register"
                                      
                                    },
                                    errorPlacement: function( error, element ) {
      error.insertAfter( element.parent() );
    }
                                  });
        

});


$(document).on('pagebeforecreate', '#subscription-page', function(){



            if(localStorage.subscription_option === 'update'){

                $.ajax({
                          url: 'includes/systemController.php',
                          data: {get: 'subscription', subscriber_id: localStorage.subscriber_id },
                          dataType: 'JSON',
                          cache: false,
                          type: 'GET',
                          success: function(data, result, jqxhr){

                          }
                });

                formOptions.data = {form: 'update_subscription', subscriber_id : localStorage.subscriber_id };
            $("#subscription-form").ajaxForm(formOptions);
            }

            if(localStorage.subscription_option === 'new'){
              alert('new')
            formOptions.data = {form: 'new_subscription', subscriber_id : localStorage.subscriber_id };
            $("#subscription-form").ajaxForm({
                    
                    url:  'includes/systemController.php', 
                    type: 'POST',
                    resetForm: true,
                    data: {form: 'new_subscription', subscriber_id : localStorage.subscriber_id },    
                    
                    
                    beforesubmit: function (formData, jqForm, options) { 
                       $.mobile.loading('show');
                    },

                    success:    function (data, statusText, xhr, $form)  { 
                         
                                       $.mobile.loading('hide');
                         
                                       if(statusText === 'success'){
                                            $("#message-body").empty();
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append('<div class="alert alert-success" > '+data + ' </div>');
                                            $("#modal-message").modal("show");
                                                 
                                          
                                          
                                          
                                       } else if(statusText === 'error'){
                                       
                                                                      
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append(data);
                                            $("#modal-message").modal("show");
                                       }
                                            
                        
                    }, 
                    
                
                    

                 });
            }
});



$(document).on("pagecontainerbeforecreate", function(event, data){ // When entering pagetwo
 $( "[data-role='navbar']" ).navbar();
         $("[data-role=header]").toolbar({theme: 'd'});
         $("[data-role=footer]").toolbar({theme:'d'});
        
        $('#event-categ-panel, #menu-panel,  #account-managment-panel,  #event-managment-panel').enhanceWithin().panel();
    $("#subscription-options-popup").enhanceWithin();  
    //currentFile = document.location.pathname.match(/[^\/]+$/)[0];
    $("#subscription-options-popup").popup();
    $('#log-in-popup').popup();

          $("#log-in-form").enhanceWithin();
        

     /*
     if(currentFile != 'index.html'){
      myUrl = '../includes/systemController.php';
     }
     */
$(function($) {

       $.ajax({
                  url: 'logChecker.php',
                  type: 'GET',
                  data: {get: 'is_logged'},
                  dataType: 'json',
                                 
                  success: function (data, statusText, jqXHR) {

                                if(data.loged === 'true') {
                                  localStorage.organizer_id = data.organizer_id;
                                  localStorage.organizer_name = data.organizer_name;
                                  
                                     update_navigation_to('admin');
                            
                              } else {
                                localStorage.organizer_id = null;
                                  update_navigation_to('normal');
                              }
                         },
                          error : function(yey, uuu, xxx, yyy) {
                    alert('error Getting Log Detail'+ yey +' '+uuu + '  '+ xxx, +'  '+ yyy);
                  }
                 
              });
});

               

});


$(document).on("popuponcreate", "#log-in-popup", function(){

        $("#log-in-form").validate({
                                     messages: { 'log-in-mail': "Please Provide The Email address you used to register",
                                      'log-in-password': "Please Provide the password you used when you register"
                                    },
                                    errorPlacement: function( error, element ) {
      error.insertAfter( element.parent() );
    }
                                  });


});


$(function($) {



          $("#log-in-form").ajaxForm({
                                        url: 'includes/systemController.php',
                                        type: 'POST',
                                        data: {form : "log_in" },
                                        dataType: 'json',
                                        
                                         beforesubmit: function showRequest(formData, jqForm, options) { 
                                                                      $.mobile.loading('show');
                                            
                                            },
                                        success:    function showResponse(response, statusText, xhr)  { 
                                              $.mobile.loading("hide");        
                                                      if(response.success =='true') {
                                                        $("#menu-panel").panel("close");
                                                          $("#log-in-modal").modal("hide");
                                                        update_navigation_to('admin');
                                                        localStorage.organizer_id = response.organizer_id;
                                                        localStorage.organizer_name = response.organizer_name;
                                                        $("#menu-button").text(response.organizer_name);
                                                        $( "body").pagecontainer( "change", "#homePage", { transition: "slide" });
                                                      } else {
                                                        $("#log-in-error").html("<h2>User Name or Password Incorrect Please try again</h2>");
                                                      }
                                                
                                        },
                                           error : function(yey, uuu, xxx, yyy) {
                    alert('error Login User '+ yey +' '+uuu + '  '+ xxx, +'  '+ yyy);
                  } 
                                  });

  });



$(document).on("pagecreate","#eventsDetail", function() {
        
         $("#share-buttons").sharepage();

          $('#comment-form').validate({
                                messages : {
                                  'commenter-name': "Please Enter Your Name ",
                                  'comment-content': "You should write Something  Minmum 20 characters"
                                }
                            });
         

         $('#comment-form').ajaxForm({
                                    url: 'includes/systemController.php',
                                    type: 'POST',
                                    data: {form: "comment", event_id: localStorage.selected_event},

                                    beforesubmit: function (formData, jqForm, options) { 
                                       $.mobile.loading('show');
                                    },
                            
                                   success:    function (responseText, statusText, xhr, $form)  { 
                                         $.mobile.loading('hide');
                                         if(statusText = 'success'){
                                             $("#comments-container").prepend(responseText).listview("refresh"); 
                                          } else {
                                                
                                          }
                                    },
                                     error : function(yey, uuu, xxx, yyy) {
                    alert('error processing Comment '+ yey +' '+uuu + '  '+ xxx, +'  '+ yyy);
                  } 

                            });

});




$(document).on("click", '.eventCategory', function(){
        
        request =   $(this).attr('id');
              var activePage = $.mobile.pageContainer.pagecontainer( "getActivePage" );
             
              page = activePage.attr('id');



$('body').pageContainer("change", "#eventsList");

          
var total_events = 0;
$("#event-container").empty();
              $.ajax({
                        url: 'includes/systemController.php',
                        type: 'GET',
                        dataType: 'json',
                        cache: false,
                        ifModifid: true,
                        data: {get: 'event_category', category: request },
                        success : function(data, result, jqXHR){
                              $("#event-container").empty();
                                  if(data != null) {
                                      for($i = 0 ; $i < data.event.length ; $i++ ){
                                         // box += "<li data-role='list-divider' style='display:none;'>On Friday, July 21, 2017 </li>";
                                          box += "<li >";
                                          box += "<a href='#' id='"+data.event[$i].EVNT_ID +"'  class='show-detail'  >";
                                          box += "<img src='uploads/eventImages/"+ data.event[$i].picture +"' class='ui-li-thumb'>";
                                          box += "<h2>"+ data.event[$i].name+"</h2>";
                                          box += "<p>"+  data.event[$i].start_datetime+"</p>";
                                          box += "<p class='ui-li-aside'>Free</p>";
                                          box += "</a>";
                                          box += "<a href='#'></a>"
                                          box += "</li>";
                                          total_events = i
                                      }
                                   

                                      
                                      $("#event-container").append(box).listview("refresh");

                                  } else {
                                          $("#browse-event-container").empty();
                                          $("#browse-event-container").append('<h2 class="alert alert-info" > Currently No Active Event Under This Category </h2> ');                                    
                                  } 
                        },
                        error : function(yey, uuu, xxx, yyy) {
                    alert('error getting Events Detail'+ yey +' '+uuu + '  '+ xxx, +'  '+ yyy);
                  }
              });
      
});



$(document).on('pagebeforeshow', '#eventsDetail', function(e, data){     
    
              
      
          $.ajax({
                  url: 'includes/systemController.php',
                  type : 'GET',
                  dataType: 'json',
                
                
                  data: {get: 'event_detail', event_id : localStorage.selected_event},                  
                  beforeSend: function() {
                                      //Show ajax spinner
                                        $.mobile.loading("show"); 
                                      },
                          
                          complete: function() {
                                      // hide ajax spinner
                                      $.mobile.loading("hide"); 
                                    },

                  success: getEventDetails,

                  error : function() {
                    alert('error getting Events Detail');
                  }
          });

         
   
});


function display_tickets(data, statusText, jqXHR){

  
      tikets = '';
        $('#order-container').empty();      
        for(i = 0 ; i < data.ticket.length; i++) {
       
          tikets += '   <tr>';
          tikets +=        '<td>  <label class="label label-success">'+data.ticket[i].type+' </label> </td>';
          tikets +=                '<td> <div > '+data.ticket[i].name+' </div> </td>';
          tikets +=                '<td> <div > '+data.ticket[i].discription+' </div> </td>';
          tikets +=                '<td> <label class="label label-success">'+data.ticket[i].available+' </label> </td>';
          tikets +=                '<td> <label class="label label-info">'+data.ticket[i].price+' </label> </td>';
          if(data.ticket[i].available != 0 ) {
          tikets +=                '<td>';
          tikets +=                    '<input type="number" pattern="[0-9]*" min="0" max="'+data.ticket[i].available+'" data-clear-btn="true" ';
          tikets +=                    ' class="ui-mini order-quantity" disabled="disabled" required   name="orderQuantity[]"  placeholder="Amount?..." >  ';
          tikets +=                '</td>';
          tikets +=                '<td> <input type="checkbox" value="'+data.ticket[i].TIK_ID+'" required class="selected-ticket" data-on-text="Get" data-off-text="OFF" data-role="flipswitch"  name="ticket-id[]"> </td>';
          tikets +=            '</tr>';
          } else {
            tikets +=                '<td colspan="2"> <h4 class="label label-info"> SOLD OUT </h4> </td> </tr>';
          }
        }

        $('#order-container').append(tikets);
        $('#ticket-list').enhanceWithin();   
           $('#ticket-list').table('refresh');
}

$(document).on("change", ".selected-ticket", function(){

    
    if(this.checked == true){
      input = $(this).closest('tr').find(".order-quantity");
      $(input).textinput('enable');

    }else {
      
      input.textinput('disable');
    }

});

$(document).on("pagebeforeshow", "#ticket-order-page", function(){


      var payment = $("#has-mobile-payment");
    // newsletter topics are optional, hide at first
            $("#att-subscription").selectmenu("disable");     
          payment.click(function(e) {
        
           if(this.checked == true){
            
               $("#att-subscription").selectmenu("enable");
           } else {
                $("#att-subscription").selectmenu("disable");
           }
       

});
            $("#ticket-order-form").validate({
                                          rules : {
                                               'att-subscription' : {
                                                        required : '#has-mobile-payment:checked'
                                                },
                                                orderQuantity : {
                                                      required : "#ticket-id:checked"
                                                }
                                          },

                                          messages :{
                                            'ticket-id': "you need to select ticket",
                                            'att-first-name': "Please Provide your first name",
                                            'att-last-name': "Please Provide your last name",
                                            'att-telephone': "Please Provide mobile number containing 10-13 Digits to finish booking"
                                          },

                                    errorPlacement: function( error, element ) {
                                          error.insertAfter( element.parent() );
                                     }


                                    });

            
                
            $("#ticket-order-form").ajaxForm({
                    
                    url:  'includes/systemController.php', 
                    type: 'POST',
                    resetForm: true,
                    target: "#order-result",
                    data: { form: 'order_form' ,event_id: localStorage.selected_event },          
                    
                    beforesubmit: function (formData, jqForm, options) { 
                      
                       $.mobile.loading('show');
                    },

                    success:    function (responseText, statusText, xhr, $form)  { 
                         
                                       $.mobile.loading('hide');
                                        console.log(responseText);

                                       if(statusText === 'success'){


                                       
                                            
                                            $("#order-result").fadeIn('slow', 1000);
                                              
                                            

                                       } else if(statusText === 'error'){
                                       
                                                                      
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append(responseText);
                                            $("#modal-message").modal("show");
                                       }
                        
                    }, 
                    
                    uploadProgress: function(event, position, total, persentage){ } 
                    

                 });


});



$(document).on("pagebeforeshow", "#ticket-order-page", function(){

      if(localStorage.selected_event === null){
        alert('sorry some error occured please try Again!!!');
      } else {
                  $.ajax({
                            url: 'includes/systemController.php',
                            type: 'post',
                            dataType: 'json',
                            data: {get: "available_tickets", event_id : localStorage.selected_event },
                            success: display_tickets
                  });


              
          


      }

       
});

function create_reciept(data){

            console.log(data);
var reciept = '';

      for(i=0; i < data.reciepts.length ; i++){
              reciept += '<li> ';
              if(!data.reciepts[i].picture) {
                reciept += '<img src="uploads/eventImages/'+data.reciepts[i].picture+'" > ';
              } else {
                reciept += '<img src="img/placeholder.jpg" > ';
              }

              reciept += '<h3> Event : '+data.reciepts[i].event_name+'</h3>';
              reciept += '<h4> Event : '+data.reciepts[i].event_venue+' </h4>';
              reciept += '<p> Start Date : '+data.reciepts[i].start_date+'    Time :  '+data.reciepts[i].start_time+' </p>';
              reciept += '<p> End Date : '+data.reciepts[i].end_date+'    Time :  '+data.reciepts[i].end_time+' </p>';
              reciept += '<span class="ui-li-aside"> <strong> RECIEPT_No : </strong> '+data.reciepts[i].RECIEPT_ID+'</span>';
              reciept += '</li>';
              } 

          $("#ticket-container").empty();
          $("#ticket-container").append(reciept);
          $("#ticket-container").listview('refresh');

          
          
}

$(document).on('click', ".complete-order-btn", function(){

  
          localStorage.reservation_ID =   $(this).attr('id');


            $('body').pagecontainer("change", "#order-completion-page" );



            
});




$(document).on('click', "#download-pdf", function(){

        
          
          $.ajax({
                              url: 'includes/systemController.php',
                              data : {get: 'download_pdf', reservation_ID: localStorage.reservation_ID },
                              type: 'GET',
                              dataType: 'JSON',

                              success: function(data, statusText, jqxhr) {
                                    $("#reservation-form").hide();
                                    
                                        $.mobile.loading('hide');
                              }
                    });

            



            
});

$(document).on('pagebeforeshow', "#order-completion-page", function(){
    
        $("#reciept-actions").hide();

                    if(localStorage.reservation_ID) {
                    $("#reservation-id-input").val(localStorage.reservation_ID);
                 


                    $.ajax({
                              url: 'includes/systemController.php',
                              data : {get: 'attendee_tickets', reservation_ID: localStorage.reservation_ID },
                              type: 'GET',
                              dataType: 'JSON',
                              cache: false,

                              success: function(data, statusText, jqxhr) {
                                    $("#reservation-form").hide();
                                    
                                    if(data.success === 'true'){
                                      create_reciept(data);
                                      
                                    }
                                        
                              }
                    });

                    }else{
                      $("#reservation-form").show();
                    }

          $("#booking-confirmation-form").ajaxForm({
                    
                    url:  'includes/systemController.php', 
                    type: 'POST',
                    resetForm: false,
                    data: '',          
                    
                    beforesubmit: function (formData, jqForm, options) { 
                       $.mobile.loading('show');
                    },

                    success:    function (data, statusText, xhr, $form)  { 
                         
                                       $.mobile.loading('hide');
                         
                                       if(data.success === 'true'){
                                       create_reciept(data);
                                              
                                       
                                       } else if(data.success === 'false'){
                                       
                                                                      
                                            $("#message-title").append('<h5 class="alert alert-danger"> Upload Completed </h5>');
                                            $("#message-body").append(data.message);
                                            $("#modal-message").modal("show");
                                       }
                        
                    }, 
                    
                    uploadProgress: function(event, position, total, persentage){ } 
                    

                 });
});


 function updateControls(addressComponents) {
                  //$('#event-sub-city').val(addressComponents.addressLine1);
                  $('#event-city').val(addressComponents.city);
                  //$('#event-location').val(addressComponents.stateOrProvince);
                  //$('#event-common-name').val(addressComponents.postalCode);
                  $('#event-country').val(addressComponents.country);
              }


$( document ).on( "pagecreate", function() {
   
});
$(document).on("pagebeforecreate", "#contact-organizer-page", function() {

       
              $("#contact-organizer-form").validate({
                                                        messages: {
                                                          'contact-org-firstname' : "Please Provide Your First Name",
                                                          'contact-org-lastname' : "Please Provide Your Last Name",
                                                          'contact-org-email' : "Please Provide a Valid email like example@something.com",
                                                          'contact-org-subject': "please provide Subject of Message",
                                                          'contact-org-message': 'You need to write something before you can send the message'
                                                        }
                                                    });

              formOptions.data = {form: 'contact_organizer', event_id: localStorage.selected_event };
                $("#contact-organizer-form").ajaxForm(formOptions);

});

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;
 
    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }
 
    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};


$( document ).on( "pagecreate", function() {
    $( "#event-create-map" )
        .attr( "width", 0 )
        .attr( "height", 0 );
 
    $( "#event-map-popup" ).on({
        popupbeforeposition: function() {
          $('#event-create-map').locationpicker('autosize');

            var size = scale( 400, 200, 15, 1 ),
                w = size.width,
                h = size.height;
 
            $( "#event-create-map" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#event-create-map" )
                .attr( "width", 0 )
                .attr( "height", 0 );
        }
    });



     $( ".map-pop-up" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( "#event-create-map" ).css( "max-height", maxHeight );
        }
    });
});

$(document).on("pagecreate","#event-creation-page", function(event) {

/*
      $('#event-create-map').locationpicker({
                                                location: {latitude: 9.005401  , longitude:   38.763611},
                                                enableAutocomplete: true,
                                                inputBinding: {
                                               latitudeInput :$("#event-latitude"),
                                               longitudeInput : $("#event-longitude")
                                             },
                                             radius : 10,
                                              onchanged: function(currentLocation, radius, isMarkerDropped) {
                                              //  alert("Location changed. New location (" + currentLocation.latitude + ", " + 
                                              // currentLocation.longitude +", "+ currentLocation.locationNameInput +" )");
                                              },
                                              oninitialized: function(component){
                                                   var addressComponents = $(component).locationpicker('map').location.addressComponents;
                                                           $('#event-city').val(addressComponents.city);
                                                           $('#event-country').val(addressComponents.country);
                                              }
                                          });

    
*/
    $.ajax({
                  url: '../includes/systemController.php',
                  type: 'GET',
                  data: {get: 'is_logged'},
                  dataType: 'JSON',
                                 
                  success: function (data, statusText, jqXHR) {

                                if(data.loged !== 'true') {
                                    $.mobile.pagecontainer("change", "#signUpForm");
                            
                              } else {
                                        $.mobile.pagecontainer("change", "pages/eventCreationPage.html");    
                              }
                         },
                
              });




});

  function readURL(input) {
        
               
        if (input.files && input.files[0]) {
 
            var reader = new FileReader();
            
            reader.onload = function (e) {
            
                $('#event-image-placeholder').attr('src', e.target.result);
            
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }


$(document).on("pagebeforeshow","#event-creation-page", function() {


    $('#event-image-upload-btn').click(function(){
   
        $("#event-image").click();
    });


    $("#event-image").change(function(){
        readURL(this);
    });
       
        
        
          
      

            $('#event-creation-form').validate({
                                          messages : {
                                                'ticket-type': 'Please Specify The Ticket Type',
                                                'ticket-price': 'Please Specify The Ticket Price',
                                                'ticket-quantity': 'Please Specify the amount of ticket available for sale',
                                                'ticket-discription': 'Please say something about the ticket like its purpose and what it can do',
                                                'ticket-sales-start-date': 'Please Specify When the ticket should be available for sale',
                                                'ticket-sales-end-date': 'Please Specify Till when the ticket will be Available',
                                                'event-start-date': "You Need to specify when the day your event starts",
                                                'event-end-date': "You Need to specify when the day your event ends",
                                                'event-start-time': "You Need to specify when the time your event starts",
                                                'event-end-time': "You Need to specify when the time your event end",
                                                'event-title': "Please specify name of event",
                                              'venue-name': "Please enter Venue name Where the event is hold",
                                              'event-common-name' : "Please Specify Common Name of the event location",
                                              'event-city' : 'Pleace Provide City of the Event',
                                              'event-country': 'Please Specify The  Country',
                                              'event-type': 'Please Specify The  Type like Music, art, etc...',
                                              'event-discription' : 'Please Say Something about the event so that viewers know what its about',

                                              'guest-first-name': "Please Provide First Name of the Guest",
                                                'guest-Last-name': "Please Provide Last Name of the Guest",
                                                 'sponsor-name' : "Please Provide Name Of this Sponsor or Remove this Row "
                                              }
                                          });

            $("#event-creation-post").click(function(){
              formOptions.data = {form: 'new_event', organizer_id: localStorage.organizer_id, option: 'ACTIVE' };
            $("#event-creation-form").ajaxForm(formOptions);  
            });


            $("#event-creation-draft").click(function(){
              formOptions.data = {form: 'new_event', organizer_id: localStorage.organizer_id, option: 'DRAFT' };
            $("#event-creation-form").ajaxForm(formOptions);  
            })


            

              


  
    

         

                      $('.date_input').datetimepicker(dateOptions);                

                      $('.time_input').datetimepicker(timeOptions);                

                      $('.date_input').datetimepicker(dateOptions);




 });



$(document).on("click", ".addticket", function(){
       
       
         $("#ticket-box").append(new_ticket_slot(total_ticket));
         $("#ticket-creator").enhanceWithin();
         table = $("#ticket-box").closest('table');
            table.table('refresh');           
                         
                                                    
});



$(document).on("pagebeforeshow", "#event-dashboard", function(){


                        $.ajax({
                            url : "../includes/systemController.php",
                            dataType: 'JSON',
                            data: {get: 'event_statstics', organizer_id: localStorage.organizer_id, event_id : localStorage.selected_event},
                            cache: false,
                            type: 'GET',

                            success: function(data, statusText, jqXHR){
                                ticketStatus = '';                                          
                                          for(i = 0; i < data.ticket.length; i++){
                                            ticketStatus = '<div class="progress">';
      ticketStatus +=   '<div class="progress-bar progress-bar-warning" role="progressbar" ';
      ticketStatus +=    'aria-valuenow="60" aria-valuemin="0" aria-valuemax="'+data.ticket[i].quantity+'" style="width: '+ (data.ticket[i].quantity - data.ticket[i].available) +'%;" >';
      ticketStatus +=     '<span >'+ ((data.ticket[i].available / data.ticket[i].quantity) * 100) +'%sold </span>';
      ticketStatus += '</div>';
      ticketStatus +=  '</div>';

                                          }
                                          alert(data.booked.length);
                                          for(i=0; i < data.booked.length ; i++){

                                              full_name = data.booked[i].first_name+' '+data.booked[i].last_name;
                                              total = 0;
                                              alert(data.booked[i]);

                                              for(j = 0 ; j < data.booked[i].length; j++){
                                                total += data.booked[i].quantity;
                                              }


                                          }          
                                     
                                           $("#ticket-stat").empty();
                                          $("#ticket-stat").append(ticketStatus);            
                            },

                            error: function(error, xxx, yyy, zzz){
                              alert('error  '+ error +'  '+xxx+'  '+ yyy+ '  '+ '  '+zzz);
                            }

                        });


      




});

function check_in(data){
  bookings = '<li data-filtertext="'+data.RECIEPT_ID+'">';


bookings +='<h4> RECIEPT ID : '+data.RECIEPT_ID +' </h4>';
bookings +='<p class="ui-li-aside"> Checked In : '+data.first_check_in +' <br>';
bookings +='last Checked In : '+data.last_check_in +' </p>';
 if(data.status == 1 ){
bookings +=    '<input type="checkbox" checked="checked" data-role="flipswitch" name="check-ins-flipswitch" id="'+data.RECIEPT_ID+'"   data-on-text="IN" data-off-text="OUT" class="check-ins-flipswitch" >';
} else {
 bookings +=    '<input type="checkbox"  data-role="flipswitch" name="check-ins-flipswitch" id="'+data.RECIEPT_ID+'"   data-on-text="IN" data-off-text="OUT" class="check-ins-flipswitch" >'; 
}

bookings += '</li>';

 
              $("#check-ins").prepend(bookings);

                $("#check-ins").enhanceWithin();
                $("#check-ins").listview('refresh');

                                   
}

$( document ).on( "change", ".check-ins-flipswitch",  function( event, ui ) {

  var ID = null;
         var act = null;
         
          if($(this).prop("checked") == false){
            act = 'check_out';
          } else {
            act = 'check_in';
          }
   
 ID = $(this).attr('id');

          $.ajax({
                    url: '../includes/systemController.php',
                    data: {get: 'manage_check_in', request: act, organizer_id: localStorage.organizer_id, check_id: ID },
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    success: function(data, statusText, jqxhr){
         
              
                    },
                     error: function(error, xxx, yyy, zzz){
                              alert('error  '+ error +'  '+xxx+'  '+ yyy+ '  '+ '  '+zzz);
                            }
          });


} );


$(document).on("pagebeforeshow" , "#check-in-page", function(){


                    $.ajax({
                            url: '../includes/systemController.php',
                            type: 'GET',
                            data: {get: 'check_ins' , organizer_id: localStorage.organizer_id , event_id: localStorage.selected_event },
                            dataType: 'json',
                            cache:false,

                    
                            success: function(data, statusText, jqxhr){
                              
                                $("#check-ins").empty();
                              for(i=0;i < data.length; i++){
                                check_in(data[i]);

                              }
                        
                                
                              
                       
                           

                            }, 
                            error: function(error, xxx,yyy,zzz){
                              alert(error +' ' +yyy);
                            }


                    });



          $("#attendee-check-in").ajaxForm({
                    
                    url:  '../includes/systemController.php', 
                    type: 'GET',
           
                    dataType: 'JSON',
                    resetForm: false,
                    cache:false,
                    data: {get: 'validate_reciept', organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event },          
                    
                    beforesubmit: function (formData, jqForm, options) { 
                       $.mobile.loading('show');
                    },

                    success:    function (data, statusText, xhr, $form)  { 
                         
                                       $.mobile.loading('hide');
           
                                       if(data.success === 'true'){
                                                                    
                                         check_in(data.check_in);
                                                                  
                                       }

                                       $("#check-in-result").append(data.message);
                                               $(".validated-result").fadeOut(5000 , function(){
                               
                                      });
                        
                    }, 
                    
                    uploadProgress: function(event, position, total, persentage){ } 
                    

                 });

});
$(document).on("pagecreate" , "#events-managment-page", function(){
        
              
  var active_event = '';
  var ended_event = '';
  var draft_event = '' ;
                $.ajax({
                          url: 'includes/systemController.php',
                          data: {get: 'organizer_events', organizer_id : localStorage.organizer_id },
                          dataType: 'JSON',
                          type: 'GET',

                          success: function(data, result, jqXHR){
                           
                                if(result == 'success'){

                                      if(data.ACTIVE){
                                  for( i = 0; i < data.ACTIVE.length ; i++) {
                                  
                               
                                 active_event += '<li data-role="list-divider">On '+data.ACTIVE[i].start_date +' '+
                                                  '<li> <a href="#manage-event-page" class="update_event" id="'+ data.ACTIVE[i].EVNT_ID +'" >'+
                                                   '<img src="'+POSTER_LOCATION+''+data.ACTIVE[i].picture +'" alt="image Not Found" />'+
                                                   '<h4>'+data.ACTIVE[i].name+'</h4>'+
                                  
                                    
                                      
                                  '</a> '+
                                  '<a href="#" data-toggle="modal"     data-target="#myModal" class="delete_event" id="'+data.ACTIVE[i].EVNT_ID+'" data-theme="e" data-icon="delete">Delete</a> '+
                              '</li> </li>';
  

                                }
                              }
                                if(data.DRAFT){
                                for( i = 0; i < data.DRAFT.length ; i++) {
                                  
                               
                                  draft_event += '<li data-role="list-divider">On '+data.DRAFT[i].start_date +' '+
                                                  '<li> <a href="#manage-event-page" class="update_event" id="'+ data.DRAFT[i].EVNT_ID +'" >'+
                                                   '<img src="'+POSTER_LOCATION+''+data.DRAFT[i].picture +'" alt="image Not Found" />'+
                                                   '<h4>'+data.DRAFT[i].name+'</h4>'+
                                  
                                    
                                      
                                  '</a> '+
                                  '<a href="#" class="delete_event" id="'+data.DRAFT[i].EVNT_ID+'" data-theme="e" data-icon="delete">Delete</a> '+
                              '</li> </li>';
  

                                }
                              }
                              if(data.ENDED){
                                for( i = 0; i < data.ENDED.length ; i++) {
                                  
                               
                                  ended_event += '<li data-role="list-divider">On '+data.ENDED[i].end_date +' '+
                                                  '<li> <a href="#manage-event-page" class="update_event" id="'+ data.ENDED[i].EVNT_ID +'" >'+
                                                   '<img src="'+POSTER_LOCATION+''+data.ENDED[i].picture +'" alt="image Not Found" />'+
                                                   '<h4>'+data.ENDED[i].name+'</h4>'+
                                  
                                    
                                      
                                  '</a> '+
                                  '<a href="#" class="delete_event" id="'+data.ENDED[i].EVNT_ID+'" data-theme="e" data-icon="delete">Delete</a> '+
                              '</li> </li>';
  

                                }
                       }

                           

                                $('#active-events').append(active_event).listview('refresh').tabs();
                                $('#draft-events').append(draft_event).listview('refresh').tabs();
                                $('#ended-events').append(ended_event).listview('refresh').tabs();

                              
                            }
                          }, 

                          error: function(data, result, jqxhr){
                            alert(jqxhr);
                          }
                });
  $("#evente-managment-tab  li:eq(0) a").tab("show");
  });



$(document).on("pagebeforeshow", "#social-setting-page", function(){


            $.ajax({
                      url: '../includes/systemController.php',
                      data: {get: 'social_addresses', organizer_id: localStorage.organizer_id },
                      type : 'GET', 
                      dataType: 'JSON',
                      success : function(data, resultText, jqxhr ) {
                            if(data.twitter) {
                              alert(data.twitter);
                              $("#twitter-address").val(data.twitter);
                            }

                            if(data.facebook) {
                              $("#facebook-address").val(data.facebook);
                            }

                            if(data.youtube) {
                              $("#youtube-address").val(data.youtube);
                            }


                      }
            })
            
  formOptions.data = { form: 'update_social_media' , organizer_id: localStorage.organizer_id} ;
    $('#social-setting-form').ajaxForm(formOptions);
});


$(document).on("pagebeforeshow", "#update-contact-info", function(){

                  $('#organizer-pic-upload-btn').click(function(){
                     
                          $("#organizer-profile-pic").click();
                      });        

                      
                      $("#organizer-profile-pic").change(function(event){

                                  var inp = event.target;

                      var reader = new FileReader();
                     
                        reader.onload = function(){
                    
                            var dataURL = reader.result;
                            
                               
                            $("#profile-pic-placeholder").attr('src', dataURL);
                             
                      };
                      reader.readAsDataURL(inp.files[0]);
                   
                         
                      });

                                $("#UP-organizer-first-name").val('');
                                 $("#UP-organizer-last-name").val('');
                                 $("#edit-birthday").val('');
                                 
                                 
                                 $("#organizer-bio").val('');
                                 $("#organizer-position").val('');
          
          $.ajax({
                url: '../includes/systemController.php',
                data: {get: 'organizer_info', organizer_id : localStorage.organizer_id },
                dataType: 'JSON',
                type:'GET',
                success: function(data, result, jqxhr){
                        
                            if(result === 'success') {
                        console.log(data);
                            if(data){
                                
                                 $("#UP-organizer-first-name").val(data.first_name);
                                 $("#UP-organizer-last-name").val(data.last_name);
                                 $("#edit-birthday").val(data.registered_on);
                                 gender = $("input:radio[name=up-organizer-gender]").val('male');
                                 gender.prop('checked', true).checkboxradio('refresh');
                                 $("#organizer-bio").val(data.bio);
                                 $("#organizer-position").val(data.position);
                                 if(data.picture){
                                 $("#profile-pic-placeholder").attr('src','../uploads/organizerImages/'+data.picture);
                               }
                             
                           } else {
                            alert('some problem occured fetching your mail try again');
                           }
                   }

                }       

          });

          $('#basic_info_update_form').validate({
            messages: {
              "#UP-organizer-last-name": "Last Name Is Required Please Fill this Field",
              "#UP-organizer-first-name": "First Name Is Required Please Fill this Field"
            }
          })
        $('.date_input').datetimepicker(dateOptions);


        formOptions.data = { form: 'contact_info_update' , organizer_id: localStorage.organizer_id };
        $('#basic_info_update_form').ajaxForm(formOptions);


});

$(document).on("pagebeforeshow", "#mail-change-page", function(){

      

      $.ajax({
            url: '../includes/systemController.php',
            data: {get: 'organizer_mail' },
            dataType: 'JSON',
            type:'GET',
            success: function(data, result, jqxhr){
                
                    if(result === 'success') {
                     console.log(data);
                      if(data){
                        
                              $("#current-address").text(data);
                       } else {
                            alert('some problem occured fetching your mail try again');
                      }
                    }

            }
       
      });


      formOptions.data = { form: 'mail_change' , organizer_id: localStorage.organizer_id }; 
      
      $('#email-change-form').ajaxForm(formOptions);


});


$(document).on("pagebeforeshow", "#password-change-page", function(){



    formOptions.data = { form: 'password_change' , organizer_id: localStorage.organizer_id };

      $("#password-setting-form").ajaxForm(formOptions);

      $("#password-setting-form").validate({
                                      messages :{
                                              "current-password" : 'Please Provide your Current Password',
                                              "new-password" : 'Please Provide your new Password',
                                              "new-password-retype" : 'Passwords Given Do not Math '
                                            },
                                            rules :{
                                              "new-password-retype" : {
                                                required: true,
                                                equalTo : "#new-password"
                                              } 
                                            }
                                          });


});

$(document).on("pagebeforeshow", "#billing-address-setting-page", function(){

    


    formOptions.data = { form: 'billing_address_update' , organizer_id : localStorage.organizer_id };
    $('#billing-address-setting-form').ajaxForm(formOptions);


});


$(document).on("pagebeforeshow", "#organization-info-setting-page", function(){


                $("#organization-name").val('');
                $("#organization-website").val('');
                $("#organization-info").val('');
                $("#organization-office-number").val('');
                $("#organization-mobile-number").val('');
                $("#organization-post-no").val('');
                

                $('#organization-logo-upload-btn').click(function(){
             
                  $("#organization-logo").click();
              });        

              
              $("#organization-logo").change(function(event){

                          var inp = event.target;

              var reader = new FileReader();
             
                reader.onload = function(){
            
                    var dataURL = reader.result;
                    
                       
                    $("#logo-placeholder").attr('src', dataURL);
                     
              };
              reader.readAsDataURL(inp.files[0]);
           
                 
              });

                                    
                  $.ajax({
                      url: '../includes/systemController.php',
                      data: {get: 'organizer_info', organizer_id: localStorage.organizer_id },
                      dataType: 'JSON',
                      type:'GET',
                      success: function(data, result, jqxhr){
                          
                              if(result === 'success') {
                               console.log(data);
                                if(data){
                                  if(data.logo){
                                      $("#logo-placeholder").attr('src','../uploads/Organizations/'+data.logo);
                                    }


                                    
                                     $("#organization-name").val(data.name);
                                     $("#organization-website").val(data.website);
                                     $("#organization-info").val(data.info);
                                     $("#organization-office-number").val(data.office_num);
                                     $("#organization-mobile-number").val(data.mobile_num);
                                     $("#organization-post-no").val(data.po_num);
                                        
                                 } else {
                                      alert('some problem occured fetching your mail try again');
                                }
                              }

                      }
                 
                });


 
              $("#organization-info-setting-form").validate({
                                                              messages: {
                                                                    "#organization-website" : "Your website should be given in the valid format like http://www.something.com ",
                                                                    "#organization-mobile-number" : "Please Provide a valid number beween 10 and 12 digits ",
                                                                    "#organization-office-number" : "Please Provide a valid number beween 10 and 12 digits "
                                                              }

                                                            });
            
              formOptions.data = { form: 'organization_info_change', organizer_id: localStorage.organizer_id },
              
              $('#organization-info-setting-form').ajaxForm(formOptions);


});


var eventLocation = {
                      location:  {latitude: 9.005401  , longitude:   38.763611},
                      enableAutocomplete: true,
       inputBinding: {
                      
                      latitudeInput: $('#event-latitude-update'),
                      longitudeInput: $('#event-longitude-update')
                      
                  },
                   radius: 10,
                onchanged: function(currentLocation, radius, isMarkerDropped) {
                  var addressComponents = $(this).locationpicker('map').location.addressComponents;
                       $('#event-city-update').val(addressComponents.city);
                       $('#event-country-update').val(addressComponents.country);
          
                    //  alert("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude +", "+ currentLocation.locationNameInput +" )");
                  },
                oninitialized: function (component) {
                      
                    var addressComponents = $(component).locationpicker('map').location.addressComponents;
                     
          

                    }
              };
         
  $(document).on("pagebeforeshow", "#event-basics-update-page", function(){

                  $.ajax({
                            url: '../includes/systemController.php',
                            data: {get: "event_basics", event_id: localStorage.selected_event },
                            type:'GET',
                            dataType: 'json',
                            cache: false,

                            success : function(data, result, jqXHR){
                             
                                  if(result === 'success') {
                                    
                                      if(data.picture){
                                        $("#event-image-placeholder").attr('src', '../uploads/eventImages/'+ data.picture);
                                      }
                                    $('#event-title-update').val(data.name);
                                    $('#venue-name-update').val(data.venue);
                                    $('#event-discription-update').val(data.discription);
                                    $('#event-country-update').val(data.country);
                                    $('#event-city-update').val(data.city);
                                    $('#event-sub-city-update').val(data.sub_city);
                                    $('#event-common-name-update').val(data.common_name);
                                    $('#event-update-map').locationpicker(eventLocation);
                                    
                                    
                                    //  $("#upload-placeholder").attr('src', '"../'+POSTER_LOCATION+''+data.picture+'"');
                             }

                            } ,
                             error: function(data, result, jqxhr){
                            alert(jqxhr);
                          }
                  });

           
                    
                 
          

                    


             $('#event-image-update-btn').click(function(){
        // Simulate a click on the file input button
        // to show the file browser dialog
        $("#event-image-update").click();
    });

 $("#event-image-update").change(function(){
        readURL(this);
    });
            $("#event-basics-update-form").validate({

                                       messages: {
                                          'event-name-update': "Please specify name of event",
                                          'venue-name-update': "Please enter Venue name Where the event is hold",
                                          'event-common-name-update' : "Please Specify Common Name of the event location",
                                          'event-city-update' : 'Pleace Provide City of the Event',
                                          'event-country-update': 'Please Specify The  Country',
                                          'event-type-update': 'Please Specify The  Type like Music, art, etc...',
                                          'event-discription-update' : 'Please Say Something about the event so that viewers know what its about'
                                        }
               

            });

              formOptions.data = { form: 'event_basics_update', event_id: localStorage.selected_event, organizer_id : localStorage.organizer_id};

          $("#event-basics-update-form").ajaxForm(formOptions);

});      




$(document).on("pagebeforeshow", "#event-guest-update-page", function(){

                  $.ajax({
                            url: '../includes/systemController.php',
                            data: {get: "event_guests", organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event },
                            type:'GET',
                            dataType: 'JSON',
                            
                            success : function(data, result, jqXHR){
                                        
                                  if(result === 'success') {
                             
                                     for(i = 0; i < data.length ; i++) {
                                         initialize_guest_fields(data[i], i);
                                   }
                                                              
                                }
                            } 
                });

         
            $("#event-guest-update-form").validate({

                                        messages: {
                                                    'guest-firstname-update': "Please Provide First Name",
                                                    'guest-lastname-update': "Please Provide Last Name ",
                                                    
                                                  } 
                                      });

          formOptions.data = {form: 'guest_update' , organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event };

            $("#guest-update-form").ajaxForm(formOptions);


  

  });



$(document).on("click", ".add-guest-image", function() {

          $(this).closest("tr.guest-field").find('input.guest-image').click();
       var input =   $(this).closest("tr.guest-field").find('input.guest-image');

      $(document).one("change", input, function(event){
                  

                   var inp = event.target;

    var reader = new FileReader();
    
    reader.onload = function(){
     
      var dataURL = reader.result;
      var output = input.closest('tr').find('img.guest-image-preview');
     

      $(output).attr('src', dataURL);
     
    };
    
    reader.readAsDataURL(inp.files[0]);
 
          });
            
});

    var total_guest_field = 1;

$(document).on('click', "#add-guest", function(e,data){
       
       var guest_image_table = $('#guest-preview');
       var guest_image_table = $('#guest-preview');
           
          
        guest_field = get_guest_field(total_guest_field);
        
              $(guest_field).appendTo(guest_image_table);
              $(guest_image_table).enhanceWithin();
              $(guest_image_table).closest('table').table("refresh");      
              
        total_guest_field = total_guest_field + 1;
      
});

      

$(document).on("pagebeforeshow", "#sponsor-update-page", function(){
                
                 $.ajax({
                            url: '../includes/systemController.php',
                            data: {get: "event_sponsors", organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event },
                            type:'GET',
                            dataType: 'JSON',
                            
                            success : function(data, result, jqXHR){
                                        
                                  if(result === 'success') {
                                      for(i = 0; i < data.length ; i++) {
                                         initialize_sponsor_fields(data[i], i);
                                   }
                                                              
                                }
                            } 
                });

            formOptions.data = {form: 'sponsor_update', organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event };

                 $("#sponsor-update-form").ajaxForm(formOptions);
      
});

  var  total_sponsors = 1;
     
$(document).on('click', "#add-sponsor", function(e,data) {
                   sponsor_add_table = $('#sponsor-box');        
                
         sponsor_field = get_sponsor_field(total_sponsors);
        $(sponsor_add_table).append(sponsor_field).enhanceWithin();  
        total_sponsors = total_sponsors + 1;    
        $(sponsor_add_table).closest('table').table('refresh');
      
});


$(document).on("click", ".remove-sponsor", function() {
          
          row = $(this);
          var    sponsor = $(this).attr('id');

         
                $("#message-body").empty();
                $("#message-body").append(CONFIRMATION).enhanceWithin();
                $("#modal-message").modal("show");

               
        $(document).on("click", '.answer', function() {
                  
              answer = $(this).attr('id');

                
                if(answer == 'yes'){
                
                  if(sponsor) {  
                        
                      $.ajax({
                              url: '../includes/systemController.php',
                              data: {get: 'delete_sponsor', sponsor_id : sponsor, organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event },
                              type : 'GET',
                              
                              success: function(data, result, jqxhr ){

                                  if(result == 'success'){
                                      $("#message-body").empty();
                                      $("#message-body").append(data);
                                                       
                                  } else {
                                      alert('error deleting');
                                  }
                               
                              }
                      });

                  } else {
                        $("#modal-message").modal("hide");
                               
                  }  
                  
                  row.closest('tr').remove(); 
                                             
                } else {
                    $("#modal-message").modal("hide");
                }

               
        });
            
});



$(document).on("click", ".add-sponsor-image", function() {

          $(this).closest("tr.sponsor-field").find('input.sponsor-image').click();
          
      var input =  $(this).closest("tr.sponsor-field").find('input.sponsor-image');

       $(document).one("change", input, function(event){
                  
           var inp = event.target;

    var reader = new FileReader();
   
      reader.onload = function(){
  
          var dataURL = reader.result;
          var output = input.closest('tr').find('img.sponsor-image-preview');
             
          $(output).attr('src', dataURL);
           
    };
    reader.readAsDataURL(inp.files[0]);
 
          });
            
            
});


$(document).on("pagebeforeshow", "#event-schedule-update-page", function(){


            $.ajax({
                      url: '../includes/systemController.php',
                      data: {get: "event_schedule", event_id: localStorage.selected_event },
                      type:'GET',
                      dataType: 'JSON',
                      cache: false,

                      success : function(event, result, jqXHR){
                        
                            if(result === 'success') {
                         
                              $('#event-start-date-update').val(event.start_date);
                              $('#event-end-date-update').val(event.end_date);
                              $('#event-start-time-update').val(event.start_time);
                              $('#event-end-time-update').val(event.end_time);
                              
                            }
                      },
                         error: function(data, result, jqxhr){
                      alert(result+'  '+jqxhr);
                    } 
            });


          $('.date_input').datetimepicker(dateOptions);

           $('.time_input').datetimepicker(timeOptions);      



         
          $("#event-schedule-update-form").validate({

               messages: {
                  'event-start-date-update': "Please Provide the date the event is held",
                  'event-end-date-update': "Please Provide the date the event Is Ending",
                  'event-start-time-update': "Please Provide time the event is Start",
                  'event-end-time-update': "Please Provide time the event Is Ending",
                  
                },
               


          });


          formOptions.data = { form: 'event_schedule_update', event_id: localStorage.selected_event, organizer_id: localStorage.organizer_id };

          $("#event-schedule-update-form").ajaxForm(formOptions);


});





$(document).on("pagebeforeshow", "#event-tickets-update-page", function(){

      
    
        $('.date_input').datetimepicker(dateOptions);      

            $.ajax({
                      url: '../includes/systemController.php',
                      data: {get: "event_tickets", event_id: localStorage.selected_event },
                      type:'GET',
                      dataType: 'JSON',
                      cache: false,

                      success : function(data, result, jqXHR){
                  
                                        if(result === 'success') {
                                                
                                          $("#ticket-sales-start-update").val(data[0].sale_start);
                                          $("#ticket-sales-end-update").val(data[0].sale_end);
                                          
                                          initialize_ticket(data);
                                     
                                         }
                                                                                 

                    },

                   error: function(data, result, jqxhr){
                      alert(jqxhr);
                   }

          });
         
          
            $("#event-ticket-update-form").validate({

                                                   messages: {
                                                    'ticket-type-update': 'Please Specify The Ticket Type',
                                                     'ticket-name-update': 'Please Specify The Ticket Name',
                                                    'ticket-price-update': 'Please Specify The Ticket Price',
                                                    'ticket-quantity-update': 'Please Specify the amount of ticket available for sale',
                                                    'ticket-discription-update': 'Please say something about the ticket like its purpose and what it can do',
                                                    'ticket-sales-start-date-update': 'Please Specify When the ticket should be available for sale',
                                                    'ticket-sales-end-date-update': 'Please Specify Till when the ticket will be Available'
                                                            
                                                      
                                                    }


             });


          formOptions.data = { form: 'event_ticket_update', event_id: localStorage.selected_event, organizer_id : localStorage.organizer_id };
          
          $("#event-ticket-update-form").ajaxForm(formOptions);

          

});



 $( document).on("click", ".deleteticket", function(){
                
                   row = $(this);
                
                     TICKET = $(this).attr('id');
                  current_count = row.closest('tbody').find('tr').length;
                  
                  if(current_count == 1 ) {
                     message = "<div class='alert alert-warning' >  You Cannot have an event without atleast 1 Ticket  </div> ";


                     $("#message-body").empty();
                    $("#message-body").append(message);
                       $("#modal-message").modal("show");
                                               

                  } else { 

                    $("#message-body").empty();
                    $("#message-body").append(CONFIRMATION).enhanceWithin();
                    $("#modal-message").modal("show");


            $(document).on("click", '.answer', function() {
              
                answer = $(this).attr('id');
                   


                  if(answer == 'yes'){


                            $.ajax({
                                      url: '../includes/systemController.php',
                                      data: {get: 'delete_ticket', ticket_id : TICKET, organizer_id: localStorage.organizer_id, event_id: localStorage.selected_event },
                                      type : 'GET',
                                      
                                      success: function(data, result, jqxhr ){

                                              if(result == 'success'){
                                                 
                                                  $("#message-body").empty();
                                                  $("#message-body").append(data);
                                               
                                                  row.closest('tr').remove();
                                                  
                                              } else {
                                                    alert('error deleting');
                                              }
                                           
                                      }
                                });


                  } 

                  $("#modal-message").modal('hide');

                         
            });

                          }
        });
     

$(document).on("click", ".delete-address" ,function(){
  
          row = $(this);
          
          var    address = $(this).attr('id');

 
        $("#message-body").empty();
        $("#message-body").append(CONFIRMATION);
        $("#message-body").enhanceWithin();
        $("#modal-message").modal("show");

               
        $(document).on("click", '.answer', function() {
                  
              answer = $(this).attr('id');

              if(answer == 'yes'){
              
                  if(address) {  
                        alert(address);
                        $.ajax({
                                  url: '../includes/systemController.php',
                                  data: {get: 'delete_address', address_id : address, organizer_id: localStorage.organizer_id },
                                  type : 'GET',
                                  
                                  success: function(data, result, jqxhr ){

                                      if(result == 'success'){
                                         
                                          $("#message-body").empty();
                                          $("#message-body").append(data);
                                                                                 
                                        } else {
                                       
                                          alert('error deleting');
                                       
                                        }
                                   
                                    }
                        });

                    } else {
                      
                      $("#modal-message").modal("hide");
                             
                    }  
                      
              row.closest('tr').remove(); 
                                         
              } else {
                  
                  $("#modal-message").modal("hide");
              
              }

          });


                
});

$(document).one('pagebeforeshow', "#account-managment", function () {

           $.ajax({
                        url: 'includes/systemController.php',
                        type: 'GET',
                        data: {get: 'organizer_info' , organizer_id : localStorage.organizer_id },
                        dataType: 'JSON',

                        success : function(data, result, jqxhr){

                          $("#admin-name").text(data.title+' '+data.first_name+ ' '+ data.last_name );
                          $("#admin-position").text(data.position);
                          $("#admin-mobile-number").text(data.mobile_num);
                          $("#admin-bio").text(data.bio);
                          $("#admin-organization-name").text(data.name);
                          $("#admin-website").text(data.website);
                          $("#admin-email").text(data.e_mail);
                          $("#admin-facebook").text(data.facebook);
                          $("#admin-twitter").text(data.twitter);
                          $("#admin-youtube").text(data.youtube);
                          $("#admin-office-number").text(data.office_num);
                          $("#admin-organization-info").text(data.info);
                          $("#admin-gender").text(data.gender);
                          $("#admin-birthday").text(data.birthdate);
                          $("#admin-registered").text(data.registered_on);
                          $("#admin-organization-created").text(data.date_created);
                          $("#admin-po_num").text(data.po_num);
                          if(data.picture){
                            $("#admin-picture").attr('src', 'uploads/organizerImages/'+data.picture);
                          }
                          if(data.logo){
                            $("#admin-organization-logo").attr('src', 'uploads/Organizations/'+data.logo);
                          }
                        }

                                

                        
              });

    

});

$(document).one('pagebeforecreate', "#events-managment-page", function () {

  


});



$(document).on('pagebeforeshow', "#manage-event-page", function () {
      
          

              $.ajax({
                        url: 'includes/systemController.php',
                        type: 'GET',
                        data: {get: 'event_summary' , organizer_id : localStorage.organizer_id, event_id : localStorage.selected_event },
                        dataType: 'JSON',

                        success : display_event_summary

                                

                        
              });

      


});

$(document).on('pagecreate', "#manage-event-page", function(){



});


  $(document).on("click", '.update_event', function(e){
     
                localStorage.selected_event = $(this).attr('id');
                                          
  });

  $(document).on('click', '.delete_event', function(e){

             selected = $(this).attr('id');
                                         $.ajax({

                                                  url: 'pages/eventUpdate.php',
                                                  type: 'POST',
                                                  data: {form: 'delete_event', event_id: selected},
                                                  success: function(data, result, jqXHR){
                                                        alert(result);
                                                  }



                                         });
                                         $(this).parent().remove().listview('refresh');
                                });

$(document).on("click", '.cancel-btn', function(){
  $.mobile.back();
});

$(document).on('click', '#add-address', function(){

        create_address_form();
});


 $(document).on('pagebeforeshow', "#organization-address-setting-page", function(){
    

                $.ajax({
                        url: '../includes/systemController.php',
                        type: 'GET',
                        data: {get: 'organization_address' , organizer_id : localStorage.organizer_id },
                        dataType: 'JSON',

                        success : function(data, result, jqxhr){
                            console.log(data);
                            if(data) {
                              initialize_address_form(data);
                            }else {
                              alert('error Loading address Please Try Again!!!');
                            }
                        }

                                

                        
              });


formOptions.data = {form: 'organization_address', organizer_id: localStorage.organizer_id };
    $('#address-update-form').ajaxForm(formOptions);
 });
