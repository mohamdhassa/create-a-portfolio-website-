const aboutMeSection = document.querySelector('#about');
const editAboutMeButton = aboutMeSection.querySelector('.edit-about-me-btn');
const addNewProjectSectionButton = document.getElementById('addNewProjectSection');
const mainSection = document.getElementById('main');

// Function to create a new project section
function createNewProjectSection() {
  const newSection = document.createElement('section');
  newSection.classList.add('project-section');

  // Create a div for the section controls
  const sectionControls = document.createElement('div');
  sectionControls.classList.add('section-controls');

  // Create the "Add Project" button for the new section
  const addProjectButton = document.createElement('button');
  addProjectButton.classList.add('add-project-btn');
  addProjectButton.textContent = 'Add Project';
  addProjectButton.addEventListener('click', addNewProject);
  sectionControls.appendChild(addProjectButton);

  // Create the "Edit Title" button for the new section
  const editTitleButton = document.createElement('button');
  editTitleButton.classList.add('edit-project-title');
  editTitleButton.textContent = 'Edit Title';
  editTitleButton.addEventListener('click', editProjectsSectionTitle);
  sectionControls.appendChild(editTitleButton);

  // Create the "Delete Project Section" button
  const deleteProjectSectionButton = document.createElement('button');
  deleteProjectSectionButton.id = 'deleteProjectSection';
  deleteProjectSectionButton.textContent = 'Delete Project Section';
  deleteProjectSectionButton.addEventListener('click', deleteProjectSection);
  sectionControls.appendChild(deleteProjectSectionButton);

  // Add the section controls to the new section
  newSection.appendChild(sectionControls);

  // Create the title (<h2>) for the new section
  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'My Projects';
  newSection.appendChild(sectionTitle);

  // Create a container for the project cards
  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project-container');
  newSection.appendChild(projectContainer);

  // Create the "About Projects" section
  const aboutProjectsSection = document.createElement('section');
  aboutProjectsSection.id = 'about-projects-text';

  // Create the paragraph for the "About Projects" text
  const aboutProjectsParagraph = document.createElement('p');
  aboutProjectsParagraph.textContent = 'This is a brief introduction about those projects.';
  aboutProjectsSection.appendChild(aboutProjectsParagraph);

  // Create the "Edit" button for the "About Projects" section
  const editAboutProjectsButton = document.createElement('button');
  editAboutProjectsButton.classList.add('edit-projects-btn');
  editAboutProjectsButton.textContent = 'Edit';
  editAboutProjectsButton.addEventListener('click', editAboutProjects);
  aboutProjectsSection.appendChild(editAboutProjectsButton);

  // Add the "About Projects" section to the new section
  newSection.appendChild(aboutProjectsSection);

  return newSection;
}


// Function to handle deleting a project section
function deleteProjectSection(event) {
  const sectionToDelete = event.target.closest('.project-section');
  if (sectionToDelete) {
    sectionToDelete.remove();
  }
}

// Function to add a new project (modified to work with multiple sections)
function addNewProject(event) {
  // Find the project container within the clicked section
  const projectContainer = event.target.closest('.project-section').querySelector('.project-container'); 

  const newProject = document.createElement('div');
  newProject.classList.add('project');
  newProject.addEventListener('click', toggleProjectExpansion); // Add click listener

  // Create a new container for the project content
  const projectContent = document.createElement('div');
  projectContent.classList.add('project-content');

  const projectTitle = document.createElement('h3');
  projectTitle.textContent = 'New Project';

  const projectDescription = document.createElement('p');
  projectDescription.classList.add('project-description');
  projectDescription.textContent = 'Project description goes here.';

  const projectImages = document.createElement('div');
  projectImages.classList.add('project-images');

  const addImageButton = document.createElement('button');
  addImageButton.classList.add('add-image-btn');
  addImageButton.textContent = 'Add Image';
  addImageButton.addEventListener('click', () => addImageToProject(projectImages));

  const editButton = document.createElement('button');
  editButton.classList.add('edit-project-btn');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editProject(newProject, editButton));

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-project-btn');
  removeButton.style.display = 'none';
  removeButton.addEventListener('click', () => {
    newProject.remove();
  });

  // Add the content to the new container
  projectContent.appendChild(projectTitle);
  projectContent.appendChild(projectImages);
  projectContent.appendChild(addImageButton);
  projectContent.appendChild(projectDescription);
  projectContent.appendChild(editButton);
  projectContent.appendChild(removeButton);

  // Append the container to the project element
  newProject.appendChild(projectContent);

  projectContainer.appendChild(newProject);
}

function editProject(projectCard, editButton) {
  const projectTitle = projectCard.querySelector('h3');
  const projectDescription = projectCard.querySelector('.project-description');
  const projectImagesContainer = projectCard.querySelector('.project-images');
  const addImageButton = projectCard.querySelector('.add-image-btn');
  const removeButton = projectCard.querySelector('.remove-project-btn');

  // Function to save changes and revert to edit mode
  function saveAndRevert() {
    projectTitle.textContent = projectCard.querySelector('input').value;
    // Update the paragraph content immediately
    projectDescription.textContent = projectCard.querySelector('textarea').value;
    projectCard.querySelector('input').replaceWith(projectTitle);
    projectCard.querySelector('textarea').replaceWith(projectDescription); // Put the paragraph back
    editButton.textContent = 'Edit';
    editButton.classList.remove('done-project-btn');
    editButton.classList.add('edit-project-btn');
    removeButton.style.display = 'none';

    editButton.removeEventListener('click', saveAndRevert);
    editButton.addEventListener('click', () => editProject(projectCard, editButton));
  }

  // Check if the project is already in edit mode
  if (editButton.classList.contains('done-project-btn')) {
    saveAndRevert();
    return;
  }

  // Create input fields for title and description
  const titleInput = document.createElement('input');
  titleInput.value = projectTitle.textContent;
  const descriptionTextarea = document.createElement('textarea'); // Create a textarea
  descriptionTextarea.value = projectDescription.textContent;

  // Set initial height for the textarea AFTER it's added to the DOM
  projectDescription.replaceWith(descriptionTextarea);
  descriptionTextarea.style.height = descriptionTextarea.scrollHeight + 'px';

  // Hide the scrollbar
  descriptionTextarea.style.overflow = 'hidden'; 

  // Replace the title 
  projectTitle.replaceWith(titleInput);
  // Auto-resize for the textarea
  descriptionTextarea.addEventListener('input', () => {
    descriptionTextarea.style.height = descriptionTextarea.scrollHeight + 'px';
  });

  // Change the button to "Done"
  editButton.textContent = 'Done';
  editButton.classList.remove('edit-project-btn');
  editButton.classList.add('done-project-btn');

  // Show the remove button when in edit mode
  removeButton.style.display = 'inline-block';

  // Remove the "Edit" listener
  editButton.removeEventListener('click', () => editProject(projectCard, editButton));
  // Add the "Done" listener
  editButton.addEventListener('click', saveAndRevert);

  addImageButton.addEventListener('click', () => addImageToProject(projectImagesContainer));
}

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

