const apiKey = "api_key=21d0b61bb21a1374f1b66c994663ada3";


function urlfun() {

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id')

}

function displayMovie() {
    let movieId = urlfun()

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?${apiKey}&append_to_response=credits,videos`)
        .then((response) => response.json())
        .then((movieData) => {

            displayMovieDetails(movieData);
            let castImg = castDetails(movieData.credits.cast);
        })
        .catch((error) => {
            console.error('Error fetching movie details:', error);
        });

}


displayMovie()

function displayMovieDetails(movieData) {
    const movieDetailsContainer = document.getElementById('movieDetails');


    const imageElement12 = document.createElement('img');
    imageElement12.classList.add('card-img-top', 'result');

    imageElement12.src = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;


    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');

    const titleElement = document.createElement('h2');
    titleElement.textContent = movieData.original_title;

    const overviewElement = document.createElement('p');
    overviewElement.textContent = movieData.overview;

    movieDetailsContainer.appendChild(imageElement12);

    movieDetailsContainer.appendChild(detailsContainer);


    detailsContainer.appendChild(titleElement);
    detailsContainer.appendChild(overviewElement);





    // Watch Trailer

    const watchtrailer = `https://api.themoviedb.org/3/movie/${movieData.id}/videos?${apiKey}`;
    fetch(watchtrailer)
        .then((response) => response.json())
        .then((data) => {
            const videos = data.results;
            if (videos.length > 0) {
                const trailer = videos.find((video) => video.type === 'Trailer');
                if (trailer) {
                    const linkTube = `https://www.youtube.com/watch?v=${trailer.key}`;
                    const linkTubeElement = document.createElement('a');
                    linkTubeElement.classList.add('trailerclass');
                    linkTubeElement.href = linkTube;
                    linkTubeElement.textContent = 'Watch Trailer';
                    detailsContainer.appendChild(linkTubeElement);
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching video data:', error);
        });

}

function castDetails(castImg) {

    let sliceCast = castImg.slice(0, 7)



    let cImg = document.getElementById('castImg');

    const cDiv = cImg.querySelector('.castdiv');

    const cNewDiv = document.createElement('div');
    cNewDiv.classList.add('new');

    sliceCast.forEach((cast) => {
        const castContainer = document.createElement('div'); // Create a container div for each cast
        castContainer.classList.add('cast-container');

        const imgDiv = document.createElement('img');
        imgDiv.classList.add('imgWidth');
        imgDiv.src = 'https://image.tmdb.org/t/p/w300' + cast.profile_path;
        castContainer.appendChild(imgDiv);

        const namePara = document.createElement('p');
        namePara.textContent = cast.name;
        castContainer.appendChild(namePara);

        cNewDiv.appendChild(castContainer);
    });

    cDiv.appendChild(cNewDiv);
}