const API_DATA = require('../data/api.data');
const MAIN_DATA = require('../data/main.data');
const XPATH_DATA = require('../data/xpath.data');
const base_page = require('./pages/base_page');

const supertest = require("supertest");
const chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

const server = supertest.agent("https://"+MAIN_DATA.BASE_URL+"/api");
const baseReq = server.auth(MAIN_DATA.BASIC_AUTH.username, MAIN_DATA.BASIC_AUTH.password);

let commentText = 'This test is completed!';
let Page;

describe('Set of UI test cases for "CR*D Comments on articles"', () => {
    let token, slug;
    let driver;
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
    describe('CASE1 - Add a comment', () =>{

        before("Create browser session", (done) => {
            driver =  new webdriver.Builder().forBrowser('chrome').build();
            Page =  new base_page(driver);
            driver.get('https://candidatex:qa-is-cool@'+MAIN_DATA.BASE_URL+'/');
            driver.executeScript("window.localStorage.setItem('jwtToken','"+ token +"')");
            driver.navigate().refresh();
            driver.get("https://"+MAIN_DATA.BASE_URL+"/#/article/"+ slug);
            done();
        });

        it("CASE1 - Add comment and verify",  async() =>{
             await Page.write(XPATH_DATA.Xpath.ArticlePage.CommentTextArea,commentText);
             await Page.click(XPATH_DATA.Xpath.ArticlePage.PostCommentBtn);
             await Page.verifySize(XPATH_DATA.Xpath.ArticlePage.Comments, 1);
             await driver.findElement(By.xpath("//*[contains(text(),'"+commentText+"')]"));
             await Page.verifyText(
                "//*[contains(text(),'"+commentText+"')]"+XPATH_DATA.Xpath.ArticlePage.CommentData.author,
                MAIN_DATA.USERS.User1.username);
             await Page.verifyDate(
                "//*[contains(text(),'"+commentText+"')]"+XPATH_DATA.Xpath.ArticlePage.CommentData.date);
        }).timeout(20000);

        it("CASE2 - delete comment", async() =>{
            await Page.click("//*[contains(text(),'"+commentText+"')]"+XPATH_DATA.Xpath.ArticlePage.CommentData.delete)
            await Page.verifyElementNotExists(XPATH_DATA.Xpath.ArticlePage.Comments);
        }).timeout(8000);

        after('close driver', async () =>{
            await driver.quit();
            // I decided not delete Article coz it isn't affected other cases and as a bonus it give opportunity to check if something went wrong
        });
    });
});

