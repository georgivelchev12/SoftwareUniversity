function lockedProfile() {
    Array.from(document.getElementsByTagName('button'))
    .map(e => e.addEventListener('click',e =>{
        let isUnlocked = e.target.parentElement.getElementsByTagName('input')[1].checked == true
        if(isUnlocked){
            let divStyle = Array.from(e.target.parentElement.getElementsByTagName('div'))[0].style;
            if(divStyle.display == ''){
                divStyle.display = 'block';
                e.target.textContent = 'Hide it';
            }
            else {
                divStyle.display = '';
                e.target.textContent = 'Show more';
            }
        }
    }))
}