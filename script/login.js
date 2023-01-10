"use strict";

import { accounts as acc } from "./accounts.js";

const logo = document.querySelector(".logo");
const username = document.querySelector(".un");
const password = document.querySelector(".pw");
const login = document.querySelector(".login-btn");
const body = document.querySelector("body");

let count = 1;
const changeLogoColor = function () {
  if (count == 6) count = 1;
  else count++;

  logo.src = `../images/glowing-${count}.png`;
};

const changeLogoColorSpecific = function (colorNumber) {
  count = colorNumber;

  logo.src = `../images/glowing-${count}.png`;
};

// setInterval(changeLogoColor, 3000);

const verifyAccount = function (username, password) {
  if (username == acc.account1.username && password == acc.account1.password)
    return true;
  else if (
    username == acc.account2.username &&
    password == acc.account2.password
  )
    return true;
  else return false;
};

login.addEventListener("click", function (e) {
  e.preventDefault();

  // console.log(username.value);
  // console.log(acc.account1.username);
  if (verifyAccount(username.value, password.value)) {
    changeLogoColorSpecific(5);
    location.href = "../pages/home.html";
  } else {
    changeLogoColorSpecific(2);
  }
});
