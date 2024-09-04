// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })();

  //Total Members
  async function getTotalUsers() {
    try {
      const count = await User.countDocuments({});
      console.log("Total registered users: ", count);
    } catch (err) {
      console.error("Error counting users: ", err);
      return null;
    }
  }

  getTotalUsers();

  // Total Reports 
  async function getTotalReports() {
    try {
      const report = await Report.countDocuments({});
      console.log("Total reports: ", report);
    } catch (err) {
      console.error("Error counting reports: ", err);
      return null;
    }
  }

  getTotalReports();