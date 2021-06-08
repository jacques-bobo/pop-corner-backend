var nodemailer = require('nodemailer');

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
  function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }

  function sendEmail(emailAdress, subject, message){


    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'popcorner.offers@gmail.com',
        pass: 'PopcornerFightClub'
    }
    });

    var mailOptions = {
    from: 'popcorner.offers@gmail.com',
    to: emailAdress,
    subject: subject,
    text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    }); 
  }
  

  function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  module.exports = {
    getOffset,
    emptyOrRows,
    sendEmail,
    shuffle
  }