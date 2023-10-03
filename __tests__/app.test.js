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
            expect(body.topics).toHaveLength(3)
            expect(Array.isArray(body.topics)).toBe(true)

            body.topics.forEach;{(obj) => expect(obj).toHaveProperty('slug').toHaveProperty('description')}
            
            
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