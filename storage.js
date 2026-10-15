const StorageManager={

load(key){

const data=
localStorage.getItem(key);

return data
? JSON.parse(data)
: [];

},

save(key,data){

localStorage.setItem(
key,
JSON.stringify(data)
);

},

remove(key){

localStorage.removeItem(key);

}

};