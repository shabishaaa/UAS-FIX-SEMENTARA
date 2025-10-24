// ==== Config & State ====
const defaultConfig = {
  brand_name: "B'AS",
  hero_title: "Welcome to B'AS",
  hero_description: "Your trusted partner in quality products. We deliver excellence with every product we create.",
  contact_email: "info@bas.com",
  contact_phone: "+62 123 456 789",
  contact_address: "Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345",
  primary_color: "#8B4513",
  secondary_color: "#FFA366",
  team_names: "Aulia • Bima • Sari • Danu"
};

let contactMessages = [];
let currentPage = "home";

// ==== Helpers ====
function setThemeColors(primary, secondary){
  document.documentElement.style.setProperty("--brown", primary || defaultConfig.primary_color);
  document.documentElement.style.setProperty("--orange", secondary || defaultConfig.secondary_color);
}

function render(config={}){
  const cfg = {...defaultConfig, ...config};
  document.querySelectorAll('[data-page]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      const page = el.getAttribute('data-page');
      if(page) showPage(page);
    });
  });

  document.getElementById('hero-title').textContent = cfg.hero_title;
  document.getElementById('hero-description').textContent = cfg.hero_description;
  document.getElementById('contact-email-display').textContent = cfg.contact_email;
  document.getElementById('contact-phone-display').textContent = cfg.contact_phone;
  document.getElementById('contact-address-display').textContent = cfg.contact_address;
  document.getElementById('team-names').textContent = cfg.team_names;

  setThemeColors(cfg.primary_color, cfg.secondary_color);
}

function showPage(pageName){
  // Toggle sections
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('d-none'));
  const target = document.getElementById(`${pageName}-page`);
  if(target){ target.classList.remove('d-none'); }

  // Update nav active
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
  if(activeLink){ activeLink.classList.add('active'); }

  currentPage = pageName;
  // Collapse navbar after click (mobile)
  const nav = document.getElementById('mainNav');
  if(nav?.classList.contains('show')){
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(nav);
    bsCollapse.hide();
  }
}

function setupContactForm(){
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const messageDiv = document.getElementById('form-message');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // HTML5 validation
    if(!form.checkValidity()){
      form.classList.add('was-validated');
      return;
    }
    // Limit
    if(contactMessages.length >= 999){
      showFormMessage('Maaf, batas maksimum 999 pesan telah tercapai. Silakan hubungi kami melalui email atau telepon.', 'danger');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    messageDiv.classList.add('d-none');

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      submitted_at: new Date().toISOString()
    };

    // Simpan ke memori (demo)
    contactMessages.push(data);

    // Reset & feedback
    form.reset();
    form.classList.remove('was-validated');
    showFormMessage('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.', 'success');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Kirim Pesan';
  });
}

function showFormMessage(text, type='success'){
  const messageDiv = document.getElementById('form-message');
  messageDiv.textContent = text;
  messageDiv.className = `alert alert-${type} mt-3`; // reset classes
  // auto hide after 5s
  setTimeout(()=>{
    messageDiv.classList.add('d-none');
  }, 5000);
}

// ==== Init ====
document.addEventListener('DOMContentLoaded', ()=>{
  render();
  setupContactForm();
  showPage('home');
});
