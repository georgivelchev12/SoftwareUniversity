function solve(arr) {
    class Song {
        constructor(type,name,time) {
            this.type = type;
            this.name = name;
            this.time = time;
        }
    }

    let numOfSongs = arr.shift();
    let typeOfSong = arr.pop();
    let songs = [];
    for (let i = 0; i < numOfSongs; i++) {
        let splited = arr[i].split('_');
        let song = new Song(splited[0],splited[1],splited[2]);
        songs.push(song);
    }
    if (typeOfSong == 'all') {
        for (const i of songs) {
            console.log(i.name);
        }
    }
    else {
        let filtered = songs
        .filter(i => i.type == typeOfSong)
        .forEach(i=>console.log(i.name));
    }
}