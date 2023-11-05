function updateUserData(){
    const new_age = document.getElementById("age").value;
    const new_feet = document.getElementById("height_ft").value;
    const new_inches = document.getElementById("height_in").value;
    const new_weight = document.getElementById("weight").value;
    const new_level = document.getElementById("level").value;
    const new_name = document.getElementById("name").value;

    user.profile.age = new_age;
    user.profile.height.feet = new_feet;
    user.profile.height.inches = new_inches;
    user.profile.weight = new_weight;
    user.habits.goals = new_level;
    user.profile.user_name = new_name;

    alert("successfully logged data \n name: "+new_name+" \n height: "+new_feet+new_inches +" \n weight: "+new_weight+"pounds");
    console.log(user.profile);
}