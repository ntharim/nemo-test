var Nemo = require('nemo');
var plugins = require('./config/plugins');

var nemo = new Nemo({
  nemoData: {
    autoBaseDir: __dirname,
    targetBrowser: 'chrome',
    targetBaseUrl: 'https://gist.github.com'
  },
  plugins: plugins
});

nemo.setup({
  view: ['gist']
}).then(function (n) {
  n.driver.get(n.props.targetBaseUrl);
  var gist = n.view.gist;
  gist.signin().click();
  gist.signinUsername().sendKeys(process.env.GITHUB_USERNAME);
  gist.signinPassword().sendKeys(process.env.GITHUB_PASSWORD);
  gist.signinForm().submit();
  gist.description().sendKeys('My Secret Gist');
  gist.name().sendKeys('my-secret-gist');
  gist.input().sendKeys('CONFIDENTIAL GIST');
  gist.createSecret().click();
  n.driver.sleep(4000)
  .then(function () {
    n.driver.quit();
  });
});