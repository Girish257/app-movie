const apiKey = "api_key=21d0b61bb21a1374f1b66c994663ada3";

const imgUrl = `https://image.tmdb.org/t/p/w500`;

let current_div = 'home'

function fetchData() {
    let imageSlide = document.getElementById('carouselExampleSlidesOnly');

    fetch(`https://api.themoviedb.org/3/movie/popular?${apiKey}`)
        .then((response) => response.json())
        .then((data) => {

            const carouselInner = imageSlide.querySelector('.carousel-inner');
            let onlyThree = data.results.slice(0, 3)

            onlyThree.forEach((dataImg, index) => {
            
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');

                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                const imageElement = document.createElement('img');
                imageElement.classList.add('d-block', 'w-100');
                imageElement.src = imgUrl + dataImg.poster_path;


                carouselItem.addEventListener('click', () => {

                    window.location.href = `movie_details.html?id=${dataImg.id}`;
                });

                carouselItem.appendChild(imageElement);
                carouselInner.appendChild(carouselItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching data from the API:', error);
        });
}

fetchData();


let currentPage = 1;
let totalPages = 1;
let isLoading = false;

function MovieList() {

    if (!isLoading) {
        isLoading = true;

        let List = document.getElementById('row1');

        fetch(
            `https://api.themoviedb.org/3/discover/movie?${apiKey}&page=${currentPage}`
        )
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.total_pages);

                if (currentPage === 1) {
                    totalPages = data.total_pages;

                }


                const colInner1 = List.querySelector('.a1');

                let tenFive = data.results;

                tenFive.forEach((allData, index) => {
                    const listmoviediv = document.createElement('div');
                    listmoviediv.classList.add('card', 'cards');
                    listmoviediv.setAttribute("data-aos-duration", "10000");
                    listmoviediv.setAttribute("data-aos", "fade-up");

                    const imageElement1 = document.createElement('img');
                    imageElement1.classList.add('card-img-top');

                    imageElement1.src = imgUrl + allData.poster_path;

                    const listmovieHFive = document.createElement('h5');
                    listmovieHFive.classList.add('card-title');

                    listmovieHFive.textContent = "Movie Name: " + allData.original_title;

                    const listMoviePara = document.createElement('h6');
                    listMoviePara.classList.add('card-title');
                    listMoviePara.textContent = "Release Date : " + allData.release_date;

                    const listMovieRating = document.createElement('h6');
                    listMovieRating.classList.add('card-text');

                    listMovieRating.textContent = "Movie Rating :" + allData.vote_average;

                    listmoviediv.addEventListener('click', () => {

                        window.location.href = `movie_details.html?id=${allData.id}`;
                    });


                    listmoviediv.appendChild(imageElement1);
                    colInner1.appendChild(listmoviediv);
                    listmoviediv.appendChild(listmovieHFive);
                    listmoviediv.appendChild(listMoviePara);
                    listmoviediv.appendChild(listMovieRating);
                });
                isLoading = false;

                if (currentPage < totalPages) {
                    currentPage++;
                }
            })
            .catch((error) => {
                console.error('Error fetching data from the API:', error);

            });
    }
}



function handleScroll() {
   
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (current_div == 'home') {
            MovieList();
        } else {

            search()
        }

    }

}
window.addEventListener("scroll", handleScroll);


let currentSearchPage = 1;
let totalSearchPages = 1;
let isSearchLoading = false;


const searchInput = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");
const mList = document.getElementById("mList");
const result = document.getElementById("seachResult");

result.style.display = "none";

searchTerm = ''

function search() {

    if (!isSearchLoading) {
        isSearchLoading = true;
        fetch(`https://api.themoviedb.org/3/search/movie?${apiKey}&page=${currentSearchPage}&query=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
             
                if (currentSearchPage === 1) {
                    totalSearchPages = data.total_pages;

                }

                const movies = data.results;

                let output = '';

                movies.forEach((allData, index) => {
                    if (movies.length > 0) {

                        output += `
            
                    <div class="searchCards">

                        <img class="abc" data-movie-id="${allData.id}" src="https://image.tmdb.org/t/p/w500/${allData.poster_path}" alt="${allData.title} Poster">
                        <h5>Movie Name: ${allData.title}</h5>
                        <h6>Release Date: ${allData.release_date}</h6>
                        <h6>Movie Rating: ${allData.vote_average}</h6>


                        </div>
                `;
                    } else {
                        output = '<p>No movies found.</p>';
                    }

                });
                searchList.innerHTML += output;


                const movieItems = document.getElementsByClassName('abc');


                for (let i = 0; i < movieItems.length; i++) {
                    movieItems[i].addEventListener('click', () => {

                        const movieId = movieItems[i].getAttribute('data-movie-id');
                        window.location.href = `movie_details.html?id=${movieId}`;
                    });
                }

                isSearchLoading = false;


                if (currentSearchPage < totalSearchPages) {
                    currentSearchPage++;
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);

            });
        current_div = 'search'
    }
}


document.getElementById("searchform").addEventListener("submit", function (event) {

    event.preventDefault();

    mList.style.display = "none";
    result.style.display = "block";
    searchList.innerHTML = '';
    searchTerm = searchInput.value;
    search()
});


