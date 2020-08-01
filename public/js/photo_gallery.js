const socket = io.connect();


async function loadUserPhotos() {
  // 1. load Data

  // const res = await fetch("/photos"); original
  // const recentPhotos = await res.json();  original 

  const optionalContainer = document.querySelector(".options-container");
  const optionList = document.querySelector(".option");
  const res = await fetch(`/photos`);
  const recentPhotos = await res.json();
  console.log('this is recent photo');
  console.log(recentPhotos)

  const recentPhotoContainer = document.querySelector(
    "#recent-photos-container"
  );
  // console.log(recentPhotos)


        // async function getTotalComments() {
        //   const res = await fetch("/comments");
        //   const comments = await res.json();
        //   try {
        //     for (let comment of comments) {
        //       // console.log('this is comment');
        //       // console.log(comment);
        //       const loadTotalComments = document.querySelector(
        //         `.total-comment${recentPhoto.id}`
        //       );
        //       if (recentPhoto.id == comment.id) {
        //         loadTotalComments.innerHTML = `
        //                 <h5>${comment.total_comments}</h5>
        //                 `;
        //       }
        //     }
        //   } catch (e) {
        //     console.log(e.message);
        //   }
        // }
        // getTotalComments();

        // async function getTotalLikes() {
        //   const res = await fetch("/likes");
        //   const photos = await res.json();
        //   try {
        //     for (let photo of photos) {
        //       const loadTotalLikes = document.querySelector(
        //         `.total-like${recentPhoto.id}`
        //       );
        //       if (recentPhoto.id == photo.id) {
        //         loadTotalLikes.innerHTML = `
        //               <h5>${photo.total_likes}</h5>
        //               `;
        //       }
        //     }
        //   } catch (e) {
        //     console.log(e.message);
        //   }
        // }
        // getTotalLikes();


  // 1. loadPhotos
  for (let recentPhoto of recentPhotos) {
    // console.log('this is recentPhoto');

    recentPhotoContainer.innerHTML += `
        <div class='col col-sm-4 j photo-card' data-id="${recentPhoto.id}">
          <div class="media-card">
            <h3 data-id="${recentPhoto.id}">${recentPhoto.username}</h3>
            <div class="photo-frame container">
              <div class="photo-overlay">
                <img src="./uploads/${recentPhoto.image}" data-id="${
      recentPhoto.id
      }" class="img-fluid user-photo j" data-toggle="modal" data-target="#myModal"> 
              </div>
            </div>
            <div class='time-comment-likes'>
              <div class="col-8">
                <h4 class="j" data-id="${
      recentPhoto.id
      }"> ${(new Date(recentPhoto.updated_at)).getFullYear()}-${(new Date(recentPhoto.updated_at)).getMonth()+1}-${(new Date(recentPhoto.updated_at)).getDate()}&#160;&#160;&#160;${(new Date(recentPhoto.updated_at)).getHours()}:${(new Date(recentPhoto.updated_at)).getMinutes()}:${(new Date(recentPhoto.updated_at)).getSeconds()}</h4>
              </div>
              <div class="col-4 comment-likes">
                <div class="btn like-buttons like-container" data-id="${
      recentPhoto.id
      }" is-like="false">
                  <img src="./icons/heart-regular.svg" class='icon-bubble' data-id="${
      recentPhoto.id
      }">
                </div>
                <div class="total-like${recentPhoto.id}"></div>
                <a>
                  <img src="./icons/comment-regular.svg" class="icon-bubble">
                </a>
                <div class="total-comment${recentPhoto.id}"></div>
              </div>
            </div>
          </div>
        </div>`;


    // load photo's totalcomment
    async function getTotalComments() {
      const res = await fetch("/comments");
      const comments = await res.json();
      try {
        for (let comment of comments) {
          // console.log('this is comment');
          // console.log(comment);
          const loadTotalComments = document.querySelector(
            `.total-comment${recentPhoto.id}`
          );
          if (recentPhoto.id == comment.id) {
            loadTotalComments.innerHTML = `
                    <h5>${comment.total_comments}</h5>
                    `;
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    getTotalComments();


    // load photos totallike
    async function getTotalLikes() {
      const res = await fetch("/likes");
      const photos = await res.json();
      try {
        for (let photo of photos) {
          const loadTotalLikes = document.querySelector(
            `.total-like${recentPhoto.id}`
          );
          if (recentPhoto.id == photo.id) {
            loadTotalLikes.innerHTML = `
                  <h5>${photo.total_likes}</h5>
                  `;
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    getTotalLikes();

    // select comment pop up modal

    document
      .querySelectorAll(".comment-button").forEach(likeButton => {
        likeButton.addEventListener("click", async (event) => {
          event.preventDefault(); //// No need to reload the page
          const targetId = event.target.getAttribute("data-id");
          const res = await fetch(`/photos`);
          const modalPhotos = await res.json();
          const result = modalPhotos.find(({ id }) => id === parseInt(targetId));
          console.log('result')
          console.log(result)

          const modalContent = document.querySelector("#modal-content");
          modalContent.innerHTML = `
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle" data-id="${targetId}">${result.username}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div id="modal-photo" class=" slide modal-photo-item user-photo-2">
                    <div class="modal-photo-inner">
                      <div class="photo-frame container">
                        <div class="photo-overlay dropdown-divider">
                          <div class="modal-photo-item">
                            <img src="./uploads/${result.image}" data-id="${targetId}"class="img-fluid user-photo j" data-toggle="modal" data-target="#" alt="Sunrise">
                          </div>
                        </div>
                      </div>
                    </div>
                  <div class="col-4 comment-likes-user-photo">
                    <a>
                      <img src="../icons/heart-regular.svg" class='icon-bubble'>
                    </a>
                    <div class="total-like-modal${recentPhoto.id}">
                    </div>
                    <a>
                      <img src="../icons/comment-regular.svg" class="icon-bubble">
                    </a>
                    <div class="total-comment-modal${recentPhoto.id}">
                    </div>
                  </div>
                  <div><hr></div>
                  <ul class="photo-details">
                    <h6 data-id="${targetId}"><b>Title:</b> ${result.title}</h6>
                    <h6 data-id="${targetId}"><b>Description:</b> ${result.description}</h6>
                    <h6 data-id="${targetId}"><b>District:</b> ${result.district}</h6>
                    <h6 data-id="${targetId}"><b>Location:</b> ${result.location}</h6>
                    <h6 data-id="${targetId}"><b>Date & Time:</b> ${new Date(result.updated_at)}</h6>
                    <h6 data-id="${targetId}">Photo taken by <b>${result.username}</h6>
                    <form>
                      <div class="form-comment${recentPhoto.id}">
                      </div>
                      <textarea class="form-control" id="exampleFormControlTextarea${targetId}" rows="3"></textarea>
                      <input type='submit' class="btn btn-lg btn-success btn-block submit-button${targetId}" id="submit-buttons${targetId}"
                      value="Submit" />
                    </form>
                  </ul>     
                </div>
        `;



          // loadRecentPhotos();
        });
      });

    //  document.querySelector('.comment-buttons').onclick = async function (event) {
    //   if (event.target.matches(".comment-button")) {
    //     const targetId = event.target.getAttribute("data-id");   
    //     console.log('this is targetId');
    //     console.log(targetId)  
    //     const res = await fetch(`/photos`);
    //     const modalPhotos = await res.json();
    //     const result = modalPhotos.find(({ id }) => id === parseInt(targetId));
    //     console.log('this is result');
    //     console.log(result)

    //   }
    // };

    // recentPhotoContainer.onclick = async function (event) {
    //   if (event.target.matches('.delete-like')) {
    //     const id = event.target.getAttribute('data-id');
    //     const res = await fetch(`/likes/${id}`, {
    //       method: "DELETE"
    //     });
    //     const result = await res.json();
    //     loadRecentPhotos();
    //   } else if (event.target.matches('.add-like')) {
    //     const id = event.target.getAttribute('data-id');
    //     const parentPhoto = event.target.closest('.photo-frame');
    //     const res = await fetch(`/likes/${id}`, {
    //       method: "POST",
    //       headers: {

    //       },
    //       body: JSON.stringify({

    //       })
    //     });
    //     const result = await res.json();
    //     loadRecentPhotos();
    //   }
    // }

    //popup modal

    recentPhotoContainer.onclick = async function (event) {
      if (event.target.matches(".j")) {
        const targetId = event.target.getAttribute("data-id");
        // console.log("this is targetId");
        // console.log(targetId);
        const res = await fetch(`/photos`);
        const modalPhotos = await res.json();
        const result = modalPhotos.find(({ id }) => id === parseInt(targetId));
        // console.log("this is result");
        // console.log(result);
        // console.log(targetId);
        // console.log(modalPhotos);
        // console.log(result.filename, result.name);
        const modalContent = document.querySelector("#modal-content");
        modalContent.innerHTML = `
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle" data-id="${targetId}">${
          result.username
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
                          
                            <img src="./uploads/${
          result.image
          }" data-id="${targetId}"class="img-fluid user-photo j" data-toggle="modal" data-target="#" alt="Sunrise">
                          
                        </div>
                      </div>
                    </div>
                  <div class="col-4 comment-likes-user-photo">
                    <a>
                      <img src="../icons/heart-regular.svg" class='icon-bubble'>
                    </a>
                    <div class="total-like-modal${recentPhoto.id}">
                    </div>
                    <a>
                      <img src="../icons/comment-regular.svg" class="icon-bubble">
                    </a>
                    <div class="total-comment-modal${recentPhoto.id}">
                    </div>
                  </div>
                  <div><hr></div>
                  <ul class="photo-details">
                    <h6 data-id="${targetId}">Title: ${result.title}</h6>
                    <h6 data-id="${targetId}">Description: ${
          result.description
          }</h6>
                    <h6 data-id="${targetId}"><b>District:</b> ${result.district}</h6>
                    <h6 data-id="${targetId}"><b>Location:</b> ${result.location}</h6>
                    <h6 data-id="${targetId}"><b>Date & Time:</b> ${new Date(result.updated_at)}</h6>
                    <h6 data-id="${targetId}"><b>Photo taken by <b>${result.username}</b></h6>
                    <form>
                      <div class="form-comment${recentPhoto.id}">
                      </div>
                      <textarea class="form-control input-comment" name="comment" id="exampleFormControlTextarea${targetId}" rows="3"></textarea>
                      <input type='submit' class="btn btn-lg btn-success btn-block comment-submit-button" id="comment-submit-buttons${targetId}"
                      value="Give Comment" />
                    </form>
                  </ul>     
                </div>
        `;

        // get modal's total comment
        async function getTotalComments2() {
          const res = await fetch("/comments");
          const comments = await res.json();

          try {
            for (let comment of comments) {
              // console.log('this is comment');
              // console.log(comment);
              const loadTotalComments = document.querySelector(
                `.total-comment-modal${recentPhoto.id}`
              );
              const loadComments = document.querySelector(
                `.form-comment${recentPhoto.id}`
              ); // 要彈晒comment, 應要用queryselectorall 但案諗到方法

              if (result.id == comment.id) {
                loadTotalComments.innerHTML = `
                <h5>${comment.total_comments}</h5>
                `;
              }

              if (
                (result.photo_id == comment.photo_id,
                  result.content !== comment.content)
              ) {
                loadComments.innerHTML += `
                  <label for="form-comment-textArea"><h6 data-id="${targetId}">Comment by ${result.username}: ${result.content} </h5></label>
                  <div>  <hr> </div>
                  `;
              }
            }
          } catch (e) {
            console.log(e.message);
          }
        }
        getTotalComments2();



        // get comment details

        // async function getCommentDetails() {
        //   const res = await fetch("/comments")
        //   const commentDetails = await res.json();
        //   for (let commentDetail of commentDetails) {
        //     const loadComments = document.querySelector(`.form-comment${recentPhoto.id}`);
        //     if (result.photo_id ==comment.photo_id) {
        //       loadComments.innerHTML = `
        //       <label for="form-comment-textArea"><h6 data-id="${targetId}">Comments: ${result.content} </h5></label>
        //       `
        //     }
        //   }

        // }


          // get modal total likes
        async function getTotalLikes2() {
          const res = await fetch("/likes");
          const photos = await res.json();
          try {
            for (let photo of photos) {
              const loadTotalLikes = document.querySelector(
                `.total-like-modal${recentPhoto.id}`
              );
              if (result.id == photo.id) {
                loadTotalLikes.innerHTML = `
                <h5>${photo.total_likes}</h5>
                `;
              }
            }
          } catch (e) {
            console.log(e.message);
          }
        }
        getTotalLikes2();
      }
    };
  }

  // initiate like 

  const likeButtons = document.querySelectorAll(".like-buttons");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", async (event) => {
      event.preventDefault(); //// No need to reload the page
      const id = likeButton.getAttribute("data-id");
      const isLike = likeButton.getAttribute("is-like");
      // console.log(id);
      if (isLike == "false") {
        likeButton.innerHTML = `<img src="./icons/heart-solid.svg" class='icon-bubble' data-id="${id}">`;

        const res = await fetch(`/like/${id}`, {
          method: "POST",
        });
        const result = await res.json();
        likeButton.setAttribute("is-like", "true");
      }
      // console.log(isLike);

      socket.emit("add-like", id);

      async function getTotalLikes() {
        const res = await fetch("/likes");
        const photos = await res.json();
        // console.log(photos);
        try {
          for (let photo of photos) {
            const loadTotalLikes = document.querySelector(
              `.total-like${photo.id}`
            );
            loadTotalLikes.innerHTML = `
                    <h5>${photo.total_likes}</h5>
                    `;
          }
        } catch (e) {
          console.error(e.message);
        }
      }
      getTotalLikes();
    });
  });
}
loadUserPhotos();



async function checkPhotoLikes() {
  const res = await fetch("/likelike");
  const photos = await res.json();
  const likeContainers = document.querySelectorAll(".like-container");
  const lastIndexOfLikes = photos[photos.length - 1];
  const userId = lastIndexOfLikes.session_userId;
  // console.log(lastIndexOfLikes.session_userId);
  // console.log(photos);
  const filteredPhotoIDs = photos
    .filter((photo) => photo.user_id === userId)
    .map((photo) => photo.id);
  // console.log(filteredPhotoIDs);

  likeContainers.forEach((likeContainer) => {
    const photoId = likeContainer.getAttribute("data-id");
    const isLike = likeContainer.getAttribute("is-like");
    // console.log(typeof id);
    if (filteredPhotoIDs.includes(parseInt(photoId))) {
      likeContainer.setAttribute("is-like", "true");
      likeContainer.innerHTML = `
      <img src="./icons/heart-solid.svg" class='icon-bubble' data-id="${photoId}">
      `;
    } else {
      console.log('no')
    }
  });
}
checkPhotoLikes();

//  async function loadModalPhotos(){
//   const res = await fetch('./photos');
//   const modalPhotos = await res.json();
//   for (let modalPhoto of modalPhotos){
//     console.log('this is modal photo')
//     console.log(modalPhoto)
//     if(recentPhoto.id == modalPhoto.id){
//       console.log('this is modaL id');
//       console.log(modalPhoto.id)

//   }
// }
//  }
//  loadModalPhotos();
