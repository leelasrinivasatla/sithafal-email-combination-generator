document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values and clean spaces
    const firstName = document.getElementById('firstName').value.trim().replace(/\s+/g, '').toLowerCase();
    const lastName = document.getElementById('lastName').value.trim().replace(/\s+/g, '').toLowerCase();
    const birthYear = document.getElementById('birthYear').value;
    const birthDay = document.getElementById('birthDay').value;
    const birthMonth = document.getElementById('birthMonth').value;
    const domain = document.getElementById('domain').value.trim().toLowerCase();

    // Generate email combinations
    const emailCombinations = generateEmailCombinations(firstName, lastName, birthYear, birthDay, birthMonth, domain);

    // Display results
    const resultDiv = document.getElementById('result');
    const emailList = document.getElementById('emailList');

    emailList.innerHTML = '';  // Clear previous results

    emailCombinations.forEach(email => {
        const li = document.createElement('li');
        li.textContent = email;
        emailList.appendChild(li);
    });

    resultDiv.classList.remove('hidden');  // Show the result section
});

function generateEmailCombinations(firstName, lastName, birthYear, day, month, domain) {
    let combinations = [];
    
    // Basic combinations
    combinations.push(`${firstName}.${lastName}@${domain}`);
    combinations.push(`${firstName}${lastName}@${domain}`);
    combinations.push(`${firstName[0]}.${lastName}@${domain}`);
    combinations.push(`${firstName[0]}${lastName}@${domain}`);
    combinations.push(`${firstName}_${lastName}@${domain}`);
    combinations.push(`${firstName}-${lastName}@${domain}`);

    // Initial-based combinations
    combinations.push(`${firstName[0]}${lastName[0]}@${domain}`); // e.g. aj@gmail.com
    combinations.push(`${firstName[0]}_${lastName[0]}@${domain}`);
    combinations.push(`${firstName[0]}-${lastName[0]}@${domain}`);

    // Reverse combinations
    combinations.push(`${lastName}.${firstName}@${domain}`);
    combinations.push(`${lastName}${firstName}@${domain}`);
    
    // Birth year and date combinations
    if (birthYear) {
        combinations.push(`${firstName}.${lastName}${birthYear}@${domain}`);
        combinations.push(`${firstName}${birthYear}@${domain}`);
        combinations.push(`${firstName}.${lastName}${birthYear.substring(2)}@${domain}`);
        combinations.push(`${firstName}${birthYear.substring(2)}@${domain}`);
    }

    if (day && month) {
        combinations.push(`${firstName}.${lastName}${day}${month}@${domain}`);
        combinations.push(`${firstName}${lastName}${day}${month}@${domain}`);
    }

    return combinations;
}

// Copy to clipboard functionality
document.getElementById('copyButton').addEventListener('click', function() {
    const emails = document.getElementById('emailList').innerText;

    navigator.clipboard.writeText(emails).then(function() {
        const copyAlert = document.getElementById('copyAlert');
        copyAlert.style.display = 'block';
        setTimeout(() => {
            copyAlert.style.display = 'none';
        }, 2000);
    }).catch(function(error) {
        console.error('Failed to copy text: ', error);
    });
});
