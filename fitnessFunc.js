const leftArrowContainer = document.getElementById('leftPos');
const rightArrowContainer = document.getElementById('rightPos');
const selectedDate = document.getElementById('selectedDate');
const week = document.getElementById('week');
const monday = document.getElementById('monday');
const tuesday = document.getElementById('tuesday');
const wednesday = document.getElementById('wednesday');
const thursday = document.getElementById('thursday');
const friday = document.getElementById('friday');
const saturday = document.getElementById('saturday');
const sunday = document.getElementById('sunday');
const addTodoButton = document.getElementById('addTodoButton')
const addTodoForm = document.getElementById('addTodoForm')
const todoSubmitButton = document.getElementById('todoSubmitButton')
const workoutForm = document.getElementById('workoutForm')
const editExerciseForm = document.getElementById('editExerciseForm')


const user = JSON.parse(localStorage.getItem('user'))

let load = 0

window.onload = function() {
    let lastWeek = []
    let i = 0;
    let indCurr = -1;
    let lastWeekAnim = []
    while(i < week.childElementCount){
        const date = new Date(week.children[i].children[0].innerText)
        const newDay = new Date(date.getTime());
        let split = newDay.toLocaleDateString().split('/')
        lastWeek.push(split[0]+'/'+split[1]+'/'+(split[2].substring(2)))
        lastWeekAnim.push(split[0]+'/'+split[1]+'/'+(split[2]))
        if(week.children[i].style.backgroundColor != ''){
            indCurr = i
        }
        i++;
    }
    const animArr = checkGoalsCompleted(lastWeekAnim)
    i = 0 
    while (i < animArr.length) {
        if(animArr[i]){
            week.children[i].children[1].children[0].style.visibility = 'visible'
        } else {
            week.children[i].children[1].children[0].style.visibility = 'hidden'
        }
        i++
    }
    changeDate(document.getElementById(selectedDate.innerText.split(', ')[0].toLowerCase()+'Date').parentElement);
};

// calendar related code
function changeDate(el){
    let i = 0;
    let indNew = 0;
    let indCurr = 0;
    let dayOfTheWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    while(i < week.childElementCount){
        if(week.children[i].style.backgroundColor != ''){
            indCurr = i
        }
        week.children[i].style.backgroundColor = ''
        if(week.children[i] == el){
            indNew = i;
        }
        i++;
    }
    el.style.backgroundColor = '#90EE90'
    let dateText = selectedDate.innerText.split(', ')[1];
    let date = new Date(dateText);
    let newDateText = el.children[0].innerText
    const newDay = new Date(newDateText);
    selectedDate.children[0].innerText = dayOfTheWeek[newDay.getDay()] +", "+newDay.toLocaleDateString()
    if (date.toString() !== newDay.toString() || load == 0) {
        load = 1
        updateUI(newDay.toLocaleDateString());
    } 
}

function updateUI(date) {
    let currDay = user['exercise']['daysEntered'][selectedDate.innerText.split(' ')[1]] ? user['exercise']['daysEntered'][selectedDate.innerText.split(' ')[1]]['workouts'] : null
    let workoutPlan = exercises[user.profile.level] 
    let weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] // will be user preference
    let schedDays = user.profile.days 
    let i = 0
    let calBurn = 0
    let weekIndex = new Date(selectedDate.innerText.split(', ')[1]).getDay()
    document.querySelector("#todoContents").innerHTML = "";
    if (currDay) {
        i = 0
        while (i < currDay.length) {
            let exercise = currDay[i]['duration'] + ' ' + currDay[i]['name']
            let el = document.createElement("div"); 
            el.className = "workout"
            el.id = 'workout' + i.toString()
            let checkEl = document.createElement("input")
            checkEl.id = i.toString()
            checkEl.type = 'checkbox'
            checkEl.className = 'largerCheckbox'
            checkEl.style.padding.bottom = '10px'
            if (currDay[i]['done']){
                calBurn += currDay[i]['calBurn']
               checkEl.setAttribute('checked', true)
            }
            let text = document.createTextNode(exercise)
            checkEl.setAttribute('onclick', 'updateCheck(this)')
            let selectEl = document.createElement('button')
            selectEl.id = 'select' + currDay[i]['name']
            selectEl.style.position = 'absolute'
            selectEl.style.right = '2%'
            selectEl.className = 'fa-solid fa-arrow-right fa-2x'
            selectEl.style.top = '2%'
            el.appendChild(checkEl)
            el.appendChild(text)
            el.appendChild(selectEl)
            selectEl.addEventListener('click', (e) => {
                let par = e.target.parentElement
                selectExercise(currDay[par.id.split('workout')[1]], par.id.split('workout')[1])
            })
            todoContents.appendChild(el)
            i++;
        }
    } else if (schedDays.includes(weekdays[weekIndex-1])) {
        i = 0
        while (i < workoutPlan.length) {
            let exercise = workoutPlan[i]['duration'] + ' ' + workoutPlan[i]['name']
            let el = document.createElement("div"); 
            el.className = "workout"
            el.id = 'workout' + i.toString()
            let checkEl = document.createElement("input")
            checkEl.id = i.toString()
            checkEl.type = 'checkbox'
            checkEl.className = 'largerCheckbox'
            checkEl.style.padding.bottom = '10px'
            if (workoutPlan[i]['done']){
                calBurn += workoutPlan[i]['calBurn']
               checkEl.setAttribute('checked', true)
            }
            let text = document.createTextNode(exercise)
            checkEl.setAttribute('onclick', 'updateCheck(this)')
            let selectEl = document.createElement('button')
            selectEl.id = 'select' + workoutPlan[i]['name']
            selectEl.style.position = 'absolute'
            selectEl.style.right = '2%'
            selectEl.className = 'fa-solid fa-arrow-right fa-2x'
            selectEl.style.top = '2%'
            el.appendChild(checkEl)
            el.appendChild(text)
            el.appendChild(selectEl)
            selectEl.addEventListener('click', (e) => {
                let par = e.target.parentElement
                selectExercise(workoutPlan[par.id.split('workout')[1]], par.id.split('workout')[1])
            })
            todoContents.appendChild(el)
            i++;
        }
        let newarr = JSON.parse(JSON.stringify(workoutPlan));
        user.exercise.daysEntered[selectedDate.innerText.split(', ')[1]] = {
            'workouts': newarr,
            'caloriesBurned': 0
        } 
    }
}


function selectExercise(exercise, index) {
    var selectors = document.getElementsByTagName('button');
    for (let i = 1; i < selectors.length; i++) {
        if (selectors[i].id == 'closeDescription') {
            continue;
        }
        selectors[i].disabled = true
    }
    let div = document.createElement('div')
    div.id = index.toString()
    let header = document.createElement('h1')
    header.align = 'center'
    header.textContent = exercise.name
    let duration = document.createElement('h2')
    let calories = document.createElement('h2')
    calories.style = 'padding-left: 30px;'
    calories.textContent = 'Calories you\'ll burn: ' + exercise.calBurn
    duration.textContent = 'Duration: ' + exercise.duration
    duration.style = 'padding-left: 30px'
    let description = document.createElement('p')
    description.textContent = exercise.description
    div.appendChild(header)
    div.appendChild(calories)
    div.appendChild(duration)
    div.appendChild(description)
    workoutForm.appendChild(div)
    workoutForm.style.display = 'block'
}


leftArrowContainer.addEventListener("click",() => {
    leftArrowContainer.style.color = 'green'
    setInterval(() => {
        leftArrowContainer.style.color = 'black'
    }, 500);
    var interval = null;
    let pos = 0;
    let counter = 1;
    let offset = 50;
    let lastWeek = []
    let i = 0;
    let indCurr = -1;
    let lastWeekAnim = []
    while(i < week.childElementCount){
        const date = new Date(week.children[i].children[0].innerText)
        const newDay = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        let split = newDay.toLocaleDateString().split('/')
        lastWeek.push(split[0]+'/'+split[1]+'/'+(split[2].substring(2)))
        lastWeekAnim.push(split[0]+'/'+split[1]+'/'+(split[2]))
        if(week.children[i].style.backgroundColor != ''){
            indCurr = i
        }
        i++;
    }

    const animArr = checkGoalsCompleted(lastWeekAnim)
    
    interval = setInterval((animArr) => {
        // when to stop interval
        if(pos >= (700 + offset)){
            let i = 0;
            while(i < week.childElementCount){
                const date = new Date(week.children[i].children[0].innerText)
                if(date.toLocaleDateString() == selectedDate.children[0].innerText.split(', ')[1]){
                    week.children[i].style.backgroundColor = '#90EE90'
                } else {
                    week.children[i].style.backgroundColor = ''
                }
                i++;
            }

            clearInterval(interval)
        }
        // set text to next week when day goes out of view
        if(counter <= 7 && pos >= (counter*100)){
            week.children[counter-1].children[0].innerText = lastWeek[counter-1]
            if(indCurr == counter-1){
                week.children[indCurr].style.backgroundColor = ''
            }
            
            if(animArr[counter-1]){
                week.children[counter-1].children[1].children[0].style.visibility = 'visible'
            } else {
                week.children[counter-1].children[1].children[0].style.visibility = 'hidden'
            }
            counter++;
        }
        

        monPos = pos >= (700 + offset) ? (-700 - offset) + pos : pos
        monday.style.left = monPos+"%"
        tuePos = pos >= (600 + offset) ? (-700 - offset) + pos : pos
        tuesday.style.left = tuePos+"%"
        wedPos = pos >= (500 + offset) ? (-700 - offset) + pos : pos
        wednesday.style.left = wedPos+"%"
        thuPos = pos >= (400 + offset) ? (-700 - offset) + pos : pos
        thursday.style.left = thuPos+"%"
        friPos = pos >= (300 + offset) ? (-700 - offset) + pos : pos
        friday.style.left = friPos+"%"
        satPos = pos >= (200 + offset) ? (-700 - offset) + pos : pos
        saturday.style.left = satPos+"%"
        sunPos = pos >= (100 + offset) ? (-700 - offset) + pos : pos
        sunday.style.left = sunPos+"%"
        pos += 15;
    },16.7,animArr)
});

rightArrowContainer.addEventListener("click",() => {
    rightArrowContainer.style.color = 'green'
    setInterval(() => {
        rightArrowContainer.style.color = 'black'
    }, 500);
    var interval = null;
    let pos = 0;
    let counter = 1;
    let offset = 50;
    let nextWeek = []
    let i = 0;
    let indCurr = -1;
    let nextWeekAnim = []
    while(i < week.childElementCount){
        const date = new Date(week.children[i].children[0].innerText)
        const newDay = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        let split = newDay.toLocaleDateString().split('/')
        nextWeek.push(split[0]+'/'+split[1]+'/'+(split[2].substring(2)))
        nextWeekAnim.push(split[0]+'/'+split[1]+'/'+(split[2]))
        if(week.children[i].style.backgroundColor != ''){
            indCurr = i
        }
        i++;
    }

    const animArr = checkGoalsCompleted(nextWeekAnim);

    interval = setInterval((animArr) => {
        if(pos >= (700 + offset)){
            let i = 0;
            while(i < week.childElementCount){
                const date = new Date(week.children[i].children[0].innerText)
                if(date.toLocaleDateString() == selectedDate.children[0].innerText.split(', ')[1]){
                    week.children[i].style.backgroundColor = '#90EE90'
                } else {
                    week.children[i].style.backgroundColor = ''
                }
                i++
            }
            clearInterval(interval)
        }

        // set text to next week when day goes out of view
        if(counter <= 7 && pos >= (counter*100)){
            week.children[counter-1].children[0].innerText = nextWeek[counter-1]
            if(indCurr == counter-1){
                week.children[indCurr].style.backgroundColor = ''
            }
            if(animArr[counter-1]){
                week.children[counter-1].children[1].children[0].style.visibility = 'visible'
            } else {
                week.children[counter-1].children[1].children[0].style.visibility = 'hidden'
            }
            counter++;
        }

        monPos = pos >= (100 + offset) ? (700 + offset) - pos : -pos
        monday.style.left = monPos+"%"
        tuePos = pos >= (200 + offset) ? (700 + offset) - pos : -pos
        tuesday.style.left = tuePos+"%"
        wedPos = pos >= (300 + offset) ? (700 + offset) - pos : -pos
        wednesday.style.left = wedPos+"%"
        thuPos = pos >= (400 + offset) ? (700 + offset) - pos : -pos
        thursday.style.left = thuPos+"%"
        friPos = pos >= (500 + offset) ? (700 + offset) - pos : -pos
        friday.style.left = friPos+"%"
        satPos = pos >= (600 + offset) ? (700 + offset) - pos : -pos
        saturday.style.left = satPos+"%"
        sunPos = pos >= (700 + offset) ? (700 + offset) - pos : -pos
        sunday.style.left = sunPos+"%"
        pos += 15;
    },16.7,animArr)
});

function updateCheck(checkbox) { 
    let index = parseInt(checkbox.id);
    let arr = [6, 0, 1, 2, 3, 4, 5]
    let currDate = '' + selectedDate.innerText.split(', ')[1];
    if(user.exercise.daysEntered[currDate]) {
        if (user.exercise.daysEntered[currDate].workouts[index].done == true) {
            user.exercise.daysEntered[currDate].workouts[index].done = false;
            user.exercise.daysEntered[currDate].caloriesBurned -= user.exercise.daysEntered[currDate].workouts[index].calBurn
        } else {
            user.exercise.daysEntered[currDate].workouts[index].done = true;
            user.exercise.daysEntered[currDate].caloriesBurned += user.exercise.daysEntered[currDate].workouts[index].calBurn

        } 
        weekday = new Date(currDate).getDay()
        if (checkDailyGoal(user.exercise.daysEntered[currDate].workouts) == 0) {
            week.children[arr[weekday]].children[1].children[0].style.visibility = 'visible'
        } else {
            week.children[arr[weekday]].children[1].children[0].style.visibility = 'hidden'
        }
    }        
}

function checkDailyGoal(exercises){
    for (let i = 0; i < exercises.length; i++) {
        if (!exercises[i].done) {
            return 1
        }
    } 
    return 0

}

function checkGoalsCompleted(week){
    let i = 0;
    let arr = []
    while(i < week.length){
        if(user['exercise']['daysEntered'][week[i]]){
            let check = checkDailyGoal(user.exercise.daysEntered[week[i]].workouts)
            if (check == 1) {
                arr.push(false)
            } else {
                arr.push(true)
            }
        } else {
            arr.push(false)
        }

        i++;
    }
    return arr
}

closeDescription.addEventListener('click', () => {
    workoutForm.removeChild(workoutForm.children[1])
    var selectors = document.getElementsByTagName('button');
    for (let i = 1; i < selectors.length; i++) {
        selectors[i].disabled = false
    }
    workoutForm.style.display = 'none'
})

closeEditForm.addEventListener('click', () => {
    var selectors = document.getElementsByTagName('button');
    for (let i = 1; i < selectors.length; i++) {
        selectors[i].disabled = false
    }
    editExerciseForm.style.display = 'none'
})


reschedule.onclick = displayPrompt;

function displayPrompt() {
    editExerciseForm.style.display = 'block';
    let date = selectedDate.innerText.split(', ')[1]
    if (user.exercise.daysEntered[date]) {
        let workout = null
        for(let i = 0; i < user.exercise.daysEntered[date].workouts.length; i++) {
            workout = document.createElement('div')
            workout.className = 'workout'
            workout.id =  user.exercise.daysEntered[date].workouts[i].name.replace(/\s/g, '') + i 
            workout.textContent = user.exercise.daysEntered[date].workouts[i].name
            let deleteEl = document.createElement("div");
            deleteEl.style.display = 'inline-block'
            deleteEl.style.position = 'absolute'
            deleteEl.style.left = '90%'
            deleteEl.style.color = 'red'
            deleteEl.innerText = 'X'
            deleteEl.id = workout.id+"Del"
            deleteEl.addEventListener('click', (e) => {
                let par = e.target.parentElement
                par.parentElement.removeChild(par)
            })
        }
        console.log(workout)
    }
}

closeEditForm.onclick = newDate;


function newDate() {
    let entry = document.getElementById("newDate").value;
    if(isValidDateFormat(entry)) {
        let currDate = selectedDate.innerText.split(', ')[1];
        let form = document.getElementById('workoutForm')
        let workoutToMove = user.exercise.daysEntered[currDate].workouts[form.children[2].id]
        workoutToMove.done = false
        user.exercise.daysEntered[currDate].workouts.splice(form.children[2].id, 1)
        if(user.exercise.daysEntered[entry]) {
            user.exercise.daysEntered[entry].workouts.push(workoutToMove)
        } else { 
            let newarr = [workoutToMove]
            user.exercise.daysEntered[entry] = {
                'workouts': newarr,
                'caloriesBurned': 0
            } 
        } 
    } else {
        document.getElementById('newDate').value = 'Invalid Date; Format mm/dd/yy';
    }
}

function isValidDateFormat(dateString) {
    var dateFormat = /^\d{2}\/\d{2}\/\d{2}$/;
    
    if (dateFormat.test(dateString)) {
        var parts = dateString.split('/');
        var month = parseInt(parts[0], 10);
        var day = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 0 && year <= 99) {
        return true;
        }
    }
    
    return false;
}