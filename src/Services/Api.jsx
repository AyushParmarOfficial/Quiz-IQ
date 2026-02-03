export const getApi = async (data, setData, url, setLoading = null) => {
    try {
        if (setLoading) setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const result = await response.json();


        if (response.ok) {
            if (result.statusCode === 401) {
                localStorage.removeItem('token');
                const pathName = window.location.pathname;
                window.location.href = `/signin?path=${encodeURIComponent(pathName)}`;
            } else {
                setData(result.data);
            }
        }

    } catch (error) {
        console.error("Error during getApi:", error);
    } finally {
        if (setLoading) setLoading(false);
    }
}


export const postApi = async (data, setData, url, setError, setSuccess, isMultipart = false, setLoading = null) => {
    try {
        if (setLoading) setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
            method: "POST",
            headers: isMultipart ? {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            } : {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: isMultipart ? data : JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            if (result.statusCode === 422) {
                setError(result.errors);
            } else if (result.statusCode === 401) {
                localStorage.removeItem('token');
                window.location.href = "/signin";
            } else {
                setError([]);
                setSuccess(result.message);
            }
        }

        return result;

    } catch (error) {
        console.error("Error during postApi:", error);
    } finally {
        if (setLoading) setLoading(false);
    }
}

export const deleteApi = async (url, setSuccess, setLoading = null) => {
    try {
        if (setLoading) setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess(result.message);
        } else {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = "/signin";
            }
        }

    } catch (error) {
        console.error("Error during deleteApi:", error);
    } finally {
        if (setLoading) setLoading(false);
    }
}