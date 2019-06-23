solve = (arr) => {
    let result = {};
    arr.forEach(elem => {
        if (elem !== 'starts time'
            && !(elem == 'by likes')
            && !(elem == 'by views')) {
            if (elem.includes('-')) {
                let [song, views] = elem.split('-');
                if (!(song in result)) {
                    result[song] = { 'views': +views, likes: 0 };
                }
                else {
                    result[song]['views'] += +views;
                }
            }
            else if (elem.includes(':')) {
                let [likeOrDislike, song] = elem.split(':')
                if ((song in result)) {
                    if (likeOrDislike == 'like') {
                        result[song].likes += 1;
                    }
                    else if (likeOrDislike == 'dislike') {
                        result[song].likes -= 1;
                    }
                }

            }
        }
        else if (elem === 'by likes') {
            Object.entries(result)
                .sort((a, b) => b[1]['likes'] - a[1]['likes'])
                .map(x => console.log(`${x[0]} - ${x[1]['views']} views - ${x[1]['likes']} likes`))


        }
        else if (elem === 'by views') {
            Object.entries(result)
                .sort((a, b) => b[1]['views'] - a[1]['views'])
                .map(x => console.log(`${x[0]} - ${x[1]['views']} views - ${x[1]['likes']} likes`))

        }

    });

}
solve(['Eninem Venom-500',
    'like:Eninem Venom',
    'Funny Cats-700',
    'like:Funny Cats',
    'like:Funny Cats',
    'Eninem Venom-300',
    'stats time',
    'by likes']);