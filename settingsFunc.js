function updateUserData(){
    const new_age = document.getElementById("age").value;
    const new_feet = document.getElementById("height_ft").value;
    const new_inches = document.getElementById("height_in").value;
    const new_weight = document.getElementById("weight").value;
    const new_level = document.querySelector('input[name="level"]:checked').value;
    const new_name = document.getElementById("name").value;

    user.profile.age = new_age;
    user.profile.height.feet = new_feet;
    user.profile.height.inches = new_inches;
    user.profile.weight = new_weight;
    user.profile.level = new_level;
    user.profile.user_name = new_name;

    document.getElementById("post_submit").innerHTML = "Successfully logged data for user: "+new_name;



    console.log(user.profile);
}