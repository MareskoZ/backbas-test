let date = new Date();
const REQUESTS = {
    Login: {
        user:{
            email: "autoqa@live.com",
            password: "qwerty"
        }
    },
    CreateArticle: {
        article: {
            title: "Test Tittle " + date ,
            description: "some description",
            body: "Something is here",
            tagList: []
        }
    },
    AddComments: {
        comment: {
            body: "Test Comment"
        }
    }
};

module.exports = {
    REQUESTS
};
