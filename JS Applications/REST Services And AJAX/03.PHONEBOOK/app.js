function attachEvents() {
    let btnLoad = document.getElementById('btnLoad');
    let btnCreate = document.getElementById('btnCreate');
    let phonebookUl = document.getElementById('phonebook');
    let personInput = document.getElementById('person');
    let phoneInput = document.getElementById('phone');

    let url = `https://phonebook-nakov.firebaseio.com/phonebook.json`
    btnLoad.addEventListener('click', () => {
        removeData()
        fetch(url)
            .then(request => request.json())
            .then(data => loadData(data))
            .catch(error => displayError());
    })
    btnCreate.addEventListener('click', () => {
        removeData()
        let newContactJSON = JSON.stringify({
            person: personInput.value,
            phone: phoneInput.value
        });

        fetch(url, {
            method: 'POST',
            body: newContactJSON
        })

        fetch(url)
            .then(request => request.json())
            .then(data => loadData(data))
            .catch(error => displayError());
    })

    function loadData(data) {
        for (let key in data) {
            let name = data[key]['person'];
            let phoneNumber = data[key]['phone'];

            let delBtn = document.createElement('button');
            delBtn.textContent = 'DELETE';
            let listItem = document.createElement('li');

            listItem.textContent = `${name}: ${phoneNumber}`;
            listItem.appendChild(delBtn);

            phonebookUl.appendChild(listItem);

            delBtn.addEventListener('click', () => {
                delBtn.parentElement.remove()
                fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`, {
                    method: 'DELETE'
                }).catch(error => displayError());
            })
        }
    }

    function displayError(err) {
        let listItem = document.createElement('li');
        listItem.textContent = `Error`;
        phonebookUl.appendChild(listItem);

    }

    function removeData() {
        document.querySelectorAll('#phonebook li').forEach(el => {
            el.remove();
        })
    }

}

attachEvents();