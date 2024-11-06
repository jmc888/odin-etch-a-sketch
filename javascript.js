const DEFAULT_GRID_DIMENSION = 16;
const MAXIMUM_GRID_DIMENSION_PIXEL = 960;
const OPACITY_PATTERN = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/

const grid = document.getElementById("grid");
const gridDimensionBtn = document.getElementById("grid-dim-btn")
const radioBtn = document.querySelectorAll("input[name='fill-color']")
let colorOption = "grayscale";

function getOpacityFromRGBA(rgba) {
    const match = rgba.match(OPACITY_PATTERN);
    return match ? parseFloat(match[1]): 1;
}

createSingleSquare = (gridDimension) => {
    const squareDimension = (MAXIMUM_GRID_DIMENSION_PIXEL / gridDimension).toFixed();
    const div = document.createElement('div');
    div.style.border = "0.1em solid black";
    div.style.backgroundColor = `rgba(0, 0, 0, 0)`;
    div.style.height = `${squareDimension}px`;
    div.style.width = `${squareDimension}px`;
    div.addEventListener("mouseover", () => {
        const rgba = div.style.backgroundColor;
        const opacity = getOpacityFromRGBA(rgba);
        const newOpacity = Math.min(1, opacity + 0.1);
        if (colorOption == "color") {
            const randColorRed = Math.floor(Math.random() * 256);
            const randColorGreen = Math.floor(Math.random() * 256);
            const randColorBlue = Math.floor(Math.random() * 256);
            div.style.backgroundColor = `rgba(${randColorRed}, ${randColorGreen}, ${randColorBlue}, ${newOpacity})`;
        } else {
            div.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
        }
    });
    return div;
}

createGrid = (gridDimension) => {
    for (let i = 0; i < gridDimension; i++) {
        col = document.createElement('div');
        for (let j = 0; j < gridDimension; j++) {
            col.appendChild(createSingleSquare(gridDimension));
        }
        grid.appendChild(col);
    }
}

gridDimensionBtn.addEventListener("click", ()=>{
    let gridDimension = 101;
    while (gridDimension > 100) {
        gridDimension = prompt("Enter the new number of grid dimension (maximum 100).");
    }

    grid.textContent = "";
    createGrid(gridDimension);

})

radioBtn.forEach((radio) => {
    radio.addEventListener("change", (event) => {
        if (event.target.checked && event.target.value == "color") {
            colorOption = "color";
        } else {
            colorOption = "grayscale";
        }
    })
})

createGrid(DEFAULT_GRID_DIMENSION);

