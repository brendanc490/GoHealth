const body = document.getElementById('body')
const currentExerciseLevel = document.getElementById('currentExerciseLevel');
const numberOfWorkouts = document.getElementById('numberOfWorkouts');
const completedWorkoutsCircleGraph = document.getElementById('completedWorkoutsCircleGraph');
const workoutsPercentage = document.getElementById('workoutsPercentage');

const calorieGoal = document.getElementById('calorieGoal');
const numberOfDiets = document.getElementById('numberOfDiets');
const completedDietsCircleGraph = document.getElementById('completedDietsCircleGraph');
const dietPercentage = document.getElementById('dietPercentage');

const currentHabitsLevel = document.getElementById('currentHabitsLevel');
const numberOfHabits = document.getElementById('numberOfHabits');
const completedHabitsCircleGraph = document.getElementById('completedHabitsCircleGraph');
const habitsPercentage = document.getElementById('habitsPercentage');

const user = JSON.parse(localStorage.getItem('user'))

currentExerciseLevel.style.textContent = 'test'

window.addEventListener('load',() => {

    updateUI()

    let op = 0;
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

function updateUI(){
    currentExerciseLevel.textContent = 'Exercise Level: ' + user.profile.level

    let workoutInfo = fetchNumberWorkouts()

    numberOfWorkouts.textContent = 'Exercises Completed: '+ workoutInfo[0]
    completedWorkoutsCircleGraph.style = "display: block; position: relative;left: 50%;top: -55%;width: 150px;height: 150px;border-radius: 50%;background: radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(green "+Math.round(workoutInfo[0]/workoutInfo[1]*100)+"%, grey 0);"
    workoutsPercentage.textContent = Math.round(workoutInfo[0]/workoutInfo[1]*100)+"%"




    /*calorieGoal.textContent = 'Calorie Goal: ' + user.diet.goal.calories

    let dietInfo = fetchDiets()

    numberOfWorkouts.textContent = 'Exercises Completed: '+ dietInfo[0]
    completedDietsCircleGraph.textContent = Math.round(dietInfo[0]/dietInfo[1])
    dietPercentage.textContent = Math.round(dietInfo[0]/dietInfo[1])

    currentHabitsLevel.textContent = 'Habits Level: ' + user.profile.level

    let habitInfo = fetchNumberHabits()

    numberOfHabits.textContent = 'Exercises Completed: '+ workoutInfo[0]
    completedHabitsCircleGraph.textContent = Math.round(workoutInfo[0]/workoutInfo[1])
    habitsPercentage.textContent = Math.round(workoutInfo[0]/workoutInfo[1])*/
}

function fetchNumberWorkouts(){
    let keys = Object.keys(user['exercise']['daysEntered']);
    let total = 0;
    let completed = 0;
    for (let k of keys){
        let i = 0;
        let check = true;
        console.log(k)
        while(i < user['exercise']['daysEntered'][k]['workouts'].length){
            check = check && user['exercise']['daysEntered'][k]['workouts'][i]['done']
            i++;
        }
        if(check){
            completed++;
        }
        total++;

    }

    return[completed,total]

}