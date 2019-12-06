function getInfo() {
    let baseServiceUrl = "https://judgetests.firebaseio.com/businfo/";
    let stopIdInputValue = document.getElementById('stopId');
    let stopName = document.getElementById('stopName');
    let bussUl = document.getElementById('buses');
    let url = baseServiceUrl + stopIdInputValue.value + ".json"

    fetch(url)
        .then((info) => info.json())
        .then((data) => {
            stopName.textContent = data.name;
            bussUl.innerHTML = '';
            Object.entries(data.buses)
                .forEach(el => {
                    let li = document.createElement('li');
                    li.textContent = `Bus ${el[0]} arrives in ${el[1]} minutes`;
                    bussUl.appendChild(li);
                });
            stopIdInputValue.value = ``;
        })
        .catch((error) => {
            stopName.textContent = `Error`;
        })
}