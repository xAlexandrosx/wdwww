

const login_form = document.getElementById("login-form");
const register_form = document.getElementById("register-form");
const przelacznik_link = document.getElementById("przelacznik-link");
const przelacznik_text = document.getElementById("przelacznik-text");
const form_title = document.getElementById("form-title");


function przelaczanie()
{
    const is_login = login_form.classList.contains("active");
    if(is_login == true)
        {
            form_title.textContent="Sign Up";
            przelacznik_text.firstChild.textContent= `Do you have an account? `;
            przelacznik_link.textContent="Log in now";
        }
    else 
    {
        form_title.textContent="Log In";
        przelacznik_text.firstChild.textContent= `Don't you have an account? `;
        przelacznik_link.textContent="Sign up now";
    }
    login_form.classList.toggle("active");
    register_form.classList.toggle("active");
}

przelacznik_link.addEventListener("click", przelaczanie);

document.getElementById("register-form").addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const message = document.getElementById("message");

  const users = getUsers();

  if (users.some(u => u.email == email)) {
    message.textContent = "You already have an account.";
    message.style.color = "red";
    return;
  }

  users.push({ email, password });
  saveUsers(users);

  message.textContent = "You are registered. Log in now!";
  message.style.color = "green";
  przelaczanie();
});

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

login_form.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const message = document.getElementById("message");

  const users = getUsers();
  const user = users.find(function(u) {
  return u.email == email && u.password == password;
    });

    if (user) 
    {
    sessionStorage.setItem("loggedUser", email);
    window.location.href = "index.html";
    } 
    else 
    {
    message.textContent = "Wrong email or password";
    message.style.color = "red";
    }
});


//darkmode
const checkbox=document.getElementById("mode");
if(checkbox.checked)
  {
    sessionStorage.setItem("dark-mode", "disabled");
  }
else
  {
    sessionStorage.setItem("dark-mode","enabled");
    document.body.classList.toggle("dark-mode");
  }
checkbox.addEventListener("change", ()=>
{
 document.body.classList.toggle("dark-mode"); 
  if(checkbox.checked)
    {
      sessionStorage.setItem("dark-mode", "disabled");
    }
  else
    {
      sessionStorage.setItem("dark-mode", "enabled");
    }
});
