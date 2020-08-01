sorting photo


     <div class="sort-by">
          <label class="my-1 mr-2 optional-container" for="inlineFormCustomSelectPref">Sort By:</label>
          <select class="custom-select my-1 mr-sm-2 option" name="option" id="inlineFormCustomSelectPref">
            <option selected>Choose...</option>
            <option value="1">Latest Photo</option>
            <option value="3">Most Liked</option>
            <option value="4">Most Comments</option>
          </select>
      
        </div>


 // sorting 
  optionList.addEventListener('change', async (event)=>{
    console.log(event.target.value)
      if (event.target.value == "1") {
        console.log('1')
        const res = await fetch(`/photos`);
         const recentPhotos =  await res.json(); 
         const recentPhotos=  await res.json();
         const recentPhotoContainer = document.querySelector(
           "#recent-photos-container"
         );
         recentPhotoContainer.innerHTML = "";
         console.log(recentPhotos)
         for (let recentPhoto of recentPhotos) {
           console.log('this is recentPhoto');
           console.log(recentPhoto)
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
         }"> ${recentPhoto.updated_at
           .substring(0, 19)
           .replace("T", "<br> ")}</h4>
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
       }
       
       checkPhotoLikes();
       return

      } else if (event.target.value == "3") {
        console.log('3')  
        const res = await fetch(`/photos_mostLikes`);
        const recentPhotos =  await res.json();
        const recentPhotoContainer = document.querySelector(
          "#recent-photos-container"
        );
        recentPhotoContainer.innerHTML = "";
        console.log(recentPhotos)
        for (let recentPhoto of recentPhotos) {
          console.log('this is recentPhoto');
          console.log(recentPhoto)
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
        }"> ${recentPhoto.updated_at
          .substring(0, 19)
          .replace("T", "<br> ")}</h4>
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
      }
      
      checkPhotoLikes();
      return


      } else if (event.target.value == "4") {
        console.log('4')
        const res = await fetch(`/photos_mostComments`);
        const recentPhotos=  await res.json();
        const recentPhotoContainer = document.querySelector(
          "#recent-photos-container"
        );
        recentPhotoContainer.innerHTML = "";
        console.log(recentPhotos)
        for (let recentPhoto of recentPhotos) {
          console.log('this is recentPhoto');
          console.log(recentPhoto)
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
        }"> ${recentPhoto.updated_at
          .substring(0, 19)
          .replace("T", "<br> ")}</h4>
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
      }
      
      checkPhotoLikes();
      return
  

      }  else {
        const res = await fetch(`/photos`);
        const recentPhotos =  await res.json(); 
      }