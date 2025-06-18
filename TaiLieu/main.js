document.addEventListener("DOMContentLoaded", function () {
    const addDocBtn = document.getElementById("addDocBtn");
    const addModal = new bootstrap.Modal(document.getElementById("addDocModal"));

    if (addDocBtn) {
        addDocBtn.addEventListener("click", () => {
            addModal.show();
        });
    }

    const viewButtons = document.querySelectorAll(".view-edit-view");
    const editButtons = document.querySelectorAll(".view-edit-edit");
    const deleteButtons = document.querySelectorAll(".delete");

    viewButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            alert("Hiển thị chi tiết tài liệu (demo).");
        });
    });

    editButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            alert("Chức năng chỉnh sửa tài liệu (demo).");
        });
    });

    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
                const row = btn.closest("tr");
                if (row) row.remove();
            }
        });
    });
});
