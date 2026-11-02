'use strict';

import dom from "./dom.js";
import elements from "./elements.js";
import { data, characters, wEngines, bangboos, categories } from "./data.js";
import grid from "./grid.js";
import selection from "./selection.js";


const init = () => {
    dom.mapping()
    grid.createAgentGrid();
    grid.createFactionGrid();
    dom.appendEventListeners();
    

    selection.restoreSelections(document.querySelectorAll('.cell, .faction-selection, .fav-cell')
    );
}

init();