// try to enter New York, London or Barcelona
function attachEvents() {
    const elements = {
        inputField: document.getElementById('location'),
        button: document.getElementById('submit'),
        forecast: document.getElementById('forecast'),
        currentCondition: document.getElementById('current'),
        upcomingCondition: document.getElementById('upcoming')
    }
    const weatherSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    }
    elements.button.addEventListener('click', loadWeatherInfo)

    function loadWeatherInfo() {
        if (elements.inputField.value !== '') {
            fetch(`https://judgetests.firebaseio.com/locations.json`)
                .then(handler)
                .then(data => loadLocationWeatherInfo(data))
        }
    }
    function loadLocationWeatherInfo(data) {
        let location = data.find(el => el.name === elements.inputField.value);

        if (location !== undefined) {
            fetch(`https://judgetests.firebaseio.com/forecast/today/${location.code}.json`)
                .then(handler)
                .then(data => showLocationWeatherInfo(data, location.code))
            elements.inputField.value = '';
        }
        else {
            alert('Sorry, not available! Try another location.')
        }
    }
    function showLocationWeatherInfo(data, code) {
        elements.forecast.style.display = 'block';

        let divForecast = createHTMLElement('div', 'forecasts');
        let symbol = weatherSymbols[data.forecast.condition];
        let spanSymbol = createHTMLElement('span', ['condition', 'symbol'], symbol);
        let spanHolder = createHTMLElement('span', 'condition');
        let span1 = createHTMLElement('span', 'forecast-data', data.name);
        let degrees = `${data.forecast.low}${weatherSymbols.Degrees}/${data.forecast.high}${weatherSymbols.Degrees}`;
        let span2 = createHTMLElement('span', 'forecast-data', degrees);
        let span3 = createHTMLElement('span', 'forecast-data', data.forecast.condition);

        appendChildrenToParent([span1, span2, span3], spanHolder)
        appendChildrenToParent([spanSymbol, spanHolder], divForecast)

        elements.currentCondition.appendChild(divForecast);

        loadThreeDayForecastInfo(code)
    }
    function loadThreeDayForecastInfo(code) {
        fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(handler)
            .then(data => showThreeDayForecastInfo(data))
    }
    function showThreeDayForecastInfo(data) {
        let threeDayForecast = createHTMLElement('div', 'forecast-info');

        data.forecast.forEach(el => {
            let spanUpcoming = createHTMLElement('span', 'upcoming')
            let span1 = createHTMLElement('span', 'symbol', weatherSymbols[el.condition]);
            let degrees = `${el.low}${weatherSymbols.Degrees}/${el.high}${weatherSymbols.Degrees}`;
            let span2 = createHTMLElement('span', 'forecast-data', degrees);
            let span3 = createHTMLElement('span', 'forecast-data', el.condition);

            appendChildrenToParent([span1, span2, span3], spanUpcoming)
            appendChildrenToParent([spanUpcoming], threeDayForecast)
        })
        elements.upcomingCondition.appendChild(threeDayForecast);
    }
    function createHTMLElement(tagName, addClassName, addTextContent) {
        let currentElement = document.createElement(tagName);
        if (typeof addClassName == 'string') {
            currentElement.classList.add(addClassName);
        }
        else {
            currentElement.classList.add(...addClassName);
        }
        if (currentElement !== undefined) {
            currentElement.textContent = addTextContent;
        }
        return currentElement;
    }
    function appendChildrenToParent(children, parent) {
        children.forEach(child => {
            parent.appendChild(child)
        });
    }
    function handler(response) {
        if (response.status > 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`)
        }
        return response.json();
    }
}
attachEvents();