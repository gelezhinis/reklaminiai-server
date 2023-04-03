const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');
const dropdown1 = document.querySelector('.dropdown1');
const dropdown2 = document.querySelector('.dropdown2');
const dropdown3 = document.querySelector('.dropdown3');
const dropdown4 = document.querySelector('.dropdown4');
// Mobile view
const mobileDropdown1 = document.querySelector('.mobile-dropdown1');
const mobileDropdown2 = document.querySelector('.mobile-dropdown2');
const mobileDropdown3 = document.querySelector('.mobile-dropdown3');
const mobileDropdown4 = document.querySelector('.mobile-dropdown4');


function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

function dropdownActive1() {
  if (dropdown1.classList.contains('active')) {
    dropdown1.classList.remove('active'); 
  } else {
    dropdown1.classList.add('active');  
  }
  dropdown2.classList.remove('active');  
  dropdown3.classList.remove('active');  
  dropdown4.classList.remove('active');  
}
function dropdownActive2() {
  if (dropdown2.classList.contains('active')) {
    dropdown2.classList.remove('active'); 
  } else {
    dropdown2.classList.add('active');  
  }
  dropdown1.classList.remove('active');
  dropdown3.classList.remove('active');
  dropdown4.classList.remove('active');
}
function dropdownActive3() {
  if (dropdown3.classList.contains('active')) {
    dropdown3.classList.remove('active'); 
  } else {
    dropdown3.classList.add('active');  
  }
  dropdown1.classList.remove('active');
  dropdown2.classList.remove('active');
  dropdown4.classList.remove('active');
}
function dropdownActive4() {
  if (dropdown4.classList.contains('active')) {
    dropdown4.classList.remove('active'); 
  } else {
    dropdown4.classList.add('active');  
  }
  dropdown1.classList.remove('active');
  dropdown2.classList.remove('active');
  dropdown3.classList.remove('active');
}

// Mobile view actions

function mobileDropdownActive1() {
  if (mobileDropdown1.classList.contains('active')) {
    mobileDropdown1.classList.remove('active'); 
  } else {
    mobileDropdown1.classList.add('active');  
  }
  mobileDropdown2.classList.remove('active');  
  mobileDropdown3.classList.remove('active');  
  mobileDropdown4.classList.remove('active');  
}
function mobileDropdownActive2() {
  if (mobileDropdown2.classList.contains('active')) {
    mobileDropdown2.classList.remove('active'); 
  } else {
    mobileDropdown2.classList.add('active');  
  }
  mobileDropdown1.classList.remove('active');
  mobileDropdown3.classList.remove('active');
  mobileDropdown4.classList.remove('active');
}
function mobileDropdownActive3() {
  if (mobileDropdown3.classList.contains('active')) {
    mobileDropdown3.classList.remove('active'); 
  } else {
    mobileDropdown3.classList.add('active');  
  }
  mobileDropdown1.classList.remove('active');
  mobileDropdown2.classList.remove('active');
  mobileDropdown4.classList.remove('active');
}
function mobileDropdownActive4() {
  if (mobileDropdown4.classList.contains('active')) {
    mobileDropdown4.classList.remove('active'); 
  } else {
    mobileDropdown4.classList.add('active');  
  }
  mobileDropdown1.classList.remove('active');
  mobileDropdown2.classList.remove('active');
  mobileDropdown3.classList.remove('active');
}

// add-product form  logic

function selectCategory(s1, s2) {
  // let category = document.getElementById('selcategory').value;
  // return selection = category;

  const sel1 = document.getElementById(s1);
  const sel2 = document.getElementById(s2);
  let optionArray;
  sel2.innerHTML = "";

  if (sel1.value == 'rpriemones') {
    optionArray = ['plastikiniai|Plastikiniai Tušinukai', 'metaliniai|Metaliniai Tušinukai', 'eko|EKO Tušinukai', 'piestukai|Pieštukai'];
  }
  else if (sel1.value == 'rveliavos') {
    optionArray = ['veliavos|Vėliavos', 'priedai|Vėliavų Priedai'];
  }
  else if (sel1.value == 'spauda') {
    optionArray = ['skrajutes|Skrajutės', 'lankstinukai|Lankstinukai', 'brosiuros|Brošiūros', 'bloknotai|Bloknotai'];
  }
  else if (sel1.value == 'puodeliai') {
    optionArray = null;
  }
  else if (sel1.value == 'atsvaitai') {
    optionArray = ['patsvaitai|Pakabinami Atšvaitai', 'juosteles|Justelės', 'liemenes|Liemenės'];
  }
  else {
    optionArray = null;
  }
  if (!optionArray) {
    sel2.classList.add('hide');
  } else {
    for (let option in optionArray) {
      sel2.classList.remove('hide');
      let splitArray = optionArray[option].split('|');
      let newOption = document.createElement("option");
      newOption.value = splitArray[0];  
      newOption.innerHTML = splitArray[1];  
  
      sel2.options.add(newOption);
    }
  }
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);

if (dropdown1, dropdown2, dropdown3, dropdown4) {
  dropdown1.addEventListener('click', dropdownActive1);
  dropdown2.addEventListener('click', dropdownActive2);
  dropdown3.addEventListener('click', dropdownActive3);
  dropdown4.addEventListener('click', dropdownActive4);
}
// Mobile view
mobileDropdown1.addEventListener('click', mobileDropdownActive1);
mobileDropdown2.addEventListener('click', mobileDropdownActive2);
mobileDropdown3.addEventListener('click', mobileDropdownActive3);
mobileDropdown4.addEventListener('click', mobileDropdownActive4);

// Product Gallery functionality

function imgFunction(smallImg) {
  const fullImg = document.getElementById('main-image');
  fullImg.src = smallImg.src;
}
