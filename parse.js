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
//     console.log('Data written file');
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
//     console.log('Data written file');
// });

// });

// fs.readFile('swadesh4.json', (err, data) => {
//     if (err) throw err;
//     let swadesh = JSON.parse(data);
   
//     for (const x of swadesh){
//         x.words = Object.fromEntries(x.words);
//     }

//     // console.log(languages);
//     let data2 = JSON.stringify(swadesh, null, 2);

//     fs.writeFile('swadesh5.json', data2, (err) => {
//     if (err) throw err;
//     console.log('Data written file');
// });

fs.readFile('swadesh5.json', (err, data) => {
    if (err) throw err;
    let swadesh = JSON.parse(data);

    const arr = ["all","and","animal","ashes","at","back","bad","bark","because","belly","big","bird","black","blood","bone","breast","child","cloud","cold","correct","day","dirty","dog","dry","dull","dust","ear","earth","egg","eye","far","fat (n)","father","feather","few","fingernail","fire","fish","five","flower","fog","foot","forest","four","fruit","full","good","grass","green","guts","hair","hand","he","she","head","heart","heavy","here","horn","how","husband","I","ice","if","in","knee","lake","leaf","left","leg","liver","long","louse","man","many","meat","moon","mother","mountain","mouth","name","narrow","near","neck","new","night","nose","not","old","one","other","person","rain","red","right","river","road","root","rope","rotten","round","salt","sand","sea","seed","sharp","short","skin","sky","small","smoke","smooth","snake","snow","some","star","stick","stone","straight","sun","tail","that","there","they","they two","thick","thin","this","three","bite","blow","breathe","burn","come","count","cut","die","dig","drink","eat","fall","fear","fight","float","flow","fly (n)","fly (v)","freeze","give","hear","hit","hold","hunt","kill","know","laugh","lie","live","play","pull","push","rub","say","scratch","see","sew","sing","sit","sleep","smell","spit","split","squeeze","stab","stand","suck","swell","swim","think","throw","tie","turn","thou","tongue","tooth","tree","two","vomit","walk","wash","wipe","warm","water","we","we two","we (excl)","we (incl)","wet","what","when","where","white","who","wide","wife","wind","wing","with","woman","worm","year","yellow","you","you two","you (plural)","you (singular)"];
    let wordsEmpty = arr.reduce((acc,curr)=> (acc[curr]='',acc),{});
    //console.log(words);

    for (const x of swadesh){
        x.words = {...wordsEmpty, ...x.words};
    }

    // console.log(languages);
    let data2 = JSON.stringify(swadesh, null, 2);

    fs.writeFile('swadesh6.json', data2, (err) => {
    if (err) throw err;
    console.log('Data written file');
});

});





console.log('This is after the read call');