const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "api_key=b4b5f9d98442f11bbdd50a5adf70f1d1"
const LANGUAGE = "language=pt-BR"
const IMG_BASE = "https://image.tmdb.org/t/p/w500"

const categoriasFilmes = ['popular', 'top_rated', 'upcoming', 'now_playing']
//const carrossel = document.querySelector(".carrossel")

function getMovies(categoria) {
    for(let i = 1; i <= 4; i++) {
        fetch(`${BASE_URL}/movie/${categoria}?${API_KEY}&${LANGUAGE}&page=${i}`)
        .then(res => res.json())
        .then(dados => {
            dados.results.forEach(filme => {
                document.querySelector(`.${categoria}`).innerHTML += `
                    <img src="${IMG_BASE + filme.poster_path}"  
                         alt="${filme.title} poster"
                    />`
            })
        })
        .catch(err => console.log(err))
    }
}

function goLeft(categoria) {
    document.querySelector(`.${categoria}`).scrollLeft -= 1500   
}

function goRight(categoria) {
    document.querySelector(`.${categoria}`).scrollLeft += 1500
}

/* setInterval(() => {
    if(carrossel.scrollLeft + 2000 >= carrossel.scrollWidth) {
        carrossel.scrollLeft = 0
    } else {
        goRight()
    }
}, 1500)
 */
// getMovies('popular')
// getMovies('top_rated')

categoriasFilmes.forEach(categoria => getMovies(categoria))
