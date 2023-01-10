"use strict";

const textarea = document.querySelector("textarea");
const posts = document.querySelector("main");
const postBtn = document.querySelector(".post-btn");
const textArea = document.querySelector("textarea");

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
      <p class="space gray">31 mins</p>
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

  posts.insertAdjacentHTML("beforeend", html);
};

postBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const postBody = textArea.value;

  addPost(postBody);

  textArea.value = "";
});
