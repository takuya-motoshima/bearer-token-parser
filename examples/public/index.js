// Add a new user.
(() => {
  const $form = $('#postUserForm');
  const $enableToken = $('#enablePostUserToken');
  const $token = $form.find('[name="token"]:first');
  const $resBody = $form.find('[data-response-body]:first');
  const $resHeaders = $form.find('[data-response-headers]:first');
  const $email = $form.find('[name="email"]:first');
  const $name = $form.find('[name="name"]:first');

  // Display the response
  function displayResponse(xhr, $resBody, $resHeader, res) {
    $resBody.removeClass('prettyprinted').text(res ? JSON.stringify(res, null, '  ') : '');
    $resHeaders.removeClass('prettyprinted').text(xhr.getAllResponseHeaders());
    prettyPrint();
  }

  // Form submit.
  $form.on('submit', async (event) => {
    event.preventDefault();
    $.ajax({
      url: $form.data('url'),
      type: 'POST',
      headers: $enableToken.prop('checked') ? { Authorization: `Bearer ${$token.val()}` } : undefined,
      data: {
        email: $email.val(),
        name: $name.val()
      }
    })
    .then((res, status, xhr) => displayResponse(xhr, $resBody, $resHeaders, res))
    .catch((xhr, status, error) => displayResponse(xhr, $resBody, $resHeaders));
  });

  // Switch the use of tokens.
  $enableToken.on('change', () => {
    $($enableToken.data('target')).prop('disabled', !$enableToken.prop('checked'))
  });
})();

