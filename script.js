// Update just the script.js file to fix meter and requirements
const password = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const strengthText = document.getElementById('strength');
const meterFill = document.querySelector('.meter-fill');
const requirementsList = document.querySelectorAll('.requirement');
const requirements = {
   length: document.getElementById('length'),
   uppercase: document.getElementById('uppercase'), 
   lowercase: document.getElementById('lowercase'),
   number: document.getElementById('number'),
   special: document.getElementById('special')
};

togglePassword.addEventListener('click', function() {
   if (password.type === 'password') {
       password.type = 'text';
       this.querySelector('i').classList.remove('fa-eye');
       this.querySelector('i').classList.add('fa-eye-slash');
   } else {
       password.type = 'password';
       this.querySelector('i').classList.remove('fa-eye-slash');
       this.querySelector('i').classList.add('fa-eye');
   }
});

function updateUI(value) {
   const checks = {
       length: value.length >= 12,
       uppercase: /[A-Z]/.test(value),
       lowercase: /[a-z]/.test(value),
       number: /[0-9]/.test(value),
       special: /[^A-Za-z0-9]/.test(value)
   };

   for (let req in checks) {
       const element = requirements[req];
       if (checks[req]) {
           element.classList.add('valid');
           element.querySelector('i').classList.remove('fa-circle');
           element.querySelector('i').classList.add('fa-check-circle');
       } else {
           element.classList.remove('valid');
           element.querySelector('i').classList.remove('fa-check-circle');
           element.querySelector('i').classList.add('fa-circle');
       }
   }

   const passedChecks = Object.values(checks).filter(Boolean).length;
   
   if (value.length === 0) {
       strengthText.textContent = 'None';
       meterFill.style.width = '0%';
       meterFill.style.backgroundColor = '#374151';
       password.style.borderColor = '#374151';
   } else if (passedChecks <= 2) {
       strengthText.textContent = 'Weak';
       meterFill.style.width = '33%';
       meterFill.style.backgroundColor = 'var(--weak-color)';
       password.style.borderColor = 'var(--weak-color)';
   } else if (passedChecks <= 4) {
       strengthText.textContent = 'Medium';
       meterFill.style.width = '66%';
       meterFill.style.backgroundColor = 'var(--medium-color)';
       password.style.borderColor = 'var(--medium-color)';
   } else {
       strengthText.textContent = 'Strong';
       meterFill.style.width = '100%';
       meterFill.style.backgroundColor = 'var(--strong-color)';
       password.style.borderColor = 'var(--strong-color)';
   }
}

password.addEventListener('input', function() {
   updateUI(this.value);
});