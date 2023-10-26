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
const addMealButton = document.getElementById('addMealButton')
const addMealForm = document.getElementById('addMealForm')

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
    let date = new Date(selectedDate.innerText.split(', ')[1])
    const newDay = new Date(el.children[0].innerText);
    selectedDate.children[0].innerText = dayOfTheWeek[newDay.getDay()] +", "+newDay.toLocaleDateString()

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
    while(i < week.childElementCount){
        const date = new Date(week.children[i].children[0].innerText)
        const newDay = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        let split = newDay.toLocaleDateString().split('/')
        lastWeek.push(split[0]+'/'+split[1]+'/'+(split[2].substring(2)))
        if(week.children[i].style.backgroundColor != ''){
            indCurr = i
        }
        i++;
    }
    
    interval = setInterval(() => {
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
    },16.7)
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
    while(i < week.childElementCount){
        const date = new Date(week.children[i].children[0].innerText)
        const newDay = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        let split = newDay.toLocaleDateString().split('/')
        nextWeek.push(split[0]+'/'+split[1]+'/'+(split[2].substring(2)))
        if(week.children[i].style.backgroundColor != ''){
            indCurr = i
        }
        i++;
    }
    interval = setInterval(() => {
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
    },16.7)
});

// food list
// TODO: add meal on button press, when a meal is pressed provide pop up with calorie and macro distribution and option to edit/delete
addMealButton.addEventListener('click', () =>{
    // open a form to enter information
    addMealForm.style.display = 'block'
})


// General TODO: create JSON structure that contains users and each diet, find or populate JSON containing food information


/* Example JSON for diet
    user : {
        exercise: {
            caloriesBurned: <int>,
        },
        diet: {
            goal: {
                calories: <int>,
                protein: <int>,
                carbs: <int>,
                fats: <int>
            },
            dietPlan: {
                breakfast: {
                    foods: {<food>: <quantity>}
                },
                lunch: {
                    foods: {<food>: <quantity>}
                },
                dinner: {
                    foods: {<food>: <quantity>}
                },
                snacks: {
                    foods: {<food>: <quantity>}
                }
            }
            daysEntered: { day_entered: {<map of meals similar to above>}}
        },
        habits: {},
        settings: {}
    }

*/
