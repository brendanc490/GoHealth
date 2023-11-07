const header = document.getElementById('header');
const selectedDate = document.getElementById('selectedDate');

const exerciseList = document.getElementById('exerciseList');
const circularProgressBar = document.getElementById('circularProgressBar')
const dietProgress = document.getElementById('dietProgress')
const percentageText = document.getElementById('percentageText')
const consumedText = document.getElementById('consumedText')
const togoText = document.getElementById('togoText')
const habitsList = document.getElementById('habitsList');

let healthyHabits = ["Take a 1 mile walk",
                    "Read for 10 minutes",
                "Drink 8 glasses of water",
                "Eat 1 apple",
                "Meditate for 5 minutes",
                "Do 10 situps",
                "Do 10 pushups"];




// need to check if the localStorage data is valid
let timeStamp = localStorage.getItem('userTimeStamp');
let currentTime = new Date().getMilliseconds();

// use the local storage for the home screen if the local storage content is less than an hour old
if(timeStamp+(1000*60*60) < currentTime){
    console.log('test')
    localStorage.clear()
} else {
    user = JSON.parse(localStorage.getItem('user'))
}

updateUI()

function updateUI(){
    header.children[0].innerText = 'Welcome back, '+user['profile']['user_name']+"!"

    // update diet info
    let goal = user['diet']['goal'].calories;
    let burned = user['exercise']['daysEntered'][selectedDate.innerText.split(' ')[1]] ? user['exercise']['daysEntered'][selectedDate.innerText.split(' ')[1]].caloriesBurned : 0;
    let consumed = user['diet']['daysEntered'][selectedDate.innerText.split(' ')[1]] ? user['diet']['daysEntered'][selectedDate.innerText.split(' ')[1]].totalCalories : 0;
    let percent = Math.min(Math.round(consumed/(goal+burned)*100),100)

    

    circularProgressBar.style = "position: relative;left: 35%;top: 5%;width: 300px;height: 300px;border-radius: 50%;background: radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(green "+percent+"%, grey 0);"

    percentageText.innerText = percent+"%"
    consumedText.innerText = consumed + " cal"
    togoText.innerText = goal+burned-consumed  + " cal"

    // Update healthy habit portion of the UI

    document.querySelector('#habitsList').innerHTML = '';
    let currDate = selectedDate.innerText.split(', ')[1];
    for (let i = 0; i < user.habits.goals; i++) {
        let currHabit = healthyHabits[user.habits.daysEntered[currDate][0][i]];
        document.getElementById("habitsList").insertAdjacentHTML('beforeend', '<li>' + currHabit + '</li>');
    }

    let completed = true;

    for (let i = 0; i < user.habits.goals; i++) {
        if (user['habits']['daysEntered'][currDate][1][i] == false) {
            completed = false;
            break;
        }
    }

    if (completed == true) {
        document.getElementById("habitsListContainer").insertAdjacentHTML('Congratulations on completing today\'s healthy habits!');
    }

    

    //circularProgressBar.style = "background: radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(green "+percent+"%, grey 0);"


}