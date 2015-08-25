/**
 * @fileoverview ESLint HTML reporter
 */

var LintReporter = require('./src/js/lint-reporter');
var templateUtils = require('hairballs-ext').templateUtils;
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var _options = {};

var sendEmail = function(content) {
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport(smtpTransport({
              auth: {
                user: process.env.mail_user,
                pass: process.env.mail_pass
              },
              host: process.env.mail_host,
              secure: process.env.mail_secure,
              port: process.env.mail_port        
    }));


    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: process.env.mail_from, // sender address
        to: process.env.mail_to, // list of receivers
        subject: process.env.mail_subject, // Subject line
        html: content
    };

    
    if (transporter && mailOptions.to) {        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });    
    }
};

module.exports = function(results) {
      var lintReporter = new LintReporter();
      var data = lintReporter.runReport(results, true, false);
      
      var content = templateUtils.applyTemplates(data, process.env.reporter_briefing);
      if (process.env.mail_host) sendEmail(content);
      return content;         
};
