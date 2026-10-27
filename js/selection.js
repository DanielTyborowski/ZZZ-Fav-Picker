import dom from "./dom.js";
import elements from "./elements.js";




const selection = {

    openSelection(cell, characters) {

    const close = () => {
        backdrop.remove();
        selectionField.remove();
    }

    const backdrop = dom.create({
        tagName: 'div',
        cssClassName: 'backdrop',
        parent: elements.main,
        listeners: { click: close}
    });

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
        content: 'Choose Charakter',
        parent: header
    })


    dom.create({
        tagName: 'button',
        content: '&times;',
        cssClasses: 'selection-close',
        attr: {
            'aria-label': 'Auswahl schließen'
        },
        listeners: {click: close},
        
        parent: header
    });


    const list = dom.create({
        tagName: 'div',
        cssClasses: ['selection-list'],
        parent: selectionField
    });

    if (!characters.length) {
        dom.create({
            content: 'No Charakter available',
            cssClasses: ['selection-empty'],
            parent: list
        });

        return;
    }

    characters.forEach(character => {
        const imgSrc = `./data/${character.img}`;

        const option = dom.create({
            tagName: 'button',
            cssClasses: ['selection-option'],
            attr: {
                type: 'button',
                title: character.name,
            },
            listeners: {
                click: () => {
                    cell.dataset.character = character.name;

                    let img = cell.querySelector('.character-icon');

                    if (img) {
                        // Bild existiert schon: nur Werte austauschen
                        img.src = imgSrc;
                        img.alt = character.name;
                        img.title = character.name;
                    } else {
                        img = dom.create({
                            tagName: 'img',
                            cssClassName: 'character-icon',
                            src: imgSrc,
                            attr: { alt: character.name, title: character.name },
                            parent: cell,
                        });
                    }

                    selectionField.remove();
                    backdrop.remove();
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
}




export default selection;