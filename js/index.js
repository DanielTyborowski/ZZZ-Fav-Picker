'use strict';

import dom from "./dom.js";
import elements from "./elements.js";
import {data, characters, wEngines, bangboos, categories} from "./data.js";
import grid from "./grid.js";
import selection from "./selection.js";

/*


const sources = { characters, wEngines, bangboos };
const byId = Object.fromEntries(categories.map(c => [c.id, c]));

function getOptions(category) {
    const pool = category.options ?? sources[category.source];
    const filter = Object.entries(category.filter ?? {});
    return pool.filter(item => filter.every(([key, value]) => item[key] === value));
}

*/



const STORAGE_KEY = 'agentSelection';

const loadSelections = () => {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
};



const saveSelection = (cellId, name) => {
    const data =  loadSelections();
    data[cellId] = {name: character.name, img: character.img};
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


/*
function setCellItem(cell, item) {
    cell.dataset.selected = item.name;

    const img = cell.querySelector('.character-icon') ?? dom.create({
        tagName: 'img',
        cssClassName: 'character-icon',
        parent: cell,
    });

    //Object.assign(img, { src: `./data/${item.img}`, alt: item.name, title: item.name });
}*/

function restoreSelection() {
    for (const cell of document.querySelectorAll('.cell, .faction-selection, .category-slot')) {
        const name = readStore()[cellKey(cell)];
        const item = name && getMatches(cell).find(i => i.name === name);
        if (item) setCellItem(cell, item);
    }
}














elements.agentGrid-addEventListener('click', (e) =>{
    const cell = e.target.closest('.cell');
    if(!cell) return;

    


    const { speciality, attribute } = cell.dataset;


    const matches = characters.filter(character =>
        character.speciality === speciality &&
        character.attribute === attribute
    );
    console.log(matches)
    selection.openSelection(cell,matches);
})

elements.factionGrid-addEventListener('click', (e) =>{
    const cell = e.target.closest('.faction-selection');
    if(!cell) return;


    const { faction } = cell.dataset;


    const matches = characters.filter(character =>
        character.faction === faction 
    );
    console.log(matches)
    selection.openSelection(cell,matches);
})




/*
function specialChoises() {

        for (const category of categories) {
            const card = dom.create({
                tagName: 'div',
                cssClassName: 'category-card',
                parent: elements.spcialGrid
            });
            dom.create({
                tagName: 'span',
                content: category.title,
                cssClassName: 'category-title',
                parent: card
            });
            dom.create({
                cssClassName: 'category-slot',
                parent: card,
                attr: {
                    'data-category': category.id
                }
            });

        }


    }

*/

const init = () => {
    dom.mapping()
    grid.createAgentGrid();
    grid.createFactionGrid();
    //specialChoises();

    dom.appendEventListeners();

    selection.restoreSelections(document.querySelectorAll('.cell, .faction-selection')
);
}

init();