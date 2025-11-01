// Password Generator
const passwordLength = document.getElementById('password-length');
const passwordLengthValue = document.getElementById('password-length-value');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const generatePasswordBtn = document.getElementById('generate-password');
const passwordResult = document.getElementById('password-result');
const copyPasswordBtn = document.getElementById('copy-password');
const checkPasswordBtn = document.getElementById('check-password');
const passwordStrength = document.getElementById('password-strength');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Update password length display
passwordLength.addEventListener('input', () => {
    passwordLengthValue.textContent = passwordLength.value;
});

// Generate Password
generatePasswordBtn.addEventListener('click', () => {
    const length = parseInt(passwordLength.value);
    const useUppercase = includeUppercase.checked;
    const useLowercase = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSymbols = includeSymbols.checked;
    
    // Validate at least one character type is selected
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
        showNotification('Please select at least one character type', 'error');
        return;
    }
    
    // Build character set
    let charset = '';
    if (useUppercase) charset += uppercaseChars;
    if (useLowercase) charset += lowercaseChars;
    if (useNumbers) charset += numberChars;
    if (useSymbols) charset += symbolChars;
    
    // Generate password
    let password = '';
    
    // Ensure at least one character from each selected type
    if (useUppercase) password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    if (useLowercase) password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    if (useNumbers) password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    if (useSymbols) password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
    
    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    // Display password
    passwordResult.textContent = password;
    copyPasswordBtn.style.display = 'block';
    checkPasswordBtn.style.display = 'block';
    
    showNotification('Password generated successfully!', 'success');
});

// Copy Password
copyPasswordBtn.addEventListener('click', () => {
    const text = passwordResult.textContent;
    copyToClipboard(text);
});

// Check Password Strength
checkPasswordBtn.addEventListener('click', () => {
    const password = passwordResult.textContent;
    const strength = calculatePasswordStrength(password);
    
    // Display strength
    passwordStrength.innerHTML = '';
    
    const strengthBar = document.createElement('div');
    strengthBar.className = 'password-strength-bar';
    
    let strengthText = '';
    let strengthColor = '';
    
    switch (strength) {
        case 0:
        case 1:
            strengthText = 'Very Weak';
            strengthColor = '#ef4444';
            strengthBar.style.width = '20%';
            break;
        case 2:
            strengthText = 'Weak';
            strengthColor = '#f59e0b';
            strengthBar.style.width = '40%';
            break;
        case 3:
            strengthText = 'Medium';
            strengthColor = '#eab308';
            strengthBar.style.width = '60%';
            break;
        case 4:
            strengthText = 'Strong';
            strengthColor = '#22c55e';
            strengthBar.style.width = '80%';
            break;
        case 5:
            strengthText = 'Very Strong';
            strengthColor = '#10b981';
            strengthBar.style.width = '100%';
            break;
    }
    
    strengthBar.style.backgroundColor = strengthColor;
    passwordStrength.appendChild(strengthBar);
    
    const strengthLabel = document.createElement('div');
    strengthLabel.textContent = strengthText;
    strengthLabel.style.color = strengthColor;
    strengthLabel.style.fontWeight = '500';
    strengthLabel.style.marginTop = '0.5rem';
    strengthLabel.style.textAlign = 'center';
    passwordStrength.appendChild(strengthLabel);
    
    showNotification('Password strength checked!', 'success');
});

// Calculate Password Strength
function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety check
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Cap at 5
    return Math.min(strength, 5);
}