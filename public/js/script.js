/* ========================================
   نظام مراقبة مكاتب السفر والسياحة
   JavaScript File
   ======================================== */

// ========== البيانات الوهمية (Mock Data) ==========

const mockOffices = [
  {
    id: 1,
    name: "منار السفر",
    licenseNumber: "12345",
    status: "معتمد",
    registrationDate: "2023-01-15",
    packages: 5,
    rating: 4.5,
  },
  {
    id: 2,
    name: "نسك للسياحة",
    licenseNumber: "12346",
    status: "معتمد",
    registrationDate: "2023-02-20",
    packages: 8,
    rating: 4.8,
  },
  {
    id: 3,
    name: "الرحلة الذهبية",
    licenseNumber: "12347",
    status: "معتمد",
    registrationDate: "2023-03-10",
    packages: 6,
    rating: 4.2,
  },
  {
    id: 4,
    name: "عالم السفر",
    licenseNumber: "12348",
    status: "معتمد",
    registrationDate: "2023-04-05",
    packages: 7,
    rating: 4.6,
  },
  {
    id: 5,
    name: "الواحة للسياحة",
    licenseNumber: "12349",
    status: "معتمد",
    registrationDate: "2023-05-12",
    packages: 4,
    rating: 4.3,
  },
];

const mockPackages = [
  {
    id: 1,
    name: "عمرة اقتصادية",
    type: "اقتصادية",
    price: 8500,
    duration: "10 أيام",
    services: "فندق 3 نجوم، تأشيرة، مواصلات",
  },
  {
    id: 2,
    name: "عمرة عائلية",
    type: "عائلية",
    price: 15000,
    duration: "12 يوم",
    services: "فندق 4 نجوم، تأشيرة، مواصلات، مرافق",
  },
  {
    id: 3,
    name: "عمرة VIP",
    type: "VIP",
    price: 25000,
    duration: "14 يوم",
    services: "فندق 5 نجوم، تأشيرة، مواصلات خاصة، مرافق",
  },
];

const mockComplaints = [
  {
    id: "2024-001",
    office: "منار السفر",
    citizen: "أحمد محمد",
    description: "عدم توفر الخدمات المتفق عليها",
    status: "قيد المراجعة",
    date: "2024-02-15",
  },
  {
    id: "2024-002",
    office: "نسك للسياحة",
    citizen: "فاطمة علي",
    description: "تأخير في الحصول على التأشيرة",
    status: "تمت معالجتها",
    date: "2024-02-10",
  },
  {
    id: "2024-003",
    office: "الرحلة الذهبية",
    citizen: "محمود حسن",
    description: "شكوى تتعلق بجودة الفندق",
    status: "قيد المراجعة",
    date: "2024-02-18",
  },
];

// ========== دوال عامة ==========

/**
 * عرض رسالة تنبيهية
 * @param {string} message - نص الرسالة
 * @param {string} type - نوع الرسالة (success, warning, danger, info)
 */
function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} show`;
  alertDiv.textContent = message;

  const container = document.querySelector(".container") || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 4000);
}

/**
 * عرض نافذة منبثقة (Modal)
 * @param {string} title - عنوان النافذة
 * @param {string} content - محتوى النافذة
 */
function showModal(title, content) {
  let modal = document.getElementById("customModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "customModal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2></h2>
          <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.querySelector(".modal-header h2").textContent = title;
  modal.querySelector(".modal-body").innerHTML = content;
  modal.classList.add("show");
}

/**
 * إغلاق النافذة المنبثقة
 */
function closeModal() {
  const modal = document.getElementById("customModal");
  if (modal) {
    modal.classList.remove("show");
  }
}

/**
 * إغلاق النافذة عند النقر خارجها
 */
document.addEventListener("click", function (event) {
  const modal = document.getElementById("customModal");
  if (modal && event.target === modal) {
    closeModal();
  }
});

// ========== وظائف الصفحة الرئيسية ==========

/**
 * تحميل إحصائيات النظام
 */
function loadStatistics() {
  const statsContainer = document.getElementById("statistics");
  if (!statsContainer) return;

  const totalOffices = mockOffices.length;
  const totalComplaints = mockComplaints.length;
  const resolvedComplaints = mockComplaints.filter(
    (c) => c.status === "تمت معالجتها"
  ).length;

  statsContainer.innerHTML = `
    <div class="stat-box">
      <div class="number">${totalOffices}</div>
      <div class="label">مكاتب مسجلة</div>
    </div>
    <div class="stat-box">
      <div class="number">${resolvedComplaints}</div>
      <div class="label">شكاوى معالجة</div>
    </div>
    <div class="stat-box">
      <div class="number">${totalComplaints}</div>
      <div class="label">إجمالي الشكاوى</div>
    </div>
    <div class="stat-box">
      <div class="number">98%</div>
      <div class="label">معدل الالتزام</div>
    </div>
  `;
}

// ========== وظائف بوابة الوزارة ==========

/**
 * تحميل قائمة المكاتب في لوحة التحكم
 */
function loadOfficesList() {
  const officesContainer = document.getElementById("officesList");
  if (!officesContainer) return;

  let html = `
    <table>
      <thead>
        <tr>
          <th>اسم المكتب</th>
          <th>رقم الترخيص</th>
          <th>الحالة</th>
          <th>عدد الباقات</th>
          <th>التقييم</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
  `;

  mockOffices.forEach((office) => {
    html += `
      <tr>
        <td>${office.name}</td>
        <td>${office.licenseNumber}</td>
        <td><span class="badge badge-success">${office.status}</span></td>
        <td>${office.packages}</td>
        <td>⭐ ${office.rating}</td>
        <td>
          <button class="btn btn-primary btn-small" onclick="viewOfficeDetails(${office.id})">
            عرض التفاصيل
          </button>
        </td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  officesContainer.innerHTML = html;
}

/**
 * عرض تفاصيل المكتب
 */
function viewOfficeDetails(officeId) {
  const office = mockOffices.find((o) => o.id === officeId);
  if (!office) return;

  const content = `
    <p><strong>اسم المكتب:</strong> ${office.name}</p>
    <p><strong>رقم الترخيص:</strong> ${office.licenseNumber}</p>
    <p><strong>الحالة:</strong> ${office.status}</p>
    <p><strong>تاريخ التسجيل:</strong> ${office.registrationDate}</p>
    <p><strong>عدد الباقات:</strong> ${office.packages}</p>
    <p><strong>التقييم:</strong> ⭐ ${office.rating}</p>
    <button class="btn btn-warning mt-2" onclick="closeModal()">إغلاق</button>
  `;

  showModal(`تفاصيل المكتب: ${office.name}`, content);
}

/**
 * تحميل مؤشرات الالتزام
 */
function loadComplianceIndicators() {
  const complianceContainer = document.getElementById("complianceIndicators");
  if (!complianceContainer) return;

  complianceContainer.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3>مؤشرات الالتزام</h3>
      </div>
      <div class="card-body">
        <div style="margin-bottom: 1rem;">
          <p><strong>معدل الالتزام العام:</strong> 98%</p>
          <div style="background-color: #e9ecef; border-radius: 10px; height: 20px; overflow: hidden;">
            <div style="background-color: #28a745; width: 98%; height: 100%;"></div>
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <p><strong>الامتثال للأسعار:</strong> 95%</p>
          <div style="background-color: #e9ecef; border-radius: 10px; height: 20px; overflow: hidden;">
            <div style="background-color: #0066cc; width: 95%; height: 100%;"></div>
          </div>
        </div>
        <div>
          <p><strong>الامتثال للخدمات:</strong> 100%</p>
          <div style="background-color: #e9ecef; border-radius: 10px; height: 20px; overflow: hidden;">
            <div style="background-color: #28a745; width: 100%; height: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * تحميل آخر المخالفات
 */
function loadViolations() {
  const violationsContainer = document.getElementById("violations");
  if (!violationsContainer) return;

  const violations = [
    {
      id: 1,
      office: "منار السفر",
      violation: "عدم الالتزام بالأسعار المعلنة",
      date: "2024-02-15",
      severity: "متوسطة",
    },
    {
      id: 2,
      office: "الرحلة الذهبية",
      violation: "تأخير في تقديم الخدمات",
      date: "2024-02-10",
      severity: "عالية",
    },
    {
      id: 3,
      office: "عالم السفر",
      violation: "عدم توفر الخدمات المتفق عليها",
      date: "2024-02-05",
      severity: "متوسطة",
    },
  ];

  let html = `
    <table>
      <thead>
        <tr>
          <th>المكتب</th>
          <th>نوع المخالفة</th>
          <th>التاريخ</th>
          <th>مستوى الخطورة</th>
        </tr>
      </thead>
      <tbody>
  `;

  violations.forEach((violation) => {
    const severityBadge =
      violation.severity === "عالية"
        ? "badge-danger"
        : "badge-warning";
    html += `
      <tr>
        <td>${violation.office}</td>
        <td>${violation.violation}</td>
        <td>${violation.date}</td>
        <td><span class="badge ${severityBadge}">${violation.severity}</span></td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  violationsContainer.innerHTML = html;
}

/**
 * معالج نموذج إضافة باقة جديدة (بوابة الوزارة)
 */
function handleAddPackageAdmin(event) {
  event.preventDefault();

  const packageName = document.getElementById("packageNameAdmin").value;
  const packageType = document.getElementById("packageTypeAdmin").value;
  const packagePrice = parseFloat(
    document.getElementById("packagePriceAdmin").value
  );

  if (packagePrice < 5000 || packagePrice > 50000) {
    showAlert(
      "السعر خارج النطاق المسموح (5000 - 50000 ريال)",
      "warning"
    );
  } else {
    showAlert(
      `تمت إضافة الباقة "${packageName}" بنجاح`,
      "success"
    );
    document.getElementById("addPackageFormAdmin").reset();
  }
}

// ========== وظائف بوابة المواطن ==========

/**
 * معالج نموذج تقديم الشكوى
 */
function handleComplaintSubmit(event) {
  event.preventDefault();

  const citizenId = document.getElementById("citizenId").value;
  const officeName = document.getElementById("officeName").value;
  const complaintDescription = document.getElementById("complaintDescription")
    .value;

  if (!citizenId || !officeName || !complaintDescription) {
    showAlert("يرجى ملء جميع الحقول", "warning");
    return;
  }

  const complaintNumber = `2024-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;
  showAlert(
    `تم استلام الشكوى برقم: ${complaintNumber}. سيتم التحقق منها خلال 48 ساعة`,
    "success"
  );

  document.getElementById("complaintForm").reset();
}

/**
 * التحقق من اعتماد المكتب
 */
function verifyOfficeCredentials() {
  const licenseNumber = document.getElementById("licenseNumber").value;

  if (!licenseNumber) {
    showAlert("يرجى إدخال رقم الترخيص", "warning");
    return;
  }

  const office = mockOffices.find((o) => o.licenseNumber === licenseNumber);

  if (office) {
    const content = `
      <div style="text-align: center;">
        <p style="font-size: 1.2rem; color: #28a745; margin-bottom: 1rem;">✓ المكتب موثق ومعتمد</p>
        <p><strong>اسم المكتب:</strong> ${office.name}</p>
        <p><strong>رقم الترخيص:</strong> ${office.licenseNumber}</p>
        <p><strong>التقييم:</strong> ⭐ ${office.rating}</p>
        <button class="btn btn-primary mt-2" onclick="loadOfficePackages('${licenseNumber}')">
          عرض الباقات
        </button>
        <button class="btn btn-secondary mt-2" onclick="closeModal()">إغلاق</button>
      </div>
    `;
    showModal("التحقق من اعتماد المكتب", content);
  } else {
    showAlert("المكتب غير موثق أو رقم الترخيص غير صحيح", "danger");
  }
}

/**
 * عرض باقات المكتب
 */
function loadOfficePackages(licenseNumber) {
  closeModal();

  const office = mockOffices.find((o) => o.licenseNumber === licenseNumber);
  if (!office) return;

  let html = `<h3>باقات ${office.name}</h3><div class="grid">`;

  mockPackages.forEach((pkg) => {
    html += `
      <div class="card">
        <div class="card-header">
          <h4>${pkg.name}</h4>
          <span class="badge badge-info">${pkg.type}</span>
        </div>
        <div class="card-body">
          <p><strong>السعر:</strong> ${pkg.price.toLocaleString()} ريال</p>
          <p><strong>المدة:</strong> ${pkg.duration}</p>
          <p><strong>الخدمات:</strong> ${pkg.services}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-success btn-small" onclick="showAlert('تم حفظ الباقة في قائمة المفضلة', 'success')">
            إضافة للمفضلة
          </button>
        </div>
      </div>
    `;
  });

  html += `</div><button class="btn btn-secondary mt-2" onclick="location.reload()">العودة</button>`;

  const container = document.querySelector(".container");
  if (container) {
    container.innerHTML = html;
  }
}

// ========== وظائف بوابة المكتب ==========

/**
 * تحميل باقات المكتب الحالية
 */
function loadOfficeCurrentPackages() {
  const packagesContainer = document.getElementById("officePackages");
  if (!packagesContainer) return;

  let html = `
    <table>
      <thead>
        <tr>
          <th>اسم الباقة</th>
          <th>النوع</th>
          <th>السعر</th>
          <th>المدة</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
  `;

  mockPackages.forEach((pkg) => {
    html += `
      <tr>
        <td>${pkg.name}</td>
        <td>${pkg.type}</td>
        <td>${pkg.price.toLocaleString()} ريال</td>
        <td>${pkg.duration}</td>
        <td>
          <button class="btn btn-warning btn-small" onclick="showAlert('تم تحديث الباقة', 'success')">
            تعديل
          </button>
          <button class="btn btn-danger btn-small" onclick="showAlert('تم حذف الباقة', 'info')">
            حذف
          </button>
        </td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  packagesContainer.innerHTML = html;
}

/**
 * معالج نموذج إضافة باقة جديدة (بوابة المكتب)
 */
function handleAddPackageOffice(event) {
  event.preventDefault();

  const packageName = document.getElementById("packageNameOffice").value;
  const packageType = document.getElementById("packageTypeOffice").value;
  const packagePrice = parseFloat(
    document.getElementById("packagePriceOffice").value
  );
  const packageServices = document.getElementById("packageServicesOffice").value;

  if (!packageName || !packageType || !packagePrice || !packageServices) {
    showAlert("يرجى ملء جميع الحقول", "warning");
    return;
  }

  if (packagePrice < 5000) {
    showAlert(
      "تحذير: السعر منخفض جداً. الحد الأدنى المسموح به هو 5000 ريال",
      "warning"
    );
  } else if (packagePrice > 50000) {
    showAlert(
      "تحذير: السعر مرتفع جداً. الحد الأقصى المسموح به هو 50000 ريال",
      "warning"
    );
  } else if (packagePrice >= 5000 && packagePrice <= 20000) {
    showAlert(
      `تم إضافة الباقة "${packageName}" بنجاح بسعر ${packagePrice.toLocaleString()} ريال`,
      "success"
    );
    document.getElementById("addPackageFormOffice").reset();
  } else {
    showAlert(
      `تم إضافة الباقة "${packageName}" بنجاح بسعر ${packagePrice.toLocaleString()} ريال`,
      "success"
    );
    document.getElementById("addPackageFormOffice").reset();
  }
}

/**
 * عرض ختم الاعتماد
 */
function showApprovalSeal() {
  const content = `
    <div style="text-align: center;">
      <div style="font-size: 4rem; margin: 2rem 0;">
        ✓
      </div>
      <p style="font-size: 1.3rem; color: #28a745; font-weight: bold; margin-bottom: 1rem;">
        مكتب معتمد رسمياً
      </p>
      <p><strong>رقم الاعتماد:</strong> 2024-001</p>
      <p><strong>تاريخ الاعتماد:</strong> 2024-01-15</p>
      <p><strong>تاريخ انتهاء الاعتماد:</strong> 2025-01-15</p>
      <button class="btn btn-primary mt-2" onclick="closeModal()">إغلاق</button>
    </div>
  `;
  showModal("ختم الاعتماد الرسمي", content);
}

// ========== تهيئة الصفحة ==========

/**
 * تهيئة الصفحة عند التحميل
 */
document.addEventListener("DOMContentLoaded", function () {
  // تحميل البيانات حسب الصفحة الحالية
  const currentPage = document.body.getAttribute("data-page");

  if (currentPage === "home") {
    loadStatistics();
  } else if (currentPage === "admin") {
    loadOfficesList();
    loadComplianceIndicators();
    loadViolations();
  } else if (currentPage === "citizen") {
    // لا توجد بيانات لتحميلها في الصفحة الأولى
  } else if (currentPage === "office") {
    loadOfficeCurrentPackages();
  }
});
