const userIds = [];
const userId = userIds[0];
async function getCurrentUser() {
  const res = await fetch("/user");
  const user = await res.json();
  userIds.push(user.id);
}
getCurrentUser();

const optionList = document.querySelector(".sort-by");
optionList.addEventListener("change", async (event) => {
  console.log(event.target.value);

  if (event.target.value == "1") {
    console.log("1");
    const res = await fetch(`/photos`);
    const recentPhotos = await res.json();
    const recentPhotoContainer = document.querySelector(
      "#recent-photos-container"
    );
    recentPhotoContainer.innerHTML = "";
    loadRecentPhotos();
    return;
  } else if (event.target.value == "3") {
    console.log("3");
    // const res = await fetch(`/photos/likes`);
    // const recentPhotos = await res.json();
    // console.log(recentPhotos);
    loadMostLikePhotos();
    console.log("33");
    const recentPhotoContainer = document.querySelector(
      "#recent-photos-container"
    );
    recentPhotoContainer.innerHTML = "";

    return;
  } else if (event.target.value == "4") {
    console.log("4");
    const res = await fetch(`/photos/comments`);
    const recentPhotos = await res.json();
    const recentPhotoContainer = document.querySelector(
      "#recent-photos-container"
    );
    recentPhotoContainer.innerHTML = "";
    loadMostCommentPhotos();
    return;
  } else {
    const res = await fetch(`/photos`);
    const recentPhotos = await res.json();
    const recentPhotoContainer = document.querySelector(
      "#recent-photos-container"
    );
    recentPhotoContainer.innerHTML = "";

    loadRecentPhotos();
  }
});

//original

async function loadRecentPhotos() {
  const res = await fetch(`/photos`);
  const recentPhotos = await res.json();
  const recentPhotoContainer = document.querySelector(
    "#recent-photos-container"
  );

  const userId = userIds[0];
  recentPhotoContainer.innerHTML = "";
  getLikedPhotos();
  for (let recentPhoto of recentPhotos.photos) {
    recentPhotoContainer.innerHTML += `
    <div class='col-sm-4 j photo-card' data-id="${recentPhoto.id}">
      <div class="media-card col-sm-12">
        <h3 class="col-sm-12 photo-card-username-row" data-id="${
          recentPhoto.id
        }">
          <div>${recentPhoto.username}</div>
          <div class="delete-photo delete-container-${
            recentPhoto.user_id
          }"></div>
        </h3>
        <div class="photo-frame container">
          <div class="photo-overlay">
            <img src="/uploads/${recentPhoto.image}" data-id="${
      recentPhoto.id
    }" class="img-fluid user-photo j" data-toggle="modal" data-target="#myModal"> 
          </div>
        </div>
        <div class='time-comment-likes'>
          <div class="col-7">
            <div class="j photo-time-div" data-id="${
              recentPhoto.id
            }"> ${new Date(recentPhoto.updated_at).getFullYear()}-${
      new Date(recentPhoto.updated_at).getMonth() + 1
    }-${new Date(recentPhoto.updated_at).getDate()}&#160;&#160;&#160;${new Date(
      recentPhoto.updated_at
    ).getHours()}:${new Date(recentPhoto.updated_at).getMinutes()}:${new Date(
      recentPhoto.updated_at
    ).getSeconds()}</div>
          </div>
          <div class="col-5 comment-likes-div">
            <div class="comment-likes">
                <div class="like-icon-and-number">
                  <div class="btn like-buttons like-container" data-id="${
                    recentPhoto.id
                  }" is-like="false">
                    <img src="/icons/heart-regular.svg" class='icon-bubble' data-id="${
                      recentPhoto.id
                    }">
                  </div>
                  <div class="total-comment-like-number total-like${
                    recentPhoto.id
                  }"></div>
                  <div>
                <div>
                <div class="comment-icon-and-number">
                  <img src="/icons/comment-regular.svg" class="icon-bubble">
                  <div class="total-comment-like-number total-comment${
                    recentPhoto.id
                  }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    const userId = userIds[0];
    if (recentPhoto.user_id === userId) {
      const deleteContainers = document.querySelectorAll(
        `.delete-container-${userId}`
      );
      deleteContainers.forEach((deleteContainer) => {
        deleteContainer.innerHTML = `<i class="fas fa-trash-alt delete-photo" data-id="${recentPhoto.id}"></i>`;
      });
    }
  }
  const deleteContainer = document.querySelector(`.delete-container-${userId}`);
  if (deleteContainer) {
    deleteContainer.onclick = async function (event) {
      if (event.target.matches(".delete-photo")) {
        const id = event.target.getAttribute("data-id");
        console.log(id);
        const res = await fetch(`/photo/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        window.alert("You have deleted your photo successfully!");
        loadRecentPhotos();
      }
    };
  }
  // End of loadRecentPhoto()
  getLikedPhotos();
  addLike();
  getTotalComments();
  getTotalLikes();
}

//original

async function loadMostLikePhotos() {
  const res = await fetch(`/photos/likes`);
  const recentPhotos = await res.json();
  const recentPhotoContainer = document.querySelector(
    "#recent-photos-container"
  );
  const userId = userIds[0];
  recentPhotoContainer.innerHTML = "";
  getLikedPhotos();
  for (let recentPhoto of recentPhotos) {
    recentPhotoContainer.innerHTML += `
    <div class='col-sm-4 j photo-card' data-id="${recentPhoto.id}">
      <div class="media-card">
        <h3 data-id="${recentPhoto.id}">${
      recentPhoto.username
    }<span class="delete-photo delete-container-${
      recentPhoto.user_id
    }"></span></h3>
        <div class="photo-frame container">
          <div class="photo-overlay">
            <img src="/uploads/${recentPhoto.image}" data-id="${
      recentPhoto.id
    }" class="img-fluid user-photo j" data-toggle="modal" data-target="#myModal"> 
          </div>
        </div>
        <div class='time-comment-likes'>
          <div class="col-7">
            <div class="j photo-time-div" data-id="${
              recentPhoto.id
            }"> ${recentPhoto.updated_at
      .substring(0, 19)
      .replace("T", "<br> ")}</div>
          </div>
          <div class="col-5 comment-likes-div">
            <div class="comment-likes">
                <div class="like-icon-and-number">
                  <div class="btn like-buttons like-container" data-id="${
                    recentPhoto.id
                  }" is-like="false">
                    <img src="/icons/heart-regular.svg" class='icon-bubble' data-id="${
                      recentPhoto.id
                    }">
                  </div>
                  <div class="total-comment-like-number total-like${
                    recentPhoto.id
                  }"></div>
                  <div>
                <div>
                <div class="comment-icon-and-number">
                  <img src="/icons/comment-regular.svg" class="icon-bubble">
                  <div class="total-comment-like-number total-comment${
                    recentPhoto.id
                  }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    const userId = userIds[0];
    if (recentPhoto.user_id === userId) {
      const deleteContainers = document.querySelectorAll(
        `.delete-container-${userId}`
      );
      deleteContainers.forEach((deleteContainer) => {
        deleteContainer.innerHTML = `<i class="fas fa-trash-alt delete-photo" data-id="${recentPhoto.id}"></i>`;
      });
    }
  }
  const deleteContainer = document.querySelector(`.delete-container-${userId}`);
  if (deleteContainer) {
    deleteContainer.onclick = async function (event) {
      if (event.target.matches(".delete-photo")) {
        const id = event.target.getAttribute("data-id");
        console.log(id);
        const res = await fetch(`/photo/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        window.alert("You have deleted your photo successfully!");
        loadRecentPhotos();
      }
    };
  }
  // End of loadRecentPhoto()
  getLikedPhotos();
  addLike();
  getTotalComments();
  getTotalLikes();
}

async function loadMostCommentPhotos() {
  const res = await fetch(`/photos/comments`);
  const recentPhotos = await res.json();
  const recentPhotoContainer = document.querySelector(
    "#recent-photos-container"
  );
  recentPhotoContainer.innerHTML = "";
  getLikedPhotos();
  const userId = userIds[0];
  for (let recentPhoto of recentPhotos) {
    recentPhotoContainer.innerHTML += `
    <div class='col-sm-4 j photo-card' data-id="${recentPhoto.id}">
      <div class="media-card">
        <h3 data-id="${recentPhoto.id}">${
      recentPhoto.username
    }<span class="delete-photo delete-container-${
      recentPhoto.user_id
    }"></span></h3>
        <div class="photo-frame container">
          <div class="photo-overlay">
            <img src="/uploads/${recentPhoto.image}" data-id="${
      recentPhoto.id
    }" class="img-fluid user-photo j" data-toggle="modal" data-target="#myModal"> 
          </div>
        </div>
        <div class='time-comment-likes'>
          <div class="col-7">
            <div class="j photo-time-div" data-id="${
              recentPhoto.id
            }"> ${recentPhoto.updated_at
      .substring(0, 19)
      .replace("T", "<br> ")}</div>
          </div>
          <div class="col-5 comment-likes-div">
            <div class="comment-likes">
                <div class="like-icon-and-number">
                  <div class="btn like-buttons like-container" data-id="${
                    recentPhoto.id
                  }" is-like="false">
                    <img src="/icons/heart-regular.svg" class='icon-bubble' data-id="${
                      recentPhoto.id
                    }">
                  </div>
                  <div class="total-comment-like-number total-like${
                    recentPhoto.id
                  }"></div>
                  <div>
                <div>
                <div class="comment-icon-and-number">
                  <img src="/icons/comment-regular.svg" class="icon-bubble">
                  <div class="total-comment-like-number total-comment${
                    recentPhoto.id
                  }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    const userId = userIds[0];
    if (recentPhoto.user_id === userId) {
      const deleteContainers = document.querySelectorAll(
        `.delete-container-${userId}`
      );
      deleteContainers.forEach((deleteContainer) => {
        deleteContainer.innerHTML = `<i class="fas fa-trash-alt delete-photo" data-id="${recentPhoto.id}"></i>`;
      });
    }
  }
  const deleteContainer = document.querySelector(`.delete-container-${userId}`);
  if (deleteContainer) {
    deleteContainer.onclick = async function (event) {
      if (event.target.matches(".delete-photo")) {
        const id = event.target.getAttribute("data-id");
        console.log(id);
        const res = await fetch(`/photo/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        window.alert("You have deleted your photo successfully!");
        loadRecentPhotos();
      }
    };
  }
  // End of loadRecentPhoto()
  getLikedPhotos();
  addLike();
  getTotalComments();
  getTotalLikes();
}

const recentPhotoContainer = document.querySelector("#recent-photos-container");
recentPhotoContainer.onclick = async function (event) {
  if (event.target.matches(".j")) {
    const targetId = event.target.getAttribute("data-id");
    const res = await fetch(`/photos`);
    const photos = await res.json();
    const modalPhotos = photos.photos;
    const photo = modalPhotos.find(({ id }) => id === parseInt(targetId));
    console.log(photos);
    console.log(photo);
    const modalContent = document.querySelector("#modal-content");
    modalContent.innerHTML = `
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle" data-id="${targetId}">${
      photo.username
    }</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="modal-photo" class=" slide modal-photo-item user-photo-2">
            <div class="modal-photo-inner">
              <div class="photo-frame container">
                <div class="photo-overlay dropdown-divider">
                  
                    <img src="/uploads/${
                      photo.image
                    }" data-id="${targetId}"class="img-fluid user-photo j" data-toggle="modal" data-target="#" alt="Sunrise">
                 
                </div>
              </div>
            </div>
          <div class="col-4 comment-likes-user-photo comment-likes">
            <div class="btn like-buttons-modal like-container" data-id="${targetId}" is-like="false">
                <img src="/icons/heart-regular.svg" class='icon-bubble' data-id="${targetId}">
            </div>
            <div class="total-like-modal${targetId}">
            </div>
            <a>
              <img src="/icons/comment-regular.svg" class="icon-bubble">
            </a>
            <div class="total-comment-modal${targetId}">
            </div>
          </div>
          <div><hr></div>
          <ul class="photo-details">
            <h6 data-id="${targetId}"><b>Title:</b> ${photo.title}</h6>
            <h6 data-id="${targetId}"><b>Description:</b> ${
      photo.description
    }</h6>
            <h6 data-id="${targetId}"><b>District:</b> ${photo.district}</h6>
            <h6 data-id="${targetId}"><b>Location:</b> ${photo.location}</h6>
            <h6 data-id="${targetId}"><b>Date & Time:</b> ${new Date(
      photo.updated_at
    )}</h6>
            <h6 data-id="${targetId}">Photo taken by <b>${photo.username}</b>
            </h6>
            <div id="photo-comment-container-${targetId}"></div>
            <form action="/comment/${targetId}" method="POST" id="form-comment${targetId}">
              <textarea class="form-control input-comment" name="content" id="exampleFormControlTextarea${targetId}" rows="3"></textarea>
              <input type='submit' class="btn btn-lg btn-success btn-block comment-submit-button" id="comment-submit-buttons${targetId}"
              value="Give Comment" />
            </form>
          </ul>     
        </div>
`;

    // get total comment
    async function getTotalCommentsModal() {
      const res = await fetch("/photos/totaCcomments");
      const comments = await res.json();

      try {
        for (let comment of comments) {
          // console.log('this is comment');
          // console.log(comment);
          const loadTotalComments = document.querySelector(
            `.total-comment-modal${targetId}`
          );
          const loadComments = document.querySelector(
            `.form-comment${targetId}`
          ); // 要彈晒comment, 應要用queryselectorall 但案諗到方法

          if (photo.id == comment.id) {
            loadTotalComments.innerHTML = `
        <h5>${comment.total_comments}</h5>
        `;
          }

          if (
            (photo.photo_id == comment.photo_id,
            photo.content !== comment.content)
          ) {
            loadComments.innerHTML += `
          <label for="form-comment-textArea"><h6 data-id="${targetId}">Comment by ${photo.username}: ${photo.content} </h5></label>
          <div>  <hr> </div>
          `;
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    async function getTotalLikesModal() {
      const res = await fetch("/photos/totalLikes");
      const photos = await res.json();
      try {
        for (let photo of photos) {
          const loadTotalLikes = document.querySelector(
            `.total-like-modal${targetId}`
          );
          if (photo.id == photo.id) {
            loadTotalLikes.innerHTML = `
        <h5>${photo.total_likes}</h5>
        `;
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    async function getCommentsModal() {
      const res = await fetch(`/photos/comments/${targetId}`);
      const comments = await res.json();

      const photoCommentContainer = document.querySelector(
        `#photo-comment-container-${targetId}`
      );
      photoCommentContainer.innerHTML = "";
      for (const comment of comments) {
        photoCommentContainer.innerHTML += `
                  <div>
                    <div>
                      <span class="comment-username">${comment.username}: </span><span class="comment-content">${comment.content}</span>
                    </div>
                  </$>
    `;
      }
    }

    async function addCommentModal() {
      document
        .querySelector(`#form-comment${targetId}`)
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          const form = event.target;
          const formObject = {};
          formObject["content"] = form.content.value;
          const res = await fetch(`photos/comment/${targetId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
          });
          const result = await res.json();
          getCommentsModal();
          getTotalCommentsModal();
          getTotalComments();
        });
    }

    async function addLikeModal() {
      const likeButtons = document.querySelectorAll(".like-buttons-modal");
      likeButtons.forEach((likeButton) => {
        likeButton.addEventListener("click", async (event) => {
          event.preventDefault(); //// No need to reload the page
          const id = likeButton.getAttribute("data-id");
          const isLike = likeButton.getAttribute("is-like");
          try {
            const userId = userIds[0];
            if (isLike === "false" && userId) {
              likeButton.innerHTML = `<img src="/icons/heart-solid.svg" class='icon-bubble' data-id="${id}">`;
              const res = await fetch(`/photos/like/${id}`, {
                method: "POST",
              });
              const result = await res.json();
              console.log(result);
              likeButton.setAttribute("is-like", "true");
            } else if (isLike === "true" && userId) {
              window.alert("You have already liked this photo!");
            } else {
              window.alert("You have NOT logged in yet!");
            }
          } catch (e) {
            console.error(e.message);
          }
          etLikedPhotos();
          getTotalLikesModal();
          getTotalLikes();
        });
      });
    }

    getLikedPhotos();
    getTotalLikesModal();
    getTotalCommentsModal();
    getCommentsModal();
    addLikeModal();
    addCommentModal();
    // loadSession();
  }
};

async function addLike() {
  const likeButtons = document.querySelectorAll(".like-buttons");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", async (event) => {
      event.preventDefault(); //// No need to reload the page
      const id = likeButton.getAttribute("data-id");
      const isLike = likeButton.getAttribute("is-like");
      try {
        const userId = userIds[0];
        if (isLike === "false" && userId) {
          likeButton.innerHTML = `<img src="/icons/heart-solid.svg" class='icon-bubble' data-id="${id}">`;
          const res = await fetch(`/photos/like/${id}`, {
            method: "POST",
          });
          const result = await res.json();
          likeButton.setAttribute("is-like", "true");
        } else if (isLike === "true" && userId) {
          window.alert("You have already liked this photo!");
        } else {
          window.alert("You have not logged in!");
        }
      } catch (e) {
        console.error(e.message);
      }
      getLikedPhotos();
      getTotalLikes();
    });
  });
}

async function getTotalComments() {
  const res = await fetch("/photos/totalComments");
  const comments = await res.json();
  const likeButtons = document.querySelectorAll(".like-buttons");
  const photosId = [];
  likeButtons.forEach((likeButton) => {
    likeButton;
    const id = likeButton.getAttribute("data-id");
    photosId.push(parseInt(id));
  });
  try {
    for (let comment of comments) {
      for (const photoId of photosId) {
        const loadTotalComments = document.querySelector(
          `.total-comment${photoId}`
        );
        if (photoId === comment.id) {
          loadTotalComments.innerHTML = `
              <h5>${comment.total_comments}</h5>
              `;
        }
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

async function getTotalLikes() {
  const res = await fetch("/photos/totalLikes");
  const photos = await res.json();
  const likeButtons = document.querySelectorAll(".like-buttons");
  const photosId = [];
  likeButtons.forEach((likeButton) => {
    likeButton;
    const id = likeButton.getAttribute("data-id");
    photosId.push(parseInt(id));
  });
  try {
    for (let photo of photos) {
      for (const photoId of photosId) {
        const loadTotalLikes = document.querySelector(`.total-like${photoId}`);
        if (photoId === photo.id) {
          loadTotalLikes.innerHTML = `
              <h5>${photo.total_likes}</h5>
              `;
        }
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

async function getLikedPhotos() {
  const res = await fetch("/photos/liked");
  const photos = await res.json();
  const likeContainers = document.querySelectorAll(".like-container");
  const photoIds = photos.map((photo) => photo.id);

  likeContainers.forEach((likeContainer) => {
    const photoId = likeContainer.getAttribute("data-id");
    const isLike = likeContainer.getAttribute("is-like");
    if (photoIds.includes(parseInt(photoId))) {
      likeContainer.setAttribute("is-like", "true");
      likeContainer.innerHTML = `
  <img src="/icons/heart-solid.svg" class='icon-bubble' data-id="${photoId}">
  `;
    }
  });
}

loadRecentPhotos();
