/* Controls navigation between tabs */

function navigateTo(el){
    // save json file to local storage

    // begin navigation
    if(el.getAttribute('id').includes("home")){
        // navigate to home page
        location.replace("./index.html")
    } else if(el.getAttribute('id').includes("fitness")){
        // navigate to fitness page
        location.replace("./fitness.html")
    }  else if(el.getAttribute('id').includes("diet")){
        // navigate to diet page
        location.replace("./diet.html")
    }  else if(el.getAttribute('id').includes("habits")){
        // navigate to habits page
        location.replace("./habits.html")
    } else {
        // navigate to settings
        location.replace("./settings.html")
    }

}