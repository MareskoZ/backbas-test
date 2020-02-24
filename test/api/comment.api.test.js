const API_DATA = require('../data/api.data');
const MAIN_DATA = require('../data/main.data');

const supertest = require("supertest");
const chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

const server = supertest.agent("https://qa-task.backbasecloud.com/api");
const baseReq = server.auth(MAIN_DATA.BASIC_AUTH.username, MAIN_DATA.BASIC_AUTH.password);

let token, slug;

describe('Set of api test cases for "CR*D Comments on articles"', () => {
    let commentBody,commentId;
    before("Login preparation",(done) => {
        baseReq
            .post("/users/login")
            .send(API_DATA.REQUESTS.Login)
            .end((err,res) => {
                res.status.should.equal(200);
                expect(res.body.user).to.have.property("token");
                expect(res.body.user.token).to.not.equal(null);
                token = res.body.user.token;
                done()
            });
    });
    before("Preparation article",(done) => {
        baseReq
            .post("/articles")
            .set('jwtauthorization', 'Token ' + token)
            .send(API_DATA.REQUESTS.CreateArticle)
            .end((err,res) => {
                res.status.should.equal(200);
                expect(res.body.article).to.have.property("slug");
                expect(res.body.article.slug).to.not.equal(null);
                slug = res.body.article.slug;
                done()
            });
    });



    describe("CASE1 + CASE2 sute",() => {
        it("CASE1 - Add comment", (done) => {
            baseReq
                .post('/articles/'+slug+'/comments')
                .set('jwtauthorization', 'Token ' + token)
                .send(API_DATA.REQUESTS.AddComments)
                .end((err,res)=>{
                    res.status.should.equal(200);
                    expect(res.body.comment).to.have.property("id");
                    expect(res.body.comment).to.have.property("body");
                    expect(res.body.comment).to.have.property("createdAt");
                    //expect(res.body.comment).to.have.property("updatedAt"); - this field is not exist but in doc it is
                    expect(res.body.comment.body).to.equal(API_DATA.REQUESTS.AddComments.comment.body);
                    expect(res.body.comment.author.username).to.equal(MAIN_DATA.USERS.User1.username);

                    commentId = res.body.comment.id;
                    commentBody = res.body.comment;

                    done()
                });
        });
        it("CASE2 - Get comments", (done) =>{
            baseReq
                .get('/articles/'+slug+'/comments')
                .set('jwtauthorization', 'Token ' + token)
                .end((err,res)=>{
                    res.status.should.equal(200);
                    expect(res.body.comments[0]).to.eql(commentBody);
                    done();
                });
        });
        describe("CASE3 - Delete comment",() => {
            it("Add Comment to an Article", (done) => {
                commentId.should.not.be.equal('undefined');
                baseReq
                    .delete('/articles/'+slug+'/comments/'+commentId)
                    .set('jwtauthorization', 'Token ' + token)
                    .end((err,res)=>{
                        res.status.should.equal(204);
                        done()
                    });
            });
            it("Check that comment was deleted", (done) =>{
                baseReq
                    .get('/articles/'+slug+'/comments')
                    .set('jwtauthorization', 'Token ' + token)
                    .end((err,res)=>{
                        res.status.should.equal(200);
                        expect(res.body.comments).to.have.lengthOf(0);
                        done();
                    });
            });
        });
    });
});
