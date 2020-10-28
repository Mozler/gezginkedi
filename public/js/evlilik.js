main();
async function main() {
    const response = await (await fetch("/evlilik-list")).json()
    const allowedFields = ['item', 'lowPrice', 'highPrice', 'bought']
    if (response.length == 0) { return }
    const cont = document.getElementById("table-container")
    for (let i = 0; i < response.length; i++) {
        const tbl = document.getElementById(response[i].category)
        let row = tbl.insertRow()
        for (let prop of allowedFields) {
            if (allowedFields.includes(prop)) {
                const cell = row.insertCell()
                if (prop == "item") {
                    cell.className = "item " + response[i]._id
                    cell.addEventListener('click', async (e) => {
                        const itemRes = await (await fetch(`/evlilik/${response[i]._id}`)).json()
                        console.log(itemRes)
                        document.getElementById("new-item-container").style.visibility = "visible"
                        document.getElementById("new-category-field").value = itemRes.category
                        document.getElementById("new-item-field").value = itemRes.item
                        document.getElementById("new-lowPrice-field").value = itemRes.lowPrice
                        document.getElementById("new-highPrice-field").value = itemRes.highPrice
                        itemRes.bought ? document.getElementById("new-bought-field").checked = true : document.getElementById("new-bought-field").checked = false

                    })
                } else { cell.className = prop }


                if (response[i][prop] === true || response[i][prop] === false) {
                    cell.innerText = response[i][prop] === true ? "Evet" : "Hayır"
                } else {
                    cell.innerText = response[i][prop]
                }
            }
        }
        const alindi = row.insertCell()
        alindi.className = "link " + response[i]._id
        alindi.innerText = "✔"
        alindi.style.cursor = "pointer"
        alindi.addEventListener(('click'), (e) => {
            const _id = e.target.className.replace("link ", "")
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({ _id, "bought": true });
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("/evlilik", requestOptions)
                .then(response => response.text())
                .then(result => location.reload())
                .catch(error => console.log('error', error));
        })

    }


    const sbox = document.getElementById("room-select")
    sbox.addEventListener('change', (e) => {
        if (sbox.value !== 'empty') {
            const tables = document.querySelectorAll("table")
            if (sbox.value === 'hepsi') {
                tables.forEach((table) => table.style.display = "")
            } else {
                tables.forEach((table) => table.style.display = "none")
                const selectedRoom = document.getElementById(sbox.value)
                selectedRoom.style.display = ""
            }
        }
    })


    const addNew = document.getElementById("new-item-show")
    addNew.addEventListener('click', (e) => {
        document.getElementById("new-item-container").style.visibility = "visible"
        document.body.classList.toggle("modal-open");
        document.getElementsByTagName("header")[0].firstElementChild.classList.toggle("hue");
    })

    const closeButton = document.getElementById("close-button")
    const newCont = document.getElementById("new-item-container")
    const addNewButton = document.getElementById("add-new-item")
    const addLinkButton = document.getElementById("add-link-button")
    closeButton.addEventListener('click', (e) => {
        newCont.style.visibility = "hidden"
        document.body.classList.toggle("modal-open");
        document.getElementsByTagName("header")[0].firstElementChild.classList.toggle("hue");
        resetNewContainer()
    })
    newCont.addEventListener('click', (e) => {
        if (e.target.id === "new-item-container") {
            newCont.style.visibility = "hidden"
            document.body.classList.toggle("modal-open");
            document.getElementsByTagName("header")[0].firstElementChild.classList.toggle("hue");
            resetNewContainer()
        }
    })
    addNewButton.addEventListener('click', (e) => {
        const alertWindow = document.getElementById("alert-popup")
        const alertText = document.getElementById("alert-text")
        alertWindow.style.visibility = "visible"
        alertWindow.style.opacity = 100
        alertText.innerText = "Eklendi"
        setTimeout(() => {
            alertWindow.style.opacity = 0
            alertWindow.style.visibility = "hidden"
        }, 3000);
    })

    addLinkButton.addEventListener('click', (e) => {

        const parent = addLinkButton.parentNode;
        const newCont = document.getElementById("new-item-content").insertBefore(parent.cloneNode(true), parent);
        newCont.firstChild.disabled = true;
        parent.firstChild.value = "";
        newCont.removeChild(newCont.children[1]);
    })
}

function resetNewContainer() {
    const urls = document.querySelectorAll(".new-url-input");
    if (urls.length > 1) {
        for (let i = 0; i < urls.length - 1; i++) {
            urls[i].remove();
        }
    }
    document.getElementById("new-category-field").value = ""
    document.getElementById("new-item-field").value = ""
    document.getElementById("new-lowPrice-field").value = ""
    document.getElementById("new-highPrice-field").value = ""
    document.getElementsByClassName("new-url-field")[0].value = ""
    document.getElementById("new-bought-field").checked = false
}