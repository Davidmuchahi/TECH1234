let info = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(imdb => {
            info = imdb;
            movieList(info);
            movieDetails(info[0]);
            info.forEach(movie => {
                let buy =  document.querySelector('buy');
                buy.addEventListener('click', () => buyTicket(movie))
            })
        })
});

function movieList(movies) {
    const film = document.getElementById('films');
    film.innerHTML = '';
    movies.forEach(movie => {
        const but = document.createElement('button');
        but.textContent = movie.title;
        but.addEventListener('click', () => movieDetails(movie));
        film.appendChild(but);
    });
}

function movieDetails(movie) {
    const movieDetails = document.getElementById('movieDetails');
    let availableTickets = movie.capacity - movie.tickets_sold;
    const buyButton = document.getElementById('buyButton')

    movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title}">
        <p>${movie.description}</p>
        <p>Runtime: ${movie.runtime} minutes</p>
        <p>Showtime: ${movie.showtime}</p>
        <p>Available Tickets: ${availableTickets}</p>
    `;

    movieDetails.appendChild(buyButton);
}

function buyTicket(movie) {
    if ((movie.capacity - movie.tickets_sold) > 0) {
        movie.tickets_sold++;
        movie.capacity--;
        movieDetails(movie);
    }
}
