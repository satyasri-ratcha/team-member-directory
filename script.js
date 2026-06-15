let employees = [];

const colors = [
    "#4f46e5",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#ec4899"
];

fetch("employees.json")
    .then(res => res.json())
    .then(data => {
        employees = data;
        displayEmployees(employees);
    });

function displayEmployees(data) {

    const container =
        document.getElementById("employeeContainer");

    container.innerHTML = "";

    data.forEach(emp => {

        const color =
            colors[emp.id % colors.length];

        container.innerHTML += `
        <div class="card">

            <div
                class="avatar"
                style="background:${color}"
            >
                ${emp.name.charAt(0)}
            </div>

            <h3>${emp.name}</h3>

            <span class="department">
                ${emp.department}
            </span>

            <p class="designation">
                ${emp.designation}
            </p>

        </div>
        `;
    });

    document.getElementById("count")
        .innerText = data.length;
}

document
    .getElementById("searchInput")
    .addEventListener("input", filterEmployees);

document
    .getElementById("departmentFilter")
    .addEventListener("change", filterEmployees);

function filterEmployees() {

    const search =
        document.getElementById("searchInput")
            .value.toLowerCase();

    const department =
        document.getElementById("departmentFilter")
            .value;

    const filtered =
        employees.filter(emp => {

            const matchName =
                emp.name.toLowerCase()
                    .includes(search);

            const matchDept =
                department === "All" ||
                emp.department === department;

            return matchName && matchDept;
        });

    displayEmployees(filtered);
}

function addEmployee() {

    const name =
        document.getElementById("name").value;

    const designation =
        document.getElementById("designation").value;

    const department =
        document.getElementById("department").value;

    if (name === "" || designation === "") {
        alert("Please fill all fields");
        return;
    }

    employees.push({
        id: employees.length + 1,
        name,
        designation,
        department
    });

    displayEmployees(employees);

    document.getElementById("name").value = "";
    document.getElementById("designation").value = "";
}