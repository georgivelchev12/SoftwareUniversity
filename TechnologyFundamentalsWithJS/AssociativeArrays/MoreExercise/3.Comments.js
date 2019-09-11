solve = (arr) => {
    let result = {};
    let users = [];
    let articles = [];

    arr.forEach(elem => {
        if (elem.split(' ')[0] === 'article') {
            let [, article] = elem.split(' ');
            articles.push(article);
        }
        else if (elem.split(' ')[0] === 'user') {
            let [, user] = elem.split(' ');
            users.push(user);
        }
        else {
            let [userAndArticle, titleAndCom] = elem.split(': ');
            let [currUser, currArticle] = userAndArticle.split(' posts on ');
            let [title, com] = titleAndCom.split(', ');

            if (users.includes(currUser)
                && articles.includes(currArticle)) {
                if (!Object.keys(result).includes(currArticle)) {
                    result[currArticle] = [];
                }
                result[currArticle].push([currUser, `${title} - ${com}`])
            }
        }
    });
    Object.entries(result)
        .sort((a, b) => b[1].length - a[1].length)
        .forEach(e => {
            console.log(`Comments on ${e[0]}`);
            e[1].sort((a, b) => a[0].localeCompare(b[0]))
                .forEach(x => console.log(`--- From user ${x[0]}: ${x[1]}`))
        })
}

solve(['user aUser123',
    'someUser posts on someArticle: NoTitle, stupidComment',
    'article Books',
    'article Movies',
    'article Shopping',
    'user someUser',
    'user uSeR4',
    'user lastUser',
    'uSeR4 posts on Books: I like books, I do really like them',
    'uSeR4 posts on Movies: I also like movies, I really do',
    'someUser posts on Shopping: title, I go shopping every day',
    'someUser posts on Movies: Like, I also like movies very much'])