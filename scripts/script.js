let api_query = 'http://www.omdbapi.com/?apikey=2f191c5b&s=';
let api_info = 'http://www.omdbapi.com/?apikey=2f191c5b&i=';

$(document).ready(function() {
    $('#searchForm').on('submit', function(e) {
        let searchText = $('#searchText').val();
        retrievemovies(searchText);
        e.preventDefault();
    });
});

function retrievemovies(movie_title) {
    axios.get(api_query + movie_title)
        .then(function(response) {
            let movies = response.data.Search;
            let output = '';
            $.each(movies, function(index, movie) {
                output +=
                    "\n <div class=\"col-md-3\">\n<div class=\"box text-center\">\n<img src=\""
                    .concat(movie.Poster, "\">\n<h5>")
                    .concat(movie.Title, "</h5>\n<a onclick=\"selectMovie('")
                    .concat(movie.imdbID, "')\" class=\"btn btn-primary\" href=\"#\">Movie Details</a>\n</div>\n</div>\n");
            });
            $('#movies')
                .html(output);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function selectMovie(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}
// test traversy
function retrievemovie() {
    let movieId = sessionStorage.getItem('movieId');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', api_info + movieId, true);
    xhr.onload = function() {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            console.log(response)
            let output = '';
            if (response.Response === 'True') {
                let movie = response;
                output = "\n <div class=\"row\">\n <div class=\"col-md-4\">\n <img src=\""
                    .concat(movie.Poster, "\" class=\"thumbnail\">\n </div>\n <div class=\"col-md-8\">\n <h2> ")
                    .concat(movie.Title, "</h2>\n <ul class=\"list-group\">\n <li class=\"list-group-item\"><strong>Genre:</strong>")
                    .concat(movie.Genre, "</li>\n <li class=\"list-group-item\"><strong>Released:</strong> ")
                    .concat(movie.Released, "</li>\n <li class=\"list-group-item\"><strong>Rated:</strong> ")
                    .concat(movie.Rated, "</li>\n <li class=\"list-group-item\"><strong>IMDB Rating:</strong> ")
                    .concat(movie.imdbRating, "</li>\n <li class=\"list-group-item\"><strong>Director:</strong> ")
                    .concat(movie.Director, "</li>\n <li class=\"list-group-item\"><strong>Writer:</strong> ")
                    .concat(movie.Writer, "</li>\n <li class=\"list-group-item\"><strong>Actors:</strong> ")
                    .concat(movie.Actors, "</li>\n </ul>\n </div>\n </div>\n <div class=\"row\">\n <div class=\"box\">\n <h3>Plot</h3>\n")
                    .concat(movie.Plot, "\n <hr>\n <a href=\"http://imdb.com/title/")
                    .concat(movie.imdbID, "\" target=\"_blank\" class=\"btn btn-primary\">View IMDB</a>\n <a href=\"index.html\" class=\"btn btn-default\">Go Back To Search</a>\n </div>\n </div>\n ");
                // console.log(output)
            } else {
                output = '<li>Something went wrong</li>';
            }
            $('#movie').html(output);
        }
    }
    xhr.send();
}
retrievemovie()

// function retrievemovie() {
//     let movieId = sessionStorage.getItem('movieId');
//     axios.all([axios.get(api_info + movieId)])
//         .then(function(response) {
//             console.log(response);
//             // let movie = response.data;
//             // let output = "\n <div class=\"row\">\n <div class=\"col-md-4\">\n <img src=\""
//             //     .concat(movie.Poster, "\" class=\"thumbnail\">\n </div>\n <div class=\"col-md-8\">\n <h2> ")
//             //     .concat(movie.Title, "</h2>\n <ul class=\"list-group\">\n <li class=\"list-group-item\"><strong>Genre:</strong>")
//             //     .concat(movie.Genre, "</li>\n <li class=\"list-group-item\"><strong>Released:</strong> ")
//             //     .concat(movie.Released, "</li>\n <li class=\"list-group-item\"><strong>Rated:</strong> ")
//             //     .concat(movie.Rated, "</li>\n <li class=\"list-group-item\"><strong>IMDB Rating:</strong> ")
//             //     .concat(movie.imdbRating, "</li>\n <li class=\"list-group-item\"><strong>Director:</strong> ")
//             //     .concat(movie.Director, "</li>\n <li class=\"list-group-item\"><strong>Writer:</strong> ")
//             //     .concat(movie.Writer, "</li>\n <li class=\"list-group-item\"><strong>Actors:</strong> ")
//             //     .concat(movie.Actors, "</li>\n </ul>\n </div>\n </div>\n <div class=\"row\">\n <div class=\"box\">\n <h3>Plot</h3>\n")
//             //     .concat(movie.Plot, "\n <hr>\n <a href=\"http://imdb.com/title/")
//             //     .concat(movie.imdbID, "\" target=\"_blank\" class=\"btn btn-primary\">View IMDB</a>\n <a href=\"index.html\" class=\"btn btn-default\">Go Back To Search</a>\n </div>\n </div>\n ");
//             // $('#movie')
//             //     .html(output);
//         })
//         .catch(function(err) {
//             console.log(err);
//         });
// }

// retrievemovie()