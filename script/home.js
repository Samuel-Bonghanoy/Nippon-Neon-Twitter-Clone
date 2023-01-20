"use strict";

const textarea = document.querySelector("textarea");
const posts = document.querySelector(".posts-list");
const postBtn = document.querySelector(".post-btn");
const textArea = document.querySelector("textarea");
textArea.value = "";
const contacts = document.querySelector(".contacts");
const messages = document.querySelector("aside");
let hearts = document.querySelectorAll(".heart-container");
const comments = document.querySelectorAll(".comment");

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
                <div class="heart-container">
                  <ion-icon
                    class="heart"
                    data-number-likes="0"
                    name="heart-outline"
                  ></ion-icon>
                  <span class="number-likes"></span>
                </div>
                <ion-icon
                  class="comment"
                  data-number-comments="0"
                  name="chatbubble-outline"
                ></ion-icon>
                <ion-icon name="share-social-outline"></ion-icon>
              </div>
  </div>
</div>`;

  posts.insertAdjacentHTML("afterbegin", html);
  let hearts = document.querySelectorAll(".heart-container");
  hearts.forEach((heart) =>
    heart.addEventListener(
      "click",
      function (e) {
        const heartIcon = heart.firstElementChild;
        const name = heartIcon.getAttribute("name");
        const numberLikes = heart.lastElementChild;

        if (name === "heart") {
          heartIcon.setAttribute("name", "heart-outline");
          if (Number(heartIcon.dataset.numberLikes) === 0)
            numberLikes.textContent = "";
          else
            numberLikes.textContent = `${
              Number(heartIcon.dataset.numberLikes) - 1
            }`;
        } else {
          heartIcon.setAttribute("name", "heart");
          console.log(heartIcon);
          numberLikes.textContent = `${
            Number(heartIcon.dataset.numberLikes) + 1
          }`;
        }
      },
      false
    )
  );
};

const containsAlphanumericSymbol = function (str) {
  return Boolean(str.includes(/^[A-Za-z0-9]*$/));
};

postBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const postBody = textArea.value;

  if (postBody === " ") return;

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
      if (!response.ok) throw new Error(`User not found`);
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
                <div class="heart-container">
                  <ion-icon
                    class="heart"
                    data-number-likes="0"
                    name="heart-outline"
                  ></ion-icon>
                  <span class="number-likes"></span>
                </div>
                <ion-icon
                  class="comment"
                  data-number-comments="0"
                  name="chatbubble-outline"
                ></ion-icon>
                <ion-icon name="share-social-outline"></ion-icon>
              </div>
    </div>
  </div>`;

    posts.insertAdjacentHTML("beforeend", html);
  }
  let hearts = document.querySelectorAll(".heart-container");
  hearts.forEach((heart) =>
    heart.addEventListener(
      "click",
      function (e) {
        const heartIcon = heart.firstElementChild;
        const name = heartIcon.getAttribute("name");
        const numberLikes = heart.lastElementChild;

        if (name === "heart") {
          heartIcon.setAttribute("name", "heart-outline");
          if (Number(heartIcon.dataset.numberLikes) === 0)
            numberLikes.textContent = "";
          else
            numberLikes.textContent = `${
              Number(heartIcon.dataset.numberLikes) - 1
            }`;
        } else {
          heartIcon.setAttribute("name", "heart");
          console.log(heartIcon);
          numberLikes.textContent = `${
            Number(heartIcon.dataset.numberLikes) + 1
          }`;
        }
      },
      false
    )
  );
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

// const heartsFill = function (heart) {
//   const heartIcon = heart.firstElementChild;
//   heartIcon.setAttribute("name", "heart");

//   console.log(heartIcon);

//   const numberLikes = heart.lastElementChild;

//   numberLikes.textContent = `${Number(heartIcon.dataset.numberLikes) + 1}`;
// };
