//Validation Edit
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const fullName = document.getElementById("fullName");
    const dob = document.getElementById("dob");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    const namePattern = /^[\p{L}\s]+$/u; // Chữ có dấu tiếng Việt
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

    function setError(input, condition, showMsg = false) {
        if (condition) {
            input.classList.add("is-invalid");
            if (showMsg) {
                input.nextElementSibling.style.display = "block";
            } else {
                input.nextElementSibling.style.display = "none";
            }
            isValid = false;
        } else {
            input.classList.remove("is-invalid");
            input.nextElementSibling.style.display = "none";
        }
    }

    // Validate Tên sinh viên
    if (fullName.value.trim() === "") {
        setError(fullName, true, false);
    } else if (!namePattern.test(fullName.value.trim())) {
        setError(fullName, true, true);
    } else {
        setError(fullName, false);
    }

    // Validate Ngày sinh
    if (dob.value.trim() === "") {
        setError(dob, true, false);
    } else {
        const inputDate = new Date(dob.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (inputDate >= today) {
            setError(dob, true, true);
        } else {
            setError(dob, false);
        }
    }

    // Validate SĐT
    if (phone.value.trim() === "") {
        setError(phone, true, false);
    } else if (!phonePattern.test(phone.value.trim())) {
        setError(phone, true, true);
    } else {
        setError(phone, false);
    }

    // Validate Email
    if (email.value.trim() === "") {
        setError(email, true, false);
    } else if (!emailPattern.test(email.value.trim())) {
        setError(email, true, true);
    } else {
        setError(email, false);
    }

    if (isValid) {
        showToast("toastEdit");
        // showErrorToast("customToastErrorEdit");
        const tabTrigger = document.querySelector(
            '[data-bs-target="#profile-overview"]'
        );
        bootstrap.Tab.getOrCreateInstance(tabTrigger).show();
    }
});

// Validation Change Password
document
    .getElementById("changePasswordForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const currentPassword = document.getElementById("currentPassword");
        const newPassword = document.getElementById("newPassword");
        const renewPassword = document.getElementById("renewPassword");

        const currentPasswordError = document.getElementById(
            "currentPasswordError"
        );
        const newPasswordError = document.getElementById("newPasswordError");
        const renewPasswordError = document.getElementById("renewPasswordError");

        let isValid = true;

        // Reset
        [currentPassword, newPassword, renewPassword].forEach((input) => {
            input.classList.remove("is-invalid");
        });
        [currentPasswordError, newPasswordError, renewPasswordError].forEach(
            (err) => (err.textContent = "")
        );

        // Validate mật khẩu hiện tại
        const current = currentPassword.value.trim();
        if (current === "") {
            currentPassword.classList.add("is-invalid");
        } else if (current !== "123456789") {
            currentPassword.classList.add("is-invalid");
            currentPasswordError.textContent = "Mật khẩu hiện tại không đúng";
            isValid = false;
        }

        // Validate mật khẩu mới
        const newPass = newPassword.value.trim();
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
        if (newPass === "") {
            newPassword.classList.add("is-invalid");
        } else if (!passwordPattern.test(newPass)) {
            newPassword.classList.add("is-invalid");
            newPasswordError.textContent =
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
            isValid = false;
        }

        // Validate xác nhận mật khẩu
        const rePass = renewPassword.value.trim();
        if (rePass === "") {
            renewPassword.classList.add("is-invalid");
        } else if (rePass !== newPass) {
            renewPassword.classList.add("is-invalid");
            renewPasswordError.textContent = "Mật khẩu xác nhận không khớp";
            isValid = false;
        }

        // Nếu tất cả hợp lệ
        if (isValid && current !== "" && newPass !== "" && rePass !== "") {
            showToast("toastPassword");
            // showErrorToast("customToastErrorChangePass");
            currentPassword.value = "";
            newPassword.value = "";
            renewPassword.value = "";

            // Xóa class lỗi và thông báo lỗi
            [currentPassword, newPassword, renewPassword].forEach((input) => {
                input.classList.remove("is-invalid");
            });

            [currentPasswordError, newPasswordError, renewPasswordError].forEach(
                (err) => (err.textContent = "")
            );
            const tabTrigger = document.querySelector(
                '[data-bs-target="#profile-overview"]'
            );
            bootstrap.Tab.getOrCreateInstance(tabTrigger).show();
        }
    });

// Notification Success
function showToast(id) {
    const toast = document.getElementById(id);
    toast.style.display = "block";
    toast.style.opacity = "1";
    setTimeout(() => {
        toast.style.display = "none";
    }, 4000);
}

function hideToast(id) {
    const toast = document.getElementById(id);
    toast.style.display = "none";
}

// Notification Error
function showErrorToast(id) {
    const toast = document.getElementById(id);
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 4000);
}

function hideErrorToast(id) {
    const toast = document.getElementById(id);
    toast.style.display = "none";
}

// function showCustomNotification(message) {
//   const notification = document.createElement("div");
//   notification.style.cssText = `
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: #e6ffe6;
//     border: 2px solid #d4edda;
//     border-radius: 5px;
//     padding: 10px 20px;
//     box-shadow: 0 2px 5px rgba(0,0,0,0.2);
//     z-index: 1000;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     width: 300px;
//   `;

//   const icon = document.createElement("span");
//   icon.innerHTML = "✓"; // Checkmark symbol
//   icon.style.cssText = `
//     color: #28a745;
//     font-size: 20px;
//     margin-right: 10px;
//   `;

//   const text = document.createElement("span");
//   text.textContent = message;
//   text.style.cssText = `color: #155724;`;

//   const closeBtn = document.createElement("span");
//   closeBtn.innerHTML = "×";
//   closeBtn.style.cssText = `
//     color: #721c24;
//     font-size: 20px;
//     cursor: pointer;
//   `;
//   closeBtn.onclick = () => document.body.removeChild(notification);

//   notification.appendChild(icon);
//   notification.appendChild(text);
//   notification.appendChild(closeBtn);
//   document.body.appendChild(notification);

//   setTimeout(() => {
//     document.body.removeChild(notification);
//   }, 3000); // Auto-close after 3 seconds
// }