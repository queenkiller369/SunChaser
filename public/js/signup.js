//js by CHiT

const searchParams = new URLSearchParams(window.location.search);

// js by CHiT

var check = function () {
  if (
    document.getElementById("password").value ==
    document.getElementById("confirm_password").value
  ) {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerHTML = "Matching";
  } else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Not Matching";
  }
};

function PassCheck() {
  var password = document.getElementById("password");
  var confirm_password = document.getElementById("confirm_password");

  if (password.value != confirm_password.value) {
    document.getElementById("submit").disabled = true;
  } else {
    document.getElementById("submit").disabled = false;
  }
}

// AJAX by CHiT

document
  .querySelector("#create-user-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // No need to reload the page
    const form = event.target;
    const formData = new FormData();

    // async function findUserFav() {
    //   let theUserFavourites = [];

    //   for (let i = 0; i < form.user_favourite.length; i++) {
    //     if (event.target.user_favourite[i].checked) {
    //       theUserFavourites.push(event.target.user_favourite[i].value);
    //     } else {
    //       theUserFavourites = theUserFavourites;
    //     }
    //   }
    //   return theUserFavourites;
    // }

    // formData.append('userEmail', form.user_email.value);
    // formData.append('userPassword', form.user_password.value);
    // formData.append('userName', form.username.value);
    // formData.append('userGender', form.user_gender.value);
    // formData.append('userBirthday', form.user_birthday.value);
    // formData.append('userHeight', form.user_height.value);
    // formData.append('userWeight', form.user_weight.value);
    // formData.append('userFavourites', await findUserFav());
    // formData.append('profilePic', form.profilePic.files[0]);

    const formObject = {
      email: form.user_email.value,
      password: form.user_password.value,
      username: form.username.value,
      //   userGender: form.user_gender.value,
      //   userBirthday: form.user_birthday.value,
      //   userHeight: form.user_height.value,
      //   userWeight: form.user_weight.value,
      //   userFavourites: await findUserFav(),
    };

    // missing headers Content-Type: 'application/json'
    const res = await fetch("/createUser", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      //   body: formData
      body: JSON.stringify(formObject) /*JSON.stringify */,
    }); //your_hostname/createUser

    const result = await res.json();

    window.location = "/?accSuccess=Congratulations!+Account+Created!";
  });
