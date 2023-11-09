const userInfo = document.getElementById('user-info');
const editButton = document.getElementById('edit-button');
const editForm = document.getElementById('edit-form');
const saveButton = document.getElementById('save-button');
const pic = document.getElementById('pic');

// add this is to enable data persistence across screens
// remove user.js script from html!!!
const user = JSON.parse(localStorage.getItem('user'))

function updateUserData(){
    const new_age = document.getElementById("age").value;
    const new_feet = document.getElementById("height_ft").value;
    const new_inches = document.getElementById("height_in").value;
    const new_weight = document.getElementById("weight").value;
    const new_level = document.querySelector('input[name="level"]:checked');
    const new_name = document.getElementById("name").value;
    const new_cals = document.getElementById("calories").value;
    const new_days = document.querySelector(".daysSelected").value;    

    if(new_age){
        user.profile.age = new_age;
    }
    if(new_feet){
        user.profile.height.feet = new_feet;
    }
    if(new_inches){
        user.profile.height.inches = new_inches;
    }
    if(new_weight){
        user.profile.height.feet = new_weight;
    }
    if(new_level){
        user.profile.level = new_level;
    }
    if(new_name){
        user.profile.user_name = new_name;
    }
    if(new_cals){
        user.profile.calories = new_cals;
    }
    if(new_days){
        user.profile.days = new_days
    }
    
    console.log(user.profile);
}

function toggleDisplay(element) {
    element.style.display = (element.style.display === 'none') ? 'block' : 'none';
}

window.onload = function () {
    const bars = document.querySelectorAll('.bar');
    const data = [10, 15, 8, 12];

    bars.forEach((bar, index) => {
        bar.style.height = `${data[index] * 10}px`;
        bar.textContent = data[index];
    });

    const bmi = user.profile.weight/(user.profile.height.feet+(user.profile.height.inches/12))
    console.log(bmi.toFixed(0))
    const roundedBMI = bmi.toFixed(0);
    
    document.getElementById("user-name").innerHTML = user.profile.user_name;
    document.getElementById("user-height").innerHTML = user.profile.height.feet+" feet "+user.profile.height.inches+" inches";
    document.getElementById("user-weight").innerHTML = user.profile.weight;
    document.getElementById("user-bmi").innerHTML = roundedBMI;

    document.getElementById("name").innerHTML = user.profile.user_name;
    document.getElementById("age").innerHTML = user.profile.age;
    console.log(user.profile.height.feet);
    console.log(user.profile.height.inches);
    document.getElementById("weight").innerHTML = user.profile.weight;
    document.getElementById("age").innerHTML = user.profile.age;
    document.getElementById("calories").innerHTML = user.profile.calories;
};

editButton.addEventListener('click', () => {
    toggleDisplay(userInfo);
    toggleDisplay(editForm);
    toggleDisplay(pic);
});

saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Update the displayed user data
    document.getElementById("user-name").innerHTML = user.profile.user_name;
    document.getElementById("user-height").innerHTML = user.profile.height.feet+" feet "+user.profile.height.inches+" inches";
    document.getElementById("user-weight").innerHTML = user.profile.weight;
    // Toggle back to the display mode
    toggleDisplay(pic);
    toggleDisplay(userInfo);
    toggleDisplay(editForm);
});

window.addEventListener('load', () => {

    op = 0;
    body.style.visibility = 'visible'
    let fadeInt = setInterval(function(){
        if(op >= 1){
            clearInterval(fadeInt)
        }
        body.style.opacity = op
        body.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += .1
    },30)
})