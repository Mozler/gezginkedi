main();
async function main() {
    const response = await (await fetch("/evlilik-list")).json()
    const allowedFields = ['category', 'item', 'lowPrice', 'highPrice', 'bought']
    if (response.length == 0) { return }
    const cont = document.getElementById("table-container")
    for (let i = 0; i < response.length; i++) {
        const tbl = document.getElementById(response[i].category)
        let row = tbl.insertRow()
        for (let prop of allowedFields) {
            if (allowedFields.includes(prop)) {
                const cell = row.insertCell()
                cell.className = prop
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
        const newCont = document.getElementById("new-item-container")
        newCont.style.visibility = "visible"
    })

    const closeButton = document.getElementById("closeModule")
    closeButton.addEventListener('click', (e) => {
        const newCont = document.getElementById("new-item-container")
        newCont.style.visibility = "hidden"
    })
}