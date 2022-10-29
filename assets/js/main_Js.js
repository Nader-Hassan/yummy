$(document,window).ready(function(){
  $('.loading').fadeOut(1000);
})
async function homeMeals(){
     window.getDetalisMeal = getDetalisMeal;
     window.filtercateogryMeals = filtercateogryMeals ;
     window.filteringredientsMeals = filteringredientsMeals;
    let homeMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let allHomeMeals = await homeMeals.json();
    let meals = new Map(Object.entries(allHomeMeals.meals));
    let term = "";
  for( [key,value] of meals)
  {

    term += `  <div class="col-md-3" onclick="getDetalisMeal(${value.idMeal})">
    <div class="home position-relative mt-5">
    <img src="${value.strMealThumb}">
    <div class="overlay d-flex align-items-center justify-content-center">
    <h2 class="fw-normal">${value.strMeal}</h2>
   </div>
    </div>
  </div>`
  $('.homeItems .row').html(term);
  }
  $('.menu img').click(function(){
    $('.loading').fadeIn(100);
    $('.loading').fadeOut(1000);
    $('.searchinputs').css('display' , 'none');
    $('.contactinputs').css('display' , 'none');
  $('.homeItems .row').html(term);
  
  })
}
homeMeals();
// =============================================================================================
async function getDetalisMeal(term){  
  let detailsMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${term}`);
  let allDetailsMeals = await detailsMeals.json();
  let meals = new Map(Object.entries(allDetailsMeals.meals));
  let term2 = "";
  let term3 ="";
  let term4 ="";
  for( [key,value] of meals)
  {
   if(value.strTags != null)
   {
     let tags = value.strTags.split(',');
     for(let x = 0 ; x < tags.length ; x++  )
     {
       term4 += `<span class="borderr2">${tags[x]}</span>`
     } 
   }
     for(let i = 1 ; i < 20 ; i++)
     {
       if(value[`strIngredient${i}`] != "" && value[`strIngredient${i}`] != null)
       {
         term3 += `<span class="borderr">${value[`strMeasure${i}`]}${value[`strIngredient${i}`]}</span>` 
       }
        
     }
      term2 = ` <div class="col-md-4">
      <img src="${value.strMealThumb}" >
       <h2 class="text-center text-white mt-3">${value.strMeal}</h2>
       </div>
      <div class="col-md-8 text-white mt-3">
      <h2>Instructions</h2>
      <p>${value.strInstructions}</p>
      <p class="fw-bold">Area : <span class="fw-normal">${value.strArea}</span></p>
      <p class="fw-bold">Cateogry : <span class="fw-normal">${value.strCategory}</span></p>
      <h3>Recipes :</h3>
      <div class="recipes my-2 d-flex flex-wrap gap-2">
      </div>
      <h3 class="my-2 tagshead">Tags :</h3>
      <div class="tags d-flex flex-wrap gap-2">
      </div>
      <a href="${value.strSource}" target="_blank" class="text-info mt-2"> Source </a>
      <a href="${value.strYoutube}" target="_blank"><i class="fa-brands fa-youtube fs-5 text-danger m-2"></i></a> 
      </div>`
  }
  $('.loading').fadeIn(100);
  $('.loading').fadeOut(1000);

  $('.searchinputs').css('display' , 'none');
  $('.homeItems .row').html(term2);
  $('.recipes').html(term3);
  $('.tags').html(term4);
  if($('.tags').html() == "")
  {
   $('.tagshead').css('display' , 'none')
  }
}
// =====================================================================
$('#switchBar').click(function(){
    if($('.nav-bar').width() == 0)
    {
        $('.nav-bar').animate({'width':'270px'} ,500);
        $('.nav-links , .nav-icons').css('display' , 'block');
        $('.menu').animate({'left' : '210px'}, 500);
        $('#switchBar').removeClass('fa-bars');
        $('#switchBar').addClass('fa-xmark');
    }
    else
    {
        $('.nav-bar').animate({'width':'0px'} ,500);
        $('.nav-links , .nav-icons').css('display' , 'none');
        $('.menu').animate({'left' : '0px'}, 500);
        $('#switchBar').addClass('fa-bars');
        $('#switchBar').removeClass('fa-xmark');
    }

})
// ===================================================================
async function cateogryMeals(){
    let cateogryMeals = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let allCateogryMeals = await cateogryMeals.json();
    let catemeals = new Map(Object.entries(allCateogryMeals.categories));
    let cateterm = "";
  for( [key,value] of catemeals)
  {
    cateterm += `  <div class="col-md-3" onclick="filtercateogryMeals('${value.strCategory}')">
    <div class="layer"><img src="${value.strCategoryThumb}">
    <div class="overlay2 d-flex align-items-center flex-column">
    <h2 class="fw-normal ms-2 ">${value.strCategory}</h2>
    <p class="p-2 overflow-hidden fw-semibold">${value.strCategoryDescription}<p>
   </div>
   </div>
  </div>`
  }
$('#categories').click(function(){
  $('.loading').fadeIn(100);
  $('.loading').fadeOut(1000);
  $('.searchinputs').css('display' , 'none');
  $('.contactinputs').css('display' , 'none');
  $('.homeItems .row').html(cateterm);
})
}cateogryMeals();
// ==============================================================================
async function areaMeals(){
    let areaMeals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let allAreaMeals = await areaMeals.json();
    let areaTerm = "";
    for(let i = 0 ; i < 20 ; i++ )
    {
        areaTerm += `  <div class="col-md-3 areapointer" onclick="filterareaMeals('${allAreaMeals.meals[i].strArea}')">
        <div class="layer text-center">
        <i class="fa-solid fa-city fa-3x text-danger"></i>
        <p class="text-white fs-5">${allAreaMeals.meals[i].strArea}</p>
        </div>
      </div>`
    }
    $('#area').click(function(){
      $('.loading').fadeIn(100);
      $('.loading').fadeOut(1000);
      $('.contactinputs').css('display' , 'none');
      $('.searchinputs').css('display' , 'none');
      $('.homeItems .row').html(areaTerm);
    })
}areaMeals();


// ==============================================================================
async function ingredientsMeals(){
    let ingredientsMeals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let allIngredientsMeals = await ingredientsMeals.json();
    let ingremeals = new Map(Object.entries(Array.from(allIngredientsMeals.meals).splice(0,20))); 
    let ingreTerm = "";
  for( [key,value] of ingremeals)
  {

    ingreTerm += `  <div class="col-md-3 " onclick="filteringredientsMeals('${value.strIngredient}')">
    <div class=" text-center ingredientslayer text-white">
    <i class="fa-solid fa-bowl-food fa-3x textgreen"></i>
    <h4>${value.strIngredient}</h4>
    <p>${value.strDescription}</p>
    </div>
  </div>`
  }
  $('#ingredients').click(function(){
    $('.loading').fadeIn(100);
    $('.loading').fadeOut(1000);
    $('.contactinputs').css('display' , 'none');
    $('.searchinputs').css('display' , 'none');
    $('.homeItems .row').html(ingreTerm);
})
}ingredientsMeals();
// ========================================================================================
async function filtercateogryMeals(term){
  let cateogryMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
  let allCateogryMeals = await cateogryMeals.json();
  let catemeals = new Map(Object.entries(allCateogryMeals.meals));
  let cateterm = "";
for( [key,value] of catemeals)
{
  
  cateterm += `<div class="col-md-3" onclick="getDetalisMeal(${value.idMeal})">
  <div class="home position-relative mt-5">
  <img src="${value.strMealThumb}">
  <div class="overlay d-flex align-items-center justify-content-center">
  <h2 class="fw-normal">${value.strMeal}</h2>
 </div>
  </div>
</div>`
}
$('.homeItems .row').html(cateterm);
$('.loading').fadeIn(100);
$('.loading').fadeOut(1000);
}
// ================================================================================
async function filteringredientsMeals(term){
  let filteringredientsMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
  let allIngredientsMeals = await filteringredientsMeals.json();
  let ingremeals = new Map(Object.entries(allIngredientsMeals.meals));
  let ingreTerm = "";
for( [key,value] of ingremeals)
{
 
  ingreTerm +=`  <div class="col-md-3" onclick="getDetalisMeal(${value.idMeal})">
  <div class="home position-relative mt-5">
  <img src="${value.strMealThumb}">
  <div class="overlay d-flex align-items-center justify-content-center">
  <h2 class="fw-normal">${value.strMeal}</h2>
 </div>
  </div>
</div>`
}
$('.loading').fadeIn(100);
$('.loading').fadeOut(1000);
$('.homeItems .row').html(ingreTerm);
}
// ================================================================
async function filterareaMeals(term){
  let areaMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
  let allAreaMeals = await areaMeals.json();
  let areameals = new Map(Object.entries(allAreaMeals.meals));
  let areaTerm = "";
  for([key,value] of areameals)
  {
      areaTerm += `<div class="col-md-3" onclick="getDetalisMeal(${value.idMeal})">
      <div class="home position-relative mt-5">
      <img src="${value.strMealThumb}">
      <div class="overlay d-flex align-items-center justify-content-center">
      <h2 class="fw-normal">${value.strMeal}</h2>
     </div>
      </div>
    </div>`
  }
  $('.loading').fadeIn(100);
  $('.loading').fadeOut(1000);
  $('.homeItems .row').html(areaTerm);
}

async function search(term){
  let searchMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  let allSearchMeals = await searchMeals.json();
  let searchmeals = new Map(Object.entries(allSearchMeals.meals));
  let searchterm = "";
  for([key,value] of searchmeals)
  {
 
    searchterm += `<div class="col-md-3 animate__animated animate__fadeIn" onclick="getDetalisMeal(${value.idMeal})">
      <div class="home position-relative mt-5">
      <img src="${value.strMealThumb}">
      <div class="overlay d-flex align-items-center justify-content-center">
      <h2 class="fw-normal">${value.strMeal}</h2>
     </div>
      </div>
    </div>`
  }
  $('.homeItems .row').html(searchterm);


}
// ==================================================================
async function searchletter(term){
  let searchMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  let allSearchMeals = await searchMeals.json();
  let searchmeals = new Map(Object.entries(allSearchMeals.meals));
  let searchterm = "";
  for([key,value] of searchmeals)
  {
 
    searchterm += `<div class="col-md-3 animate__animated animate__fadeIn" onclick="getDetalisMeal(${value.idMeal})">
      <div class="home position-relative mt-5">
      <img src="${value.strMealThumb}">
      <div class="overlay d-flex align-items-center justify-content-center">
      <h2 class="fw-normal">${value.strMeal}</h2>
     </div>
      </div>
    </div>`
  }

  $('.homeItems .row').html(searchterm);

}
// =========================================================================================================

$("#search").click(function(){ 
  let searchinputs = `
  <div class="container mt-5">
  <div class="d-flex justify-content-between">
      <input class="form-control edit-input byname" type="text" placeholder="search by Name">
      <input class="form-control edit-input byletter" maxlength="1" type="text" placeholder="search by Letter">
  </div>
</div>`;
  $('.loading').fadeIn(100);
  $('.loading').fadeOut(1000);
  $('.searchinputs').css('display' , 'block');
  $('.contactinputs').css('display' , 'none');
  $('.homeItems .row').html(null);
  $('.searchinputs .row').html(searchinputs);
  $('.byname').on('input',function(){
    search(this.value)
  })
  $('.byletter').on('input',function(){
    searchletter(this.value)
  })
})
// ===========================================================================

$("#contact").click(function(){ 
  let contactinputs = `
  
  <h2 class="text-center text-white fw-light h1 mt-5">Contact Us</h2>
  <form action="#" class="container mt-3">
  <div class="d-flex">
      <input type="text" class="form-control edit-input w-50" placeholder="Enter your name">
      <input type="email" class="form-control edit-input w-50" placeholder="Enter your email">
  </div>
  <div class="d-flex">
      <input type="tel" class="form-control edit-input w-50" placeholder="Enter your phone number">
      <input type="password" maxlength="3" class="form-control edit-input w-50" placeholder="Enter your age">
  </div>
  <div class="d-flex">
      <input type="text" class="form-control edit-input w-50" placeholder="Enter password">
      <input type="text" class="form-control edit-input w-50" placeholder="Enter re-password">
  </div>
  <button class="btn btn-danger mt-3 ms-3">Submit</button>
</form>
`;
  $('.contactinputs').css('display' , 'block');
  $('.searchinputs').css('display' , 'none');
  $('.loading').fadeIn(100);
  $('.loading').fadeOut(1000);
  $('.homeItems .row').html(null);
  $('.contactinputs').html(contactinputs);
})







