function addImageToProject(imagesContainer) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.addEventListener('change', (event) => {
    for (const file of event.target.files) {
      const imageUrl = URL.createObjectURL(file);
      const projectImage = document.createElement('img');
      projectImage.classList.add('project-image');
      projectImage.src = imageUrl;
      imagesContainer.appendChild(projectImage);
    }
  });
  fileInput.click();
}

// Function to edit the "About Me" section
function editAboutMe() {
  const aboutMeContent = aboutMeSection.querySelector('p');
  const editButton = aboutMeSection.querySelector('.edit-about-me-btn');

  // Function to save changes and revert to edit mode
  function saveAndRevert() {
    aboutMeContent.textContent = textarea.value;
    aboutMeSection.querySelector('textarea').replaceWith(aboutMeContent);
    editButton.textContent = 'Edit';
    editButton.classList.remove('done-about-me-btn');
    editButton.classList.add('edit-about-me-btn');

    editButton.removeEventListener('click', saveAndRevert);
    editButton.addEventListener('click', editAboutMe);
  }

  // Check if the section is already in edit mode
  if (editButton.classList.contains('done-about-me-btn')) {
    saveAndRevert();
    return;
  }

  // Create a textarea for editing
  const textarea = document.createElement('textarea');
  textarea.value = aboutMeContent.textContent;

  // Replace the content with the textarea FIRST
  aboutMeContent.replaceWith(textarea);

  // Set initial height to match content AFTER adding to the DOM
  textarea.style.height = textarea.scrollHeight + 'px';

  // Add event listener to adjust height on input
  textarea.addEventListener('input', () => {
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to fit content
    aboutMeContent.textContent = textarea.value;
  });

  // Disable scrolling *after* setting the height
  textarea.style.overflow = 'hidden';

  // Change the button to "Done"
  editButton.textContent = 'Done';
  editButton.classList.remove('edit-about-me-btn');
  editButton.classList.add('done-about-me-btn');

  // Remove the "Edit" listener
  editButton.removeEventListener('click', editAboutMe);
  // Add the "Done" listener
  editButton.addEventListener('click', saveAndRevert);
}

editAboutMeButton.addEventListener('click', editAboutMe);

// Function to handle editing the project section title
function editProjectsSectionTitle(event) {
  const projectSection = event.target.closest('.project-section'); 
  const projectSectionTitle = projectSection.querySelector('h2'); 

  const currentTitle = projectSectionTitle.textContent;

  // Create an input field for editing
  const titleInput = document.createElement('input');
  titleInput.value = currentTitle;
  titleInput.classList.add('project-section-title-input');

  // Replace the title with the input field
  projectSectionTitle.replaceWith(titleInput);

  // Function to save the new title and revert to display mode
  function saveNewTitle() {
    const newTitle = titleInput.value;
    projectSectionTitle.textContent = newTitle;
    titleInput.replaceWith(projectSectionTitle);

    // Revert button text 
    event.target.textContent = 'Edit Title'; 

    // Switch back to edit mode
    event.target.removeEventListener('click', saveNewTitle);
    event.target.addEventListener('click', editProjectsSectionTitle);
  }

  // Change button to "Done"
  event.target.textContent = 'Done';

  // Switch to save mode
  event.target.removeEventListener('click', editProjectsSectionTitle);
  event.target.addEventListener('click', saveNewTitle);
}

// Function to edit the "About Projects" section
function editAboutProjects(event) {
  const aboutProjectsSection = event.target.closest('#about-projects-text');
  const aboutProjectsContent = aboutProjectsSection.querySelector('p');
  const editButton = event.target; // Get the clicked button directly

  // Function to save changes and revert to edit mode
  function saveAndRevert() {
    aboutProjectsContent.textContent = textarea.value;
    aboutProjectsSection.querySelector('textarea').replaceWith(aboutProjectsContent);
    editButton.textContent = 'Edit';
    editButton.classList.remove('done-about-projects-btn');
    editButton.classList.add('edit-projects-btn');

    editButton.removeEventListener('click', saveAndRevert);
    editButton.addEventListener('click', editAboutProjects);
  }

  // Check if the section is already in edit mode
  if (editButton.classList.contains('done-about-projects-btn')) {
    saveAndRevert();
    return;
  }

  // Create a textarea for editing
  const textarea = document.createElement('textarea');
  textarea.value = aboutProjectsContent.textContent;

  // Replace the content with the textarea FIRST
  aboutProjectsContent.replaceWith(textarea);

  // Set initial height to match content AFTER adding to the DOM
  textarea.style.height = textarea.scrollHeight + 'px';

  // Add event listener to adjust height on input
  textarea.addEventListener('input', () => {
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to fit content
    aboutProjectsContent.textContent = textarea.value;
  });

  // Disable scrolling *after* setting the height
  textarea.style.overflow = 'hidden';

  // Change the button to "Done"
  editButton.textContent = 'Done';
  editButton.classList.remove('edit-projects-btn');
  editButton.classList.add('done-about-projects-btn');

  // Remove the "Edit" listener
  editButton.removeEventListener('click', editAboutProjects);
  // Add the "Done" listener
  editButton.addEventListener('click', saveAndRevert);
}


// ... (Your other code: const declarations, functions, etc.)

document.addEventListener('DOMContentLoaded', () => {
  // Function to handle adding a new project section
  addNewProjectSectionButton.addEventListener('click', () => {
    const newProjectSection = createNewProjectSection();
    mainSection.appendChild(newProjectSection);
    mainSection.style.display = 'block'; 
  });

  // ... (Your other event listeners, like deleteProjectSection)
});

// ... (Rest of your code)

// *** REMOVE THESE LINES ***
// const initialProjectSection = createNewProjectSection();
// mainSection.appendChild(initialProjectSection); 
document.addEventListener('DOMContentLoaded', () => {
  const editContactBtn = document.getElementById('edit-contact-btn');
  const contactInfo = document.getElementById('contact-info');

  editContactBtn.addEventListener('click', () => {
    if (editContactBtn.classList.contains('edit-contact-btn')) {
      // Switch to Edit Mode
      editContactInfo();
    } else {
      // Switch to Done Mode (Save Changes)
      saveContactInfo();
    }
  });

  function editContactInfo() {
    const contactItems = contactInfo.querySelectorAll('li');

    contactItems.forEach(item => {
      const label = item.querySelector('label');
      const span = item.querySelector('span');
      const input = document.createElement('input');
      input.type = (label.textContent.toLowerCase().includes('email')) ? 'email' : 'text';
      input.value = span.textContent;
      span.replaceWith(input);
    });

    editContactBtn.textContent = 'Done';
    editContactBtn.classList.remove('edit-contact-btn');
    editContactBtn.classList.add('done-contact-btn');
  }

  function saveContactInfo() {
    const contactItems = contactInfo.querySelectorAll('li');

    contactItems.forEach(item => {
      const label = item.querySelector('label');
      const input = item.querySelector('input');
      const span = document.createElement('span');
      span.textContent = input.value;
      span.id = label.htmlFor; // Set the ID back to the original span
      input.replaceWith(span);
    });

    editContactBtn.textContent = 'Edit';
    editContactBtn.classList.remove('done-contact-btn');
    editContactBtn.classList.add('edit-contact-btn');
  }
});

// Function to toggle project expansion
function toggleProjectExpansion(event) {
  const projectCard = event.target.closest('.project');
  const isExpanded = projectCard.classList.contains('expanded');

  if (isExpanded) {
    projectCard.classList.remove('expanded'); // Remove the class
  } else {
    projectCard.classList.add('expanded'); // Add the class
  }
}

const myElement = document.getElementById('myElement'); // Replace 'myElement' with the ID of your element

myElement.addEventListener('wheel', (event) => {
  myElement.scrollTop += event.deltaY; // Scroll vertically based on mouse wheel movement
});