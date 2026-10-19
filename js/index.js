'use strict';

import dom from "./dom.js";
import elements from "./elements.js";
import {data, characters} from "./data.js";




function createAgentGrid() {
    
    //console.log(data);
    //console.log(data.specialities);
    elements.firstCell = dom.create({
        //content: 'First Cell',
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
        content: 'Charakter auswählen',
        parent: header
    })


    dom.create({
        tagName: 'button',
        content: '&times;',
        cssClasses: 'selection-close',
        attr: {
            'aria-label': 'Auswahl schließen'
        },
        listeners: {
            click: () => selectionField.remove()
        },
        parent: header
    });


    const list = dom.create({
        tagName: 'div',
        cssClasses: ['selection-list'],
        parent: selectionField
    });

    if (!characters.length) {
        dom.create({
            content: 'Keine passenden Charaktere gefunden.',
            cssClasses: ['selection-empty'],
            parent: list
        });

        return;
    }

    characters.forEach(character => {
        const imgSrc = `./data/${character.img}`;

        const option = dom.create({
            tagName: 'button',
            //content: character.name,
            cssClasses: ['selection-option'],
            attr: {
                type: 'button',
                title: character.name,
            },
            listeners: {
                click: () => {
                    cell.dataset.character = character.name;

                    
            
                    dom.create({
                        tagName: 'img',
                        cssClassName: 'character-icon',
                        src: imgSrc,
                        attr: {
                            alt: character.name,
                            title: character.name,    
                        },
                        parent: cell,
                    });

                    
                    selectionField.remove();

                    
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




const init = () => {
    dom.mapping()
    createAgentGrid();
    createFactionGrid();
    
    



}

init();