async function storeData_Local(key, value)
{
    localStorage.setItem(key, value);
}

async function storeJSON_Local(key, json)
{
    localStorage.setItem(key, JSON.stringify(json));
}


function getData_Local(key)
{
    return localStorage.getItem(key);
}

function getJSON_Local(key)
{
    return JSON.parse(localStorage.getItem(key));
}


function isAuthenticated()
{
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
        return true;
    }
    return false;
}

export {
    storeData_Local,
    storeJSON_Local,
    getData_Local,
    getJSON_Local,
    isAuthenticated
}