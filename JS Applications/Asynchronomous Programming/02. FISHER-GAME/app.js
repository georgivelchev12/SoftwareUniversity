function attachEvents() {
    const elements = {
        loadBtn: document.querySelector('.load'),
        createBtn: document.querySelector('.add'),
        catches: document.querySelector('#catches')
    }
    elements.catches.children[0].style.display = 'none';

    elements.loadBtn.addEventListener('click', loadAllCatches)
    elements.createBtn.addEventListener('click', createCatch)

    function loadAllCatches() {
        fetch(`https://fisher-game.firebaseio.com/catches.json`, { method: 'GET', headers: { 'content-type': 'application/json' } })
            .then(handler)
            .then(showAllCatches)
    }
    function createCatch() {
        let catchElement = document.querySelector('#addForm');
        let data = [...catchElement.children]
            .filter(el => el.tagName == 'INPUT')
            .reduce((acc, curr) => {
                let prop = curr.className
                acc[prop] = curr.value;
                return acc;
            }, {});
        fetch(`https://fisher-game.firebaseio.com/catches.json`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(handler)
        .then(loadAllCatches)

    }
    function showAllCatches(data) { 
        for (const key in data) {
            let catchElement = elements.catches.children[0].cloneNode(true);

            catchElement.style.display = 'inline-block'

            catchElement.setAttribute('data-id', key);
            catchElement.querySelector('.angler').value = data[key].angler;
            catchElement.querySelector('.weight').value = data[key].weight;
            catchElement.querySelector('.species').value = data[key].species;
            catchElement.querySelector('.location').value = data[key].location;
            catchElement.querySelector('.bait').value = data[key].bait;
            catchElement.querySelector('.captureTime').value = data[key].captureTime;

            catchElement.querySelector('.update').addEventListener('click', updateCatch)
            catchElement.querySelector('.delete').addEventListener('click', deleteCatch)

            elements.catches.appendChild(catchElement)
        }
        function updateCatch(event) {
            let catchId = event.currentTarget.parentElement.getAttribute('data-id');
            let catchElement = event.currentTarget.parentElement;
            let data = [...catchElement.children]
                .filter(el => el.tagName == 'INPUT')
                .reduce((acc, curr) => {
                    let prop = curr.className
                    acc[prop] = curr.value;
                    return acc;
                }, {});

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(handler)
                .then(loadAllCatches)
        }
        function deleteCatch(event) {
            let catchId = event.currentTarget.parentElement.getAttribute('data-id');
            let catchElement = event.currentTarget.parentElement;

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            })
                .then(handler)
                .then(data => catchElement.remove())
        }

    }
    function handler(response) {
        if (response.status > 400) {
            throw new Error(`Error: ${response.statusText}`)
        }
        return response.json()
    }
}


attachEvents();

