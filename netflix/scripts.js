const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "api_key=b4b5f9d98442f11bbdd50a5adf70f1d1"
const LANGUAGE = "language=pt-BR"
const IMG_BASE = "https://image.tmdb.org/t/p/w500"
const homeSection = document.getElementById("inicio");

const categoriasFilmes = ['popular', 'top_rated', 'upcoming', 'now_playing']
const categoriasSeries = ['popular', 'top_rated', 'on_the_air', 'airing_today']

const movies = []
const series = []

async function getMoviesAndSeries(categoria, type = 'movie') {
    try {
        for(let i = 1; i <= 4; i++) {
           let res = await fetch(`${BASE_URL}/${type}/${categoria}?${API_KEY}&${LANGUAGE}&page=${i}`) 
           let media = await res.json()

           media.results.forEach(item => {
            type === 'movie' ? movies.push(item) : series.push(item)

            document.querySelector(type === 'movie' ? `.${categoria}` : `.${categoria}_tv`).innerHTML += `
                <img onclick="showDetails(${item.id}, '${type}')" src="${IMG_BASE + item.poster_path}"  
                     alt="${item.title || item.name} poster"
                />`
           })
        }
    } catch(e) {
        console.log(e)
    }
}

async function getItem(id, type = 'movie') {
    try {
        let res = await fetch(`${BASE_URL}/${type}/${id}?${API_KEY}&${LANGUAGE}`)
        let item = await res.json()
        
        return item
    } catch (e) {
        console.log(e)
    }
}

async function showDetails(movieId, type = 'movie') {
    let element = await getItem(movieId, type)

    if (type === 'movie') {
        let averageClass = element.vote_average >= 7 ? "good" :
                element.vote_average >= 4 ? "regular" : "bad"
        let formattedReleaseDate = element.release_date.split("-").reverse().join("/")
    
        homeSection.innerHTML = `
            <div>
                <h1>${element.title}</h1>
                <p>${element.overview}</p>
                <p>Data de lançamento: ${formattedReleaseDate}</p>
                <p>Gêneros: ${element.genres.map(genre => " " + genre.name)}</p>
                <span class=${averageClass}>
                    ${(element.vote_average * 10).toFixed(0)}% gostaram
                </span>
            </div>
            <img src="${IMG_BASE + element.backdrop_path}" />
        `
    } else {
        let formattedFirstAirDate = element.first_air_date.split("-").reverse().join("/")
    
        homeSection.innerHTML = `
            <div>
                <h1>${element.name}</h1>
                <p>${element.overview}</p>
                <p>Data de lançamento: ${formattedFirstAirDate}</p>
                <p>Gêneros: ${element.genres.map(genre => " " + genre.name)}</p>
            </div>
            <img src="${IMG_BASE + element.backdrop_path}" />
        `
    }

}
 
async function showSeriesDetails(movieId) {
    let movie = await getSingularMovie(movieId, 'tv')
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

async function getHomepage() {
    for(let categoria of categoriasFilmes) {
        await getMoviesAndSeries(categoria)

        if(categoria === 'top_rated') {
            let index = Math.floor(Math.random() * (movies.length - 1))
            let filmeId = movies[index].id
        
            await showDetails(filmeId)
        }
    }


    for(let categoria of categoriasSeries) {
        await getMoviesAndSeries(categoria, 'tv')
    }

}

getHomepage()

/* categoriasSeries.forEach(categoria => getMoviesAndSeries(categoria, 'tv'))
categoriasFilmes.forEach(categoria => getMoviesAndSeries(categoria)) */
