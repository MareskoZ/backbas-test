const Xpath = {
    ArticlePage: {
        CommentTextArea: '//textarea',
        PostCommentBtn: "//button[@type='submit']",
        LastComment: "//app-article-comment[1]",
        Comments: "//app-article-comment",
        CommentData: {
            author: "/../../div[@class='card-footer']/*[@class='comment-author'][2]",
            date: "/../../div[@class='card-footer']/*[@class='date-posted']",
            delete: "/../../div[@class='card-footer']/*/*[@class='ion-trash-a']"
        }
    },
};


module.exports = {
    Xpath,
};
