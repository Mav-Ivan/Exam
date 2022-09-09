
window.onload = deleteElement


function editFunct() {
    let buttons = document.querySelectorAll('button.myBtn')
    // console.log(buttons);
    

    buttons.forEach((el) => {
        el.addEventListener('click', (e) => {

            let elementId = e.target.id;
            console.log(elementId);
            

            let editWindow = document.querySelector('#editWindow')
            editWindow.setAttribute("class", "show-modal")

            let editModalBtn = document.querySelector('#editModalBtn')
            let nameEdit = document.querySelector('input#nameEdit')
            let volumeEdit = document.querySelector('input#volumeEdit')
            let materialEdit = document.querySelector('input#materialEdit')
            let colorEdit = document.querySelector('input#colorEdit')
            let imageEdit = document.querySelector('input#imageEdit')

            
            
            // connect 
            
            editModalBtn.addEventListener("click", () => {
                let data = JSON.parse(localStorage.getItem('cups'))
                data.forEach((el, index) => {
                    if (elementId == el.id) {
                        console.log("FIND");
                        console.log(nameEdit.value);

                        el.name = nameEdit.value || el.name
                        el.volume =  volumeEdit.value || el.volume
                        el.material = materialEdit.value || el.material
                        el.color =  colorEdit.value || el.color
                        el.image = imageEdit.value || el.image
    
    
                    }
                })
                localStorage.setItem('cups', JSON.stringify(data))

                editWindow.setAttribute("class", "modal-invisible")
                document.location.reload()
            })

            nameEdit.value = ""
            volumeEdit.value = ""
            materialEdit.value = ""
            colorEdit.value = ""
            imageEdit.value = ""

        }
        );
    })
}

function deleteElement() {

    editFunct()
    let buttons = document.querySelectorAll('button.myDeleteBtn')
    buttons.forEach((el) => {
        el.addEventListener('click', (e) => {

            let elem = e.target.id;
            let del = document.getElementById(elem)
            del.remove()
            let data = JSON.parse(localStorage.getItem('cups'))
            data.forEach((el, index) => {
                if (el.id == elem) {
                    data.splice(index, 1)

                }
            })

            localStorage.setItem('cups', JSON.stringify(data))
        })
    })



}

let closeEditButton = document.querySelector('span.closeEditButton')

closeEditButton.addEventListener("click", () => {
    editWindow.setAttribute("class", "modal-invisible")

})

function deleteAllElements() {
    let main = document.querySelector('div#contentDiv')

    while (main.firstChild) {
        main.lastChild.remove()
    }
}

function creatDefaultElement(id, name, volume, material, color, image) {

    let main = document.querySelector('div#contentDiv')
    let div = document.createElement('div')
    let img = document.createElement('img')
    let nameElem = document.createElement('h5')
    let btn1 = document.createElement('button')
    let btn2 = document.createElement('button')
    let textDiv = document.createElement('div')
    let btnDiv = document.createElement('div')
    let volumeElem = document.createElement('p')
    let materialElem = document.createElement('p')
    let colorElem = document.createElement('p')

    img.src = image || "https://www.evasolo.com/globalassets/product-images_product-page/autumn-2018/886-x-886/202788_nordic-kitchen-kop-40-cl.jpg"
    img.setAttribute('class', "img")

    nameElem.setAttribute('class', "card-title")
    nameElem.innerText = name || "name"

    volumeElem.innerText = `Volume : ${volume || 100}`
    materialElem.innerText = `Material : ${material || "clay"}`
    colorElem.innerText = `Color : ${color || "black"}`

    textDiv.setAttribute('class', "p-2")
    textDiv.append(nameElem)
    textDiv.append(volumeElem)
    textDiv.append(materialElem)
    textDiv.append(colorElem)

    btn1.setAttribute('class', "myBtn btn btn-outline-primary")
    btn1.setAttribute('id', id)
    btn1.innerText = "Edit"
    btn2.setAttribute('class', "myDeleteBtn btn btn-outline-danger ms-2")
    btn2.setAttribute('id', id)
    btn2.innerText = "Delete"

    btnDiv.setAttribute('class', "p-2 d-flex justify-content-around")
    btnDiv.append(btn1)
    btnDiv.append(btn2)

    div.append(img)
    div.append(textDiv)
    div.append(btnDiv)

    div.setAttribute("class", "card myCard")
    div.setAttribute("id", id)
    main.append(div)
}

function creatElement(name, volume, material, color, image) {

    let data = JSON.parse(localStorage.getItem('cups'))
  
    // create dafault & add to string 

    console.log();
    data.push({
        'id': data.length, "name": name, "volume": volume, "material": material,
        "color": color, "image": image
    })
    localStorage.setItem('cups', JSON.stringify(data))


    let main = document.querySelector('div#contentDiv')
    let div = document.createElement('div')
    let img = document.createElement('img')
    let nameElem = document.createElement('h5')
    let btn1 = document.createElement('button')
    let btn2 = document.createElement('button')
    let textDiv = document.createElement('div')
    let btnDiv = document.createElement('div')
    let volumeElem = document.createElement('p')
    let materialElem = document.createElement('p')
    let colorElem = document.createElement('p')

    img.src = image || "https://www.evasolo.com/globalassets/product-images_product-page/autumn-2018/886-x-886/202788_nordic-kitchen-kop-40-cl.jpg"
    img.setAttribute('class', "img")

    nameElem.setAttribute('class', "card-title")
    nameElem.innerText = name

    volumeElem.innerText = `Volume : ${volume}`
    materialElem.innerText = `Material : ${material}`
    colorElem.innerText = `Color : ${color}`

    textDiv.setAttribute('class', "p-2")
    textDiv.append(nameElem)
    textDiv.append(volumeElem)
    textDiv.append(materialElem)
    textDiv.append(colorElem)

    btn1.setAttribute('class', "myBtn btn btn-outline-primary")
    btn1.setAttribute('id', `ed${data.length}`)
    btn1.innerText = "Edit"
    btn2.setAttribute('class', "myDeleteBtn btn btn-outline-danger ms-2")
    btn2.setAttribute('id', `de${data.length}`)
    btn2.innerText = "Delete"

    btnDiv.setAttribute('class', "p-2 d-flex justify-content-around")
    btnDiv.append(btn1)
    btnDiv.append(btn2)

    div.append(img)
    div.append(textDiv)
    div.append(btnDiv)

    div.setAttribute("class", "card myCard")
    div.setAttribute("id", `cont${data.length}`)
    main.append(div)


}

let data = JSON.parse(localStorage.getItem('cups'))

if (data !== null ) {
    for (let i = 0; i < data.length; i++) {
        creatDefaultElement(data[i].id, data[i].name, data[i].volume,
            data[i].material, data[i].color, data[i].image)
    }
} else {
    fetch('./cups.json')
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                creatDefaultElement(data[i].id, data[i].name, data[i].volume,
                    data[i].material, data[i].color, data[i].image)
            }
            
            let str = JSON.stringify(data)

            localStorage.setItem('cups', str)
        })
}

let searchId = document.querySelector('input#searchId')
let searchBtnId = document.querySelector('button#searchBtnId')
let countBtn = document.querySelector('button#countBtn')
let cancelBtn = document.querySelector('button#cancelBtn')
let createCupBtn = document.querySelector('button#createCupBtn')
let modal = document.querySelector("div#createWindow");
let closeButton = document.querySelector("span.close-button");
let createModalBtn = document.querySelector("button#createModalBtn")



createModalBtn.addEventListener('click', () => {
    let nameInp = document.querySelector("input#nameInp")
    let volumeInp = document.querySelector("input#volumeInp")
    let materialInp = document.querySelector("input#materialInp")
    let colorInp = document.querySelector("input#colorInp")
    let imageInp = document.querySelector("input#imageInp")

    creatElement(nameInp.value, volumeInp.value, materialInp.value, colorInp.value, imageInp.value)
    modal.setAttribute("class", "modal-invisible")


    document.location.reload()

})

createCupBtn.addEventListener("click", (e) => {
    modal.setAttribute("class", "show-modal")
    nameInp.value = ""
    volumeInp.value = ""
    materialInp.value = ""
    colorInp.value = ""
    imageInp.value = ""


});

closeButton.addEventListener("click", () => {
    modal.setAttribute("class", "modal-invisible")

});

cancelBtn.addEventListener('click', () => {

    deleteAllElements()

    let data = JSON.parse(localStorage.getItem('cups'))

    for (let i = 0; i < data.length; i++) {
        creatDefaultElement(data[i].id, data[i].name, data[i].volume,
            data[i].material, data[i].color, data[i].image)
    }


    deleteElement()


})

countBtn.addEventListener('click', (e) => {
    let res = 0
    let countInfo = document.querySelector('p#countInfo')
    let cards = document.querySelectorAll('div.myCard')

    cards.forEach((el) => {
        let index = el.innerText.indexOf("Volume")
        let num = el.innerText.slice(index + 9, index + 13)
        res += parseInt(num)
        countInfo.innerHTML = `<b>${res}</b>`
    })

})


searchBtnId.addEventListener('click', () => {
    deleteAllElements()


    console.log(searchId.value);
    let text = searchId.value
    let searchArr = []
    let data = JSON.parse(localStorage.getItem('cups'))

    console.log(data.name);
    data.forEach(el => {
        if (el.name.includes(text)) {
            searchArr.push(el)
        }
    });
    console.log(searchArr);
    for (let i = 0; i < searchArr.length; i++) {
        creatDefaultElement(searchArr[i].id, searchArr[i].name, searchArr[i].volume,
            searchArr[i].material, searchArr[i].color, searchArr[i].image)
    }

    deleteElement()

    
})

let sortSwitch = document.querySelector('input#switch')

sortSwitch.addEventListener('click', () => {

    if (sortSwitch.checked) {
        

        let main = document.querySelector('div#contentDiv').children

        let arr = []
        for (const key of main) {
            arr.push(key)
        }
   

        let sortArr = arr.sort((a, b) => {
            return a.children[1].children[1].innerText.slice(9) - b.children[1].children[1].innerText.slice(9)
        }).reverse()
        // console.log(sortArr);

        let localSortArr = []
        sortArr.forEach(el => {
            let id = el.id.slice(4)
            localSortArr.push({'id': id, "name": el.children[1].children[0].innerText, "volume": el.children[1].children[1].innerText.slice(9), "material": el.children[1].children[2].innerText.slice(11),
        "color": el.children[1].children[3].innerText.slice(8), "image": el.children[0].src})
        // console.log(el.children[1].children[3].innerText.slice(8));
        })
        localStorage.setItem('sortCups' , JSON.stringify(localSortArr))

        deleteAllElements()
        sortArr.forEach((el ) => {
            creatDefaultElement(el.id, el.children[1].children[0].innerText, el.children[1].children[1].innerText.slice(9) , el.children[1].children[2].innerText.slice(11) , el.children[1].children[3].innerText.slice(8) , el.children[0].src)
        });

        deleteElement()

            

    } else {

            deleteAllElements()

        let data = JSON.parse(localStorage.getItem('cups'))

        data.forEach(el => {

            creatDefaultElement(el.id, el.name, el.volume , el.material , el.color , el.image)
        });




        deleteElement()
       
    }

})

















