// Add your code here

function submitData(name, email) {
    const url = "http://localhost:3000/users";
  
    const formData = {
      name: name,
      email: email,
    };
  
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData)
    };
  
    return fetch(url, configurationObject)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
        return response.json();
      })
      .then(data => {
        // Manipulate DOM here based on the response data
        console.log(data); // For debugging
        document.body.innerHTML += `<div>ID: ${data.id}</div>`;
        return data; // Return data for potential further processing
      })
      .catch(error => {
        // Handle fetch errors and append error message to the DOM
        console.error('Error:', error);
        let errorMessage;
        if (error instanceof FetchError && error.message.includes('Unauthorized Access')) {
          errorMessage = 'Unauthorized Access: Please check your credentials.';
        } else {
          errorMessage = 'Failed to submit data. Please try again later.';
        }
        document.body.innerHTML += `<div>Error: ${errorMessage}</div>`;
        throw error; // Re-throw error for potential further handling
      });
  }
  