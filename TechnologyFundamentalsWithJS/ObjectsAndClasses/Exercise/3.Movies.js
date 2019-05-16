function solve(arr) {
    let movies = {};
    let addMovies = [];
    let director = [];
    let cloneArr = [];
    let date = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('add movie')) {
            let currentIndex = arr.indexOf(arr[i]);
            addMovies.push(arr[i].split(' ').slice(2).join(' '));
            cloneArr = arr.slice(currentIndex + 1);
            let movieName = addMovies[i];
            for (let j = 0; j < cloneArr.length; j++) {
                if (cloneArr[j].includes(movieName + ' directed by ')) {
                    let indexx = cloneArr.indexOf(cloneArr[i]);
                    let currentIndexOfBy = cloneArr[j].split(' ');
                    currentIndexOfBy = currentIndexOfBy.indexOf('by');
                    director.push(cloneArr[j].split(' ').slice(currentIndexOfBy + 1).join(' '))
                    movies["name"] = movieName;
                    movies["director"] = director[i];
                    newArr = cloneArr.slice(indexx + 1)
                    for (let k = 0; k < newArr.length; k++) {
                        if (newArr[k].includes(movieName + ' on date ')) {
                            let currentIndexOfDate = newArr[k].split(' ');
                            currentIndexOfDate = currentIndexOfDate.indexOf('date');
                            date.push(newArr[k].split(' ').slice(currentIndexOfDate + 1).join(' '))
                            movies["date"] = date[i];
                            if (movies["name"].length >=0 
                            && movies["director"].length >= 0
                            &&movies["date"].length >= 0) {
                                console.log(JSON.stringify(movies));
                            }
                            
                        }
                    }
                }
            }
        }
    }
}
solve(['add movie Fast and Furious',
    'add movie Godfather',
    'Inception directed by Christopher Nolan',
    'Godfather directed by Francis Ford Coppola',
    'Godfather on date 29.07.2018',
    'Fast and Furious on date 30.07.2018',
    'Batman on date 01.08.2018',
    'Fast and Furious directed by Rob Cohen']
)