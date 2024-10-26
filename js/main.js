







showContacts();





let AllMeals = [];
let flag = false;

function closeSideNav() {

    $("#leftMenu").animate({ left: '-256.8px' }, 500); // Close animation
    $("#menuIcon").removeClass("fa-times").addClass("fa-align-justify");
    flag = false;
}



$("#menuIcon").click(function () {
    if (!flag) {
        $("#leftMenu").animate({ left: '0' }, 500);
        $("#menuIcon").removeClass("fa-align-justify").addClass("fa-times");
        flag = true;
    } else {
        $("#leftMenu").animate({ left: '-256.8px' }, 500);
        $("#menuIcon").removeClass("fa-times").addClass("fa-align-justify");
        flag = false;
    }
});
 




async function API() {

    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
        let data = await response.json();
    return data
    
}


async function showContacts() {
    let data = await API();
    const rowData = document.getElementById('rowData');
    rowData.innerHTML = '';

    AllMeals = data.meals; // Store all meals

    // Display all meals
    for (let meal of AllMeals) {
        const mealHTML = `
            <div class="col-md-3">
                <div onclick="showItem('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
        rowData.innerHTML += mealHTML;
    }
}
async function showItem(mealId) {

    const meal = AllMeals.find(item => item.idMeal === mealId);
    
    if (meal) {
        const rowData = document.getElementById('rowData');
        rowData.innerHTML = '';

        const mealHTML = `
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area:</span> ${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category:</span> ${meal.strCategory}</h3>
                <h3>Recipes:</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${Object.keys(meal)
                        .filter(key => key.startsWith('strIngredient') && meal[key])
                        .map(key => {
                            const ingredient = meal[key];
                            const measureKey = key.replace('strIngredient', 'strMeasure');
                            const measure = meal[measureKey] || '';
                            return `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
                        })
                        .join('')}
                </ul>
                <h3>Tags:</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${meal.strTags ? meal.strTags.split(',').map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join('') : ''}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">YouTube</a>
            </div>
        `;

        rowData.innerHTML += mealHTML;
    } 
    else {
        rowData.innerHTML = '<p class="text-center">No results found.</p>';
    }
}


function showSearchInputs(){


const rowData = document.getElementById('rowData');
    rowData.innerHTML = '';
    
const searchData = document.getElementById('searchContainer');
searchData.innerHTML = '';
const mealHTML = `


    
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control " type="text" placeholder="Search By Name" id="searchByNeme">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control  " type="text" placeholder="Search By First Letter">
        </div>
    </div>
        `


        searchData.innerHTML += mealHTML;
    
}
async function searchByName(name) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();

    const rowData = document.getElementById('rowData');
    rowData.innerHTML = '';

    if (data.meals) {
        AllMeals = data.meals; // Update AllMeals with search results
        for (let meal of AllMeals) {
            const mealHTML = `
                <div class="col-md-3">
                    <div onclick="showItem('${meal.idMeal}'); hideSearch()" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
            rowData.innerHTML += mealHTML;
        }
    } else {
        rowData.innerHTML = '<p class="text-center">No results found.</p>';
    }
}



async function searchByFLetter(letter) {

    if (!/^[a-zA-Z]$/.test(letter)) {
        return; 
    }

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();

    const rowData = document.getElementById('rowData');
    rowData.innerHTML = '';


    if (data.meals) {
        AllMeals = data.meals; 
        for (let meal of AllMeals) {
            const mealHTML = `
                <div class="col-md-3">
                    <div onclick="showItem('${meal.idMeal}'); hideSearch()" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
            rowData.innerHTML += mealHTML;
        }
    } else {
        rowData.innerHTML = '<p class="text-center">No results found.</p>';
    }
}


function hideSearch(){

        
const searchData = document.getElementById('searchContainer');
searchData.innerHTML = '';
}

async function getCategories() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    
    
    const rowData = document.getElementById('rowData');
    rowData.innerHTML = ''; 

    if (data && data.categories) {
        
        for (let i = 0; i < data.categories.length; i++) {
            const category = data.categories[i]; 
            const categoryHTML = `
                <div class="col-md-3">
                    <div onclick="getCategoryMeals('${category.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${category.strCategoryThumb}" alt="${category.strCategory}">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${category.strCategory}</h3>
                            <p>${category.strCategoryDescription.slice(0, 100)}...</p> <!-- Show first 100 chars of description -->
                        </div>
                    </div>
                </div>
            `;
            rowData.innerHTML += categoryHTML; 
        }
    } else {
        
        rowData.innerHTML = '<p class="text-center">No categories found.</p>';
    }
}

async function getCategoryMeals(category) {
    const rowData = document.getElementById('rowData');
    rowData.innerHTML = ''; 

    
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();


    if (data && data.meals) {
        
        for (let meal of data.meals) {
            const mealHTML = `
                <div class="col-md-3">
                    <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
            rowData.innerHTML += mealHTML; 
        }
    } else {
        
        rowData.innerHTML = '<p class="text-center">No meals found in this category.</p>';
    }
}
async function getMealDetails(mealId) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();

    
    const meal = data.meals[0];
    const rowData = document.getElementById('rowData');
    rowData.innerHTML = ''; 

    const mealHTML = `
        <div class="row py-5 g-4">
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
                <h3>Recipes:</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${Object.keys(meal)
                        .filter(key => key.startsWith('strIngredient') && meal[key])
                        .map(key => {
                            const measureKey = key.replace('strIngredient', 'strMeasure');
                            return `<li class="alert alert-info m-2 p-1">${meal[measureKey]} ${meal[key]}</li>`;
                        })
                        .join('')}
                </ul>

                <h3>Tags:</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${meal.strTags ? meal.strTags.split(',').map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join('') : ''}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        </div>
    `;

    rowData.innerHTML = mealHTML;
}







async function getArea() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await response.json();
    console.log(data);
    
    const rowData = document.getElementById('rowData');
    rowData.innerHTML = ''; 

    if (data && data.meals) {
        
        for (let i = 0; i < data.meals.length; i++) {
            const mealArea = data.meals[i]; 

            const areaHTML = `
                <div class="col-md-3">
                    <div onclick="getAreaMeals('${mealArea.strArea}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${mealArea.strArea}</h3>
                    </div>
                </div>
            `;
            rowData.innerHTML += areaHTML; 
        }
    } else {
        rowData.innerHTML = '<p class="text-center">No areas found.</p>';
    }
}


async function getAreaMeals(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    console.log(data);

    const rowData = document.getElementById('rowData');
    rowData.innerHTML = ''; 

    if (data && data.meals) {
        for (let i = 0; i < data.meals.length; i++) {
            const meal = data.meals[i];
            const mealHTML = `
                <div class="col-md-3">
                    <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
            rowData.innerHTML += mealHTML; 
        }
    } else {
        rowData.innerHTML = '<p class="text-center">No meals found for this area.</p>';
    }
}







async function getIngredients() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await response.json();
    console.log(data);

    const rowData = document.getElementById('rowData');
    rowData.innerHTML = '';

          
        for (let i = 0; i < data.meals.length; i++) {
            const ingredient = data.meals[i]; 

            const ingredientHTML = `
                <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${ingredient.strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredient.strIngredient}</h3>
                     <p>${ingredient.strDescription.slice(0, 109) || "No description available."}</p>
                    </div>
                </div>
            `;
            rowData.innerHTML += ingredientHTML; 
        }
    }


    async function getIngredientsMeals(ingredient) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        console.log(data);
    
        const rowData = document.getElementById('rowData');
        rowData.innerHTML = ''; 
    
    
        if (data && data.meals) {
            for (let i = 0; i < data.meals.length; i++) {
                const meal = data.meals[i];
    
                const mealHTML = `
                    <div class="col-md-3">
                        <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                            <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}" srcset="">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    </div>
                `;
                rowData.innerHTML += mealHTML; 
            }
        } else {
            rowData.innerHTML = '<p class="text-center">No meals found for this ingredient.</p>'; 
        }
    }
    

    function contact() {
        const rowData = document.getElementById('rowData');
        rowData.innerHTML = '';
        
        const ingredientHTML = `
            <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input id="nameInput" oninput="validate(this, regexPatterns.name)" type="text" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="emailInput" oninput="validate(this, regexPatterns.email)" type="email" class="form-control" placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid *example@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="phoneInput" oninput="validate(this, regexPatterns.phone)" type="text" class="form-control" placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter a valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="ageInput" oninput="validate(this, regexPatterns.age)" type="number" class="form-control" placeholder="Enter Your Age">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter a valid age (1-120)
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="passwordInput" oninput="validate(this, regexPatterns.password)" type="password" class="form-control" placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Minimum eight characters, at least one letter and one number.
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="repasswordInput" oninput="validateRepassword()" type="password" class="form-control" placeholder="Re-enter Your Password">
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Passwords do not match.
                            </div>
                        </div>
                    </div>
                    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                </div>
            </div>
        `;
        rowData.innerHTML += ingredientHTML; 
    }
    
    const regexPatterns = {
        name: /^[A-Za-z\s-]+$/, // Only letters, spaces, and hyphens
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email format
        phone: /^[0-9\s()+-]*$/, // Valid phone number format
        age: /^(1[0-9]|[1-9][0-9]?|1[01][0-9]|120)$/, // Ages from 1 to 120
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum 8 chars, at least 1 letter and 1 number
    };
    
    function validate(element, regex) {
        if (regex.test(element.value)) {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            element.nextElementSibling.classList.add("d-none");
            enableSubmitButton();
            return true;
        } else {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
            element.nextElementSibling.classList.remove("d-none");
            enableSubmitButton();
            return false;
        }
    }
    
    function validateRepassword() {
        const passwordInput = document.getElementById("passwordInput");
        const repasswordInput = document.getElementById("repasswordInput");
        const isValid = repasswordInput.value === passwordInput.value;
        
        repasswordInput.classList.toggle("is-valid", isValid);
        repasswordInput.classList.toggle("is-invalid", !isValid);
        document.getElementById("repasswordAlert").classList.toggle("d-none", isValid);
    
        enableSubmitButton();
    }
    
    function enableSubmitButton() {
        const isNameValid = validate(document.getElementById("nameInput"), regexPatterns.name);
        const isEmailValid = validate(document.getElementById("emailInput"), regexPatterns.email);
        const isPhoneValid = validate(document.getElementById("phoneInput"), regexPatterns.phone);
        const isAgeValid = validate(document.getElementById("ageInput"), regexPatterns.age);
        const isPasswordValid = validate(document.getElementById("passwordInput"), regexPatterns.password);
        const isRepasswordValid = document.getElementById("repasswordInput").classList.contains("is-valid");
    
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid);
    }
    