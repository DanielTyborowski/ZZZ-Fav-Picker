'use strict'

import elements from "./elements.js";
import storage from "./storage.js";
import selection from "./selection.js";
import { data, characters, wEngines, bangboos, specialChoices } from "./data.js";
import grid from "./grid.js";
import specialSources from "./sources.js";


const dom = {
    create({
        content = false,
        value = false,
        tagName = 'div',
        type = false,
        parent = false,
        name = false,
        src = false,
        href = false,
        id = false,
        target = false,
        cssClassName = false,
        cssClasses = [],
        attr = {},
        listeners = {},
        styles = {},
        insert = 'append',
    } = {}) {
        let neu = document.createElement(tagName);
        if (content) neu.innerHTML = content;
        if (name) neu.setAttribute('name', name);
        if (src) neu.setAttribute('src', src);
        if (href) neu.setAttribute('href', href);
        if (target) neu.setAttribute('target', target);
        if (id) neu.setAttribute('id', id);
        if (type) neu.setAttribute('type', type);
        if (value) neu.setAttribute('value', value);
        if (cssClassName) neu.className = cssClassName;
        if (cssClasses.length) neu.classList.add(...cssClasses);

        Object.entries(attr).forEach(el => neu.setAttribute(...el));
        Object.entries(listeners).forEach(el => neu.addEventListener(...el));
        Object.entries(styles).forEach(([key, value]) => neu.style[key] = value);

        if (parent) {
            if (insert == 'append') {
                parent.append(neu);
            } else if (insert == 'prepend') {
                parent.prepend(neu);
            } else if (insert == 'before') {
                parent.before(neu);
            } else if (insert == 'after') {
                parent.after(neu);
            }
        }

        return neu;

    },

    mapping() {
        elements.main = document.querySelector('#main');
        elements.agentGrid = document.querySelector('#agent-grid');
        elements.factionGrid = document.querySelector('#faction-grid');
        elements.specialChoiceGrid = document.querySelector('#special-choices-grid');
        elements.resetButton = document.querySelector('#reset-button');
        elements.downloadButton = document.querySelector('#download-button');
    },

    appendEventListeners() {


        elements.agentGrid.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell, .fav-cell');
            if (!cell) return;

            if (cell.dataset.favType) {
                selection.openSelection(cell, grid.getCandidates(cell));
                return;
            }


            const { speciality, attribute } = cell.dataset;
            const matches = characters.filter(character =>
                character.speciality === speciality &&
                character.attribute === attribute
            );
            console.log(matches)
            selection.openSelection(cell, matches);
        })

        elements.factionGrid.addEventListener('click', (e) => {
            const cell = e.target.closest('.faction-selection');
            if (!cell) return;


            const { faction } = cell.dataset;


            const matches = characters.filter(character =>
                character.faction === faction
            );
            console.log(matches)
            selection.openSelection(cell, matches);
        })


        elements.specialChoiceGrid.addEventListener('click', (e) => {
            const cell = e.target.closest('.special-choice-selection');
            if (!cell) return;

            const getOptions =  specialSources[cell.dataset.choice];
            if (!getOptions) {
        console.warn(`Keine Datenquelle für "${cell.dataset.choice}"`, Object.keys(specialSources));
        return;
    }
        
            selection.openSelection(cell, getOptions);
        })


        elements.resetButton.addEventListener('click', () => {
            if (!confirm('Reset Selection?')) return;
            storage.resetAll(document.querySelectorAll('.cell, .faction-selection, .fav-cell, .special-choice-selection'));
        })

        elements.downloadButton.addEventListener('click', async () => {
            modernScreenshot.domToPng(elements.main, {
                scale: 2,
                width: elements.main.scrollWidth,
                height: elements.main.scrollHeight,
                backgroundColor: '#000',
            })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'website.png';
                link.href = dataUrl;
                link.click();
            });
        })
    },


}


export default dom;