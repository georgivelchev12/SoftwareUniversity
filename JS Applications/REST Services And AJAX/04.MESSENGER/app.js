function attachEvents() {
    const inputs = {
        messages: document.getElementById('messages'),
        author: document.getElementById('author'),
        content: document.getElementById('content'),
        submitBtn: document.getElementById('submit'),
        refreshBtn: document.getElementById('refresh')
    }
    const url = `https://rest-messanger.firebaseio.com/messanger.json`;
    inputs.submitBtn.addEventListener('click', () => {
        if (inputs.author.value != '' && inputs.content.value != '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    author: inputs.author.value,
                    content: inputs.content.value
                })
            })
            fetchFunction();
            inputs.author.value = '';
            inputs.content.value = '';
        }
    })
    inputs.refreshBtn.addEventListener('click', fetchFunction)

    function fetchFunction() {
        fetch(url)
            .then(handler)
            .then(data => loadData(data))
    }
    function loadData(data) {
        inputs.messages.textContent = ``;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                inputs.messages.textContent += `${data[key].author}: ${data[key].content}\n`
            }
        }
    }
    function handler(response) {
        if (response.status > 400) {
            throw new Error(`${response.status} (${response.statusText})`);
        }
        return response.json()
    }
}

attachEvents();