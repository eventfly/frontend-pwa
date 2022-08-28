async function postData(url='', data={})
{
    const authToken = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    });

    return response.json();
}

async function deleteData(url='')
{
    const authToken = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer"
    });
}

async function putData(url='', data={})
{
    const authToken = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    });

    return response.json();
}

async function getData(url="")
{
    const authToken = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });

    return response.json();
}


export {
    postData,
    putData,
    getData,
    deleteData
};