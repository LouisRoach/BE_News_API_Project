const { topicData, userData, articleData, commentData } = require('../db/data/test-data/')
const seed = require('../db/seeds/seed');
const request = require ('supertest');
const app = require('../app');
const db = require('../db/connection');
const endpoints = require('../db/endpoints.json')


beforeEach(() => {
    return seed({topicData, userData, articleData, commentData})
})

afterAll(() =>{
    db.end()
})

describe('GET /api/topics' , () =>{
    it('responds with an array of topic objects with correct properties' , () =>{
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) =>{
            console.log(body)
            expect(body.topics).toHaveLength(3)
            expect(Array.isArray(body.topics)).toBe(true)

            body.topics.forEach((obj) => expect(obj).toHaveProperty('description'));

           body.topics.forEach((obj) => expect(obj).toHaveProperty('slug'))
            
            
        })

    })
    
        
    })

    describe('GET /api', () => {
        it('responds with JSON containing all endpoints',  () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => { 
                expect(body).toEqual(endpoints)})
          
        });
      });

      describe('GET /api/articles/:article_id' , () =>{
        it('responds with an article object with correct properties',() =>{
            return request(app)
            .get('/api/articles/13')
            .expect(200)
            .then(({body}) =>{
                console.log(body.article, "test")
                expect(body.article).toHaveProperty('author')
                expect(body.article).toHaveProperty('title')
                expect(body.article).toHaveProperty('article_id')
                expect(body.article).toHaveProperty('body')
                expect(body.article).toHaveProperty('body')
                expect(body.article).toHaveProperty('created_at')
                expect(body.article).toHaveProperty('votes')
                expect(body.article).toHaveProperty('article_img_url')
                 })
        })
    
    
    it('responds with error an message if invalid article id is passed' , () =>{
        return request(app)
        .get('/api/articles/14')
        .expect(404)
        .then(({body}) =>{
            console.log(body)
            expect(body).toEqual({msg: '404 not found'})
        })
      })
    
    })
    

    describe('GET /api/articles' , ()=>{
        it('responds with array of objects each having correct properties' , () =>{
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body})=>{

                console.log(body)
               

                body.articles.forEach((article) => expect(article).toHaveProperty('topic'));
                body.articles.forEach((article) => expect(article).toHaveProperty('title'));
                body.articles.forEach((article) => expect(article).toHaveProperty('article_id'));
                body.articles.forEach((article) => expect(article).toHaveProperty('created_at'));
                body.articles.forEach((article) => expect(article).toHaveProperty('votes'));
                body.articles.forEach((article) => expect(article).toHaveProperty('article_img_url'));
                body.articles.forEach((article) => expect(article).toHaveProperty('comment_count'));


               
            })
        })

        
    })

    describe('GET /api/articles/:article_id/comments' , () => {
        it('responds with an array of comments for the given article_id with correct properties' , () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) =>{
                console.log(body)
                
                body.comment.forEach((comment) => expect(comment).toHaveProperty('comment_id'))
                body.comment.forEach((comment) => expect(comment).toHaveProperty('votes'))
                body.comment.forEach((comment) => expect(comment).toHaveProperty('created_at'))
                body.comment.forEach((comment) => expect(comment).toHaveProperty('author'))
                body.comment.forEach((comment) => expect(comment).toHaveProperty('body'))
                body.comment.forEach((comment) => expect(comment).toHaveProperty('article_id'))

             })

        })

        it('responds with an error if link is for non-existent is passed' , () => {
            return request(app)
            .get('/api/articles/15/comments')
            .expect(404)
            .then(({body}) =>{
                console.log(body)
               
                expect(body).toEqual({msg: '404 article not found'})

        }) 
    })

   it('responds with an error message if article has no comments' , () =>{
    return request(app)
    .get('/api/articles/8/comments')
    .expect(200)
    .then(({body})=>{
        console.log(body)
        expect(body).toEqual({msg: 'article has no comments'})

    })
   })

 


})
      

  describe('POST /api/articles/:article_id/comments' , () => {
        it('accepts an object with username and body, responds with posted comment', () =>{
            return request(app)
            .post('/api/articles/8/comments')
            .send({body:'Hello', username: 'butter_bridge'})
            .expect(200)
            .then(({body})=> {

                console.log(body)

                expect(body.comment).toHaveProperty('author')
                expect(body.comment).toHaveProperty('body')

                
                

            })
        } )
    })

    describe.only('GET /api/users' , () => {
        it('responds with an array of users objects with correct properties' , () =>{
            return request(app)
            .get('/api/users')
            .expect(200)
            .then(({body})=>{
                console.log(body)
                expect(Array.isArray(body)).toBe(true)
                body.forEach((user) => expect(user).toHaveProperty('username'))
                body.forEach((user) => expect(user).toHaveProperty('name'))
                body.forEach((user) => expect(user).toHaveProperty('avatar_url'))

            })
        }  )
    })