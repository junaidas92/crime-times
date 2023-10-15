const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')





newsRouter.get('', async(req, res) => {
    const searchTerm = 'India-crime';
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&from=2023-09-11&sortBy=publishedAt&apiKey=dcb8bdab96d44e5dbda6f34b1453431a`)
        res.render('news', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('news', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:index', async (req, res) => {
    const articleIndex = req.params.index;
    const searchTerm = 'India-crime';
    try {
        // Fetch the specific article using the articleIndex
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&from=2023-09-11&sortBy=publishedAt&apiKey=dcb8bdab96d44e5dbda6f34b1453431a`);
        const article = newsAPI.data.articles[articleIndex];

        if (article) {
            res.render('newsSingle', { article });
        } else {
            // Handle the case when the article with the specified index is not found
            res.render('newsSingle', { article: null });
        }
    } catch (err) {
        console.error('Error', err);
        res.render('newsSingle', { article: null });
    }
});


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${search}&from=2023-09-11&sortBy=publishedAt&apiKey=dcb8bdab96d44e5dbda6f34b1453431a`)
        res.render('newsSearch', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})



module.exports = newsRouter 