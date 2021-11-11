/*User list page script*/

// Main processing.
// Set up data table.
const dt = $('#table')
  .on('draw.dt', () => {
    $("#table_processing").hide();
  })
  .DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    ajax: {
      // URL to get list data.
      url: '/api/users',
      // Set action column elements.
      dataSrc: res => res.data.map(row => Object.assign(row, {actions: ''})),
      // For Ajax, send a cookie.
      xhrFields: {withCredentials: true}
    },
    columns: [
      {data: 'id', width: 30},
      {data: 'email'},
      {data: 'name'},
      {data: 'modified', width: 200},
      {data: 'actions', width: 150}
    ],
    columnDefs: [
      {
        targets: -1,
        orderable: false,
        render: (data, type, row) => `<a href="/users/${row.id}" class="btn btn-success">Edit</a>
                                      <button on-delete data-id="${row.id}" type="button" class="btn btn-danger mx-2">Delete</button>`
      }
    ],
    dom: `<'row'<'col-12'f>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    scrollX: true,
    responsive: true,
    pageLength: 30,
    fnServerParams: params => {
      params.offset = params.start;
      delete params.start;
      params.limit = params.length;
      delete params.length;
      const cols = Object.assign({}, params.columns);
      delete params.columns;
      const {column: index, dir} = params.order[0];
      params.order = cols[index].data;
      params.dir = dir;
      params.search = params.search.value;
    }
  });

// Set user delete action.
$('#table').on('click', '[on-delete]', async event => {
  try {
    // Row element.
    const tr = $(event.currentTarget).closest('tr');

    // Email of the user to be deleted.
    const email = tr.find('td:nth-of-type(2)').text();

    // Confirmation of deletion.
    if (!window.confirm(`Do you want to delete the user of mail ${email}?`))
      return;

    // Get the ID of the user to delete.
    const id = $(event.currentTarget).data('id');

    // Send user deletion request.
    const res = await $.ajax({
      type: 'DELETE',
      url: `/api/users/${id}`
    });

    // Remove row element from table.
    tr.fadeOut(() => {
      dt.row(tr).remove().draw();
    });
  } catch(e) {
    alert('An unexpected error has occurred.');
  }
});