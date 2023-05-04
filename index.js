(async () => {
    const { Builder, By, Key, until, Button } = require('selenium-webdriver');
    const driver = new Builder().forBrowser('chrome').build();
    const techList = ['React', 'angular', 'vue', 'c#', 'javascript', 'java', 'back end', 'front end', 'Python', 'Golang', 'Rails', 'ruby on rails', 'ruby', 'php', '.net', '.net core', 'next', 'nuxt', 'Software Engineer', 'Full Stack'];
    const regex = /<span data-automation="totalJobsCount">([^<]+)<\/span>/;
    let urlRoot = 'https://www.seek.com.au/';
    let url = '';

    for (let tech of techList) {
        try{
            url = `${urlRoot}jobs?keywords=${tech}`;
            await driver.get(url);
            await driver.sleep((Math.floor(Math.random() * 4) + 3) * 1000);
            await driver.getPageSource().then(result=>{
                const match = result.match(regex);
                if(match){
                    console.log(tech, match[1]);
                }
            });
        }catch{

        }finally{
            
        }
    }
    driver.quit();
})()