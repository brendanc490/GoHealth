const userInfo = document.getElementById('user-info');
 const editButton = document.getElementById('edit-button');
const editForm = document.getElementById('edit-form');
const saveButton = document.getElementById('save-button');

function updateUserData(){
    const new_age = document.getElementById("age").value;
    const new_feet = document.getElementById("height_ft").value;
    const new_inches = document.getElementById("height_in").value;
    const new_weight = document.getElementById("weight").value;
    const new_level = document.querySelector('input[name="level"]:checked').value;
    const new_name = document.getElementById("name").value;
    const new_cals = document.getElementById("calories").value;
    const new_days = document.querySelector(".daysSelected").value;    

    user.profile.age = new_age;
    user.profile.height.feet = new_feet;
    user.profile.height.inches = new_inches;
    user.profile.weight = new_weight;
    user.profile.level = new_level;
    user.profile.user_name = new_name;
    user.profile.calories = new_cals;
    user.profile.days = new_days

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

    document.getElementById("user-name").innerHTML = user.profile.user_name;
    document.getElementById("user-height").innerHTML = user.profile.height.feet+" feet "+user.profile.height.inches+" inches";
    document.getElementById("user-weight").innerHTML = user.profile.weight;
};

editButton.addEventListener('click', () => {
    toggleDisplay(userInfo);
    toggleDisplay(editForm);
});

saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Update the displayed user data
    document.getElementById("user-name").innerHTML = user.profile.user_name;
    document.getElementById("user-height").innerHTML = user.profile.height.feet+" feet "+user.profile.height.inches+" inches";
    document.getElementById("user-weight").innerHTML = user.profile.weight;
    // Toggle back to the display mode
    toggleDisplay(userInfo);
    toggleDisplay(editForm);
});