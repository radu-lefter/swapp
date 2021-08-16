const fs = require('fs');

// let languages = [];

// fs.readFile('swadesh.json', (err, data) => {
//     if (err) throw err;
//     let swadesh = JSON.parse(data);
//     console.log(swadesh[3]);
//     for (const x of swadesh[1]){
//         languages.push({"language":x[1][2], "words":x[2]})
//     }

//     // console.log(languages);
//     let data2 = JSON.stringify(languages, null, 2);

//     fs.writeFile('swadesh2.json', data2, (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// }); 

// fs.readFile('swadesh3.json', (err, data) => {
//     if (err) throw err;
//     let swadesh = JSON.parse(data);
   
//     for (const x of swadesh){
//         x["speakers"] = null;
//     }

//     // console.log(languages);
//     let data2 = JSON.stringify(swadesh, null, 2);

//     fs.writeFile('swadesh4.json', data2, (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });

// });

fs.readFile('swadesh4.json', (err, data) => {
    if (err) throw err;
    let swadesh = JSON.parse(data);
   
    for (const x of swadesh){
        x.words = Object.fromEntries(x.words);
    }

    // console.log(languages);
    let data2 = JSON.stringify(swadesh, null, 2);

    fs.writeFile('swadesh5.json', data2, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

});





console.log('This is after the read call');