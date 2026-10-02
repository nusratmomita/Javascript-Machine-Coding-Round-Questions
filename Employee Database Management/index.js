const fetchData = async () => {
    const fetching = await fetch("./src/data.json");
    const res = await fetching.json();
    displayingEmployeeList(res);
    // console.log(res)
}

const displayingEmployeeList = (employees) => {
    // console.log(employees);

    const listOfEmployee = document.getElementById("list_of_employees");
    listOfEmployee.innerHTML = "";

    for(const employee of employees){
        const listDiv = document.createElement("div");

        listDiv.classList = `flex justify-between bg-gray-100 p-3 rounded-2xl mb-3 cursor-pointer hover:bg-gray-300`;

        // listDiv.id = "activeList";

        listDiv.addEventListener("click", () => displayingEmployeeDetails(employee,listDiv));
        // removeActiveClaas();
        // listDiv.classList.add("active");


        listDiv.innerHTML = `
            ${employee.firstName} ${employee.lastName} <span><i class="fa-regular fa-circle-xmark text-red-900"></i></span>
        `

        listOfEmployee.appendChild(listDiv)
    }
}

const displayingEmployeeDetails = (employee,listDiv) => {
    // console.log(employee);
    
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
            <h4>DOB - ${employee.dob}</h4>
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
fetchData();