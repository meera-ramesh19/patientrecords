                          $(document).ready(function() {
                              var x = $("#ntos").html();
                              var y = $("#etow").html();
                              alert(x, y); // now JS variable 'x' has the uid that's passed from the node backend.
                          });


                          var test1 = JSON.parse($(ntos).text);
                          console.log(test1)
                          var test2 = JSON.parse($(etow).text);
                          console.log(test2)
                          mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZXJjaGljayIsImEiOiJja3BuYndoMmgwMDZjMnZwZG96ajc5a2I5In0.zhG5wSi5rbgl3iYlw-202g';
                          var map = new mapboxgl.Map({
                              container: 'map',
                              style: 'mapbox://styles/mapbox/streets-v11',
                              center: [test, test],
                              zoom: 8
                          });

                          // Create a default Marker and add it to the map. 

                          var marker1 = new mapboxgl.Marker()
                              .setLngLat([test1, test2]).addTo(map);
                          // Create a default Marker, colored black, rotated 45 degrees. 
                          var marker2 = new mapboxgl.Marker({
                                  color: 'black',
                                  rotation: 45
                              })
                              .setLngLat([test1, test2])
                              .addTo(map)


                          //mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZXJjaGljayIsImEiOiJja3BuYndoMmgwMDZjMnZwZG96ajc5a2I5In0.zhG5wSi5rbgl3iYlw-202g';

                          //var map = new mapboxgl.Map({ // container:'map',
                          // style: 'mapbox:
                          //styles/mapbox/streets-v11', 
                          // center: [-73.889504, 40.698867], 
                          // zoom: 13
                          // });  
                          //Add the control to the map. 
                          // map.addControl( 
                          // new MapboxGeocoder({
                          // accessToken: mapboxgl.accessToken, 
                          // mapboxgl:
                          //mapboxgl 
                          // }) 
                          // ); 

                          <
                          /script>  <
                          script src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" >
                              <
                              /script>