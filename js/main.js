const characterList = document.querySelector('.character-list')
const btnLeft = document.querySelector('.left-btn')
const btnRight = document.querySelector('.right-btn')
const currentPage = document.querySelector(".current-page")
const cache = {
  people: {},
  planets: {}, 
  species: {},
  vehicles: {},
  starships: {}
}

let index = 1;
currentPage.innerText = index;

async function getCharacters() {
  console.log(cache)
  if (cache.people[index]) {
    return cache.people[index]
  }
  let data = await fetch('https://swapi.dev/api/people/?page=' + index)
  let characters = await data.json()
  cache.people[index] = characters
  return characters
}

function renderCharDetails(char) {
  const charLoader = document.querySelector('.loader-grey')
  charLoader.classList.add('loader-visible')
  const name = document.querySelector(".character-name")
  name.innerText = char.name;
  const height = document.querySelector(".height")
  height.innerText = "Height: " + char.height;
  const eyes = document.querySelector(".eyes")
  eyes.innerText = "Eye color: " + char.eye_color;
  const mass = document.querySelector(".mass")
  mass.innerText = "Mass: " + char.mass;
  const hair = document.querySelector(".hair")
  hair.innerText = "Hair color: " + char.hair_color;
  const skin = document.querySelector(".skin")
  skin.innerText = "Skin color: " + char.skin_color;
  const birthYear = document.querySelector(".birth-year")
  birthYear.innerText = "Birth year: " + char.birth_year;  
  const gender = document.querySelector(".gender")
  gender.innerText = "Gender: " + char.gender;
  charLoader.classList.remove('loader-visible')
}

async function renderPlanetDetails(char) {
  const charLoader = document.querySelector('.loader-white')
  charLoader.classList.add('loader-visible')
 
  let homeworldLink = char.homeworld
  let homeworldData
  if (cache.planets[homeworldLink]) {
    homeworldData = cache.planets[homeworldLink]
  } else {
    let homeworld = await fetch(homeworldLink)
    homeworldData = await homeworld.json()
  }
  


  cache.planets[homeworldData.url] = homeworldData
  console.log(cache)

  const planetsUL = document.querySelector(".planet-details__list")
  planetsUL.innerHTML = ''
  const name = document.createElement("li");
  name.innerHTML =  `<li class="details-name planet-name">${homeworldData.name}</li>`
  planetsUL.append(name);
  
  const rp = document.createElement("li");
  rp.innerHTML = `<li class="rp">Rotation period: ${homeworldData.rotation_period}</li>` 
  planetsUL.append(rp);

  const orb = document.createElement("li");
  orb.innerHTML = `<li class="orb">Orbital period: ${homeworldData.orbital_period}</li>`
  planetsUL.append(orb);

  const diameter = document.createElement("li");
  diameter.innerHTML = `<li class="diameter">Diameter: ${homeworldData.diameter}</li>`  
  planetsUL.append(diameter);
  
  const climate = document.createElement("li");
  climate.innerHTML = `<li class="climate">Climate: ${homeworldData.climate}</li>`
  planetsUL.append(climate);

  const gravity = document.createElement("li");
  gravity.innerHTML = `<li class="gravity">Gravity: ${homeworldData.gravity}</li>`
  planetsUL.append(gravity)
  
  const terrain = document.createElement("li");
  terrain.innerHTML = `<li class="terrain">Terrain: ${homeworldData.gravity}</li>`
  planetsUL.append(terrain)

  charLoader.classList.remove('loader-visible')
}

async function renderCharList() {
  const charLoader = document.querySelector('.loader-grey-characters')
  charLoader.classList.add('loader-visible')
  characterList.innerHTML = "";
  let data = await getCharacters()
  let characters = data.results
  
  for (let char of characters) {
    let li = document.createElement('li')
    li.innerHTML = `${char.name} <span class="focus-arrow">&#9656</span>`
    characterList.appendChild(li)
    li.addEventListener("click", () => {
      renderCharDetails(char)
      renderPlanetDetails(char)
    })
    li.addEventListener("mouseover", () => {
      const focusArrow = li.querySelector(".focus-arrow")
      focusArrow.classList.add("visible")
      })
      li.addEventListener("mouseout", () => {
        const focusArrow = li.querySelector(".focus-arrow")
        focusArrow.classList.remove("visible")
        })
  }
  charLoader.classList.remove('loader-visible')
 }

renderCharList()

btnRight.addEventListener('click', () => {
  if (index === 9) {
    index = 1;
  } else {
    index++;
  }
  currentPage.innerText = index;

  renderCharList()
})

btnLeft.addEventListener('click', () => {
  if (index === 1) {
    index = 9;
  } else {
    index--;
  }
  currentPage.innerText = index;
  renderCharList()
})

let tabs = document.querySelectorAll('.tab')
const planetTab = document.querySelector('.planet-tab')
const speciesTab = document.querySelector('.species-tab')
const vehiclesTab = document.querySelector('.vehicles-tab')
const starshipsTab = document.querySelector('.starships-tab')


planetTab.addEventListener('click', () => {
  tabs.forEach(tab => {
    tab.classList.remove('tab-active')
  })

  planetTab.classList.add('tab-active')
  console.log(cache)
})

speciesTab.addEventListener('click', () => {
  tabs.forEach(tab => {
    tab.classList.remove('tab-active')
  })

  speciesTab.classList.add('tab-active')

})

vehiclesTab.addEventListener('click', () => {
  tabs.forEach(tab => {
    tab.classList.remove('tab-active')
  })

  vehiclesTab.classList.add('tab-active')

})

starshipsTab.addEventListener('click', () => {
  tabs.forEach(tab => {
    tab.classList.remove('tab-active')
  })

  starshipsTab.classList.add('tab-active')

})

// OLD CODE
// const characterList = document.querySelector('.character-list')
// const btnLeft = document.querySelector('.left-btn')
// const btnRight = document.querySelector('.right-btn')

// async function getCharacters() {
//   let data = await fetch('https://swapi.dev/api/people/')
//   let characters = await data.json()
//   console.log(characters)
//   return characters
// }

// async function renderCharList() {
//   let data = await getCharacters()
//   let characters = data.results

//   for (let char of characters) {
//     let li = document.createElement('li')
//     li.innerHTML = `${char.name} <span class="focus-arrow">&#9656</span>`
//     characterList.appendChild(li)
    // li.addEventListener("mouseover", () => {
    // const focusArrow = li.querySelector(".focus-arrow")
    // focusArrow.classList.add("visible")
    // })
    // li.addEventListener("mouseout", () => {
    //   const focusArrow = li.querySelector(".focus-arrow")
    //   focusArrow.classList.remove("visible")
    //   })
//   }
// }

// renderCharList()

// btnRight.addEventListener('click', async () => {
//   let characters = await getCharacters()
//   let next10 = characters.next
//   console.log(next10)
// })