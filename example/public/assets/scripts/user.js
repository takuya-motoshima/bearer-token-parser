/*User add/edit page script*/

// Main processing.
// Edit flag. If it is 1, edit the user, if it is 0, add the user.
const edit = $('#edit').val() == 1;

// In the case of editing, the update target user ID is obtained.
const id = edit ? $('#id').val() : undefined;

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

      // Submit a user add or update request.
      let res;
      if (edit) {
        res = await $.ajax({
          type: 'PUT',
          url: `/api/users/${id}`,
          data: new FormData(form),
          contentType: false,
          processData: false
        });
      } else {
        res = await $.ajax({
          type: 'POST',
          url: '/api/users',
          data: new FormData(form),
          contentType: false,
          processData: false
        });
      }

      // In case of error.
      if (res.error)
        return void alert(res.error);

      // If the user addition/update is successful, move to the user list page.
      alert('Saved the user.');
      location.href =  `${globalThis.baseUrl}/users`;
    } catch(e) {
      alert('An unexpected error has occurred.');
    }
  }
});