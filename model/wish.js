const fs = require('fs');
const path = require('path');
const filepath = path.join(path.dirname(require.main.filename), 'data', 'wishes.json');

module.exports = class Wish {

    constructor (wish) {
        this.description = wish;
    }

    saveWish() {
        fs.readFile(filepath, (error, fileContent) => {
            let wishes = [];

            if (!error) {
                wishes = JSON.parse(fileContent);
            } else {
                console.log (error);
            }
            
            wishes.push(this.description);

            fs.writeFile(filepath, JSON.stringify(wishes), (error) => {
                if (!error) {
                    console.log('You want '+this.description);
                } else {
                console.log(error);
                }
            });

        });
    }

    clearWishes() {
        let wishes = [];

        fs.writeFile(filepath, JSON.stringify(wishes), (error) => {
            if (!error){
                console.log ("Wishes cleared.");
            } else {
                console.log (error);
            }
        });
    }

    static fetchAllWishes(callBack) {
        fs.readFile(filepath, (error, fileContent) => {
            if(error){
                callBack([]);
            };

            callBack(JSON.parse(fileContent));
        });
    }
}