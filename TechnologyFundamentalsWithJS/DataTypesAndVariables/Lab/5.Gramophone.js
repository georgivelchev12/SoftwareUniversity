function solve(bandName,albumName,songName) {
    let duration = (albumName.length * bandName.length) * songName.length / 2;
    let rotations = duration / 2.5;
    console.log(`The plate was rotated ${Math.ceil(rotations)} times.`);
}