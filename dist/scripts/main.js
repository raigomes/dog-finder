function openJSON (json, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', json, true)
    
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText)
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
            var item = `<div class="dog-list-item" data-dog-id="${element.id}">
                            <img src="images/${element.id}.jpg" alt="Foto do ${element.name}" class="dog-photo">
                            <div class="dog-name">${element.name}</div>
                            <div class="dog-temperament">${element.temperament}</div>
                        </div>`            

            list.innerHTML = item
        });

        document.querySelector(".dog-container").innerHTML = list
    })
}

document.addEventListener('DOMContentLoaded', function() {
   fillDogList()
}, false);

/*
let items = document.querySelectorAll('.dog-list-item') 
items.forEach((item) => {
    document.addEventListener('click', (dog) => {
        let id = dog.getAttribute('data-dog-id')
        showDogDescription(id)
    })
})
*/