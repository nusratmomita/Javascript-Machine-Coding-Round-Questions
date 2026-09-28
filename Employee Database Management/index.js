const fetchData = async () => {
    const fetching = await fetch("./src/data.json");
    const res = await fetching.json();
    
    // console.log(res)
}

fetchData();