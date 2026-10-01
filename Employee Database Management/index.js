const fetchData = async () => {
    const fetching = await fetch("./src/data.json");
    const res = await fetching.json();
    displayingEmployeeList(res);
    // console.log(res)
}

const displayingEmployeeList = (employees) => {
    console.log(employees);

    const listOfEmployee = document.getElementById("list_of_employees");
    listOfEmployee.innerHTML = "";

    for(const employee of employees){
        const listDiv = document.createElement("div");

        listDiv.classList = `flex justify-between bg-gray-200 p-3 rounded-2xl mb-3 cursor-pointer hover:bg-gray-300`;

        listDiv.innerHTML = `
            ${employee.firstName} ${employee.lastName} <span><i class="fa-regular fa-circle-xmark text-red-900"></i></span>
        `

        listOfEmployee.appendChild(listDiv)
    }


}

fetchData();