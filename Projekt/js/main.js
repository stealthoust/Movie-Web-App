$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function searchMovies() {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    document.getElementById('searchText').value = '';
}

function getMovies(searchText) {
    axios.get('https://www.omdbapi.com/?apikey=6c9f19d0&s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Zobacz szczegóły</a>
            </div>
          </div>
        `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    let x = "";
    axios.get('https://www.omdbapi.com/?apikey=6c9f19d0&i=' + movieId)
        .then(async (response) => {
            let movie = response.data;

            if (await sprawdzFilm(movieId)) {
                x = "<a onclick=\"deleteFavourite(\'" + movie.imdbID + "\')\" target=\"_blank\" class=\"btn btn-danger\">Usuń z ulubionych</a>"
            } else {
                x = "<a onclick=\"addfavourite(\'" + movie.imdbID + "\')\" target=\"_blank\" class=\"btn btn-primary\">Dodaj do ulubionych</a>"
            }
            console.log(movie.imdbID);

            let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Gatunek:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Wydany:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Ocena:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>Ocena IMDB:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Reżyser:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Scenarzysta:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Aktorzy:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Fabuła</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Zobacz informacje na stronie IMDB</a> 
            ${x}
            
            
            
          </div>
        </div>
      `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function addfavourite(id_filmu) {

    axios.post("http://localhost:3000/filmy/add/" + id_filmu)
        .then((response) => {
            console.log(response);
            alert("Film dodany do ulubionych");
            window.location.reload(true);
        })
        .catch((err) => {
            alert("Nie udało się dodać filmu do ulubionych");
            window.location.reload(true);
            console.log(err);
        });

}


function deleteFavourite(id) {
    axios.delete('http://localhost:3000/filmy/delete/' + id).then((response) => {
            alert("Film został usunięty z ulubionych");
            window.location.reload(true);
        }
    ).catch((err) => {
        console.log(err);
        alert("Coś poszło nie tak.Błąd: " + err);
        window.location.reload(true);
    });

}


//wyświetla pojedyńczy film
async function sprawdzFilm(id) {
    const response = await axios.get('http://localhost:3000/filmy/' + id)
    if (response.data.length === 0) return false;
    else return true;

}

function getFavourites() {

    let output = '';
    axios.get('http://localhost:3000/filmy/')
        .then((response) => {
            let filmy = response.data;


            for (let i = 0; i < filmy.length; i++) {
                axios.get('https://www.omdbapi.com/?apikey=6c9f19d0&i=' + filmy[i].id_filmu).then((response) => {
                    let movies = response.data;


                    output += `
                      <div class="col-md-3">
                        <div class="well text-center">
                          <img src="${movies.Poster}">
                          <h5>${movies.Title}</h5>
                          <a onclick="movieSelected('${movies.imdbID}')" class="btn btn-primary" href="#">Zobacz szczegóły</a>
                          <a onclick="deleteFavourite('${movies.imdbID}')" class="btn btn-danger" href="#">Usuń z ulubionych</a>
                        </div>
                      </div>
                    `;

                    $('#ulubione').html(output);


                });


            }

        });


}
