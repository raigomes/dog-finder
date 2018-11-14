import {item} from './dog-item.js'

function openJSON (json, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', json, true)
    
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText)
            if (callback) callback(data);
        } else {                
            console.log('Falha na requisição http: ', request.status, request.statusText)
        }            
    };

    request.onerror = () => {
        console.log("ERRO ao retornar conteúdo JSON")
    };
    
    request.send()
}

function fillDogList() {
    let containerNode = document.querySelector(".dog-container")
    let list = document.querySelector(".dog-list")
    
    if (list === null || list === undefined ) {
        list = document.createElement("div")
        list.setAttribute("class", "dog-list")
    }    

    openJSON('json/breeds.json', (data) => {
        list.innerHTML = ""

        data.forEach(element => {
            item.setAttribute('data-dog-id', element.id)
            item.querySelector('dog-name').innerHTML = element.name
            item.querySelector('dog-temperament').innerHTML = element.temperament
            item.querySelector('dog-photo').setAttribute('src', `images/${element.id}.jpg`)
                                           .setAttribute('alt', `Foto de ${element.name}`)

            list.appendChild(item)
        });

        document.querySelector(".dog-container").innerHTML = list
    })
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        fillDogList()
    }
}

/*
let items = document.querySelectorAll('.dog-list-item') 
items.forEach((item) => {
    document.addEventListener('click', (dog) => {
        let id = dog.getAttribute('data-dog-id')
        showDogDescription(id)
    })
})
*/