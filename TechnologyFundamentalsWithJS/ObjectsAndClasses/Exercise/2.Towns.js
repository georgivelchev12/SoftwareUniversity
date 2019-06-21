function solve(arr) {
    let obj = {};
    arr.forEach(element => {
        let [town,latitude,longitude] = element.split(' | ');
        latitude = (+latitude).toFixed(2);
        longitude = (+longitude).toFixed(2);
        obj['town'] = town;
        obj['latitude'] = latitude;
        obj['longitude'] = longitude;
        console.log(obj);
    });
    
    
}
solve(['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']);