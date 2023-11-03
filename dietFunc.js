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
const addFoodButton = document.getElementById('addFoodButton')
const addMealForm = document.getElementById('addMealForm')
const calorieList = document.getElementById('calorieList')
const foodName = document.getElementById('foodName')
const quantity = document.getElementById('quantity')
const mealNameInput = document.getElementById('mealNameInput')
const foodSelect = document.getElementById('foodSelect')
const quantitySelect = document.getElementById('quantitySelect')
const addFoodList = document.getElementById('addFoodList')
const publishMealButton = document.getElementById('publishMealButton')



let foodKeys = Object.keys(foods)
for (let key of Object.keys(foods)){
    let temp = new Option(key,key)
    foodSelect.appendChild(temp)
}

let i = 2;
while(i <= 4){
    let temp = new Option(i,i)
    quantitySelect.appendChild(temp)
    i++;
}

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
    addMealForm.style.display = 'grid'
    addMealButton.disabled = true
})

addFoodButton.addEventListener('click', () => {
    if(foodSelect.value == 'disabled' || addFoodList.querySelector("#"+foodSelect.value)){
        return
    }
   
    let el = document.createElement("div");
    el.className = "food"
    el.id = foodSelect.value
    let str = ``
    str = str + quantitySelect.value;
    
    while(str.length < 3){
        str = str + `\u00A0`
        
    }
    if(quantitySelect.value.length != 3){
        str = str + `\u00A0`
    }

    el.innerText = str+ `\u00A0\u00A0`+foodSelect.value
    
    let deleteEl = document.createElement("div");
    deleteEl.style.display = 'inline-block'
    deleteEl.style.position = 'absolute'
    deleteEl.style.left = '90%'
    deleteEl.style.color = 'red'
    deleteEl.innerText = 'X'
    deleteEl.id = foodSelect.value+"Del"
    deleteEl.addEventListener('click', (e) => {
        let par = e.target.parentElement
        par.parentElement.removeChild(par)
        
    })

    el.appendChild(deleteEl)
    
    addFoodList.appendChild(el);
    foodSelect.value = 'disabled'
    quantitySelect.value = 1
})

publishMealButton.addEventListener('click', () => {
    if(mealNameInput.value == "" || (user['diet']['daysEntered'][selectedDate.innerText.split(' ')[1]] && user['diet']['daysEntered'][selectedDate.innerText.split(' ')[1]][mealNameInput.value])){
        return
    }

    let el = document.createElement("div");
    el.className = "meal"
    el.id = mealNameInput.value

    let header = document.createElement("b");
    header.innerText = mealNameInput.value
    el.appendChild(header);
    let calSum = 0;
    let i = 0;
    let foodMap = {}
    while(i < addFoodList.childElementCount){
        let tmp = document.createElement("div");
        tmp.className = "food"
        let test = addFoodList.children[i].innerText.substring(0, addFoodList.children[i].innerText.length-2)
        console.log(test)
        let quant = test.substring(0, test.indexOf('\u00A0')); 
        let j = 0;
        while(test.substring(test.indexOf('\u00A0') + j)[0] == '\u00A0'){
            j++;
           
        }
        let food = test.substring(test.indexOf('\u00A0') + j); 

        tmp.innerText = test

        // calories for food
        let calories = document.createElement("div");
        calories.className = "calorie"
        calSum += foods[food].calories*eval(quant)
        calories.innerText = foods[food].calories*eval(quant)
        tmp.appendChild(calories)

        //update JSON
        foodMap[food] = quant
        user['diet']['goal']['calories'] += foods[food].calories
        user['diet']['goal']['protein'] += foods[food].protein
        user['diet']['goal']['carbs'] += foods[food].carbs
        user['diet']['goal']['fats'] += foods[food].fats

        el.appendChild(tmp)
        i++;
    }

    // add foodMap to user JSON
    if(!user['diet']['daysEntered'][selectedDate.innerText.split(" ")[1]]){
        user['diet']['daysEntered'][selectedDate.innerText.split(" ")[1]] = {}
    }
    user['diet']['daysEntered'][selectedDate.innerText.split(" ")[1]][mealNameInput.value] = foodMap
    

    // add in total calories

    // first line break
    let br1 = document.createElement("br");
    el.appendChild(br1)

    // total calorie amount
    let totalCalories = document.createElement("div")
    totalCalories.className = "food"
    let totalCalHeader = document.createElement("b");
    totalCalHeader.innerText = "Total Calories"
    totalCalories.appendChild(totalCalHeader)
    let totalCalAmount = document.createElement("div")
    totalCalAmount.className = "calorie"
    let totalCalAmtHeader = document.createElement("b");
    totalCalAmtHeader.innerText = calSum
    totalCalAmount.append(totalCalAmtHeader)
    totalCalories.appendChild(totalCalAmount)
    el.appendChild(totalCalories)

    // second line break
    let br2 = document.createElement("br");
    el.appendChild(br2)

    calorieList.appendChild(el)

    addMealForm.style.display = "none"
    addMealFormClear()
    addMealButton.disabled = false

})

cancelEditMeal.addEventListener('click', () => {
    addMealForm.style.display = 'none'
    addMealFormClear()
    addMealButton.disabled = false
})

function addMealFormClear(){
    mealNameInput.value = ''
    foodSelect.value = 'disabled'
    quantitySelect.value = '1'
    addFoodList.innerText = ''
}


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
