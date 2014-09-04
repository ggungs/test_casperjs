var casper = require('casper').create({
  verbose: true
  logLevel: "debug"
});

var userId = 'gsretail_Id';
var password = 'gsretail_Password';

casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36');

casper.start('https://www.gsretail.com/Member/Logins/Login.aspx', function() {
  this.fillSelectors('form#aspnetForm', {
    'input#ctl00_ContentPlaceHolder1_txtUserID': userId,
    'input#ctl00_ContentPlaceHolder1_txtPassword': password
  }, false);

  this.echo('fill loginform');
  this.click('input#ctl00_ContentPlaceHolder1_btnLogin');
});

casper.thenOpen('https://www.gsretail.com/Event/attend/Attendance.aspx', function() {
  this.echo('go attendance eventpage');

  var as = this.evaluate(function() {
      return fn_InsertAcDay();
  });

  this.echo(as);
});

casper.then(function() {
  this.capture("gsretail_attendance_end.png");
});

casper.run();
