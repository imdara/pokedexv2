document.body.innerHTML=`
<h1><img src="poke.jpg" alt="pokemon logo" height="200px"/><h1>
<div class="container" align="center" id="searchBox">
    <button type="button" id="first" class="btn btn-dark">⌂</button>
    <input type="text" id="searchBar" placeholder=" Search here "/>
    <button class="btn btn-dark" id="searchBtn">Search</button>  
</div><br>
<ul id="listofpokemon" class="container"></ul>
<p id="result"></p>
<nav id="navbar">
<button class="btn btn-dark" id="prev"><<</button>
<button class="btn btn-dark" id="btn1">1</button>
<button class="btn btn-dark" id="btn2">2</button>
<button class="btn btn-dark" id="btn3">3</button>
<button class="btn btn-dark" id="btn4">4</button>
<button class="btn btn-dark" id="btn5">5</button>
<button class="btn btn-dark" id="next">>></button>
<button class="btn btn-dark" id="last">Last</button>
</nav><br>
`;

let currentPage=1, firstItem, lastItem;
let filtered=[];
const first = document.querySelector('#first');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const last = document.querySelector('#last');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');
const listOfPokemon = document.querySelector("#listofpokemon");
const searchBar = document.querySelector('#searchBar');

myFn = (async () => {
    document.querySelector("#searchBar").value="";
    document.querySelector("#result").innerHTML="";
    listOfPokemon.innerHTML="";
    try {
        firstItem = currentPage*9-8;
        lastItem = currentPage*10-currentPage;
        if (currentPage>=5) {
        btn1.innerHTML = currentPage-4;
        btn2.innerHTML = currentPage-3;
        btn3.innerHTML = currentPage-2;
        btn4.innerHTML = currentPage-1;
        btn5.innerHTML = currentPage;
        }
      for (let i = firstItem; i <= lastItem; i++) {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let object = await res.json();
        getData(object);
    }
    } 
    catch (error) {
      console.log(error);
    }
  });

  getData = (object) => {
    let name = object.name;
    let id = object.id;
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    listOfPokemon.innerHTML += `
    <li class="card" onclick="selectid(${id})">
    <img class="card-img-top" src="${image}"/>
    <div class="card-body">
    <h3 class="card-title">${id}. ${name}</h3>
    </div>
    </li>
    `;
    }

  myFn();

  const selectid = async (id) => { 
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const selectedIdData = await res.json();
      displayPopup(selectedIdData);
  };

  const displayPopup = (object) => {
    let name = object.name;
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${object.id}.png`;
    let type = object.types.map(data => data.type.name);
    let abil = object.abilities.map(data => data.ability.name);
    let moves = object.moves.map(data => data.move.name);
    let wt = object.weight;
    const htmlString = `<div class="popup">
    <button id="closeBtn" class="btn btn-dark" onclick="closePopup()">X</button>
    <div id="popupcard" class="card">
    <img id="popupimg" class="card-img-top" src="${image}"/>
    <div class="card-body">
    <h3 class="card-title">${object.id}. ${name}</h3>
    <p class="card-text"><b>Weight:</b> ${wt} kg</p>
    <p class="card-text"><b>Abilities:</b> ${abil}</p>
    <p class="card-text"><b>Type:</b> ${type}</p>
    <p class="card-text"><b>Moves:</b> ${moves}</p>
    </div>
    </div>
    `;
    listOfPokemon.innerHTML = htmlString;
    }

    const closePopup = () => {
        myFn();
    }

  searchBtn.addEventListener('click', async () => {
    document.querySelector("#result").innerHTML="";
    listOfPokemon.innerHTML="";
    const text = document.querySelector("#searchBar").value.toLowerCase();
    for (let i = 1; i <= 180; i++) {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let object = await res.json();
        if (object.name.includes(text)){
        filtered = object;
        getData(filtered);
        }
    }
        if (filtered.length==0){
            document.querySelector("#result").innerHTML=`<p class="container">No results found.</p>`;
        }
});

  first.addEventListener('click', () => {
    currentPage=1;
    btn1.innerHTML = currentPage;
    btn2.innerHTML = currentPage+1;
    btn3.innerHTML = currentPage+2;
    btn4.innerHTML = currentPage+3;
    btn5.innerHTML = currentPage+4;
    myFn();
})

prev.addEventListener('click', () => {
    if (currentPage>1){
    currentPage--;
    btn1.innerHTML = currentPage;
    btn2.innerHTML = currentPage+1;
    btn3.innerHTML = currentPage+2;
    btn4.innerHTML = currentPage+3;
    btn5.innerHTML = currentPage+4;
    myFn();
    }
});

btn1.addEventListener('click', () => {
    currentPage = Number(btn1.innerHTML);
    myFn();
});

btn2.addEventListener('click', () => {
    currentPage = Number(btn2.innerHTML);
    myFn();
});

btn3.addEventListener('click', () => {
    currentPage = Number(btn3.innerHTML);
    myFn();
});

btn4.addEventListener('click', () => {
    currentPage = Number(btn4.innerHTML);
    myFn();
});

btn5.addEventListener('click', () => {
    currentPage = Number(btn5.innerHTML);
    myFn();
});

next.addEventListener('click', () => {
    if (currentPage<20 && currentPage>=5){
        currentPage++;
    btn1.innerHTML = currentPage-4;
    btn2.innerHTML = currentPage-3;
    btn3.innerHTML = currentPage-2;
    btn4.innerHTML = currentPage-1;
    btn5.innerHTML = currentPage;
        myFn();
    }
    else if (currentPage<5)
    {
    currentPage++;
    myFn();
}
})

last.addEventListener('click', () => {
    currentPage=20;
    btn1.innerHTML = currentPage-4;
    btn2.innerHTML = currentPage-3;
    btn3.innerHTML = currentPage-2;
    btn4.innerHTML = currentPage-1;
    btn5.innerHTML = currentPage;
    myFn();
})
