
const previewContent = document.getElementById('preview-content');




const selectionPanel = document.getElementById('selection-panel');
const divBlockPanel = document.getElementById('div-block-panel');

const classNameInput = document.getElementById('class-name-input');
const addClassButton = document.getElementById('add-class-btn');



function showSelectionMessage() {
    selectionPanel.classList.remove('none');
    divBlockPanel.classList.add('none');
}


function showDivBlock() {
    selectionPanel.classList.add('none');
    divBlockPanel.classList.remove('none');
}





addClassButton.addEventListener('click', function () {
    const newClass = classNameInput.value.trim();

    if (newClass && currentSelectedElement) {
        const oldClass = currentSelectedElement.classList[0];


        if (oldClass) {
            transferCssToNewClass(oldClass, newClass);
        }

        if (currentSelectedElement.classList.length > 0) {
            currentSelectedElement.classList.replace(currentSelectedElement.classList[0], newClass);
        } else {
            currentSelectedElement.classList.add(newClass);
        }

        saveClassToDatabase(currentSelectedElement.classList);

    }
});



function saveClassToDatabase(classList) {
    console.log("Class names saved to database:", classList);
}







document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete' || e.key === 'Del') {
        if (currentSelectedElement && previewContent.contains(currentSelectedElement)) {
            const deletedElement = currentSelectedElement;
            const parent = deletedElement.parentNode;
            const nextSibling = deletedElement.nextSibling;

            if (currentSelectedElement === dropArea) {
                displayErrorMessage("You cannot delete the Main Body.");
                return;
            }

            deletedElement.remove();


            currentSelectedElement = null;
            classNameInput.value = '';
            hideDivBlock();


            trackChange({
                do: () => {

                    if (parent.contains(deletedElement)) {
                        deletedElement.remove();
                    }
                },
                undo: () => {
                    if (nextSibling) {
                        parent.insertBefore(deletedElement, nextSibling);
                    } else {
                        parent.appendChild(deletedElement);
                    }
                }
            });
        }
    }
});


document.addEventListener('keydown', function (e) {

    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }

    if (e.ctrlKey && e.key === 'Z' && e.shiftKey) {
        e.preventDefault();
        redo();
    }

    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        savePreviewContent();
        updateBlockOnServer();
        unsavedChanges = false;
    }
});


function hideDivBlock() {
    const divBlock = document.querySelector('.properties-panel');
    if (divBlock) divBlock.style.display = 'none';
}




const undoStack = [];
const redoStack = [];

let isUndoingRedoing = false;

function trackChange(action) {
    if (isUndoingRedoing || hoverPreview.isHoverInteraction) {
        console.log('Skipping tracking for hover interaction');
        return;
    }
    undoStack.push(action);
    redoStack.length = 0;
    console.log('Tracked Change. Undo Stack:', undoStack.length);
}

function undo() {
    if (undoStack.length === 0) return;

    isUndoingRedoing = true;
    const action = undoStack.pop();
    if (action.undo) {
        action.undo();
        redoStack.push(action);
    }
    isUndoingRedoing = false;
    console.log('Undo triggered. Stack before:', undoStack.length);
    console.log('Undo completed. Stack after:', undoStack.length);
}

function redo() {
    if (redoStack.length === 0) return;

    isUndoingRedoing = true;
    const action = redoStack.pop();
    if (action.do) {
        action.do();
        undoStack.push(action);
    }
    isUndoingRedoing = false;
}



let previousSelectedElement = null;


previewContent.addEventListener('click', function (e) {

    const selectedElements = document.querySelectorAll('.selected');

    selectedElements.forEach(element => {
        element.classList.remove('selected');
    });


    handleFormAndSelectClick(e);
    populateInputMenuValues();
    setupInputMenuListeners();


    let selectableTags = ['INPUT', 'LABEL', 'TEXTAREA', 'SELECT'];
    let selectedEl = e.target;
    if (!selectableTags.includes(selectedEl.tagName.toUpperCase())) {
        const closest = e.target.closest('input, label, textarea, select');
        if (closest) {
            selectedEl = closest;
        }
    }


    e.target.classList.add('selected');

    showDivBlock();

    ensureElementHasId(selectedEl);


    currentSelectedElement = e.target;

    const firstClass = ((currentSelectedElement.classList && currentSelectedElement.classList[0])
        ? currentSelectedElement.classList[0]
        : currentSelectedElement.id).trim();

    if (firstClass) {

        classNameInput.value = firstClass;
        initUnitSelectors();
        populateAnimationList();
    } else {
        console.warn("[previewContent] Selected element has no class or ID");
    }
    classNameInput.value = firstClass;


    const selectedKey = firstClass.toLowerCase();

    if (selectedKey) {
        showServerBlocksFor(selectedKey);
    } else {
        console.warn("[previewContent] Selected element has no class or ID");
    }

    restoreChoiceValues();




    const elementId = getElementIdentifierFirstClass(e.target);
    console.log('Selected element ID:', elementId);

    ensureElementData(elementId);
    loadShadowsForElement(elementId);


    loadTextShadowData(elementId)





    console.log("[previewContent] About to call populateInputsFromSelectedElement");

    populateInputsFromSelectedElement();
    updateCssDisplay();






    htmlDisplay.value = formatHTML(currentSelectedElement.outerHTML);


    const classList = Array.from(currentSelectedElement.classList);
    matchedRules = findMatchingCSSRules(classList);


    const combinedCSS = matchedRules
        .map(({ selector, rule }) => formatCSSRule(rule.cssText))
        .join('\n\n');

    cssDisplay.value = combinedCSS;




    autoOpenBackgroundPanelForElement(currentSelectedElement);



    let lastCssProperty = null;


    const bxCols = document.querySelectorAll('.little-menu .bx-col');

    bxCols.forEach(bxCol => {
        bxCol.addEventListener('click', function () {
            const cssProperty = bxCol.getAttribute('add-css');

            if (cssProperty && currentSelectedElement) {
                const firstClass = currentSelectedElement.classList[0];

                if (lastCssProperty) {
                    removeCssPropertyFromClass(firstClass, lastCssProperty);
                }


                updateCssForClass(firstClass, cssProperty);


                const columns = (cssProperty.match(/1fr/g) || []).length;
                const rows = (cssProperty.match(/auto/g) || []).length;


                currentSelectedElement.innerHTML = '';


                let colNumber = 1;
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < columns; c++) {
                        const colDiv = document.createElement('div');
                        colDiv.classList.add(`col${colNumber}`, 'w2-engine-bx');
                        currentSelectedElement.appendChild(colDiv);
                        colNumber++;
                    }
                }


                lastCssProperty = cssProperty;


                updateGridCounts();
            }
        });
    });






    if (e.target.tagName.match(/^H[1-6]$/)) {
        currentSelectedElement = e.target;


        const tagNumber = currentSelectedElement.tagName[1];

        updateTagCounts(`h${tagNumber}`);

        document.querySelector('.text-menu .input-number').value = currentSelectedElement.textContent;
    }







    if ([...currentSelectedElement.classList].some(className => className.startsWith('Grid'))) {
        document.querySelector('.little-menu').classList.remove('none');
    } else {
        document.querySelector('.little-menu').classList.add('none');
    }

    if ([...currentSelectedElement.classList].some(className => className.startsWith('Heading'))) {
        document.querySelector('.text-menu').classList.remove('none');
    } else {
        document.querySelector('.text-menu').classList.add('none');
    }


    if (currentSelectedElement.tagName.toLowerCase() === 'img' ||
        [...currentSelectedElement.classList].some(cn => cn.startsWith('Image'))) {
        document.querySelector('.image-menu').classList.remove('none');
    } else {
        document.querySelector('.image-menu').classList.add('none');
    }


    if (currentSelectedElement.tagName.toLowerCase() === 'video' ||
        [...currentSelectedElement.classList].some(cn => cn.startsWith('Video'))) {
        document.querySelector('.video-menu').classList.remove('none');
    } else {
        document.querySelector('.video-menu').classList.add('none');
    }


    if (currentSelectedElement.tagName.toLowerCase() === 'form' ||
        [...currentSelectedElement.classList].some(cn => cn.startsWith('Form'))) {
        document.querySelector('.form-menu').classList.remove('none');
    } else {
        document.querySelector('.form-menu').classList.add('none');
    }


    if (currentSelectedElement.tagName.toLowerCase() === 'input' ||
        [...currentSelectedElement.classList].some(cn => cn.startsWith('Input'))) {
        document.querySelector('.input-menu').classList.remove('none');
    } else {
        document.querySelector('.input-menu').classList.add('none');
    }

    if (currentSelectedElement.tagName.toLowerCase() === 'textarea' ||
        [...currentSelectedElement.classList].some(cn => cn.startsWith('Textarea'))) {
        document.querySelector('.textarea-menu').classList.remove('none');
    } else {
        document.querySelector('.textarea-menu').classList.add('none');
    }


    if (currentSelectedElement.tagName.toLowerCase() === 'select' ||
        [...currentSelectedElement.classList].some(cn => cn.startsWith('Select'))) {
        document.querySelector('.select-option-menu').classList.remove('none');
    } else {
        document.querySelector('.select-option-menu').classList.add('none');
    }


    if (currentSelectedElement.tagName.toLowerCase() === 'label' ||
        [...currentSelectedElement.classList].some(cn => cn.startsWith('Label'))) {
        document.querySelector('.label-menu').classList.remove('none');
    } else {
        document.querySelector('.label-menu').classList.add('none');
    }





    populateMarginPaddingValues(firstClass);
    updateGridCounts();






    clearActiveAccess();


    applyStoredActiveState(currentSelectedElement);









    applyStoredActiveStates(classNameInput.value);

    updateButtonActiveStates();










    updateMenuVisibility();









});


function generateUniqueId() {
    return 'element-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

function ensureElementHasId(el) {
    if (!el) return;
    if (!el.id) {
        const uniqueId = generateUniqueId();
        el.id = uniqueId;
        el.setAttribute('data-id', uniqueId);
    }
    return el.id;
}





const activeButtonIndexStore = {};






const buttonTypes = ['btn-s1', 'flex-btn', 'btn-a1', 'btn-s2', 'btn3', 'btn-s4', 'btn-s5', 'btn-s6', 'btn-s7',
    'btn-s8', 'btn-s9', 'btn-s10', 'btn-s11', 'btn-s12', 'btn-s13', 'btn-s14', 'btn-s15', 'btn-rd-type', 'btn-menu-add'];



document.addEventListener('click', function (event) {

    const validClassNames = ['btn-s1', 'flex-btn', 'btn-a1', 'btn-s2', 'btn3', 'btn-s4', 'btn-s5', 'btn-s6', 'btn-s7',
        'btn-s8', 'btn-s9', 'btn-s10', 'btn-s11', 'btn-s12', 'btn-s13', 'btn-s14', 'btn-s15', 'btn-rd-type', 'btn-menu-add'
    ];
    if (!validClassNames.some(c => event.target.classList.contains(c))) return;

    event.target.classList.add('clicked')
});

function activateFirstButton(group, btnType) {

    if (group.closest('.square-six-points')) return;

    const firstButton = group.querySelector(`.${btnType}`);
    if (firstButton) firstButton.classList.add('active');
}



function handleButtonClick(button, btnType, index) {

    button.removeEventListener('click', handleClickLogic);


    function handleClickLogic() {
        const group = this.closest('.buttons4');

        const prevButton = group.querySelector(`.${btnType}.active`);

        const newButton = this;

        const cssRule = newButton.getAttribute('add-css');

        const targetClass = classNameInput.value.trim() || firstClass;

        const prevState = {

            activeIndex: activeButtonIndexStore[`${targetClass}-${btnType}`] ?? 0,
            cssChanges: [],
        };


        if (cssRule) {

            cssRule.split(';').forEach(propertyValuePair => {
                const pair = propertyValuePair.trim();

                if (pair.startsWith("remove:")) {

                    const prop = pair.split(':')[1].trim();

                    prevState.cssChanges.push({
                        type: 'remove',
                        property: prop,
                        previousValue: getCssValueForClass(targetClass, prop)
                    });
                } else {

                    const [property, value] = pair.split(':').map(s => s.trim());
                    if (property && value) {

                        prevState.cssChanges.push({
                            type: 'add',
                            property,
                            previousValue: getCssValueForClass(targetClass, property)
                        });
                    }
                }
            });
        }


        applyNewState(group, btnType, newButton, cssRule, targetClass, index);


        trackChange({

            do: () => applyNewState(group, btnType, newButton, cssRule, targetClass, index),

            undo: () => revertToPreviousState(group, btnType, prevState, targetClass)
        });
    }


    button.addEventListener('click', handleClickLogic);
}

function applyNewState(group, btnType, newButton, cssRule, targetClass, index) {

    isUndoingRedoing = true;


    group.querySelectorAll(`.${btnType}`).forEach(btn => btn.classList.remove('active'));
    newButton.classList.add('active');
    activeButtonIndexStore[`${targetClass}-${btnType}`] = index;


    const firstClass = targetClass || currentSelectedElement?.classList[0] || "";
    if (!firstClass) return;


    if (cssRule) {
        const elementId = firstClass || currentSelectedElement.id;
        if (!elementId) return;


        elementUnits[elementId] = elementUnits[elementId] || {};
        elementMediaQueries[elementId] = elementMediaQueries[elementId] || {};
        elementHovers[currentHoverClass] = elementHovers[currentHoverClass] || {};

        cssRule.split(';').forEach(propertyValuePair => {
            const pair = propertyValuePair.trim();
            if (pair.startsWith("remove:")) {

                const prop = pair.split(':')[1].trim();


                delete elementUnits[elementId][`${prop}Value`];
                delete elementUnits[elementId][`${prop}Unit`];
                if (mediaEditingMode && currentMediaQuery) {
                    delete elementMediaQueries[elementId][currentMediaQuery]?.[prop];
                }
                if (hoverEditingMode && currentHoverClass) {
                    delete elementHovers[currentHoverClass][prop];
                }
                clearInputField(prop);
            } else {

                const [property, value] = pair.split(':').map(s => s.trim());
                if (property && value) {

                    const numericValue = value.replace(/[^0-9.]/g, '');
                    const unit = value.replace(/[0-9.]/g, '');


                    if (mediaEditingMode && currentMediaQuery) {
                        elementMediaQueries[elementId][currentMediaQuery] = {
                            ...elementMediaQueries[elementId][currentMediaQuery],
                            [property]: value,
                        };
                    } else if (hoverEditingMode && currentHoverClass) {
                        elementHovers[currentHoverClass][property] = value;
                    } else if (currentKeyframeIndex >= 0 && currentAnimationIndex >= 0) {
                        const anim = elementAnimations[firstClass]?.[currentAnimationIndex];
                        if (anim) {
                            const keyframe = anim.keyframes[currentKeyframeIndex];
                            if (keyframe) {
                                keyframe.properties[property] = value;
                            }
                        }
                    } else {

                        elementUnits[elementId][`${property}Value`] = numericValue;
                        elementUnits[elementId][`${property}Unit`] = unit;
                    }


                    updateInputField(property, value);
                }
            }
        });
    }


    if (mediaEditingMode && currentMediaQuery) {
        rebuildMediaStyles();
    } else if (hoverEditingMode && currentHoverClass) {
        rebuildHoverStyles();
    } else if (currentKeyframeIndex >= 0 && currentAnimationIndex >= 0) {
        applyElementAnimations(firstClass);
    } else {
        rebuildBaseStyles();
    }


    isUndoingRedoing = false;
}


function revertToPreviousState(group, btnType, prevState, targetClass) {
    isUndoingRedoing = true;

    prevState.cssChanges.forEach(change => {
        if (change.type === 'remove') {
            updateCssForClass(targetClass, change.property, change.previousValue || 'unset');
        } else {
            updateCssForClass(targetClass, change.property, change.previousValue);
        }
    });


    const buttons = group.querySelectorAll(`.${btnType}`);
    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttons[prevState.activeIndex]) {
        buttons[prevState.activeIndex].classList.add('active');
        activeButtonIndexStore[`${targetClass}-${btnType}`] = prevState.activeIndex;
    }

    isUndoingRedoing = false;
}

function clearInputField(property) {
    const input = document.querySelector(`input[add-css="${property}"]`);
    if (input) input.value = '';
}

let isProgrammaticUpdate = false;

function updateInputField(property, value) {
    isProgrammaticUpdate = true;
    const input = document.querySelector(`input[add-css="${property}"]`);
    if (input) input.value = value || '';
    isProgrammaticUpdate = false;
}


document.querySelectorAll('input[add-css]').forEach(input => {
    input.addEventListener('change', () => {
        if (isProgrammaticUpdate) return;

    });
});



function getCssValueForClass(className, property) {
    const element = document.querySelector(`.${className}`);
    return element ? getComputedStyle(element)[property] : '';
}



function applyStoredActiveStates(firstClass) {
    buttonTypes.forEach(btnType => {
        const activeIndex = activeButtonIndexStore[`${firstClass}-${btnType}`] ?? 0;

        document.querySelectorAll(`.${btnType}`).forEach((button, index) => {

            if (button.closest('.square-six-points')) return;

            button.classList.toggle('active', index === activeIndex);
        });
    });
}

function updateButtonActiveStates() {
    if (!currentSelectedElement || !(currentSelectedElement instanceof Element)) {
        console.warn('No valid selected element found.');
        return;
    }


    const computedStyles = getComputedStyle(currentSelectedElement);


    document.querySelectorAll('.buttons4').forEach(group => {
        let foundMatch = false;

        group.querySelectorAll('button').forEach(button => {
            const addCss = button.getAttribute('add-css')?.trim();

            if (addCss) {

                const cssProperties = addCss.split(';').map(prop => prop.trim()).filter(prop => prop);


                const isActive = cssProperties.every(propertyValuePair => {
                    const [property, value] = propertyValuePair.split(':').map(item => item.trim());
                    return computedStyles[property] === value;
                });


                if (isActive) {
                    button.classList.add('active');
                    foundMatch = true;
                } else {
                    button.classList.remove('active');
                }
            }
        });

        if (!foundMatch) {
            const firstButton = group.querySelector('button');
            if (firstButton) {
                firstButton.classList.add('active');
            }
        }
    });
}


buttonTypes.forEach(btnType => {

    document.querySelectorAll('.buttons4').forEach(group => {
        activateFirstButton(group, btnType);
    });


    document.querySelectorAll(`.${btnType}`).forEach((button, index) => {

        if (button.closest('.square-six-points')) return;

        handleButtonClick(button, btnType, index);
    });
});



const selectedTextStore = {};

const choiceDivMap = {
    "position-choice": { targetId: "currentWeight1", defaultText: "Static", cssProperty: "position" },
    "text-choice1": { targetId: "currentWeight2", defaultText: "Arial", cssProperty: "font-family" },
    "text-choice2": { targetId: "currentWeight3", defaultText: "400 - Normal", cssProperty: "font-weight" },
    "clip-choice": { targetId: "currentWeight4", defaultText: "None", cssProperty: "clip" },
    "align-choice1": { targetId: "currentWeight-a1", defaultText: "Left", cssProperty: "align-items" },
    "align-choice2": { targetId: "currentWeight-a2", defaultText: "Bottom", cssProperty: "justify-content" },
    "blending-choice": { targetId: "currentWeight5", defaultText: "Normal", cssProperty: "background-blend-mode" },
    "cursor-choice": { targetId: "currentWeight6", defaultText: "Auto", cssProperty: "cursor" },
    "transition-choice": { targetId: "currentWeight7", defaultText: "All Properties", cssProperty: "transition-property" },
    "transition-timing-choice": { targetId: "currentWeight8", defaultText: "Ease", cssProperty: "transition-timing-function" },
};

let isClickInProgress = false;


Object.entries(choiceDivMap).forEach(([choiceClass, { targetId, defaultText }]) => {
    document.querySelectorAll(`.${choiceClass}`).forEach(choice => {
        choice.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!currentSelectedElement) return;

            const firstClass = currentSelectedElement.classList[0];
            const cssRule = this.getAttribute('add-css-button').trim();
            const colonIndex = cssRule.indexOf(':');
            if (colonIndex === -1) return;

            const cssProperty = cssRule.slice(0, colonIndex).trim();
            const cssValue = cssRule.slice(colonIndex + 1).trim().replace(/;$/, '');
            const targetElement = document.getElementById(targetId);

            const prevState = {
                text: targetElement.textContent,
                css: getCssValueForClass(firstClass, cssProperty)
            };

            hoverPreview.clearPreview();


            targetElement.textContent = this.textContent;
            updateCssForClass(firstClass, cssProperty, cssValue);

            trackChange({
                do: () => {
                    targetElement.textContent = this.textContent;
                    updateCssForClass(firstClass, cssProperty, cssValue);
                },
                undo: () => {
                    targetElement.textContent = prevState.text;
                    if (prevState.css !== null) {
                        updateCssForClass(firstClass, cssProperty, prevState.css);
                    } else {
                        removeCssPropertyFromClass(firstClass, cssProperty);
                    }
                }
            });


            this.closest('.position-css-add')?.classList.remove('show');
        });
    });
});


function getCssValueForClass2(className, property) {
    const styleTag = document.getElementById('dynamic-styles');
    if (!styleTag) return null;


    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\.${escapedClass}\\s*{([^}]*)}`, 'g');
    const matches = styleTag.innerHTML.matchAll(regex);

    for (const match of matches) {
        const props = match[1];
        const propRegex = new RegExp(`${property}\\s*:\\s*([^;]+)`);
        const propMatch = props.match(propRegex);
        if (propMatch) return propMatch[1].trim();
    }
    return null;
}

function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function restoreChoiceValues() {
    if (!currentSelectedElement) return;
    const firstClass = (currentSelectedElement.classList && currentSelectedElement.classList[0])
        ? currentSelectedElement.classList[0].trim()
        : currentSelectedElement.id;
    if (!firstClass) return;

    Object.entries(choiceDivMap).forEach(([choiceKey, { targetId, defaultText, cssProperty }]) => {
        const targetElem = document.getElementById(targetId);
        if (targetElem) {

            let value = getCssValueForClass(firstClass, cssProperty);

            if (!value || value.toLowerCase() === "normal") {
                value = defaultText;
            }

            value = capitalizeFirstLetter(value);
            targetElem.textContent = value;
        }
    });
}



const pointTextMap = {
    "f1-points": { xText: "Left", yText: "Top" },
    "f2-points": { xText: "Center", yText: "Top" },
    "f3-points": { xText: "Right", yText: "Top" },
    "f4-points": { xText: "Left", yText: "Center" },
    "f5-points": { xText: "Center", yText: "Center" },
    "f6-points": { xText: "Right", yText: "Center" },
    "f7-points": { xText: "Left", yText: "Bottom" },
    "f8-points": { xText: "Center", yText: "Bottom" },
    "f9-points": { xText: "Right", yText: "Bottom" }
};


activateFlexAccess(["f1-points"]);


function activateFlexAccess(pointIds) {
    pointIds.forEach(pointId => {
        const flexPoint = document.querySelector(`.${pointId}`);
        if (flexPoint) {
            const accessDiv = flexPoint.querySelector('div');
            if (accessDiv) {
                accessDiv.classList.add('active');
            }
        }
    });
}

function clearActiveAccess() {
    document.querySelectorAll('.square-six-points .flex-btn .active').forEach(activeEl => {
        activeEl.classList.remove('active');
    });
}


function updateFlexAccessBasedOnWeights() {
    const currentXText = document.getElementById('currentWeight-a1').textContent;
    const currentYText = document.getElementById('currentWeight-a2').textContent;



    clearActiveAccess();

    let activePoints = [];
    if (currentXText === "Stretch") {
        if (currentYText === "Top") {
            activePoints = ["f1-points", "f2-points", "f3-points"];
        } else if (currentYText === "Center") {
            activePoints = ["f4-points", "f5-points", "f6-points"];
        } else if (currentYText === "Bottom") {
            activePoints = ["f7-points", "f8-points", "f9-points"];
        } else if (["Space Between", "Space Around"].includes(currentYText)) {
            activePoints = ["f1-points", "f2-points", "f3-points", "f4-points", "f5-points", "f6-points", "f7-points", "f8-points", "f9-points"];
        }
    } else if (currentXText === "Baseline") {
        if (currentYText === "Top") {
            activePoints = ["f1-points"];
        } else if (currentYText === "Center") {
            activePoints = ["f4-points"];
        } else if (currentYText === "Bottom") {
            activePoints = ["f7-points"];
        } else if (["Space Between", "Space Around"].includes(currentYText)) {
            activePoints = ["f1-points", "f4-points", "f7-points"];
        }
    } else if (["Space Between", "Space Around"].includes(currentYText)) {
        if (currentXText === "Left") {
            activePoints = ["f1-points", "f4-points", "f7-points"];
        } else if (currentXText === "Center") {
            activePoints = ["f2-points", "f5-points", "f8-points"];
        } else if (currentXText === "Right") {
            activePoints = ["f3-points", "f6-points", "f9-points"];
        } else if (currentXText === "Stretch") {
            activePoints = ["f1-points", "f2-points", "f3-points", "f4-points", "f5-points", "f6-points", "f7-points", "f8-points", "f9-points"];
        } else if (currentXText === "Baseline") {
            activePoints = ["f1-points", "f4-points", "f7-points"];
        }
    } else {

        const matchingPointId = Object.keys(pointTextMap).find(pointId => {
            const text = pointTextMap[pointId];
            return text.xText === currentXText && text.yText === currentYText;
        });

        if (matchingPointId) {
            activePoints = [matchingPointId];
        }
    }

    activateFlexAccess(activePoints);

    if (currentSelectedElement) {
        storeActiveState(currentSelectedElement, activePoints);
    }
}


document.querySelectorAll('.position-css-add h1').forEach(option => {
    option.addEventListener('click', function () {
        const parentContainer = this.closest('.position-css-add');
        const newText = this.textContent;

        if (parentContainer.classList.contains('n2')) {

            document.getElementById('currentWeight-a1').textContent = newText;
        } else if (parentContainer.classList.contains('n3')) {

            document.getElementById('currentWeight-a2').textContent = newText;
        }

        updateFlexAccessBasedOnWeights();
    });
});

function storeActiveState(element, activePoints) {
    if (!element) return;
    element.dataset.activePoints = JSON.stringify(activePoints);
}

function applyStoredActiveState(element) {
    if (!element) return;
    let activePoints = JSON.parse(element.dataset.activePoints || "[]");

    if (activePoints.length === 0) {
        activePoints = ["f1-points"];
    }

    activateFlexAccess(activePoints);
}


function convertToPercentage(value, unit, containerDimension) {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;

    switch (unit) {
        case "px":
            return (num / containerDimension) * 100;
        case "%":
            return num;
        case "vw": {
            const px = (num / 100) * window.innerWidth;
            return (px / containerDimension) * 100;
        }
        case "vh": {
            const px = (num / 100) * window.innerHeight;
            return (px / containerDimension) * 100;
        }
        case "em":
            return ((num * 16) / containerDimension) * 100;
        case "rem":
            return ((num * 16) / containerDimension) * 100;
        default:
            return num;
    }
}

function getGridCellClassForBackgroundPosition(xPercent, yPercent) {
    let horz, vert;

    if (xPercent <= 33.33) {
        horz = 'left';
    } else if (xPercent <= 66.66) {
        horz = 'center';
    } else {
        horz = 'right';
    }

    if (yPercent <= 33.33) {
        vert = 'top';
    } else if (yPercent <= 66.66) {
        vert = 'center';
    } else {
        vert = 'bottom';
    }

    if (vert === 'top') {
        if (horz === 'left') return 'f1-points2';
        if (horz === 'center') return 'f2-points2';
        if (horz === 'right') return 'f3-points2';
    } else if (vert === 'center') {
        if (horz === 'left') return 'f4-points2';
        if (horz === 'center') return 'f5-points2';
        if (horz === 'right') return 'f6-points2';
    } else if (vert === 'bottom') {
        if (horz === 'left') return 'f7-points2';
        if (horz === 'center') return 'f8-points2';
        if (horz === 'right') return 'f9-points2';
    }

    return 'f1-points2';
}

function updateSquareSixPoints2Indicator() {
    const container = document.querySelector('.square-six-points2');
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const posXInput = document.querySelector('input[add-css="background-position-x"]');
    const posYInput = document.querySelector('input[add-css="background-position-y"]');
    if (!posXInput || !posYInput) return;


    let cls = "";
    if (currentSelectedElement && currentSelectedElement.classList.length > 0) {
        cls = currentSelectedElement.classList[0].trim();
    } else {
        const keys = Object.keys(elementUnits);
        if (keys.length > 0) {
            cls = keys[0];
        }
    }

    if (cls && elementUnits[cls]) {
        if (!posXInput.value) {
            posXInput.value = (elementUnits[cls]["background-position-xValue"] !== undefined)
                ? elementUnits[cls]["background-position-xValue"]
                : 50;
        }
        if (!posYInput.value) {
            posYInput.value = (elementUnits[cls]["background-position-yValue"] !== undefined)
                ? elementUnits[cls]["background-position-yValue"]
                : 50;
        }
    } else {

        if (!posXInput.value) posXInput.value = 50;
        if (!posYInput.value) posYInput.value = 50;
    }


    let posXUnit = "px";
    const posXSelect = posXInput.parentElement.querySelector('.select-layout');
    if (posXSelect) {
        const activeXUnit = posXSelect.querySelector('.active');
        if (activeXUnit) {
            posXUnit = activeXUnit.getAttribute('value') || posXUnit;
        } else {
            const first = posXSelect.querySelector('div');
            if (first) {
                posXUnit = first.getAttribute('value') || posXUnit;
            }
        }
    }

    let posYUnit = "px";
    const posYSelect = posYInput.parentElement.querySelector('.select-layout');
    if (posYSelect) {
        const activeYUnit = posYSelect.querySelector('.active');
        if (activeYUnit) {
            posYUnit = activeYUnit.getAttribute('value') || posYUnit;
        } else {
            const first = posYSelect.querySelector('div');
            if (first) {
                posYUnit = first.getAttribute('value') || posYUnit;
            }
        }
    }

    let xPercent = convertToPercentage(posXInput.value, posXUnit, containerWidth);
    let yPercent = convertToPercentage(posYInput.value, posYUnit, containerHeight);


    xPercent = Math.max(0, Math.min(100, xPercent));
    yPercent = Math.max(0, Math.min(100, yPercent));


    const targetCellClass = getGridCellClassForBackgroundPosition(xPercent, yPercent);

    container.querySelectorAll('.flex-btn > div.active').forEach(el => {
        el.classList.remove('active');
    });

    const targetCell = container.querySelector(`.${targetCellClass}`);
    if (targetCell) {
        const innerDiv = targetCell.querySelector('div');
        if (innerDiv) {
            innerDiv.classList.add('active');
        }
    }
}

function restoreBackgroundPositionInputs() {
    let defaultClass = "";
    if (currentSelectedElement && currentSelectedElement.classList.length > 0) {
        defaultClass = currentSelectedElement.classList[0].trim();
    } else {
        const keys = Object.keys(elementUnits);
        if (keys.length > 0) {
            defaultClass = keys[0];
            const el = document.querySelector(`.${defaultClass}`);
            if (el) currentSelectedElement = el;
        }
    }
    if (!defaultClass) return;

    const posXInput = document.querySelector('input[add-css="background-position-x"]');
    const posYInput = document.querySelector('input[add-css="background-position-y"]');
    if (posXInput && posYInput && elementUnits[defaultClass]) {
        const savedX = elementUnits[defaultClass]["background-position-xValue"];
        const savedY = elementUnits[defaultClass]["background-position-yValue"];
        posXInput.value = (savedX !== undefined) ? savedX : 50;
        posYInput.value = (savedY !== undefined) ? savedY : 50;
    }
}

function restoreRadialPositionInputs() {
    let defaultClass = "";
    if (currentSelectedElement && currentSelectedElement.classList.length > 0) {
        defaultClass = currentSelectedElement.classList[0].trim();
    } else {
        const keys = Object.keys(elementUnits);
        if (keys.length > 0) {
            defaultClass = keys[0];
            const el = document.querySelector(`.${defaultClass}`);
            if (el) currentSelectedElement = el;
        }
    }
    if (!defaultClass) return;

    const radialXInput = document.querySelector('input[add-css="background-radial-left"]');
    const radialYInput = document.querySelector('input[add-css="background-radial-top"]');
    if (radialXInput && radialYInput && elementUnits[defaultClass]) {
        const savedRadialX = elementUnits[defaultClass]["background-radial-leftValue"];
        const savedRadialY = elementUnits[defaultClass]["background-radial-topValue"];
        radialXInput.value = (savedRadialX !== undefined) ? savedRadialX : 50;
        radialYInput.value = (savedRadialY !== undefined) ? savedRadialY : 50;
    }
}



document.querySelectorAll('input[add-css="background-position-x"], input[add-css="background-position-y"]').forEach(input => {
    input.addEventListener('input', updateSquareSixPoints2Indicator);
});


document.querySelectorAll('.select-layout div').forEach(div => {
    div.addEventListener('click', function () {
        const parent = this.parentElement;

        parent.querySelectorAll('div').forEach(sibling => sibling.classList.remove('active'));
        this.classList.add('active');
        updateSquareSixPoints2Indicator();
    });
});

document.addEventListener("DOMContentLoaded", function () {

    restoreBackgroundPositionInputs();
    restoreRadialPositionInputs();


    if (!currentSelectedElement) {
        const keys = Object.keys(elementUnits);
        if (keys.length > 0) {
            const defaultClass = keys[0];
            const defaultEl = document.querySelector(`.${defaultClass}`);
            if (defaultEl) {
                currentSelectedElement = defaultEl;
                currentSelectedElement.classList.add('selected');
            }
        }
    }

    updateSquareSixPoints2Indicator();
    updateSquareSixPoints3Indicator();
});



function getGridCellClassForRadialPosition(xPercent, yPercent) {
    let horz, vert;

    if (xPercent <= 33.33) {
        horz = 'left';
    } else if (xPercent <= 66.66) {
        horz = 'center';
    } else {
        horz = 'right';
    }

    if (yPercent <= 33.33) {
        vert = 'top';
    } else if (yPercent <= 66.66) {
        vert = 'center';
    } else {
        vert = 'bottom';
    }

    if (vert === 'top') {
        if (horz === 'left') return 'f1-points3';
        if (horz === 'center') return 'f2-points3';
        if (horz === 'right') return 'f3-points3';
    } else if (vert === 'center') {
        if (horz === 'left') return 'f4-points3';
        if (horz === 'center') return 'f5-points3';
        if (horz === 'right') return 'f6-points3';
    } else if (vert === 'bottom') {
        if (horz === 'left') return 'f7-points3';
        if (horz === 'center') return 'f8-points3';
        if (horz === 'right') return 'f9-points3';
    }

    return 'f1-points3';
}


function updateSquareSixPoints3Indicator() {
    const container = document.querySelector('.square-six-points3');
    if (!container) {
        console.log("No radial container found");
        return;
    }

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const posXInput = document.querySelector('input[add-css="background-radial-left"]');
    const posYInput = document.querySelector('input[add-css="background-radial-top"]');
    if (!posXInput || !posYInput) {
        console.log("Radial inputs not found");
        return;
    }

    let posXValue = posXInput.value;
    let posYValue = posYInput.value;
    console.log("Radial input values:", posXValue, posYValue);


    let posXUnit = "px";
    const posXSelect = posXInput.parentElement.querySelector('.select-layout');
    if (posXSelect) {
        const activeXUnit = posXSelect.querySelector('.active');
        if (activeXUnit) {
            posXUnit = activeXUnit.getAttribute('value') || posXUnit;
        } else {
            const first = posXSelect.querySelector('div');
            if (first) {
                posXUnit = first.getAttribute('value') || posXUnit;
            }
        }
    }


    let posYUnit = "px";
    const posYSelect = posYInput.parentElement.querySelector('.select-layout');
    if (posYSelect) {
        const activeYUnit = posYSelect.querySelector('.active');
        if (activeYUnit) {
            posYUnit = activeYUnit.getAttribute('value') || posYUnit;
        } else {
            const first = posYSelect.querySelector('div');
            if (first) {
                posYUnit = first.getAttribute('value') || posYUnit;
            }
        }
    }
    console.log("Radial units:", posXUnit, posYUnit);


    let xPercent = convertToPercentage(posXValue, posXUnit, containerWidth);
    let yPercent = convertToPercentage(posYValue, posYUnit, containerHeight);
    console.log("Radial percentages:", xPercent, yPercent);


    xPercent = Math.max(0, Math.min(100, xPercent));
    yPercent = Math.max(0, Math.min(100, yPercent));

    const targetCellClass = getGridCellClassForRadialPosition(xPercent, yPercent);
    console.log("Target radial cell class:", targetCellClass);

    container.querySelectorAll('.flex-btn > div.active').forEach(el => {
        el.classList.remove('active');
    });

    const targetCell = container.querySelector(`.${targetCellClass}`);
    if (targetCell) {
        const innerDiv = targetCell.querySelector('div');
        if (innerDiv) {
            innerDiv.classList.add('active');
        } else {
            console.log("No inner div found in", targetCell);
        }
    } else {
        console.log("No target cell found for", targetCellClass);
    }
}



document.querySelectorAll('input[add-css="background-radial-left"], input[add-css="background-radial-top"]').forEach(input => {
    input.addEventListener('input', updateSquareSixPoints3Indicator);
});


document.querySelectorAll('.select-layout[data-unit-for="backgroundRadialLeft"] div, .select-layout[data-unit-for="backgroundRadialTop"] div').forEach(div => {
    div.addEventListener('click', function () {
        const parent = this.parentElement;
        parent.querySelectorAll('div').forEach(sibling => sibling.classList.remove('active'));
        this.classList.add('active');
        updateSquareSixPoints3Indicator();
    });
});



const classStyles = {};

let currentSelectedElement = null;



const transformState = {};

const inputs = document.querySelectorAll('.input-number');

function handleCssInput(e) {
    const input = e.target;
    const cssProperty = input.getAttribute('add-css');
    const rawValue = input.value.trim();
    const firstClass = currentSelectedElement?.classList[0] || "";


    if (currentSelectedElement) {
        if (currentSelectedElement.classList.length === 1) {
            displayErrorMessage("Please create a custom class for hover/selected styles and try again to add css.");
            return;
        }
    } else {
        displayErrorMessage("No element selected. Please select an element to apply CSS.");
        return;
    }


    if (cssProperty.startsWith('box-shadow')) {
        const shadowType = input.id.split('-')[0];
        const isTextShadow = false;
        handleShadowInput(input, shadowType, isTextShadow);
        return;
    }

    if (cssProperty.startsWith('text-shadow')) {
        const shadowType = input.id.split('-')[0];
        const isTextShadow = true;
        handleShadowInput(input, shadowType, isTextShadow);
        return;
    }

    if (cssProperty === "background-color" ||
        cssProperty === "color" ||
        cssProperty === "border-color" ||
        cssProperty === "outline-color") {
        handleColorProperty(rawValue, input, cssProperty);
        return;
    }

    if (cssProperty === "background-image") {
        handleBackgroundImage(rawValue, input);
        return;
    }

    if (input.id === "background-size-x" || input.id === "background-size-y") {
        handleBackgroundSizeInput();
        return;
    }


    if (!currentSelectedElement) {
        displayErrorMessage("No element selected. Please select an element to apply CSS.");
        return;
    }

    const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;
    if (!elementId) return;



    if (cssProperty === "opacity") {
        handleOpacityProperty(rawValue, input);
        return;
    }


    if (cssProperty.startsWith('filter:')) {
        handleFilterProperty(cssProperty, rawValue, input);
        return;
    }

    if (cssProperty.startsWith('backdrop-filter:')) {
        handleBackdropFilterProperty(cssProperty, rawValue, input);
        return;
    }

    if (cssProperty === "transition-duration") {
        handleTransitionDurationProperty(cssProperty, rawValue, input);
        return;
    }


    const mediaStyleTag = document.getElementById('dynamic-media-styles');
    const mediaStyles = mediaStyleTag ? mediaStyleTag.textContent : '';
    const windowWidth = window.innerWidth;


    const doesMediaQueryContainProperty = (mediaStyles, maxWidth, elementId, property) => {
        const mediaQueryRegex = new RegExp(`@media\\s*\\(max-width:\\s*${maxWidth}px\\)\\s*\\{[^}]*\\.${elementId}\\s*\\{([^}]*)\\}`, 'g');
        const match = mediaQueryRegex.exec(mediaStyles);

        if (match) {
            const properties = match[1];
            const propertyRegex = new RegExp(`\\b${property}\\s*:\\s*[^;]+;`, 'i');
            return propertyRegex.test(properties);
        }
        return false;
    };

    const doesMatchingMediaQueryExist = (windowWidth, cssProperty) => {
        const mediaItems = document.querySelectorAll('.media-list li');
        let matchingMedia = null;

        for (const li of mediaItems) {
            const mediaCondition = li.getAttribute('data-media');
            const maxWidthMatch = mediaCondition.match(/max-width:\s*(\d+)px/i);

            if (maxWidthMatch) {
                const maxWidth = parseInt(maxWidthMatch[1], 10);
                if (windowWidth <= maxWidth) {
                    matchingMedia = maxWidth;

                    const propertyExists = doesMediaQueryContainProperty(
                        mediaStyles,
                        maxWidth,
                        elementId,
                        cssProperty
                    );

                    if (propertyExists) {
                        displayErrorMessage(
                            `Cannot add "${cssProperty}" to the element "${elementId}" while the window matches the media query: max-width: ${maxWidth}px. Please select this media query before adding styles.`
                        );
                        return true;
                    }
                }
            }
        }

        return false;
    };

    if (doesMatchingMediaQueryExist(windowWidth, cssProperty)) {
        return;
    }

    const chosenUnit = selectedUnits[input.id] || "px";


    if (mediaEditingMode && currentMediaQuery) {

        elementMediaQueries[elementId] = elementMediaQueries[elementId] || {};
        const previousMediaValue = (elementMediaQueries[elementId][currentMediaQuery] && elementMediaQueries[elementId][currentMediaQuery][cssProperty]) || '';

        elementMediaQueries[elementId][currentMediaQuery] = {
            ...((elementMediaQueries[elementId][currentMediaQuery]) || {}),
            [cssProperty]: /^\d+$/.test(rawValue) ? rawValue + chosenUnit : rawValue,
        };
        const newMediaValue = elementMediaQueries[elementId][currentMediaQuery][cssProperty];

        trackChange({
            undo: function () {
                if (!previousMediaValue) {
                    delete elementMediaQueries[elementId][currentMediaQuery][cssProperty];
                } else {
                    elementMediaQueries[elementId][currentMediaQuery][cssProperty] = previousMediaValue;
                }
                rebuildMediaStyles();
                const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
                if (inputEl) {
                    if (inputEl.type === 'number') {
                        const match = previousMediaValue.match(/^([\d.]+)/);
                        inputEl.value = match ? match[1] : '';
                    } else {
                        inputEl.value = previousMediaValue;
                    }
                }
            },
            do: function () {
                elementMediaQueries[elementId][currentMediaQuery][cssProperty] = newMediaValue;
                rebuildMediaStyles();
                const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
                if (inputEl) {
                    if (inputEl.type === 'number') {
                        const match = newMediaValue.match(/^([\d.]+)/);
                        inputEl.value = match ? match[1] : '';
                    } else {
                        inputEl.value = newMediaValue;
                    }
                }
            }
        });

        rebuildMediaStyles();
        return;
    }


    if (hoverEditingMode && currentHoverClass) {
        elementHovers[currentHoverClass] = elementHovers[currentHoverClass] || {};

        const previousHoverValue = elementHovers[currentHoverClass][cssProperty] || '';

        let newHoverValue;
        if (!rawValue) {
            delete elementHovers[currentHoverClass][cssProperty];
            newHoverValue = '';
        } else {
            elementHovers[currentHoverClass][cssProperty] = rawValue;
            newHoverValue = rawValue;
        }

        trackChange({
            undo: function () {
                if (!previousHoverValue) {
                    delete elementHovers[currentHoverClass][cssProperty];
                } else {
                    elementHovers[currentHoverClass][cssProperty] = previousHoverValue;
                }
                rebuildHoverStyles();
                const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
                if (inputEl) {
                    inputEl.value = previousHoverValue;
                }
            },

            do: function () {
                elementHovers[currentHoverClass][cssProperty] = newHoverValue;
                rebuildHoverStyles();
                const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
                if (inputEl) {
                    inputEl.value = newHoverValue;
                }
            }
        });

        rebuildHoverStyles();
        return;
    }


    const numericValue = rawValue.replace(/[^0-9.]/g, '');
    const targetInputId = `${firstClass}-${cssProperty}`;


    if (currentKeyframeIndex >= 0 && currentAnimationIndex >= 0) {
        const anim = elementAnimations[firstClass]?.[currentAnimationIndex];
        if (anim) {
            const keyframe = anim.keyframes[currentKeyframeIndex];
            if (keyframe) {
                // Capture previous keyframe state.
                const previousKeyframeValue = keyframe.properties[cssProperty] || '';
                // Always extract numeric value and append unit if numeric.
                const numericValue = rawValue.replace(/[^0-9.]/g, '');
                keyframe.properties[cssProperty] = numericValue
                    ? `${numericValue}${chosenUnit}`
                    : rawValue;
                selectedUnits[`${firstClass}-${cssProperty}`] = chosenUnit;
                const newKeyframeValue = keyframe.properties[cssProperty];

                trackChange({
                    undo: function () {
                        keyframe.properties[cssProperty] = previousKeyframeValue;
                        applyElementAnimations(firstClass);
                        const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
                        if (inputEl) {
                            if (inputEl.type === 'number') {
                                const match = previousKeyframeValue.match(/^([\d.]+)/);
                                inputEl.value = match ? match[1] : '';
                            } else {
                                inputEl.value = previousKeyframeValue;
                            }
                        }
                    },
                    do: function () {
                        keyframe.properties[cssProperty] = newKeyframeValue;
                        applyElementAnimations(firstClass);
                        const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
                        if (inputEl) {
                            if (inputEl.type === 'number') {
                                const match = newKeyframeValue.match(/^([\d.]+)/);
                                inputEl.value = match ? match[1] : '';
                            } else {
                                inputEl.value = newKeyframeValue;
                            }
                        }
                    }
                });

                applyElementAnimations(firstClass);
                return;
            }
        }
    }




    if (cssProperty.startsWith('transform:')) {
        handleTransformProperty(cssProperty, rawValue, input);
        return;
    }


    if (cssProperty === 'background-radial-left' || cssProperty === 'background-radial-top') {
        rebuildRadialBackground();
    }

    elementUnits[elementId] = elementUnits[elementId] || {};
    const previousValue = elementUnits[elementId][`${cssProperty}Value`] || '';
    const previousUnit = elementUnits[elementId][`${cssProperty}Unit`] || '';

    if (!rawValue) {
        delete elementUnits[elementId][`${cssProperty}Value`];
        delete elementUnits[elementId][`${cssProperty}Unit`];
    } else {
        const finalValue = /^\d+$/.test(rawValue) ? rawValue + chosenUnit : rawValue;
        elementUnits[elementId][`${cssProperty}Value`] = parseFloat(rawValue) || rawValue;
        elementUnits[elementId][`${cssProperty}Unit`] = chosenUnit;
        selectedUnits[input.id] = chosenUnit;
    }

    rebuildBaseStyles();
    const newValue = elementUnits[elementId][`${cssProperty}Value`] || '';
    const newUnit = elementUnits[elementId][`${cssProperty}Unit`] || '';

    trackChange({
        undo: function () {
            if (!previousValue) {
                delete elementUnits[elementId][`${cssProperty}Value`];
                delete elementUnits[elementId][`${cssProperty}Unit`];
            } else {
                elementUnits[elementId][`${cssProperty}Value`] = previousValue;
                elementUnits[elementId][`${cssProperty}Unit`] = previousUnit;
            }
            rebuildBaseStyles();
            input.value = previousValue;
        },
        do: function () {
            elementUnits[elementId][`${cssProperty}Value`] = newValue;
            elementUnits[elementId][`${cssProperty}Unit`] = newUnit;
            rebuildBaseStyles();
            input.value = newValue;
        }
    });
}



document.querySelectorAll('input[add-css]').forEach((input) => {
    input.addEventListener('input', handleCssInput);
});

function initUnitSelectors() {
    if (!currentSelectedElement) {
        /* console.warn("[initUnitSelectors] No selected element on initialization, skipping"); */
        return;
    }

    const firstClass = currentSelectedElement.classList[0] || currentSelectedElement.id;
    if (!firstClass) {
        /* console.warn("[initUnitSelectors] Selected element has no class or ID, skipping"); */
        return;
    }

    document.querySelectorAll(".select-layout").forEach((selector) => {
        const items = selector.querySelectorAll("div[value]");
        if (!items.length) return;

        const targetInputId = selector.getAttribute("data-unit-for");
        const cssProperty = inputMappings[targetInputId];

        if (!cssProperty) {
            /* console.warn(`[initUnitSelectors] No mapping for input: ${targetInputId}`); */
            return;
        }


        let availableUnits = [];
        if (cssProperty === "opacity") {
            availableUnits = ["%"];
        } else if (cssProperty.startsWith('transform:')) {
            const transformType = cssProperty.split(':')[1];
            availableUnits = getTransformUnits(transformType);
        }
        else if (cssProperty === "transition-duration") {
            availableUnits = ["MS"];
        } else if (cssProperty.startsWith("filter:")) {
            const filterType = cssProperty.split(':')[1].trim();
            availableUnits = [getDefaultFilterUnit(filterType)];
        } else if (cssProperty.startsWith("backdrop-filter:")) {
            const filterType = cssProperty.split(':')[1].trim();
            availableUnits = [getDefaultBackdropFilterUnit(filterType)];
        } else {
            availableUnits = ['px', '%', 'em', 'rem', 'vw', 'vh', 'auto'];
        }



        items.forEach(item => {
            item.style.display = availableUnits.includes(item.value) ? 'block' : 'none';
        });


        let savedUnit;
        if (cssProperty === "opacity") {
            savedUnit = "%";
        } else if (cssProperty.startsWith('transform:')) {
            const transformType = cssProperty.split(':')[1];
            savedUnit = selectedUnits[targetInputId] || getDefaultUnit(transformType);
        }
        else if (cssProperty === "transition-duration") {
            savedUnit = selectedUnits[targetInputId] || "MS";
        }
        else if (cssProperty.startsWith("filter:")) {
            const filterType = cssProperty.split(':')[1].trim();
            savedUnit = selectedUnits[targetInputId] || getDefaultFilterUnit(filterType);
        } else if (cssProperty.startsWith("backdrop-filter:")) {
            const filterType = cssProperty.split(':')[1].trim();
            savedUnit = selectedUnits[targetInputId] || getDefaultBackdropFilterUnit(filterType);
        } else {
            savedUnit = selectedUnits[targetInputId] || "px";
        }

        const styleBlock = document.getElementById("dynamic-styles");
        if (styleBlock) {
            const dynamicStyles = styleBlock.textContent;
            const regex = new RegExp(`\\.${firstClass}\\s*\\{[^}]*${cssProperty}\\s*:\\s*([^;]+);`, "i");
            const match = dynamicStyles.match(regex);

            if (match) {
                const dynamicValue = match[1].trim();

                if (cssProperty.startsWith('transform:')) {
                    const transformType = cssProperty.split(':')[1];
                    const valueMatch = dynamicValue.match(new RegExp(`${transformType}\\(([^)]+)`));
                    if (valueMatch) {
                        const unitMatch = valueMatch[1].match(/([-\d.]+)([a-z%]*)/);
                        if (unitMatch) {
                            savedUnit = unitMatch[2] || getDefaultUnit(transformType);
                        }
                    }
                } else if (cssProperty === "opacity") {

                    const unitMatch = dynamicValue.match(/([-\d.]+)([a-z%]*)/);
                    if (unitMatch) {
                        savedUnit = unitMatch[2] || "%";
                    }
                }
                else {
                    const unitMatch = dynamicValue.match(/([-\d.]+)([a-z%]*)/);
                    if (unitMatch) savedUnit = unitMatch[2] || "px";
                }
            }
        }

        let displaySpan = selector.querySelector(".unit-display");
        if (!displaySpan) {
            displaySpan = document.createElement("span");
            displaySpan.className = "unit-display";
            selector.insertBefore(displaySpan, items[0]);
        }

        displaySpan.innerText = savedUnit.toUpperCase();
        selectedUnits[targetInputId] = savedUnit;

        items.forEach((item) => {
            item.style.display = "none";
        });

        displaySpan.addEventListener("click", () => {
            const isOpen = items[0].style.display === "block";
            items.forEach((item) => {
                item.style.display = isOpen ? "none" : "block";
            });
            selector.classList.toggle("menu-open", !isOpen);
        });

        items.forEach((item) => {
            item.addEventListener("click", () => {
                const chosenUnit = item.getAttribute("value");
                displaySpan.innerText = chosenUnit.toUpperCase();
                selectedUnits[targetInputId] = chosenUnit;

                console.log(`[initUnitSelectors] ${targetInputId} updated to unit=${chosenUnit}`);


                items.forEach((i) => (i.style.display = "none"));
                selector.classList.remove("menu-open");


                const relatedInput = document.getElementById(targetInputId);
                if (relatedInput && relatedInput.value.trim()) {
                    handleCssInput({ target: relatedInput });
                }
            });
        });
    });
}


initUnitSelectors();


const elementUnits = {};


function rebuildBaseStyles() {
    
    const styleBlock = document.getElementById("dynamic-styles");
    if (!styleBlock) return;

    let cssText = "";


    Object.keys(elementUnits).forEach((cls) => {
        const propsObj = elementUnits[cls];
        const lines = [];
        const colorProperties = ["background-color", "color", "border-color", "outline-color"];


        if (propsObj['box-shadow'] === '') {
            delete propsObj['box-shadow'];
        }

        if (propsObj['text-shadow']) {
            lines.push(`text-shadow: ${propsObj['text-shadow']};`);
        }

        colorProperties.forEach((prop) => {
            if (propsObj[prop]) {
                lines.push(`${prop}: ${propsObj[prop]};`);
            }
        });


        let existingTransforms = {};
        if (propsObj.transformValue) {
            propsObj.transformValue.split(" ").forEach((transform) => {
                const match = transform.match(/(\w+)\(([^)]+)\)/);
                if (match) {
                    existingTransforms[match[1]] = match[2];
                }
            });
        }
        if (transformState[cls]) {
            Object.entries(transformState[cls]).forEach(([type, value]) => {
                existingTransforms[type] = value;
            });
        }
        const transforms = Object.entries(existingTransforms).map(
            ([type, value]) => `${type}(${value})`
        );
        if (transforms.length > 0) {
            lines.push(`transform: ${transforms.join(" ")};`);
            propsObj.transformValue = transforms.join(" ");
        }

        Object.keys(propsObj).forEach((key) => {
            if (
                key.endsWith("Value") &&
                !key.startsWith("transform") &&
                key !== "filterValue" &&
                key !== "backdropFilterValue" &&
                key !== "transition-durationValue" &&
                !key.startsWith("background-size")
            ) {
                const baseProp = key.replace("Value", "");


                if (baseProp.startsWith("background-radial-")) {
                    return;
                }
                if (baseProp === "opacity") {
                    lines.push(`${baseProp}: ${propsObj[key]};`);
                } else {
                    const theValue = propsObj[key];
                    const theUnit = propsObj[baseProp + "Unit"] || "px";
                    const finalVal = (theUnit === "auto") ? "auto" : `${theValue}${theUnit}`;
                    lines.push(`${baseProp}: ${finalVal};`);
                }
            }
        });


        if (propsObj["background-image"]) {
            let bg = propsObj["background-image"].trim();
            if (bg.startsWith("url(") && bg.endsWith(")")) {
                let inner = bg.slice(4, -1).trim();
                if (!(inner.startsWith('"') || inner.startsWith("'"))) {
                    inner = `"${inner}"`;
                }
                bg = `url(${inner})`;
            }
            lines.push(`background-image: ${bg};`);
        }

        if (propsObj["background-sizeValue"] !== undefined && propsObj["background-sizeValue"] !== "") {
            lines.push(`background-size: ${propsObj["background-sizeValue"]};`);
        } else if (propsObj["background-size-xValue"] !== undefined || propsObj["background-size-yValue"] !== undefined) {
            const sizeX = (propsObj["background-size-xValue"] !== undefined)
                ? propsObj["background-size-xValue"] + (propsObj["background-size-xUnit"] || "px")
                : "auto";
            const sizeY = (propsObj["background-size-yValue"] !== undefined)
                ? propsObj["background-size-yValue"] + (propsObj["background-size-yUnit"] || "px")
                : "auto";
            lines.push(`background-size: ${sizeX} ${sizeY};`);
        }

        Object.entries(propsObj).forEach(([propName, propValue]) => {
            if (
                colorProperties.includes(propName) ||
                propName === "text-shadow" ||
                propName === "transformValue" ||
                propName.endsWith("Value") ||
                propName.endsWith("Unit") ||
                propName === "background-image" ||
                propName === "background-size"
            ) {
                return;
            }
            if (propValue != null) {
                lines.push(`${propName}: ${propValue};`);
            }
        });

        if (propsObj["filterValue"]) {
            lines.push(`filter: ${propsObj["filterValue"]};`);
        }
        if (propsObj["backdropFilterValue"]) {
            lines.push(`backdrop-filter: ${propsObj["backdropFilterValue"]};`);
        }
        if (propsObj["transition-durationValue"] !== undefined) {
            const tdUnit = propsObj["transition-durationUnit"] || "MS";
            lines.push(`transition-duration: ${propsObj["transition-durationValue"]}${tdUnit};`);
        }

        if (lines.length > 0) {
            // Add container context to match preview specificity
            cssText += `#preview-content .${cls} {\n  ${lines.join("\n  ")}\n}\n\n`;
            
            // Add base selector for override capability
            /* cssText += `.${cls} {\n  ${lines.join("\n  ")}\n}\n\n`; */
        }
    });

    styleBlock.textContent = cssText.trim();
}







function parseDynamicStyles() {
    const styleBlock = document.getElementById("dynamic-styles");
    const dynamicStyles = styleBlock ? styleBlock.textContent : "";
    const cssRules = {};
    if (dynamicStyles) {
        const regex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
        let match;
        while ((match = regex.exec(dynamicStyles)) !== null) {
            const className = match[1];
            cssRules[className] = {};
            match[2].split(";").forEach(prop => {
                const parts = prop.split(":").map(str => str.trim());
                if (parts[0] && parts[1]) {
                    cssRules[className][parts[0]] = parts[1];
                }
            });
        }
    }
    return cssRules;
}

function clearInputs(inputs) {
    inputs.forEach(input => { if (input) input.value = ''; });
}



function populateColorInputs(cssRules, elementId) {
    const colorProps = ['background-color', 'color', 'border-color', 'outline-color'];
    colorProps.forEach(prop => {
        const val = (cssRules[elementId] && cssRules[elementId][prop]) ||
            (elementUnits[elementId] && elementUnits[elementId][prop]);
        if (!val) return;
        const inputIds = {
            'background-color': ['backgroundColorInput', 'backgroundColorHex'],
            'color': ['fontColorInput', 'fontColorHex'],
            'border-color': ['borderColorInput', 'borderColorHex'],
            'outline-color': ['outlineColorInput', 'outlineColorHex']
        }[prop];
        if (inputIds) {
            const hex = rgbToHex(val);
            inputIds.forEach(id => {
                const inp = document.getElementById(id);
                if (inp) {
                    inp.value = hex;
                    elementUnits[elementId] = elementUnits[elementId] || {};
                    elementUnits[elementId][prop] = hex;
                }
            });
        }
    });
}

function populateTransformInputs(cssRules, elementId) {
    if (!(cssRules[elementId] && cssRules[elementId].transform)) return;
    const transformValue = (cssRules[elementId] && cssRules[elementId].transform) || '';
    const funcs = transformValue.match(/(\w+)\(([^)]+)\)/g) || [];
    funcs.forEach(func => {
        const m = func.match(/(\w+)\(([^)]+)\)/);
        if (!m) return;

        const type = m[1];
        const value = m[2];
        const inputId = Object.keys(inputMappings).find(key => inputMappings[key] === `transform:${type}`);
        if (inputId) {
            const m2 = value.match(/^([-\d.]+)([a-z%]*)$/);
            if (m2) {
                const num = m2[1];
                const unit = m2[2] || getDefaultUnit(type);
                const inp = document.getElementById(inputId);
                if (inp) {
                    inp.value = num;
                    const layout = document.querySelector(`.select-layout[data-unit-for="${inputId}"]`);
                    if (layout) {
                        const span = layout.querySelector('.unit-display');
                        if (span) span.textContent = unit.toUpperCase();
                        selectedUnits[inputId] = unit;
                    }
                }
            }
        }
    });
}

const FILTER_DEFAULTS = {
    brightness: "100%",
    contrast: "100%",
    saturate: "100%",
    blur: "0px",
    "hue-rotate": "0deg",
    grayscale: "0%",
    invert: "0%",
    sepia: "0%"
};


function getFilterType(inputId) {
    const mapping = {
        filterBlurInput: "blur",
        filterbrightnessInput: "brightness",
        filterContrastInput: "contrast",
        filterHueRotateInput: "hue-rotate",
        filterSaturateInput: "saturate",
        filterGrayscaleInput: "grayscale",
        filterInvertInput: "invert",
        filterSepiaInput: "sepia",
        backdropFilterBlurInput: "blur",
        backdropFilterbrightnessInput: "brightness",
        backdropFilterContrastInput: "contrast",
        backdropFilterHueRotateInput: "hue-rotate",
        backdropFilterSaturateInput: "saturate",
        backdropFilterGrayscaleInput: "grayscale",
        backdropFilterInvertInput: "invert",
        backdropFilterSepiaInput: "sepia"
    };
    return mapping[inputId] || "";
}


function getFilterInputId(filterType, prefix) {
    const inputMap = {
        blur: `${prefix}BlurInput`,
        brightness: `${prefix}brightnessInput`,
        contrast: `${prefix}ContrastInput`,
        "hue-rotate": `${prefix}HueRotateInput`,
        saturate: `${prefix}SaturateInput`,
        grayscale: `${prefix}GrayscaleInput`,
        invert: `${prefix}InvertInput`,
        sepia: `${prefix}SepiaInput`
    };
    return inputMap[filterType];
}


function updateUnitDisplay(inputId, unit) {
    const layout = document.querySelector(`[data-unit-for="${inputId}"]`);
    if (!layout) return;
    const span = layout.querySelector(".unit-display");
    if (span) {
        span.textContent = unit;
    }
    selectedUnits[inputId] = unit;
}

/**
 * This helper updates filter or backdrop-filter inputs.
 * 
 * @param {Object} cssRules - Parsed dynamic styles.
 * @param {String} elementId - Unique identifier for the element.
 * @param {String} propertyName - Either "filter" or "backdrop-filter".
 * @param {String} inputPrefix - Either "filter" or "backdropFilter" (used for input IDs).
 * @param {Function} getDefaultUnitFn - Function to get default unit for a given filter type.
 */
function populateCompositeFilterInputs(cssRules, elementId, propertyName, inputPrefix, getDefaultUnitFn) {
    // 1. Set defaults for each filter type.
    const DEFAULT_VALUES = {
        brightness: "100",
        contrast: "100",
        saturate: "100",
        blur: "0",
        "hue-rotate": "0",
        grayscale: "0",
        invert: "0",
        sepia: "0"
    };

    // For each filter type in our defaults, set the default value for the input.
    Object.entries(DEFAULT_VALUES).forEach(([type, defVal]) => {
        const inputId = getFilterInputId(type, inputPrefix);
        if (!inputId) return;
        const inp = document.getElementById(inputId);
        if (!inp) return;
        inp.value = defVal;
        updateUnitDisplay(inputId, getDefaultUnitFn(type));
    });

    // 2. Process the actual composite value.
    if (!cssRules[elementId] || !cssRules[elementId][propertyName]) return;

    // UPDATED REGEX: Capture function name, numeric part, and optional unit
    const regex = /([a-zA-Z0-9-]+)\(\s*([\d.]+)(px|%|deg|vw|vh|em|rem)?\s*\)/gi;

    let match;
    while ((match = regex.exec(cssRules[elementId][propertyName])) !== null) {
        const type = match[1];              // e.g., "blur", "brightness"
        let num = parseFloat(match[2]);     // e.g., "5.0", "120"
        let unit = match[3] || getDefaultUnitFn(type);

        // For brightness/contrast/saturate(0), treat 0 as 100
        if (["brightness", "contrast", "saturate"].includes(type) && num === 0) {
            num = 100;
        }

        const inputId = getFilterInputId(type, inputPrefix);
        if (!inputId) continue;
        const inp = document.getElementById(inputId);
        if (!inp) continue;

        // Update the input value and unit display.
        inp.value = num;
        updateUnitDisplay(inputId, unit);
    }
}


function populateFilterInputs(cssRules, elementId) {
    populateCompositeFilterInputs(cssRules, elementId, "filter", "filter", getDefaultFilterUnit);
}

function populateBackdropFilterInputs(cssRules, elementId) {
    populateCompositeFilterInputs(cssRules, elementId, "backdrop-filter", "backdropFilter", getDefaultBackdropFilterUnit);
}

function populateNonTransformInputs(cssRules, elementId, computedStyle) {
    Object.keys(inputMappings).forEach(inputId => {
        const cssProp = inputMappings[inputId];
        if (cssProp.startsWith('transform:') ||
            ['background-color', 'color', 'border-color', 'outline-color'].includes(cssProp))
            return;

        const inputs = document.querySelectorAll(`input[add-css="${cssProp}"]`);
        if (!inputs || inputs.length === 0) return;

        let val = "", unit = "px", fromDynamic = false;

        if (cssRules[elementId] && cssRules[elementId][cssProp]) {
            fromDynamic = true;
            const m = cssRules[elementId][cssProp].match(/([-\d.]+)(px|%|em|rem|vh|vw|auto)?/i);
            if (m) {
                val = parseFloat(m[1]);
                unit = m[2] || "px";
            }
        }

        const compVal = computedStyle[cssProp] || '';
        const mComp = typeof compVal === 'string' ? compVal.match(/([-\d.]+)(px|%|em|rem|vh|vw|auto)?/i) : null;
        if (mComp && !fromDynamic) {
            val = parseFloat(mComp[1]);
        }


        inputs.forEach(inp => {
            inp.value = val || "";

            if (fromDynamic) {
                const layout = document.querySelector(`.select-layout[data-unit-for="${inp.id}"]`);
                if (layout) {
                    const span = layout.querySelector(".unit-display");
                    if (span) span.textContent = unit.toUpperCase();
                    selectedUnits[inp.id] = unit;
                }
            }
        });

        if (fromDynamic) {
            elementUnits[elementId] = elementUnits[elementId] || {};
            elementUnits[elementId][`${cssProp}Value`] = val;
            elementUnits[elementId][`${cssProp}Unit`] = unit;
        } else {
            if (elementUnits[elementId]) {
                delete elementUnits[elementId][`${cssProp}Value`];
                delete elementUnits[elementId][`${cssProp}Unit`];
            }
        }
    });
}

function populateOpacityInput(cssRules, elementId, computedStyle) {
    const opacityInp = document.querySelector(`input[add-css="opacity"]`);
    if (!opacityInp) return;
    let opacityVal = null;
    const opacityUnit = "%";


    if (cssRules[elementId] && cssRules[elementId].opacity) {
        const m = cssRules[elementId].opacity.match(/^([\d.]+)$/);
        if (m) {
            opacityVal = parseFloat(m[1]) * 100;
        }
    }

    if (opacityVal === null) {
        const comp = computedStyle.opacity;
        opacityVal = parseFloat(comp) * 100;
    }


    if (!isNaN(opacityVal)) {
        opacityInp.value = opacityVal.toFixed(0);
        const layout = document.querySelector(`.select-layout[data-unit-for="${opacityInp.id}"]`);
        if (layout) {
            const span = layout.querySelector(".unit-display");
            if (span) span.textContent = opacityUnit.toUpperCase();
            selectedUnits[opacityInp.id] = opacityUnit;
        }

        elementUnits[elementId] = elementUnits[elementId] || {};
        if (opacityVal === 100) {

            delete elementUnits[elementId]["opacityValue"];
            delete elementUnits[elementId]["opacityUnit"];
        } else {
            elementUnits[elementId]["opacityValue"] = opacityVal / 100;
            elementUnits[elementId]["opacityUnit"] = "";
        }
    } else {
        opacityInp.value = "";
        if (elementUnits[elementId]) {
            delete elementUnits[elementId]["opacityValue"];
            delete elementUnits[elementId]["opacityUnit"];
        }
    }
}

function populateTransitionDurationInput(cssRules, elementId, computedStyle) {
    // Find the input for transition duration
    const transitionInput = document.querySelector(`input[add-css="transition-duration"]`);
    if (!transitionInput) return;
    
    let rawValue = "";
    let unit = "MS"; // default unit
    let fromDynamic = false;

    // If dynamic CSS rules already have a transition-duration, use that.
    if (cssRules[elementId] && cssRules[elementId]["transition-duration"]) {
        fromDynamic = true;
        const m = cssRules[elementId]["transition-duration"].match(/([-\d.]+)([a-zA-Z%]+)?/);
        if (m) {
            rawValue = m[1];
            unit = (m[2] && m[2].trim()) || "MS";
        }
    }

    // If not, use computed style
    if (!fromDynamic) {
        const compVal = computedStyle["transition-duration"];
        if (compVal) {
            const mComp = compVal.match(/([-\d.]+)([a-zA-Z%]+)?/);
            if (mComp) {
                rawValue = mComp[1];
                unit = (mComp[2] && mComp[2].trim()) || "MS";
            }
        }
    }

    // Set the input's value (showing the numeric part)
    transitionInput.value = rawValue;

    // If there is a unit selector/display, update it
    const layout = document.querySelector(`.select-layout[data-unit-for="${transitionInput.id}"]`);
    if (layout) {
        const span = layout.querySelector(".unit-display");
        if (span) span.textContent = unit.toUpperCase();
        selectedUnits[transitionInput.id] = unit;
    }

    // Store the values into elementUnits so that later changes use them
    elementUnits[elementId] = elementUnits[elementId] || {};
    if (rawValue === "" || parseFloat(rawValue) === 0) {
        delete elementUnits[elementId]["transition-durationValue"];
        delete elementUnits[elementId]["transition-durationUnit"];
    } else {
        elementUnits[elementId]["transition-durationValue"] = parseFloat(rawValue);
        elementUnits[elementId]["transition-durationUnit"] = unit;
    }
}



function mergeGenericProperties(cssRules, elementId) {
    if (!cssRules[elementId]) return;
    elementUnits[elementId] = elementUnits[elementId] || {};
    Object.entries(cssRules[elementId]).forEach(([cssProperty, value]) => {
        if (cssProperty === 'filter' || cssProperty === 'backdrop-filter') return;
        const match = value.match(/^([\d.]+)(px|%|em|rem|vh|vw|auto)?$/i);
        if (match) {
            elementUnits[elementId][`${cssProperty}Value`] = parseFloat(match[1]);
            elementUnits[elementId][`${cssProperty}Unit`] = match[2] || "px";
        }
    });
}


function ensureColorsHex(elementId) {
    const colorProps = ['background-color', 'color', 'border-color', 'outline-color'];
    colorProps.forEach(prop => {
        const stored = elementUnits[elementId]?.[prop];
        if (stored && !stored.match(/^(#|rgb|hsl)/)) {
            elementUnits[elementId][prop] = `#${stored}`;
        }
    });
}

function populateInputsFromBase(elementId) {
    console.log("[populateInputsFromBase]", elementId);
    if (!currentSelectedElement) {
        console.warn("[populateInputsFromBase] No currentSelectedElement defined.");
        return;
    }
    const computedStyle = window.getComputedStyle(currentSelectedElement);
    const cssRules = parseDynamicStyles();

    clearInputs(Object.keys(inputMappings)
        .filter(key => inputMappings[key].startsWith('transform:'))
        .map(key => document.getElementById(key))
    );

    populateColorInputs(cssRules, elementId);
    populateTransformInputs(cssRules, elementId);
    populateFilterInputs(cssRules, elementId);
    populateBackdropFilterInputs(cssRules, elementId);
    populateNonTransformInputs(cssRules, elementId, computedStyle);
    populateOpacityInput(cssRules, elementId, computedStyle);
    populateTransitionDurationInput(cssRules, elementId, computedStyle);
    mergeGenericProperties(cssRules, elementId);
    ensureColorsHex(elementId);
}




function rgbToHex(color) {
    if (color.startsWith('#')) return color;

    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);

    const rgb = getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    const matches = rgb.match(/\d+/g);
    if (!matches) return '#000000';

    return '#' + matches.slice(0, 3)
        .map(x => (+x).toString(16).padStart(2, '0'))
        .join('');
}



function restoreElementUnitsFromStyles() {
    const styleBlock = document.getElementById("dynamic-styles");
    if (!styleBlock) return;
    const dynamicStyles = styleBlock.textContent.trim();
    if (!dynamicStyles) return;

    const regex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
    let match;
    const colorProperties = ['background-color', 'color', 'border-color', 'outline-color'];

    filterState = {};
    backdropFilterState = {};

    while ((match = regex.exec(dynamicStyles)) !== null) {
        const className = match[1];
        const properties = match[2];
        elementUnits[className] = elementUnits[className] || {};


        filterState[className] = {};
        backdropFilterState[className] = {};

        properties.split(";").forEach(prop => {
            prop = prop.trim();
            if (!prop) return;

            const colonIndex = prop.indexOf(":");
            if (colonIndex === -1) return;
            const key = prop.slice(0, colonIndex).trim();
            const value = prop.slice(colonIndex + 1).trim();
            if (!key || !value) return;

            if (key === "background-size") {

                elementUnits[className]["background-sizeValue"] = value;
                return;
            }

            if (key === "filter" || key === "backdrop-filter") {
                const isBackdrop = key === "backdrop-filter";
                const state = isBackdrop ? backdropFilterState : filterState;

                const funcRegex = /([a-zA-Z-]+)\(([^)]+)\)/g;
                let funcMatch;
                while ((funcMatch = funcRegex.exec(value)) !== null) {
                    const funcName = funcMatch[1];
                    const funcValue = funcMatch[2];
                    const valMatch = funcValue.match(/(-?\d+\.?\d*)(.*)/);
                    if (valMatch) {
                        const [_, num, unit] = valMatch;
                        state[className][funcName] = num + (unit || getDefaultFilterUnit(funcName));
                    }
                }
                const storageKey = isBackdrop ? "backdropFilterValue" : "filterValue";
                elementUnits[className][storageKey] = value;
                return;
            }

            if (key === "transform") {
                elementUnits[className].transformValue = value;
                return;
            }

            const numMatch = value.match(/^([\d.]+)([a-z%]*)$/i);
            if (numMatch) {
                elementUnits[className][`${key}Value`] = parseFloat(numMatch[1]);
                elementUnits[className][`${key}Unit`] = numMatch[2] || "px";
            } else {
                elementUnits[className][key] = value;
            }
        });

        ['filterValue', 'backdropFilterValue'].forEach(key => {
            if (elementUnits[className][key]) {
                const isBackdrop = key === 'backdropFilterValue';
                const state = isBackdrop ? backdropFilterState : filterState;
                const funcRegex = /([a-zA-Z-]+)\(([^)]+)\)/g;
                let funcMatch;
                while ((funcMatch = funcRegex.exec(elementUnits[className][key])) !== null) {
                    const funcName = funcMatch[1];
                    const funcValue = funcMatch[2];
                    const valMatch = funcValue.match(/(-?\d+\.?\d*)(.*)/);
                    if (valMatch) {
                        const [_, num, unit] = valMatch;
                        state[className][funcName] = num + (unit || getDefaultFilterUnit(funcName));
                    }
                }
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", restoreElementUnitsFromStyles);














function initializeElementUnitsFromStyles() {
    const styleBlock = document.getElementById("dynamic-styles");
    if (!styleBlock) return;

    const cssText = styleBlock.textContent;
    const regex = /\.(\w+)\s*\{([^}]*)\}/g;
    let match;

    while ((match = regex.exec(cssText)) !== null) {
        const className = match[1];
        const properties = match[2];

        elementUnits[className] = elementUnits[className] || {};

        const propRegex = /([\w-]+)\s*:\s*([^;]+);/g;
        let propMatch;

        while ((propMatch = propRegex.exec(properties)) !== null) {
            const propName = propMatch[1];
            const propValue = propMatch[2];

            const valueMatch = propValue.match(/^(\d+)(px|%|em|rem|vw|vh|auto)?$/i);
            if (valueMatch) {
                elementUnits[className][`${propName}Value`] = parseFloat(valueMatch[1]);
                elementUnits[className][`${propName}Unit`] = valueMatch[2] || '';
            } else {
                elementUnits[className][`${propName}Value`] = propValue;
                elementUnits[className][`${propName}Unit`] = '';
            }
        }
    }
}











function ensureDynamicStyles() {
    let styleBlock = document.getElementById('dynamic-styles');
    if (!styleBlock) {
        styleBlock = document.createElement('style');
        styleBlock.id = 'dynamic-styles';
        document.head.appendChild(styleBlock);
        console.log('Created #dynamic-styles');
    }
    return styleBlock;
}

ensureDynamicStyles();

function ensureDynamicMediaStyles() {
    let mediaStyleBlock = document.getElementById('dynamic-media-styles');
    if (!mediaStyleBlock) {
        mediaStyleBlock = document.createElement('style');
        mediaStyleBlock.id = 'dynamic-media-styles';
        document.head.appendChild(mediaStyleBlock);
        console.log('Created #dynamic-media-styles');
    }
    return mediaStyleBlock;
}

function ensureDynamicHoverStyles() {
    let hoverStyleBlock = document.getElementById('dynamic-hover-styles');
    if (!hoverStyleBlock) {
        hoverStyleBlock = document.createElement('style');
        hoverStyleBlock.id = 'dynamic-hover-styles';
        document.head.appendChild(hoverStyleBlock);
        console.log('Created #dynamic-hover-styles');
    }
    return hoverStyleBlock;
}

ensureDynamicMediaStyles();
ensureDynamicHoverStyles();

function ensureDynamicAnimationStyles() {
    let animationStyleBlock = document.getElementById('dynamic-animations');
    if (!animationStyleBlock) {
        animationStyleBlock = document.createElement('style');
        animationStyleBlock.id = 'dynamic-animations';
        document.head.appendChild(animationStyleBlock);
        console.log('Created #dynamic-animations');
    }
    return animationStyleBlock;
}


ensureDynamicAnimationStyles();




const inputMappings = {
    widthInput: 'width',
    heightInput: 'height',
    minWidthInput: 'min-width',
    maxWidthInput: 'max-width',
    minHeightInput: 'min-height',
    maxHeightInput: 'max-height',
    fontSizeInput: 'font-size',
    lineHeightInput: 'line-height',
    borderWidthInput: 'border-width',
    borderTopWidthInput: 'border-top-width',
    borderRightWidthInput: 'border-right-width',
    borderBottomWidthInput: 'border-bottom-width',
    borderLeftWidthInput: 'border-left-width',
    borderRadiusInput: 'border-radius',
    borderTopLeftRadiusInput: 'border-top-left-radius',
    borderTopRightRadiusInput: 'border-top-right-radius',
    borderBottomLeftRadiusInput: 'border-bottom-left-radius',
    borderBottomRightRadiusInput: 'border-bottom-right-radius',
    gapInput: 'gap',
    rowGapInput: 'row-gap',
    columnGapInput: 'column-gap',
    paddingInput: 'padding',
    paddingTopInput: 'padding-top',
    paddingRightInput: 'padding-right',
    paddingBottomInput: 'padding-bottom',
    paddingLeftInput: 'padding-left',
    marginInput: 'margin',
    marginTopInput: 'margin-top',
    marginRightInput: 'margin-right',
    marginBottomInput: 'margin-bottom',
    marginLeftInput: 'margin-left',
    topDataInput: 'top',
    rightDataInput: 'right',
    bottomDataInput: 'bottom',
    leftDataInput: 'left',
    opacityInput: 'opacity',
    boxShadowInput1: 'box-shadow',
    boxShadowInput2: 'box-shadow2',
    boxShadowInput3: 'box-shadow3',
    textShadowInput1: 'text-shadow1',
    textShadowInput2: 'text-shadow2',
    textShadowInput3: 'text-shadow3',
    translateXInput: 'transform:translateX',
    translateYInput: 'transform:translateY',
    scaleInput: 'transform:scale',
    scaleXInput: 'transform:scaleX',
    scaleYInput: 'transform:scaleY',
    rotateInput: 'transform:rotate',
    rotateXInput: 'transform:rotateX',
    rotateYInput: 'transform:rotateY',
    skewXInput: 'transform:skewX',
    skewYInput: 'transform:skewY',
    backgroundSizeY: 'background-size-y',
    backgroundSizeX: 'background-size-x',
    outlineWidthInput: 'outline-width',
    outlineOffsetInput: 'outline-offset',
    backgroundPositionX: 'background-position-x',
    backgroundPositionY: 'background-position-y',
    backgroundRadialLeft: 'background-radial-left',
    backgroundRadialTop: 'background-radial-top',

    /* "filterBlurInput": "filter: blur",
    "filterBrightnessInput": "filter: brightness",
    "filterContrastInput": "filter: contrast",
    "filterHueRotateInput": "filter: hue-rotate",
    "filterSaturateInput": "filter: saturate",
    "filterGrayscaleInput": "filter: grayscale",
    "filterInvertInput": "filter: invert",
    "filterSepiaInput": "filter: sepia",
    "backdropFilterBlurInput": "backdrop-filter: blur",
    "backdropFilterBrightnessInput": "backdrop-filter: brightness",
    "backdropFilterContrastInput": "backdrop-filter: contrast",
    "backdropFilterHueRotateInput": "backdrop-filter: hue-rotate",
    "backdropFilterSaturateInput": "backdrop-filter: saturate",
    "backdropFilterGrayscaleInput": "backdrop-filter: grayscale",
    "backdropFilterInvertInput": "backdrop-filter: invert",
    "backdropFilterSepiaInput": "backdrop-filter: sepia",
    "transitionDurationInput": "transition-duration" */
};





function populateInputsFromSelectedElement() {
    if (!currentSelectedElement) {
        /* console.log("[populateInputs] No currentSelectedElement => abort"); */
        return;
    }
    const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;
    if (!elementId) {
        /* console.log("[populateInputs] No elementId => abort"); */
        return;
    }


    if (editingKeyframeMode) {
        /* console.log(`[populateInputs] KEYFRAME MODE for elementId="${elementId}"`); */
        populateInputsFromKeyframe();
    }


    if (mediaEditingMode && currentMediaQuery) {
        /* console.log(`[populateInputs] MEDIA MODE for elementId="${elementId}", media="${currentMediaQuery}"`); */
        populateInputsFromMedia(elementId, currentMediaQuery);


    } else if (hoverEditingMode && currentHoverClass === elementId) {
        /* console.log(`[populateInputs] HOVER MODE for class="${currentHoverClass}"`); */
        populateInputsFromHover(elementId);
    } else {
        /* console.log(`[populateInputs] BASE MODE for elementId="${elementId}"`); */
        populateInputsFromBase(elementId);
    }
}


function handleColorProperty(value, input, cssProperty) {
    if (!currentSelectedElement) return;

    const elementId = currentSelectedElement.classList[0];
    const firstClass = elementId; // Alias for clarity
    const inputId = input.id;
    const isMedia = mediaEditingMode && currentMediaQuery;
    const isHover = hoverEditingMode && currentHoverClass;
    const isAnimation = currentKeyframeIndex >= 0 && currentAnimationIndex >= 0;


    const validColor = validateColor(value);


    if (isMedia) {
        handleMediaColor(validColor, cssProperty, elementId);
    } else if (isHover) {
        handleHoverColor(validColor, cssProperty);
    } else if (isAnimation) {
        handleAnimationColor(validColor, cssProperty, firstClass);
    } else {
        handleBaseColor(validColor, cssProperty, elementId);
    }

    syncColorInputs(validColor, inputId, cssProperty);
    rebuildRelevantStyles(firstClass);
    currentSelectedElement.style[cssProperty] = '';
}

function handleAnimationColor(value, cssProperty, firstClass) {
    if (!elementAnimations[firstClass]) return;

    const anim = elementAnimations[firstClass][currentAnimationIndex];
    if (anim && anim.keyframes[currentKeyframeIndex]) {
        const keyframe = anim.keyframes[currentKeyframeIndex];
        if (value) {
            keyframe.properties[cssProperty] = value;
        } else {
            delete keyframe.properties[cssProperty];
        }
    }
}

function rebuildRelevantStyles(firstClass) {
    if (mediaEditingMode) {
        rebuildMediaStyles();
    } else if (hoverEditingMode) {
        rebuildHoverStyles();
    } else if (currentKeyframeIndex >= 0) {
        applyElementAnimations(firstClass);
    } else {
        rebuildBaseStyles();
    }
}


function handleMediaColor(value, cssProperty, elementId) {
    elementMediaQueries[elementId] = elementMediaQueries[elementId] || {};
    elementMediaQueries[elementId][currentMediaQuery] = elementMediaQueries[elementId][currentMediaQuery] || {};
    elementMediaQueries[elementId][currentMediaQuery][cssProperty] = value;
    rebuildMediaStyles();
}

function handleHoverColor(value, cssProperty) {
    elementHovers[currentHoverClass] = elementHovers[currentHoverClass] || {};
    if (value) {
        elementHovers[currentHoverClass][cssProperty] = value;
    } else {
        delete elementHovers[currentHoverClass][cssProperty];
    }
    rebuildHoverStyles();
}

function handleBaseColor(value, cssProperty, elementId) {
    if (value) {
        elementUnits[elementId][cssProperty] = value;
    } else {
        delete elementUnits[elementId][cssProperty];
    }
    rebuildBaseStyles();
}

function validateColor(value) {
    if (!value) return '';
    return value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')
        ? value
        : `#${value.replace(/^#/, '')}`;
}

function syncColorInputs(value, inputId, cssProperty) {
    const inputs = {
        'color': ['fontColorInput', 'fontColorHex'],
        'border-color': ['borderColorInput', 'borderColorHex'],
        'outline-color': ['outlineColorInput', 'outlineColorHex']
    }[cssProperty];

    if (inputs) {
        const [pickerId, hexId] = inputs;
        const targetId = inputId === pickerId ? hexId : pickerId;
        const targetInput = document.getElementById(targetId);
        if (targetInput) targetInput.value = value;
    }
}





function handleShadowInput(input, shadowType, isTextShadow) {
    if (!currentSelectedElement) return;

    const value = parseInt(input.value) || 0;
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);

    if (isTextShadow) {

        const currentShadow = textShadowList[currentSelectedTextShadowIndex];
        if (!currentShadow) return;

        switch (shadowType) {
            case 'horizontal': currentShadow.horizontal = value; break;
            case 'vertical': currentShadow.vertical = value; break;
            case 'blur': currentShadow.blur = value; break;
            case 'shadow': currentShadow.color = input.value; break;
        }

        updateTextShadowCSS();
        syncTextShadowData();
    } else {

        const targetList = isManagingInside ? insideBoxShadowList : outsideBoxShadowList;
        const currentShadow = targetList[currentSelectedShadowIndex];
        if (!currentShadow) return;

        switch (shadowType) {
            case 'horizontal': currentShadow.horizontal = value; break;
            case 'vertical': currentShadow.vertical = value; break;
            case 'blur': currentShadow.blur = value; break;
            case 'shadow': currentShadow.color = input.value; break;
        }

        updateBoxShadowCSS();
        saveBoxShadowData();
    }

    refreshActiveShadowDisplay(isTextShadow);
}

function refreshActiveShadowDisplay(isTextShadow) {
    if (isTextShadow) {
        const container = document.getElementById('text-shadow-list');
        const item = container.querySelector(`[data-index="${currentSelectedTextShadowIndex}"]`);
        if (item) {
            const shadow = textShadowList[currentSelectedTextShadowIndex];
            item.querySelector('.text-shadow-value').textContent =
                `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }
    } else {
        const containerId = isManagingInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list';
        const container = document.getElementById(containerId);
        const item = container.querySelector(`[data-index="${currentSelectedShadowIndex}"]`);
        if (item) {
            const shadow = (isManagingInside ? insideBoxShadowList : outsideBoxShadowList)[currentSelectedShadowIndex];
            item.querySelector('.box-shadow-value').textContent =
                `${shadow.inset ? 'inset ' : ''}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
        }
    }
}



function getTransformUnits(transformType) {
    const unitMap = {
        translateX: ['px', '%', 'em'],
        translateY: ['px', '%', 'em'],
        translateZ: ['px', 'em'],
        rotate: ['deg', 'rad'],
        skewX: ['deg', 'rad'],
        skewY: ['deg', 'rad'],
        scale: []
    };
    return unitMap[transformType] || [];
}
function handleTransformProperty(fullProperty, rawValue, input) {
    const [_, transformType] = fullProperty.split(':');
    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (!elementId) return;

    const isScaleTransform = ['scale', 'scaleX', 'scaleY'].includes(transformType);
    const unit = isScaleTransform ? '' : (selectedUnits[input.id] || getDefaultTransformUnit(transformType));

    transformState[elementId] = transformState[elementId] || {};

    if (rawValue === '') {
        delete transformState[elementId][transformType];
    } else {

        if (isScaleTransform) {
            const numericValue = parseFloat(rawValue) || 0;
            transformState[elementId][transformType] = numericValue;
        }

        else {
            const numericStr = rawValue.replace(/[^0-9.-]/g, '');
            const numericValue = numericStr ? parseFloat(numericStr) : 0;
            transformState[elementId][transformType] = `${numericValue}${unit}`;
        }
    }

    const transforms = [];
    const transformMap = {
        translateX: 'translateX', translateY: 'translateY', translateZ: 'translateZ',
        rotate: 'rotate', rotateX: 'rotateX', rotateY: 'rotateY', rotateZ: 'rotateZ',
        scale: 'scale', scaleX: 'scaleX', scaleY: 'scaleY',
        skewX: 'skewX', skewY: 'skewY'
    };

    for (const [type, value] of Object.entries(transformState[elementId])) {
        if (transformMap[type]) {
            transforms.push(`${transformMap[type]}(${value})`);
        }
    }
    const transformString = transforms.join(' ');



    console.log('[handleTransformProperty] Final transform string:', transformString);
    console.log('[handleTransformProperty] Routing to context:', {
        isAnimation: currentKeyframeIndex >= 0,
        isMedia: mediaEditingMode,
        isHover: hoverEditingMode,
        elementId
    });

    if (currentKeyframeIndex >= 0 && currentAnimationIndex >= 0) {
        const anim = elementAnimations[elementId]?.[currentAnimationIndex];
        if (anim && anim.keyframes[currentKeyframeIndex]) {
            anim.keyframes[currentKeyframeIndex].properties.transform = transformString;
            const transformFunctionKeys = [
                'translateX', 'translateY', 'translateZ',
                'rotate', 'rotateX', 'rotateY', 'rotateZ',
                'scale', 'scaleX', 'scaleY', 'skewX', 'skewY'
            ];
            transformFunctionKeys.forEach(key => {
                delete anim.keyframes[currentKeyframeIndex].properties[key];
            });
            applyElementAnimations(elementId);
        }
    } else if (mediaEditingMode && currentMediaQuery) {

        elementMediaQueries[elementId] = elementMediaQueries[elementId] || {};
        elementMediaQueries[elementId][currentMediaQuery] = elementMediaQueries[elementId][currentMediaQuery] || {};
        elementMediaQueries[elementId][currentMediaQuery].transform = transformString;
        rebuildMediaStyles();
    } else if (hoverEditingMode && currentHoverClass) {
        elementHovers[currentHoverClass] = elementHovers[currentHoverClass] || {};

        elementHovers[currentHoverClass].transform = transformString;
        rebuildHoverStyles();
    } else {
        rebuildBaseStyles();
    }
}

const transformTypes = {
    translateX: 'translateX',
    translateY: 'translateY',
    translateZ: 'translateZ',
    rotate: 'rotate',
    rotateX: 'rotateX',
    rotateY: 'rotateY',
    rotateZ: 'rotateZ',
    scale: 'scale',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    skewX: 'skewX',
    skewY: 'skewY'
};

function getDefaultUnit(transformType) {
    return {
        opacity: '%',
        translateX: 'px',
        translateY: 'px',
        translateZ: 'px',
        rotate: 'deg',
        rotateX: 'deg',
        rotateY: 'deg',
        rotateZ: 'deg',
        skewX: 'deg',
        skewY: 'deg',
        scale: '',
        scaleX: '',
        scaleY: ''
    }[transformType] || 'px';
}








function handleOpacityProperty(rawValue, input) {
    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (!elementId) return;

    elementUnits[elementId] = elementUnits[elementId] || {};

    const unit = selectedUnits[input.id] || "%";


    if (rawValue === '') {
        delete elementUnits[elementId]["opacityValue"];
        delete elementUnits[elementId]["opacityUnit"];
    } else {

        let numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
        if (isNaN(numericValue)) return;


        if (numericValue < 0 || numericValue > 100) {
            console.warn(`[handleOpacityProperty] Invalid opacity value: ${rawValue}. Must be between 0% and 100%.`);
            return;
        }


        const finalOpacity = numericValue / 100;


        elementUnits[elementId]["opacityValue"] = finalOpacity;
        elementUnits[elementId]["opacityUnit"] = "";

        selectedUnits[input.id] = "%";
    }

    rebuildBaseStyles();
}






let filterState = {};

function getDefaultFilterUnit(filterType) {
    const defaults = {
        blur: "px",
        brightness: "%",
        contrast: "%",
        "hue-rotate": "deg",
        saturate: "%",
        grayscale: "%",
        invert: "%",
        sepia: "%"
    };
    return defaults[filterType] || "px";
}

function handleFilterProperty(fullProperty, rawValue, input) {
    const parts = fullProperty.split(':');
    if (parts.length < 2) return;
    const filterType = parts[1].trim();
    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (!elementId) return;

    const chosenUnit = selectedUnits[input.id] || getDefaultFilterUnit(filterType);
    filterState[elementId] = filterState[elementId] || {};

    if (rawValue === '') {
        delete filterState[elementId][filterType];
    } else {
        const numericStr = rawValue.replace(/[^0-9.]/g, '');
        const numericValue = parseFloat(numericStr);
        if (numericValue === 0) {
            delete filterState[elementId][filterType];
        } else {
            filterState[elementId][filterType] = numericValue + chosenUnit;
        }
    }

    const filters = [];
    for (const [ftype, value] of Object.entries(filterState[elementId])) {
        filters.push(`${ftype}(${value})`);
    }
    const fullFilterString = filters.join(' ');


    if (currentKeyframeIndex >= 0 && currentAnimationIndex >= 0) {
        const anim = elementAnimations[elementId]?.[currentAnimationIndex];
        if (anim && anim.keyframes[currentKeyframeIndex]) {
            anim.keyframes[currentKeyframeIndex].properties["filter"] = fullFilterString;
            applyElementAnimations(elementId);
        }
    } else if (mediaEditingMode && currentMediaQuery) {
        elementMediaQueries[elementId] = elementMediaQueries[elementId] || {};
        elementMediaQueries[elementId][currentMediaQuery] = elementMediaQueries[elementId][currentMediaQuery] || {};
        elementMediaQueries[elementId][currentMediaQuery]["filter"] = fullFilterString;
        rebuildMediaStyles();
    } else if (hoverEditingMode && currentHoverClass) {
        elementHovers[currentHoverClass] = elementHovers[currentHoverClass] || {};
        elementHovers[currentHoverClass]["filter"] = fullFilterString;
        rebuildHoverStyles();
    } else {
        elementUnits[elementId] = elementUnits[elementId] || {};
        elementUnits[elementId]["filterValue"] = fullFilterString;
        rebuildBaseStyles();
    }
}


let backdropFilterState = {};

function getDefaultBackdropFilterUnit(filterType) {
    const defaults = {
        blur: "px",
        brightness: "%",
        contrast: "%",
        "hue-rotate": "deg",
        saturate: "%",
        grayscale: "%",
        invert: "%",
        sepia: "%"
    };
    return defaults[filterType] || "px";
}

function handleBackdropFilterProperty(fullProperty, rawValue, input) {
    const parts = fullProperty.split(':');
    if (parts.length < 2) return;
    const filterType = parts[1].trim();

    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (!elementId) return;

    const chosenUnit = selectedUnits[input.id] || getDefaultBackdropFilterUnit(filterType);
    backdropFilterState[elementId] = backdropFilterState[elementId] || {};

    if (rawValue === '') {
        delete backdropFilterState[elementId][filterType];
    } else {
        const numericStr = rawValue.replace(/[^0-9.]/g, '');
        const numericValue = parseFloat(numericStr);
        if (numericValue === 0) {
            delete backdropFilterState[elementId][filterType];
        } else {
            backdropFilterState[elementId][filterType] = numericValue + chosenUnit;
        }
    }

    const filters = [];
    for (const [ftype, value] of Object.entries(backdropFilterState[elementId])) {
        filters.push(`${ftype}(${value})`);
    }
    const fullFilterString = filters.join(' ');

    if (currentKeyframeIndex >= 0 && currentAnimationIndex >= 0) {
        const anim = elementAnimations[elementId]?.[currentAnimationIndex];
        if (anim && anim.keyframes[currentKeyframeIndex]) {
            anim.keyframes[currentKeyframeIndex].properties["backdrop-filter"] = fullFilterString;
            applyElementAnimations(elementId);
        }
    } else if (mediaEditingMode && currentMediaQuery) {
        elementMediaQueries[elementId] = elementMediaQueries[elementId] || {};
        elementMediaQueries[elementId][currentMediaQuery] = elementMediaQueries[elementId][currentMediaQuery] || {};
        elementMediaQueries[elementId][currentMediaQuery]["backdrop-filter"] = fullFilterString;
        rebuildMediaStyles();
    } else if (hoverEditingMode && currentHoverClass) {
        elementHovers[currentHoverClass] = elementHovers[currentHoverClass] || {};
        elementHovers[currentHoverClass]["backdrop-filter"] = fullFilterString;
        rebuildHoverStyles();
    } else {
        elementUnits[elementId] = elementUnits[elementId] || {};
        elementUnits[elementId]["backdropFilterValue"] = fullFilterString;
        rebuildBaseStyles();
    }
}






function handleTransitionDurationProperty(fullProperty, rawValue, input) {
    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (!elementId) return;

    const chosenUnit = selectedUnits[input.id] || "MS";
    elementUnits[elementId] = elementUnits[elementId] || {};

    if (rawValue === '') {
        delete elementUnits[elementId]["transition-durationValue"];
        delete elementUnits[elementId]["transition-durationUnit"];
    } else {
        const numericStr = rawValue.replace(/[^0-9.]/g, '');
        const numericValue = parseFloat(numericStr);
        if (numericValue === 0) {
            delete elementUnits[elementId]["transition-durationValue"];
            delete elementUnits[elementId]["transition-durationUnit"];
        } else {
            elementUnits[elementId]["transition-durationValue"] = numericValue;
            elementUnits[elementId]["transition-durationUnit"] = chosenUnit;
        }
    }

    rebuildBaseStyles();
}



let currentAnimationIndex = -1;
let currentKeyframeIndex = -1;

let editingKeyframeMode = false;


function populateAnimationList() {
    if (!currentSelectedElement) return;
    const firstClass = currentSelectedElement.classList[0] || '';
    const animArr = elementAnimations[firstClass] || [];

    const listEl = document.querySelector('.animation-items');
    listEl.innerHTML = '';

    if (animArr.length === 0) {
        /* console.log(`[populateAnimationList] No animations found for: .${firstClass}`); */
        return;
    }

    animArr.forEach((anim, index) => {
        const uniqueClass = `animation-${firstClass}-${index}`;

        const div = document.createElement('div');
        div.classList.add('flex-sb-align', 'm-tb-10', 'gap10', 'b-2', uniqueClass);
        div.setAttribute('data-animation-index', index);

        div.innerHTML = `
            <h1 class="anim-name-display" data-index="${index}">${anim.animationName}</h1>
            <img class="small-img delete-animation" src="/Icon/garbage.png" alt="Delete" data-index="${index}" />
        `;

        div.addEventListener('click', () => {
            currentAnimationIndex = index;
            loadAnimationEditor(anim);
            refreshKeyframeAnimationPicker();
            loadKeyframeList(anim);
        });


        div.querySelector('.delete-animation').addEventListener('click', (e) => {
            e.stopPropagation();

            const deletedAnim = elementAnimations[firstClass][index];

            const doDelete = () => {
                elementAnimations[firstClass].splice(index, 1);
                populateAnimationList();
                applyElementAnimations(firstClass);
                refreshKeyframeAnimationPicker();
            };

            const undoDelete = () => {

                elementAnimations[firstClass].splice(index, 0, deletedAnim);
                populateAnimationList();
                applyElementAnimations(firstClass);
                refreshKeyframeAnimationPicker();
            };


            doDelete();

            trackChange({
                do: doDelete,
                undo: undoDelete
            });
        });

        listEl.appendChild(div);
    });

    console.log(`[populateAnimationList] Loaded animations for .${firstClass}:`, animArr);
    refreshKeyframeAnimationPicker();
}




document.querySelector('.add-animation-btn').addEventListener('click', () => {
    if (!currentSelectedElement) return;

    const modal = document.getElementById('animation-modal');
    const input = document.getElementById('animation-name-input');

    modal.classList.remove('none');
    input.value = '';

    const confirmBtn = document.getElementById('confirm-animation-name');
    const cancelBtn = document.getElementById('cancel-animation-name');

    const firstClass = currentSelectedElement.classList[0] || '';

    const handleConfirm = () => {
        const animName = input.value.trim();
        if (!animName) {
            alert('Animation name cannot be empty.');
            return;
        }

        const newAnim = {
            animationName: animName,
            duration: '2s',
            timingFunction: 'ease',
            iterationCount: '1',
            direction: 'normal',
            delay: '0s',
            fillMode: 'none',
            playState: 'running',
            keyframes: []
        };

        elementAnimations[firstClass] = elementAnimations[firstClass] || [];


        const doCreateAnimation = () => {
            elementAnimations[firstClass].push(newAnim);
            populateAnimationList();
            applyElementAnimations(firstClass);
            refreshKeyframeAnimationPicker();
        };

        const undoCreateAnimation = () => {
            const idx = elementAnimations[firstClass].indexOf(newAnim);
            if (idx > -1) {
                elementAnimations[firstClass].splice(idx, 1);
            }
            populateAnimationList();
            applyElementAnimations(firstClass);
            refreshKeyframeAnimationPicker();
        };

        doCreateAnimation();

        trackChange({
            do: doCreateAnimation,
            undo: undoCreateAnimation
        });

        modal.classList.add('none');

        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };


    const handleCancel = () => {
        modal.classList.add('none');
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
});

function loadAnimationEditor(anim) {
    document.querySelector('.anim-name-input').value = anim.animationName || '';
    document.querySelector('.anim-duration-input').value = parseFloat(anim.duration) || 2;
    document.querySelector('.anim-timing-fn').value = anim.timingFunction || 'ease';
    document.querySelector('.anim-iteration-input').value = anim.iterationCount || '1';
    document.querySelector('.anim-direction-input').value = anim.direction || 'normal';
    document.querySelector('.anim-delay-input').value = parseFloat(anim.delay) || 0;
    document.querySelector('.anim-fill-mode').value = anim.fillMode || 'none';
    document.querySelector('.anim-play-state').value = anim.playState || 'running';
}

document.querySelector('.animation-editor').addEventListener('input', (e) => {
    if (currentAnimationIndex < 0 || !currentSelectedElement) return;

    const firstClass = currentSelectedElement.classList[0] || '';
    const anim = elementAnimations[firstClass][currentAnimationIndex];

    anim.animationName = document.querySelector('.anim-name-input').value.trim() || `animation${Date.now()}`;
    const durationVal = document.querySelector('.anim-duration-input').value.trim() || '2';
    anim.duration = durationVal + 's';
    anim.timingFunction = document.querySelector('.anim-timing-fn').value;
    anim.iterationCount = document.querySelector('.anim-iteration-input').value;
    anim.direction = document.querySelector('.anim-direction-input').value;
    const delayVal = document.querySelector('.anim-delay-input').value.trim() || '0';
    anim.delay = delayVal + 's';
    anim.fillMode = document.querySelector('.anim-fill-mode').value;
    anim.playState = document.querySelector('.anim-play-state').value;


    const nameDisplay = document.querySelector(`h1.anim-name-display[data-index="${currentAnimationIndex}"]`);
    if (nameDisplay) {
        nameDisplay.textContent = anim.animationName;
    }

    applyElementAnimations(firstClass);
});

function applyElementAnimations(firstClass) {
    if (!firstClass) return;

    const animArr = elementAnimations[firstClass] || [];

    const animationString = animArr
        .filter(a => a.animationName)
        .map(a => `${a.animationName} ${a.duration} ${a.timingFunction} ${a.delay} ${a.iterationCount} ${a.direction} ${a.fillMode} ${a.playState}`)
        .join(', ');


    let styleBlock = document.getElementById('dynamic-animations');

    if (!styleBlock) {
        styleBlock = document.createElement('style');
        styleBlock.id = 'dynamic-animations';
        document.head.appendChild(styleBlock);
    }

    if (firstClass) {

        let cssText = `.${firstClass} { animation: ${animationString}; }\n`;


        animArr.forEach(a => {
            cssText += generateKeyframesText(a, firstClass);
        });

        styleBlock.textContent = cssText;

        console.log(`[applyElementAnimations] Updated styles for .${firstClass}:`, cssText);
    }
}

function buildKeyframesCSS(animArr) {
    let styleBlock = document.getElementById('dynamic-animations');
    if (!styleBlock) {
        styleBlock = document.createElement('style');
        styleBlock.id = 'dynamic-animations';
        document.head.appendChild(styleBlock);
    }

    let cssText = '';
    animArr.forEach(anim => {
        cssText += generateKeyframesText(anim);
    });

    styleBlock.textContent = cssText;
}

function getDefaultTransformUnit(transformType) {
    if (["scale", "scaleX", "scaleY"].includes(transformType)) return "";

    if (["rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY"].includes(transformType)) return "deg";
    return "px";
}

function generateKeyframesText(anim, firstClass) {
    let cssText = `@keyframes ${anim.animationName} {\n`;
    const colorProperties = ['background-color', 'color', 'border-color', 'outline-color'];
    const unitlessTransforms = ['scale', 'scaleX', 'scaleY'];

    anim.keyframes.forEach(kf => {
        cssText += `  ${kf.percent}% {\n`;
        let tParts = [];
        Object.entries(kf.properties).forEach(([prop, rawValue]) => {
            if (prop === "filter" || prop === "backdrop-filter") {
                cssText += `    ${prop}: ${rawValue};\n`;
                return;
            }
            if (colorProperties.includes(prop)) {
                cssText += `    ${prop}: ${rawValue};\n`;
                return;
            }
            if (prop === "transform") {
                tParts.push(rawValue.replace(/;/g, ''));
                return;
            }
            if (prop.startsWith("transform:")) {
                const transformName = prop.split(":")[1];
                const isUnitless = unitlessTransforms.includes(transformName);
                const numericValue = rawValue.replace(/[^0-9.-]/g, '');
                const unit = isUnitless ? '' : getDefaultTransformUnit(transformName);
                tParts.push(`${transformName}(${numericValue}${unit})`);
                return;
            }
            if (unitlessTransforms.includes(prop) || [
                'translateX', 'translateY', 'translateZ',
                'rotate', 'rotateX', 'rotateY', 'rotateZ',
                'skewX', 'skewY'
            ].includes(prop)) {
                const isUnitless = unitlessTransforms.includes(prop);
                const numericValue = rawValue.replace(/[^0-9.-]/g, '');
                const unit = isUnitless ? '' : getDefaultTransformUnit(prop);
                tParts.push(`${prop}(${numericValue}${unit})`);
                return;
            }
            const targetInputId = `${firstClass}-${prop}`;
            const theUnit = selectedUnits[targetInputId] || "px";
            const numericValue = String(rawValue).replace(/[^0-9.]/g, '');
            const finalVal = numericValue ? `${numericValue}${theUnit}` : rawValue;
            cssText += `    ${prop}: ${finalVal};\n`;
        });
        if (tParts.length) {
            cssText += `    transform: ${tParts.join(" ")};\n`;
        }
        cssText += `  }\n`;
    });
    cssText += `}\n`;
    return cssText;
}


document.querySelector('.keyframe-animation-picker').addEventListener('change', (e) => {
    const animIndex = parseInt(e.target.value, 10);
    if (!isNaN(animIndex)) {
        selectKeyframeAnimation(animIndex);
    }
});

function selectKeyframeAnimation(animIndex) {
    if (!currentSelectedElement) return;
    const firstClass = currentSelectedElement.classList[0] || '';
    const animArr = elementAnimations[firstClass] || [];

    if (animIndex >= 0 && animIndex < animArr.length) {
        currentAnimationIndex = animIndex;
        loadKeyframeList(animArr[animIndex]);
    }
}

function refreshKeyframeAnimationPicker() {
    if (!currentSelectedElement) return;
    const firstClass = currentSelectedElement.classList[0] || '';
    const animArr = elementAnimations[firstClass] || [];

    const picker = document.querySelector('.keyframe-animation-picker');
    picker.innerHTML = '';

    animArr.forEach((a, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = a.animationName;
        picker.appendChild(opt);
    });

    if (animArr.length > 0 && picker.value === "") {
        picker.value = "0";
        selectKeyframeAnimation(0);
    }
}


function loadKeyframeList(anim) {
    disableAllEditingModes();


    document.querySelector('.keyframe-menu').classList.remove('none');

    refreshKeyframeAnimationPicker();

    editingKeyframeMode = true;

    const picker = document.querySelector('.keyframe-animation-picker');
    const animArr = elementAnimations[currentSelectedElement.classList[0]] || [];

    if (currentAnimationIndex >= 0 && currentAnimationIndex < animArr.length) {
        picker.value = currentAnimationIndex;
    }

    const listEl = document.querySelector('.keyframe-list');
    listEl.innerHTML = '';

    anim.keyframes.forEach((kf, idx) => {
        const li = document.createElement('li');
        li.style.cursor = 'pointer';

        li.innerHTML = `
            <span>${kf.percent}%</span>
            <!-- NEW: delete keyframe icon -->
            <img 
                src="/Icon/garbage.png" 
                alt="Delete Keyframe" 
                class="delete-keyframe" 
                style="width:18px; height:18px; cursor:pointer; margin-left:15px; translate: 0 2px;" 
                data-kf-index="${idx}"
            />
        `;

        if (idx === currentKeyframeIndex) {
            li.classList.add('active-keyframe');
        }

        li.addEventListener('click', (e) => {

            if (e.target.classList.contains('delete-keyframe')) {
                return;
            }

            currentKeyframeIndex = idx;
            loadKeyframePropertyEditor(kf);
            populateInputsFromKeyframe();

            document.querySelectorAll('.keyframe-list li').forEach(el => el.classList.remove('keyframe-selected'));
            li.classList.add('keyframe-selected');
        });

        const trashIcon = li.querySelector('.delete-keyframe');
        trashIcon.addEventListener('click', (e) => {
            e.stopPropagation();


            const deletedKeyframe = anim.keyframes[idx];


            const doDeleteKeyframe = () => {
                anim.keyframes.splice(idx, 1);
                loadKeyframeList(anim);
                applyElementAnimations(currentSelectedElement.classList[0]);
            };

            const undoDeleteKeyframe = () => {
                anim.keyframes.splice(idx, 0, deletedKeyframe);
                loadKeyframeList(anim);
                applyElementAnimations(currentSelectedElement.classList[0]);
            };

            doDeleteKeyframe();
            trackChange({
                do: doDeleteKeyframe,
                undo: undoDeleteKeyframe
            });
        });

        listEl.appendChild(li);
    });
}

document.querySelector('.add-keyframe-btn').addEventListener('click', () => {
    if (currentAnimationIndex < 0 || !currentSelectedElement) return;
    const firstClass = currentSelectedElement.classList[0] || '';


    if (!elementAnimations[firstClass]) {
        /* console.error(`[ERROR] No animation found for ${firstClass}`); */
        return;
    }

    const anim = elementAnimations[firstClass][currentAnimationIndex];

    if (!anim) {
        /* console.error(`[ERROR] Animation index out of bounds for ${firstClass}`); */
        return;
    }

    const modal = document.getElementById('keyframe-modal');
    const input = document.getElementById('keyframe-percent-input');

    modal.classList.remove('none');
    input.value = '';

    const confirmBtn = document.getElementById('confirm-keyframe');
    const cancelBtn = document.getElementById('cancel-keyframe');

    const handleConfirm = () => {
        const p = parseInt(input.value.trim(), 10);
        if (isNaN(p) || p < 0 || p > 100) {
            alert("Invalid percent (must be 0-100)");
            return;
        }

        const existingKF = anim.keyframes.find(kf => kf.percent === p);
        if (existingKF) {
            alert(`Keyframe at ${p}% already exists.`);
            return;
        }

        const newKF = { percent: p, properties: {} };

        const doAddKeyframe = () => {
            anim.keyframes.push(newKF);
            anim.keyframes.sort((a, b) => a.percent - b.percent);
            loadKeyframeList(anim);
            applyElementAnimations(firstClass);
        };

        const undoAddKeyframe = () => {
            const idx = anim.keyframes.indexOf(newKF);
            if (idx > -1) {
                anim.keyframes.splice(idx, 1);
            }
            loadKeyframeList(anim);
            applyElementAnimations(firstClass);
        };

        doAddKeyframe();

        trackChange({
            do: doAddKeyframe,
            undo: undoAddKeyframe
        });

        modal.classList.add('none');
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };


    const handleCancel = () => {
        modal.classList.add('none');
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
});


document.querySelector('.finish-keyframe-btn').addEventListener('click', () => {
    if (!editingKeyframeMode) return;

    console.log("[finishKeyframeEditing] Exiting keyframe editing mode.");


    editingKeyframeMode = false;
    currentKeyframeIndex = -1;

    document.querySelectorAll('.keyframe-list li').forEach(li => {
        li.classList.remove('keyframe-selected');
    });


    populateInputsFromSelectedElement();

    displaySuccessMessage("Keyframe editing finished.");
});

document.querySelector('.run-animation-btn').addEventListener('click', () => {
    if (!currentSelectedElement) return;
    const firstClass = currentSelectedElement.classList[0];
    if (!firstClass) return;

    const animArr = elementAnimations[firstClass] || [];

    animArr.forEach(anim => {
        if (!anim._originalName) {
            anim._originalName = anim.animationName;
        }
        anim.animationName = anim._originalName + '_' + Date.now();
    });

    applyElementAnimations(firstClass);

    console.log("[Run Animation] Gave each animation a new name, forcing a fresh run.");
});


function loadKeyframePropertyEditor(kf) {
    document.querySelector('.current-keyframe-label').textContent = kf.percent + '%';

    editingKeyframeMode = true;
}


function populateInputsFromKeyframe() {
    if (!currentSelectedElement) {
        /* console.log("[populateInputsFromKeyframe] No selected element => abort"); */
        return;
    }

    const firstClass = currentSelectedElement.classList[0] || '';
    const colorProperties = ['background-color', 'color', 'border-color', 'outline-color'];
    if (!firstClass) {
        /* console.log("[populateInputsFromKeyframe] No firstClass => abort"); */
        return;
    }

    if (currentAnimationIndex < 0 || currentKeyframeIndex < 0) {
        /* console.log("[populateInputsFromKeyframe] No keyframe selected => abort"); */
        return;
    }

    const anim = elementAnimations[firstClass]?.[currentAnimationIndex];
    if (!anim) {
        /* console.log("[populateInputsFromKeyframe] No animation found => abort"); */
        return;
    }

    const keyframe = anim.keyframes[currentKeyframeIndex];
    if (!keyframe) {
        /* console.log("[populateInputsFromKeyframe] No keyframe found => abort"); */
        return;
    }

    console.log(`[populateInputsFromKeyframe] Populating for keyframe ${keyframe.percent}%`);

    colorProperties.forEach(cssProperty => {
        const colorValue = keyframe.properties[cssProperty];
        if (!colorValue) return;

        let inputIds = [];
        switch (cssProperty) {
            case 'background-color':
                inputIds = ['backgroundColorInput', 'backgroundColorHex'];
                break;
            case 'color':
                inputIds = ['fontColorInput', 'fontColorHex'];
                break;
            case 'border-color':
                inputIds = ['borderColorInput', 'borderColorHex'];
                break;
            case 'outline-color':
                inputIds = ['outlineColorInput', 'outlineColorHex'];
                break;
        }

        if (inputIds.length) {
            const hexValue = rgbToHex(colorValue);
            inputIds.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    input.value = hexValue;
                    const layoutDiv = document.querySelector(`.select-layout[data-unit-for="${id}"]`);
                    if (layoutDiv) {
                        const span = layoutDiv.querySelector('.unit-display');
                        if (span) span.textContent = '';
                    }
                }
            });
        }
    });


    Object.keys(inputMappings).forEach((inputId) => {
        const cssProperty = inputMappings[inputId];
        if (colorProperties.includes(cssProperty)) return;

        const inputElement = document.querySelector(`input[add-css="${cssProperty}"]`);
        if (!inputElement) return;

        let val = "";
        let unit = "px";
        const rawValue = keyframe.properties[cssProperty] || "";

        if (rawValue === 'auto') {
            val = '';
            unit = 'auto';
        } else {
            const match = rawValue.match(/^([\d.]+)(px|%|em|rem|vh|vw|auto)?$/i);
            if (match) {
                val = match[1];
                unit = match[2] || "px";
            } else {
                val = rawValue;
            }
        }

        inputElement.value = val;

        const layoutDiv = document.querySelector(`.select-layout[data-unit-for="${inputId}"]`);
        if (layoutDiv) {
            const span = layoutDiv.querySelector(".unit-display");
            if (span) span.innerText = unit.toUpperCase();
            selectedUnits[inputId] = unit;
        }

        console.log(`[populateInputsFromKeyframe] ${cssProperty}: val=${val}, unit=${unit}`);
    });

    const filterValue = keyframe.properties['filter'];
    if (filterValue) {
        populateCompositeFilterInputs(
            { [firstClass]: { filter: filterValue } },
            firstClass,
            "filter",
            "filter",
            getDefaultFilterUnit
        );
    }

    const backdropFilterValue = keyframe.properties['backdrop-filter'];
    if (backdropFilterValue) {
        populateCompositeFilterInputs(
            { [firstClass]: { "backdrop-filter": backdropFilterValue } },
            firstClass,
            "backdrop-filter",
            "backdropFilter",
            getDefaultBackdropFilterUnit
        );
    }
}



function restoreAnimationsFromDatabase() {
    let animationStyleTag = document.getElementById("dynamic-animations");

    if (!animationStyleTag) {
        /* console.error("[ERROR] Missing #dynamic-animations"); */
        return;
    }

    const rawAnimationsData = animationStyleTag.textContent.trim();
    /* console.log("[DEBUG] Raw `dynamic-animations` content:", rawAnimationsData); */

    try {
        window.elementAnimations = window.backendAnimations && typeof window.backendAnimations === "string"
            ? JSON.parse(window.backendAnimations)
            : window.backendAnimations || {};

        /* console.log("[DEBUG] Successfully restored elementAnimations:", elementAnimations); */


        Object.values(elementAnimations).forEach(anims => {
            applyElementAnimations(anims);
            anims.forEach(anim => {
                anim.keyframes.forEach(kf => {
                    Object.entries(kf.properties).forEach(([prop, value]) => {
                        if ([
                            'background-color',
                            'color',
                            'border-color',
                            'outline-color'
                        ].includes(prop)) {
                            kf.properties[prop] = validateColor(value);
                        }
                    });
                });
            });
        });

        populateAnimationList();

    } catch (error) {
        console.error("[ERROR] Failed to parse `window.backendAnimations`:", error);
        console.log("[DEBUG] `window.backendAnimations` content:", window.backendAnimations);
    }
}



let mediaEditingMode = false;
let currentMediaQuery = null;


function rebuildMediaStyles() {
    const mediaStyleTag = document.getElementById("dynamic-media-styles");
    if (!mediaStyleTag) {
        console.error("Missing #dynamic-media-styles");
        return;
    }

    let cssText = "";
    const colorProperties = ['background-color', 'color', 'border-color', 'outline-color'];
    const unitlessTransforms = ['scale', 'scaleX', 'scaleY'];

    let groupedMedia = {};
    Object.keys(elementMediaQueries).forEach(selector => {
        const queries = elementMediaQueries[selector];
        Object.keys(queries).forEach(mediaQuery => {
            if (!groupedMedia[mediaQuery]) groupedMedia[mediaQuery] = {};
            groupedMedia[mediaQuery][selector] = queries[mediaQuery];
        });
    });

    Object.keys(groupedMedia).forEach(mediaQuery => {
        let block = "";
        const selectors = groupedMedia[mediaQuery];

        Object.keys(selectors).forEach(selector => {
            const properties = selectors[selector];
            const lines = [];
            const transformParts = [];

            Object.entries(properties).forEach(([prop, rawValue]) => {
                if (prop === "transform") {
                    transformParts.push(rawValue);
                    return;
                }

                if (prop.startsWith("transform:")) {
                    const transformName = prop.split(":")[1];
                    const isUnitless = unitlessTransforms.includes(transformName);
                    const numericValue = rawValue.replace(/[^0-9.-]/g, '');
                    const unit = isUnitless ? '' : getDefaultUnit(transformName);

                    transformParts.push(`${transformName}(${numericValue}${unit})`);
                    return;
                }

                const isTransform = [
                    'translateX', 'translateY', 'translateZ',
                    'rotate', 'rotateX', 'rotateY', 'rotateZ',
                    'skewX', 'skewY'
                ].includes(prop);

                if (isTransform) {
                    const isUnitless = unitlessTransforms.includes(prop);
                    const numericValue = rawValue.replace(/[^0-9.-]/g, '');
                    const unit = isUnitless ? '' : getDefaultUnit(prop);

                    transformParts.push(`${prop}(${numericValue}${unit})`);
                    return;
                }

                if (colorProperties.includes(prop)) {
                    const validColor = /^(#|rgb|hsl)/.test(rawValue) ? rawValue : `#${rawValue}`;
                    lines.push(`    ${prop}: ${validColor};`);
                    return;
                }
                lines.push(`    ${prop}: ${rawValue};`);
            });

            if (transformParts.length > 0) {
                lines.push(`    transform: ${transformParts.join(" ")};`);
            }

            if (lines.length > 0) {
                block += `  .${selector} {\n${lines.join("\n")}\n  }\n`;
            }
        });

        if (block) {
            cssText += `@media ${mediaQuery} {\n${block}}\n\n`;
        }
    });

    mediaStyleTag.textContent = cssText.trim();
    displayMediaStyles();
}



function displayMediaStyles() {
    const mediaStyleTag = document.getElementById("dynamic-media-styles");
    const mediaOutput = document.querySelector(".media-output");

    if (!mediaStyleTag) {
        console.error("Missing #dynamic-media-styles element!");
        return;
    }
    if (!mediaOutput) {
        console.error("Missing .media-output element!");
        return;
    }

    mediaOutput.innerHTML = "<h1>Current Media CSS</h1>";

    const cssText = mediaStyleTag.textContent.trim();
    if (!cssText) {
        mediaOutput.innerHTML += "<div class='no-styles'>No media styles added yet.</div>";
        return;
    }

    const mediaBlockRegex = /@media\s+[^{]+\{(?:[^{}]*\{[^{}]*\}[^{}]*)+\}/g;
    const blocks = cssText.match(mediaBlockRegex);

    if (blocks && blocks.length > 0) {
        blocks.forEach(block => {

            const blockDiv = document.createElement("div");
            blockDiv.className = "css-block";


            const match = block.match(/^(.*?)\{\s*([\s\S]+)\s*\}$/);
            if (!match) {

                const rawDiv = document.createElement("div");
                rawDiv.textContent = block;
                blockDiv.appendChild(rawDiv);
                mediaOutput.appendChild(blockDiv);
                return;
            }
            const mediaLine = match[1].trim();
            const innerContent = match[2].trim();

            const mediaLineEl = document.createElement("div");
            mediaLineEl.className = "css-media-query";
            mediaLineEl.textContent = mediaLine + " {";
            blockDiv.appendChild(mediaLineEl);

            const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
            let ruleMatch;
            while ((ruleMatch = ruleRegex.exec(innerContent)) !== null) {
                const selector = ruleMatch[1].trim();
                const declarationsText = ruleMatch[2].trim();

                const ruleDiv = document.createElement("div");
                ruleDiv.className = "css-rule-block";

                const selectorEl = document.createElement("div");
                selectorEl.className = "css-selector";
                selectorEl.textContent = "    " + selector + " {";
                ruleDiv.appendChild(selectorEl);


                const declarations = declarationsText.split(";")
                    .map(decl => decl.trim())
                    .filter(decl => decl.length > 0);
                declarations.forEach(decl => {
                    const declEl = document.createElement("div");
                    declEl.className = "css-declaration";
                    declEl.textContent = "        " + decl + ";";
                    ruleDiv.appendChild(declEl);
                });

                const ruleCloseEl = document.createElement("div");
                ruleCloseEl.className = "css-closing-brace";
                ruleCloseEl.textContent = "    }";
                ruleDiv.appendChild(ruleCloseEl);

                blockDiv.appendChild(ruleDiv);
            }

            const mediaCloseEl = document.createElement("div");
            mediaCloseEl.className = "css-closing-brace2";
            mediaCloseEl.textContent = "}";
            blockDiv.appendChild(mediaCloseEl);

            mediaOutput.appendChild(blockDiv);
        });
    } else {
        const rawDiv = document.createElement("div");
        rawDiv.textContent = cssText;
        mediaOutput.appendChild(rawDiv);
    }
}


document.addEventListener("DOMContentLoaded", displayMediaStyles);



document.querySelectorAll('.media-list li').forEach(li => {
    li.addEventListener('click', () => {
        disableAllEditingModes();

        document.querySelectorAll('.media-list li').forEach(item => item.classList.remove('media-selected'));
        li.classList.add('media-selected');

        mediaEditingMode = true;
        currentMediaQuery = li.getAttribute('data-media');

        console.log("[media-list] Click => mediaEditingMode = true, currentMediaQuery =", currentMediaQuery);

        populateInputsFromSelectedElement();
    });
});

document.querySelector('.finish-media-btn').addEventListener('click', () => {
    console.log("[finish-media-btn] Click => turning off mediaEditingMode");
    document.querySelectorAll('.media-list li').forEach(li => li.classList.remove('media-selected'));
    mediaEditingMode = false;
    currentMediaQuery = null;

    populateInputsFromSelectedElement();
});





function populateInputsFromMedia(elementId, mediaCond) {
    console.log("[populateInputsFromMedia]", { elementId, mediaCond });
    const colorProperties = ['background-color', 'color', 'border-color', 'outline-color'];
    const mediaObj = elementMediaQueries[elementId]?.[mediaCond] || {};

    colorProperties.forEach(cssProperty => {
        const colorValue = mediaObj[cssProperty];
        if (!colorValue) return;

        let inputIds = [];
        switch (cssProperty) {
            case 'background-color':
                inputIds = ['backgroundColorInput', 'backgroundColorHex'];
                break;
            case 'color':
                inputIds = ['fontColorInput', 'fontColorHex'];
                break;
            case 'border-color':
                inputIds = ['borderColorInput', 'borderColorHex'];
                break;
            case 'outline-color':
                inputIds = ['outlineColorInput', 'outlineColorHex'];
                break;
        }

        if (inputIds.length) {
            const hexValue = rgbToHex(colorValue);
            inputIds.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    input.value = hexValue;
                    const layoutDiv = document.querySelector(`.select-layout[data-unit-for="${id}"]`);
                    if (layoutDiv) {
                        const span = layoutDiv.querySelector('.unit-display');
                        if (span) span.textContent = '';
                    }
                }
            });
        }
    });
    Object.keys(inputMappings).forEach(inputId => {
        const cssProperty = inputMappings[inputId];
        if (colorProperties.includes(cssProperty)) return;

        const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
        if (!inputEl) return;

        const val = mediaObj[cssProperty] || "";
        const match = val.match(/^([\d.]+)(px|%|em|rem|vw|vh|auto)?$/i);
        if (match) {
            setInputValueAndUnit(inputId, match[1], match[2] || 'px');
        } else {
            setInputValueAndUnit(inputId, val, '');
        }
    });

    if (mediaObj.filter) {
        populateCompositeFilterInputs(
            { [elementId]: { filter: mediaObj.filter } },
            elementId,
            "filter",
            "filter",
            getDefaultFilterUnit
        );
    }
    if (mediaObj["backdrop-filter"]) {
        populateCompositeFilterInputs(
            { [elementId]: { "backdrop-filter": mediaObj["backdrop-filter"] } },
            elementId,
            "backdrop-filter",
            "backdropFilter",
            getDefaultBackdropFilterUnit
        );
    }
}


function fallbackInputForMedia(inputId, elementId, cssProp) {
    const colorProperties = [
        'background-color',
        'color',
        'border-color',
        'outline-color'
    ];

    if (colorProperties.includes(cssProp)) {
        const baseColor = elementUnits[elementId]?.[cssProp] || '';
        if (baseColor) {
            setInputValueAndUnit(inputId, baseColor, '');
            return;
        }
        const compColor = window.getComputedStyle(currentSelectedElement)[cssProp];
        setInputValueAndUnit(inputId, compColor, '');
        return;
    }





    const hasUserData = elementUnits[elementId]
        && elementUnits[elementId].hasOwnProperty(`${cssProp}Value`);

    if (hasUserData) {
        const baseVal = elementUnits[elementId][`${cssProp}Value`];
        const baseUnit = elementUnits[elementId][`${cssProp}Unit`];
        console.log(`    => baseVal: ${baseVal}${baseUnit || ''}`);
        setInputValueAndUnit(inputId, baseVal, baseUnit);
    } else {
        const compVal = parseFloat(window.getComputedStyle(currentSelectedElement)[cssProp]) || '';
        console.log(`    => computed fallback: ${compVal}`);
        setInputValueAndUnit(inputId, compVal, compVal ? 'px' : '');
    }
}

function setInputValueAndUnit(inputId, val, unit) {
    console.log(`[setInputValueAndUnit] inputId=${inputId}, val=${val || ''}, unit=${unit || ''}`);
    const inputEl = document.getElementById(inputId)
        || document.querySelector(`input[add-css="${inputMappings[inputId]}"]`);
    if (!inputEl) return;

    if (typeof val === 'number') val = String(val);
    inputEl.value = val || '';

    const isColorInput = inputId.includes('ColorInput') || inputId.includes('ColorHex');
    if (isColorInput) {
        if (layoutDiv) {
            const span = layoutDiv.querySelector('.unit-display');
            if (span) span.innerText = '';
        }
        if (val && val.startsWith('#') && val.length === 4) {
            val = `#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`;
        }
        inputEl.value = val || '';
        return;
    }
    const layoutDiv = document.querySelector(`.select-layout[data-unit-for="${inputId}"]`);
    if (layoutDiv) {
        const span = layoutDiv.querySelector('.unit-display');
        if (span) {
            if (unit === 'auto') {
                span.innerText = '-';
            } else if (unit) {
                span.innerText = unit.toUpperCase();
            } else {
                span.innerText = 'PX';
            }
        }
    }

    selectedUnits[inputId] = unit || 'px';
}


const elementHovers = {};
let hoverEditingMode = false;
let currentHoverClass = null;


document.querySelector('.add-hover-btn').addEventListener('click', () => {
    if (!currentSelectedElement) {
        console.log("No selected element => cannot add hover");
        return;
    }
    const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;
    if (!elementId) {
        console.log("Selected element has no class/ID => cannot add hover");
        return;
    }

    const doCreateHover = () => {
        elementHovers[elementId] = elementHovers[elementId] || {};
        updateHoverList();


        hoverEditingMode = true;
        currentHoverClass = elementId;
        populateInputsFromSelectedElement();
    };

    const undoCreateHover = () => {
        delete elementHovers[elementId];
        updateHoverList();

        if (currentHoverClass === elementId) {
            hoverEditingMode = false;
            currentHoverClass = null;
            populateInputsFromSelectedElement();
        }
    };

    doCreateHover();

    trackChange({
        do: doCreateHover,
        undo: undoCreateHover
    });
});




function updateHoverList() {
    const hoverList = document.querySelector('.hover-list');
    if (!hoverList) return;

    hoverList.innerHTML = '';

    Object.keys(elementHovers).forEach(hoverKey => {
        const li = document.createElement('li');
        li.dataset.hoverClass = hoverKey;

        li.innerHTML = `
            <span>.${hoverKey}:hover</span>
            <img class="small-img delete-hover" 
                 src="/Icon/garbage.png" 
                 alt="Delete" 
                 style="margin-left:10px;cursor:pointer; translate: 0 3px;"/>
        `;

        hoverList.appendChild(li);
    });

    console.log("[updateHoverList] Hover list updated with classes:", Object.keys(elementHovers));
}

function displayHoverStyles() {
    const hoverStyleTag = document.getElementById("dynamic-hover-styles");
    const hoverOutput = document.querySelector(".hover-output");

    if (!hoverStyleTag) {
        console.error("Missing #dynamic-hover-styles element!");
        return;
    }
    if (!hoverOutput) {
        console.error("Missing .hover-output element!");
        return;
    }

    hoverOutput.innerHTML = "<h1>Current Hover CSS</h1>";

    const hoverCss = hoverStyleTag.textContent.trim();

    if (!hoverCss) {
        hoverOutput.innerHTML += "<div class='no-styles'>No hover styles added yet.</div>";
        return;
    }

    const hoverBlocks = hoverCss.split(/\n\n/);

    hoverBlocks.forEach((block) => {
        const [selector, rules] = block.split("{");
        if (!selector || !rules) return;

        const blockDiv = document.createElement("div");
        blockDiv.classList.add("css-block");

        const selectorEl = document.createElement("span");
        selectorEl.classList.add("css-selector");
        selectorEl.textContent = selector.trim() + " {";
        blockDiv.appendChild(selectorEl);

        const rulesEl = document.createElement("div");
        rulesEl.classList.add("css-rules");
        rules
            .replace("}", "")
            .trim()
            .split(";")
            .forEach((rule) => {
                const cleanRule = rule.trim();
                if (!cleanRule) return;

                const ruleEl = document.createElement("div");
                ruleEl.classList.add("css-rule");
                ruleEl.textContent = cleanRule + ";";
                rulesEl.appendChild(ruleEl);
            });
        blockDiv.appendChild(rulesEl);

        const closingBraceEl = document.createElement("span");
        closingBraceEl.classList.add("css-closing-brace");
        closingBraceEl.textContent = "}";
        blockDiv.appendChild(closingBraceEl);


        hoverOutput.appendChild(blockDiv);
    });
}

displayHoverStyles();


document.querySelector('.hover-list').addEventListener('click', function (e) {
    disableAllEditingModes();
    const li = e.target.closest('li[data-hover-class]');
    if (!li) return;

    const hoverKey = li.dataset.hoverClass;

    if (e.target.classList.contains('delete-hover')) {
        e.stopPropagation();
        deleteHover(hoverKey);
        return;
    }

    hoverEditingMode = true;
    currentHoverClass = hoverKey;

    this.querySelectorAll('li').forEach(item => item.classList.remove('hover-selected'));
    li.classList.add('hover-selected');

    console.log("Clicked .hover-list => editing hover for", hoverKey);
    populateInputsFromSelectedElement();
});

function deleteHover(hoverKey) {
    const deletedHoverObj = elementHovers[hoverKey];

    if (!deletedHoverObj) {
        console.log(`No hover data found for ${hoverKey}, nothing to delete.`);
        return;
    }

    const doDeleteHover = () => {
        delete elementHovers[hoverKey];
        updateHoverList();

        if (currentHoverClass === hoverKey) {
            hoverEditingMode = false;
            currentHoverClass = null;
            populateInputsFromSelectedElement();
        }
    };

    const undoDeleteHover = () => {
        elementHovers[hoverKey] = deletedHoverObj;
        updateHoverList();


    };


    doDeleteHover();

    trackChange({
        do: doDeleteHover,
        undo: undoDeleteHover
    });
}



document.querySelector('.finish-hover-btn').addEventListener('click', () => {
    console.log("Finish hover mode");
    hoverEditingMode = false;
    currentHoverClass = null;


    const hoverList = document.querySelector('.hover-list');
    if (hoverList) {
        hoverList.querySelectorAll('li').forEach(li => li.classList.remove('hover-selected'));
    }


    populateInputsFromSelectedElement();
});





function populateInputsFromHover(elementId) {
    console.log("[populateInputsFromHover]", elementId);
    const colorProperties = ['background-color', 'color', 'border-color', 'outline-color'];
    const hoverObj = elementHovers[elementId] || {};

    colorProperties.forEach(cssProperty => {
        const colorValue = hoverObj[cssProperty];
        if (!colorValue) return;

        let inputIds = [];
        switch (cssProperty) {
            case 'background-color':
                inputIds = ['backgroundColorInput', 'backgroundColorHex'];
                break;
            case 'color':
                inputIds = ['fontColorInput', 'fontColorHex'];
                break;
            case 'border-color':
                inputIds = ['borderColorInput', 'borderColorHex'];
                break;
            case 'outline-color':
                inputIds = ['outlineColorInput', 'outlineColorHex'];
                break;
        }

        if (inputIds.length) {
            const hexValue = rgbToHex(colorValue);
            inputIds.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    input.value = hexValue;
                    const layoutDiv = document.querySelector(`.select-layout[data-unit-for="${id}"]`);
                    if (layoutDiv) {
                        const span = layoutDiv.querySelector('.unit-display');
                        if (span) span.textContent = '';
                    }
                }
            });
        }
    });

    Object.keys(inputMappings).forEach(inputId => {
        const cssProperty = inputMappings[inputId];
        if (colorProperties.includes(cssProperty)) return;

        const inputEl = document.querySelector(`input[add-css="${cssProperty}"]`);
        if (!inputEl) return;

        let val = hoverObj[cssProperty] || null;
        if (val === null) {
            fallbackInputForHover(inputId, elementId, cssProperty);
        } else {
            const match = val.match(/^(\d+)(px|%|em|rem|vw|vh)$/i);
            if (match) {
                setInputValueAndUnit(inputId, match[1], match[2].toLowerCase());
            } else if (val === 'auto') {
                setInputValueAndUnit(inputId, '', 'auto');
            } else {
                setInputValueAndUnit(inputId, val, '');
            }
        }
    });

    if (hoverObj.filter) {
        populateCompositeFilterInputs({ [elementId]: { filter: hoverObj.filter } }, elementId, "filter", "filter", getDefaultFilterUnit);
    }
    if (hoverObj["backdrop-filter"]) {
        populateCompositeFilterInputs({ [elementId]: { "backdrop-filter": hoverObj["backdrop-filter"] } }, elementId, "backdrop-filter", "backdropFilter", getDefaultBackdropFilterUnit);
    }
    if (hoverObj.transform) {
        const tempRules = { [elementId]: { transform: hoverObj.transform } };
        populateTransformInputs(tempRules, elementId);
    }
}


function restoreHoverListFromStyles() {
    const hoverStyleTag = document.getElementById("dynamic-hover-styles");
    if (!hoverStyleTag) return;

    const hoverCss = hoverStyleTag.textContent.trim();
    const hoverRegex = /\.([a-zA-Z0-9_-]+):hover\s*\{([^}]+)\}/g;
    let match;

    while ((match = hoverRegex.exec(hoverCss)) !== null) {
        const hoverClass = match[1].trim();
        const properties = match[2].trim();
        elementHovers[hoverClass] = elementHovers[hoverClass] || {};

        filterState[hoverClass] = {};
        backdropFilterState[hoverClass] = {};

        properties.split(";").forEach(prop => {
            const [key, value] = prop.split(":").map(str => str.trim());
            if (!key || !value) return;

            if (key === "filter" || key === "backdrop-filter") {
                const isBackdrop = key === "backdrop-filter";
                const state = isBackdrop ? backdropFilterState : filterState;


                const funcRegex = /([a-zA-Z-]+)\(([^)]+)\)/g;
                let funcMatch;

                while ((funcMatch = funcRegex.exec(value)) !== null) {
                    const funcName = funcMatch[1];
                    const funcValue = funcMatch[2];
                    const valMatch = funcValue.match(/(-?\d+\.?\d*)(.*)/);

                    if (valMatch) {
                        const [_, num, unit] = valMatch;
                        state[hoverClass][funcName] = num + (unit || getDefaultFilterUnit(funcName));
                    }
                }

                elementHovers[hoverClass][key] = value;
            } else {
                elementHovers[hoverClass][key] = value;
            }
        });
    }

    console.log("[restoreHoverListFromStyles] Restored elementHovers:", elementHovers);
    updateHoverList();
}

document.addEventListener("DOMContentLoaded", restoreHoverListFromStyles);


function fallbackInputForHover(inputId, elementId, cssProp) {
    const hasUserData = elementUnits[elementId]
        && elementUnits[elementId].hasOwnProperty(cssProp + 'Value');

    if (hasUserData) {
        const baseVal = elementUnits[elementId][cssProp + 'Value'];
        const baseUnit = elementUnits[elementId][cssProp + 'Unit'];
        setInputValueAndUnit(inputId, baseVal, baseUnit);
    } else {
        const compVal = parseFloat(window.getComputedStyle(currentSelectedElement)[cssProp]) || '';
        setInputValueAndUnit(inputId, compVal, compVal ? 'px' : '');
    }
}




function rebuildHoverStyles() {
    const hoverStyleTag = document.getElementById("dynamic-hover-styles");
    if (!hoverStyleTag) {
        return;
    }

    let cssText = "";
    const selectUnits = {};
    const colorProperties = ['background-color', 'color', 'border-color', 'outline-color'];
    const transformFunctions = [
        "translateX",
        "translateY",
        "translateZ",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "scale",
        "scaleX",
        "scaleY",
        "skewX",
        "skewY"
    ];


    Object.entries(elementHovers).forEach(([hoverClass, propsObj]) => {
        const lines = [];
        const transformParts = [];


        Object.entries(propsObj).forEach(([prop, rawValue]) => {
            if (prop === "transform") {
                transformParts.push(rawValue);
                return;
            }

            if (colorProperties.includes(prop)) {
                lines.push(`${prop}: ${rawValue};`);
                return;
            }

            if (prop.indexOf("transform:") === 0) {
                const transformName = prop.split(":")[1];
                let unit = "";
                if (!["scale", "scaleX", "scaleY"].includes(transformName)) {
                    unit = getDefaultUnit(transformName) || "px";
                }
                if (/^\d+(\.\d+)?$/.test(rawValue)) {
                    rawValue = rawValue + unit;
                }
                transformParts.push(`${transformName}(${rawValue})`);
                return;
            }

            if (transformFunctions.includes(prop)) {
                let unit = "";
                if (!["scale", "scaleX", "scaleY"].includes(prop)) {
                    unit = getDefaultUnit(prop) || "px";
                }
                if (/^\d+(\.\d+)?$/.test(rawValue)) {
                    rawValue = rawValue + unit;
                }
                transformParts.push(`${prop}(${rawValue})`);
                return;
            }

            const targetInputId = `${hoverClass}-${prop}`;
            const theUnit = selectUnits[targetInputId] || "px";
            let finalVal = rawValue;
            if (theUnit !== "auto" && /^\d+(\.\d+)?$/.test(rawValue)) {
                finalVal = rawValue + theUnit;
            } else if (theUnit === "auto") {
                finalVal = "auto";
            }
            selectUnits[targetInputId] = theUnit;
            lines.push(`${prop}: ${finalVal};`);
        });

        if (transformParts.length > 0) {
            lines.push(`transform: ${transformParts.join(" ")};`);
        }

        if (lines.length > 0) {
            cssText += `.${hoverClass}:hover {\n  ${lines.join("\n  ")}\n}\n\n`;
        }
    });

    hoverStyleTag.textContent = cssText.trim();
    window.selectUnitsString = Object.entries(selectUnits)
        .map(([key, value]) => `${key}:${value}`)
        .join(";");
    displayHoverStyles();
}



let isDragging = false;


const adjustConfig = {
    'width-adding': 'widthInput',
    'min-width-adding': 'minWidthInput',
    'max-width-adding': 'maxWidthInput',
    'height-adding': 'heightInput',
    'min-height-adding': 'minHeightInput',
    'max-height-adding2': 'maxHeightInput',
    'font-size-adding': 'fontSizeInput',
    'line-height-adding': 'lineHeightInput',
    'border-width-adding': 'borderWidthInput',
    'border-top-width-adding': 'borderTopWidthInput',
    'border-right-width-adding': 'borderRightWidthInput',
    'border-bottom-width-adding': 'borderBottomWidthInput',
    'border-left-width-adding': 'borderLeftWidthInput',
    'border-radius-adding': 'borderRadiusInput',
    'border-radius-top-left-adding': 'borderTopLeftRadiusInput',
    'border-radius-top-right-adding': 'borderTopRightRadiusInput',
    'border-radius-bottom-left-adding': 'borderBottomLeftRadiusInput',
    'border-radius-bottom-right-adding': 'borderBottomRightRadiusInput',
    'gap-adding': 'gapInput',
    'gap-rows-adding': 'rowGapInput',
    'gap-columns-adding': 'columnGapInput',
    'padding-adding2': 'paddingInput',
    'padding-top-adding': 'paddingTopInput',
    'padding-right-adding': 'paddingRightInput',
    'padding-bottom-adding': 'paddingBottomInput',
    'padding-left-adding': 'paddingLeftInput',
    'margin-adding': 'marginInput',
    'margin-top-adding': 'marginTopInput',
    'margin-right-adding': 'marginRightInput',
    'margin-bottom-adding': 'marginBottomInput',
    'margin-left-adding': 'marginLeftInput',
    'top-adding': 'topDataInput',
    'right-adding': 'rightDataInput',
    'bottom-adding': 'bottomDataInput',
    'left-adding': 'leftDataInput',
    'opacity-adding': 'opacityInput',
    'box-shadow1-adding': 'horizontal-offset',
    'box-shadow2-adding': 'vertical-offset',
    'box-shadow3-adding': 'blur-radius',
    'text-shadow1-adding': 'horizontal-offset2',
    'text-shadow2-adding': 'vertical-offset2',
    'text-shadow3-adding': 'blur-radius2',
    'translateX-adding': 'translateXInput',
    'translateY-adding': 'translateYInput',
    'scale-adding': 'scaleInput',
    'scaleX-adding': 'scaleXInput',
    'scaleY-adding': 'scaleYInput',
    'rotate-adding': 'rotateInput',
    'rotateX-adding': 'rotateXInput',
    'rotateY-adding': 'rotateYInput',
    'skewX-adding': 'skewXInput',
    'skewY-adding': 'skewYInput',
    'outline-width-adding': 'outlineWidthInput',
    'outline-offset-adding': 'outlineOffsetInput',
    'blur-adding': 'filterBlurInput',
    'brightness-adding': 'filterbrightnessInput',
    'blur-adding': 'filterBlurInput',
    'contrast-adding': 'filterContrastInput',
    'hue-rotate-adding': 'filterHueRotateInput',
    'saturate-adding': 'filterSaturateInput',
    'grayscale-adding': 'filterGrayscaleInput',
    'invert-adding': 'filterInvertInput',
    'sepia-adding': 'filterSepiaInput',
    'blur-adding2': 'backdropFilterBlurInput',
    'brightness-adding2': 'backdropFilterbrightnessInput',
    'blur-adding2': 'backdropFilterBlurInput',
    'contrast-adding2': 'backdropFilterContrastInput',
    'hue-rotate-adding2': 'backdropFilterHueRotateInput',
    'saturate-adding2': 'backdropFilterSaturateInput',
    'grayscale-adding2': 'backdropFilterGrayscaleInput',
    'invert-adding2': 'backdropFilterInvertInput',
    'sepia-adding2': 'backdropFilterSepiaInput',
    'border-radius-adding': 'borderRadiusInput',
    'border-top-left-radius-adding': 'borderTopLeftRadiusInput',
    'border-top-right-radius-adding': 'borderTopRightRadiusInput',
    'border-bottom-left-radius-adding': 'borderBottomLeftRadiusInput',
    'border-bottom-right-radius-adding': 'borderBottomRightRadiusInput',
    'anim-duration-adding': 'animDuration',
    'anim-delay-adding': 'animDelay',
    'transition-duration-adding': 'transitionDurationInput',
};

Object.entries(adjustConfig).forEach(([adjustControlClass, inputId]) => {
    const adjustControl = document.querySelector(`.${adjustControlClass}`);
    const inputElement = document.getElementById(inputId);

    if (!adjustControl || !inputElement) return;

    let isDragging = false;
    let initialY = 0;
    let initialValue = 0;


    adjustControl.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialY = e.clientY;
        initialValue = parseFloat(inputElement.value) || 0;


        e.preventDefault();
    });

    const mouseMoveHandler = (e) => {
        if (!isDragging) return;

        const deltaY = initialY - e.clientY;
        const sensitivity = 1;
        const newValue = initialValue + Math.round(deltaY / sensitivity);

        inputElement.value = newValue;

        handleCssInput({ target: inputElement });
    };

    const mouseUpHandler = () => {
        if (isDragging) {
            isDragging = false;

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }
    };

    adjustControl.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
});

function removeCssPropertyFromClass(className, cssProperty) {
    const styleTag = document.getElementById('dynamic-styles');
    if (!styleTag) return;

    let styles = styleTag.innerHTML;
    const regex = new RegExp(`\\.${className}\\s*{[^}]*}`, 'g');
    const match = styles.match(regex);

    if (match) {
        let existingStyleBlock = match[0];
        const updatedStyleBlock = existingStyleBlock.replace(new RegExp(`${cssProperty}:\\s*[^;]+;?`, 'g'), '');
        styles = styles.replace(existingStyleBlock, updatedStyleBlock);
        styleTag.innerHTML = styles;

        updatePreviews();
    }
}

function updateCssForClass(className, cssProperty, newValue) {
    let styleTag = document.getElementById('dynamic-styles');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-styles';
        document.head.appendChild(styleTag);
    }
    let styles = styleTag.textContent || "";

    const escapedClassName = className.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    if (cssProperty === 'background-image') {
        const classRegex = new RegExp(`(\\.${escapedClassName}\\s*\\{)([^}]*)(\\})`, "m");
        if (classRegex.test(styles)) {
            styles = styles.replace(classRegex, (match, openBrace, properties, closeBrace) => {
                let newProperties = properties.replace(/background-image\s*:\s*[^;]+;?/gi, "");
                newProperties = newProperties
                    .split('\n')
                    .filter(line => !/^\s*url\([^)]*\)\s*;?\s*$/.test(line))
                    .join('\n');
                if (newValue !== null) {
                    newProperties += ` background-image: ${newValue};`;
                }
                return openBrace + newProperties + closeBrace;
            });
        } else if (newValue !== null) {
            styles += `\n.${className} { background-image: ${newValue}; }`;
        }
    } else {
        const regex = new RegExp(`\\.${escapedClassName}\\s*{([^}]*)}`, 'g');
        const match = styles.match(regex);
        let updatedStyles = "";
        if (match) {
            let existingStyle = match[0];
            const propertyRegex = new RegExp(`${cssProperty}\\s*:\\s*([^;]+);`, 'g');
            const propertyMatch = existingStyle.match(propertyRegex);
            if (propertyMatch) {
                existingStyle = existingStyle.replace(propertyRegex, `${cssProperty}: ${newValue};`);
            } else if (newValue !== null) {
                existingStyle = existingStyle.replace('}', `  ${cssProperty}: ${newValue}; }`);
            }
            updatedStyles = styles.replace(regex, existingStyle);
        } else if (newValue !== null) {
            updatedStyles = styles + `\n.${className} { ${cssProperty}: ${newValue}; }`;
        }
        styles = updatedStyles;
    }

    if (!elementUnits[className]) {
        elementUnits[className] = {};
    }
    if (newValue !== null) {
        elementUnits[className][cssProperty] = newValue;
    } else {
        delete elementUnits[className][cssProperty];
    }

    styleTag.textContent = styles.trim();

    updatePreviews();
}

function transferCssToNewClass(oldClass, newClass) {
    let styleTag = document.getElementById('dynamic-styles');
    if (styleTag) {
        let styles = styleTag.innerHTML;


        const oldClassRegex = new RegExp(`\\.${oldClass}\\s*{[^}]*}`, 'g');
        const match = styles.match(oldClassRegex);

        if (match) {

            const oldClassStyles = match[0].replace(`.${oldClass}`, `.${newClass}`);
            styles = styles.replace(oldClassRegex, '');
            styles += oldClassStyles;
        }

        styleTag.innerHTML = styles;
    }
}



const displayButtons = document.querySelectorAll('.btn-s1');
const flexMenu = document.querySelector('.flex-menu');
const gridMenu = document.querySelector('.grid-menu');
const gapMenu = document.querySelector('.gap-menu');

function updateMenuVisibility() {
    if (currentSelectedElement) {
        const elementStyle = window.getComputedStyle(currentSelectedElement);
        const displayProperty = elementStyle.getPropertyValue('display');


        flexMenu.classList.toggle('none', displayProperty !== 'flex');
        gridMenu.classList.toggle('none', displayProperty !== 'grid');

        if (displayProperty === 'flex' || displayProperty === 'grid') {
            gapMenu.classList.remove('none');
        } else {
            gapMenu.classList.add('none');
        }
    }
}

function updateCSSRule(className, property, value) {
    let styleTag = document.getElementById('dynamic-styles');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-styles';
        document.head.appendChild(styleTag);
    }

    const sheet = styleTag.sheet;
    const rule = `.${className} { ${property}: ${value}; }`;

    const index = Array.from(sheet.cssRules).findIndex(r => r.selectorText === `.${className}`);
    if (index > -1) {
        sheet.deleteRule(index);
    }
    sheet.insertRule(rule, sheet.cssRules.length);
}

displayButtons.forEach(button => {
    button.addEventListener('click', () => {
        const displayStyle = button.getAttribute('add-css').split(': ')[1].replace(';', '');

        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0];
            if (firstClass) {


                updateMenuVisibility();
            }
        }


        displayButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});


function updateGridCounts() {
    if (currentSelectedElement) {
        const firstClass = currentSelectedElement.classList[0];
        const gridStyles = window.getComputedStyle(currentSelectedElement);


        const columnTemplate = gridStyles.getPropertyValue('grid-template-columns');
        const rowTemplate = gridStyles.getPropertyValue('grid-template-rows');

        const columnCount = columnTemplate.split(' ').filter(Boolean).length || 0;
        const rowCount = rowTemplate.split(' ').filter(Boolean).length || 0;

        document.querySelectorAll('.count.column h1').forEach((columnCountElement) => {
            columnCountElement.innerText = columnCount;
        });

        document.querySelectorAll('.count.row h1').forEach((rowCountElement) => {
            rowCountElement.innerText = rowCount;
        });
    }
}


let nextColNumber = 5;

function updateGridTemplate(property, increment) {
    if (!currentSelectedElement) return;

    const firstClass = currentSelectedElement.classList[0];
    let template = getComputedStyle(currentSelectedElement).getPropertyValue(property).trim().split(/\s+/);
    const isColumn = property === 'grid-template-columns';


    const columnCount = getComputedStyle(currentSelectedElement).getPropertyValue('grid-template-columns').trim().split(/\s+/).length;
    const rowCount = getComputedStyle(currentSelectedElement).getPropertyValue('grid-template-rows').trim().split(/\s+/).length;

    if (increment) {
        template.push(isColumn ? '1fr' : 'auto');

        if (isColumn) {
            for (let row = 0; row < rowCount; row++) {
                let newColDiv = document.createElement('div');
                newColDiv.classList.add(`col${nextColNumber++}`, 'w2-engine-bx');
                currentSelectedElement.appendChild(newColDiv);
            }
        } else {
            for (let col = 0; col < columnCount; col++) {
                let newRowDiv = document.createElement('div');
                newRowDiv.classList.add(`col${nextColNumber++}`, 'w2-engine-bx');
                currentSelectedElement.appendChild(newRowDiv);
            }
        }
    } else if (template.length > 1) {
        template.pop();

        if (isColumn) {

            for (let row = 0; row < rowCount; row++) {
                const lastColDiv = currentSelectedElement.querySelector(`.col${nextColNumber - 1}`);
                if (lastColDiv) lastColDiv.remove();
                nextColNumber--;
            }
        } else {

            for (let col = 0; col < columnCount; col++) {
                const lastRowDiv = currentSelectedElement.querySelector(`.col${nextColNumber - 1}`);
                if (lastRowDiv) lastRowDiv.remove();
                nextColNumber--;
            }
        }
    }


    const updatedTemplate = template.map(value => isColumn ? '1fr' : 'auto').join(' ');
    updateCssForClass(firstClass, property, updatedTemplate);

    updateGridCounts();
}



document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', handleGridButtonClick);
});


function handleGridButtonClick(e) {
    const button = e.currentTarget;
    const isIncrement = button.querySelector('img').getAttribute('src').includes('add.png');
    const cssProperty = button.getAttribute('add-css');
    updateGridTemplate(cssProperty, isIncrement);
}


function updateTagCounts(selectedTag) {
    const counts = document.querySelectorAll('.padding-menu .count');

    counts.forEach(count => {
        const tagNumber = count.querySelector('h1').textContent;
        if (parseInt(tagNumber) === parseInt(selectedTag[1])) { // Matches h1, h2, etc.
            count.classList.add('active');
        } else {
            count.classList.remove('active');
        }
    });
}


document.querySelector('.text-menu').addEventListener('click', function (event) {
    const target = event.target.closest('.count');
    if (target && currentSelectedElement) {

        document.querySelectorAll('.text-menu .count').forEach(count => count.classList.remove('active'));


        target.classList.add('active');


        const tagNumber = target.querySelector('h1').innerText;
        const newTagName = `h${tagNumber}`;


        const newTagElement = document.createElement(newTagName);
        newTagElement.className = currentSelectedElement.className.replace(/w2-engine-text\d+/, `w2-engine-text${tagNumber}`);
        newTagElement.textContent = currentSelectedElement.textContent;


        currentSelectedElement.replaceWith(newTagElement);
        currentSelectedElement = newTagElement;
    }
});


document.querySelector('.text-menu .input-number').addEventListener('input', function (event) {
    if (currentSelectedElement) {
        currentSelectedElement.textContent = event.target.value;
    }
});




const elementStyles = {};




document.querySelectorAll('.m-top, .m-right, .m-bottom, .m-left, .p-top, .p-right, .p-bottom, .p-left').forEach(element => {
    let initialY, initialValue;
    let isDragging = false;
    let arrowElement;

    element.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        initialY = e.clientY;
        initialValue = parseInt(element.innerText, 10) || 0;

        if (currentSelectedElement) {
            createArrow(element, currentSelectedElement);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopDrag);
    });

    function handleMouseMove(e) {
        if (!isDragging) return;

        const deltaY = initialY - e.clientY;
        const newValue = initialValue + Math.round(deltaY / 10);

        element.innerText = newValue;

        if (newValue > 0) {
            element.style.textShadow = '0px 0px 6px #ff5d00, 0px 0px 2px #ff9900, 0px 0px 1px #ffc100, 0px 0px 8px #ff5d00';
        } else {
            element.style.removeProperty('text-shadow');
        }

        const cssProperty = element.classList.contains('m-top') ? 'margin-top' :
            element.classList.contains('m-right') ? 'margin-right' :
                element.classList.contains('m-bottom') ? 'margin-bottom' :
                    element.classList.contains('m-left') ? 'margin-left' :
                        element.classList.contains('p-top') ? 'padding-top' :
                            element.classList.contains('p-right') ? 'padding-right' :
                                element.classList.contains('p-bottom') ? 'padding-bottom' :
                                    'padding-left';

        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0];
            if (firstClass) {
                if (newValue > 0) {
                    updateCssForClass(firstClass, cssProperty, `${newValue}px`);
                } else {
                    removeCssPropertyFromClass(firstClass, cssProperty);
                }

                if (!elementStyles[firstClass]) {
                    elementStyles[firstClass] = { margin: {}, padding: {} };
                }

                if (cssProperty.startsWith('margin')) {
                    elementStyles[firstClass].margin[cssProperty] = newValue;
                } else {
                    elementStyles[firstClass].padding[cssProperty] = newValue;
                }
            }
        }

        if (element.bgElement) {
            if (cssProperty.startsWith('margin')) {
                if (cssProperty === 'margin-top') {
                    element.bgElement.style.height = `${newValue}px`;
                    element.bgElement.style.top = `-${newValue}px`;
                } else if (cssProperty === 'margin-bottom') {
                    element.bgElement.style.height = `${newValue}px`;
                    element.bgElement.style.bottom = `-${newValue}px`;
                } else if (cssProperty === 'margin-left') {
                    element.bgElement.style.width = `${newValue}px`;
                    element.bgElement.style.left = `-${newValue}px`;
                } else if (cssProperty === 'margin-right') {
                    element.bgElement.style.width = `${newValue}px`;
                    element.bgElement.style.right = `-${newValue}px`;
                }
            } else {
                if (cssProperty === 'padding-top' || cssProperty === 'padding-bottom') {
                    element.bgElement.style.height = `${newValue}px`;
                } else {
                    element.bgElement.style.width = `${newValue}px`;
                }
            }
        }
    }

    function createArrow(element, targetElement) {

        const isMargin = element.className.startsWith('m-');

        targetElement.style.position = 'relative';


        const cssProperty = element.classList.contains('m-top') ? 'margin-top' :
            element.classList.contains('m-right') ? 'margin-right' :
                element.classList.contains('m-bottom') ? 'margin-bottom' :
                    element.classList.contains('m-left') ? 'margin-left' :
                        element.classList.contains('p-top') ? 'padding-top' :
                            element.classList.contains('p-right') ? 'padding-right' :
                                element.classList.contains('p-bottom') ? 'padding-bottom' :
                                    'padding-left';

        const bgElement = document.createElement('div');
        bgElement.className = `padding-margin-background ${isMargin ? 'margin-bg' : 'padding-bg'}`;
        bgElement.style.position = 'absolute';
        bgElement.style.backgroundColor = isMargin ? '#4b4b4b' : '#4b4b4b';

        if (cssProperty === 'margin-top' || cssProperty === 'padding-top') {
            bgElement.style.top = '0';
            bgElement.style.left = '0';
            bgElement.style.width = '100%';
            bgElement.style.height = '0';
        } else if (cssProperty === 'margin-right' || cssProperty === 'padding-right') {
            bgElement.style.top = '0';
            bgElement.style.right = '0';
            bgElement.style.width = '0';
            bgElement.style.height = '100%';
        } else if (cssProperty === 'margin-bottom' || cssProperty === 'padding-bottom') {
            bgElement.style.bottom = '0';
            bgElement.style.left = '0';
            bgElement.style.width = '100%';
            bgElement.style.height = '0';
        } else if (cssProperty === 'margin-left' || cssProperty === 'padding-left') {
            bgElement.style.top = '0';
            bgElement.style.left = '0';
            bgElement.style.width = '0';
            bgElement.style.height = '100%';
        }

        targetElement.appendChild(bgElement);

        element.bgElement = bgElement;
    }

    function stopDrag() {
        isDragging = false;
        if (element.bgElement) {
            element.bgElement.remove();
            element.bgElement = null;
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopDrag);
    }
});



function populateMarginPaddingValues(className) {
    const element = document.querySelector(`.${className}`);
    const styles = elementStyles[className] || { margin: {}, padding: {} };

    const computedStyles = element ? window.getComputedStyle(element) : null;

    function getStyleValue(type, side) {
        let value = styles[type][`${type}-${side}`] || (computedStyles ? computedStyles.getPropertyValue(`${type}-${side}`) : '0px');
        return String(value).replace('px', '');
    }


    function applyTextShadow(element, value) {
        if (value > 0) {
            element.style.textShadow = '0px 0px 6px #ff5d00, 0px 0px 2px #ff9900, 0px 0px 1px #ffc100, 0px 0px 8px #ff5d00';
        } else {
            element.style.textShadow = 'none';
        }
    }

    document.querySelector('.m-top').innerText = getStyleValue('margin', 'top');
    applyTextShadow(document.querySelector('.m-top'), getStyleValue('margin', 'top'));

    document.querySelector('.m-right').innerText = getStyleValue('margin', 'right');
    applyTextShadow(document.querySelector('.m-right'), getStyleValue('margin', 'right'));

    document.querySelector('.m-bottom').innerText = getStyleValue('margin', 'bottom');
    applyTextShadow(document.querySelector('.m-bottom'), getStyleValue('margin', 'bottom'));

    document.querySelector('.m-left').innerText = getStyleValue('margin', 'left');
    applyTextShadow(document.querySelector('.m-left'), getStyleValue('margin', 'left'));

    document.querySelector('.p-top').innerText = getStyleValue('padding', 'top');
    applyTextShadow(document.querySelector('.p-top'), getStyleValue('padding', 'top'));

    document.querySelector('.p-right').innerText = getStyleValue('padding', 'right');
    applyTextShadow(document.querySelector('.p-right'), getStyleValue('padding', 'right'));

    document.querySelector('.p-bottom').innerText = getStyleValue('padding', 'bottom');
    applyTextShadow(document.querySelector('.p-bottom'), getStyleValue('padding', 'bottom'));

    document.querySelector('.p-left').innerText = getStyleValue('padding', 'left');
    applyTextShadow(document.querySelector('.p-left'), getStyleValue('padding', 'left'));

}

function resetPanelIfNoSelection() {
    const selectedElements = previewContent.querySelectorAll('.selected');
    if (selectedElements.length === 0) {
        showSelectionMessage();
    }
}

resetPanelIfNoSelection();



let isHoverInteraction = false;


document.addEventListener('mouseover', function (e) {
    if (isClickInProgress) return;

    isHoverInteraction = true;


    if (previewContent.contains(e.target)) {
        if (!e.target.classList.contains('selected')) {
            e.target.classList.add('hovering');
        }

        addTagNameToElement(e.target, false);
    }

    isHoverInteraction = false;
});


document.addEventListener('mouseout', function (e) {
    if (isClickInProgress) return;
    isHoverInteraction = true;


    if (previewContent.contains(e.target)) {

        e.target.classList.remove('hovering');
        if (e.target.classList.contains('selected')) {
            e.target.classList.remove('hovering');
        }

        if (nameHoverDisplay) {
            nameHoverDisplay.textContent = '';
        }
    }

    isHoverInteraction = false;
});

const nameHoverDisplay = document.querySelector('.name-hover-select');

function addTagNameToElement(element) {
    const firstClassName = element.classList[0];

    if (firstClassName && nameHoverDisplay) {
        const truncatedClassName = firstClassName.length > 15
            ? firstClassName.substring(0, 9) + "..."
            : firstClassName;

        nameHoverDisplay.textContent = truncatedClassName;
    }
}




function handleSectionClick(sectionClass, classMappings) {

    const sectionDivs = document.querySelectorAll(`.${sectionClass} div`);
    const targetTexts = document.querySelectorAll('.flex-align p');

    sectionDivs.forEach(div => {
        div.addEventListener('click', function () {
            sectionDivs.forEach(d => d.classList.remove(`activate-${sectionClass}`));
            div.classList.add(`activate-${sectionClass}`);

            targetTexts.forEach(p => p.classList.remove('radius-shadow'));

            const targetText = classMappings.find(mapping => div.classList.contains(mapping.divClass)).text;

            targetTexts.forEach(p => {
                if (p.textContent.trim() === targetText) {
                    p.classList.add('radius-shadow');
                }
            });
        });
    });
}

const radiusMappings = [
    { divClass: 'top-left-radius', text: 'Radius-top-left' },
    { divClass: 'top-right-radius', text: 'Radius-top-right' },
    { divClass: 'bottom-left-radius', text: 'Radius-bottom-left' },
    { divClass: 'bottom-right-radius', text: 'Radius-bottom-right' },
    { divClass: 'center-radius', text: 'Radius' }
];

const borderMappings = [
    { divClass: 'top-border', text: 'Border-top-width' },
    { divClass: 'right-border', text: 'Border-right-width' },
    { divClass: 'bottom-border', text: 'Border-bottom-width' },
    { divClass: 'left-border', text: 'Border-left-width' },
    { divClass: 'center-border', text: 'Border-width' }
];

handleSectionClick('square-radius', radiusMappings);
handleSectionClick('square-border', borderMappings);



function rebuildForimaBlocks(templateBlocksData) {
    document.querySelectorAll('.forima-block').forEach(el => el.remove());

    Object.keys(previewContentData).forEach(key => delete previewContentData[key]);
    Object.keys(elementCounters).forEach(key => delete elementCounters[key]);

    if (!templateBlocksData || !Array.isArray(templateBlocksData)) return;

    templateBlocksData.forEach(item => {
        const {
            id,
            elementId,
            unique_class,
            background_url,
            background_linear,
            background_radial,
            background_linear_rgba,
            background_type,
            first_class,
            html_content
        } = item;

        const key = (first_class || unique_class).trim().toLowerCase();
        const typeTextMap = {
            'bg-setting1': 'Image & Gradient',
            'bg-setting2': 'Linear Gradient',
            'bg-setting3': 'Radial Gradient',
            'bg-setting4': 'Solid Color'
        };

        const newDiv = document.createElement('div');
        newDiv.classList.add('forima-block', 'flex-sb-align', unique_class, 'm-b-20', 'b-2');
        newDiv.innerHTML = `
            <p>${typeTextMap[background_type] || 'Unknown Setting'}</p>
            <div class="flex-align gap10">
                <img class="small-img garbage-icon remove-event" src="/Icon/garbage.png" alt="Delete">
            </div>
        `;

        newDiv.setAttribute('data-block-id', id);
        newDiv.setAttribute('data-unique-class', unique_class);
        newDiv.setAttribute('data-first-class', key);

        newDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            backgroundMenu.classList.remove('none');
            setActiveBackgroundState(key, unique_class);

        });

        const garbageIcon = newDiv.querySelector('.garbage-icon');
        garbageIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteCustomHTML(newDiv, key);
        });


        backgroundStyleDiv.parentNode.insertBefore(newDiv, backgroundStyleDiv.nextSibling);


        if (!previewContentData[key]) {
            previewContentData[key] = [];
        }
        previewContentData[key].push({
            id: id,
            uniqueClass: unique_class,
            dom: newDiv,

            backgroundImage: background_url || background_linear || "",
            activeButton: background_type || 'bg-setting1',
            gradientState: null,
            radialGradientState: null,
            firstClass: key
        });


        if (!elementCounters[key]) {
            elementCounters[key] = 0;
        }
        elementCounters[key]++;
    });
}


const backgroundStyleDiv = document.querySelector('.background-style');
const backgroundMenu = document.querySelector('.background-menu');

const elementCounters = {};
let activeForimaBlock = null;
const customContentHTML = `
<p>Image & Background</p>
<div class="flex-align gap10">
    <img class="small-img garbage-icon remove-event" src="/Icon/garbage.png" alt="Delete">
</div>
`;

let forimaCounter = 1;

function getOrCreateElementId(element) {
    if (!element.id) {
        element.id = `element-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    return element.id;
}

function createNewBackgroundDiv() {
    if (!currentSelectedElement) {
        displayErrorMessage("Please select an element first.");
        return;
    }

    const userTemplateId = projectId;
    const firstClass = (currentSelectedElement.classList[0] || "").trim();
    const uniqueClass = "forima" + forimaCounter++;

    const newDiv = document.createElement("div");
    newDiv.classList.add("forima-block", "flex-sb-align", uniqueClass, "m-b-20", "b-2");
    newDiv.setAttribute("data-unique-class", uniqueClass);
    newDiv.setAttribute("data-first-class", firstClass);
    newDiv.innerHTML = `
        <p>Image & Gradient</p>
        <div class="flex-align gap10">
            <img class="small-img garbage-icon remove-event" src="/Icon/garbage.png" alt="Delete">
        </div>
    `;
    backgroundStyleDiv.parentNode.insertBefore(newDiv, backgroundStyleDiv.nextSibling);

    if (!previewContentData[firstClass]) {
        previewContentData[firstClass] = [];
    }
    const defaultBackgroundUrl = "url(https://d3e54v103j8qbb.cloudfront.net/img/background-image.svg)";
    previewContentData[firstClass].push({
        id: null,
        uniqueClass,
        dom: newDiv,
        backgroundImage: defaultBackgroundUrl,
        activeButton: "bg-setting1",
        gradientState: null,
        radialGradientState: null,
        firstClass
    });

    removeCssPropertyFromClass(firstClass, 'background-image');
    updateCssForClass(firstClass, 'background-image', defaultBackgroundUrl);

    fetch("/blocks/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']").getAttribute("content")
        },
        body: JSON.stringify({
            user_template_id: userTemplateId,
            unique_class: uniqueClass,
            html_content: newDiv.outerHTML,
            first_class: firstClass,
            background_type: "bg-setting1",
            background_url: defaultBackgroundUrl
        })
    })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                console.log("Block created:", data.block);
                const localBlock = previewContentData[firstClass].find(b => b.uniqueClass === uniqueClass);
                if (localBlock) {
                    localBlock.id = data.block.id;
                    localBlock.dom.setAttribute("data-block-id", data.block.id);
                }
                activeForimaBlock = localBlock;
            }
        })
        .catch(err => console.error("[createNewBackgroundDiv] Error:", err));

    newDiv.addEventListener("click", e => {
        e.stopPropagation();
        backgroundMenu.classList.remove('none');
        const firstClass = newDiv.getAttribute("data-first-class");
        setActiveBackgroundState(firstClass, uniqueClass);
        activeForimaBlock = previewContentData[firstClass].find(b => b.uniqueClass === uniqueClass);
    });

    const garbageIcon = newDiv.querySelector(".garbage-icon");
    if (garbageIcon) {
        garbageIcon.addEventListener("click", (ev) => {
            ev.stopPropagation();
            console.log("Garbage icon clicked for block:", newDiv);
            deleteCustomHTMLServer(newDiv);
        });
    }
}



function loadServerBlocksIntoPreviewContentData() {
    window.previewContentData = window.previewContentData || {};
    document.querySelectorAll('.server-block').forEach(blockEl => {
        const blockId = blockEl.getAttribute('data-block-id');
        const uniqueClass = (blockEl.getAttribute('data-unique-class') || "").trim();
        const firstClass = (blockEl.getAttribute('data-first-class') || "").trim();
        const backgroundType = blockEl.getAttribute('data-background-type') || "bg-setting1";
        const backgroundLinear = blockEl.getAttribute('data-background-linear') || "";
        const backgroundUrl = blockEl.getAttribute('data-background-url') || "";
        const backgroundRadial = blockEl.getAttribute('data-background-radial') || "";
        const backgroundLinearRgba = blockEl.getAttribute('data-background-linear-rgba') || "";

        const blockObj = {
            id: blockId,
            uniqueClass: uniqueClass,
            dom: blockEl,
            background_type: backgroundType,
            background_linear: backgroundLinear,
            background_url: backgroundUrl,
            background_radial: backgroundRadial,
            background_linear_rgba: backgroundLinearRgba,
            activeButton: backgroundType,
            gradientState: null,
            radialGradientState: null,
            firstClass: firstClass
        };

        if (!previewContentData[firstClass]) {
            previewContentData[firstClass] = [];
        }
        previewContentData[firstClass].push(blockObj);
        console.log("Loaded server block into previewContentData:", blockObj);
    });
}

function initServerBlocks() {
    document.querySelectorAll('.server-block').forEach(blockEl => {
        blockEl.addEventListener('click', (e) => {
            e.stopPropagation();
            backgroundMenu.classList.remove('none');

            const blockId = blockEl.getAttribute('data-block-id');
            const uniqueClass = (blockEl.getAttribute('data-unique-class') || "").trim();
            const firstClass = (blockEl.getAttribute('data-first-class') || "").trim();

            const backgroundType = blockEl.getAttribute('data-background-type') || "bg-setting1";
            const backgroundLinear = blockEl.getAttribute('data-background-linear') || "";
            const backgroundUrl = blockEl.getAttribute('data-background-url') || "";
            const backgroundRadial = blockEl.getAttribute('data-background-radial') || "";
            const backgroundLinearRgba = blockEl.getAttribute('data-background-linear-rgba') || "";

            console.log("Server block clicked:", { blockId, uniqueClass, firstClass, backgroundType, backgroundLinear });

            const blockArray = previewContentData[firstClass] || [];
            const foundBlock = blockArray.find(item => item.uniqueClass === uniqueClass);
            if (foundBlock) {
                foundBlock.dom = blockEl;
                foundBlock.activeButton = backgroundType;
                foundBlock.background_url = backgroundUrl;
                foundBlock.background_linear = backgroundLinear;
                foundBlock.background_radial = backgroundRadial;
                foundBlock.background_linear_rgba = backgroundLinearRgba;
                activeForimaBlock = foundBlock;
                console.log("Found block in previewContentData:", foundBlock);
            } else {
                console.warn("No block found in previewContentData for", firstClass, uniqueClass);
            }

            setActiveBackgroundState(firstClass, uniqueClass);
        });

        const garbageIcon = blockEl.querySelector('.garbage-icon');
        if (garbageIcon) {
            garbageIcon.addEventListener('click', (ev) => {
                ev.stopPropagation();
                console.log("Garbage icon clicked for block:", blockEl);
                deleteCustomHTMLServer(blockEl);
            });
        }
    });
}


loadServerBlocksIntoPreviewContentData();
initServerBlocks();



function showServerBlocksFor(selectedKey) {
    const normSelected = selectedKey.trim();
    console.log("Showing blocks for key:", normSelected);
    document.querySelectorAll('.server-block').forEach(blockEl => {
        const blockKey = (blockEl.getAttribute('data-first-class') || "").trim();
        console.log("Block:", blockEl, "has key:", blockKey);
        if (blockKey.toLowerCase() === normSelected) {
            blockEl.style.display = 'block';
        } else {
            blockEl.style.display = 'none';
        }
    });
}

function setActiveBackgroundState(firstClass, uniqueClass) {
    firstClass = firstClass.trim();
    uniqueClass = uniqueClass.trim();
    const blocks = previewContentData[firstClass] || [];
    const block = blocks.find(b => b.uniqueClass === uniqueClass);
    if (!block) {
        console.warn("No block found for", firstClass, uniqueClass);
        return;
    }

    if (!block.activeButton) {
        block.activeButton = 'bg-setting1';
    }

    document.querySelectorAll('.bg-btn').forEach(btn => btn.classList.remove('active'));

    if (block.activeButton) {
        const btnToActivate = document.querySelector(`.${block.activeButton}`);
        if (btnToActivate) {
            btnToActivate.classList.add('active');
        }
    }

    if (block.activeButton === 'bg-setting1') {
        restoreImageStateFromData(block);
    } else if (block.activeButton === 'bg-setting2') {
        restoreGradientStateFromData(block);
    } else if (block.activeButton === 'bg-setting3') {
        restoreRadialStateFromData(block);
    } else if (block.activeButton === 'bg-setting4') {
        restoreSolidColorStateFromData(block);
    }

    if (firstClass && block.backgroundImage) {
        updateCssForClass(firstClass, 'background-image', block.backgroundImage);
    }

    if (block.activeButton === 'bg-setting1' && block.backgroundImage) {
        let url = block.backgroundImage;
        if (url.startsWith("url(") && url.endsWith(")")) {
            url = url.slice(4, -1);
        }
        const imageDisplayEl = document.querySelector('.image-database-change');
        if (imageDisplayEl) {
            imageDisplayEl.src = url;
        }
    }

    const panelSelector = '.' + block.activeButton;
    if (bgSettings[panelSelector]) {
        toggleNone(bgSettings[panelSelector]);
    }
}

function restoreImageStateFromData(block) {
    const url = block.background_url;
    if (!url) {
        /* console.warn("restoreImageStateFromData: No background_url found for block", block); */
        return;
    }
    /* console.log("[restoreImageStateFromData] Restoring image background:", url); */

    if (block.firstClass) {
        updateCssForClass(block.firstClass, 'background-image', url);
    }


    let extractedUrl = url;
    if (extractedUrl.startsWith("url(") && extractedUrl.endsWith(")")) {
        extractedUrl = extractedUrl.slice(4, -1);
    }

    const imageDisplayEl = document.querySelector('.image-database-change');
    if (imageDisplayEl) {
        imageDisplayEl.src = extractedUrl;
    }
}

function deleteCustomHTMLServer(customDiv) {
    const blockId = customDiv.getAttribute('data-block-id');
    const firstClass = customDiv.getAttribute('data-first-class');
    const uniqueClass = customDiv.getAttribute('data-unique-class');


    removeCssPropertyFromClass(firstClass, 'background-image');

    updateCssForClass(firstClass, 'background-image', 'none');

    if (previewContentData && previewContentData[firstClass]) {
        previewContentData[firstClass] = previewContentData[firstClass].filter(block => block.uniqueClass !== uniqueClass);
    }

    if (!blockId) {
        /* console.warn("No data-block-id found on customDiv. Removing locally only."); */
        customDiv.remove();
        return;
    }

    fetch(`/blocks/${blockId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                customDiv.remove();
                console.log("Block deleted on server and removed from DOM.");
            } else {
                console.error("Failed to delete block from server.");
            }
        })
        .catch(err => console.error("Error deleting block:", err));
}


backgroundStyleDiv.addEventListener('click', (event) => {
    event.stopPropagation();
    createNewBackgroundDiv();
});

let activeForimaClass = null;

function handleBackgroundImage(value, input) {
    if (!currentSelectedElement || !activeForimaClass) return;

    const isValid = value.startsWith('linear-gradient(') ||
        value.startsWith('radial-gradient(') ||
        value.startsWith('url(');

    if (!isValid) {
        displayErrorMessage("Invalid background format. Use gradients (linear-gradient(...)) or URLs (url(...))");
        return;
    }

    forimaData[activeForimaClass].backgroundImage = value;

    const firstClass = currentSelectedElement.classList[0];
    if (firstClass) {
        updateCssForClass(firstClass, 'background-image', value);
    }

    rebuildBaseStyles();
}


function updateBlockHeading(block) {
    const typeTextMap = {
        'bg-setting1': 'Image & Gradient',
        'bg-setting2': 'Linear Gradient',
        'bg-setting3': 'Radial Gradient',
        'bg-setting4': 'Solid Color'
    };
    const newHeading = typeTextMap[block.background_type] || 'Unknown Setting';
    const headingEl = block.dom.querySelector('p');
    if (headingEl) {
        headingEl.textContent = newHeading;
    }
}


const bgSetting1 = document.querySelector('.bg-setting1');
const bgSetting2 = document.querySelector('.bg-setting2');
const bgSetting3 = document.querySelector('.bg-setting3');
const bgSetting4 = document.querySelector('.bg-setting4');


const backgroundImage = document.querySelector('.background-image');
const linearGredient = document.querySelector('.linear-gredient');
const radialGredient = document.querySelector('.radial-gredient');
const backgroundColor = document.querySelector('.background-color');
function toggleNone(target) {
    backgroundImage.classList.add('none');
    linearGredient.classList.add('none');
    radialGredient.classList.add('none');
    backgroundColor.classList.add('none');

    target.classList.remove('none');
}

bgSetting1.addEventListener('click', () => toggleNone(backgroundImage));
bgSetting2.addEventListener('click', () => toggleNone(linearGredient));
bgSetting3.addEventListener('click', () => toggleNone(radialGredient));
bgSetting4.addEventListener('click', () => toggleNone(backgroundColor));

const state = {};

document.querySelectorAll('.bg-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
        if (!currentSelectedElement) {
            displayErrorMessage("Please select an element to apply styles.");
            return;
        }

        const elementId = getOrCreateElementId(currentSelectedElement);
        if (!state[elementId]) {
            state[elementId] = { activeButton: null, bgSetting: null };
        }

        const firstClass = (currentSelectedElement.classList[0] || "").trim();
        if (!firstClass) {
            displayErrorMessage("The selected element has no class to apply styles to.");
            return;
        }

        removeCssPropertyFromClass(firstClass, 'background-image');
        const newCss = btn.getAttribute('add-css');
        updateCssForClass(firstClass, 'background-image', newCss);

        const group = btn.closest('.buttons4');
        group.querySelectorAll('.bg-btn').forEach((btn) => btn.classList.remove('active'));
        btn.classList.add('active');

        const btnType = btn.classList[1];
        state[elementId].activeButton = btnType;
        state[elementId].bgSetting = btnType;

        if (activeForimaBlock) {
            activeForimaBlock.background_type = btnType;
            if (btnType === 'bg-setting1') {
                activeForimaBlock.background_url = newCss;

                activeForimaBlock.background_linear = "";
            } else if (btnType === 'bg-setting2') {
                activeForimaBlock.background_url = "";
                activeForimaBlock.background_linear = newCss;
            } else if (btnType === 'bg-setting3') {
                activeForimaBlock.background_radial = newCss;
            } else if (btnType === 'bg-setting4') {
                activeForimaBlock.background_linear_rgba = newCss;
            }

            console.log("Updating block with:", {
                background_type: activeForimaBlock.background_type,
                background_url: activeForimaBlock.background_url,
                background_linear: activeForimaBlock.background_linear,
                background_radial: activeForimaBlock.background_radial,
                background_linear_rgba: activeForimaBlock.background_linear_rgba
            });

            updateBlockHeading(activeForimaBlock);
        }
    });
});

function updateBlockOnServer() {
    if (!activeForimaBlock) {
        displayErrorMessage("No active block to update.");
        return;
    }
    fetch("/blocks/" + activeForimaBlock.id + "/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']").getAttribute("content")
        },
        body: JSON.stringify({
            background_type: activeForimaBlock.background_type,
            background_url: activeForimaBlock.background_url,
            background_linear: activeForimaBlock.background_linear,
            background_radial: activeForimaBlock.background_radial,
            background_linear_rgba: activeForimaBlock.background_linear_rgba
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("Block updated on server:", data.block);
                displaySuccessMessage("Background saved!");
            } else {
                displayErrorMessage("Failed to update block on server.");
            }
        })
        .catch(err => console.error("Error updating block:", err));
}

let unsavedChanges = true;

window.addEventListener('beforeunload', function (e) {
    if (unsavedChanges) {
        const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
});

document.getElementById('saveLayoutBtn').addEventListener('click', function () {
    savePreviewContent();

    updateBlockOnServer();

    unsavedChanges = false;
});


const bgSettings = {
    '.bg-setting1': backgroundImage,
    '.bg-setting2': linearGredient,
    '.bg-setting3': radialGredient,
    '.bg-setting4': backgroundColor,
};


function autoOpenBackgroundPanelForElement(selectedElement) {
    if (!selectedElement) return;
    const elementId = getOrCreateElementId(selectedElement);

    if (previewContentData[elementId] && previewContentData[elementId].length > 0) {
        const block = previewContentData[elementId][0];
        const activeBtnSelector = '.' + block.activeButton;
        if (bgSettings[activeBtnSelector]) {
            toggleNone(bgSettings[activeBtnSelector]);
        }
    }
}

Object.entries(bgSettings).forEach(([selector, target]) => {
    document.querySelector(selector).addEventListener('click', () => {
        if (!currentSelectedElement) {
            displayErrorMessage("Please select an element.");
            return;
        }

        const elementId = getOrCreateElementId(currentSelectedElement);
        if (!state[elementId]) {
            state[elementId] = { activeButton: null, bgSetting: null };
        }

        toggleNone(target);
        state[elementId].bgSetting = selector;
    });
});

function restoreState(forima) {
    const elementId = getOrCreateElementId(forima);

    if (state[elementId]) {
        const activeCss = state[elementId].activeButton;
        if (activeCss) {
            const button = forima.querySelector(`.bg-btn[add-css="${activeCss}"]`);
            if (button) button.classList.add('active');
        }

        const setting = state[elementId].bgSetting;
        if (setting) toggleNone(document.querySelector(setting));
    }
}

document.querySelectorAll('.forima').forEach((forima) => {
    forima.addEventListener('click', () => {
        currentSelectedElement = forima;

        if (currentSelectedElement) saveState(currentSelectedElement);

        restoreState(forima);
    });
});

function saveState(forima) {
    const elementId = getOrCreateElementId(forima);
    if (!state[elementId]) {
        state[elementId] = { activeButton: null, bgSetting: null };
    }

    const activeButton = forima.querySelector('.bg-btn.active');
    if (activeButton) {
        state[elementId].activeButton = activeButton.getAttribute('add-css');
    }
}

let assetSelectionMode = 'default';
function setupAssetSelection() {
    const chooseImageButtons = document.querySelectorAll('.choose-image-db');
    chooseImageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const assetsContainer = document.querySelector('.box-adding-assets');
            if (assetsContainer) {
                assetsContainer.classList.remove('none');
                assetsContainer.classList.add('active');
                /* console.log("Assets container shown and marked active."); */
            }
        });
    });


    const assetItems = document.querySelectorAll('.asset-item');
    assetItems.forEach(item => {
        item.addEventListener('click', () => {

            if (currentSelectedElement && currentSelectedElement.tagName.toLowerCase() === 'video') {
                if (assetSelectionMode === 'default' && item.getAttribute('data-type') !== 'video') {
                    /* console.log("Ignoring non-video asset for video src replacement."); */
                    return;
                }
            }

            const assetImg = item.querySelector('.asset-preview');
            if (!assetImg) return;
            const imageUrl = assetImg.getAttribute('src');
            /*  console.log("Asset clicked, imageUrl:", imageUrl); */

            if (currentSelectedElement) {
                if (currentSelectedElement.tagName.toLowerCase() === 'img') {
                    currentSelectedElement.src = imageUrl;
                    /* console.log("Updated currentSelectedElement <img> src:", imageUrl); */
                } else if (currentSelectedElement.tagName.toLowerCase() === 'video') {
                    if (assetSelectionMode === 'cover') {
                        currentSelectedElement.poster = imageUrl;
                        /* console.log("Updated <video> poster to:", imageUrl); */
                    } else {
                        // In default mode, update the video source.
                        currentSelectedElement.src = imageUrl;
                        const curSource = currentSelectedElement.querySelector('source');
                        if (curSource) {
                            curSource.setAttribute('src', imageUrl);
                            currentSelectedElement.load();
                        }
                        /* console.log("Updated <video> src to:", imageUrl); */
                    }
                } else {
                    const firstClass = currentSelectedElement.classList[0];
                    if (firstClass) {
                        const cssValue = `url(${imageUrl})`;
                        removeCssPropertyFromClass(firstClass, 'background-image');
                        updateCssForClass(firstClass, 'background-image', cssValue);
                        /* console.log("Updated CSS for", firstClass, "with", cssValue); */
                    }
                }
            }


            const assetsContainer = document.querySelector('.box-adding-assets');
            if (assetsContainer) {
                assetsContainer.classList.add('none');
                assetsContainer.classList.remove('active');
                console.log("Assets container hidden after selection.");
            }
        });
    });
}

function fileNameFromUrl(url) {
    if (!url) return "";
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.split('.')[0];
}



document.addEventListener('DOMContentLoaded', () => {
    setupAssetSelection();
});

let backgroundSizeMode = "preset";
function handleBackgroundSizeInput() {

    backgroundSizeMode = "custom";

    if (!currentSelectedElement) {
        displayErrorMessage("No element selected for background-size update.");
        return;
    }
    const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;
    if (!elementId) return;

    const inputX = document.getElementById('backgroundSizeX');
    const inputY = document.getElementById('backgroundSizeY');
    if (!inputX || !inputY) return;


    let rawX = inputX.value.trim();
    let rawY = inputY.value.trim();

    if (!rawX) { rawX = "auto"; }
    if (!rawY) { rawY = "auto"; }

    const unitX = selectedUnits[inputX.id] || "px";
    const unitY = selectedUnits[inputY.id] || "px";

    let finalX = (rawX.toLowerCase() === "auto") ? "auto" :
        /^[0-9.]+$/.test(rawX) ? rawX + unitX : rawX;
    let finalY = (rawY.toLowerCase() === "auto") ? "auto" :
        /^[0-9.]+$/.test(rawY) ? rawY + unitY : rawY;

    const finalValue = `${finalX} ${finalY}`;

    elementUnits[elementId] = elementUnits[elementId] || {};
    elementUnits[elementId]["background-sizeValue"] = finalValue;
    elementUnits[elementId]["background-sizeUnit"] = "";

    console.log(`[handleBackgroundSizeInput] Updated ${elementId} with background-size: ${finalValue}`);
    rebuildBaseStyles();
}

function restoreBackgroundSizeInputs() {
    if (!currentSelectedElement) return;
    const elementId = currentSelectedElement.classList[0] || currentSelectedElement.id;
    if (!elementId) return;

    const bsValue = elementUnits[elementId] && elementUnits[elementId]["background-sizeValue"];
    if (bsValue) {

        const parts = bsValue.split(/\s+/);
        if (parts.length === 2) {
            const inputX = document.getElementById('backgroundSizeX');
            const inputY = document.getElementById('backgroundSizeY');
            if (inputX && inputY) {

                const matchX = parts[0].match(/^([\d.]+)([a-z%]*)$/);
                const matchY = parts[1].match(/^([\d.]+)([a-z%]*)$/);
                if (matchX) {

                    inputX.value = matchX[1];

                    selectedUnits[inputX.id] = matchX[2] || "px";
                }
                if (matchY) {
                    inputY.value = matchY[1];
                    selectedUnits[inputY.id] = matchY[2] || "px";
                }
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const inputX = document.getElementById('backgroundSizeX');
    const inputY = document.getElementById('backgroundSizeY');

    if (inputX) {
        inputX.addEventListener('input', handleBackgroundSizeInput);
    }
    if (inputY) {
        inputY.addEventListener('input', handleBackgroundSizeInput);
    }

    restoreBackgroundSizeInputs();
});


let LinearGradientState = {
    angle: 0,
    positions: { c1: 0, c2: 100 },
    colors: { c1: '#000000', c2: '#ffffff' },
    activeHandle: 'c1',
};

function buildLinearGradientString(state) {
    return `linear-gradient(${state.angle}deg, 
      ${state.colors.c1} ${state.positions.c1}%, 
      ${state.colors.c2} ${state.positions.c2}%
    )`;
}




function initGradientHandles() {
    /* console.log("[DEBUG] initGradientHandles called. positions:", LinearGradientState.positions,
        "activeHandle:", LinearGradientState.activeHandle); */

    const val = Math.round(LinearGradientState.positions[LinearGradientState.activeHandle]);
    /* console.log("[DEBUG] Setting linear-back-forwards to:", val); */

    const inputRef = document.querySelector('.linear-back-forwards');
    if (!inputRef) {
        /* console.warn("No .linear-back-forwards found!"); */
        return;
    }
    inputRef.value = val;
    /* console.log("[DEBUG] After setting, inputRef.value is:", inputRef.value); */

    document.querySelector('.linear-back-forwards').value =
        Math.round(LinearGradientState.positions[LinearGradientState.activeHandle]);

    document.querySelector('.gredient-c1').style.backgroundColor = LinearGradientState.colors.c1;
    document.querySelector('.gredient-c2').style.backgroundColor = LinearGradientState.colors.c2;
    updateHandlePositions();
    updateActiveBorder();
}


function updateGradient() {

    document.querySelector('.gredient-c1').style.backgroundColor = LinearGradientState.colors.c1;
    document.querySelector('.gredient-c2').style.backgroundColor = LinearGradientState.colors.c2;

    document.querySelector('.line-gredient').style.background = `
        linear-gradient(to right, 
            ${LinearGradientState.colors.c1} ${LinearGradientState.positions.c1}%, 
            ${LinearGradientState.colors.c2} ${LinearGradientState.positions.c2}%
        )`;

    const gradient = `linear-gradient(${LinearGradientState.angle}deg, ${LinearGradientState.colors.c1} ${LinearGradientState.positions.c1}%, ${LinearGradientState.colors.c2} ${LinearGradientState.positions.c2}%)`;

    const activeBtn = document.querySelector('.bg-btn.active');
    if (activeBtn) {
        activeBtn.setAttribute('add-css', gradient);
        activeBtn.dispatchEvent(new Event('click'));
    }

    document.querySelector('.linear-deg').value = LinearGradientState.angle;

    document.querySelector('.linear-back-forwards').value =
        Math.round(LinearGradientState.positions[LinearGradientState.activeHandle]);

}


document.querySelectorAll('.btn-rotate-left, .btn-rotate-right').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const isLeft = e.currentTarget.classList.contains('btn-rotate-left');
        LinearGradientState.angle = (LinearGradientState.angle + (isLeft ? -45 : 45) + 360) % 360;
        document.querySelector('.linear-deg').value = LinearGradientState.angle;
        updateGradient();
    });
});

document.querySelector('.linear-deg').addEventListener('input', (e) => {
    LinearGradientState.angle = Math.min(360, Math.max(0, parseInt(e.target.value) || 0));
    updateGradient();
});


document.querySelectorAll('.gredient-c1, .gredient-c2').forEach(stop => {
    stop.addEventListener('mousedown', (e) => {
        isDragging = true;
        LinearGradientState.activeHandle = e.target.classList.contains('gredient-c1') ? 'c1' : 'c2';
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.removeEventListener('mousemove', handleDrag);
        });
        updateActiveBorder();
    });
});

function handleDrag(e) {
    if (!isDragging) return;

    const line = document.querySelector('.line-gredient');
    const rect = line.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (LinearGradientState.activeHandle === 'c1') {
        LinearGradientState.positions.c1 = Math.min(percentage, LinearGradientState.positions.c2);
    } else {
        LinearGradientState.positions.c2 = Math.max(percentage, LinearGradientState.positions.c1);
    }

    updateHandlePositions();
    updateGradient();
}

document.querySelector('.btn-reverse-linear').addEventListener('click', () => {

    [LinearGradientState.colors.c1, LinearGradientState.colors.c2] =
        [LinearGradientState.colors.c2, LinearGradientState.colors.c1];


    document.querySelector('.linear-back-forwards').value =
        Math.round(LinearGradientState.positions[LinearGradientState.activeHandle]);


    updateHandlePositions();
    updateGradient();
});


document.querySelector('.linear-back-forwards').addEventListener('input', (e) => {
    const value = Math.min(100, Math.max(0, Math.round(parseFloat(e.target.value)) || 0));
    LinearGradientState.positions[LinearGradientState.activeHandle] = value;


    if (LinearGradientState.activeHandle === 'c1') {
        LinearGradientState.positions.c1 = Math.min(value, LinearGradientState.positions.c2);
    } else {
        LinearGradientState.positions.c2 = Math.max(value, LinearGradientState.positions.c1);
    }

    updateHandlePositions();
    updateGradient();
});


document.getElementById('linear-gredient-color').addEventListener('input', (e) => {
    LinearGradientState.colors[LinearGradientState.activeHandle] = e.target.value;
    updateGradient();
});


document.querySelector('.linear-back-forwards').addEventListener('input', (e) => {
    const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    LinearGradientState.positions[LinearGradientState.activeHandle] = value;
    updateHandlePositions();
    updateGradient();
});



function updateHandlePositions() {
    document.querySelector('.gredient-c1').style.left = `${LinearGradientState.positions.c1}%`;
    document.querySelector('.gredient-c2').style.left = `${LinearGradientState.positions.c2}%`;
}

function updateActiveBorder() {

    document.querySelectorAll('.gredient-c1, .gredient-c2').forEach(handle => {
        const isActive = handle.classList.contains(`gredient-${LinearGradientState.activeHandle}`);
        handle.style.borderColor = isActive ? '#fff' : '#878787';
    });

    document.getElementById('linear-gredient-color').value =
        LinearGradientState.colors[LinearGradientState.activeHandle];
}


initGradientHandles();



function resetGradientToDefaults() {
    LinearGradientState.angle = 0;
    LinearGradientState.colors = { c1: '#000000', c2: '#ffffff' };
    LinearGradientState.positions = { c1: 0, c2: 100 };
    LinearGradientState.activeHandle = 'c1';
    console.log("[DEBUG] Reset gradientState to defaults:", LinearGradientState);
    initGradientHandles();
}


function restoreGradientStateFromData(block) {
    const gradientString = block.background_linear || block.backgroundImage;
    if (!gradientString) {
        resetGradientToDefaults();
        return;
    }

    const gradientData = parseLinearGradient(gradientString);
    if (!gradientData) {
        /* console.warn("[restoreGradientStateFromData] Unable to parse gradient string:", gradientString); */
        resetGradientToDefaults();
        return;
    }

    LinearGradientState = {
        angle: gradientData.angle,
        colors: gradientData.colors,
        positions: gradientData.positions,
        activeHandle: 'c1'
    };

    /* console.log("[DEBUG] Restored LinearGradientState:", LinearGradientState); */

    initGradientHandles();
    updateGradient();

    if (block.firstClass) {
        updateCssForClass(block.firstClass, 'background-image', gradientString);
    }
}



let radialGradientState = {
    activeHandle: 'c1',
    colors: {
        c1: '#000000',
        c2: '#ffffff'
    },
    positions: {
        c1: 0,
        c2: 100
    }
};

function rebuildRadialBackground() {
    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (!elementId) return;

    const props = elementUnits[elementId] || {};

    const leftValue = props['background-radial-leftValue'] || 50;
    const leftUnit = props['background-radial-leftUnit'] || '%';
    const topValue = props['background-radial-topValue'] || 50;
    const topUnit = props['background-radial-topUnit'] || '%';

    const c1Pos = radialGradientState.positions.c1;
    const c2Pos = radialGradientState.positions.c2;
    const c1Color = radialGradientState.colors.c1;
    const c2Color = radialGradientState.colors.c2;


    const gradientStr = `radial-gradient(circle at ${leftValue}${leftUnit} ${topValue}${topUnit}, 
        ${c1Color} ${c1Pos}%, 
        ${c2Color} ${c2Pos}%)`;


    props["background-image"] = gradientStr;

    if (activeForimaBlock) {
        activeForimaBlock.background_radial = gradientStr;
    }


    rebuildBaseStyles();
}


function initRadialGradientHandles() {

    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    const props = elementUnits[elementId] || {};
    const leftValue = props['background-radial-leftValue'] || 50;
    const leftUnit = props['background-radial-leftUnit'] || '%';
    const topValue = props['background-radial-topValue'] || 50;
    const topUnit = props['background-radial-topUnit'] || '%';

    const leftInput = document.getElementById('backgroundRadialLeft');
    if (leftInput) leftInput.value = leftValue;

    const topInput = document.getElementById('backgroundRadialTop');
    if (topInput) topInput.value = topValue;


    const leftUnitEl = document.getElementById('backgroundRadialLeftUnit');
    if (leftUnitEl) leftUnitEl.value = leftUnit;

    const topUnitEl = document.getElementById('backgroundRadialTopUnit');
    if (topUnitEl) topUnitEl.value = topUnit;

    const stopInput = document.querySelector('.radial-back-forwards');
    if (stopInput) {
        stopInput.value = Math.round(radialGradientState.positions[radialGradientState.activeHandle]);
    }

    updateRadialHandlePositions();
    updateActiveRadialBorder();
}

function updateRadialGradient() {

    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    const props = elementUnits[elementId] || {};

    const left = (props['background-radial-leftValue'] || 50) + (props['background-radial-leftUnit'] || '%');
    const top = (props['background-radial-topValue'] || 50) + (props['background-radial-topUnit'] || '%');


    document.querySelector('.radial-line-gredient').style.background = `
        radial-gradient(
            circle at ${left} ${top},
            ${radialGradientState.colors.c1} ${radialGradientState.positions.c1}%,
            ${radialGradientState.colors.c2} ${radialGradientState.positions.c2}%
        )`;

    const activeBtn = document.querySelector('.bg-btn.active');
    if (activeBtn) {
        activeBtn.setAttribute('add-css', `
            radial-gradient(
                circle at ${left} ${top},
                ${radialGradientState.colors.c1} ${radialGradientState.positions.c1}%,
                ${radialGradientState.colors.c2} ${radialGradientState.positions.c2}%
            )`.replace(/\n/g, '').replace(/\s{2,}/g, ' ')
        );
    }

    document.querySelector('.radial-back-forwards').value =
        Math.round(radialGradientState.positions[radialGradientState.activeHandle]);

    rebuildRadialBackground();
}


document.querySelectorAll('.radial-gredient-c1, .radial-gredient-c2').forEach(stop => {
    stop.addEventListener('mousedown', (e) => {
        isDragging = true;
        radialGradientState.activeHandle = e.target.classList.contains('radial-gredient-c1') ? 'c1' : 'c2';
        document.addEventListener('mousemove', handleRadialDrag);
        document.addEventListener('mouseup', stopRadialDrag);
        updateActiveRadialBorder();
    });
});

function handleRadialDrag(e) {
    if (!isDragging) return;

    const line = document.querySelector('.radial-line-gredient');
    const rect = line.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (radialGradientState.activeHandle === 'c1') {
        radialGradientState.positions.c1 = Math.min(percentage, radialGradientState.positions.c2);
    } else {
        radialGradientState.positions.c2 = Math.max(percentage, radialGradientState.positions.c1);
    }

    updateRadialHandlePositions();
    updateRadialGradient();
}

function stopRadialDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', handleRadialDrag);
    document.removeEventListener('mouseup', stopRadialDrag);
}

document.querySelector('.btn-reverse-radial').addEventListener('click', () => {

    [radialGradientState.colors.c1, radialGradientState.colors.c2] =
        [radialGradientState.colors.c2, radialGradientState.colors.c1];


    document.querySelector('.radial-back-forwards').value =
        Math.round(radialGradientState.positions[radialGradientState.activeHandle]);

    updateRadialHandlePositions();
    updateRadialGradient();
});


document.querySelector('.radial-back-forwards').addEventListener('input', (e) => {
    const value = Math.min(100, Math.max(0, Math.round(parseFloat(e.target.value)) || 0));
    radialGradientState.positions[radialGradientState.activeHandle] = value;

    if (radialGradientState.activeHandle === 'c1') {
        radialGradientState.positions.c1 = Math.min(value, radialGradientState.positions.c2);
    } else {
        radialGradientState.positions.c2 = Math.max(value, radialGradientState.positions.c1);
    }

    updateRadialHandlePositions();
    updateRadialGradient();
});


document.getElementById('radial-gredient-color').addEventListener('input', (e) => {
    radialGradientState.colors[radialGradientState.activeHandle] = e.target.value;
    updateRadialGradient();
});


function updateRadialHandlePositions() {
    document.querySelector('.radial-gredient-c1').style.left = `${radialGradientState.positions.c1}%`;
    document.querySelector('.radial-gredient-c2').style.left = `${radialGradientState.positions.c2}%`;
}

function updateActiveRadialBorder() {
    document.querySelectorAll('.radial-gredient-c1, .radial-gredient-c2').forEach(handle => {
        handle.style.borderColor = handle.classList.contains(`radial-gredient-${radialGradientState.activeHandle}`)
            ? '#fff'
            : '#878787';
    });

    document.getElementById('radial-gredient-color').value =
        radialGradientState.colors[radialGradientState.activeHandle];
}


initRadialGradientHandles();



function parseRadialGradient(gradientString) {

    let cleaned = gradientString.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim();


    const regex = /radial-gradient\(\s*circle\s+at\s+([\d.]+)(px|%|em|rem)\s+([\d.]+)(px|%|em|rem),\s*([#a-fA-F0-9]{3,9})\s+([\d.]+)%\s*,\s*([#a-fA-F0-9]{3,9})\s+([\d.]+)%\s*\)/i;
    const match = cleaned.match(regex);

    if (!match) {
        /* console.error("Invalid gradient string:", gradientString); */
        return null;
    }

    return {
        center: {
            left: { value: parseFloat(match[1]), unit: match[2] },
            top: { value: parseFloat(match[3]), unit: match[4] }
        },
        colors: {
            c1: match[5],
            c2: match[7]
        },
        positions: {
            c1: parseFloat(match[6]),
            c2: parseFloat(match[8])
        }
    };
}





function resetRadialToDefaults() {
    radialGradientState.activeHandle = 'c1';
    radialGradientState.colors = { c1: '#000000', c2: '#ffffff' };
    radialGradientState.positions = { c1: 0, c2: 100 };

    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (elementId) {
        elementUnits[elementId] = {
            'background-radial-leftValue': 50,
            'background-radial-leftUnit': '%',
            'background-radial-topValue': 50,
            'background-radial-topUnit': '%'
        };
    }

    console.log("[DEBUG] Reset radialGradientState to defaults:", radialGradientState);
    initRadialGradientHandles();
    updateRadialGradient();
}


function restoreRadialStateFromData(block) {
    const gradientString = block.background_radial || block.backgroundImage;
    if (!gradientString) {
        resetRadialToDefaults();
        return;
    }

    const parsed = parseRadialGradient(gradientString);
    if (!parsed) {
        resetRadialToDefaults();
        return;
    }

    const elementId = currentSelectedElement?.classList[0] || currentSelectedElement?.id;
    if (elementId) {
        elementUnits[elementId] = {
            'background-radial-leftValue': parsed.center.left.value,
            'background-radial-leftUnit': parsed.center.left.unit,
            'background-radial-topValue': parsed.center.top.value,
            'background-radial-topUnit': parsed.center.top.unit
        };
    }

    radialGradientState = {
        activeHandle: 'c1',
        colors: {
            c1: parsed.colors.c1,
            c2: parsed.colors.c2
        },
        positions: {
            c1: parsed.positions.c1,
            c2: parsed.positions.c2
        }
    };

    initRadialGradientHandles();
    updateRadialGradient();
    rebuildRadialBackground();
}




function parseLinearGradient(gradientString) {
    const cleaned = gradientString.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim();

    if (!cleaned.toLowerCase().startsWith("linear-gradient(")) {
        /* console.error("Invalid gradient string (not linear):", gradientString); */
        return null;
    }

    const regex = /linear-gradient\(\s*([\d.]+)deg\s*,\s*([#a-fA-F0-9]{3,7})\s+([\d.]+)%\s*,\s*([#a-fA-F0-9]{3,7})\s+([\d.]+)%\s*\)/i;
    const match = cleaned.match(regex);

    if (!match) {
        /* console.error("Invalid gradient string:", gradientString); */
        return null;
    }

    return {
        angle: parseInt(match[1], 10),
        colors: { c1: match[2], c2: match[4] },
        positions: { c1: parseFloat(match[3]), c2: parseFloat(match[5]) }
    };
}







function restoreRadialGradientStateFromData(block) {
    const savedData = block.radialGradientState;
    if (!savedData) return;

    console.log("[DEBUG] Restoring radial gradient state from block:", block);


    if (typeof savedData.colors !== 'object' || typeof savedData.positions !== 'object') {
        console.error("[ERROR] Invalid radialGradientState structure:", savedData);
        return;
    }

    radialGradientState.activeHandle = savedData.activeHandle || 'c1';
    radialGradientState.colors = savedData.colors || { c1: '#000000', c2: '#ffffff' };
    radialGradientState.positions = savedData.positions || { c1: 0, c2: 100 };

    console.log("[DEBUG] Restored radialGradientState:", radialGradientState);


    initRadialGradientHandles();
    updateRadialGradient();

    if (block.firstClass) {
        const radialGradientStr = buildRadialGradientString(radialGradientState);
        updateCssForClass(block.firstClass, 'background-image', radialGradientStr);
    }
}


function resetRadialGradientToDefaults() {
    radialGradientState.activeHandle = 'c1';
    radialGradientState.colors = { c1: '#000000', c2: '#ffffff' };
    radialGradientState.positions = { c1: 0, c2: 100 };
    console.log("[DEBUG] Reset radialGradientState to defaults:", radialGradientState);

    initRadialGradientHandles();
    updateRadialGradient();
}


let backgroundColorGradientState = {
    color1: 'rgba(0, 0, 0, 0.5)',
    color2: 'rgba(0, 0, 0, 0.5)'
};

function hexToRgba(hex, opacity) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
        : 'rgba(0, 0, 0, 0.5)';
}

function rgbaToHex(rgba) {
    const parts = rgba.replace(/^rgba?\(|\)$/g, "").split(",");
    if (parts.length < 3) return "#000000";
    let r = parseInt(parts[0].trim()).toString(16);
    let g = parseInt(parts[1].trim()).toString(16);
    let b = parseInt(parts[2].trim()).toString(16);
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;
    return "#" + r + g + b;
}

function updateBackgroundColorGradient() {
    const { color1, color2 } = backgroundColorGradientState;
    console.log("Updated Gradient Colors:", color1, color2);

    const previewElement = document.querySelector('.currentSelectedElement');
    if (previewElement) {
        previewElement.style.backgroundImage = `linear-gradient(${color1}, ${color2})`;
    }

    const activeBtn = document.querySelector('.bg-btn.active');
    if (activeBtn) {
        const gradientStr = `linear-gradient(${color1}, ${color2})`;
        activeBtn.setAttribute('add-css', gradientStr);
    }

    if (activeForimaBlock) {
        activeForimaBlock.background_linear_rgba = `linear-gradient(${color1}, ${color2})`;
        console.log("Active block background_linear_rgba updated:", activeForimaBlock.background_linear_rgba);
    }

    const colorInput = document.getElementById('backgroundImageColor');
    if (colorInput) {
        colorInput.value = rgbaToHex(color1);
    }
    const hexInput = document.getElementById('backgroundImageColoHex');
    if (hexInput) {
        hexInput.value = rgbaToHex(color1);
    }
}

document.getElementById('backgroundImageColor').addEventListener('input', (e) => {
    const selectedColor = e.target.value;
    const opacity = 0.5;
    const rgbaColor = hexToRgba(selectedColor, opacity);

    backgroundColorGradientState.color1 = rgbaColor;
    backgroundColorGradientState.color2 = rgbaColor;
    document.getElementById('backgroundImageColoHex').value = selectedColor;
    updateBackgroundColorGradient();

    if (currentSelectedElement) {
        const firstClass = currentSelectedElement.classList[0];
        if (firstClass) {
            const activeBtn = document.querySelector('.bg-btn.active');
            if (activeBtn) {
                const newCss = activeBtn.getAttribute('add-css');
                removeCssPropertyFromClass(firstClass, 'background-image');
                updateCssForClass(firstClass, 'background-image', newCss);
            }
        }
    }
});


document.getElementById('backgroundImageColoHex').addEventListener('input', (e) => {
    const enteredHex = e.target.value;
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexPattern.test(enteredHex)) return;

    document.getElementById('backgroundImageColor').value = enteredHex;
    const opacity = 0.5;
    const rgbaColor = hexToRgba(enteredHex, opacity);
    backgroundColorGradientState.color1 = rgbaColor;
    backgroundColorGradientState.color2 = rgbaColor;
    updateBackgroundColorGradient();
});


function initBackgroundColorMenu() {
    const initialColor = '#000000';
    document.getElementById('backgroundImageColor').value = initialColor;
    document.getElementById('backgroundImageColoHex').value = initialColor;
    backgroundColorGradientState.color1 = hexToRgba(initialColor, 0.5);
    backgroundColorGradientState.color2 = hexToRgba(initialColor, 0.5);
    console.log("Initialized Gradient Colors:", backgroundColorGradientState.color1, backgroundColorGradientState.color2);
    updateBackgroundColorGradient();
}


document.querySelector('.bg-setting4').addEventListener('click', () => {
    toggleNone(backgroundColor);
    initBackgroundColorMenu();
});



function restoreSolidColorStateFromData(block) {

    const gradientString = block.background_linear_rgba;
    if (!gradientString) {
        console.warn("[restoreSolidColorStateFromData] No solid color gradient string found for block", block);
        return;
    }
    console.log("[DEBUG] Restoring solid color state from data:", gradientString);


    if (block.firstClass) {
        updateCssForClass(block.firstClass, 'background-image', gradientString);
    }

    const imageDisplayEl = document.querySelector('.image-database-change');
    if (imageDisplayEl) {
        imageDisplayEl.style.backgroundImage = gradientString;
    }


    const rgbaMatch = gradientString.match(/rgba\((\d+,\s*\d+,\s*\d+,\s*[\d.]+)\)/i);
    if (rgbaMatch) {
        const rgbaValue = `rgba(${rgbaMatch[1]})`;
        console.log("[DEBUG] Extracted RGBA value:", rgbaValue);
        const hexValue = rgbaToHex(rgbaValue);
        console.log("[DEBUG] Converted RGBA to hex:", hexValue);
        const colorInput = document.getElementById('backgroundImageColor');
        const hexInput = document.getElementById('backgroundImageColoHex');
        if (colorInput) {
            colorInput.value = hexValue;
        }
        if (hexInput) {
            hexInput.value = hexValue;
        }
    } else {
        console.warn("[restoreSolidColorStateFromData] Unable to extract RGBA from gradient string:", gradientString);
    }
}

let currentSelectedShadowIndex = 0;

let isManagingInside = false;

function captureBoxShadowState() {
    return {
        elementId: getElementIdentifierFirstClass(currentSelectedElement),
        outside: [...outsideBoxShadowList],
        inside: [...insideBoxShadowList],
        managingInside: isManagingInside
    };
}

function applyBoxShadowState(state) {
    const elementData = elementBoxShadowData.get(state.elementId) || {
        outsideBoxShadowList: [],
        insideBoxShadowList: []
    };

    elementData.outsideBoxShadowList = [...state.outside];
    elementData.insideBoxShadowList = [...state.inside];
    elementBoxShadowData.set(state.elementId, elementData);

    isManagingInside = state.managingInside;
    loadShadowsForElement(state.elementId);
    toggleBoxShadowLists();
    updateBoxShadowCSS();
}

document.querySelector('.box-shadow-create').addEventListener('click', () => {
    const prevState = captureBoxShadowState();
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);

    // Get existing data or initialize if none exists.
    const elementData = elementBoxShadowData.get(elementId) || {
        outsideBoxShadowList: [],
        insideBoxShadowList: []
    };

    // Create a new shadow object with default values.
    const newShadow = {
        horizontal: 0,
        vertical: 0,
        blur: 0,
        color: '#000000',
        inset: isManagingInside
    };

    // Push new shadow into the appropriate list.
    if (isManagingInside) {
        elementData.insideBoxShadowList.push(newShadow);
    } else {
        elementData.outsideBoxShadowList.push(newShadow);
    }

    // Update the Map.
    elementBoxShadowData.set(elementId, elementData);

    // Refresh the UI for this element.
    loadShadowsForElement(elementId);

    // Optionally, select the new shadow (if needed).
    const newIndex = (isManagingInside ? insideBoxShadowList : outsideBoxShadowList).length - 1;
    selectBoxShadow(newIndex, isManagingInside);

    // Track change
    trackChange({
        undo: () => applyBoxShadowState(prevState),
        do: () => applyBoxShadowState(captureBoxShadowState())
    });
});




// Modify saveBoxShadowData
function saveBoxShadowData() {
    if (!currentSelectedElement) return;
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);

    // Store current lists for the element
    elementBoxShadowData.set(elementId, {
        outsideBoxShadowList: [...outsideBoxShadowList],
        insideBoxShadowList: [...insideBoxShadowList]
    });
}
// Replace getElementIdentifierFirstClass with this
function getElementIdentifierFirstClass(element) {
    // 1. Prefer ID if exists
    if (element.id) return element.id;

    // 2. Look for permanent class (class starting with "perm-")
    const permClass = [...element.classList].find(c => c.startsWith('perm-'));
    if (permClass) return permClass;

    // 3. Fallback to first class or generate ID
    return element.classList[0] || `element-${Date.now()}`;
}
function getElementIdentifier(element) {
    return element.id || `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function selectBoxShadow(index, isInside) {
    const targetList = isInside ? insideBoxShadowList : outsideBoxShadowList;
    const selectedShadow = targetList[index];
    if (!selectedShadow) return;
    currentSelectedShadowIndex = index;
    isManagingInside = isInside;

    // Populate your UI input fields with the selected shadow’s values.
    document.getElementById('horizontal-offset').value = selectedShadow.horizontal;
    document.getElementById('vertical-offset').value = selectedShadow.vertical;
    document.getElementById('blur-radius').value = selectedShadow.blur;
    document.getElementById('shadow-color').value = selectedShadow.color;
}



function refreshBoxShadowIndices(shadowList, containerId) {
    // Rebuild the UI for the shadow list after deletion.
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
        shadowList.forEach((shadow, idx) => {
            addBoxShadowToUI(container, shadow, idx, containerId === 'inside-box-shadow-list');
        });
    }
}

function deleteBoxShadow(index, isInside) {
    const prevState = captureBoxShadowState();
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);
    const elementData = elementBoxShadowData.get(elementId) || {
        outsideBoxShadowList: [],
        insideBoxShadowList: []
    };

    const targetList = isInside ?
        elementData.insideBoxShadowList :
        elementData.outsideBoxShadowList;

    targetList.splice(index, 1);
    elementBoxShadowData.set(elementId, elementData);


    loadShadowsForElement(elementId);
    toggleBoxShadowLists();


    trackChange({
        undo: () => applyBoxShadowState(prevState),
        do: () => applyBoxShadowState(captureBoxShadowState())
    });

}

function updateBoxShadowCSS() {
    if (!currentSelectedElement) return;
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);


    const boxData = elementBoxShadowData.get(elementId) || {
        outsideBoxShadowList: [],
        insideBoxShadowList: []
    };


    const outsideShadows = boxData.outsideBoxShadowList.map(shadow => {
        return `${shadow.inset ? 'inset ' : ''}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
    });
    const insideShadows = boxData.insideBoxShadowList.map(shadow => {
        return `${shadow.inset ? 'inset ' : ''}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
    });
    const combinedBoxShadow = outsideShadows.concat(insideShadows).join(", ");


    const cls = currentSelectedElement.classList[0];
    if (!elementUnits[cls]) {
        elementUnits[cls] = {};
    }

    if (combinedBoxShadow) {
        elementUnits[cls]['box-shadow'] = combinedBoxShadow;
    } else {
        delete elementUnits[cls]['box-shadow'];
    }
    console.log(`[updateBoxShadowCSS] Setting ${cls} box-shadow to: ${combinedBoxShadow}`);

    rebuildBaseStyles();

    elementBoxShadowData.set(elementId, {
        outsideBoxShadowList: [...outsideBoxShadowList],
        insideBoxShadowList: [...insideBoxShadowList]
    });
}


document.querySelectorAll('[add-css^="box-shadow"]').forEach((input) => {
    input.addEventListener('input', () => {
        const prevState = captureBoxShadowState();
        const prevValue = input.value;
        if (!currentSelectedElement) return;

        if (currentSelectedShadowIndex === -1) {
            selectBoxShadow(0, isManagingInside);
        }


        const addCssValue = input.getAttribute('add-css').replace(/\d+$/, '');

        if (addCssValue === 'box-shadow') {
            const targetList = isManagingInside ? insideBoxShadowList : outsideBoxShadowList;
            const currentShadow = targetList[currentSelectedShadowIndex];

            if (!currentShadow) return;


            if (input.id === 'horizontal-offset') currentShadow.horizontal = parseInt(input.value) || 0;
            if (input.id === 'vertical-offset') currentShadow.vertical = parseInt(input.value) || 0;
            if (input.id === 'blur-radius') currentShadow.blur = parseInt(input.value) || 0;
            if (input.id === 'shadow-color') currentShadow.color = input.value;


            const containerId = isManagingInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list';
            const container = document.getElementById(containerId);
            const item = container.querySelector(`[data-index="${currentSelectedShadowIndex}"]`);
            if (item) {
                item.querySelector('.box-shadow-value').textContent =
                    `${currentShadow.inset ? 'inset ' : ''}${currentShadow.horizontal}px ${currentShadow.vertical}px ${currentShadow.blur}px ${currentShadow.color}`;
            }

            updateBoxShadowCSS();
            saveBoxShadowData();

            trackChange({
                undo: () => {
                    applyBoxShadowState(prevState);
                    input.value = prevValue;
                },
                do: () => {
                    applyBoxShadowState(captureBoxShadowState());
                    input.value = currentShadow?.[input.id.split('-')[0]] || prevValue;
                }
            });
        }
    });
});


document.querySelectorAll('.boxShadow-btn div').forEach(btn => {
    btn.addEventListener('click', () => {
        const prevState = captureBoxShadowState();
        document.querySelector('.boxShadow-btn .active').classList.remove('active');
        btn.classList.add('active');

        isManagingInside = btn.classList.contains('btn-bx-inside');
        toggleBoxShadowLists();


        trackChange({
            undo: () => applyBoxShadowState(prevState),
            do: () => applyBoxShadowState(captureBoxShadowState())
        });
    });
});

function toggleBoxShadowLists() {

    document.getElementById('outside-box-shadow-list').style.display =
        isManagingInside ? 'none' : 'block';
    document.getElementById('inside-box-shadow-list').style.display =
        isManagingInside ? 'block' : 'none';


    currentSelectedShadowIndex = -1;
    document.getElementById('horizontal-offset').value = '';
    document.getElementById('vertical-offset').value = '';
    document.getElementById('blur-radius').value = '';
    document.getElementById('shadow-color').value = '';
}

function loadBoxShadowData() {
    if (!currentSelectedElement) return;

    const boxShadowData = elementBoxShadowData.get(currentSelectedElement);

    // Clear current lists
    insideBoxShadowList.splice(0, insideBoxShadowList.length);
    outsideBoxShadowList.splice(0, outsideBoxShadowList.length);

    if (boxShadowData) {
        insideBoxShadowList.push(...boxShadowData.insideBoxShadowList);
        outsideBoxShadowList.push(...boxShadowData.outsideBoxShadowList);
    }

    refreshBoxShadowUI();
}



function refreshBoxShadowUI() {
    const insideContainer = document.getElementById('inside-box-shadow-list');
    const outsideContainer = document.getElementById('outside-box-shadow-list');

    if (insideContainer) insideContainer.innerHTML = '';
    if (outsideContainer) outsideContainer.innerHTML = '';

    // For each shadow in the global arrays, add a UI item.
    outsideBoxShadowList.forEach((shadow, index) => {
        addBoxShadowToUI(outsideContainer, shadow, index, false);
    });
    insideBoxShadowList.forEach((shadow, index) => {
        addBoxShadowToUI(insideContainer, shadow, index, true);
    });
}

function addBoxShadowToUI(container, shadow, index, isInside) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'box-shadow-item';
    itemDiv.dataset.index = index;

    const insetText = shadow.inset ? 'inset ' : '';
    const shadowCss = `${insetText}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;

    itemDiv.innerHTML = `
        <div class="flex-sb-align m-tb-10 gap10 b-2">
            <div class="flex-col gap10">
                <p>Box Shadow ${index + 1}</p>
                <p class="box-shadow-value" style="color: white;">${shadowCss}</p>
            </div>
            <img class="small-img delete-box-shadow" src="/Icon/garbage.png" alt="Delete">
        </div>
    `;

    itemDiv.addEventListener('click', () => {
        selectBoxShadow(index, isInside);
    });


    const delIcon = itemDiv.querySelector('.delete-box-shadow');
    if (delIcon) {
        delIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBoxShadow(index, isInside);
            itemDiv.remove();
            refreshBoxShadowIndices(isInside ? insideBoxShadowList : outsideBoxShadowList,
                isInside ? 'inside-box-shadow-list' : 'outside-box-shadow-list');
        });
    }

    container.appendChild(itemDiv);
}


function restoreBoxShadowsFromData(boxShadowData) {
    elementBoxShadowData.clear();

    const elementMap = boxShadowData.elementMap || [];

    elementMap.forEach(([elementId, shadows]) => {

        const outsideShadows = shadows.outsideBoxShadowList ||
            (boxShadowData.outside || []).filter(s => s.elementId === elementId);
        const insideShadows = shadows.insideBoxShadowList ||
            (boxShadowData.inside || []).filter(s => s.elementId === elementId);

        elementBoxShadowData.set(elementId, {
            outsideBoxShadowList: outsideShadows.map(s => ({
                horizontal: Number(s.horizontal),
                vertical: Number(s.vertical),
                blur: Number(s.blur),
                color: s.color,
                inset: false
            })),
            insideBoxShadowList: insideShadows.map(s => ({
                horizontal: Number(s.horizontal),
                vertical: Number(s.vertical),
                blur: Number(s.blur),
                color: s.color,
                inset: true
            }))
        });
    });

    /* console.log("Restored Box Shadows:", elementBoxShadowData); */
}

function loadShadowsForElement(elementId) {
    const data = elementBoxShadowData.get(elementId) || {
        outsideBoxShadowList: [],
        insideBoxShadowList: []
    };

    /* console.log('Loading shadows for:', elementId, 'Data:', data); */


    outsideBoxShadowList.length = 0;
    insideBoxShadowList.length = 0;


    outsideBoxShadowList.push(...data.outsideBoxShadowList);
    insideBoxShadowList.push(...data.insideBoxShadowList);


    refreshBoxShadowUI();
    updateBoxShadowCSS();
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.initialBoxShadows) {
        try {
            restoreBoxShadowsFromData(window.initialBoxShadows);
        } catch (error) {
            console.error("[ERROR] Failed to restore box shadows:", error);
        }
    } else {
        console.warn("[DEBUG] No initial box shadow data found on page load.");
    }
});


function rebuildShadowUI() {

    ['outside-box-shadow-list', 'inside-box-shadow-list'].forEach(id => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = '';
    });


    const createShadowUI = (shadow, index, isInside) => {
        const container = isInside ?
            document.getElementById('inside-box-shadow-list') :
            document.getElementById('outside-box-shadow-list');
        if (container) {
            addBoxShadowToUI(container, shadow, index, isInside);
        }
    };

    outsideBoxShadowList.forEach((shadow, index) => {
        createShadowUI(shadow, index, false);
    });
    insideBoxShadowList.forEach((shadow, index) => {
        createShadowUI(shadow, index, true);
    });
}


function ensureElementData(elementId) {
    if (!elementBoxShadowData.has(elementId)) {
        elementBoxShadowData.set(elementId, {
            outsideBoxShadowList: [],
            insideBoxShadowList: []
        });
    }
}

function handleElementSelection(element) {
    const elementId = getElementIdentifierFirstClass(element);


    isManagingInside = false;
    document.querySelector('.boxShadow-btn .btn-bx-outside').classList.add('active');
    document.querySelector('.boxShadow-btn .btn-bx-inside').classList.remove('active');
    toggleBoxShadowLists();

    ensureElementData(elementId);
    loadShadowsForElement(elementId);
    loadTextShadowsForElement(elementId);
    preserveElementStyles(element);
}
let currentSelectedTextShadowIndex = 0;

document.querySelector('.text-shadow-create').addEventListener('click', () => {
    const newShadow = {
        horizontal: 0,
        vertical: 0,
        blur: 0,
        color: '#000000',
    };

    textShadowList.push(newShadow);
    refreshTextShadowUI();
    selectTextShadow(textShadowList.length - 1);
    saveTextShadowData();
});

function selectTextShadow(index) {
    currentSelectedTextShadowIndex = index;


    const items = document.querySelectorAll('.text-shadow-item');
    items.forEach((item, idx) => {
        if (idx === index) {
            item.classList.add('active-shadow');
        } else {
            item.classList.remove('active-shadow');
        }
    });


    const shadow = textShadowList[index];
    document.getElementById('horizontal-offset2').value = shadow.horizontal;
    document.getElementById('vertical-offset2').value = shadow.vertical;
    document.getElementById('blur-radius2').value = shadow.blur;
    document.getElementById('shadow-color2').value = shadow.color;
}

function deleteTextShadow(index) {
    textShadowList.splice(index, 1);
    saveTextShadowData();
    updateTextShadowCSS();
}

document.querySelectorAll('[add-css^="text-shadow"]').forEach((input) => {
    input.addEventListener('input', () => {

        const addCssValue = input.getAttribute('add-css').replace(/\d+$/, '');

        if (addCssValue === 'text-shadow') {
            const currentShadow = textShadowList[currentSelectedTextShadowIndex];

            if (!currentShadow) return;

            if (input.id === 'horizontal-offset2') currentShadow.horizontal = parseInt(input.value, 10) || 0;
            if (input.id === 'vertical-offset2') currentShadow.vertical = parseInt(input.value, 10) || 0;
            if (input.id === 'blur-radius2') currentShadow.blur = parseInt(input.value, 10) || 0;
            if (input.id === 'shadow-color2') currentShadow.color = input.value || '#000000';

            updateTextShadowCSS();
            updateShadowDisplay2(currentSelectedTextShadowIndex);
            saveTextShadowData();
        }
    });
});


function updateTextShadowCSS() {
    if (!currentSelectedElement) return;
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);

    const shadows = textShadowList.map(s =>
        `${s.horizontal}px ${s.vertical}px ${s.blur}px ${s.color}`
    );
    const finalValue = shadows.join(', ');

    // Update elementUnits directly
    const cls = currentSelectedElement.classList[0];
    if (!elementUnits[cls]) {
        elementUnits[cls] = {};
    }

    if (finalValue) {
        elementUnits[cls]['text-shadow'] = finalValue;
    } else {
        delete elementUnits[cls]['text-shadow'];
    }

    rebuildBaseStyles();
    syncTextShadowData();
}


function updateShadowDisplay2(index) {
    const shadow = textShadowList[index];
    if (!shadow) return;
    const textShadowValue = `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;
    const textShadowItem = document.querySelector(`#text-shadow-list .text-shadow-item[data-index="${index}"]`);
    if (textShadowItem) {
        const valueEl = textShadowItem.querySelector('.text-shadow-value');
        if (valueEl) {
            valueEl.textContent = textShadowValue;
        }
    }
}

document.querySelector('.boxShadow').addEventListener('click', () => {

    document.querySelector('.boxShadow').classList.add('activate-shadow');
    document.querySelector('.textShadow').classList.remove('activate-shadow');


    document.querySelector('.boxShadow-setting').classList.remove('none');
    document.querySelector('.textShadow-setting').classList.add('none');
});

document.querySelector('.textShadow').addEventListener('click', () => {

    document.querySelector('.textShadow').classList.add('activate-shadow');
    document.querySelector('.boxShadow').classList.remove('activate-shadow');

    document.querySelector('.textShadow-setting').classList.remove('none');
    document.querySelector('.boxShadow-setting').classList.add('none');
});





function saveTextShadowData() {
    if (!currentSelectedElement) return;
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);
    elementTextShadowData.set(elementId, [...textShadowList]);
}


function loadTextShadowData(elementId) {
    if (!elementId) return;

    const savedTextShadowData = elementTextShadowData.get(elementId);

    textShadowList.splice(0, textShadowList.length);

    if (savedTextShadowData) {
        textShadowList.push(...savedTextShadowData);
    }

    refreshTextShadowUI();
    updateTextShadowCSS();
}


function refreshTextShadowUI() {
    const container = document.getElementById('text-shadow-list');
    if (!container) return;
    container.innerHTML = '';

    textShadowList.forEach((shadow, index) => {
        addTextShadowToUI(container, shadow, index);
    });
}


function addTextShadowToUI(container, shadow, index) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'text-shadow-item';
    itemDiv.dataset.index = index;

    const textShadowValue = `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.color}`;

    itemDiv.innerHTML = `
        <div class="flex-sb-align m-tb-10 gap10 b-2">
            <div class="flex-col gap10">
                <p>Text Shadow ${index + 1}</p>
                <p class="text-shadow-value" style="color: white;">${textShadowValue}</p>
            </div>
            <img class="small-img delete-text-shadow" src="/Icon/garbage.png" alt="Delete">
        </div>
    `;

    itemDiv.addEventListener('click', () => {
        selectTextShadow(index);
    });

    itemDiv.querySelector('.delete-text-shadow').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTextShadow(index);
        itemDiv.remove();
        syncTextShadowData();
        updateTextShadowCSS();
    });

    container.appendChild(itemDiv);
}



function restoreTextShadowsFromData(savedData) {
    elementTextShadowData.clear();

    if (savedData?.elementMap) {
        savedData.elementMap.forEach(([elementId, shadows]) => {

            const processed = shadows.map(s => ({
                horizontal: Number(s.horizontal),
                vertical: Number(s.vertical),
                blur: Number(s.blur),
                color: s.color
            }));
            elementTextShadowData.set(elementId, processed);
        });
    }

    if (currentSelectedElement) {
        const elementId = getElementIdentifierFirstClass(currentSelectedElement);
        loadTextShadowsForElement(elementId);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (window.initialTextShadows) {
        restoreTextShadowsFromData(window.initialTextShadows);
    }
    if (currentSelectedElement) {
        const elementId = getElementIdentifierFirstClass(currentSelectedElement);
        loadTextShadowsForElement(elementId);
    }
});


function loadTextShadowsForElement(elementId) {
    textShadowList.length = 0;
    const stored = elementTextShadowData.get(elementId) || [];
    textShadowList.push(...stored);
    refreshTextShadowUI();
    updateTextShadowCSS();
}

function preserveExistingTextShadow() {
    /*     if (!currentSelectedElement) return;
    
        const elementId = getElementIdentifierFirstClass(currentSelectedElement);
        const computedStyle = window.getComputedStyle(currentSelectedElement).textShadow;
    
        // Only update if the computed style is not 'none'
        if (computedStyle !== 'none') {
            currentSelectedElement.style.textShadow = computedStyle;
            updateCssForClass(elementId, 'text-shadow', computedStyle);
        } else {
            // Remove empty text-shadow
            currentSelectedElement.style.removeProperty('text-shadow');
            updateCssForClass(elementId, 'text-shadow', '');
        } */
}

function syncTextShadowData() {
    if (!currentSelectedElement) return;
    const elementId = getElementIdentifierFirstClass(currentSelectedElement);
    elementTextShadowData.set(elementId, [...textShadowList]);
}

document.querySelectorAll('.bx-col').forEach(function (element) {
    element.setAttribute('draggable', true);

    element.addEventListener('dragstart', function (e) {
        // Store the drag-element type (div, section, etc.) in dataTransfer
        let dragElementType = this.getAttribute('drag-element');
        e.dataTransfer.setData('element-type', dragElementType);
    });
});


let dropArea = document.getElementById('preview-content');



dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';


    document.querySelectorAll('.drop-target, .drop-target-inside').forEach(el => {
        el.classList.remove('drop-target', 'drop-target-inside');
    });


    if (e.target === dropArea) {
        return;
    }

    const targetChild = e.target.closest('[data-id], form');
    if (targetChild && targetChild !== dropArea) {
        targetChild.classList.add('drop-target-inside');
    }
});


dropArea.addEventListener('dragleave', function (e) {

    const targetChild = e.target.closest('[data-id], form');
    if (targetChild && targetChild !== dropArea) {
        targetChild.classList.remove('drop-target', 'drop-target-inside');
    }
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();


    document.querySelectorAll('.drop-target, .drop-target-inside').forEach(el => {
        el.classList.remove('drop-target', 'drop-target-inside');
    });

    const elementType = e.dataTransfer.getData('element-type');

    const draggedElementId = e.dataTransfer.getData('dragged-element-id');

    if (draggedElementId) {
        displayErrorMessage("To reorder elements, please use the navigator.");
        return;
    }

    let target = e.target.closest('[data-id], form');
    if (!target) {
        target = dropArea;
    }

    if (elementType) {
        addNewElement(elementType, target, e);
    }
});


function addNewElement(elementType, target, e) {
    if (elementType.startsWith("form-")) {
        const formAncestor = target ? target.closest("form") : null;
        if (!formAncestor) {
            displayErrorMessage("Form elements can only be dropped inside a form.");
            return;
        }
        target = formAncestor;
    }

    const newElement = createNewElement(elementType, target);
    if (!newElement) return;

    assignUniqueId(newElement);

    let parent;
    if (elementType === "form") {
        parent = dropArea;
    } else if (target === dropArea) {
        parent = dropArea;
    } else if (target) {
        parent = target.parentElement;
    } else {
        parent = dropArea;
    }

    const doAdd = () => {
        if (elementType === 'list-item') {
            const parentUl = e.target.closest('ul');
            if (parentUl) {
                parentUl.appendChild(newElement);
            } else {
                displayErrorMessage("List items can only be added inside a <ul>.");
                return;
            }
        } else if (elementType === "form") {
            dropArea.appendChild(newElement);
        } else if (elementType.startsWith("form-")) {
            target.appendChild(newElement);
        } else if (target) {
            if (target === dropArea) {
                dropArea.appendChild(newElement);
            } else {
                const targetRect = target.getBoundingClientRect();
                const dropPos = e.clientY - targetRect.top;
                const topThreshold = targetRect.height * 0.05;
                const bottomThreshold = targetRect.height * 0.6;
                if (dropPos < topThreshold) {
                    if (target.parentElement && target.parentElement.contains(target)) {
                        parent.insertBefore(newElement, target);
                    } else {
                        parent.appendChild(newElement);
                    }
                } else if (dropPos > bottomThreshold) {
                    parent.insertBefore(newElement, target.nextSibling);
                } else {
                    target.appendChild(newElement);
                }
            }
        } else {
            dropArea.appendChild(newElement);
        }

        makeElementDroppable(newElement);

        if (['flex-column', 'flex', 'section', 'container', 'div'].includes(elementType)) {
            assignW2EngineToChild(newElement);
        } else if (['heading', 'paragraph', 'text', 'link-block', 'text-link'].includes(elementType) || elementType.startsWith("form-")) {
            removeW2EngineFromParent(newElement);
        }

        updateNavigator();
    };

    const undoAdd = () => {
        newElement.remove();
        updateNavigator();
    };

    doAdd();
    trackChange({ do: doAdd, undo: undoAdd });
}



let FlexColumnCounter = 0;
let FlexCounter = 0;
let GridCounter = 0;
let HeadingCounter = 0;
let ParagraphCounter = 0;
let TextLinkCounter = 0;
let TextCounter = 0;
let DivCounter = 0;
let LinkBlockCounter = 0;
let ContainerCounter = 0;
let SectionCounter = 0;
let ButtonCounter = 0;
let UlCounter = 0;

let ImageCounter = 0;
let VideoCounter = 0;

let FormCounter = 0;
let FormLabelCounter = 0;
let FormInputCounter = 0;
let FormTextareaCounter = 0;
let FormCheckboxCounter = 0;
let FormRadioCounter = 0;
let FormSelectCounter = 0;
let FormButtonCounter = 0;
let FormFieldCounter = 0;

function getHighestCounterValue(prefix, selector) {
    let max = 0;
    document.querySelectorAll(selector).forEach(elem => {
        elem.classList.forEach(cls => {
            const match = cls.match(new RegExp(`^${prefix}(\\d+)$`));
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > max) {
                    max = num;
                }
            }
        });
    });
    return max;
}

document.addEventListener('DOMContentLoaded', () => {
    DivCounter = getHighestCounterValue("Div", "#preview-content *");

    FlexColumnCounter = getHighestCounterValue("FlexColumn", "#preview-content *");
    FlexCounter = getHighestCounterValue("Flex", "#preview-content *");
    GridCounter = getHighestCounterValue("Grid", "#preview-content *");
    HeadingCounter = getHighestCounterValue("Heading", "#preview-content *");
    ParagraphCounter = getHighestCounterValue("Paragraph", "#preview-content *");
    TextLinkCounter = getHighestCounterValue("TextLink", "#preview-content *");
    TextCounter = getHighestCounterValue("Text", "#preview-content *");
    LinkBlockCounter = getHighestCounterValue("LinkBlock", "#preview-content *");
    ContainerCounter = getHighestCounterValue("Container", "#preview-content *");
    SectionCounter = getHighestCounterValue("Section", "#preview-content *");
    ButtonCounter = getHighestCounterValue("Button", "#preview-content *");
    UlCounter = getHighestCounterValue("Ul", "#preview-content *");

    ImageCounter = getHighestCounterValue("Image", "#preview-content *");
    VideoCounter = getHighestCounterValue("Video", "#preview-content *");

    FormCounter = getHighestCounterValue("Form", "#preview-content *");
    FormLabelCounter = getHighestCounterValue("Label", "#preview-content *");
    FormInputCounter = getHighestCounterValue("Input", "#preview-content *");
    FormTextareaCounter = getHighestCounterValue("Textarea", "#preview-content *");
    FormCheckboxCounter = getHighestCounterValue("Checkbox", "#preview-content *");
    FormRadioCounter = getHighestCounterValue("Radio", "#preview-content *");
    FormSelectCounter = getHighestCounterValue("Select", "#preview-content *");
    FormButtonCounter = getHighestCounterValue("ButtonInput", "#preview-content *");
});



function makeElementEditableInPlace(element) {
    element.addEventListener('dblclick', () => {
        element.setAttribute('contenteditable', 'true');
        element.setAttribute('spellcheck', 'true');
        element.classList.add('editing');

        element.style.outline = 'none';
        element.style.border = '1.5px solid #218cff';
        element.style.whiteSpace = 'pre-wrap';

        element.focus();

        element.querySelectorAll('.tag-name-display, .tag-name-display-hover').forEach(tag => tag.remove());

        element.addEventListener('blur', () => {
            element.removeAttribute('contenteditable');
            element.removeAttribute('spellcheck');
            element.removeAttribute('data-gramm_editor');
            element.classList.remove('editing');

            element.style.border = '';
            element.style.outline = '';
            element.style.whiteSpace = '';

            addTagNameToElement(element, true);
        }, { once: true });
    });
}

function createNewElement(elementType, dropTarget) {
    let newElement;


    switch (elementType) {
        case 'flex-column':
            FlexColumnCounter++;
            newElement = document.createElement('div');
            newElement.classList.add(`Flex-Block${FlexColumnCounter}`, 'w2-engine-flex-col');
            break;
        case 'flex':
            FlexCounter++;
            newElement = document.createElement('div');
            newElement.classList.add(`Flex${FlexCounter}`, 'w2-engine-flex');
            break;
        case 'grid':
            GridCounter++;
            newElement = document.createElement('div');
            newElement.classList.add(`Grid${GridCounter}`, 'w2-engine-display2');

            for (let i = 1; i <= 4; i++) {
                let colDiv = document.createElement('div');

                colDiv.classList.add(`col${i}`, 'w2-engine-bx');

                newElement.appendChild(colDiv);
            }

            nextColNumber = 5;
            document.querySelector('.little-menu').classList.remove('none');
            break;
        case 'list':
            UlCounter++;
            newElement = document.createElement('ul');
            newElement.classList.add(`ul${UlCounter}`, 'w2-engine-list');
            newElement.setAttribute('data-li-counter', '3');


            for (let i = 1; i <= 3; i++) {
                const liDiv = document.createElement('li');
                liDiv.classList.add(`li-item${i}`, 'w2-engine-li');
                newElement.appendChild(liDiv);
            }


            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.tagName !== 'LI') {
                                node.remove();
                                displayErrorMessage("Only <li> elements can be added inside <ul>.");
                            }
                        });
                    }
                }
            });
            observer.observe(newElement, { childList: true });
            break;

        case 'list-item':

            const parentUl = dropArea.querySelector('ul');

            if (parentUl) {

                let currentLiCounter = parseInt(parentUl.getAttribute('data-li-counter'), 10);

                if (isNaN(currentLiCounter)) {
                    currentLiCounter = 3;
                }

                const nextLiIndex = currentLiCounter + 1;

                newElement = document.createElement('li');
                newElement.classList.add(`li-item${nextLiIndex}`, 'w2-engine-li');
                parentUl.appendChild(newElement);

                // Update the counter for the <ul>
                parentUl.setAttribute('data-li-counter', nextLiIndex);
            } else {
                displayErrorMessage("List items can only be added inside a <ul> with class 'w2-engine-list'.");
                return null;
            }
            break;
        case 'heading':
            HeadingCounter++;
            newElement = document.createElement('h1');
            newElement.classList.add(`Heading${HeadingCounter}`, 'w2-engine-text1');
            newElement.textContent = 'Heading';
            makeElementEditableInPlace(newElement); // Make paragraph editable
            document.querySelector('.text-menu').classList.remove('none');
            break;
        case 'paragraph':
            ParagraphCounter++;
            newElement = document.createElement('p');
            newElement.classList.add(`Paragraph${ParagraphCounter}`);
            makeElementEditableInPlace(newElement); // Make paragraph editable
            newElement.textContent = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.';
            break;
        case 'text-link':
            TextLinkCounter++;
            newElement = document.createElement('a');
            newElement.href = "#";
            newElement.classList.add(`Link${TextLinkCounter}`, 'blue');
            makeElementEditableInPlace(newElement); // Make paragraph editable
            newElement.textContent = 'Text Link';
            break;
        case 'text':
            TextCounter++;
            newElement = document.createElement('div');
            newElement.classList.add(`Text${TextCounter}`);
            makeElementEditableInPlace(newElement); // Make paragraph editable
            newElement.textContent = 'Text In Block Of Line';
            break;
        case 'div':
            DivCounter++;
            newElement = document.createElement('div');
            newElement.classList.add(`Div${DivCounter}`, 'w2-engine');
            break;
        case 'link-block':
            LinkBlockCounter++;
            newElement = document.createElement('a');
            makeElementEditableInPlace(newElement); // Make paragraph editable
            newElement.classList.add(`Link-Block${LinkBlockCounter}`, 'w2-engine-a');
            newElement.textContent = 'A Link';
            break;
        case 'container':
            ContainerCounter++;
            newElement = document.createElement('div');
            newElement.classList.add(`Container${ContainerCounter}`, 'w2-engine');
            break;
        case 'section':
            SectionCounter++;
            newElement = document.createElement('div');
            newElement.classList.add(`Section${SectionCounter}`, 'w2-engine');
            break;
        case 'button':
            ButtonCounter++;
            newElement = document.createElement('a');
            newElement.classList.add(`Button${ButtonCounter}`);
            makeElementEditableInPlace(newElement); // Make paragraph editable
            newElement.textContent = 'Button';
            break;

        case 'image':
            ImageCounter++;
            newElement = document.createElement('img');
            newElement.classList.add(`Image${ImageCounter}`, 'w2-engine-image');
            newElement.src = '/Icon/image-file.png';
            break;
        case 'video':
            VideoCounter++;
            newElement = document.createElement('video');
            newElement.classList.add(`Video${VideoCounter}`, 'w2-engine-video');
            newElement.setAttribute('controls', 'true');


            document.querySelector('.video-menu').classList.remove('none');
            break;
        case 'form':
            FormCounter++;
            newElement = document.createElement('form');
            newElement.classList.add(`Form${FormCounter}`);
            const formSuffix = FormCounter > 1 ? `-${FormCounter}` : "";
            newElement.setAttribute("method", "get");
            newElement.setAttribute("name", `email-form${formSuffix}`);
            newElement.setAttribute("data-name", `Email Form${FormCounter > 1 ? " " + FormCounter : ""}`);
            newElement.setAttribute("id", `email-form${formSuffix}`);

            // Create label for Name
            const nameLabel = document.createElement('label');
            nameLabel.setAttribute("for", `name${formSuffix}`);
            nameLabel.textContent = "Name";
            nameLabel.classList.add("form-label");
            nameLabel.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default behavior
                e.stopPropagation();
                currentSelectedElement = nameLabel;
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                nameLabel.classList.add('selected');
                classNameInput.value = "Label" + formSuffix; // or any value you prefer
                // Show the label-menu
                document.querySelector('.label-menu').classList.remove('none');
            });

            // Create input for Name
            const nameInput = document.createElement('input');
            nameInput.classList.add("w2-input", "form-input");
            nameInput.setAttribute("maxlength", "256");
            nameInput.setAttribute("name", `name${formSuffix}`);
            nameInput.setAttribute("data-name", `Name${FormCounter > 1 ? " " + FormCounter : ""}`);
            nameInput.setAttribute("placeholder", "");
            nameInput.setAttribute("type", "text");
            nameInput.setAttribute("id", `name${formSuffix}`);
            nameInput.addEventListener('click', function (e) {
                e.stopPropagation();
                currentSelectedElement = nameInput;
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                nameInput.classList.add('selected');
                classNameInput.value = "Input" + formSuffix; // adjust as needed
                document.querySelector('.input-menu').classList.remove('none');
            });

            const emailLabel = document.createElement('label');
            emailLabel.setAttribute("for", `email${formSuffix}`);
            emailLabel.textContent = "Email Address";
            emailLabel.classList.add("form-label");
            emailLabel.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                currentSelectedElement = emailLabel;
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                emailLabel.classList.add('selected');
                classNameInput.value = "Label" + formSuffix; // adjust if needed
                document.querySelector('.label-menu').classList.remove('none');
            });

            const emailInput = document.createElement('input');
            emailInput.classList.add("w2-input", "form-input");
            emailInput.setAttribute("maxlength", "256");
            emailInput.setAttribute("name", `email${formSuffix}`);
            emailInput.setAttribute("data-name", `Email${FormCounter > 1 ? " " + FormCounter : ""}`);
            emailInput.setAttribute("placeholder", "");
            emailInput.setAttribute("type", "email");
            emailInput.setAttribute("id", `email${formSuffix}`);
            emailInput.setAttribute("required", "");
            emailInput.addEventListener('click', function (e) {
                e.stopPropagation();
                currentSelectedElement = emailInput;
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                emailInput.classList.add('selected');
                classNameInput.value = "Input" + formSuffix;
                document.querySelector('.input-menu').classList.remove('none');
            });

            // Create submit button
            const submitButton = document.createElement('input');
            submitButton.setAttribute("type", "submit");
            submitButton.classList.add("w2-button", "form-button");
            submitButton.setAttribute("value", "Submit");
            submitButton.addEventListener('click', function (e) {
                e.stopPropagation();
                currentSelectedElement = submitButton;
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                submitButton.classList.add('selected');
                classNameInput.value = "Button" + formSuffix;
            });

            newElement.appendChild(nameLabel);
            newElement.appendChild(nameInput);
            newElement.appendChild(emailLabel);
            newElement.appendChild(emailInput);
            newElement.appendChild(submitButton);
            break;



        case 'form-label':
            FormLabelCounter++;
            newElement = document.createElement('label');
            newElement.classList.add(`Label${FormLabelCounter}`);
            makeElementEditableInPlace(newElement);
            newElement.setAttribute("for", "");
            newElement.textContent = `Form Label${FormLabelCounter > 1 ? " " + FormLabelCounter : ""}`;
            break;

        case 'form-input':
            FormFieldCounter++;
            newElement = document.createElement('input');
            newElement.classList.add(`Field${FormFieldCounter === 1 ? "" : "-" + FormFieldCounter}`, 'w2-input');
            if (FormFieldCounter === 1) {
                newElement.setAttribute("name", "field");
                newElement.setAttribute("data-name", "Field");
                newElement.setAttribute("id", "w2-field");
            } else {
                newElement.setAttribute("name", "field-" + FormFieldCounter);
                newElement.setAttribute("data-name", "Field " + FormFieldCounter);
                newElement.setAttribute("id", "w2-field-" + FormFieldCounter);
            }
            newElement.setAttribute("maxlength", "256");
            newElement.setAttribute("placeholder", "Example Text");
            newElement.setAttribute("type", "text");
            newElement.setAttribute("required", "");
            break;

        case 'form-textarea':
            FormFieldCounter++;
            newElement = document.createElement('textarea');
            newElement.classList.add(`Field${FormFieldCounter === 1 ? "" : "-" + FormFieldCounter}`, "w-input");
            if (FormFieldCounter === 1) {
                newElement.setAttribute("name", "field");
                newElement.setAttribute("data-name", "Field");
                newElement.setAttribute("id", "w2-field");
            } else {
                newElement.setAttribute("name", "field-" + FormFieldCounter);
                newElement.setAttribute("data-name", "Field " + FormFieldCounter);
                newElement.setAttribute("id", "w2-field-" + FormFieldCounter);
            }
            newElement.setAttribute("maxlength", "5000");
            newElement.setAttribute("placeholder", "Example Text");
            break;

        case 'form-select':
            FormFieldCounter++;
            newElement = document.createElement('select');
            newElement.classList.add(`Field${FormFieldCounter === 1 ? "" : "-" + FormFieldCounter}`, "w2-select");
            if (FormFieldCounter === 1) {
                newElement.setAttribute("id", "field");
                newElement.setAttribute("name", "field");
                newElement.setAttribute("data-name", "Field");
            } else {
                newElement.setAttribute("id", "w2-field-" + FormFieldCounter);
                newElement.setAttribute("name", "field-" + FormFieldCounter);
                newElement.setAttribute("data-name", "Field " + FormFieldCounter);
            }
            newElement.innerHTML = `
                  <option value="">Select one...</option>
                  <option value="First">First choice</option>
                  <option value="Second">Second choice</option>
                  <option value="Third">Third choice</option>
                `;
            break;

        case 'form-checkbox':
            FormCheckboxCounter++;
            newElement = document.createElement('label');
            newElement.classList.add(`Checkbox${FormCheckboxCounter}`, "w2-checkbox");
            const checkboxSuffix = FormCheckboxCounter > 1 ? `-${FormCheckboxCounter}` : "";
            newElement.innerHTML = `
                  <input class="w2-checkbox-input" name="checkbox${checkboxSuffix}" data-name="Checkbox${FormCheckboxCounter > 1 ? " " + FormCheckboxCounter : ""}" type="checkbox" id="checkbox${checkboxSuffix}">
                  <span class="w2-form-span" for="checkbox${checkboxSuffix}">Checkbox${FormCheckboxCounter > 1 ? " " + FormCheckboxCounter : ""}</span>
                `;
            break;

        case 'form-radio':
            FormRadioCounter++;
            newElement = document.createElement('label');
            newElement.classList.add(`Radio${FormRadioCounter}`, "w2-radio");
            const radioSuffix = FormRadioCounter > 1 ? `-${FormRadioCounter}` : "";
            newElement.innerHTML = `
                  <input class="w2-radio-input" name="radio${radioSuffix}" data-name="Radio${FormRadioCounter > 1 ? " " + FormRadioCounter : ""}" type="radio" id="radio${radioSuffix}" value="Radio">
                  <span class="w2-form-span" for="radio${radioSuffix}">Radio${FormRadioCounter > 1 ? " " + FormRadioCounter : ""}</span>
                `;
            break;



        case 'form-button':
            FormButtonCounter++;
            newElement = document.createElement('input');
            newElement.setAttribute("type", "submit");
            newElement.classList.add(`ButtonInput${FormButtonCounter}`, "w2-button");
            newElement.setAttribute("value", "Submit");
            break;

        default:
            return null;
    }

    return newElement;
}

function displayErrorMessage(message) {
    const errorElement = document.querySelector('.error-message');
    errorElement.querySelector('.error-text').innerText = message;
    errorElement.classList.remove('none');

    setTimeout(() => {
        errorElement.classList.add('none');
    }, 5000);
}


function removeW2EngineFromParent(element) {
    const parent = element.parentElement;
    if (parent && parent.classList.contains('w2-engine')) {
        console.log(`Removing w2-engine class from parent`, parent);
        parent.classList.remove('w2-engine');
    } else {
        console.log(`No w2-engine class found in parent:`, parent);
    }
}

function assignW2EngineToChild(element) {
    const parent = element.parentElement;

    if (parent && parent.classList.contains('w2-engine')) {
        console.log('Removing w2-engine from parent and adding to child:', element);
        parent.classList.remove('w2-engine');
    }

    element.classList.add('w2-engine');
    console.log('Assigned w2-engine to:', element);
}





















let littleMenu = document.querySelector('.little-menu');
let closeLittleMenu = document.querySelector('.close-little-menu');

closeLittleMenu.onclick = function () {
    littleMenu.classList.add('none')
}

let textMenu = document.querySelector('.text-menu');
let closeTextMenu = document.querySelector('.close-text-menu');

closeTextMenu.onclick = function () {
    textMenu.classList.add('none')
}


let closeBackgroundMenu = document.querySelector('.close-background-menu');

closeBackgroundMenu.onclick = function () {
    backgroundMenu.classList.add('none')
}


let imageMenu = document.querySelector('.image-menu');
let closeImageMenu = document.querySelector('.close-image-menu');

closeImageMenu.onclick = function () {
    imageMenu.classList.add('none')
}


let videoMenu = document.querySelector('.video-menu');
let closeVideoMenu = document.querySelector('.close-video-menu');

closeVideoMenu.onclick = function () {
    videoMenu.classList.add('none')
}


let formMenu = document.querySelector('.form-menu');
let closeFormMenu = document.querySelector('.close-form-menu');

closeFormMenu.onclick = function () {
    formMenu.classList.add('none')
}

let inputMenu = document.querySelector('.input-menu');
let closeInputMenu = document.querySelector('.close-input-menu');

closeInputMenu.onclick = function () {
    inputMenu.classList.add('none')
}


let labelMenu = document.querySelector('.label-menu');
let closeLabelMenu = document.querySelector('.close-label-menu');

closeLabelMenu.onclick = function () {
    labelMenu.classList.add('none')
}

let textareaMenu = document.querySelector('.textarea-menu');
let closeTextareaMenu = document.querySelector('.close-textarea-menu');

closeTextareaMenu.onclick = function () {
    textareaMenu.classList.add('none')
}




const navigatorDisplay = document.getElementById('navigator-display');

function buildNavigator(element, container) {
    const elements = element.children;

    Array.from(elements).forEach(el => {
        const firstClassName = el.classList.length > 0 ? el.classList[0] : 'No class';

        let iconSrc = '/Icon/icons8-square-100 (1).png';
        if (el.tagName === 'DIV') {
            iconSrc = '/Icon/icons8-square-100 (1).png';
        } else if (el.classList.contains('Container')) {
            iconSrc = '/Icon/container.png';
        } else if (el.tagName === 'A') {
            iconSrc = '/Icon/link.png';
        } else if (el.tagName === 'H1') {
            iconSrc = '/Icon/h1.png';
        } else if (el.tagName === 'H2') {
            iconSrc = '/Icon/h2.png';
        } else if (el.tagName === 'H3') {
            iconSrc = '/Icon/h3.png';
        } else if (el.tagName === 'H4') {
            iconSrc = '/Icon/h4.png';
        } else if (el.tagName === 'H5') {
            iconSrc = '/Icon/h5.png';
        } else if (el.tagName === 'H6') {
            iconSrc = '/Icon/h6.png';
        } else if (el.tagName === 'section') {
            iconSrc = '/Icon/section-icon.png';
        } else if (el.tagName === 'P') {
            iconSrc = '/Icon/p.png';
        }

        const elBlock = document.createElement('div');
        elBlock.classList.add('main-navigator');
        elBlock.setAttribute('draggable', 'true');
        elBlock.dataset.targetId = el.dataset.id;
        elBlock.innerHTML = `
            <div class="flex-align gap5">
                <img class="small-img" src="${iconSrc}" alt="${el.tagName}">
                <p class="f-s-13">${firstClassName}</p>
            </div>
        `;

        elBlock.addEventListener('dragstart', onNavigatorDragStart);
        elBlock.addEventListener('dragover', onNavigatorDragOver);
        elBlock.addEventListener('dragleave', onNavigatorDragLeave);
        elBlock.addEventListener('drop', onNavigatorDrop);
        elBlock.addEventListener('dragend', onNavigatorDragEnd);

        elBlock.addEventListener('click', () => {

            document.querySelectorAll('.main-navigator.selected').forEach(n => n.classList.remove('selected'));
            elBlock.classList.add('selected');

            document.querySelectorAll('#preview-content [data-id].selected').forEach(p => p.classList.remove('selected'));
            el.classList.add('selected');
        });

        container.appendChild(elBlock);

        if (el.children.length > 1) {
            const line = document.createElement('div');
            line.classList.add('navigator-line');
            elBlock.querySelector('.flex-align').appendChild(line);
        }

        const flexAlign = elBlock.querySelector('.flex-align');
        if (flexAlign.children.length > 1) {
            elBlock.classList.add('main-navigator', 'm-l-10');
        }

        buildNavigator(el, elBlock);
    });
}
function updateNavigator() {
    const navigatorContainer = document.getElementById('navigator-display');
    if (!navigatorContainer) return;

    const existingMain = navigatorContainer.querySelector('.main-navigator');
    if (existingMain) existingMain.remove();
    const mainBlock = document.createElement('div');
    mainBlock.classList.add('main-navigator');
    navigatorContainer.appendChild(mainBlock);

    buildNavigator(dropArea, mainBlock);
}


let draggedNavigatorElement = null;

function onNavigatorDragStart(event) {
    draggedNavigatorElement = event.target.closest('.main-navigator');
    if (!draggedNavigatorElement) return;

    draggedNavigatorElement.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';

    const draggedDomElement = findPreviewElementByNavigator(draggedNavigatorElement);
    if (draggedDomElement) {
        event.dataTransfer.setData('dragged-element-id', draggedDomElement.dataset.id);
    }
}

function onNavigatorDragOver(event) {
    event.preventDefault();

    const targetNavigator = event.target.closest('.main-navigator');
    if (!targetNavigator || targetNavigator === draggedNavigatorElement) return;

    document.querySelectorAll('.drag-over-inside, .drag-over-outside, .nav-drop-line').forEach(el => {
        el.classList.remove('drag-over-inside', 'drag-over-outside');
        if (el.classList.contains('nav-drop-line')) el.remove();
    });

    const targetRect = targetNavigator.getBoundingClientRect();
    const dropPosition = event.clientY - targetRect.top;

    // Decide above, inside, or below based on thresholds.
    if (dropPosition < targetRect.height * 0.05) {
        targetNavigator.classList.add('drag-over-outside');
        showNavLine(targetNavigator, 'top');
    } else if (dropPosition > targetRect.height * 0.6) {
        targetNavigator.classList.add('drag-over-outside');
        showNavLine(targetNavigator, 'bottom');
    } else {
        targetNavigator.classList.add('drag-over-inside');
    }
}

function showNavLine(targetNavigator, position) {
    const line = document.createElement('div');
    line.classList.add('nav-drop-line');
    if (position === 'top') {
        line.style.top = '0';
        line.style.borderTop = '1px solid #a6b0bf';
    } else {
        line.style.bottom = '-4px';
        line.style.borderBottom = '1px solid #a6b0bf';
    }
    targetNavigator.appendChild(line);
}

function onNavigatorDragLeave(event) {
    const targetElement = event.target.closest('.main-navigator');
    if (targetElement) {
        targetElement.classList.remove('drag-over-inside', 'drag-over-outside');
    }
    document.querySelectorAll('.nav-drop-line').forEach(l => l.remove());
}

function onNavigatorDrop(event) {
    event.preventDefault();

    const targetNavigator = event.target.closest('.main-navigator');
    if (!targetNavigator || targetNavigator === draggedNavigatorElement) return;

    const draggedDomElement = findPreviewElementByNavigator(draggedNavigatorElement);
    const targetDomElement = findPreviewElementByNavigator(targetNavigator);

    if (draggedDomElement && targetDomElement && draggedDomElement !== targetDomElement) {
        const targetRect = targetNavigator.getBoundingClientRect();
        const dropPosition = event.clientY - targetRect.top;
        const originalParent = draggedDomElement.parentElement;
        const originalNextSibling = draggedDomElement.nextSibling;

        const topThreshold = targetRect.height * 0.05;
        const bottomThreshold = targetRect.height * 0.6;

        const performMove = () => {
            if (dropPosition < topThreshold) {

                targetDomElement.parentElement.insertBefore(draggedDomElement, targetDomElement);
            } else if (dropPosition > bottomThreshold) {

                targetDomElement.parentElement.insertBefore(draggedDomElement, targetDomElement.nextSibling);
            } else {
                targetDomElement.appendChild(draggedDomElement);
            }
            updateNavigator();
        };

        const undoMove = () => {
            originalParent.insertBefore(draggedDomElement, originalNextSibling);
            updateNavigator();
        };

        performMove();
        trackChange({ do: performMove, undo: undoMove });
    }

    document.querySelectorAll('.drag-over-outside, .drag-over-inside').forEach(el => el.classList.remove('drag-over-outside', 'drag-over-inside'));
    document.querySelectorAll('.nav-drop-line').forEach(l => l.remove());
    if (draggedNavigatorElement) draggedNavigatorElement.classList.remove('dragging');
    draggedNavigatorElement = null;
}

function onNavigatorDragEnd() {
    if (draggedNavigatorElement) {
        draggedNavigatorElement.classList.remove('dragging');
    }
    draggedNavigatorElement = null;
    document.querySelectorAll('.drag-over-outside, .drag-over-inside').forEach(el => el.classList.remove('drag-over-outside', 'drag-over-inside'));
    document.querySelectorAll('.nav-drop-line').forEach(l => l.remove());
}

function makeElementDroppable(element) {
    element.setAttribute('draggable', 'true');

    element.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('dragged-element-id', element.dataset.id);
        e.effectAllowed = 'move';
    });

    element.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    element.addEventListener('drop', function (e) {
        e.preventDefault();
        const draggedElementId = e.dataTransfer.getData('dragged-element-id');
        const draggedElement = document.querySelector(`[data-id="${draggedElementId}"]`);
        if (draggedElement && draggedElement !== element) {
            element.appendChild(draggedElement);
            updateNavigator();
        }
    });
}

function assignUniqueId(element) {
    const uniqueId = `element-${Date.now()}`;
    element.dataset.id = uniqueId;
}

function findPreviewElementByNavigator(navigatorElement) {
    if (!navigatorElement || !navigatorElement.dataset) return null;
    const targetId = navigatorElement.dataset.targetId;
    return document.querySelector(`#preview-content [data-id="${targetId}"]`);
}

const observer2 = new MutationObserver(updateNavigator);
observer2.observe(document.getElementById('preview-content'), {
    childList: true,
    subtree: true
});

updateNavigator();


document.getElementById('preview-content').addEventListener('click', function (e) {

    document.querySelectorAll('#preview-content .selected').forEach(el => el.classList.remove('selected'));

    const elements = document.elementsFromPoint(e.clientX, e.clientY);

    const clicked = elements.find(el => el.hasAttribute('data-id') && el.closest('#preview-content'));
    if (!clicked) return;

    clicked.classList.add('selected');
    currentSelectedElement = clicked;

    const navEl = document.querySelector(`.main-navigator[data-target-id="${clicked.dataset.id}"]`);
    if (navEl) {
        document.querySelectorAll('.main-navigator.selected').forEach(n => n.classList.remove('selected'));
        navEl.classList.add('selected');
    }

    const firstClass = currentSelectedElement.classList[0] || '';
    classNameInput.value = firstClass;
});

document.getElementById('navigator-display').addEventListener('click', function (e) {

    const elements = document.elementsFromPoint(e.clientX, e.clientY);

    const clickedNavigator = elements.find(el =>
        el.classList && el.classList.contains('main-navigator')
    );
    if (!clickedNavigator) return;

    document.querySelectorAll('#navigator-display .main-navigator.selected')
        .forEach(el => el.classList.remove('selected'));


    clickedNavigator.classList.add('selected');


    const targetId = clickedNavigator.getAttribute('data-target-id');
    console.log("Selected navigator item with target id:", targetId);


    document.querySelectorAll('#preview-content [data-id].selected')
        .forEach(el => el.classList.remove('selected'));
    const previewElement = document.querySelector(`#preview-content [data-id="${targetId}"]`);
    if (previewElement) {
        previewElement.classList.add('selected');
        currentSelectedElement = previewElement;
    }
});




document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete') {
        const selectedPreview = document.querySelector('#preview-content [data-id].selected');
        if (!selectedPreview) return;

        if (selectedPreview === dropArea) {
            displayErrorMessage("You cannot delete the preview container.");
            return;
        }

        const originalParent = selectedPreview.parentElement;
        const originalNextSibling = selectedPreview.nextSibling;

        const removeElem = () => {
            selectedPreview.remove();
            updateNavigator();
        };

        const undoRemove = () => {
            originalParent.insertBefore(selectedPreview, originalNextSibling);
            updateNavigator();
        };

        removeElem();
        trackChange({ do: removeElem, undo: undoRemove });
    }
});






let copyBuffer = null;

document.addEventListener('keydown', function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        if (currentSelectedElement) {
            if (currentSelectedElement.id === 'preview-content') {
                displayErrorMessage("Cannot copy the preview container.");
                return;
            }
            copyBuffer = currentSelectedElement.cloneNode(true);
            copyBuffer.classList.remove('selected');
            e.preventDefault();
        }
    }
    else if (e.ctrlKey && e.key.toLowerCase() === 'v') {
        if (copyBuffer && currentSelectedElement) {
            if (currentSelectedElement.id === 'preview-content') {
                displayErrorMessage("Cannot paste into the preview container.");
                return;
            }
            const pastedElement = copyBuffer.cloneNode(true);
            assignUniqueId(pastedElement);
            const parent = currentSelectedElement.parentElement;
            parent.insertBefore(pastedElement, currentSelectedElement.nextSibling);

            currentSelectedElement.classList.remove('selected');
            pastedElement.classList.add('selected');
            currentSelectedElement = pastedElement;
            updateNavigator();

            const doPaste = () => {
                parent.insertBefore(pastedElement, currentSelectedElement.nextSibling);
                updateNavigator();
            };
            const undoPaste = () => {
                pastedElement.remove();
                updateNavigator();
            };
            trackChange({ do: doPaste, undo: undoPaste });
            e.preventDefault();
        }
    }
});



const uploadTrigger = document.getElementById('upload-trigger');
const fileInput = document.getElementById('file-upload');

uploadTrigger.addEventListener('click', () => {
    fileInput.click(); // Simulate click on hidden input
});

fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload-image', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            const assetsGrid = document.querySelector('.assets-grid');
            const newFile = `
                    <div class="asset-item">
                        ${data.fileType === 'image'
                    ? `<img src="${data.fileUrl}" alt="${data.fileName}" class="asset-preview">`
                    : data.fileType === 'video'
                        ? `<video controls><source src="${data.fileUrl}" type="video/mp4"></video>`
                        : `<audio controls><source src="${data.fileUrl}" type="audio/mpeg"></audio>`
                }
                    </div>
                `;
            assetsGrid.insertAdjacentHTML('beforeend', newFile);

            document.querySelector('.menu-box-assets').classList.add('none');
        } else {
            alert('Failed to upload file.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred. Please try again.');
    }
});


const menuAllAssets = document.querySelector('.menu-all-assets');
const boxAddingAssets = document.querySelector('.box-adding-assets');
const allAssetsParagraph = boxAddingAssets.querySelector('.flex-sb-align p');
const assetsGridBox = boxAddingAssets.querySelector('.assets-grid');
const f1Assets2 = boxAddingAssets.querySelector('.f1-assets2');
const menuAllAssetsImage = boxAddingAssets.querySelector('.open-menu-all-assets');
const closeMenuAllAssets = document.querySelector('.menu-all-assets .close-menu-all-assets');

function resetToDefault() {

    menuAllAssets.classList.add('none');

    allAssetsParagraph.classList.remove('none');
    assetsGridBox.classList.remove('none');
    f1Assets2.classList.remove('none');
    menuAllAssetsImage.classList.remove('none');


    const flexAlignDiv = boxAddingAssets.querySelector('.flex-align');
    if (flexAlignDiv) {
        flexAlignDiv.classList.remove('fix-flex');
    }
}

document.addEventListener('click', (event) => {
    const isClickInsideMenu = menuAllAssets.contains(event.target);
    const isClickInsideTrigger = menuAllAssetsImage.contains(event.target);


    if (!isClickInsideMenu && !isClickInsideTrigger) {
        resetToDefault();
    }
});

menuAllAssetsImage.addEventListener('click', () => {

    menuAllAssets.classList.remove('none');


    allAssetsParagraph.classList.add('none');
    assetsGridBox.classList.add('none');
    f1Assets2.classList.add('none');
    menuAllAssetsImage.classList.add('none');


    const flexAlignDiv = boxAddingAssets.querySelector('.flex-align');
    if (flexAlignDiv) {
        flexAlignDiv.classList.add('fix-flex');
    }
});

closeMenuAllAssets.addEventListener('click', () => {
    resetToDefault();
});


function setupVideoAssetSelection() {
    document.querySelectorAll('.btn-image.video-upload').forEach(btn => {
        btn.addEventListener('click', function () {
            const assetsContainer = document.querySelector('.box-adding-assets');
            if (assetsContainer) {
                assetsContainer.classList.remove('none');
                assetsContainer.classList.add('active');
                console.log("Video assets container shown (video src mode).");
            }
        });
    });

    const videoAssetItems = document.querySelectorAll('.asset-item[data-type="video"]');
    videoAssetItems.forEach(item => {
        item.addEventListener('click', () => {
            let videoUrl = "";
            const videoElem = item.querySelector('video');
            if (videoElem) {
                const sourceElem = videoElem.querySelector('source');
                if (sourceElem) {
                    videoUrl = sourceElem.getAttribute('src');
                } else {
                    videoUrl = videoElem.getAttribute('src');
                }
            }
            if (!videoUrl) {
                console.log("No video URL found in this asset. Ignoring.");
                return;
            }
            console.log("Video asset clicked, videoUrl:", videoUrl);

            if (currentSelectedElement && currentSelectedElement.tagName.toLowerCase() === 'video') {
                currentSelectedElement.src = videoUrl;
                const curSource = currentSelectedElement.querySelector('source');
                if (curSource) {
                    curSource.setAttribute('src', videoUrl);
                    currentSelectedElement.load();
                }
                console.log("Updated currentSelectedElement <video> src to", videoUrl);
            }

            const assetsContainer = document.querySelector('.box-adding-assets');
            if (assetsContainer) {
                assetsContainer.classList.add('none');
                assetsContainer.classList.remove('active');
                console.log("Video assets container hidden after selection.");
            }

            // Update active block's data if needed.
            if (activeForimaBlock) {
                activeForimaBlock.video_url = videoUrl;
                if (activeForimaBlock.dom) {
                    activeForimaBlock.dom.setAttribute('data-video-url', videoUrl);
                }
                activeForimaBlock.background_type = "video";
                console.log("Active block video_url updated:", videoUrl);
                updateBlockHeading(activeForimaBlock);
            }
        });
    });
}

function setupVideoCoverSelection() {
    document.querySelectorAll('.btn-image.video-cover-upload').forEach(btn => {
        btn.addEventListener('click', function () {
            const assetsContainer = document.querySelector('.box-adding-assets');
            if (assetsContainer) {
                assetsContainer.classList.remove('none');
                assetsContainer.classList.add('active');
                console.log("Video cover assets container shown (cover mode).");
            }
        });
    });

    const coverAssetItems = document.querySelectorAll('.asset-item[data-type="image"]');
    coverAssetItems.forEach(item => {
        item.addEventListener('click', () => {
            const assetImg = item.querySelector('.asset-preview');
            if (!assetImg) return;
            const coverUrl = assetImg.getAttribute('src');
            console.log("Cover asset clicked, coverUrl:", coverUrl);

            if (currentSelectedElement && currentSelectedElement.tagName.toLowerCase() === 'video') {
                currentSelectedElement.poster = coverUrl;
                console.log("Updated <video> poster to", coverUrl);
            }

            const coverPreviewEl = document.querySelector('.video-cover-preview');
            if (coverPreviewEl) {
                coverPreviewEl.src = coverUrl;
                console.log("Updated .video-cover-preview src to", coverUrl);
            }

            const assetsContainer = document.querySelector('.box-adding-assets');
            if (assetsContainer) {
                assetsContainer.classList.add('none');
                assetsContainer.classList.remove('active');
                console.log("Video cover assets container hidden after selection.");
            }

            if (activeForimaBlock) {
                activeForimaBlock.videoCover = coverUrl;
                if (activeForimaBlock.dom) {
                    activeForimaBlock.dom.setAttribute('data-video-cover', coverUrl);
                }
            }
        });
    });
}

function setupVideoControlsToggle() {
    document.querySelectorAll('.btn-image.add-control-video').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentSelectedElement || currentSelectedElement.tagName.toLowerCase() !== 'video') return;
            const videoEl = currentSelectedElement;
            if (videoEl.hasAttribute('controls')) {
                videoEl.removeAttribute('controls');
                btn.classList.remove('active');
                btn.textContent = "Enable";
            } else {
                videoEl.setAttribute('controls', 'true');
                btn.classList.add('active');
                btn.textContent = "Disable";
            }
            if (activeForimaBlock) {
                activeForimaBlock.controlsEnabled = videoEl.hasAttribute('controls');
            }
        });
    });
}

function setupVideoMuteToggle() {
    document.querySelectorAll('.btn-image.add-mute-video').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentSelectedElement || currentSelectedElement.tagName.toLowerCase() !== 'video') return;
            const videoEl = currentSelectedElement;
            if (videoEl.muted) {
                videoEl.muted = false;
                btn.classList.remove('active');
                btn.textContent = "False";
            } else {
                videoEl.muted = true;
                btn.classList.add('active');
                btn.textContent = "True";
            }
            if (activeForimaBlock) {
                activeForimaBlock.muted = videoEl.muted;
            }
        });
    });
}

function setupVideoTitleInput() {
    const titleInput = document.querySelector('.input-number2.title-video-set');
    if (!titleInput) return;
    titleInput.addEventListener('input', () => {
        if (!currentSelectedElement || currentSelectedElement.tagName.toLowerCase() !== 'video') return;
        const newTitle = titleInput.value.trim();
        currentSelectedElement.title = newTitle;
        if (activeForimaBlock) {
            activeForimaBlock.videoTitle = newTitle;
        }
        console.log("Updated video title to", newTitle);
    });
}





document.addEventListener("DOMContentLoaded", function () {
    setupVideoAssetSelection();
    setupVideoCoverSelection();
    setupVideoControlsToggle();
    setupVideoMuteToggle();
    setupVideoTitleInput();
});




document.getElementById('form-custom-name').addEventListener('input', function (e) {
    const newName = e.target.value.trim();
    console.log("Updated Form Name:", newName);
    if (currentSelectedElement && currentSelectedElement.tagName.toLowerCase() === 'form') {
        currentSelectedElement.setAttribute('name', newName);
    }
});





function populateInputMenuValues() {
    if (!currentSelectedElement) return;

    const nameInput = document.getElementById('input-custom-name');
    const idInput = document.getElementById('input-custom-id');
    const placeholderInput = document.getElementById('input-custom-placeholder');
    if (nameInput) nameInput.value = currentSelectedElement.getAttribute('name') || "";
    if (idInput) idInput.value = currentSelectedElement.id || "";
    if (placeholderInput) placeholderInput.value = currentSelectedElement.getAttribute('placeholder') || "";

    const requiredContainer = document.querySelector('.input-menu [data-setting="required"]');
    if (requiredContainer) {
        const isRequired = currentSelectedElement.hasAttribute('required');
        requiredContainer.querySelectorAll('button').forEach(btn => {
            if (btn.textContent.trim().toLowerCase() === (isRequired ? 'yes' : 'no')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    const autofocusContainer = document.querySelector('.input-menu [data-setting="autofocus"]');
    if (autofocusContainer) {
        const hasAutofocus = currentSelectedElement.hasAttribute('autofocus');
        autofocusContainer.querySelectorAll('button').forEach(btn => {
            if (btn.textContent.trim().toLowerCase() === (hasAutofocus ? 'yes' : 'no')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    if (currentSelectedElement.tagName.toLowerCase() === 'input') {
        const currentType = currentSelectedElement.getAttribute('type') || "text";
        const typeButtons = document.querySelectorAll('.input-menu .flex-col-align button.btn-input');
        typeButtons.forEach(btn => {
            if (btn.textContent.trim().toLowerCase() === currentType.toLowerCase()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}







function setupInputMenuListeners() {
    const nameInput = document.getElementById('input-custom-name');
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (currentSelectedElement) {
                currentSelectedElement.setAttribute('name', nameInput.value);
            }
        });
    }

    const idInput = document.getElementById('input-custom-id');
    if (idInput) {
        idInput.addEventListener('input', () => {
            if (currentSelectedElement) {
                currentSelectedElement.id = idInput.value;
            }
        });
    }

    const placeholderInput = document.getElementById('input-custom-placeholder');
    if (placeholderInput) {
        placeholderInput.addEventListener('input', () => {
            if (currentSelectedElement) {
                currentSelectedElement.setAttribute('placeholder', placeholderInput.value);
            }
        });
    }

    const typeButtons = document.querySelectorAll('.input-menu .flex-col-align button.btn-input');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement;
            group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const newType = btn.textContent.trim().toLowerCase();
            if (currentSelectedElement && currentSelectedElement.tagName.toLowerCase() === 'input') {
                currentSelectedElement.setAttribute('type', newType);
            }
        });
    });
    const requiredContainers = document.querySelectorAll('.input-menu [data-setting="required"]');
    requiredContainers.forEach(container => {
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (currentSelectedElement) {
                    if (btn.textContent.trim().toLowerCase() === 'yes') {
                        currentSelectedElement.setAttribute('required', 'true');
                    } else {
                        currentSelectedElement.removeAttribute('required');
                    }
                }
            });
        });
    });

    const autofocusContainers = document.querySelectorAll('.input-menu [data-setting="autofocus"]');
    autofocusContainers.forEach(container => {
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (currentSelectedElement) {
                    if (btn.textContent.trim().toLowerCase() === 'yes') {
                        currentSelectedElement.setAttribute('autofocus', 'true');
                    } else {
                        currentSelectedElement.removeAttribute('autofocus');
                    }
                }
            });
        });
    });
}


function showSelectOptionMenu() {
    document.querySelector('.select-option-menu').classList.remove('none');
}
function hideSelectOptionMenu() {
    document.querySelector('.select-option-menu').classList.add('none');
}

document.querySelector('.close-select-option-menu').addEventListener('click', hideSelectOptionMenu);

document.querySelectorAll('select.w2-select').forEach(selectEl => {
    selectEl.addEventListener('click', () => {
        currentSelectedElement = selectEl;
        showSelectOptionMenu();

        const currentName = selectEl.getAttribute('name') || "";
        document.getElementById('select-option-custom-name').value = currentName;


        const isRequired = selectEl.hasAttribute('required');
        const reqValue = isRequired ? "Yes" : "No";
        document.querySelectorAll('.button-select-option-setting[data-setting="required"] .btn-select-option')
            .forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-value') === reqValue);
            });
        const isMultiply = selectEl.hasAttribute('multiply');
        const mulValue = isMultiply ? "Yes" : "No";
        document.querySelectorAll('.button-select-option-setting[data-setting="allowMultiply"] .btn-select-option')
            .forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-value') === mulValue);
            });
    });
});


document.getElementById('select-option-custom-name').addEventListener('input', function (e) {
    const newName = e.target.value.trim();
    console.log("Updated Option Name:", newName);
    if (currentSelectedElement && currentSelectedElement.tagName.toLowerCase() === 'select') {
        currentSelectedElement.setAttribute('name', newName);

        const placeholderOption = currentSelectedElement.querySelector('option[value=""]');
        if (placeholderOption) {
            placeholderOption.textContent = newName || "Select one...";
        }
    }
});


function handleOptionButtonClick(event) {
    const btn = event.currentTarget;
    const container = btn.parentElement;
    const settingType = container.getAttribute('data-setting');

    container.querySelectorAll('.btn-select-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedValue = btn.getAttribute('data-value');
    console.log(`Updated ${settingType}:`, selectedValue);

    if (currentSelectedElement && currentSelectedElement.tagName.toLowerCase() === 'select') {
        if (settingType === "required") {
            if (selectedValue === "Yes") {
                currentSelectedElement.setAttribute("required", "");
            } else {
                currentSelectedElement.removeAttribute("required");
            }
        } else if (settingType === "allowMultiply") {
            if (selectedValue === "Yes") {
                currentSelectedElement.setAttribute("multiply", "");
            } else {
                currentSelectedElement.removeAttribute("multiply");
            }
        }
    }
}

document.querySelectorAll('.button-select-option-setting .btn-select-option').forEach(btn => {
    btn.addEventListener('click', handleOptionButtonClick);
});


function handleFormAndSelectClick(e) {

    const selectEl = e.target.closest('select');
    const formEl = e.target.closest('form');

    if (selectEl) {
        currentSelectedElement = selectEl;

        document.querySelector('.select-option-menu').classList.remove('none');

        const currentName = selectEl.getAttribute('name') || "";
        document.getElementById('select-option-custom-name').value = currentName;
        return;
    }

    if (formEl) {
        currentSelectedElement = formEl;

        document.querySelector('.form-menu').classList.remove('none');
        const currentName = formEl.getAttribute('name') || "";
        document.getElementById('form-custom-name').value = currentName;
        return;
    }
}


let addElement1 = document.querySelector('.box-add');
let addElement2 = document.querySelector('.box-add2');
/* let addElement3 = document.querySelector('.box-add3'); */
let addElement4 = document.querySelector('.box-add4');
let addElement5 = document.querySelector('.box-add5');
let addElement6 = document.querySelector('.box-add6');
let addElement7 = document.querySelector('.box-add7');
let addElement8 = document.querySelector('.box-add8');
let addElement9 = document.querySelector('.box-add9');

let boxAdding = document.querySelector('.box-adding-html');
let boxNavigator = document.querySelector('.box-adding-navigator');
/* let boxPages = document.querySelector('.box-adding-pages'); */
let boxAssets = document.querySelector('.box-adding-assets');
let boxDatabase = document.querySelector('.box-adding-database');
let boxLaravel = document.querySelector('.box-adding-laravel');
let boxCss = document.querySelector('.box-adding-css');
let boxJs = document.querySelector('.box-adding-js');
let boxThreeJs = document.querySelector('.box-adding-threejs');



function toggleVisibilityBox(targetBox, targetButton) {

    const isActive = targetBox.classList.contains('active') && targetButton.classList.contains('active');


    boxAdding.classList.remove('active');
    boxNavigator.classList.remove('active');
    boxAssets.classList.remove('active');
    boxDatabase.classList.remove('active');

    addElement1.classList.remove('active');
    addElement2.classList.remove('active');
    addElement4.classList.remove('active');
    addElement5.classList.remove('active');

    if (!isActive) {
        targetBox.classList.add('active');
        targetButton.classList.add('active');
    }
}


addElement1.addEventListener('click', () => toggleVisibilityBox(boxAdding, addElement1));
addElement2.addEventListener('click', () => toggleVisibilityBox(boxNavigator, addElement2));
addElement4.addEventListener('click', () => toggleVisibilityBox(boxAssets, addElement4));
addElement5.addEventListener('click', () => toggleVisibilityBox(boxDatabase, addElement5));







const classicMenu = document.querySelector('.classic-menu');
classicMenu.classList.remove('none');


const menuMap = {
    'box-second-menu-classic': '.classic-menu',
    'box-second-menu-css': '.css-menu',
};

Object.keys(menuMap).forEach(buttonClass => {
    const button = document.querySelector(`.${buttonClass}`);
    const targetMenuSelector = menuMap[buttonClass];

    button.addEventListener('click', () => {
        const targetMenu = document.querySelector(targetMenuSelector);


        if (!targetMenu.classList.contains('none')) {
            targetMenu.classList.add('none');
        } else {

            Object.values(menuMap).forEach(menuSelector => {
                document.querySelector(menuSelector).classList.add('none');
            });


            targetMenu.classList.remove('none');
        }
    });
});



let layoutsBtn = document.querySelector('.layouts');
let elementsBtn = document.querySelector('.elements');

let addOption = document.querySelector('.menu-box-add');
let layoutOption = document.querySelector('.menu-box-layout');


layoutsBtn.onclick = function () {
    layoutsBtn.classList.add('active')
    elementsBtn.classList.remove('active')
    layoutOption.classList.add('active')
    addOption.classList.remove('active')

}
elementsBtn.onclick = function () {
    layoutsBtn.classList.remove('active')
    elementsBtn.classList.add('active')
    layoutOption.classList.remove('active')
    addOption.classList.add('active')
}

let otherMenu = document.querySelector('.other-menu');

/* otherMenu.onclick = function () {
    otherMenu.classList.toggle('active')
} */

document.addEventListener('click', function (event) {
    // Check if the click was outside the otherMenu element
    /* if (!otherMenu.contains(event.target)) {
        otherMenu.classList.remove('active');
    } */

    if (currentPositionAdd && !event.target.closest('.select')) {
        currentPositionAdd.classList.remove('show');
        currentPositionAdd = null;
    }


    const backgroundMenu = document.querySelector('.background-menu');

    if (!backgroundMenu.contains(event.target) &&
        !event.target.closest('.background-style') &&
        !event.target.closest('.flex-sb-align')) {
        backgroundMenu.classList.add('none');
    }
});




let styleGroup2 = document.querySelector('.style-group2');
let styleGroup3 = document.querySelector('.style-group3');


let boxLayout = document.querySelector('.box-layout');
let boxSpacing = document.querySelector('.box-spacing');
let boxSize = document.querySelector('.box-size');
let boxPosition = document.querySelector('.box-position');
let boxTypography = document.querySelector('.box-typography');
let boxBackground = document.querySelector('.box-background');
let boxBorder = document.querySelector('.box-border');
let boxRadius = document.querySelector('.box-radius');
let boxShadows = document.querySelector('.box-shadows');
let boxOther = document.querySelector('.box-other');
let boxTransform = document.querySelector('.box-transform');
let boxAnimation = document.querySelector('.box-animation');
let boxHover = document.querySelector('.box-hover');
let boxMedia = document.querySelector('.box-media');




let layout = document.querySelector('.layout');
let spacing = document.querySelector('.spacing');
let size = document.querySelector('.size');
let position = document.querySelector('.position');
let typography = document.querySelector('.typography');
let background = document.querySelector('.background');
let border = document.querySelector('.border');
let radius = document.querySelector('.radius');
let shadows = document.querySelector('.shadows');
let other = document.querySelector('.other');
let transform = document.querySelector('.transform');
let animation = document.querySelector('.animation');
let hover = document.querySelector('.hover');
let media = document.querySelector('.media');

let resetStyles = document.querySelectorAll('.reset-styles');

boxLayout.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    layout.classList.add('show')
}

boxSpacing.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    spacing.classList.add('show')
}

boxSize.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    size.classList.add('show')
}

boxPosition.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    position.classList.add('show')
}

boxTypography.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    typography.classList.add('show')
}

boxBackground.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    background.classList.add('show')
}

boxBorder.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    border.classList.add('show')
}


boxRadius.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    radius.classList.add('show')
}


boxShadows.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    shadows.classList.add('show')
}

boxOther.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    other.classList.add('show')
}


boxTransform.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    transform.classList.add('show')
}

boxAnimation.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    animation.classList.add('show')
}

boxHover.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    hover.classList.add('show')
}

boxMedia.onclick = function () {
    styleGroup2.classList.add('none')
    styleGroup3.classList.add('show')
    media.classList.add('show')
}

/* const animationMenuContainer = document.querySelector('.keyframe-menu.none');
// or if you’ve multiple .media-menu, pick the correct one

if (boxAnimation && animationMenuContainer) {
    boxAnimation.addEventListener('click', function () {
        // remove 'none' class => it becomes visible
        animationMenuContainer.classList.remove('none');
    });
}

// 2) The .remove-media-menu that hides it again
const removeAnimationBtn = document.querySelector('.remove-keyframe-menu');
if (removeAnimationBtn && animationMenuContainer) {
    removeAnimationBtn.addEventListener('click', function () {
        // re-add 'none'
        animationMenuContainer.classList.add('none');
    });
}


const mediaMenuContainer = document.querySelector('.media-menu.none');
// or if you’ve multiple .media-menu, pick the correct one

if (boxMedia && mediaMenuContainer) {
    boxMedia.addEventListener('click', function () {
        // remove 'none' class => it becomes visible
        mediaMenuContainer.classList.remove('none');
    });
}

// 2) The .remove-media-menu that hides it again
const removeMediaBtn = document.querySelector('.remove-media-menu');
if (removeMediaBtn && mediaMenuContainer) {
    removeMediaBtn.addEventListener('click', function () {
        // re-add 'none'
        mediaMenuContainer.classList.add('none');
    });
}

const hoverMenuContainer = document.querySelector('.hover-menu.none');
// or if you’ve multiple .media-menu, pick the correct one

if (boxHover && hoverMenuContainer) {
    boxHover.addEventListener('click', function () {
        // remove 'none' class => it becomes visible
        hoverMenuContainer.classList.remove('none');
    });
}

// 2) The .remove-media-menu that hides it again
const removeHoverBtn = document.querySelector('.remove-hover-menu');
if (removeHoverBtn && hoverMenuContainer) {
    removeHoverBtn.addEventListener('click', function () {
        // re-add 'none'
        hoverMenuContainer.classList.add('none');
    });
} */


const menuContainers = {
    animation: document.querySelector('.keyframe-menu'),
    media: document.querySelector('.media-menu'),
    hover: document.querySelector('.hover-menu')
};

function showOnlyMenu(targetKey) {
    Object.entries(menuContainers).forEach(([key, container]) => {
        if (!container) return;
        if (key === targetKey) {
            container.classList.remove('none');
        } else {
            container.classList.add('none');
        }
    });
}


if (boxAnimation) {
    boxAnimation.addEventListener('click', function () {
        showOnlyMenu('animation');
    });
}

const removeAnimationBtn = document.querySelector('.remove-keyframe-menu');
if (removeAnimationBtn) {
    removeAnimationBtn.addEventListener('click', function () {

        menuContainers.animation.classList.add('none');
    });
}

if (boxMedia) {
    boxMedia.addEventListener('click', function () {
        showOnlyMenu('media');
    });
}

const removeMediaBtn = document.querySelector('.remove-media-menu');
if (removeMediaBtn) {
    removeMediaBtn.addEventListener('click', function () {
        menuContainers.media.classList.add('none');
    });
}

if (boxHover) {
    boxHover.addEventListener('click', function () {
        showOnlyMenu('hover');
    });
}

const removeHoverBtn = document.querySelector('.remove-hover-menu');
if (removeHoverBtn) {
    removeHoverBtn.addEventListener('click', function () {
        menuContainers.hover.classList.add('none');
    });
}




resetStyles.forEach(resetStyles => {
    resetStyles.onclick = function () {
        styleGroup2.classList.remove('none')
        styleGroup3.classList.remove('show')
        layout.classList.remove('show')
        spacing.classList.remove('show')
        size.classList.remove('show')
        position.classList.remove('show')
        shadows.classList.remove('show')
        typography.classList.remove('show')
        background.classList.remove('show')
        border.classList.remove('show')
        radius.classList.remove('show')
        other.classList.remove('show')
        transform.classList.remove('show')
        animation.classList.remove('show')
        hover.classList.remove('show')
        media.classList.remove('show')
    }
});



function disableAllEditingModes() {

    mediaEditingMode = false;
    currentMediaQuery = null;
    document.querySelectorAll('.media-list li').forEach(li => li.classList.remove('media-selected'));


    hoverEditingMode = false;
    currentHoverClass = null;
    const hoverList = document.querySelector('.hover-list');
    if (hoverList) {
        hoverList.querySelectorAll('li').forEach(li => li.classList.remove('hover-selected'));
    }


    editingKeyframeMode = false;
    currentKeyframeIndex = -1;
    document.querySelectorAll('.keyframe-list li').forEach(li => li.classList.remove('keyframe-selected'));
}


document.addEventListener("DOMContentLoaded", function () {
    const menuSelectors = [
        '.media-menu',
        '.hover-menu',
        '.keyframe-menu',
        '.animation-menu',
        '.little-menu',
        '.background-menu',
        '.image-menu',
        '.video-menu',
        '.text-menu',
        '.form-menu',
        '.label-menu',
        '.input-menu',
        '.textarea-menu',
        '.radio-menu',
        '.select-option-menu',
        '.checkbox-menu',
        '.form-button-menu'
    ];

    menuSelectors.forEach(selector => {
        const menu = document.querySelector(selector);
        if (!menu) return;


        let dragHandle = menu.querySelector('.drag-handle');
        if (!dragHandle) {
            dragHandle = document.createElement('div');
            dragHandle.classList.add('drag-handle');

            menu.prepend(dragHandle);
        }

        let isResizing = false;
        let startY = 0;
        let startHeightPx = 0;
        const maxVh = 77;

        dragHandle.addEventListener('mousedown', function (e) {
            isResizing = true;
            startY = e.clientY;
            startHeightPx = menu.offsetHeight;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function (e) {
            if (!isResizing) return;
            const dy = startY - e.clientY;
            let newHeightPx = startHeightPx + dy;
            const maxHeightPx = (maxVh / 100) * window.innerHeight;
            newHeightPx = Math.max(0, Math.min(newHeightPx, maxHeightPx));
            const newHeightVh = (newHeightPx / window.innerHeight) * 100;
            menu.style.height = newHeightVh + 'vh';
        });


        document.addEventListener('mouseup', function () {
            if (isResizing) {
                isResizing = false;
            }
        });
    });
});






let Select1 = document.querySelector('.select1');

const positionText = document.getElementById('positionText');


const selectElements = document.querySelectorAll('.select');


let currentPositionAdd = null;

// Loop through each select element and add an event listener
/* selectElements.forEach(function (select) {
    select.addEventListener('click', function (event) {
        const positionAdd = select.querySelector('.position-add');

        // Close any other open positionAdd if the user clicks another select
        if (currentPositionAdd && currentPositionAdd !== positionAdd) {
            currentPositionAdd.classList.remove('show');
        }

        // Toggle the 'show' class for the relevant 'position-add'
        if (positionAdd.classList.contains('show')) {
            positionAdd.classList.remove('show');  // Hide if already visible
        } else {
            positionAdd.classList.add('show');     // Show if hidden
        }

        // Update the currently open positionAdd
        currentPositionAdd = positionAdd;

        // Stop propagation only if necessary (e.g., to avoid closing the menu)
        if (!event.target.classList.contains('position-choice') &&
            !event.target.classList.contains('text-choice1') &&
            !event.target.classList.contains('text-choice2') &&
            !event.target.classList.contains('clip-choice') &&
            !event.target.classList.contains('align-choice1') &&
            !event.target.classList.contains('align-choice2') &&
            !event.target.classList.contains('blending-choice') &&
            !event.target.classList.contains('cursor-choice')) {
            event.stopPropagation(); // Keep this for toggling the menu without closing
        }
    });
}); */



let currentDropdown = null;

document.querySelectorAll('.select-position-add').forEach(select => {
    select.addEventListener('click', function (e) {
        e.stopPropagation();
        const dropdown = this.querySelector('.position-css-add');

        if (currentDropdown && currentDropdown !== dropdown) {
            currentDropdown.classList.remove('show');
        }

        dropdown.classList.toggle('show');
        currentDropdown = dropdown;


    });
});

const hoverPreview = {
    currentPreview: null,
    isHoverInteraction: false,
    originalValues: new Map(),

    applyPreview(element) {
        if (!currentSelectedElement || this.currentPreview === element) return;

        const className = currentSelectedElement.classList[0];
        const css = element.getAttribute('add-css-button').trim();
        const colonIndex = css.indexOf(':');
        if (colonIndex === -1) return;

        const prop = css.slice(0, colonIndex).trim();
        const value = css.slice(colonIndex + 1).trim().replace(/;$/, '');


        if (!this.originalValues.has(className)) {
            this.originalValues.set(className, {
                prop,
                value: getCssValueForClass(className, prop)
            });
        }

        this.clearPreview();
        this.isHoverInteraction = true;

        this.currentPreview = { element, prop, value };
        updateCssForClass(className, prop, value);
    },

    clearPreview() {
        if (this.currentPreview && currentSelectedElement) {
            const className = currentSelectedElement.classList[0];
            const original = this.originalValues.get(className);

            // Restore original value properly
            if (original && original.value !== null) {
                updateCssForClass(className, original.prop, original.value);
            } else {
                removeCssPropertyFromClass(className, original.prop);
            }

            this.originalValues.delete(className);
            this.currentPreview = null;
        }
        this.isHoverInteraction = false;
    }
};




document.querySelectorAll('.description-css').forEach(descriptionCss => {
    const positionAdd = descriptionCss.closest('.position-css-add');
    const defaultParagraph = descriptionCss.querySelector('p:first-child');

    positionAdd.querySelectorAll('.d-explain').forEach(choice => {
        choice.addEventListener('mouseenter', function (e) {
            if (!currentSelectedElement) return;

            // Show description
            const descriptionIndex = this.dataset.description;
            const targetParagraph = descriptionCss.querySelector(`p:nth-child(${descriptionIndex})`);

            descriptionCss.querySelectorAll('p').forEach(p => p.classList.remove('show'));
            if (targetParagraph) {
                targetParagraph.classList.add('show');
                hoverPreview.isDescriptionVisible = true;
            }
        });

        choice.addEventListener('mouseleave', function (e) {
            if (hoverPreview.isDescriptionVisible) {
                descriptionCss.querySelectorAll('p').forEach(p => p.classList.remove('show'));
                defaultParagraph.classList.add('show');
                hoverPreview.isDescriptionVisible = false;
            }
        });
    });
});




let classicSimple = document.querySelector('.classic-simple');



classicSimple.onclick = function () {
    classicSimple.classList.toggle('active')
}




function updatePreviewContentSize() {
    const width = previewContent.offsetWidth;
    const displayElement = document.getElementById('preview-size-display');

    displayElement.innerHTML = `${width} px`;
}




document.querySelectorAll('.btn-image.image-upload-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const assetsContainer = document.querySelector('.box-adding-assets');
        if (assetsContainer) {
            assetsContainer.classList.add('active');
            assetsContainer.classList.remove('none');
        }
    });
});


document.querySelectorAll('.btn-image.alt-image-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.classList.toggle('active');
        if (!currentSelectedElement || currentSelectedElement.tagName.toLowerCase() !== 'img') return;

        if (this.classList.contains('active')) {

            const assetPreview = document.querySelector('.image-database-change');
            let altText = "";
            if (assetPreview && assetPreview.src) {
                altText = fileNameFromUrl(assetPreview.src);
            }
            currentSelectedElement.alt = altText;
            console.log("Alt text set to:", altText);
        } else {
            currentSelectedElement.alt = "";
            console.log("Alt text cleared");
        }
    });
});


function handleImageResize() {
    if (!currentSelectedElement || currentSelectedElement.tagName.toLowerCase() !== 'img') return;
    const widthInput = document.querySelector('.input-number.width-image');
    const heightInput = document.querySelector('.input-number.height-image');
    if (!widthInput || !heightInput) return;

    let widthVal = widthInput.value.trim();
    let heightVal = heightInput.value.trim();

    if (widthVal.toLowerCase() === "auto" || widthVal === "") {
        currentSelectedElement.style.width = "auto";
    } else {
        currentSelectedElement.style.width = isNaN(widthVal) ? widthVal : widthVal + "px";
    }
    if (heightVal.toLowerCase() === "auto" || heightVal === "") {
        currentSelectedElement.style.height = "auto";
    } else {
        currentSelectedElement.style.height = isNaN(heightVal) ? heightVal : heightVal + "px";
    }
}

document.querySelectorAll('.input-number.width-image, .input-number.height-image')
    .forEach(input => {
        input.addEventListener('input', handleImageResize);
    });


window.addEventListener('resize', updatePreviewContentSize);


const imgFull2 = document.getElementById('img-full2');
const imgMedium = document.getElementById('img-medium');
const imgSmall = document.getElementById('img-small');

imgFull2.addEventListener('click', function () {
    previewContent.style.removeProperty('width');
    updatePreviewContentSize(); 
});

imgMedium.addEventListener('click', function () {
    previewContent.style.width = '55%';
    updatePreviewContentSize(); 

});

imgSmall.addEventListener('click', function () {
    previewContent.style.width = '22%';
    updatePreviewContentSize(); 

});


updatePreviewContentSize();


document.getElementById('full-preview').addEventListener('click', function () {
    const previewContent = document.getElementById('preview-content');

    previewContent.classList.add('fullscreen');
    previewContent.style.removeProperty('width');

    let closeBtn = document.getElementById('close-fullscreen');
    if (!closeBtn) {

        closeBtn = document.createElement('div');
        closeBtn.id = 'close-fullscreen';
        closeBtn.className = 'close-fullscreen-btn'; 

        const closeIcon = document.createElement('img');
        closeIcon.src = '/Icon/icons8-arrow-96.png';
        closeIcon.alt = 'Close Fullscreen';
        closeIcon.className = 'close-fullscreen-icon';

        closeBtn.appendChild(closeIcon);

        closeBtn.style.position = 'fixed';
        closeBtn.style.bottom = '45px';
        closeBtn.style.left = '40px';
        closeBtn.style.zIndex = '10000';

        previewContent.appendChild(closeBtn);

        closeBtn.addEventListener('click', function () {
            previewContent.classList.remove('fullscreen');
            closeBtn.remove();
        });
    }
});



// Variables
/* let DivCounter = 0;
const htmlPreview = document.getElementById('html-preview');
const cssPreview = document.getElementById('css-preview');
const codeMenu = document.getElementById('code-menu');
const openCodeMenuButton = document.getElementById('open-code-menu');

// Toggle Code Menu
openCodeMenuButton.addEventListener('click', () => {
    codeMenu.classList.toggle('hidden');
});

// Drag and Drop Logic (Example)
function createDiv() {
    DivCounter++;
    const newDiv = document.createElement('div');
    newDiv.classList.add(`Div${DivCounter}`, 'w2-engine');
    newDiv.textContent = `Div ${DivCounter}`;
    newDiv.style.border = '1px solid black';
    newDiv.style.padding = '10px';
    previewContent.appendChild(newDiv);
    updatePreviews();
}

// Update Previews
function updatePreviews() {
    // Update HTML Preview
    htmlPreview.value = previewContent.innerHTML;

    // Update CSS Preview
    const styles = {};
    previewContent.querySelectorAll('*').forEach((el) => {
        el.classList.forEach((className) => {
            if (!styles[className]) {
                styles[className] = getComputedStyle(el);
            }
        });
    });

    cssPreview.value = Object.entries(styles)
        .map(([className, style]) => {
            return `.${className} {
                ${Array.from(style).map((prop) => `${prop}: ${style.getPropertyValue(prop)};`).join('\n')}
            }`;
        })
        .join('\n\n');
}

// File Download Logic
document.getElementById('download-files').addEventListener('click', () => {
    // Generate index.html
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${previewContent.innerHTML}
</body>
</html>`;

    // Generate style.css
    const cssContent = cssPreview.value;

    // Download files
    downloadFile('index.html', htmlContent);
    downloadFile('style.css', cssContent);
});

// Helper: Download File
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Example Usage: Adding a Div
document.addEventListener('DOMContentLoaded', () => {
    createDiv(); // Add an example div
}); */




const codeBg = document.getElementById('code-bg');
const codeMenu = document.getElementById('code-menu');
const openCodeMenuButton = document.getElementById('open-code-menu');
const htmlTab = document.getElementById('html-tab');
const cssTab = document.getElementById('css-tab');
const downloadHtmlButton = document.getElementById('download-html');
const downloadCssButton = document.getElementById('download-css');
const htmlPreview = document.getElementById('html-preview');
const cssPreview = document.getElementById('css-preview');

let classCounters = {};

htmlTab.addEventListener('click', () => {
    htmlTab.classList.add('active');
    cssTab.classList.remove('active');
    htmlPreview.classList.remove('hidden');
    cssPreview.classList.add('hidden');
    downloadHtmlButton.classList.remove('hidden');
    downloadCssButton.classList.add('hidden');
});

cssTab.addEventListener('click', () => {
    cssTab.classList.add('active');
    htmlTab.classList.remove('active');
    cssPreview.classList.remove('hidden');
    htmlPreview.classList.add('hidden');
    downloadCssButton.classList.remove('hidden');
    downloadHtmlButton.classList.add('hidden');
});

downloadHtmlButton.addEventListener('click', () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${cleanHTML(previewContent.innerHTML)}
</body>
</html>`;
    downloadFile('index.html', htmlContent);
});

downloadCssButton.addEventListener('click', () => {
    const dynamicStyles = [
        document.getElementById('preview-dynamic-styles'),
        document.getElementById('dynamic-styles'),
        document.getElementById('dynamic-hover-styles'),
        document.getElementById('dynamic-media-styles')
    ];

    let combinedCSS = '';
    dynamicStyles.forEach(styleTag => {
        if (styleTag) {
            combinedCSS += styleTag.textContent.trim() + "\n\n";
        }
    });

    combinedCSS += generateAllAnimationsCSS();


    combinedCSS = combinedCSS.replace(/#preview-content\s*/g, "");

    const { filtered, atRules } = removeAtRules(combinedCSS);

    const mergedCSS = mergeCombinedCSS(filtered);

    const finalCSS = mergedCSS + "\n\n" + atRules;

    const formattedCSS = cleanCSS(finalCSS);
    console.log("[DEBUG] Formatted CSS for download:", formattedCSS);

    downloadFile('style.css', formattedCSS);
});



function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

function createDiv() {
    updatePreviews();
}

const observer = new MutationObserver(() => {
    updatePreviews();
});

observer.observe(previewContent, { childList: true, attributes: true, subtree: true });

function cleanHTML(html) {
    const container = document.createElement('div');
    container.innerHTML = html;

    container.querySelectorAll('*').forEach((el) => {
        el.removeAttribute('id');
        el.removeAttribute('data-id');
        el.removeAttribute('draggable');
        el.classList.remove('selected', 'hovering');

        if (el.classList.length > 0) {
            el.className = el.classList[0];
        } else {
            el.removeAttribute('class');
        }
    });

    return container.innerHTML
        .replace(/></g, (match, offset, fullString) => {

            const before = fullString[offset - 1];
            const after = fullString[offset + match.length];
            if (before === '/' || after === '/') {
                return match;
            }
            return '>\n<';
        })
        .trim();
}

function cleanCSS(css) {
    css = css.replace(/\s+/g, ' ').trim();

    let formatted = "";
    let indent = 0;
    const indentString = "    ";

    const tokens = css.split(/([{}])/).filter(token => token.trim() !== "");

    tokens.forEach(token => {
        token = token.trim();
        if (token === "{") {
            formatted += " " + token + "\n";
            indent++;
            formatted += indentString.repeat(indent);
        } else if (token === "}") {
            indent--;
            formatted = formatted.trimEnd();
            formatted += "\n" + indentString.repeat(indent) + token + "\n";
            if (indent > 0) {
                formatted += indentString.repeat(indent);
            }
        } else {

            if (token.startsWith("@media")) {
                formatted += "\n" + token + " ";
            } else {
                if (token.indexOf(";") !== -1) {
                    const declarations = token.split(";").map(decl => decl.trim()).filter(Boolean);
                    declarations.forEach((decl, i) => {
                        formatted += decl + (i < declarations.length - 1 ? ";\n" + indentString.repeat(indent) : "; ");
                    });
                } else {
                    formatted += token + " ";
                }
            }
        }
    });

    return formatted.trim();
}
/* function updatePreviews() {
    // Build the full HTML structure
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${cleanHTML(previewContent.innerHTML)}
</body>
</html>`;
    htmlPreview.value = htmlContent;

    // Extract and clean CSS for the CSS Preview
    const styleTag = document.getElementById('dynamic-styles');
    const rawCSS = styleTag ? styleTag.innerHTML : '';
    cssPreview.value = cleanCSS(rawCSS);
}
 */

let combinedCSS = "";

const { filtered, atRules } = removeAtRules(combinedCSS);

const mergedCSS = mergeCombinedCSS(filtered);

const finalCSS = mergedCSS + "\n\n" + atRules;



function mergeCombinedCSS(cssText) {
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    const rulesMap = {};

    let match;
    while ((match = ruleRegex.exec(cssText)) !== null) {
        let selectorPart = match[1].trim();
        if (selectorPart.startsWith("@")) {
            continue;
        }

        let selectors = selectorPart.split(",").map(s => s.trim());
        const declarationsBlock = match[2].trim();

        const decls = {};
        declarationsBlock.split(";").forEach(decl => {
            decl = decl.trim();
            if (!decl) return;
            const colonIndex = decl.indexOf(":");
            if (colonIndex === -1) return;
            const prop = decl.slice(0, colonIndex).trim();
            const val = decl.slice(colonIndex + 1).trim();
            decls[prop] = val;
        });

        selectors.forEach(selector => {
            if (!rulesMap[selector]) {
                rulesMap[selector] = {};
            }
            Object.assign(rulesMap[selector], decls);
        });
    }


    let mergedCSS = "";
    for (const selector in rulesMap) {
        mergedCSS += `${selector} {\n`;
        for (const prop in rulesMap[selector]) {
            mergedCSS += `    ${prop}: ${rulesMap[selector][prop]};\n`;
        }
        mergedCSS += `}\n\n`;
    }
    return mergedCSS.trim();
}


function updatePreviews() {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    ${cleanHTML(previewContent.innerHTML)}
  </body>
</html>`;
    htmlPreview.value = htmlContent;

    let combinedCSS = "";

    const previewStyleTag = document.getElementById("preview-dynamic-styles");
    if (previewStyleTag) {
        combinedCSS += previewStyleTag.textContent.trim() + "\n\n";
    }
    const dynamicStyles = [
        document.getElementById('dynamic-styles'),
        document.getElementById('dynamic-hover-styles'),
        document.getElementById('dynamic-media-styles')
    ];
    dynamicStyles.forEach(styleTag => {
        if (styleTag) {
            combinedCSS += styleTag.textContent.trim() + "\n\n";
        }
    });
    combinedCSS += generateAllAnimationsCSS();

    combinedCSS = combinedCSS.replace(/#preview-content\s*/g, "");

    const { filtered, atRules } = removeAtRules(combinedCSS);

    const mergedCSS = mergeCombinedCSS(filtered);

    const finalCSS = mergedCSS + "\n\n" + atRules;

    cssPreview.value = cleanCSS(finalCSS);
}

function removeAtRules(cssText) {
    const atRules = [];
    const regex = /@[^;{]+\{(?:[^{}]*\{[^{}]*\}[^{}]*)+\}/g;
    const filtered = cssText.replace(regex, function (match) {
        atRules.push(match);
        return "";
    });
    return { filtered: filtered.trim(), atRules: atRules.join("\n\n") };
}


function generateAllAnimationsCSS() {
    let animationCSS = '';
    Object.entries(elementAnimations).forEach(([className, anims]) => {
        anims.forEach(anim => {
            animationCSS += `.${className} {\n  animation: ${anim.animationName} ${anim.duration} ${anim.timingFunction} ${anim.delay} ${anim.iterationCount} ${anim.direction} ${anim.fillMode} ${anim.playState};\n}\n\n`;
            animationCSS += generateKeyframesText(anim, className);
        });
    });
    return animationCSS;
}


// Helper Function: Convert JSON to Media Queries
function jsonToMediaQueries(jsonData) {
    let cssOutput = '';

    // Iterate over each selector in the JSON
    for (const selector in jsonData) {
        const mediaQueries = jsonData[selector];

        // Iterate over each media query for the selector
        for (const mediaQuery in mediaQueries) {
            const properties = mediaQueries[mediaQuery];

            // Check if properties exist and are an object
            if (!properties || typeof properties !== 'object') {
                console.warn(`No valid properties found for ${selector} in ${mediaQuery}`);
                continue;
            }

            // Convert properties to CSS rules
            const propertyList = Object.entries(properties)
                .map(([key, value]) => `    ${key}: ${value};`) // Format each property
                .join('\n');

            // Append the media query block
            cssOutput += `@media ${mediaQuery} {\n`;
            cssOutput += `    .${selector} {\n${propertyList}\n    }\n`;
            cssOutput += `}\n\n`;
        }
    }

    return cssOutput;
}

openCodeMenuButton.addEventListener('click', () => {
    codeBg.classList.remove('hidden');
});

document.addEventListener('click', (event) => {
    if (!codeMenu.contains(event.target) && !openCodeMenuButton.contains(event.target)) {
        codeBg.classList.add('hidden');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    createDiv();
    updatePreviews();
});








const htmlDisplay = document.getElementById('htmlDisplay');
const cssDisplay = document.getElementById('cssDisplay');
const applyCssBtn = document.getElementById('applyCssBtn');
const widthResizer = document.getElementById('widthResizer');


let matchedRules = [];

function findMatchingCSSRules(classes) {
    let results = [];
    let seenSelectors = new Set();

    for (let i = 0; i < document.styleSheets.length; i++) {
        let sheet = document.styleSheets[i];
        try {
            if (sheet.href && new URL(sheet.href).origin !== location.origin) {
                continue;
            }

            const rules = sheet.cssRules || sheet.rules;
            if (!rules) continue;

            for (let j = 0; j < rules.length; j++) {
                let rule = rules[j];
                if (!rule.selectorText || !rule.style) continue;

                const selectorText = rule.selectorText;

                const matches = classes.some(cls => selectorText.includes(`.${cls}`));
                if (matches && !seenSelectors.has(selectorText)) {
                    seenSelectors.add(selectorText);
                    results.push({ selector: selectorText, rule });
                }
            }
        } catch (err) {

            continue;
        }
    }

    return results;
}

function updateCssDisplay() {
    if (!currentSelectedElement) return;

    const classList = Array.from(currentSelectedElement.classList);
    matchedRules = findMatchingCSSRules(classList);

    // Populate the textarea with all matching rules
    const cssText = matchedRules.map(({ selector, rule }) => {
        const properties = Array.from(rule.style)
            .map(prop => `${prop}: ${rule.style.getPropertyValue(prop)};`)
            .join('\n  ');
        return `${selector} {\n  ${properties}\n}`;
    }).join('\n\n');

    cssDisplay.value = cssText;
}


function formatHTML(htmlString) {

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();

    function cleanAndFormat(element, level = 0) {
        if (element.nodeType === 1) { 
            [...element.attributes].forEach(attr => {
                if (attr.name !== 'class') {
                    element.removeAttribute(attr.name);
                }
            });

            let indent = '  '.repeat(level);
            let html = `${indent}<${element.tagName.toLowerCase()}${element.className ? ` class="${element.className}"` : ''
                }>\n`;

            Array.from(element.childNodes).forEach(child => {
                if (child.nodeType === 1) {

                    html += cleanAndFormat(child, level + 1);
                } else if (child.nodeType === 3 && child.nodeValue.trim()) {

                    html += `${'  '.repeat(level + 1)}${child.nodeValue.trim()}\n`;
                }
            });


            html += `${indent}</${element.tagName.toLowerCase()}>\n`;
            return html;
        }
        return ''; 
    }


    const element = tempDiv.firstChild;
    return element ? cleanAndFormat(element).trim() : '';
}


function formatCSSRule(cssText) {
    const curlyIndex = cssText.indexOf('{');
    const curlyEndIndex = cssText.lastIndexOf('}');
    if (curlyIndex === -1 || curlyEndIndex === -1) return cssText;

    const selector = cssText.substring(0, curlyIndex).trim();
    let content = cssText.substring(curlyIndex + 1, curlyEndIndex).trim();

    const properties = content.split(';')
        .map(prop => prop.trim())
        .filter(Boolean);

    const formattedProps = properties
        .map(prop => '  ' + prop + ';')
        .join('\n');

    return `${selector} {\n${formattedProps}\n}`;
}

let isDraggingNumber = false;
let initialY = 0;
let initialValue = 0;
let range = { start: 0, end: 0 };
let unit = '';

cssDisplay.addEventListener('mousedown', function (e) {
    const text = cssDisplay.value;

    const charIndex = cssDisplay.selectionStart; 
    const regex = /(\d+)(px|%|em|rem|vw|vh)?/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        if (charIndex >= start && charIndex <= end) {
            isDraggingNumber = true;
            initialY = e.clientY;
            initialValue = parseInt(match[1], 10);
            range = { start, end };
            unit = match[2] || '';
            cssDisplay.style.cursor = 'ns-resize';
            e.preventDefault(); 
            break;
        }
    }
});

cssDisplay.addEventListener('focus', function () {
    cssDisplay.style.cursor = 'text'; 
});

document.addEventListener('mousemove', function (e) {
    if (!isDraggingNumber) return;

    const deltaY = initialY - e.clientY;
    const sensitivity = 1; 
    const newValue = initialValue + Math.round(deltaY / sensitivity);

    const text = cssDisplay.value;
    const newText = text.substring(0, range.start) + newValue + unit + text.substring(range.end);
    cssDisplay.value = newText;


    range.end = range.start + String(newValue).length + unit.length;

    applyCSSFromTextarea();

    e.preventDefault(); 
});


document.addEventListener('mouseup', function () {
    if (isDraggingNumber) {
        isDraggingNumber = false;
        cssDisplay.style.cursor = ''; 
    }
});

function applyCSSFromTextarea() {
    if (!currentSelectedElement || matchedRules.length === 0) return;

    const userCSS = cssDisplay.value;

    matchedRules.forEach(({ selector, rule }) => {
        const escapedSelector = selector.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        const blockRegex = new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, 'i');
        const match = userCSS.match(blockRegex);

        if (!match) return;

        const propBlock = match[1].trim();
        const lines = propBlock.split(';').map(line => line.trim()).filter(Boolean);

        lines.forEach(line => {
            const [property, value] = line.split(':').map(x => x.trim());
            if (property && value) {
                rule.style.setProperty(property, value.replace(';', ''));
            }
        });
    });

    updateCssDisplay();
}


function getCharIndexUnderMouse(event, textarea) {

    const { offsetX, offsetY } = event;
    const charWidth = 7;  
    const rowHeight = 16; 
    const col = Math.floor(offsetX / charWidth);
    const row = Math.floor(offsetY / rowHeight);

    const colsPerRow = Math.floor(textarea.clientWidth / charWidth);
    const charIndex = row * colsPerRow + col;

    if (charIndex < 0 || charIndex > textarea.value.length) {
        return -1;
    }
    return charIndex;
}


const suggestionContainer = document.getElementById('suggestionContainer');

const cssProperties = [
    // Box Model
    'margin:', 'margin: auto;', 'margin: 0;', 'margin-top:', 'margin-right:', 'margin-bottom:', 'margin-left:',
    'padding:', 'padding: 0;', 'padding-top:', 'padding-right:', 'padding-bottom:', 'padding-left:',
    'border:', 'border-width:', 'border-style:', 'border-color:', 'border-top:', 'border-right:', 'border-bottom:', 'border-left:',
    'outline:', 'outline-width:', 'outline-style:', 'outline-color:', 'outline-offset:',

    // Display and Positioning
    'display:', 'display: block;', 'display: inline;', 'display: inline-block;', 'display: flex;', 'display: grid;', 'display: none;', 'display: inline-flex;', 'display: inline-grid;',
    'position:', 'position: static;', 'position: relative;', 'position: absolute;', 'position: fixed;', 'position: sticky;',
    'top:', 'right:', 'bottom:', 'left:',
    'z-index:',

    // Flexbox
    'align-items:', 'align-items: stretch;', 'align-items: center;', 'align-items: flex-start;', 'align-items: flex-end;', 'align-items: baseline;',
    'justify-content:', 'justify-content: flex-start;', 'justify-content: flex-end;', 'justify-content: center;', 'justify-content: space-between;', 'justify-content: space-around;', 'justify-content: space-evenly;',
    'flex-direction:', 'flex-direction: row;', 'flex-direction: row-reverse;', 'flex-direction: column;', 'flex-direction: column-reverse;',
    'flex-wrap:', 'flex-wrap: nowrap;', 'flex-wrap: wrap;', 'flex-wrap: wrap-reverse;',
    'flex:', 'flex-grow:', 'flex-shrink:', 'flex-basis:',
    'align-self:', 'align-content:', 'order:',

    // Grid
    'grid-template-rows:', 'grid-template-rows: none;', 'grid-template-rows: auto;', 'grid-template-rows: 1fr 1fr;', 'grid-template-rows: repeat(2, 1fr);',
    'grid-template-columns:', 'grid-template-columns: none;', 'grid-template-columns: auto;', 'grid-template-columns: 1fr 1fr;', 'grid-template-columns: repeat(2, 1fr);',
    'grid-template-areas:', 'grid-area:',
    'gap:', 'row-gap:', 'column-gap:',
    'grid-row:', 'grid-column:',
    'justify-items:', 'align-items:', 'justify-self:', 'align-self:',

    // Typography
    'font-family:', 'font-family: Arial;', 'font-family: Helvetica;', 'font-family: sans-serif;',
    'font-size:', 'font-size: small;', 'font-size: medium;', 'font-size: large;', 'font-size: x-large;',
    'font-weight:', 'font-weight: normal;', 'font-weight: bold;', 'font-weight: bolder;', 'font-weight: lighter;',
    'font-style:', 'font-style: normal;', 'font-style: italic;', 'font-style: oblique;',
    'font-variant:', 'font-variant: normal;', 'font-variant: small-caps;',
    'line-height:', 'letter-spacing:', 'word-spacing:', 'text-align:', 'text-align: left;', 'text-align: right;', 'text-align: center;', 'text-align: justify;',
    'text-decoration:', 'text-decoration: none;', 'text-decoration: underline;', 'text-decoration: overline;', 'text-decoration: line-through;',
    'text-transform:', 'text-transform: none;', 'text-transform: capitalize;', 'text-transform: uppercase;', 'text-transform: lowercase;',
    'text-indent:', 'text-shadow:', 'white-space:', 'white-space: normal;', 'white-space: nowrap;', 'white-space: pre;', 'white-space: pre-wrap;', 'white-space: pre-line;',
    'word-break:', 'word-break: normal;', 'word-break: break-all;', 'word-break: keep-all;',
    'word-wrap:', 'word-wrap: normal;', 'word-wrap: break-word;',
    'overflow-wrap:', 'overflow-wrap: normal;', 'overflow-wrap: break-word;',

    // Colors and Background
    'color:', 'background:', 'background-color:', 'background-image:', 'background-size:', 'background-position:', 'background-repeat:', 'background-attachment:', 'background-blend-mode:',

    // Borders and Shadows
    'border-radius:', 'border-top-left-radius:', 'border-top-right-radius:', 'border-bottom-left-radius:', 'border-bottom-right-radius:',
    'box-shadow:', 'box-shadow: none;', 'box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);',

    // Sizing
    'width:', 'width: auto;', 'width: 100%;', 'width: fit-content;', 'width: max-content;', 'width: min-content;',
    'height:', 'height: auto;', 'height: 100%;', 'height: fit-content;', 'height: max-content;', 'height: min-content;',
    'max-width:', 'max-height:', 'min-width:', 'min-height:',

    // Overflow and Visibility
    'overflow:', 'overflow: visible;', 'overflow: hidden;', 'overflow: scroll;', 'overflow: auto;',
    'overflow-x:', 'overflow-y:',
    'visibility:', 'visibility: visible;', 'visibility: hidden;', 'visibility: collapse;',

    // Transitions and Animations
    'transition:', 'transition: all 0.3s ease;', 'transition-property:', 'transition-duration:', 'transition-timing-function:', 'transition-delay:',
    'animation:', 'animation-name:', 'animation-duration:', 'animation-timing-function:', 'animation-iteration-count:', 'animation-direction:', 'animation-fill-mode:', 'animation-play-state:', 'animation-delay:',

    // Transformations
    'transform:', 'transform: none;', 'transform: rotate(45deg);', 'transform: scale(1.2);', 'transform: translate(10px, 20px);', 'transform: skew(10deg, 20deg);',
    'transform-origin:',

    // Interactivity
    'cursor:', 'cursor: pointer;', 'cursor: default;', 'cursor: help;', 'cursor: move;',
    'pointer-events:', 'pointer-events: auto;', 'pointer-events: none;',
    'user-select:', 'user-select: none;', 'user-select: auto;', 'user-select: text;',
    'resize:', 'resize: none;', 'resize: both;', 'resize: horizontal;', 'resize: vertical;',

    // Pseudo-elements and Selectors
    ':hover', ':focus', ':active', ':first-child', ':last-child', ':nth-child()', ':nth-of-type()', ':not()', ':before', ':after', ':first-of-type', ':last-of-type', ':only-child', ':only-of-type', ':empty', ':root', ':target', ':enabled', ':disabled', ':checked', ':invalid', ':valid', ':required', ':optional', ':read-only', ':read-write', ':placeholder-shown', ':default', ':in-range', ':out-of-range', ':lang()', ':fullscreen', ':modal', ':has()',

    // Miscellaneous
    'opacity:', 'opacity: 1;', 'opacity: 0.5;',
    'box-sizing:', 'box-sizing: content-box;', 'box-sizing: border-box;',
    'content:', 'quotes:', 'counter-reset:', 'counter-increment:', 'list-style:', 'list-style-type:', 'list-style-position:', 'list-style-image:',
    'table-layout:', 'table-layout: auto;', 'table-layout: fixed;',
    'border-collapse:', 'border-collapse: collapse;', 'border-collapse: separate;',
    'border-spacing:', 'caption-side:', 'empty-cells:', 'empty-cells: show;', 'empty-cells: hide;',
    'vertical-align:', 'vertical-align: baseline;', 'vertical-align: top;', 'vertical-align: middle;', 'vertical-align: bottom;',
    'direction:', 'direction: ltr;', 'direction: rtl;',
    'unicode-bidi:', 'unicode-bidi: normal;', 'unicode-bidi: embed;', 'unicode-bidi: bidi-override;',
    'writing-mode:', 'writing-mode: horizontal-tb;', 'writing-mode: vertical-rl;', 'writing-mode: vertical-lr;',
    'text-orientation:', 'text-orientation: mixed;', 'text-orientation: upright;', 'text-orientation: sideways;',
    'hyphens:', 'hyphens: none;', 'hyphens: manual;', 'hyphens: auto;',
    'tab-size:', 'text-overflow:', 'text-overflow: clip;', 'text-overflow: ellipsis;',
    'clip-path:', 'clip:', 'clip: auto;', 'clip: rect(0, 0, 0, 0);',
    'mask:', 'mask-image:', 'mask-mode:', 'mask-position:', 'mask-size:', 'mask-repeat:', 'mask-origin:', 'mask-clip:', 'mask-composite:',
    'filter:', 'filter: none;', 'filter: blur(5px);', 'filter: brightness(0.5);', 'filter: contrast(200%);', 'filter: grayscale(100%);', 'filter: hue-rotate(90deg);', 'filter: invert(100%);', 'filter: opacity(50%);', 'filter: saturate(200%);', 'filter: sepia(100%);',
    'backdrop-filter:', 'backdrop-filter: none;', 'backdrop-filter: blur(5px);', 'backdrop-filter: brightness(0.5);', 'backdrop-filter: contrast(200%);', 'backdrop-filter: grayscale(100%);', 'backdrop-filter: hue-rotate(90deg);', 'backdrop-filter: invert(100%);', 'backdrop-filter: opacity(50%);', 'backdrop-filter: saturate(200%);', 'backdrop-filter: sepia(100%);',
    'will-change:', 'will-change: auto;', 'will-change: scroll-position;', 'will-change: contents;', 'will-change: transform;',

    // Scroll Behavior
    'scroll-behavior:', 'scroll-behavior: auto;', 'scroll-behavior: smooth;',
    'scroll-snap-type:', 'scroll-snap-type: none;', 'scroll-snap-type: x;', 'scroll-snap-type: y;', 'scroll-snap-type: block;', 'scroll-snap-type: inline;', 'scroll-snap-type: both;',
    'scroll-snap-align:', 'scroll-snap-align: start;', 'scroll-snap-align: end;', 'scroll-snap-align: center;',
    'scroll-margin:', 'scroll-margin-top:', 'scroll-margin-right:', 'scroll-margin-bottom:', 'scroll-margin-left:',
    'scroll-padding:', 'scroll-padding-top:', 'scroll-padding-right:', 'scroll-padding-bottom:', 'scroll-padding-left:',

    // Variables
    '--custom-property:',

    // Media Queries
    '@media screen and (max-width: 768px) {}', '@media print {}', '@media (prefers-color-scheme: dark) {}', '@media (orientation: landscape) {}', '@media (min-resolution: 2dppx) {}',

    // Keyframes
    '@keyframes example { 0% { opacity: 0; } 100% { opacity: 1; } }',

    // Font Face
    '@font-face { font-family: \'CustomFont\'; src: url(\'custom-font.woff2\') format(\'woff2\'); }',

    // Import
    '@import url(\'styles.css\');',

    // Namespace
    '@namespace svg url(http://www.w3.org/2000/svg);'
];

cssDisplay.addEventListener('input', function () {
    const text = cssDisplay.value;
    const cursorPosition = cssDisplay.selectionStart;

    // Extract the word currently being typed
    const beforeCursor = text.substring(0, cursorPosition);
    const match = beforeCursor.match(/([\w-]*)$/); // Match the last word before the cursor
    const currentWord = match ? match[0] : '';

    if (!currentWord) {
        suggestionContainer.style.display = 'none'; // Hide suggestions if no word is being typed
        return;
    }

    // Filter matching properties
    const suggestions = cssProperties.filter(prop => prop.startsWith(currentWord));

    if (suggestions.length > 0) {
        // Populate suggestions
        suggestionContainer.innerHTML = suggestions.map(prop => `<div>${prop}</div>`).join('');
        suggestionContainer.style.display = 'block';

        // Calculate the position for the suggestion dropdown
        const { top, left, height } = getCaretCoordinates(cssDisplay, cursorPosition);

        // Add offset to position the dropdown below the word
        const additionalOffset = 25; // Add 15px to the position for better placement
        suggestionContainer.style.top = `${top + height + additionalOffset + window.scrollY}px`;
        suggestionContainer.style.left = `${left + window.scrollX}px`;
    } else {
        suggestionContainer.style.display = 'none';
    }
});


suggestionContainer.addEventListener('click', function (e) {
    if (e.target && e.target.tagName === 'DIV') {
        const selectedProperty = e.target.textContent;
        const text = cssDisplay.value;
        const cursorPosition = cssDisplay.selectionStart;

        const beforeCursor = text.substring(0, cursorPosition).replace(/[\w-]*$/, selectedProperty);
        const afterCursor = text.substring(cursorPosition);

        cssDisplay.value = beforeCursor + afterCursor;
        cssDisplay.setSelectionRange(beforeCursor.length, beforeCursor.length);
        suggestionContainer.style.display = 'none';

        // Apply the selected property to the first class of the selected element
        if (currentSelectedElement) {
            const firstClass = currentSelectedElement.classList[0] || currentSelectedElement.id;
            if (firstClass) {
                const styleSheet = document.styleSheets[0]; // Assuming you're using the first stylesheet
                const rule = `.${firstClass} { ${selectedProperty}; }`;
                styleSheet.insertRule(rule, styleSheet.cssRules.length);
            }
        }
    }
});

cssDisplay.addEventListener('blur', function () {
    setTimeout(() => {
        suggestionContainer.style.display = 'none';
    }, 100);
});


cssDisplay.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        const text = cssDisplay.value;
        const cursorPosition = cssDisplay.selectionStart;

        const lines = text.substring(0, cursorPosition).split('\n');
        const currentLine = lines[lines.length - 1];
        const leadingSpaces = currentLine.match(/^\s*/)[0];

        const beforeCursor = text.substring(0, cursorPosition);
        const afterCursor = text.substring(cursorPosition);
        const newText = `${beforeCursor}\n${leadingSpaces}`;
        cssDisplay.value = newText + afterCursor;

        cssDisplay.setSelectionRange(newText.length, newText.length);
    }
});

function getCaretCoordinates(element, position) {
    const div = document.createElement('div');
    const style = window.getComputedStyle(element);

    for (const prop of style) {
        div.style[prop] = style[prop];
    }

    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre-wrap';
    div.style.wordWrap = 'break-word';

    document.body.appendChild(div);

    const text = element.value.substring(0, position);
    const marker = document.createElement('span');
    marker.textContent = '\u200b'; 
    div.textContent = text;
    div.appendChild(marker);

    const rect = marker.getBoundingClientRect();
    const lineHeight = parseInt(style.lineHeight, 10) || 20; 
    document.body.removeChild(div);

    return {
        top: rect.top,
        left: rect.left,
        height: lineHeight,
    };
}


function addNewCSSRule(selector, properties) {
    const sheet = document.styleSheets[0]; 
    const ruleText = `${selector} { ${properties} }`;

    try {
        sheet.insertRule(ruleText, sheet.cssRules.length);
    } catch (err) {
        console.warn('Failed to add new CSS rule:', err);
    }
}



document.getElementById('import-code-menu').addEventListener('click', function () {
    const importMenu = document.getElementById('import-menu');
    if (importMenu) {
        importMenu.classList.toggle('active');
    }
});

document.getElementById('import-menu').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

function setupImportDropZones() {
    const htmlBox = document.getElementById('import-html-box');
    const cssBox = document.getElementById('import-css-box');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        [htmlBox, cssBox].forEach(box => {
            box.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        htmlBox.addEventListener(eventName, () => htmlBox.classList.add('highlight'), false);
        cssBox.addEventListener(eventName, () => cssBox.classList.add('highlight'), false);
    });
    ['dragleave', 'drop'].forEach(eventName => {
        htmlBox.addEventListener(eventName, () => htmlBox.classList.remove('highlight'), false);
        cssBox.addEventListener(eventName, () => cssBox.classList.remove('highlight'), false);
    });

    htmlBox.addEventListener('drop', handleHTMLDrop, false);
    function handleHTMLDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        const file = files[0];
        if (file && file.type.match(/text\/html/)) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const htmlContent = event.target.result;
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, "text/html");
                const bodyContent = doc.body.innerHTML;
                const previewContent = document.getElementById('preview-content');
                if (previewContent) {
                    previewContent.innerHTML = bodyContent;
                    console.log("Imported HTML content (body only).");
                }
            };
            reader.readAsText(file);
        } else {
            alert("Please drop a valid HTML file.");
        }
    }

    cssBox.addEventListener('drop', handleCSSDrop, false);

}

document.addEventListener("DOMContentLoaded", setupImportDropZones);

function splitCSS(cssText) {
    const animationMatches = cssText.match(/@(-webkit-)?keyframes[\s\S]+?\}\s*\}/gi) || [];
    const animations = animationMatches.join("\n");
    cssText = cssText.replace(/@(-webkit-)?keyframes[\s\S]+?\}\s*\}/gi, '');

    const mediaMatches = cssText.match(/@media[^{]+\{([\s\S]+?\})\s*\}/gi) || [];
    const media = mediaMatches.join("\n");
    cssText = cssText.replace(/@media[^{]+\{([\s\S]+?\})\s*\}/gi, '');

    let hover = "";
    let normal = "";
    const rules = cssText.split("}");
    rules.forEach(rule => {
        rule = rule.trim();
        if (!rule) return;
        rule = rule + "}";
        if (rule.indexOf(":hover") !== -1) {
            hover += rule + "\n";
        } else {
            normal += rule + "\n";
        }
    });

    return {
        normal: normal.trim(),
        hover: hover.trim(),
        media: media.trim(),
        animations: animations.trim()
    };
}


/* function handleCSSDrop(e) {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    const file = files[0];
    if (file && file.type.match(/text\/css/)) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const cssContent = event.target.result;
            // Split the CSS into parts using your splitCSS helper
            const split = splitCSS(cssContent);
            console.log("Split CSS:", split);

            // Merge normal, media, and animations into one string.
            const mergedCSS = split.normal + "\n\n" + split.media + "\n\n" + split.animations;

            // Format the merged CSS so that all selectors are scoped to the preview content.
            // Here, we use "#preview-content" as the preview container selector.
            const formattedCSS = formatImportedCSS(mergedCSS, "#preview-content");

            // Instead of modifying existing style tags in the head,
            // create (or update) a style tag inside the preview content.
            let previewStyleTag = document.getElementById("preview-dynamic-styles");
            if (!previewStyleTag) {
                previewStyleTag = document.createElement("style");
                previewStyleTag.id = "preview-dynamic-styles";
                const previewContent = document.getElementById("preview-content");
                if (previewContent) {
                    previewContent.appendChild(previewStyleTag);
                }
            }

            previewStyleTag.textContent = formattedCSS;
            console.log("Imported CSS into preview area:\n", formattedCSS);
        };
        reader.readAsText(file);
    } else {
        alert("Please drop a valid CSS file.");
    }
} */



/**
 * Formats the imported CSS so that:
 * 1. Top‑level "body" selectors become ".Body".
 * 2. Each rule is nicely indented.
 * 3. All selectors are prefixed with previewSelector (e.g. "#preview-content")
 *    except when the resulting selector is exactly "#preview-content .Body",
 *    in which case it becomes just ".Body".
 *
 * @param {string} css - The merged CSS (normal, media, animations).
 * @param {string} previewSelector - The selector of your preview container.
 * @returns {string} - The formatted CSS.
 */
/* function formatImportedCSS(css, previewSelector) {
    // Replace top‑level "body" selectors with ".Body"
    css = css.replace(/(^|\s|,)(body)(\s*[{,])/gi, (match, p1, p2, p3) => {
      return p1 + ".Body" + p3;
    });
    
    // Split the CSS into rules by the closing brace "}"
    const rules = css.split("}").filter(rule => rule.trim().length > 0);
    
    // Process each rule
    const formattedRules = rules.map(rule => {
      rule = rule.trim() + "}";
      const parts = rule.split("{");
      if (parts.length < 2) return rule; // If rule is invalid, return as is.
      
      let selector = parts[0].trim();
      const declarationsBlock = parts.slice(1).join("{").replace(/}$/, "").trim();
      
      // Prefix the selector with previewSelector if provided.
      let finalSelector = previewSelector ? `${previewSelector} ${selector}` : selector;
      
      // Special-case: if the final selector is exactly previewSelector + " .Body",
      // then use only ".Body" (to avoid duplicating the preview container)
      if (previewSelector && finalSelector === `${previewSelector} .Body`) {
        finalSelector = ".Body";
      }
      
      // Indent each declaration line.
      const declarations = declarationsBlock.split(";")
        .map(decl => decl.trim())
        .filter(decl => decl.length > 0)
        .map(decl => "    " + decl + ";")
        .join("\n");
      
      return `${finalSelector} {\n${declarations}\n}`;
    });
    
    return formattedRules.join("\n\n");
  } */


function handleCSSDrop(e) {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;
    const file = files[0];
    if (file && file.type.match(/text\/css/)) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const cssContent = event.target.result;
            const split = splitCSS(cssContent);
            console.log("Split CSS:", split);

            const combined = split.normal + "\n\n" + split.media + "\n\n" + split.hover;
            const formattedScopedCSS = formatImportedCSS(combined, "#preview-content");

            const finalCSS = formattedScopedCSS + "\n\n" + split.animations;

            let previewStyleTag = document.getElementById("preview-dynamic-styles");
            if (!previewStyleTag) {
                previewStyleTag = document.createElement("style");
                previewStyleTag.id = "preview-dynamic-styles";
                const previewContent = document.getElementById("preview-content");
                if (previewContent) {
                    previewContent.appendChild(previewStyleTag);
                }
            }

            previewStyleTag.textContent = finalCSS;
            console.log("Imported CSS into preview area:\n", finalCSS);
        };
        reader.readAsText(file);
    } else {
        alert("Please drop a valid CSS file.");
    }
}

/**
 * Formats the imported CSS so that:
 * 1. Top‑level "body" selectors become ".Body".
 * 2. All rules (normal and hover) are prefixed with the previewSelector (e.g. "#preview-content"),
 *    except that if the resulting selector becomes exactly "#preview-content .Body", it becomes ".Body".
 * 3. Media query blocks are processed so that their inner rules are also prefixed.
 *
 * @param {string} css - The merged CSS (normal, media, hover).
 * @param {string} previewSelector - The preview container selector (e.g. "#preview-content").
 * @returns {string} - The formatted CSS.
 */
function formatImportedCSS(css, previewSelector) {
    // First, replace top-level "body" selectors with ".Body"
    css = css.replace(/(^|\s|,)(body)(\s*[{,])/gi, (match, p1, p2, p3) => {
        return p1 + ".Body" + p3;
    });

    // We'll handle media queries separately.
    const mediaRegex = /@media[^{]+\{[\s\S]+?\}\s*\}/gi;
    const mediaBlocks = css.match(mediaRegex) || [];
    // Remove media blocks from css.
    let nonMediaCSS = css.replace(mediaRegex, "").trim();

    // Format non-media rules:
    const formattedNonMedia = formatRules(nonMediaCSS, previewSelector);

    // Format each media query block:
    const formattedMedia = mediaBlocks.map(block => {
        // Extract the media condition and inner CSS.
        const mediaConditionMatch = block.match(/@media\s*([^{]+)\{([\s\S]+)\}$/);
        if (!mediaConditionMatch) return block;
        const condition = mediaConditionMatch[1].trim();
        let innerCSS = mediaConditionMatch[2].trim();
        // Remove the trailing "}" if present.
        if (innerCSS.endsWith("}")) {
            innerCSS = innerCSS.slice(0, -1);
        }
        // Format inner rules.
        const formattedInner = formatRules(innerCSS, previewSelector);
        return `@media ${condition} {\n${formattedInner}\n}`;
    }).join("\n\n");

    // Combine non-media and media parts:
    return formattedNonMedia + "\n\n" + formattedMedia;
}

function formatRules(cssRules, previewSelector) {
    const rules = cssRules.split("}").filter(rule => rule.trim().length > 0);
    const formattedRules = rules.map(rule => {
        rule = rule.trim() + "}";
        const parts = rule.split("{");
        if (parts.length < 2) return rule;
        let selector = parts[0].trim();
        const declarationsBlock = parts.slice(1).join("{").replace(/}$/, "").trim();

        let finalSelector = previewSelector ? `${previewSelector} ${selector}` : selector;
        if (previewSelector && finalSelector === `${previewSelector} .Body`) {
            finalSelector = ".Body";
        }

        // Indent declarations.
        const declarations = declarationsBlock.split(";")
            .map(decl => decl.trim())
            .filter(decl => decl.length > 0)
            .map(decl => "    " + decl + ";")
            .join("\n");

        return `${finalSelector} {\n${declarations}\n}`;
    });
    return formattedRules.join("\n\n");
}
