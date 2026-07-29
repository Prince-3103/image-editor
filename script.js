let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
}

const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#img-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetImage = document.querySelector("#reset-btn");
const downloadImage = document.querySelector("#download-btn");

let file = null;
let image = null;

function createFilterElement(name, unit="%", value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.value = value;
    input.min = min;
    input.max = max;
    input.name = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", evt =>{
        filters[ name ].value = input.value;
        applyFilter()
    })

    return div;
}

function showFilterElement(){
    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);

        filtersContainer.appendChild(filterElement);
    })
}
showFilterElement();

imgInput.addEventListener("change", (event)=>{
    file = event.target.files[0];
    const imgPlaceholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block"
    imgPlaceholder.style.display = "none"

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = ()=>{
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img,0,0)
    }
})

function applyFilter(){
    if(!image)  return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `

    canvasCtx.drawImage(image, 0, 0);
}

resetImage.addEventListener("click", ()=>{
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        hueRotate: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        }
    }
    applyFilter();
    filtersContainer.innerHTML = "";
    showFilterElement()
});

downloadImage.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
})

