const { topicData, userData, articleData, commentData } = require('../db/data/test-data/')
const seed = require('../db/seeds/seed');
const request = require ('supertest');
const app = require('../app');
const db = require('../db/connection');
const { forEach } = require('../db/data/test-data/topics');

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
            console.log(body.topics)
            expect(Array.isArray(body.topics)).toBe(true)

            body.topics.forEach((obj) => expect(obj).toHaveProperty('slug'))
            body.topics.forEach((obj) => expect(obj).toHaveProperty('description'))

            /*expect(Object.hasOwn(body.topics[0],'slug','description')).toBe(true)
            expect(Object.hasOwn(body.topics[1],'slug','description')).toBe(true)
            expect(Object.hasOwn(body.topics[2],'slug','description')).toBe(true)*/

        })

    })
    
        
    })
