// ==========================================================
// YOUR PROPERTY - FRESH JAVASCRIPT
// ==========================================================


const defaultProperties = [

    // ==================================================
    // 1. LUXURY VILLA
    // ==================================================

    {
        id: 1,

        name: "Luxury Villa",

        type: "buy",

        location: "Jaipur",

        price: 8000000,

        images: [
            "image 1.png",
            "villa1.png",
            "villa2.png"
        ],

        propertyType: "House",

        bedrooms: 4,

        bhk: "",

        description:
            "Beautiful luxury villa with modern facilities."
    },


    // ==================================================
    // 2. MODERN APARTMENT
    // ==================================================

    {
        id: 2,

        name: "Modern Apartment",

        type: "rent",

        location: "Delhi",

        price: 25000,

        images: [
            "apartment1.png",
            "apartment2.png"
        ],

        propertyType: "Apartment",

        bedrooms: "",

        bhk: "2 BHK",

        description:
            "Modern apartment available for rent."
    },


    // ==================================================
    // 3. FAMILY HOUSE
    // ==================================================

    {
        id: 3,

        name: "Family House",

        type: "buy",

        location: "Mumbai",

        price: 6500000,

        images: [
            "farmhouse1.png",
            "farmhouse2.png"
        ],

        propertyType: "House",

        bedrooms: 3,

        bhk: "",

        description:
            "Comfortable family house in a good location."
    },


    // ==================================================
    // 4. 2 BHK FLAT
    // ==================================================

    {
        id: 4,

        name: "2 BHK Flat",

        type: "rent",

        location: "Jaipur",

        price: 18000,

        images: [
            "flat1.png",
            "flat2.png",
            "2bhk.png"
        ],

        propertyType: "Flat",

        bedrooms: "",

        bhk: "2 BHK",

        description:
            "Spacious 2 BHK flat available for rent."
    }

];

// ==========================================================
// 2. LOAD PROPERTIES FROM LOCAL STORAGE
// ==========================================================

let properties =
    JSON.parse(
        localStorage.getItem("yourPropertyProperties")
    );


// If nothing is saved, use default properties

if (!Array.isArray(properties)) {

    properties = defaultProperties;

    localStorage.setItem(
        "yourPropertyProperties",
        JSON.stringify(properties)
    );

}


// ==========================================================
// 3. FIX OLD PROPERTY DATA
// ==========================================================

function fixProperty(property) {

    // Give missing ID

    if (!property.id) {

        property.id = Date.now() + Math.random();

    }


    // Old code may have used city

    if (!property.location && property.city) {

        property.location = property.city;

    }


    // Old code may have used image instead of images

    if (!Array.isArray(property.images)) {

        if (property.image) {

            property.images = [property.image];

        }

        else {

            property.images = [];

        }

    }


    // Make sure images are strings

    property.images =
        property.images.filter(function (image) {

            return typeof image === "string" &&
                image.trim() !== "";

        });


    return property;

}


properties =
    properties.map(fixProperty);


saveProperties();


// ==========================================================
// 4. SAVE PROPERTIES
// ==========================================================

function saveProperties() {

    localStorage.setItem(
        "yourPropertyProperties",
        JSON.stringify(properties)
    );

}


// ==========================================================
// 5. FAVORITES
// ==========================================================

let favorites =
    JSON.parse(
        localStorage.getItem("yourPropertyFavorites")
    );


if (!Array.isArray(favorites)) {

    favorites = [];

}


function saveFavorites() {

    localStorage.setItem(
        "yourPropertyFavorites",
        JSON.stringify(favorites)
    );

}


// ==========================================================
// 6. PAGE LOAD
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        addRequiredStyles();

        setupPage();

    }
);


// ==========================================================
// 7. DETECT CURRENT PAGE
// ==========================================================

function setupPage() {

    let page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    // Home

    if (
        page === "" ||
        page === "index.html"
    ) {

        showHome();

        setupSearch();

    }


    // Buy

    if (page === "buy.html") {

        showBuy();

        setupBuyForm();

    }


    // Rent

    if (page === "rent.html") {

        showRent();

        setupRentForm();

    }


    // Favorites

    if (page === "favorites.html") {

        showFavorites();

    }


    // About

    if (page === "about.html") {

        // Nothing required here

    }


    // Contact

    if (page === "contact.html") {

        setupContactForm();

    }


    setupPropertyTypeFields("buy");

    setupPropertyTypeFields("rent");

}


// ==========================================================
// 8. CREATE PROPERTY CARD
// ==========================================================

function createPropertyCard(property) {

    let card =
        document.createElement("div");


    card.className =
        "property-card";


    // ------------------------------------------
    // IMAGE AREA
    // ------------------------------------------

    let imageBox =
        createImageSlider(property);


    card.appendChild(imageBox);


    // ------------------------------------------
    // PROPERTY NAME
    // ------------------------------------------

    let title =
        document.createElement("h3");

    title.textContent =
        property.name;


    card.appendChild(title);


    // ------------------------------------------
    // LOCATION
    // ------------------------------------------

    let location =
        document.createElement("p");

    location.innerHTML =
        "<strong>Location:</strong> " +
        escapeHTML(property.location);


    card.appendChild(location);


    // ------------------------------------------
    // PROPERTY TYPE
    // ------------------------------------------

    if (property.propertyType) {

        let type =
            document.createElement("p");

        type.innerHTML =
            "<strong>Property Type:</strong> " +
            escapeHTML(property.propertyType);


        card.appendChild(type);

    }


    // ------------------------------------------
    // BEDROOMS
    // ------------------------------------------

    if (
        property.propertyType === "House" &&
        property.bedrooms
    ) {

        let bedrooms =
            document.createElement("p");

        bedrooms.innerHTML =
            "<strong>Bedrooms:</strong> " +
            property.bedrooms;


        card.appendChild(bedrooms);

    }


    // ------------------------------------------
    // BHK
    // ------------------------------------------

    if (
        (
            property.propertyType === "Apartment" ||
            property.propertyType === "Flat"
        ) &&
        property.bhk
    ) {

        let bhk =
            document.createElement("p");

        bhk.innerHTML =
            "<strong>BHK:</strong> " +
            escapeHTML(property.bhk);


        card.appendChild(bhk);

    }


    // ------------------------------------------
    // PRICE
    // ------------------------------------------

    let price =
        document.createElement("p");


    if (property.type === "buy") {

        price.innerHTML =
            "<strong>Price:</strong> ₹" +
            Number(property.price)
                .toLocaleString("en-IN");

    }

    else {

        price.innerHTML =
            "<strong>Monthly Rent:</strong> ₹" +
            Number(property.price)
                .toLocaleString("en-IN") +
            "/month";

    }


    card.appendChild(price);


    // ------------------------------------------
    // DESCRIPTION
    // ------------------------------------------

    if (property.description) {

        let description =
            document.createElement("p");

        description.innerHTML =
            "<strong>Description:</strong> " +
            escapeHTML(property.description);


        card.appendChild(description);

    }


    // ------------------------------------------
    // BUTTON AREA
    // ------------------------------------------

    let buttons =
        document.createElement("div");


    buttons.className =
        "property-buttons";


    // VIEW DETAILS

    let detailsButton =
        document.createElement("button");

    detailsButton.textContent =
        "View Details";


    detailsButton.addEventListener(
        "click",
        function () {

            showPropertyDetails(property);

        }
    );


    buttons.appendChild(detailsButton);


    // FAVORITE

    let favoriteButton =
        document.createElement("button");


    if (favorites.includes(property.id)) {

        favoriteButton.textContent =
            "❤️ Remove Favourite";

    }

    else {

        favoriteButton.textContent =
            "❤️ Favourite";

    }


    favoriteButton.addEventListener(
        "click",
        function () {

            toggleFavorite(property.id);

            if (
                window.location.pathname
                    .includes("favorites.html")
            ) {

                showFavorites();

            }

            else {

                updateFavoriteButton(
                    favoriteButton,
                    property.id
                );

            }

        }
    );


    buttons.appendChild(favoriteButton);


    // DELETE

    let deleteButton =
        document.createElement("button");


    deleteButton.textContent =
        "🗑 Delete";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteProperty(property.id);

        }
    );


    buttons.appendChild(deleteButton);


    card.appendChild(buttons);


    return card;

}


// ==========================================================
// 9. IMAGE SLIDER
// ==========================================================

function createImageSlider(property) {

    let container =
        document.createElement("div");


    container.className =
        "image-slider";


    let images =
        Array.isArray(property.images)
            ? property.images
            : [];


    // If there are no images

    if (images.length === 0) {

        let noImage =
            document.createElement("div");

        noImage.className =
            "no-image";

        noImage.textContent =
            "No image available";


        container.appendChild(noImage);

        return container;

    }


    let currentIndex = 0;


    let image =
        document.createElement("img");


    image.className =
        "property-image";


    image.src =
        images[currentIndex];


    image.alt =
        property.name;


    image.onerror =
        function () {

            image.style.display =
                "none";

            noImage.style.display =
                "flex";

        };


    container.appendChild(image);


    // ------------------------------------------
    // NO IMAGE MESSAGE
    // ------------------------------------------

    let noImage =
        document.createElement("div");


    noImage.className =
        "no-image";


    noImage.textContent =
        "Image not available";


    noImage.style.display =
        "none";


    container.appendChild(noImage);


    // ------------------------------------------
    // ARROWS
    // ------------------------------------------

    if (images.length > 1) {

        let previous =
            document.createElement("button");


        previous.className =
            "slider-button previous";


        previous.innerHTML =
            "❮";


        previous.addEventListener(
            "click",
            function () {

                currentIndex--;

                if (currentIndex < 0) {

                    currentIndex =
                        images.length - 1;

                }

                changeImage();

            }
        );


        container.appendChild(previous);


        let next =
            document.createElement("button");


        next.className =
            "slider-button next";


        next.innerHTML =
            "❯";


        next.addEventListener(
            "click",
            function () {

                currentIndex++;

                if (
                    currentIndex >=
                    images.length
                ) {

                    currentIndex = 0;

                }

                changeImage();

            }
        );


        container.appendChild(next);


        // IMAGE COUNTER

        let counter =
            document.createElement("span");


        counter.className =
            "image-counter";


        counter.textContent =
            "1 / " + images.length;


        container.appendChild(counter);


        function changeImage() {

            image.style.display =
                "block";


            noImage.style.display =
                "none";


            image.src =
                images[currentIndex];


            counter.textContent =
                (currentIndex + 1) +
                " / " +
                images.length;

        }

    }


    return container;

}


// ==========================================================
// 10. SHOW PROPERTIES
// ==========================================================

function showProperties(
    list,
    containerId
) {

    let container =
        document.getElementById(
            containerId
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (
        !Array.isArray(list) ||
        list.length === 0
    ) {

        let message =
            document.createElement("p");


        message.className =
            "no-properties";


        message.textContent =
            "No properties found.";


        container.appendChild(message);


        return;

    }


    list.forEach(
        function (property) {

            container.appendChild(
                createPropertyCard(property)
            );

        }
    );

}


// ==========================================================
// 11. HOME PAGE
// ==========================================================

function showHome() {

    let container =
        document.getElementById(
            "home-properties"
        );


    if (!container) {

        return;

    }


    showProperties(
        properties,
        "home-properties"
    );

}


// ==========================================================
// 12. BUY PAGE
// ==========================================================

function showBuy() {

    let buyProperties =
        properties.filter(
            function (property) {

                return property.type === "buy";

            }
        );


    showProperties(
        buyProperties,
        "buy-properties"
    );

}


// ==========================================================
// 13. RENT PAGE
// ==========================================================

function showRent() {

    let rentProperties =
        properties.filter(
            function (property) {

                return property.type === "rent";

            }
        );


    showProperties(
        rentProperties,
        "rent-properties"
    );

}


// ==========================================================
// 14. SEARCH LOCATION
// ==========================================================

function setupSearch() {

    let searchInput =
        document.getElementById(
            "location-search"
        );


    let searchButton =
        document.getElementById(
            "search-button"
        );


    if (
        !searchInput ||
        !searchButton
    ) {

        return;

    }


    searchButton.addEventListener(
        "click",
        searchLocation
    );


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                searchLocation();

            }

        }
    );

}


function searchLocation() {

    let input =
        document.getElementById(
            "location-search"
        );


    if (!input) {

        return;

    }


    let location =
        input.value
            .trim()
            .toLowerCase();


    if (location === "") {

        alert(
            "Please enter a location."
        );

        showHome();

        return;

    }


    let results =
        properties.filter(
            function (property) {

                return property.location
                    .toLowerCase()
                    .includes(location);

            }
        );


    showProperties(
        results,
        "home-properties"
    );


    if (results.length === 0) {

        alert(
            "No property found in " +
            input.value
        );

    }

}


// ==========================================================
// 15. FAVORITE FUNCTION
// ==========================================================

function toggleFavorite(id) {

    let index =
        favorites.indexOf(id);


    if (index === -1) {

        favorites.push(id);

        alert(
            "Property added to favourites ❤️"
        );

    }

    else {

        favorites.splice(
            index,
            1
        );

        alert(
            "Property removed from favourites."
        );

    }


    saveFavorites();

}


// ==========================================================
// 16. UPDATE FAVORITE BUTTON
// ==========================================================

function updateFavoriteButton(
    button,
    id
) {

    if (favorites.includes(id)) {

        button.textContent =
            "❤️ Remove Favourite";

    }

    else {

        button.textContent =
            "❤️ Favourite";

    }

}


// ==========================================================
// 17. SHOW FAVORITES
// ==========================================================

function showFavorites() {

    let favoriteProperties =
        properties.filter(
            function (property) {

                return favorites.includes(
                    property.id
                );

            }
        );


    showProperties(
        favoriteProperties,
        "favorite-properties"
    );

}


// ==========================================================
// 18. DELETE PROPERTY
// ==========================================================

function deleteProperty(id) {

    let property =
        properties.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!property) {

        alert(
            "Property not found."
        );

        return;

    }


    let confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            property.name +
            "?"
        );


    if (!confirmDelete) {

        return;

    }


    properties =
        properties.filter(
            function (item) {

                return item.id !== id;

            }
        );


    // Also remove from favorites

    favorites =
        favorites.filter(
            function (item) {

                return item !== id;

            }
        );


    saveProperties();

    saveFavorites();


    alert(
        "Property deleted successfully."
    );


    refreshCurrentPage();

}


// ==========================================================
// 19. REFRESH CURRENT PAGE
// ==========================================================

function refreshCurrentPage() {

    let page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (
        page === "" ||
        page === "index.html"
    ) {

        showHome();

    }


    else if (
        page === "buy.html"
    ) {

        showBuy();

    }


    else if (
        page === "rent.html"
    ) {

        showRent();

    }


    else if (
        page === "favorites.html"
    ) {

        showFavorites();

    }

}


// ==========================================================
// 20. PROPERTY DETAILS MODAL
// ==========================================================

function showPropertyDetails(property) {

    // Remove old modal if present

    let oldModal =
        document.getElementById(
            "property-details-modal"
        );


    if (oldModal) {

        oldModal.remove();

    }


    // Create modal

    let modal =
        document.createElement("div");


    modal.id =
        "property-details-modal";


    modal.className =
        "property-modal";


    // ------------------------------------------
    // MODAL BOX
    // ------------------------------------------

    let box =
        document.createElement("div");


    box.className =
        "property-modal-box";


    // ------------------------------------------
    // CLOSE BUTTON
    // ------------------------------------------

    let close =
        document.createElement("button");


    close.className =
        "modal-close";


    close.textContent =
        "×";


    close.addEventListener(
        "click",
        function () {

            modal.remove();

        }
    );


    box.appendChild(close);


    // ------------------------------------------
    // TITLE
    // ------------------------------------------

    let title =
        document.createElement("h2");


    title.textContent =
        property.name;


    box.appendChild(title);


    // ------------------------------------------
    // IMAGE
    // ------------------------------------------

    if (
        property.images &&
        property.images.length > 0
    ) {

        let image =
            document.createElement("img");


        image.src =
            property.images[0];


        image.alt =
            property.name;


        image.className =
            "modal-property-image";


        box.appendChild(image);

    }


    // ------------------------------------------
    // DETAILS
    // ------------------------------------------

    let details =
        document.createElement("div");


    details.className =
        "property-details";


    details.innerHTML = `

        <p>
            <strong>Location:</strong>
            ${escapeHTML(property.location)}
        </p>

        <p>
            <strong>Property Type:</strong>
            ${escapeHTML(property.propertyType || "Other")}
        </p>

        ${property.bedrooms
            ? `
                <p>
                    <strong>Bedrooms:</strong>
                    ${property.bedrooms}
                </p>
            `
            : ""
        }

        ${property.bhk
            ? `
                <p>
                    <strong>BHK:</strong>
                    ${escapeHTML(property.bhk)}
                </p>
            `
            : ""
        }

        <p>
            <strong>
                ${property.type === "buy"
            ? "Price:"
            : "Monthly Rent:"
        }
            </strong>

            ₹${Number(property.price)
            .toLocaleString("en-IN")}

            ${property.type === "rent"
            ? "/month"
            : ""
        }
        </p>

        <p>
            <strong>Available For:</strong>
            ${property.type === "buy"
            ? "Buy"
            : "Rent"
        }
        </p>

        <p>
            <strong>Description:</strong>
            ${escapeHTML(property.description || "No description available.")}
        </p>

    `;


    box.appendChild(details);


    modal.appendChild(box);


    document.body.appendChild(modal);


    // ------------------------------------------
    // CLOSE WHEN CLICKING OUTSIDE
    // ------------------------------------------

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}


// ==========================================================
// 21. BUY FORM
// ==========================================================

function setupBuyForm() {

    let form =
        document.getElementById(
            "buy-property-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            addPropertyFromForm(
                "buy"
            );

        }
    );

}


// ==========================================================
// 22. RENT FORM
// ==========================================================

function setupRentForm() {

    let form =
        document.getElementById(
            "rent-property-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            addPropertyFromForm(
                "rent"
            );

        }
    );

}


// ==========================================================
// 23. ADD PROPERTY FROM FORM
// ==========================================================

async function addPropertyFromForm(type) {

    let prefix = type === "buy" ? "buy" : "rent";

    // ==========================================
    // GET FORM VALUES
    // ==========================================

    let nameElement = document.getElementById(prefix + "-name");
    let locationElement = document.getElementById(prefix + "-location");
    let propertyTypeElement = document.getElementById(prefix + "-property-type");
    let priceElement = document.getElementById(prefix + "-price");
    let descriptionElement = document.getElementById(prefix + "-description");
    let imageInput = document.getElementById(prefix + "-images");

    if (
        !nameElement ||
        !locationElement ||
        !propertyTypeElement ||
        !priceElement ||
        !descriptionElement ||
        !imageInput
    ) {
        alert("Some form fields are missing.");
        return;
    }

    let name = nameElement.value.trim();
    let location = locationElement.value.trim();
    let propertyType = propertyTypeElement.value;
    let price = Number(priceElement.value);
    let description = descriptionElement.value.trim();


    // ==========================================
    // VALIDATION
    // ==========================================

    if (name === "") {
        alert("Please enter property name.");
        return;
    }

    if (location === "") {
        alert("Please enter location.");
        return;
    }

    if (propertyType === "") {
        alert("Please select property type.");
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price.");
        return;
    }

    if (imageInput.files.length === 0) {
        alert("Please select at least one property image.");
        return;
    }


    // ==========================================
    // READ MULTIPLE IMAGES
    // ==========================================

    let images = [];

    try {

        images = await readMultipleImages(imageInput.files);

    }
    catch (error) {

        console.error(error);

        alert("There was a problem reading the images.");

        return;

    }


    if (images.length === 0) {

        alert("Please select valid image files.");

        return;

    }


    // ==========================================
    // CREATE PROPERTY
    // ==========================================

    let newProperty = {

        id: Date.now(),

        name: name,

        type: type,

        location: location,

        price: price,

        images: images,

        propertyType: propertyType,

        description:
            description ||
            "Property listed on YOUR PROPERTY."

    };


    // ==========================================
    // SAVE PROPERTY
    // ==========================================

    try {

        properties.push(newProperty);

        saveProperties();

    }
    catch (error) {

        console.error(error);

        // Remove property if saving failed
        properties.pop();

        alert(
            "The images are too large to save. Please select smaller images."
        );

        return;

    }


    // ==========================================
    // SUCCESS
    // ==========================================

    alert(
        "Property added successfully! 🏠"
    );


    // ==========================================
    // RESET FORM
    // ==========================================

    let form =
        document.getElementById(
            prefix + "-property-form"
        );

    if (form) {

        form.reset();

    }


    // ==========================================
    // SHOW UPDATED PROPERTIES
    // ==========================================

    if (type === "buy") {

        showBuy();

    }
    else {

        showRent();

    }

}

// ==========================================================
// 24. READ MULTIPLE IMAGES
// ==========================================================

function readMultipleImages(files) {

    let promises = [];

    for (let i = 0; i < files.length; i++) {

        let file = files[i];

        if (!file.type.startsWith("image/")) {
            continue;
        }

        promises.push(

            new Promise(function (resolve, reject) {

                let reader = new FileReader();

                reader.onload = function (event) {

                    let image = new Image();

                    image.onload = function () {

                        let canvas =
                            document.createElement("canvas");

                        let maxWidth = 1000;
                        let maxHeight = 700;

                        let width = image.width;
                        let height = image.height;


                        // Resize large images

                        if (width > maxWidth) {

                            height =
                                height *
                                (maxWidth / width);

                            width = maxWidth;

                        }


                        if (height > maxHeight) {

                            width =
                                width *
                                (maxHeight / height);

                            height = maxHeight;

                        }


                        canvas.width = width;
                        canvas.height = height;


                        let ctx =
                            canvas.getContext("2d");


                        ctx.drawImage(
                            image,
                            0,
                            0,
                            width,
                            height
                        );


                        // Compress image

                        let compressedImage =
                            canvas.toDataURL(
                                "image/jpeg",
                                0.75
                            );


                        resolve(compressedImage);

                    };


                    image.onerror = function () {

                        reject(
                            new Error(
                                "Invalid image."
                            )
                        );

                    };


                    image.src =
                        event.target.result;

                };


                reader.onerror = function () {

                    reject(
                        new Error(
                            "Image could not be read."
                        )
                    );

                };


                reader.readAsDataURL(file);

            })

        );

    }


    return Promise.all(promises);

}

// ==========================================================
// 25. CONDITIONAL HOUSE / BHK FIELDS
// ==========================================================

function setupPropertyTypeFields(
    prefix
) {

    let typeSelect =
        document.getElementById(
            prefix + "-property-type"
        );


    let bedroomsField =
        document.getElementById(
            prefix + "-bedrooms"
        );


    let bhkField =
        document.getElementById(
            prefix + "-bhk"
        );


    if (!typeSelect) {

        return;

    }


    function updateFields() {

        let type =
            typeSelect.value;


        // House

        if (
            type === "House"
        ) {

            if (bedroomsField) {

                bedroomsField.style.display =
                    "block";

            }


            if (bhkField) {

                bhkField.style.display =
                    "none";

            }

        }


        // Apartment / Flat

        else if (
            type === "Apartment" ||
            type === "Flat"
        ) {

            if (bedroomsField) {

                bedroomsField.style.display =
                    "none";

            }


            if (bhkField) {

                bhkField.style.display =
                    "block";

            }

        }


        // Other

        else {

            if (bedroomsField) {

                bedroomsField.style.display =
                    "none";

            }


            if (bhkField) {

                bhkField.style.display =
                    "none";

            }

        }

    }


    typeSelect.addEventListener(
        "change",
        updateFields
    );


    updateFields();

}


// ==========================================================
// 26. CONTACT FORM
// ==========================================================

function setupContactForm() {

    let form =
        document.querySelector(
            "form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let name =
                form.querySelector(
                    'input[type="text"]'
                );


            let email =
                form.querySelector(
                    'input[type="email"]'
                );


            let message =
                form.querySelector(
                    "textarea"
                );


            if (
                !name ||
                !email ||
                !message
            ) {

                return;

            }


            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;

            }


            alert(
                "Thank you " +
                name.value.trim() +
                "! Your message has been sent successfully."
            );


            form.reset();

        }
    );

}


// ==========================================================
// 27. ADD EXTRA CSS
// ==========================================================

function addRequiredStyles() {

    if (
        document.getElementById(
            "javascript-property-styles"
        )
    ) {

        return;

    }


    let style =
        document.createElement("style");


    style.id =
        "javascript-property-styles";


    style.textContent = `

        /* PROPERTY CARD */

        .property-card {

            margin: 30px 0;

            padding: 20px;

            border-radius: 15px;

            background: #ffffff;

            box-shadow:
                0 4px 15px rgba(0,0,0,0.12);

            position: relative;

        }


        /* IMAGE SLIDER */

        .image-slider {

            position: relative;

            width: 100%;

            max-width: 500px;

            height: 280px;

            margin: 0 auto 20px;

            overflow: hidden;

            border-radius: 12px;

            background: #eeeeee;

        }


        .property-image {

            width: 100%;

            height: 100%;

            object-fit: cover;

            display: block;

        }


        /* SLIDER BUTTONS */

        .slider-button {

            position: absolute;

            top: 50%;

            transform: translateY(-50%);

            width: 40px;

            height: 40px;

            border: none;

            border-radius: 50%;

            background: rgba(0,0,0,0.65);

            color: white;

            font-size: 22px;

            cursor: pointer;

            z-index: 5;

        }


        .slider-button:hover {

            background: rgba(0,0,0,0.9);

        }


        .slider-button.previous {

            left: 10px;

        }


        .slider-button.next {

            right: 10px;

        }


        /* IMAGE COUNTER */

        .image-counter {

            position: absolute;

            bottom: 10px;

            left: 50%;

            transform: translateX(-50%);

            background: rgba(0,0,0,0.65);

            color: white;

            padding: 5px 12px;

            border-radius: 15px;

            font-size: 13px;

        }


        /* BUTTONS */

        .property-buttons {

            display: flex;

            gap: 10px;

            flex-wrap: wrap;

            margin-top: 15px;

        }


        .property-buttons button {

            padding: 9px 14px;

            border: none;

            border-radius: 8px;

            cursor: pointer;

        }


        /* NO IMAGE */

        .no-image {

            width: 100%;

            height: 100%;

            display: flex;

            align-items: center;

            justify-content: center;

            color: #666;

        }


        /* MODAL */

        .property-modal {

            position: fixed;

            inset: 0;

            background: rgba(0,0,0,0.7);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            z-index: 9999;

        }


        .property-modal-box {

            background: white;

            width: 90%;

            max-width: 650px;

            max-height: 90vh;

            overflow-y: auto;

            padding: 25px;

            border-radius: 15px;

            position: relative;

        }


        .modal-close {

            position: absolute;

            right: 15px;

            top: 10px;

            border: none;

            background: none;

            font-size: 30px;

            cursor: pointer;

        }


        .modal-property-image {

            width: 100%;

            max-height: 350px;

            object-fit: cover;

            border-radius: 10px;

            margin: 15px 0;

        }


        .property-details p {

            margin: 12px 0;

        }


        .no-properties {

            text-align: center;

            padding: 30px;

            font-size: 18px;

        }


        /* FORM SPACING */

        form {

            margin-bottom: 40px;

        }


        form input,

        form select,

        form textarea {

            margin-bottom: 12px;

        }


        @media (max-width: 600px) {

            .property-buttons {

                flex-direction: column;

            }


            .property-buttons button {

                width: 100%;

            }


            .image-slider {

                height: 220px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


// ==========================================================
// 28. ESCAPE HTML
// ==========================================================

function escapeHTML(value) {

    let div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}


// ==========================================================
// END OF JAVASCRIPT
// ==========================================================