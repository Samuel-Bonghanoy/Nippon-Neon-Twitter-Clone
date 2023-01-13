"use strict";

const textarea = document.querySelector("textarea");
const posts = document.querySelector(".posts-list");
const postBtn = document.querySelector(".post-btn");
const textArea = document.querySelector("textarea");
textArea.value = "";
const contacts = document.querySelector(".contacts");
const messages = document.querySelector("aside");

const autoresize = function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
};

textarea.addEventListener("input", autoresize, false);

const addPost = function (postBody) {
  const html = `<div class="post-body">
  <img class="user" src="../images/user1.jpg" width="50" height="50" />
  <div class="post-text">
    <div class="user-handles">
      <div class="names">
        <p class="username-post">sethonne</p>
        <p class="gray">#69420</p>
      </div>
      <p class="space gray">Just now</p>
    </div>
    <p class="user-post-text">
      ${postBody}
    </p>
    <div class="post-icons">
      <ion-icon name="heart-outline"></ion-icon>
      <ion-icon name="chatbubble-outline"></ion-icon>
      <ion-icon name="share-social-outline"></ion-icon>
    </div>
  </div>
</div>`;

  posts.insertAdjacentHTML("afterbegin", html);
};

postBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const postBody = textArea.value;

  addPost(postBody);

  textArea.value = "";
});

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))

const getPostBody = async function (idNumber) {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${idNumber}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(`Post not found`);
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    });

  return data;
};

const getPostUser = async function (idNumber) {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${idNumber}`
  )
    .then((response) => {
      if (!response.ok) throw new Error(`Post not found`);
      return response.json();
    })
    .then((data) => {
      return data;
    });

  // console.log(data.name);
  return data;
};

const generatePosts = async function (usersNumber) {
  for (let i = 1; i <= usersNumber; i++) {
    let postData = await getPostBody(i);
    let userData = await getPostUser(i);

    let html = `<div class="post-body">
    <img class="user" src="../images/default.png" width="50" height="50" />
    <div class="post-text">
      <div class="user-handles">
        <div class="names">
          <p class="username-post">${userData.name}</p>
          <p class="gray">#${userData.address.zipcode.slice(0, 5)}</p>
        </div>
        <p class="space gray">${i} ${i === 1 ? "hour ago" : "hours ago"}</p>
      </div>
      <p class="user-post-text">
        ${postData.body}
      </p>
      <div class="post-icons">
        <ion-icon name="heart-outline"></ion-icon>
        <ion-icon name="chatbubble-outline"></ion-icon>
        <ion-icon name="share-social-outline"></ion-icon>
      </div>
    </div>
  </div>`;

    posts.insertAdjacentHTML("beforeend", html);
  }
};

generatePosts(10);

const generateContacts = async function () {
  for (let i = 1; i <= 4; i++) {
    let userData = await getPostUser(i);

    let usernameSpace = userData.name.indexOf(" ");

    let html = `<div class="contact-tab">
    <img
      class="user"
      src="../images/default.png"
      width="50"
      height="50"
    />
    <div class="contact-name">
      <p>${
        userData.name.length > 9
          ? userData.name.slice(0, usernameSpace)
          : userData.name
      }</p>
    </div>
  </div>`;

    contacts.insertAdjacentHTML("beforeend", html);
  }
};

generateContacts();

const generateMessages = async function () {
  for (let i = 1; i <= 6; i++) {
    let userData = await getPostUser(i);
    let html = `<div class="message">
  <img
    class="user"
    src="../images/default.png"
    width="50"
    height="50"
  />
  <div class="post-text">
    <div class="user-handles">
      <div class="names">
        <p class="username-post inactive">${
          userData.name.length > 15 ? userData.name.slice(0, 14) : userData.name
        }</p>
        <p class="gray">#${userData.address.zipcode.slice(0, 5)}</p>
      </div>
      <p class="space gray">${i} ${i === 1 ? "hour ago" : "hours ago"}</p>
    </div>
    <p class="user-post-text gray">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
    </p>
  </div>
</div>`;

    messages.insertAdjacentHTML("beforeend", html);
  }
};

generateMessages();
