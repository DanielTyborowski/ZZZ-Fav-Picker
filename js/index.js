'use strict';

import dom from "./dom.js";
import elements from "./elements.js";
import grid from "./grid.js";
import selection from "./selection.js";


const init = () => {
    dom.mapping()
    grid.createAgentGrid();
    grid.createFactionGrid();
    grid.createSpecialChoiceGrid();
    dom.appendEventListeners();
    

    selection.restoreSelections(document.querySelectorAll('.cell, .faction-selection, .fav-cell, .special-choice-selection')
    );
}

init();