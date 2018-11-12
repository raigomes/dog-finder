function fillDogList() {
    let containerNode = document.querySelector(".dog-container")
    let list = document.querySelector(".dog-list")
    
    if (list === null || list === undefined ) {
        list = document.createElement("div")
        list.setAttribute("class", "dog-list");
    }

    let request = new XMLHttpRequest();
    request.open('GET', 'json/breeds.json', true);
    
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            //containerNode.innerHTML = list;
            console.log('success!', request);
        } else {                
            console.log('The request failed!');
        }            
    };

    request.onerror = () => {
        console.log("ERRO ao retornar conteúdo JSON");
    };
    
    request.send();    
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