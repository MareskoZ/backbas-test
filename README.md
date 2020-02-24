## Backbase test task "CR*D Comments on articles"

## Content
1. test cases for UI and for API
`test/test_doc/Test cases for UI and API _Commnets_`
2. automated testing for UI
`test/ui/comment.ui.test.js`
3. automated testing for API
`test/api/comment.api.test.js`
4. bug report
`test/test_doc/Bag report for comments functionality/Bagreportforcommentsfunctionality.html`
5. test pitch
`test/test_doc/TESTREPORT.html`

## How to run
0. preparation before run:
 - `npm install`
 - automation was made only for latest version of Chrome (chromedriver) 
1. run all tests cases:
`npm test`
2. run API tests cases with html report:
`mocha test/api/comment.api.test.js --reporter mochawesome`
2. run UI tests cases with html report:
`mocha test/ui/comment.ui.test.js --reporter mochawesome`


## Description
for Automate API testing was used
  -JS
  -Mocha and Chai
  -supertest
  
for Automate UI testing was used
  -JS
  -Selenium-Webdriver
  -Mocha and Chai
  -supertest (for precondition)

## P.S.
All testing (manual and automation) was make only on Chrome browser (as most popular (over then 87% customers))
If u have requirements to make testing for othe browsers (FireFox, Safari, ....), pls tell me i will update 

