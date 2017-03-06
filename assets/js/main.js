$(document).ready(function(){

  $('#normal')
  .removeAttr('hidden')
  .hide()
  .fadeIn(500);

  $('a').each(function(){
    if($(this).attr('href') === ''){
      $(this).click(function(){
        event.preventDefault();
      });
    }
  });

  function getData(){
    if(localStorage['petName'] === undefined || localStorage['petName'] === null){
      var petName = prompt('Hello, please enter your pet\'s name:', '');
      if(petName !== '' && petName !== null && petName !== undefined){
        localStorage['petName'] = petName;
      }else{
        getData();
      }
    }
    if(localStorage['petAnimal'] === undefined || localStorage['petAnimal'] === null){
      var petAnimal = prompt('Hello, please enter what type of animal your pet is:', '');
      if(petAnimal !== '' && petAnimal !== null && petAnimal !== undefined){
        localStorage['petAnimal'] = petAnimal;
      }else{
        getData();
      }
    }
    if(localStorage['petImage'] === undefined || localStorage['petImage'] === null){
      var petImage = prompt('Hello, please enter the image location for your pet (E.g. C:\\Users\\Someone\\Desktop\\my-pet.png or http://example.com/my-pet.png):', '');
      if(petImage !== '' && petImage !== null && petImage !== undefined){
        localStorage['petImage'] = petImage;
      }else{
        getData();
      }
    }
  }
  getData();
  $('title').html(localStorage['petName'] + ' the ' + localStorage['petAnimal']);
  $('.name').html(localStorage['petName']);
  $('.animal').html(localStorage['petAnimal']);
  $('#image').attr('src', localStorage['petImage']);

  function getYear(){
    var year = new Date().getFullYear();
    if(year === 2017){
      return year;
    }else{
      return '2017 - ' + year;
    }
  }
  $('#copyright').html('&copy; ' + getYear() + ' TheDragonRing');

  $('#reset').click(function(){
    if(confirm('Are you sure you want to restart the game? All your data will be lost (including your pets name, type and image location).')){
      localStorage.clear();
      location.reload();
    }
  });

  var healthTimer = setInterval(healthCountdown, 2000);
  function healthCountdown(){
    var display = $('#health');
    if(isNaN(localStorage['petHealth'])){
      localStorage['petHealth'] = 100.1;
    }else{
      localStorage['petHealth'] = localStorage['petHealth']-0.1;
    }
    if(parseFloat(localStorage['petHealth']) >= 100){
      display.html('100%');
    }else{
      display.html(parseFloat(localStorage['petHealth']).toFixed(1).replace(/\.0$/,'') + '%');
    }
    if(parseFloat(localStorage['petHealth']).toFixed(1) <= -0.1){
      clearInterval(healthTimer);
      clearInterval(interestTimer);
      localStorage.clear();
      display.html('0%');
      if(confirm('Oh no! Your pet got too hungry 😢. Would you like to start a new game?')){
        location.reload();
      }else{
        $('#normal')
        .removeAttr('hidden')
        .hide()
        .fadeOut(500);
        $('#gameover')
        .removeAttr('hidden')
        .hide()
        .fadeIn(500);
      }
    }
  }
  $('#feed').click(function(){
    localStorage['petHealth'] = 100.1;
  });
  healthCountdown();

  var interestTimer = setInterval(interestCountdown, 2000);
  function interestCountdown(){
    var display = $('#interest');
    if(isNaN(localStorage['petInterest'])){
      localStorage['petInterest'] = 100.1;
    }else{
      localStorage['petInterest'] = localStorage['petInterest']-0.1;
    }
    if(parseFloat(localStorage['petInterest']) >= 100){
      display.html('100%');
    }else{
      display.html(parseFloat(localStorage['petInterest']).toFixed(1).replace(/\.0$/,'') + '%');
    }
    if(parseFloat(localStorage['petInterest']).toFixed(1) <= -0.1){
      clearInterval(interestTimer);
      clearInterval(healthTimer);
      localStorage.clear();
      display.html('0%');
      if(confirm('Oh no! Your pet got too bored 😢. Would you like to start a new game?')){
        location.reload();
      }else{
        $('#normal')
        .removeAttr('hidden')
        .hide()
        .fadeOut(500);
        $('#gameover')
        .removeAttr('hidden')
        .hide()
        .fadeIn(500);
      }
    }
  }
  $('#play').click(function(){
    localStorage['petInterest'] = 100.1;
  });
  interestCountdown();

});
