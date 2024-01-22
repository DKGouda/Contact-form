//Start for form control
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");

addBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.onclick = function () {
  modal.classList.remove("active");
};

/* Start all global variable */
var userData = []; //An array to store the details of form
var idEl = document.getElementById("id");
var nameEl = document.getElementById("name");
var l_NameEl = document.getElementById("l-name");
var emailEl = document.getElementById("email");
var officeEl = document.getElementById("office-code"); //officeEl is working as phone number
var invalidPhone = document.getElementById("#phone-validation");

var jobTitleEl = document.getElementById("job-title");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var registerForm = document.getElementById("register-Form");
var imgUrl;

/*End all global variables*/

//Start register coding
registerForm.onsubmit = function (e) {
  e.preventDefault(); //To prevent closing of form after registering the data
  registrationData();
  getDataFromLocal();
  registerForm.reset(""); //To reset the form
  closeBtn.click(); // close button function
};

//Phone Number validation
function phoneValidation() {
  debugger;
  // Phone Number validation
  if (officeEl.value.length !== 10) {
    invalidPhone.innerHTML = "** Phone number must be of 10 digits";
    return false;
  }
  if (isNaN(Number(officeEl.value))) {
    invalidPhone.innerHTML = "** Phone number must be numeric";
    return false;
  }
  if (officeEl.value[0] < "6" || officeEl.value[0] > "9") {
    invalidPhone.innerHTML = "** Phone number must start from 6 / 7 / 8 / 9";
    return false;
  }
  invalidPhone.innerHTML = ""; // Clear the error message if all validations pass
  return true; // Return true if phone number is valid
}

if (localStorage.getItem("userData") != null) {
  // This will prevent deletion of data from local storage when reload
  userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData() {
  userData.push({
    id: idEl.value,
    name: nameEl.value,
    l_name: l_NameEl.value,
    email: emailEl.value,
    officeCode: officeEl.value,
    jobTitle: jobTitleEl.value,
    profilePic: imgUrl == undefined ? "person.jpg" : imgUrl,
  });

  var userString = JSON.stringify(userData); //To store the data in local storage
  localStorage.setItem("userData", userString);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Registration successfull",
    showConfirmButton: false,
    timer: 1500,
  });
}

//start returning on page from localStorage

var tableData = document.getElementById("table-data");
const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    //+= is used to add the register data in the tds
    tableData.innerHTML += ` 
      <tr index = '${index}'>
      <td>${index + 1}</td>
      <td><img src="${data.profilePic}" width="50"/></td>
      <td>${data.id}</td>
      <td>${data.name}</td>
      <td>${data.l_name}</td>
      <td>${data.email}</td>
      <td>${data.officeCode}</td>
      <td>${data.jobTitle}</td>
      <td>
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="del-btn" style="background-color: #ee534f">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
    `;
  });

  /*Start delete code*/
  var i;
  var allDelBtn = document.querySelectorAll(".del-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var id = tr.getAttribute("index");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    };
  }

  //Start Update coding
  var allEdit = document.querySelectorAll(".edit-btn");
  console.log(allEdit);
  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("TD");
      var index = td[1].getAttribute("index");
      var imgTag = td[1].getElementsByTagName("IMG");
      var profile_pic = imgTag[0].src;
      var id = td[2].innerHTML;
      var name = td[3].innerHTML;
      var l_Name = td[4].innerHTML;
      var email = td[5].innerHTML;
      var officeCode = td[6].innerHTML;
      var jobTitle = td[7].innerHTML;
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      idEl.value = id;
      nameEl.value = name;
      l_NameEl.value = l_Name;
      emailEl.value = email;
      officeEl.value = officeCode;
      jobTitleEl.value = jobTitle;
    };
  }
};

//End Update code

getDataFromLocal();

//Image processing
//to insert the profile pic or the images we have to get it from the local storage
// to do that we have modify the image to base 64 for that this code will be used
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 4000000) {
    var fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      // console.log(imgUrl);
      profile_pic.src = imgUrl;
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("file size is too big");
  }
};
