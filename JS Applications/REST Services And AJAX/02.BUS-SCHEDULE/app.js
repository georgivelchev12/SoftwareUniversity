function solve() {
    const info = document.getElementsByClassName('info')[0];
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let baseUrl = `https://judgetests.firebaseio.com/schedule/`;
    let currentStopID = 'depot';
    let currentStop = '';

    function depart() {
        let url = baseUrl + currentStopID + `.json`;
        fetch(url)
            .then(request => request.json())
            .then(data => loadStop(data))
            .catch(error => {
                info.textContent = `Error`;
                arriveBtn.disabled = true;
                departBtn.removeAttribute('disabled')
            });
    }

    function arrive() {
        info.textContent = `Arriving at ${currentStop.name}`;
        currentStopID = currentStop.next;
        departBtn.removeAttribute('disabled');
        arriveBtn.disabled = true;
    }
    function loadStop(data) {
        currentStop = data;
        info.textContent = `Next stop ${currentStop.name}`;
        currentStopID = currentStop.next;
        departBtn.setAttribute('disabled', true);
        arriveBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

// function solve() {
//     const url = 'https://judgetests.firebaseio.com/schedule/';
//     let nameBusStation = '';
//     let nextID = 'depot';
//     function depart() {
//         $('#depart').prop('disabled', true);
//         $.get(url + nextID + '.json').then((response)=> {
//             //console.log(response);
//             nameBusStation = response.name;
//             nextID = response.next;
//             $('#info').find('span').text('Next stop '+ nameBusStation);
//             $('#arrive').prop('disabled', false);
//         })
//     }
//     function arrive() {
//         $('#depart').prop('disabled', false);
//         $('#arrive').prop('disabled', true);
//         $('#info').find('span').text('Arriving at '+ nameBusStation);
//     }
//     return {
//         depart,
//         arrive
//     };
// }