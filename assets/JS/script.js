  const container = document.querySelector(".container");

  const step1HTML = `
    <h1>Multi-Step Company Registration Form</h1>
    <div class="form-section" id="step-1">
      <h2>Step 1: Personal Data</h2>
      <label>Name of Applicant:*</label>
      <input type="text" placeholder="Enter applicant name">

      <label>Home Address:*</label>
      <textarea placeholder="Enter home address"></textarea>

      <label>State:*</label>
      <select>
        <option>--Select State--</option>
        <option>Abia</option>
        <option>Adamawa</option>
        <option>Akwa Ibom</option>
        <option>Anambara</option>
        <option>Bauchi</option>
        <option>Bayelsa</option>
        <option>Benue</option>
        <option>Borno</option>
        <option>Cross River</option>
        <option>Delta</option>
        <option>Ebonyi</option>
        <option>Edo</option>
        <option>Ekiti</option>
        <option>Enugu</option>
        <option>Gombe</option>
        <option>Imo</option>
        <option>Jigawa</option>
        <option>Kaduna</option>
        <option>Kano</option>
        <option>Kastina</option>
        <option>Kebi</option>
        <option>Kogi</option>
        <option>Kwara</option>
        <option>Lagos</option>
        <option>Nasarawa</option>
        <option>Niger</option>
        <option>Ogun</option>
        <option>Ondo</option>
        <option>Osun</option>
        <option>Oyo</option>
        <option>Plateu</option>
        <option>Rivers</option>
        <option>Sokoto</option>
        <option>Taraba</option>
        <option>Yobe</option>
        <option>Zamfara</option>
        <option>Abuja</option>
      </select>

      <label>Phone Number 1:*</label>
      <input type="tel" placeholder="Enter primary phone number">

      <label>Phone Number 2:</label>
      <input type="tel" placeholder="Enter secondary phone number (optional)">

      <label>Email:*</label>
      <input type="email" placeholder="Enter email address">

      <label>Position in Company:*</label>
      <input type="text" placeholder="Enter your position in company">

      <label>Application Type:*</label>
      <select>
        <option>--Select--</option>
        <option>Supply and Trading (Petroleum Products)</option>
        <option>Procurement (Non-Petroleum Products)</option>
      </select>

      <br><br>
      <button onclick="loadStep2()">Next</button>
    </div>
  `;

  const step2HTML = `
    <div class="form-section" id="step-2">
      <h2>Step 2: Business Data</h2>

      <label>Company Name:*</label>
      <input type="text" placeholder="Enter company name">

      <label>Registered Office Address:*</label>
      <textarea placeholder="Enter registered office address"></textarea>

      <label>Contact Address:*</label>
      <textarea placeholder="Enter contact address"></textarea>

      <label>Phone Number:*</label>
      <input type="text" placeholder="Enter phone number">

      <label>Email:*</label>
      <input type="email" placeholder="Enter email">

      <label>Web Address:</label>
      <input type="url">

      <label>Can we visit your site?*</label>
      <select>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <br><br>
      <button onclick="loadStep3()">Next</button>
    </div>
  `;

  const step3HTML = `
    <div class="form-section" id="step-3">
      <h2>Step 3: Contract Information</h2>

      <h3>Documents</h3>
      <p><a href="#">Download Indemnity Form</a> (Please upload the completed indemnity form on your company letterhead)</p>

      <div class="file-section">
        <label>Certificate of Incorporation, Form C02 and C07 (Max. 2MB)</label>
        <input type="file" accept=".pdf,.doc,.xls,.ppt,.jpg,.jpeg,.png,.pptx,.docx">
      </div>

      <div class="file-section">
        <label>VAT Registration Certificate (Max. 2MB)</label>
        <input type="file" accept=".xls,.doc,.jpeg,.png,.pptx,.docx,.pdf,.jpg,.ppt">
      </div>

      <div class="file-section">
        <label>Company Profile (Max. 5MB)</label>
        <input type="file" accept=".pdf,.xls,.doc,.ppt,.jpg,.jpeg,.png,.pptx,.docx">
      </div>

      <div class="file-section">
        <label>Bank Reference Letter (Max. 2MB)</label>
        <input type="file" accept=".pdf,.xls,.doc,.ppt,.jpg,.jpeg,.png,.pptx,.docx">
      </div>

      <div class="file-section">
        <label>Indemnity Form (Max. 2MB)</label>
        <input type="file" accept=".pdf,.jpg,.png">
      </div>

      <br><br>
      <button type="submit" onclick="window.location.href='signup.html'">Submit Registration</button>
    </div>
  `;

  // Trigger this on clicking "New Vendor Registration"
document.getElementById("startRegistration").addEventListener("click", () => {
  container.innerHTML = step1HTML;
});
  function loadStep2() {
    container.innerHTML = step2HTML;
  }

  function loadStep3() {
    container.innerHTML = step3HTML;
  }
function fadeInContent(content) {
  container.style.opacity = 0;
  setTimeout(() => {
    container.innerHTML = content;
    container.style.opacity = 1;
  }, 250);
}

document.getElementById("startRegistration").addEventListener("click", () => {
  fadeInContent(step1HTML);
});

function loadStep2() {
  fadeInContent(step2HTML);
}

function loadStep3() {
  fadeInContent(step3HTML);
}

