function solve(arr) {
    let artistPattern = /^[A-Z][a-z\s']+$/g;
    let songPattern = /^[A-Z\s]+$/g;
    let incrementation=0;
    let incrementationSong = 0;
    let counter = 0;
    let [artist,song] = arr[counter].split(':');
    let code = '';
    while(artist != 'end'){
        if(artist.match(artistPattern)
        && song.match(songPattern)){
            for (let i = 0; i < artist.length; i++) {
                incrementation = artist.charCodeAt(i) + artist.length;
                if (incrementation > 122 && (artist[i] === artist[i].toLowerCase())) {

                    incrementation-=123;
                    incrementation += 97;
                    code+= String.fromCharCode(incrementation);
                }
                else if (incrementation > 90 && (artist[i] === artist[i].toUpperCase())) {
                    incrementation-=90;
                    incrementation += 65;
                    code+= String.fromCharCode(incrementation);
                }
                else if (artist[i] == ' '){
                    code += ' ';
                }
                else if (artist[i] == "'"){
                    code+="'";
                }
                else{
                    code += String.fromCharCode(incrementation);
                }
                if(i == artist.length-1){
                    code += '@'
                }
            }
            for (let i = 0; i < song.length; i++) {
                incrementationSong = song.charCodeAt(i) + artist.length;
                if (incrementationSong > 90 && (song[i] === song[i].toUpperCase())) {
                    incrementationSong-=90;
                    incrementationSong += 64;
                    code+= String.fromCharCode(incrementationSong);
                }
               else if (song[i] == ' '){
                    code+=' ';
                }
                else {
                    code+=String.fromCharCode(incrementationSong);
                }
            }
            console.log(`Successful encryption: ${code}`);
        }
        else {
            console.log('Invalid input!');
        }
        counter++;
        [artist,song] = arr[counter].split(':');

        code = '';
    }
}
solve([ 'Eminem:VENOM',
    'Linkin park:NUMB',
    'Drake:NONSTOP',
    'Adele:HELLO',
    'end' ]
);