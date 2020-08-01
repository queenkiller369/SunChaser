// AJAX by CHiT

async function loadSession(){
    const res = await fetch('/loggedInWeb');
    // console.log(res)
  
    if (res.status === 200) {
        const result = await res.json();
  
        document.getElementById('inputEmail').classList.add('d-none');
        document.getElementById('inputPassword').classList.add('d-none');
        document.getElementById('sign-in-button').classList.add('d-none');
        document.getElementById('sign-in-with-google-button').classList.add('d-none');
        document.getElementById('sign-in-box-question-acc').classList.add('d-none');
        document.getElementById('create-acc-button').classList.add('d-none');
  
        const signInBox = document.getElementById('sign-in-from');
        signInBox.innerHTML += `
        </br>
        <div class="col-sm-12 logged-in-msg">You have already logged in as&nbsp;<b>${result.name}</b>.</div>
        `
    } else {
      
    }
   
  }
  
  loadSession();