document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const doctor = document.getElementById('doctor').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const parsedTime = parseTime(time);
  
      if (!doctor || !date || !time) {
        alert('Por favor, complete todos los campos.');
        return;
      }
  
      const amPm = parsedTime.hour < 12 ? 'AM' : 'PM';
      const hour = parsedTime.hour % 12 || 12; // Convertir la hora en formato 12 horas
      const formattedTime = `${hour}:${parsedTime.minute} ${amPm}`;
  
      const appointmentDetails = `Cita programada con éxito:\nMédico: ${doctor}\nFecha: ${date}\nHora: ${formattedTime}`;
      alert(appointmentDetails);
      form.reset();
    });
  
    // Función para analizar la hora y devolver un objeto con las partes de la hora
    function parseTime(timeString) {
      const parts = timeString.split(':');
      return {
        hour: parseInt(parts[0], 10),
        minute: parts[1]
      };
    }
  
    // Datos de perfiles de médicos
    const doctorProfiles = [
      {
        nombre: "Dr. Smith",
        especialidad: "Cardiólogo",
        bio: "El Dr. Smith es un cardiólogo con más de 15 años de experiencia en el tratamiento de enfermedades cardíacas.",
        disponibilidad: "Lunes a Viernes, 9am - 5pm"
      },
      {
        nombre: "Dr. Jones",
        especialidad: "Dermatólogo",
        bio: "La Dra. Jones es una dermatóloga certificada con experiencia en el tratamiento de una variedad de condiciones de la piel.",
        disponibilidad: "Martes y Jueves, 10am - 6pm"
      }
    ];
  
    const contenedorPerfiles = document.getElementById('doctorProfiles');
    doctorProfiles.forEach(profile => {
      const profileCard = document.createElement('div');
      profileCard.classList.add('profile-card');
      profileCard.innerHTML = `
        <h2>${profile.nombre}</h2>
        <p><strong>Especialidad:</strong> ${profile.especialidad}</p>
        <p><strong>Disponibilidad:</strong> ${profile.disponibilidad}</p>
        <p>${profile.bio}</p>
      `;
      contenedorPerfiles.appendChild(profileCard);
    });
  });
