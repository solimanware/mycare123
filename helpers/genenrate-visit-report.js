const visitResults = require('../templates/visit-results')
var fs = require('fs');
var pdf = require('html-pdf');


var options = { format: 'Letter' };
module.exports = (data ,visitId) => {
    const htmlResults = visitResults(data);    
    const pdfFile = `./visits-results-repors/${visitId}.pdf`;
    return new Promise((resolve, reject) => {
        pdf.create(htmlResults, options).toFile(pdfFile, function(err, res) {
        resolve(pdfFile);
        if (err) return console.log(err);
        });
        
    });
}
