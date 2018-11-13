function openJSON (json, callback) {
    let request = new XMLHttpRequest()
    request.open('GET', json, true)
    
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText)
            if (calback) callback(data);
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
        console.log(data)
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