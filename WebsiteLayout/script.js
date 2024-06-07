
let currentStep = 1;
let currentStepFields;

document.addEventListener("DOMContentLoaded", () => {
  updateForm();

  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener("submit", (event) => {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  function validateForm() {
    let isValid = true;

    currentStepFields.forEach((field) => {
      const errorMessage = field.nextElementSibling;

      if (!field.value.trim()) {
        isValid = false;
        errorMessage.textContent = "This field is required.";
        errorMessage.style.display = "inline-block";
      } else {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
      }
    });

    // Additional validation for checkbox
    const checkbox = document.getElementById("flexCheckDefault");
    const checkboxErrorMessage = document.querySelector(
      ".error-message-checkbox"
    );

    if (!checkbox.checked) {
      isValid = false;
      checkboxErrorMessage.textContent =
        "Please accept the terms & conditions.";
      checkboxErrorMessage.style.display = "inline-block";
    } else {
      checkboxErrorMessage.textContent = "";
      checkboxErrorMessage.style.display = "none";
    }

    const radioButtons = document.querySelectorAll(
      ".form-group:nth-child(" +
        currentStep +
        ') input[name^="flexRadioDefault"]'
    );
    const radioErrorMessage = document.querySelector(
      ".error-message-radio"
    );

    if (radioButtons.length > 0) {
      let isRadioButtonChecked = false;
      radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
          isRadioButtonChecked = true;
        }
      });

      if (!isRadioButtonChecked) {
        isValid = false;
        radioErrorMessage.textContent = "Please select an option.";
        radioErrorMessage.style.display = "inline-block";
      } else {
        radioErrorMessage.textContent = "";
        radioErrorMessage.style.display = "none";
      }
    }

    return isValid;
  }
});

function nextStep() {
  let allFieldsFilled = true;

  currentStepFields.forEach((field) => {
    const errorMessage = field.nextElementSibling;

    if (!field.value.trim()) {
      allFieldsFilled = false;
      errorMessage.textContent = "This field is required.";
      errorMessage.style.display = "inline-block";
    } else {
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
    }
  });
  if (currentStep === 1) {
    // Call validatePasswords and check its result
    if (!validatePasswords()) {
        allFieldsFilled = false;
    }
}

  // Additional validation for checkbox
  const checkbox = document.getElementById("flexCheckDefault");
  const checkboxErrorMessage = document.querySelector(
    ".error-message-checkbox"
  );

  if (!checkbox.checked) {
    checkboxErrorMessage.textContent =
      "Please accept the terms & conditions.";
    checkboxErrorMessage.style.display = "inline-block";
    allFieldsFilled = false;
  } else {
    checkboxErrorMessage.textContent = "";
    checkboxErrorMessage.style.display = "none";
  }

  // Validation for radio buttons if they exist in the current step
  const radioButtons = document.querySelectorAll(
    ".form-group:nth-child(" +
      currentStep +
      ') input[name^="flexRadioDefault"]'
  );
  const radioErrorMessage = document.querySelector(
    ".error-message-radio"
  );

  if (radioButtons.length > 0) {
    let isRadioButtonChecked = false;
    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        isRadioButtonChecked = true;
      }
    });

    if (!isRadioButtonChecked) {
      radioErrorMessage.textContent = "Please select an option.";
      radioErrorMessage.style.display = "inline-block";
      allFieldsFilled = false;
    } else {
      radioErrorMessage.textContent = "";
      radioErrorMessage.style.display = "none";
    }
  }

  if (allFieldsFilled) {
    if (currentStep < 6) {
      currentStep++;
      updateForm();
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateForm();
  }
}

function updateForm() {
  const steps = document.querySelectorAll(".form-group");
  steps.forEach((step, index) => {
    if (index + 1 === currentStep) {
      step.style.display = "block";
      currentStepFields = step.querySelectorAll(
        "input[required], textarea[required]"
      );
      currentStepFields.forEach((field) => {
        field.addEventListener("input", () => {
          const errorMessage = field.nextElementSibling;

          if (!field.value.trim()) {
            errorMessage.textContent = "This field is required.";
            errorMessage.style.display = "inline-block";
          } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
          }
        });
      });

      // Event listener for checkbox
      if (currentStep === 1) {
        const checkbox = document.getElementById("flexCheckDefault");
        const checkboxErrorMessage = document.querySelector(
          ".error-message-checkbox"
        );

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            checkboxErrorMessage.textContent = "";
            checkboxErrorMessage.style.display = "none";
          }
        });
      }

      const radioButtons = document.querySelectorAll(
        ".form-group:nth-child(" +
          currentStep +
          ') input[name^="flexRadioDefault"]'
      );
      const radioErrorMessage = document.querySelector(
        ".error-message-radio"
      );

      if (radioButtons.length > 0) {
        radioButtons.forEach((radioButton) => {
          radioButton.addEventListener("change", () => {
            radioErrorMessage.textContent = "";
            radioErrorMessage.style.display = "none";
          });
        });
      }
    } else {
      step.style.display = "none";
    }
  });
}




function togglePasswordVisibility(inputId) {
  var passwordInput = document.getElementById(inputId);
  var eyeIcon = document.getElementById('eyeIcon');

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove('bi-eye-fill');
      eyeIcon.classList.add('bi-eye-slash-fill');
  } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove('bi-eye-slash-fill');
      eyeIcon.classList.add('bi-eye-fill');
  }
}
function togglePasswordVisibility2(inputId) {
  var passwordInput = document.getElementById(inputId);
  var eyeIcon = document.getElementById('eyeIcon2');

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove('bi-eye-fill');
      eyeIcon.classList.add('bi-eye-slash-fill');
  } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove('bi-eye-slash-fill');
      eyeIcon.classList.add('bi-eye-fill');
  }
}


// Define validatePasswords function outside nextStep
// function validatePasswords() {
//     var password = document.getElementById('password').value;
//     var confirmPassword = document.getElementById('confirmpassword').value;
//     var confirmPasswordError = document.getElementById('confirmpassworderror');

//     confirmPasswordError.style.display = 'none';

//     // Check if passwords match
//     if (password !== confirmPassword) {
//         confirmPasswordError.innerText = 'Passwords do not match';
//         confirmPasswordError.style.display = 'block';
//         return false;
//     }
//     else {
//       // Passwords match, clear the error message
//       confirmPasswordError.innerText = '';
//       confirmPasswordError.style.display = 'none';
//     }

//     return true;
// }
function validatePasswords() {
  var password = document.getElementById('password');
  var confirmPassword = document.getElementById('confirmpassword');
  var confirmPasswordError = document.getElementById('confirmpassworderror');

  confirmPasswordError.style.display = 'none';

  function clearErrorMessage() {
    confirmPasswordError.innerText = '';
    confirmPasswordError.style.display = 'none';
  }

  // Add event listener to 'password' field
  password.addEventListener('input', clearErrorMessage);

  // Add event listener to 'confirmpassword' field
  confirmPassword.addEventListener('input', clearErrorMessage);

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.innerText = 'Passwords do not match';
    confirmPasswordError.style.display = 'block';
    return false;
  }

  return true;
}

