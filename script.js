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
const presetsContainer = document.querySelector(".presets");

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
    const file = event.target.files[0];
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
    canvasCtx.filter = "none";
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


const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 85,
        hueRotate: 5,
        blur: 0,
        grayscale: 10,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 95,
        contrast: 120,
        saturation: 70,
        hueRotate: 0,
        blur: 0,
        grayscale: 25,
        sepia: 60,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 90,
        contrast: 165,
        saturation: 125,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 100,
        contrast: 170,
        saturation: 0,
        hueRotate: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 120,
        hueRotate: 350,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 105,
        saturation: 115,
        hueRotate: 20,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 110,
        contrast: 75,
        saturation: 80,
        hueRotate: 0,
        blur: 1,
        grayscale: 5,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    vivid: {
        brightness: 105,
        contrast: 130,
        saturation: 170,
        hueRotate: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 110,
        contrast: 90,
        saturation: 110,
        hueRotate: 0,
        blur: 3,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    cyberpunk: {
        brightness: 105,
        contrast: 150,
        saturation: 180,
        hueRotate: 290,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    coolBlue: {
        brightness: 100,
        contrast: 120,
        saturation: 130,
        hueRotate: 30,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 95,
        saturation: 90,
        hueRotate: 8,
        blur: 0,
        grayscale: 8,
        sepia: 45,
        opacity: 100,
        invert: 0
    },

    soft: {
        brightness: 108,
        contrast: 85,
        saturation: 95,
        hueRotate: 0,
        blur: 2,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    spooky: {
        brightness: 80,
        contrast: 160,
        saturation: 60,
        hueRotate: 140,
        blur: 1,
        grayscale: 20,
        sepia: 10,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach(presetName =>{
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn");
    presetButton.innerText = presetName;
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click", () =>{
        if(!image)   return;
        const preset = presets[presetName];
        Object.keys(preset).forEach(filterName =>{
            filters[filterName].value = preset[filterName];
        })
        applyFilter();
        filtersContainer.innerHTML = "";
        showFilterElement();
    })
})