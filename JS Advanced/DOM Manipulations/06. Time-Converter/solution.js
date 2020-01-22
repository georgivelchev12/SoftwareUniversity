function attachEventsListeners() {
   
    let daysInner = document.getElementById('days');
    let hoursInner = document.getElementById('hours');
    let minutesInner = document.getElementById('minutes');
    let secondsInner = document.getElementById('seconds');
 
    const show = x => {
        hoursInner.value = x * 24
        minutesInner.value = x * 24 * 60
        secondsInner.value = x * 24 * 60 * 60
        daysInner.value = x
    }
 
    const mapper = {
        days: e => e,
        hours: e => e / 24,
        minutes: e => e / 60 / 24,
        seconds: e => e / 60 / 60 / 24
    }
 
    const handler = e => {
        const callerId = e.target.previousElementSibling.id;
        const callerValue = e.target.previousElementSibling.value;
        show(mapper[callerId](callerValue))
    }
 
    Array.from(document.querySelectorAll('input[type="button"]'))
    .map(e => e.addEventListener('click', handler))
}