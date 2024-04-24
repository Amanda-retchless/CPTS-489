const petition = require('./petition');

const validateEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const displaySignatures = signatures => {
  const signaturesList = document.getElementById('signatures');
  signaturesList.innerHTML = '';
  signatures.forEach(signature => {
    const listItem = document.createElement('li');
    listItem.textContent = signature;
    signaturesList.appendChild(listItem);
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const signatures = await petition.getSignatures();
    displaySignatures(signatures);
  } catch (err) {
    console.error(`Error fetching signatures: ${err}`);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const signButton = document.querySelector('.button');
  const emailInput = document.querySelector('#email');

  signButton.addEventListener('click', () => {
    if (validateEmail(emailInput.value)) {
      alert('Thank you for signing the petition!');
    } else {
      alert('Please enter a valid email address.');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comments = document.getElementById('comments').value;

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await petition.addSignature(name, email, comments);
      const signatures = await petition.getSignatures();
      displaySignatures(signatures);

      form.reset();
      emailInput.focus();
    } catch (err) {
      console.error(`Error adding signature: ${err}`);
    }
  });
});