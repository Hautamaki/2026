
// emailjs.init("GD6SFFUbg8-aJWvwz");

// document.getElementById("contact-form")
//     .addEventListener("submit", function(e) {
//         e.preventDefault();

//       emailjs.sendForm(
//         "lukqFuDHtL3WL0i5gUtjt",
//         "template_w6nw46j",
//         this
//       ).then(() => {
//         alert("Email sent!");
//       }, (error) => {
//         console.error(error);
//         alert("Failed to send email.");
//     });
// });

// Lomakkeen lähetys
document.getElementById('contact-form').addEventListener('submit', function(event) {

  document.getElementById('loader').style.display = block;
  document.getElementById('send-message-button-text').style.display = none;

  event.preventDefault();
          
  // Generoi contact_number
  // this.contact_number.value = Math.random() * 100000 | 0;
          
  // Lähetä lomake
  emailjs.sendForm('service_ar65dc5', 'template_w6nw46j', this)
    .then(function() {
      // Näytä onnistumisviesti
      document.getElementById('success-message').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';

      document.getElementById('loader').style.display = none;
      document.getElementById('send-message-button-text').style.display = block;
                  
      // Tyhjennä lomake
      document.getElementById('contact-form').reset();
                  
      // Piilota viesti 5 sekunnin jälkeen
      setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
      }, 5000);
    }, function(error) {
      // Näytä virheviesti
      console.error('Virhe:', error);
      document.getElementById('error-message').style.display = 'block';
      document.getElementById('success-message').style.display = 'none';

      document.getElementById('loader').style.display = none;
      document.getElementById('send-message-button-text').style.display = block;
    });
});
  