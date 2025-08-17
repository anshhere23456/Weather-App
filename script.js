const tempraturefeild = document.querySelector('#temp')
const locationfeild = document.querySelector('#location')
const datefeild = document.querySelector('#date')
const conditionfeild = document.querySelector('#condition')
const searchfeild = document.querySelector('.search')
const form = document.querySelector('form')
const errorFeild = document.querySelector('#error')

form.addEventListener('submit', search)

let target = 'Delhi'

// Fetch weather
const getWeather = async (city) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=781984e2aa824aa1852141014252607&q=${city}`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.error) {
      showError("❌ City not found!")
      return
    }

    let temp = data.current.temp_c
    let location = data.location.name
    let date = data.location.localtime
    let condition = data.current.condition.text

    updateWeather(temp, location, date, condition)
    errorFeild.innerHTML = "" // clear error
  } catch (error) {
    showError("⚠️ Error fetching data")
  }
}

// Update DOM
function updateWeather(temp, location, date, condition) {
  let splitDate = date.split(' ')[0]
  let splitTime = date.split(' ')[1]
  let day = getDayName(new Date(splitDate).getDay())

  tempraturefeild.innerHTML = `${temp}°C`
  locationfeild.innerHTML = `in ${location}`
  datefeild.innerHTML = `${splitDate} - ${day} ${splitTime}`
  conditionfeild.innerHTML = condition
}

// Search handler
function search(e) {
  e.preventDefault()
  target = searchfeild.value.trim()
  if (target === "") {
    showError("⚠️ Please enter a city name")
    return
  }
  getWeather(target)
  searchfeild.value = ''
}

// Error display
function showError(message) {
  tempraturefeild.innerHTML = "--°C"
  locationfeild.innerHTML = ""
  datefeild.innerHTML = ""
  conditionfeild.innerHTML = ""
  errorFeild.innerHTML = message
}


// Day name helper
function getDayName(number) {
  switch (number) {
    case 0: return 'Sunday'
    case 1: return 'Monday'
    case 2: return 'Tuesday'
    case 3: return 'Wednesday'
    case 4: return 'Thursday'
    case 5: return 'Friday'
    case 6: return 'Saturday'
  }
}

// Load default
getWeather(target)
