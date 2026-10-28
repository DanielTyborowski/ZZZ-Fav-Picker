'use strict'

import dom from "./dom.js";

const STORAGE_KEY = 'agentSelection';


const storage = {

    load() {
        try {
            return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    },
    
    save(cellId, character) {
        const data = this.load();
        data[cellId] = { name: character.name, img: character.img };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    remove(cellId) {
        const data = this.load();
        delete data[cellId];
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },


    clearCell(cell) {
        delete cell.dataset.character;
        cell.querySelector('.character-icon')?.remove();
    },

    resetAll(cells) {
        sessionStorage.removeItem(STORAGE_KEY);
        for(const cell of cells) {
            this.clearCell(cell);
        }
    },






}


export default storage;