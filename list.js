 $(document).ready( function() {


    // add var "code"
    var code = '1wbTu0rLPgSGyo17W-bBAmKZnkNpZ8LPDdWtOz_GLdCo'

    // loop through spreadsheet with Tabletop
      Tabletop.init( { key: code,
                         callback: showInfo,
                         wanted: [ "map" ],
                         debug: true ,
                         simpleSheet: true,
                         orderby: 'category',
                         reverse: true } )
      })
        

      


      function showInfo(data, tabletop) {

        var cat = '';
        var cat_li = '';
        var list_li = '';
        var content_li = '';

        $("#table_info").text("We found the tables " + tabletop.model_names.join(", "));

        $.each( tabletop.sheets(), function(i, sheet) {
          $("#table_info").append("<p>" + sheet.name + " has " + sheet.column_names.join(", ") + "</p>");
        });

        $.each( tabletop.sheets("map").all(), function(i, map) {

            // Show category
            
            // link to the map
            list_li = $('<div></div>');

            
            if  (cat != map.category){
                cat_li = '<br><div class="list-group-item list-group-item-action active" id="ref'+ map.category +'">'+
                '<div class="d-flex w-100 justify-content-between">'+
                        '<h1>' + map.category + '</h1>' +
                    '</div>' +
                '</div>';
            }

            if (map.description != ''){
                content_li ='<p class="mb-1">' +map.description.replace(/\n/g, "<br />") + '</p>';
            }
            if (map.openingtimes != ''){
                content_li = content_li +'<strong>Opening Times:</strong> ' + map.openingtimes.replace(/\n/g, "<br />") + '<br>';
            }
            if (map.tel != ''){
                content_li = content_li +'<strong>Tel:</strong> ' + map.tel + '<br>';
            }
            if (map.email != ''){
                content_li = content_li +'<strong>Email:</strong> ' + map.email + '<br>';
            }
            if (map.website != ''){
                content_li = content_li +'<strong>Website:</strong> ' + map.website + '<br>';
            }
            
            list_li.append('<div class="list-group-item list-group-item-action">'+
            '<div  class="d-flex w-100 justify-content-between">'+
                '<a href="map.html?id=ref'+map.id+'"><h5 class="mb-1">' + map.heading + '</h5></a>'+
                '<small><span class="badge badge-secondary">'+ map.id  +'</span></small>'+
            '</div>'+ content_li +
            '</div>');
            
            list_li.prepend(cat_li);

            list_li.appendTo("#map");
    
            // Set current category for loop
            cat = map.category;
            cat_li = '';
            content_li = '';
        })
      }
