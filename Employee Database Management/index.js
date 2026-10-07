let currentEmployees = [];

// ! used AI
const formatDOB = (dob) => {
    if(dob.includes('/')){
        return dob;
    }

    const[year, month, day] = dob.split("-");
    return `${day}/${month}/${year}`;
}

const fetchData = async () => {
    const fetching = await fetch("./src/data.json");
    const res = await fetching.json();

    currentEmployees = res;

    displayingEmployeeList(res);
    // console.log(res)

}


const displayingEmployeeList = (employees) => {
    // console.log(employees);

    const listOfEmployee = document.getElementById("list_of_employees");
    const singleEmployeeDetails = document.getElementById("single_employee_details");

    listOfEmployee.innerHTML = "";
    singleEmployeeDetails.innerHTML = "";

    if(employees.length === 0){
        return;
    }

    for(const employee of employees){
        const listDiv = document.createElement("div");

        listDiv.classList = `flex justify-between items-center bg-gray-100 p-3 rounded-2xl mb-3 cursor-pointer hover:bg-gray-300`;


        listDiv.addEventListener("click", () => displayingEmployeeDetails(employee,listDiv));

        listDiv.innerHTML = `
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <button class="cursor-pointer delete_btn"><i class="fa-regular fa-circle-xmark text-red-900"></i></button>
        `

        // * two important things(listdiv. and stopPropagation())
        const deleteBtn = listDiv.querySelector(".delete_btn");
        deleteBtn.addEventListener("click" , (e) => {
            e.stopPropagation();
            handleDeleteEmployee(employee.id);
        });

        listOfEmployee.appendChild(listDiv);

        // ! used AI for showing 1st employee in the default view
        if(employee === employees[0]){
            displayingEmployeeDetails(employee,listDiv)
        }
    }
}

const displayingEmployeeDetails = (employee,listDiv) => {
    // console.log(employee,listDiv);

    removeActiveClaas();
    listDiv.classList.add("activeList");

    const singleEmployeeDetails = document.getElementById("single_employee_details");
    singleEmployeeDetails.innerHTML = "";

    const singleEmployeeDiv = document.createElement("div");

    singleEmployeeDiv.classList =  `flex flex-col items-center mt-3`;

    singleEmployeeDiv.innerHTML = `
        <img class="w-50 h-50" src="${employee.imageUrl}" alt="${employee.firstName}"/>
        <div class="text-center mt-4">
            <span>${employee.firstName} ${employee.lastName} (${employee.age})</span>
            <h4>${employee.address}</h4>
            <h4>${employee.email}</h4>
            <h4>Mobile - ${employee.contactNumber}</h4>
            <h4>DOB - ${formatDOB(employee.dob)}</h4>
        </div>
    `
    singleEmployeeDetails.appendChild(singleEmployeeDiv);
}

const removeActiveClaas = () => {
    const activeClasses = document.getElementsByClassName("activeList");

    for(const activeClass of activeClasses){
        activeClass.classList.remove("activeList")
    }
}

// ! did use AI but did some on my own also
const add_employee = (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const imageUrl = e.target.imageUrl.value || 'https://cdn-icons-png.flaticon.com/512/0/93.png';
    const email = e.target.email.value;
    const contactNumber = e.target.contactNumber.value;
    const salary = e.target.salary.value;
    const address = e.target.address.value;
    const age = e.target.age.value;
    const dob = e.target.dob.value;

    const id = currentEmployees.length > 0 ? Math.max(...currentEmployees.map(employee => employee.id)) + 1 : 1001;

    // const newDOB = formatDOB(dob);

    const newEmployee = {
        id,
        firstName,
        lastName,
        imageUrl,
        email,
        contactNumber,
        salary,
        address,
        age,
        dob
    }
    // console.log(newEmployee)

    currentEmployees.push(newEmployee);

    displayingEmployeeList(currentEmployees);

    e.target.reset();

    document.getElementById('add_new_employee_modal').close();
}

const handleDeleteEmployee = (id) => {
    currentEmployees = currentEmployees.filter((employee) => employee.id !== id);

    displayingEmployeeList(currentEmployees);
}
fetchData();