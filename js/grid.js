'use static'


import dom from "./dom.js";
import elements from "./elements.js";
import { data, characters, categories } from "./data.js";




function removeSpaces(string) {
    return string.replace(/\s/g, '');
}


const grid = {

    createFactionGrid() {
        for (const faction of data.factions) {
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
                    'data-id': `faction-${factionName}`,
                }
            });
        }
    },

    createAgentGrid() {

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

            for (const speciality of data.specialities) {
                const cell = dom.create({
                    tagName: 'div',
                    cssClassName: 'cell',
                    parent: elements.agentGrid,
                    attr: {
                        'data-speciality': speciality,
                        'data-attribute': attribute,
                        'data-id': `agent-${speciality}-${attribute}`,
                    },
                });
            }
        }
    },



    

}




export default grid;



