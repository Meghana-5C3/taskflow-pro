// =========================
// THEME TOGGLE
// =========================

const themeToggle =
  document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});



// =========================
// TOAST NOTIFICATION
// =========================

function showToast(message, type){

  const toast =
    document.createElement("div");

  toast.className =
    `toast ${type}`;

  toast.innerText =
    message;

  document.body.appendChild(toast);

  setTimeout(() => {

    toast.remove();

  }, 3000);
}



// =========================
// TODO SYSTEM
// =========================

const addTaskBtn =
  document.getElementById("addTaskBtn");

const taskInput =
  document.getElementById("taskInput");

const taskDescription =
  document.getElementById("taskDescription");

const taskPriority =
  document.getElementById("taskPriority");

const searchTask =
  document.getElementById("searchTask");

const todoList =
  document.getElementById("todoList");

const progressList =
  document.getElementById("progressList");

const doneList =
  document.getElementById("doneList");

let tasks =
  JSON.parse(localStorage.getItem("tasks"))
  || [];

renderTasks();

addTaskBtn.addEventListener(
  "click",
  addTask
);

searchTask.addEventListener(
  "keyup",
  renderTasks
);

function addTask(){

  const title =
    taskInput.value.trim();

  const desc =
    taskDescription.value.trim();

  const priority =
    taskPriority.value;

  if(title === ""){

    showToast(
      "Enter task title",
      "error"
    );

    return;
  }

  const task = {

    id: Date.now(),

    title,

    desc,

    priority,

    status:"todo"

  };

  tasks.unshift(task);

  saveTasks();

  renderTasks();

  taskInput.value = "";
  taskDescription.value = "";

  showToast(
    "Task added successfully",
    "success"
  );
}

function renderTasks(){

  todoList.innerHTML = "";
  progressList.innerHTML = "";
  doneList.innerHTML = "";

  const search =
    searchTask.value.toLowerCase();

  tasks.forEach(task => {

    if(
      !task.title.toLowerCase()
      .includes(search)
    ){
      return;
    }

    const card =
      document.createElement("div");

    card.className =
      "task-card";

    card.innerHTML = `

      <h4>${task.title}</h4>

      <p>${task.desc}</p>

      <div class="task-footer">

        <span class="
          priority
          ${task.priority.toLowerCase()}
        ">
          ${task.priority}
        </span>

        <div class="task-actions">

          <button
            class="move-btn"
            onclick="moveTask(${task.id})"
          >
            Move
          </button>

          <button
            class="delete-btn"
            onclick="deleteTask(${task.id})"
          >
            Delete
          </button>

        </div>

      </div>
    `;

    if(task.status === "todo"){

      todoList.appendChild(card);

    }

    else if(task.status === "progress"){

      progressList.appendChild(card);

    }

    else{

      doneList.appendChild(card);

    }

  });

  updateAnalytics();
}

function moveTask(id){

  tasks = tasks.map(task => {

    if(task.id === id){

      if(task.status === "todo"){

        task.status = "progress";

      }

      else if(task.status === "progress"){

        task.status = "done";

      }

      else{

        task.status = "todo";

      }

    }

    return task;

  });

  saveTasks();

  renderTasks();

  showToast(
    "Task updated",
    "success"
  );
}

function deleteTask(id){

  tasks =
    tasks.filter(
      task => task.id !== id
    );

  saveTasks();

  renderTasks();

  showToast(
    "Task deleted",
    "error"
  );
}

function saveTasks(){

  localStorage.setItem(

    "tasks",

    JSON.stringify(tasks)

  );
}

function updateAnalytics(){

  document.getElementById(
    "totalTasks"
  ).innerText = tasks.length;

  document.getElementById(
    "completedTasks"
  ).innerText =

    tasks.filter(
      task => task.status === "done"
    ).length;

  document.getElementById(
    "pendingTasks"
  ).innerText =

    tasks.filter(
      task => task.status !== "done"
    ).length;
}



// =========================
// GALLERY SYSTEM
// =========================

const imageModal =
  document.getElementById("imageModal");

const openModal =
  document.getElementById("openModal");

const closeModal =
  document.getElementById("closeModal");

const imageTitle =
  document.getElementById("imageTitle");

const imageUrl =
  document.getElementById("imageUrl");

const previewImage =
  document.getElementById("previewImage");

const addImageBtn =
  document.getElementById("addImageBtn");

const galleryGrid =
  document.getElementById("galleryGrid");

let gallery =
  JSON.parse(localStorage.getItem("gallery"))
  || [];

if(gallery.length === 0){

  gallery = [

    {

      id:1,

      title:"Workspace",

      url:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"

    },

    {

      id:2,

      title:"Development",

      url:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"

    }

  ];

  saveGallery();
}

renderGallery();

openModal.addEventListener(
  "click",
  () => {

    imageModal.classList.remove(
      "hidden"
    );

  }
);

closeModal.addEventListener(
  "click",
  () => {

    imageModal.classList.add(
      "hidden"
    );

  }
);

imageUrl.addEventListener(
  "input",
  () => {

    previewImage.src =
      imageUrl.value;

  }
);

addImageBtn.addEventListener(
  "click",
  addImage
);

function addImage(){

  const title =
    imageTitle.value.trim();

  const url =
    imageUrl.value.trim();

  if(title === "" || url === ""){

    showToast(
      "Fill all image fields",
      "error"
    );

    return;
  }

  const image = {

    id: Date.now(),

    title,

    url

  };

  gallery.unshift(image);

  saveGallery();

  renderGallery();

  imageTitle.value = "";
  imageUrl.value = "";

  previewImage.src = "";

  imageModal.classList.add(
    "hidden"
  );

  showToast(
    "Image added successfully",
    "success"
  );
}

function renderGallery(){

  galleryGrid.innerHTML = "";

  gallery.forEach(image => {

    const card =
      document.createElement("div");

    card.className =
      "gallery-card";

    card.innerHTML = `

      <img
        src="${image.url}"

        onerror="
        this.src='https://picsum.photos/500/300'
        "
      >

      <div class="gallery-info">

        <h3>${image.title}</h3>

        <div class="gallery-buttons">

          <button
            class="edit-btn"
            onclick="editImage(${image.id})"
          >
            Edit
          </button>

          <button
            class="remove-btn"
            onclick="deleteImage(${image.id})"
          >
            Delete
          </button>

        </div>

      </div>
    `;

    galleryGrid.appendChild(card);

  });
}

function editImage(id){

  const image =
    gallery.find(
      img => img.id === id
    );

  const updated =
    prompt(
      "Edit image title",
      image.title
    );

  if(
    updated !== null &&
    updated.trim() !== ""
  ){

    image.title = updated;

    saveGallery();

    renderGallery();

    showToast(
      "Image updated",
      "success"
    );
  }
}

function deleteImage(id){

  gallery =
    gallery.filter(
      image => image.id !== id
    );

  saveGallery();

  renderGallery();

  showToast(
    "Image deleted",
    "error"
  );
}

function saveGallery(){

  localStorage.setItem(

    "gallery",

    JSON.stringify(gallery)

  );
}



// =========================
// CONTACT FORM
// =========================

const contactForm =
  document.getElementById("contactForm");

contactForm.addEventListener(
  "submit",
  function(event){

    event.preventDefault();

    clearErrors();

    let valid = true;

    const name =
      document.getElementById("name");

    const email =
      document.getElementById("email");

    const phone =
      document.getElementById("phone");

    const subject =
      document.getElementById("subject");

    const message =
      document.getElementById("message");

    const success =
      document.getElementById(
        "successMessage"
      );



    // NAME

    if(name.value.trim().length < 3){

      setError(

        name,

        "nameError",

        "Minimum 3 characters required"

      );

      valid = false;

    }

    else{

      setSuccess(name);

    }



    // EMAIL

    const emailPattern =

      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(

      !emailPattern.test(
        email.value.trim()
      )

    ){

      setError(

        email,

        "emailError",

        "Enter valid email address"

      );

      valid = false;

    }

    else{

      setSuccess(email);

    }



    // PHONE

    const phonePattern =
      /^[6-9][0-9]{9}$/;

    if(

      !phonePattern.test(
        phone.value.trim()
      )

    ){

      setError(

        phone,

        "phoneError",

        "Enter valid Indian mobile number"

      );

      valid = false;

    }

    else{

      setSuccess(phone);

    }



    // SUBJECT

    if(subject.value.trim().length < 5){

      setError(

        subject,

        "subjectError",

        "Minimum 5 characters required"

      );

      valid = false;

    }

    else{

      setSuccess(subject);

    }



    // MESSAGE

    if(message.value.trim().length < 15){

      setError(

        message,

        "messageError",

        "Message must contain minimum 15 characters"

      );

      valid = false;

    }

    else{

      setSuccess(message);

    }



    // SUCCESS

    if(valid){

      const contacts =

        JSON.parse(
          localStorage.getItem(
            "contacts"
          )
        ) || [];

      const contactData = {

        name:name.value,

        email:email.value,

        phone:phone.value,

        subject:subject.value,

        message:message.value,

        date:new Date()
          .toLocaleString()

      };

      contacts.push(contactData);

      localStorage.setItem(

        "contacts",

        JSON.stringify(contacts)

      );

      success.innerText =
        "Message Sent Successfully!";

      success.style.color =
        "#16a34a";

      contactForm.reset();

      showToast(
        "Contact form submitted",
        "success"
      );
    }

  }
);

function setError(
  input,
  errorId,
  message
){

  input.classList.add("error");

  document.getElementById(
    errorId
  ).innerText = message;
}

function setSuccess(input){

  input.classList.add("success");

}

function clearErrors(){

  document.querySelectorAll(

    ".form-group input, .form-group textarea"

  ).forEach(input => {

    input.classList.remove(

      "error",

      "success"

    );

  });

  document.querySelectorAll(
    "small"
  ).forEach(error => {

    error.innerText = "";

  });

  document.getElementById(
    "successMessage"
  ).innerText = "";
}