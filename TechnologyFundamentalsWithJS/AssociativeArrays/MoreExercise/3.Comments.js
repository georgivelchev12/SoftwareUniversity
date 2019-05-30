function solve(input) {

    let userList = []
    let userObj = {};
    let articlesObj = {};
    for (const line of input) {
        if (line.includes('user ')) {

            let user = line.split(' ')[1];
            if (!userObj.hasOwnProperty(user)) {
                userObj[user] = [];
            }
        }
        else if (line.includes(' posts on ')) {
            let [userArticleLine, comment] = line.split(': ');
            let userName = userArticleLine.split(' ')[0]
            let article = userArticleLine.split(' ')[3]
            if (articlesObj.hasOwnProperty(article)
                && userObj.hasOwnProperty(userName)) {
               articlesObj[article].push(userObj[userName].push(comment))
                
            }

        }
        else if (line.includes('article ')) {
            let article = line.split(' ')[1];
            if (!articlesObj.hasOwnProperty(article)) {
                articlesObj[article] = [];
            }
        }
    }
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