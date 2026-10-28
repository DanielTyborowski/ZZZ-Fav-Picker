'use strict';

import dom from "./dom.js";
import elements from "./elements.js";
import { data, characters, wEngines, bangboos, categories } from "./data.js";
import grid from "./grid.js";
import selection from "./selection.js";

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
    

    selection.restoreSelections(document.querySelectorAll('.cell, .faction-selection, .fav-cell')
    );
}

init();