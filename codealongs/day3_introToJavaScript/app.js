let myName = "Bryce";
let num = 12345;
let bool = false;

console.log(myName);
console.log("this is the test");

if (bool === false){
    console.log(num+1);
}

const favorites = "noodles,bread,cheese,filet mignon";
console.log(favorites + ' ' + favorites.split(','));
let sepFav = favorites.split(',');
let spliceCheck = sepFav.slice(1,2);
console.log(sepFav + ' next ' + spliceCheck);

