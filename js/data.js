'use strict';

//const response = await fetch(new URL('../data/json/data.json', import.meta.url));
//const data =  await response.json();

const [data, characters, bangboos, wEngines, specialChoices, skins, mc] = await Promise.all([
    fetch(new URL('../data/json/data.json', import.meta.url))
    .then(response => response.json()),
    
    fetch(new URL('../data/json/characters.json', import.meta.url))
    .then(response => response.json()),
    
    fetch(new URL('../data/json/bangboos.json', import.meta.url))
    .then(response => response.json()),
    
    fetch(new URL('../data/json/wEngines.json', import.meta.url))
    .then(response => response.json()),
    
    fetch(new URL('../data/json/specialChoices.json', import.meta.url))
    .then(response => response.json()),
    
    fetch(new URL('../data/json/skins.json', import.meta.url))
    .then(response => response.json()),

    fetch(new URL('../data/json/mc.json', import.meta.url))
    .then(response => response.json()),

    

]);


export {data, characters, bangboos, wEngines, specialChoices, skins, mc};