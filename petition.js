function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const signButton = document.querySelector('.button');
    const emailInput = document.querySelector('#email');
  
    signButton.addEventListener('click', function() {
      if (validateEmail(emailInput.value)) {
        alert('Thank you for signing the petition!');
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    fetch('/signatures', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(signatures => {
      const signaturesList = document.getElementById('signatures');
      signatures.forEach(signature => {
        const listItem = document.createElement('li');
        listItem.textContent = `${signature.name} (${signature.email}) - ${signature.comments}`;
        signaturesList.appendChild(listItem);
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const comments = document.querySelector('#comments').value;
  
      if (validateEmail(email)) {
        fetch('/signatures', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, comments })
        })
        .then(response => response.json())
        .then(signature => {
          const signaturesList = document.getElementById('signatures');
          const listItem = document.createElement('li');
          listItem.textContent = `${signature.name} (${signature.email}) - ${signature.comments}`;
          signaturesList.appendChild(listItem);
        });
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });