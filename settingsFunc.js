
const changeFontButton1 = document.getElementById("changeFontButton1");
    changeFontButton1.addEventListener("click", function() {
        document.body.classList.toggle("fontChanged1");
    });

    const changeFontButton2 = document.getElementById("changeFontButton2");
    changeFontButton2.addEventListener("click", function() {
        document.body.classList.toggle("fontChanged2");
    });


    const changeFontButton3 = document.getElementById("changeFontButton3");
    changeFontButton3.addEventListener("click", function() {
        document.body.classList.toggle("fontChanged3");
    });

    const body = document.body;
    const increaseFontButton = document.getElementById("increaseFontButton");
    const decreaseFontButton = document.getElementById("decreaseFontButton");

    increaseFontButton.addEventListener("click", function() {
        // Get the current font size and convert it to a number
        const currentSize = parseFloat(getComputedStyle(body).fontSize);
        // Increase the font size by 2 pixels
        body.style.fontSize = (currentSize + 2) + "px";
    });

    decreaseFontButton.addEventListener("click", function() {
        // Get the current font size and convert it to a number
        const currentSize = parseFloat(getComputedStyle(body).fontSize);
        // Decrease the font size by 2 pixels, ensuring it doesn't go below a certain size
        if (currentSize > 10) {
            body.style.fontSize = (currentSize - 2) + "px";
        }
    });