module.exports = {
  'should load without error': browser => {
    browser
      .url('http://localhost:8080')
      .expect.element('body')
      .to.be.present.before(1000);
  }
};

// browser
//       .url(process.env.VUE_DEV_SERVER_URL)
//       .waitForElementVisible('#app', 5000)
//       .assert.elementPresent('.hello')
//       .assert.containsText('h1', 'Welcome to Your Vue.js + TypeScript App')
//       .assert.elementCount('img', 1)
//       .end();

// browser
//         .setValue('input[type=text]', ['nightwatch', browser.Keys.ENTER])
//         .pause(1000)
//         .assert.containsText('#main', 'Night Watch');
