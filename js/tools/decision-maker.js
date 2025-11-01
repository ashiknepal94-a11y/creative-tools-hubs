// Decision Maker
const decisionOptions = document.getElementById('decision-options');
const makeDecisionBtn = document.getElementById('make-decision');
const decisionResult = document.getElementById('decision-result');
const resetDecisionBtn = document.getElementById('reset-decision');

// Make Decision
makeDecisionBtn.addEventListener('click', () => {
    const optionsText = decisionOptions.value.trim();
    
    if (!optionsText) {
        showNotification('Please enter at least two options', 'error');
        return;
    }
    
    // Split options by line
    const options = optionsText.split('\n').filter(option => option.trim() !== '');
    
    if (options.length < 2) {
        showNotification('Please enter at least two options', 'error');
        return;
    }
    
    // Add animation
    decisionResult.innerHTML = '<div class="decision-spinner animate-spin"></div>';
    
    // Simulate thinking process
    setTimeout(() => {
        // Select random option
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedOption = options[randomIndex];
        
        // Display result
        decisionResult.innerHTML = `
            <div class="decision-result-text">
                <div class="decision-label">The decision is:</div>
                <div class="decision-value">${selectedOption}</div>
            </div>
        `;
        
        resetDecisionBtn.style.display = 'block';
        
        showNotification('Decision made!', 'success');
    }, 2000);
});

// Reset Decision
resetDecisionBtn.addEventListener('click', () => {
    decisionResult.innerHTML = '';
    resetDecisionBtn.style.display = 'none';
});