'use strict';


const load = name => fetch(new URL(`../data/json/${name}.json`, import.meta.url))
    .then(response => response.json());

const [data, characters, bangboos, wEngines,  skins, mc] = await Promise.all(
    ['data', 'characters', 'bangboos', 'wEngines',  'skins', 'mc'].map(load)
);


export {data, characters, bangboos, wEngines,  skins, mc};