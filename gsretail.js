var casper = require('casper').create();

var userId = 'gsretail_id';
var password = 'gsretail_password';

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

  if (this.exists('input#ctl00_ContentPlaceHolder1_btnAcDayInsert')) {
    this.echo('ancAcCheck exists');
    this.click('input#ctl00_ContentPlaceHolder1_btnAcDayInsert');
  } else {
    this.echo('ancAcCheck not exists');
  }
});

casper.then(function() {
  this.capture("gsretail_attendance_end.png");
});

casper.run();
