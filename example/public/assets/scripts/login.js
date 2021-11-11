/*Login page script*/

// Main processing.
// Form validation.
$('#form').validate({
  validClass: 'is-valid', 
  errorClass: 'is-invalid',
  errorElement: "div",
  errorPlacement: (error, element) => {
    $(element).after($(error).addClass('invalid-feedback'));
  },
  submitHandler: async (form, event) => {
    try {
      event.preventDefault();

      // Send an authentication request.
      const res = await fetch('/api/users/login', {method: 'POST', body: new FormData(form)});

      // Authentication result.
      const isAuthenticated = await res.json();

      // If login fails.
      if (!isAuthenticated)
        return void alert('The user name or password is incorrect.');

      // After logging in successfully, you will be taken to the top page.
      location.href = '/';
    } catch(e) {
      alert('An unexpected error has occurred.');
    }
  }
});