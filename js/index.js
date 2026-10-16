'use strict';

import dom from "./dom.js";
import elements from "./elements.js";
import data from "./data.js";




function createGrid() {
    
    elements.firstCell = dom.create({
        content: 'First Cell',
        tagName: 'div',
        id: 'first-cell',
        cssClassName: 'first-cell',
        parent: elements.agentGrid,
    });
    
    for (const speciality of data.specialities) {
        const cell = dom.create({
            content: speciality,
            tagName: 'div',
            cssClassName: 'speciality-cell',
            parent: elements.agentGrid,
        });
    }
    



    for (const attribute of data.attributes) {
        const cell = dom.create({
            content: attribute,
            tagName: 'div',
            cssClassName: 'attribute-cell',
            parent: elements.agentGrid,
        });


        for(const speciality of data.specialities) {
            const cell = dom.create({
                tagName: 'div',
                cssClassName: 'cell',
                parent: elements.agentGrid,
            });
        }
    }
}



const init = () => {
    dom.mapping()
    createGrid();
    
    



}

init();