'use static'


import dom from "./dom.js";
import elements from "./elements.js";
import { data, characters } from "./data.js";





const grid = {
    createGrid() {

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


            for (const speciality of data.specialities) {
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
    },

}

elements.agentGrid - addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell) return;


    const { speciality, attribute } = cell.dataset;


    const matches = characters.filter(character =>
        character.speciality === speciality &&
        character.attribute === attribute
    );
    console.log(matches)
    openSelection(cell, matches);
})


export default grid;



