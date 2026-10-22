'use strict';

import dom from "./dom.js";
import elements from "./elements.js";
import {data, characters, wEngines, bangboos, categories} from "./data.js";





const sources = { characters, wEngines, bangboos };
const byId = Object.fromEntries(categories.map(c => [c.id, c]));

function getOptions(category) {
    const pool = category.options ?? sources[category.source];
    const filter = Object.entries(category.filter ?? {});
    return pool.filter(item => filter.every(([key, value]) => item[key] === value));
}



const STORAGE_KEY = 'agentSelection';

const readStore = () => {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) ?? {};
    } catch {
        return {};
    }
};


const cellKey = (cell) => {
    const {selected, ...criteria} = cell.dataset;
    return Object.entries(criteria).sort().map(([key, value]) => '${key}:${vaue}').join('|');
};


const saveSelection = (cell, name) => {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({...readStore(), [cellKey(cell)]: name

        }));
    } catch {

    }
}


function setCellItem(cell, item) {
    cell.dataset.selected = item.name;

    const img = cell.querySelector('.character-icon') ?? dom.create({
        tagName: 'img',
        cssClassName: 'character-icon',
        parent: cell,
    });

    //Object.assign(img, { src: `./data/${item.img}`, alt: item.name, title: item.name });
}

function restoreSelection() {
    for (const cell of document.querySelectorAll('.cell, .faction-selection, .category-slot')) {
        const name = readStore()[cellKey(cell)];
        const item = name && getMatches(cell).find(i => i.name === name);
        if (item) setCellItem(cell, item);
    }
}



function createAgentGrid() {

    elements.firstCell = dom.create({
        tagName: 'div',
        id: 'first-cell',
        cssClassName: 'first-cell',
        parent: elements.agentGrid,
    });
    dom.create({
            tagName: 'img',
            cssClassName: 'agent-icon',
            parent: elements.firstCell,
            src: `./data/img/Icon_Agents.png`,            
        })
    

    // specialities 
    for (const speciality of data.specialities) {
        const cell = dom.create({
            //content: speciality,
            tagName: 'div',
            cssClassName: 'speciality-cell',
            parent: elements.agentGrid,
        });
        dom.create({
            tagName: 'img',
            cssClassName: 'speciality-icon',
            parent: cell,
            src: `./data/img/specialities/Icon_${speciality}.png`,            
        })
    }

    // attributes 
    for (const attribute of data.attributes) {
        const cell = dom.create({
            //content: attribute,
            tagName: 'div',
            cssClassName: 'attribute-cell',
            parent: elements.agentGrid,
        });
        dom.create({
            tagName: 'img',
            cssClassName: 'attribute-icon',
            parent: cell,
            src: `./data/img/attributes/Icon_${attribute}.png`,            
        })

        for(const speciality of data.specialities) {
            const cell = dom.create({
                tagName: 'div',
                cssClassName: 'cell',
                parent: elements.agentGrid,
                attr: {
                    'data-speciality': speciality,
                    'data-attribute': attribute,
                },
            });
        }
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
    openSelection(cell,matches);
})


function openSelection(cell, characters) {

    const close = () => {
        backdrop.remove();
        selectionField.remove();
    }

    const backdrop = dom.create({
        tagName: 'div',
        cssClassName: 'backdrop',
        parent: elements.main,
        listeners: { click: close}
    });

    const selectionField = dom.create({
        tagName: 'div',
        cssClassName: 'selection-field',
        parent: elements.main,
    });

    const header = dom.create({
        tagName: 'div',
        cssClassName: 'selection-header',
        parent: selectionField
    });

    dom.create({
        tagName: 'h3',
        content: 'Choose Charakter',
        parent: header
    })


    dom.create({
        tagName: 'button',
        content: '&times;',
        cssClasses: 'selection-close',
        attr: {
            'aria-label': 'Auswahl schließen'
        },
        listeners: {click: close},
        
        parent: header
    });


    const list = dom.create({
        tagName: 'div',
        cssClasses: ['selection-list'],
        parent: selectionField
    });

    if (!characters.length) {
        dom.create({
            content: 'No Charakter available',
            cssClasses: ['selection-empty'],
            parent: list
        });

        return;
    }

    characters.forEach(character => {
        const imgSrc = `./data/${character.img}`;

        const option = dom.create({
            tagName: 'button',
            cssClasses: ['selection-option'],
            attr: {
                type: 'button',
                title: character.name,
            },
            listeners: {
                click: () => {
                    cell.dataset.character = character.name;

                    let img = cell.querySelector('.character-icon');

                    if (img) {
                        // Bild existiert schon: nur Werte austauschen
                        img.src = imgSrc;
                        img.alt = character.name;
                        img.title = character.name;
                    } else {
                        img = dom.create({
                            tagName: 'img',
                            cssClassName: 'character-icon',
                            src: imgSrc,
                            attr: { alt: character.name, title: character.name },
                            parent: cell,
                        });
                    }

                    selectionField.remove();
                    backdrop.remove();
                    console.log('Ausgewählt:', character);
                }
            },
            parent: list
        });

        dom.create({
            tagName: 'img',
            cssClassName: 'character-icon',
            src: imgSrc,
            attr: { alt: character.name },
            parent: option,
        });

    
    });


}

function removeSpaces(string) {
    return string.replace(/\s/g, '');
}

function createFactionGrid() {
    

    for (const faction of data.factions){
        const factionName = removeSpaces(faction);
        const factionContainer = dom.create({
            tagName: 'div',
            cssClassName: 'faction-container',
            parent: elements.factionGrid,
        });

        const factionCell = dom.create({
            tagName: 'div',
            cssClassName: 'faction-cell',
            parent: factionContainer,
        });
        dom.create({
            tagName: 'img',
            cssClassName: 'faction-icon',
            parent: factionCell,
            src: `./data/img/factions/Icon_${factionName}.png`,            
        })
        dom.create({
            tagName: 'span',
            content: faction,
            cssClassName: 'faction-name',
            parent: factionCell,
      
        })
        
        const cell = dom.create({
            tagName: 'div',
            cssClassName: 'faction-selection',
            parent: factionContainer,
            attr: {
                'data-faction': faction,
            }
        });
    }



}

elements.factionGrid-addEventListener('click', (e) =>{
    const cell = e.target.closest('.faction-selection');
    if(!cell) return;


    const { faction } = cell.dataset;


    const matches = characters.filter(character =>
        character.faction === faction 
    );
    console.log(matches)
    openSelection(cell,matches);
})


function specialChoises () {

    for (const category of categories){
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






const init = () => {
    dom.mapping()
    createAgentGrid();
    createFactionGrid();
    specialChoises();
    
    



}

init();