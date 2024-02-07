const searchElement = document.querySelector('.search-btn')
const inputElement = document.getElementById('cityname')
const imageElement = document.querySelector('.img')
const mainElement = document.querySelector('.main-content')
const weatherContainer = document.querySelector('.weather-container')
const err = document.querySelector(".err")
const weatherContent = document.querySelector('.content')
const temperatureElement = document.querySelector('.temperature')
const commentElement = document.querySelector('.comment')
const humidity = document.querySelector('.humidity .humidity-text')
const wind = document.querySelector('.wind .wind-text')


const APIKey = `f4ae0dcdaf35bd0dac683fbc9b586faa`

const prediction = ['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash', 'Squall', 'Tornado', 'Clear', 'Clouds']


inputElement.addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        weatherCall()
    }
})


searchElement.addEventListener('click', weatherCall)

async function weatherCall() {
    const cityName = inputElement.value
    const fetchFromUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`)
    const response = await fetchFromUrl.json()

    if (cityName === "") {
        inputNotHaveValue()
    }

    else {
        
        if (response.cod == '404') {
            weatherContent.remove()
            mainElement.appendChild(err)
            err.innerHTML = `
                    <img src="./assets/404.png"/ class="enter invalid">
                    <span class="enter error">Oops! Invalid Location :/</span>
                `
            weatherContainer.classList.add('err-height')
        }


        else {

            err.remove()
            mainElement.appendChild(weatherContent)
            const climatePrediction = response.weather[0].main
            prediction.forEach((element) => {
                if (element == climatePrediction) {
                    imageElement.innerHTML = `
                    <img src="./assets/${climatePrediction.toLowerCase()}.png" class="enter"/>
                `
                    weatherContainer.classList.add('res-container')
                }
            })

            weatherContent.classList.add('enter')

            temperatureElement.innerHTML = `
                <div class="temp enter">${Math.round(response.main.temp)}<sup>°C</sup></div>
            `
            commentElement.innerHTML = `
                <strong>${response.weather[0].description}</strong>
            `

            humidity.innerHTML = `${response.main.humidity}%`
            wind.innerHTML = `${response.wind.speed}Km/hr`

        }
    }
}


function inputNotHaveValue() {
    weatherContent.remove()
    mainElement.appendChild(err)
    err.innerHTML = `
        <span class="enter error">Please Enter the City Name <br> To Find Your Location Weather.</span>
    `
    weatherContainer.classList.add('no-value-height')
}

