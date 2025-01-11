/*header animatie*/

  const navE1 = document.querySelector('.header');
  const headerImage = document.querySelector('#logo');

  window.addEventListener('scroll',()=>{
      if (window.scrollY >= 50){
          navE1.classList.remove('header-scrolled');
          headerImage.src = "logo2.png";

      } else if (window.screenY < 50){
          navE1.classList.add('header-scrolled')
          headerImage.src = "logo.png";
      }
  });


/*muisaanwijzer animatie*/
  
  console.clear();

  const circleElement = document.querySelector('.circle');

  const mouse = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 }
  const circle = { x: 0, y: 0 };

  let currentScale = 0;
  let currentAngle = 0;

  window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  });

  const speed = 0.17;

  const tick = () => {
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  const scaleValue = (mouseVelocity / 150) * 0.5;
  currentScale += (scaleValue - currentScale) * speed;
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  if (mouseVelocity > 20) {
      currentAngle = angle;
  }
  const rotateTransform = `rotate(${currentAngle}deg)`;

  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  window.requestAnimationFrame(tick);
  }

  tick();

  


document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Voorkom standaard verzending

  // Haal waarden uit de velden
  const name = this.user_name.value.trim();
  const email = this.user_email.value.trim();
  const date = this.event_date.value.trim();
  const location = this.event_location.value.trim();
  const phone = this.user_phone.value.trim();

  // Controleer of de naam minstens twee woorden bevat
  const nameWords = name.split(' ');
  if (nameWords.length < 2) {
      alert('Vul minstens twee woorden in voor de naam (voor- en achternaam).');
      return;
  }

  // Controleer of alle verplichte velden zijn ingevuld
  if (!name || !email || !date || !location || !phone) {
      alert('Vul alle verplichte velden in!');
      return;
  }

  // Als alle validaties slagen, verstuur het formulier via EmailJS
  emailjs.sendForm('service_7oj71bb', 'template_mvyzwph', this)
      .then(function() {
          alert('E-mail succesvol verzonden!');
      }, function(error) {
          alert('Er is een fout opgetreden: ' + JSON.stringify(error));
      });
});
