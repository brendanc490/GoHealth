function updateUserData(){
    const new_age = document.getElementById("age").value;
    const new_feet = document.getElementById("height_ft").value;
    const new_inches = document.getElementById("height_in").value;
    const new_weight = document.getElementById("weight").value;
    const new_level = document.getElementById("level").value;

    user.profile.age = new_age;
    user.profile.height.feet = new_feet;
    user.profile.height.inches = new_inches;
    user.profile.weight = new_weight;
    user.habits.goals = new_level;

}