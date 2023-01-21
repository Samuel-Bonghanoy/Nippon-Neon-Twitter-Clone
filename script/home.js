"use strict";

const textarea = document.querySelector("textarea");
const posts = document.querySelector(".posts-list");
const postBtn = document.querySelector(".post-btn");
const textArea = document.querySelector("textarea");
textArea.value = "";
const contacts = document.querySelector(".contacts");
const messages = document.querySelector("aside");
let hearts = document.querySelectorAll(".heart-container");
let comments = document.querySelectorAll(".comment");
const profileContainer = document.querySelector(".prof-pic");
const postBody = document.querySelector(".post-body");
const grid = document.querySelector(".grid");
const body = document.querySelector("body");
let commentTarget;
let commentTextArea;
let commentBody;
let postBodyText;

const autoresize = function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
};

textarea.addEventListener("input", autoresize, false);

const addPost = function (postBody) {
  const html = `<div class="full">
  <div class="post-body">
  <div class="prof-pic">
                <img
                  class="user"
                  src="../images/user1.jpg"
                  width="50"
                  height="50"
                />
              </div>
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
  </div>
</div>`;

  posts.insertAdjacentHTML("afterbegin", html);
};

const containsAlphanumericSymbol = function (str) {
  return Boolean(str.includes(/^[A-Za-z0-9]*$/));
};

postBtn.addEventListener("click", function (e) {
  e.preventDefault();

  postBodyText = textArea.value;
  const postBody = postBodyText;

  if (postBody === " ") return;

  addPost(postBody);

  let commentAdded = document.querySelector(".comment");
  commentAdded.addEventListener("click", function (e) {
    displayModal(e);
  });
  let heart = document.querySelector(".heart-container");
  heart.addEventListener("click", function (e) {
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
      // console.log(heartIcon);
      numberLikes.textContent = `${Number(heartIcon.dataset.numberLikes) + 1}`;
    }
  });

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

    let html = `<div class="full">
    <div class="post-body">
     <div class="prof-pic">
                <img
                  class="user"
                  src="../images/default.png"
                  width="50"
                  height="50"
                />
              </div>
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
    </div>
  </div>`;

    posts.insertAdjacentHTML("beforeend", html);
  }
  let hearts = document.querySelectorAll(".heart-container");
  // console.log(hearts);
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
          // console.log(heartIcon);
          numberLikes.textContent = `${
            Number(heartIcon.dataset.numberLikes) + 1
          }`;
        }
      },
      false
    )
  );

  comments = document.querySelectorAll(".comment");
  comments.forEach((comment) =>
    comment.addEventListener("click", function (e) {
      console.log("hi");
      displayModal(e);
    })
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

const displayModal = function (e) {
  commentTarget = e.target;
  let modal = `
    <section class="hidden modal">
      <button class="close-modal">&times;</button>
      <div class="post-body2 comment-text">
        <div class="comment-prof-pic prof-pic">
          <img class="user" src="../images/user1.jpg" width="50" height="50" />
          <hr class="vertical3" />
        </div>
        <div class="post-text comment-textarea">
          <div class="user-handles">
            <div class="names">
              <p class="username-post">sethonne</p>
              <p class="gray">#69420</p>
            </div>
            <p class="space gray">31 mins</p>
          </div>
          <p class="user-post-text">
          I seriously hate Javascript bruh I am actually losing my mind
          making this project rn please get me out of here hoooooolly
          </p>
          <p class="receiver">Replying to <strong>@sethonne</strong></p>
        </div>
      </div>
     
      <div class="comment-body">
        <img class="user" src="../images/user1.jpg" width="50" height="50" />
        <div class="post-text">
          <textarea
            class="form post comment-form"
            name="post"
            placeholder="Write your reply"
          >
          </textarea>
          <button class="post-btn2">Post</button>
        </div>
      </div>
    </section>`;

  let overlay = `<div class="overlay hidden"></div>`;

  grid.insertAdjacentHTML("afterend", overlay);
  body.insertAdjacentHTML("afterbegin", modal);

  let commentTextArea = document.querySelector(".comment-form");
  commentTextArea.value = "";
  // console.log(commentTextArea.value);

  let closeBtn = document.querySelector(".close-modal");
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".modal").remove();
    document.querySelector(".overlay").remove();
  });

  let postBtn = document.querySelector(".post-btn2");
  postBtn.addEventListener("click", function (e) {
    e.preventDefault();
    commentTextArea = document.querySelector(".comment-form");
    // console.log(commentTextArea.value);
    // console.log("hi");
    addComment(commentTarget, commentTextArea.value);
    document.querySelector(".modal").remove();
    document.querySelector(".overlay").remove();
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
            // console.log(heartIcon);
            numberLikes.textContent = `${
              Number(heartIcon.dataset.numberLikes) + 1
            }`;
          }
        },
        false
      )
    );
  });
};

const addComment = function (target, commentBody) {
  target.parentNode.parentNode.parentNode.firstElementChild.innerHTML += `${
    postBodyText ? '<hr class="vertical3" />' : '<hr class="vertical" />'
  }`;
  // console.log(target);
  // console.log(target.parentNode.parentNode.parentNode.firstElementChild);

  let commentHTML = `<div class="comment-body">
<img
  class="user"
  src="../images/user1.jpg"
  width="50"
  height="50"
/>
<div class="post-text">
  <div class="user-handles">
    <div class="names">
      <p class="username-post">sethonne</p>
      <p class="gray">#69420</p>
    </div>
    <p class="space gray">Just now</p>
  </div>
  <p class="user-post-text">
    ${commentBody}
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

  target.parentNode.parentNode.parentNode.insertAdjacentHTML(
    "afterend",
    commentHTML
  );
};

const firstComment = document.querySelector(".first-comment");
firstComment.addEventListener("click", function (e) {
  displayModal(e);
});
