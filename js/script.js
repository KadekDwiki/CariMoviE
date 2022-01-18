// build with ctrl + c & ctrl + v


function searchMovie() {
   $('#movie-list').html('');
   $.ajax({
      url: "http://www.omdbapi.com",
      type: "get",
      dataType: "json",
      data: {
         "apikey": "fcf68482",
         "s": $("#input-search").val(),
      },
      success: function (result) {
         if (result.Response == "True") {
         let movies = result.Search;

         $.each(movies, function (i, data) {
            $('#movie-list').append(`
            <div class="col-md-4 mb-4">
               <div class="card">
               <img src="`+ data.Poster +`" class="card-img-top" alt="`+ data.Title +`">
               <div class="card-body">
                  <h5 class="card-title">`+ data.Title +`</h5>
                  <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                  <p class="card-subtitle mb-2 text-muted">`+ data.Type +`</p>
                  <a href="#" class="card-link see-detail text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
               </div>
               </div>
            </div>
            
            `)
            $("#input-search").val('');
         })
         } else {
         $("#movie-list").html("<h1 class='text-center text-danger fw-bold mt-5'> <i class='bi bi-exclamation-circle-fill'></i> " + result.Error + " </h1>");
         }
      },
   });
   }

   $(window).scroll(function () {
      let navbar = $('.navbar');
      if ($(window).scrollTop() > 60) {
      navbar.addClass('bg-dark')
            .removeClass('d-none')
   }
   else{
      navbar.removeClass('bg-dark')
            .addClass('d-none')
   }
   })

   $("#btn-search").on("click", function () {
   searchMovie();
   });

   $("#input-search").on("keyup", function (e) {
   if (e.keyCode === 13) {
      searchMovie();
   }
})
//modal script
$('#movie-list').on('click', '.see-detail', function () {
   $.ajax({
      url: "http://www.omdbapi.com",
      type: "get",
      dataType: "json",
      data: {
         "apikey": "fcf68482",
         "i": $(this).data('id')
      },
      success: function (movie) {
         if (movie.Response === "True") {

            $('.modal-body').html(`
               <div class="container-fluid">
                  <div class="row">
                        <div class="col-md-4">
                           <img src="`+ movie.Poster + `" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                           <ul class="list-group">
                              <li class="list-group-item"><h3>`+ movie.Title + `</h3></li>
                              <li class="list-group-item">Released : `+ movie.Released + `</li>
                              <li class="list-group-item">Genre : `+ movie.Genre + `</li>                 
                              <li class="list-group-item">Director : `+ movie.Director + `</li>                 
                              <li class="list-group-item">Director : `+ movie.Actors + `</li>                 
                           </ul>
                        </div>
                  </div>
               </div>
            `);

         }
      }
   });

});