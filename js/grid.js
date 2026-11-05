'use strict'


import dom from "./dom.js";
import elements from "./elements.js";
import { data, characters } from "./data.js";
import storage from "./storage.js";




function removeSpaces(string) {
    return string.replace(/\s/g, '');
}

function getAgents(speciality, attribute) {
    return characters.filter(
        character => character.speciality === speciality && character.attribute === attribute
    );

}

const grid = {

    createFactionGrid() {
        for (const faction of data.factions) {
            const factionName = removeSpaces(faction);

            const factionContainerWrapper = dom.create({
                tagName: 'div',
                cssClassName: 'faction-container-wrapper',
                parent: elements.factionGrid,
            })
            const factionContainer = dom.create({
                tagName: 'div',
                cssClassName: 'faction-container',
                parent: factionContainerWrapper,
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
            cssClassName: 'zzz-icon',
            parent: elements.firstCell,
            src: `./data/img/Icon_ZenlessZoneZero_logo.png`,

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

        const favHeaderCellTop = dom.create({
            tagName: 'div',
            cssClassName: 'fav-header-cell',
            parent: elements.agentGrid,
        })
        dom.create({
            tagName: 'img',
            cssClassName: 'agent-icon',
            parent: favHeaderCellTop,
            src: `./data/img/Icon_Agents.png`,




        })

        // attributes 
        for (const attribute of data.attributes) {
            const cell = dom.create({
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
                const hasAgents = getAgents(speciality, attribute).length > 0;
                const cell = dom.create({
                    tagName: 'div',
                    cssClasses: hasAgents ? ['cell'] : ['cell', 'cell-empty'],
                    parent: elements.agentGrid,
                    attr: {
                        'data-speciality': speciality,
                        'data-attribute': attribute,
                        'data-id': `agent-${speciality}-${attribute}`,
                    },
                });


            }
            dom.create({
                tagName: 'div',
                cssClassName: 'fav-cell',
                parent: elements.agentGrid,
                attr: {
                    'data-id': `fav-row-${attribute}`,
                    'data-fav-type': 'row',
                    'data-attribute': attribute,
                },
            });

        }


        const favHeaderCellBottom = dom.create({
            tagName: 'div',
            cssClassName: 'fav-header-cell',
            parent: elements.agentGrid,
        });
        dom.create({
            tagName: 'img',
            cssClassName: 'agent-icon',
            parent: favHeaderCellBottom,
            src: `./data/img/Icon_Agents.png`,
        })

        for (const speciality of data.specialities) {
            dom.create({
                tagName: 'div',
                cssClassName: 'fav-cell',
                parent: elements.agentGrid,
                attr: {
                    'data-id': `fav-col-${speciality}`,
                    'data-fav-type': 'col',
                    'data-speciality': speciality,
                },
            });
        }

        dom.create({
            tagName: 'div',
            cssClasses: ['fav-cell', 'fav-total-cell'],
            parent: elements.agentGrid,
            attr: {
                'data-id': 'fav-total',
                'data-fav-type': 'total',
            },
        });
    },







    getCandidates(favCell) {
        const saved = storage.load();
        const { favType, attribute, speciality } = favCell.dataset;

        let selector;
        if (favType === 'row') selector = `.cell[data-attribute="${attribute}"]`;
        else if (favType === 'col') selector = `.cell[data-speciality="${speciality}"]`;
        else selector = '.fav-cell[data-fav-type="row"], .fav-cell[data-fav-type="col"]';

        const unique = new Map();
        for (const cell of elements.agentGrid.querySelectorAll(selector)) {
            const item = saved[cell.dataset.id];
            if (item) unique.set(item.name, item);
        }
        return [...unique.values()];
    },


    createSpecialChoiceGrid() {


        for (const specialChoice of data.specialChoices) {
            const choiceName = removeSpaces(specialChoice);
            const spcContainerWrapper = dom.create({
                tagName: 'div',
                cssClassName: 'special-choices-container-wrapper',
                parent: elements.specialChoiceGrid,
            })
            const spcContainer = dom.create({
                tagName: 'div',
                cssClassName: 'special-choices-container',
                parent: spcContainerWrapper,
            });

            const spcCell = dom.create({
                tagName: 'div',
                cssClassName: 'special-choices-cell',
                parent: spcContainer,
            });
            dom.create({
                tagName: 'img',
                cssClassName: 'choices-icon',
                parent: spcCell,
                src: `./data/img/Icon_${choiceName}.png`,
            })

            const cell = dom.create({
                tagName: 'div',
                cssClassName: 'special-choice-selection',
                parent: spcContainer,
                attr: {
                    'data-choice': specialChoice,
                    'data-id': `choice-${choiceName}`,
                }
            });
        }
    },


}





export default grid;



