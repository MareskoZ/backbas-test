const {By, until} = require('selenium-webdriver');
const chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

waitTime = 20000;

const Page = function (driver) {

    this.click = async (xpath) => {
        await driver.wait(until.elementLocated(By.xpath(xpath)), waitTime);
        await driver.findElement(By.xpath(xpath)).click();
    };

    this.openPageWaiter = async (url) => {
        await driver.wait(until.urlIs(url), waitTime);
    };

    this.write = async (xpath, text) => {
         await driver.wait(until.elementLocated(By.xpath(xpath)), waitTime);
         await driver.findElement(By.xpath(xpath)).sendKeys(text);
         await driver.sleep(100);
    };
    this.verifySize = async (xpath, leng) => {
        await driver.wait(until.elementLocated(By.xpath(xpath)), waitTime);
        let elements = await driver.findElements(By.xpath(xpath));
        expect(elements.length).to.equal(leng)
    };
    this.verifyText = async (xpath, text) => {
        xpath = "//*[contains(text(),'This test is completed!')]/../../div[@class='card-footer']/*[@class='comment-author'][2]"
        await driver.wait(until.elementLocated(By.xpath(xpath)), waitTime);
        await driver.findElement(By.xpath(xpath)).getText().then((current_text) => {
            expect(current_text).to.equal(text);
        })
    };
    this.verifyDate = async (xpath) => {
        const currentData = () => {
            let date = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
        };
        await driver.wait(until.elementLocated(By.xpath(xpath)), waitTime);
        await driver.findElement(By.xpath(xpath)).getText().then((current_text) => {
            expect(current_text).to.equal(currentData());
        })
    };
    this.verifyElementNotExists = async (xpath) => {
        await driver.sleep(600);
        await driver.findElements(By.xpath(xpath)).then(function(elements) {
            expect(elements.length).to.equal(0)
        })
    };
};

module.exports = Page;
