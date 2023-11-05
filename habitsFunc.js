// elements
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

let healthyHabits = ["Take a 1 mile walk",
                    "Read for 10 minutes",
                "Drink 8 glasses of water",
                "Eat 1 apple",
                "Meditate for 5 minutes",
                "Do 10 situps",
                "Do 10 pushups"]

let total = 3;



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
    if (date.toString() !== newDay.toString()) {
        updateHabits(newDay.toLocaleDateString());
    } 
}

function updateHabits(date) {
    total = 0;
    if (date in user.habits.daysEntered) {
        document.querySelector("#todoContents").innerHTML = "";
        for (let i = 0; i < user.habits.goals; i++) {
            let currHabit = healthyHabits[user.habits.daysEntered[date][0][i]];

            if (user.habits.daysEntered[date][1][i] == false) {
                document.getElementById("todoContents").insertAdjacentHTML('beforeend', "<input type='checkbox' id="+ i.toString() + "' class='largerCheckbox' onclick=\"updateCheck(this)\"><u>" + currHabit + "</u><br>");
            } else {
                document.getElementById("todoContents").insertAdjacentHTML('beforeend', "<input type='checkbox' id=" + i.toString() + "' class='largerCheckbox' checked='true' onclick=\"updateCheck(this)\"><u>" + currHabit + "</u><br>");
            }
            total++;
        }
    // Generates a new date object for the new day. 
    } else {
        let healthyHabits = ["Take a 1 mile walk",
                    "Read for 10 minutes",
                "Drink 8 glasses of water",
                "Eat 1 apple",
                "Meditate for 5 minutes",
                "Do 10 situps",
                "Do 10 pushups"]
        let totalHabits = 6;
        document.querySelector("#todoContents").innerHTML = "";
        habitMap = [[],[]];

        for (let i = 0; i < user.habits.goals; i++) {
            let randomNum = Math.floor(Math.random() * totalHabits);
            let randomHabit = healthyHabits[randomNum];
            document.getElementById("todoContents").insertAdjacentHTML('beforeend', "<input type='checkbox' id="+ i.toString() + "' class='largerCheckbox' onclick=\"updateCheck(this)\"><u>" + randomHabit + "</u><br>");
            habitMap[0].push(randomNum);
            habitMap[1].push(false);
            let used = healthyHabits.indexOf(randomHabit);
            healthyHabits.splice(used, 1)
            totalHabits--;
            total++;
        }
        user.habits.daysEntered[date] = habitMap;
    }
}

function updateCheck(checkbox) {
    let index = parseInt(checkbox.id);
    let currDate = selectedDate.innerText.split(', ')[1];
    
    if (user.habits.daysEntered[currDate][1][index] == true) {
        user.habits.daysEntered[currDate][1][index] = false;
    } else {
        user.habits.daysEntered[currDate][1][index] = true;
    }
    if (checkbox.checked) {
        let checks = user['habits']['daysEntered'][currDate][1];
        let completed = true;
        for (let index = 0; index < checks.length; index++) {
            if (user['habits']['daysEntered'][currDate][1][index] == false) {
                completed = false;
                break;
                }
            }
                
        if (completed == true){
            let k = 0;
            while (k < 7){
                if(week.children[k].style.backgroundColor != ''){
                    week.children[k].children[1].children[0].style.visibility = 'visible';
                }
                k++;
            }
        }
    } else {
        let checks = user['habits']['daysEntered'][currDate][1];
        let completed = true;
        for (let index = 0; index < checks.length; index++) {
            if (user['habits']['daysEntered'][currDate][1][index] == false) {
                completed = false;
                break;
                }
            }
                
        if (completed == false){
            let k = 0;
            while (k < 7){
                if(week.children[k].style.backgroundColor != '') {
                    week.children[k].children[1].children[0].style.visibility = 'hidden';
                }
                k++;
            }
        }
    }
}

// change to previous week
// TODO: remove/add checkmarks on scroll
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


// change to next week
// TODO: remove/add checkmarks on scroll
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

addTodoButton.onclick = displayPrompt;

function displayPrompt() {
    addTodoForm.style.display = 'block';
}

todoSubmitButton.onclick = addEntry;

function addEntry() {
    let entry = document.getElementById("thingTodo").value;
    let currDate = selectedDate.innerText.split(', ')[1];
    let index = (total - 1)
    addTodoForm.style.display = 'none';
    document.getElementById("thingTodo").value = "";
    document.getElementById("todoContents").insertAdjacentHTML('beforeend', "<input type='checkbox' id="+ index.toString() + "' class='largerCheckbox' onclick=\"updateCheck(this)\"><u>" + entry + "</u><br>");
    user.habits.daysEntered[currDate][0].push(index);
    user.habits.daysEntered[currDate][1].push(false);
    console.log(user.habits.daysEntered[currDate]);
}

function checkGoalsCompleted(week){
    let i = 0;
    let arr = []
    while(i < week.length){
        if(user['habits']['daysEntered'][week[i]]) {
            let checks = user['habits']['daysEntered'][week[i]][1];
            let completed = true;
            for (let index = 0; index < checks.length; index++) {
                if (user['habits']['daysEntered'][week[i]][1][index] == false) {
                    completed = false;
                    break;
                }
            }
            
            if (completed == true){
                arr.push(true)
            } else {
                arr.push(false)
            }
        } else {
            arr.push(false)
        }
        i++;
    }
    return arr;
}



