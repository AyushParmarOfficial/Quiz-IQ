import { useEffect, useRef, useState } from "react";
import { getApi } from "../../Services/Api";
import { useSelector } from "react-redux";
import $ from 'jquery';

export default function Users() {
    const themeMode = useSelector((state) => state.theme.mode);
    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const url = "admin/users";

    const handleData = async () => {
        await getApi(data, setData, url);
    };

    useEffect(() => {
        handleData();
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            $(tableRef.current).DataTable({
                data: data,
                columns: [
                    {
                        title: 'ID',
                        data: 'id',
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    { title: 'Name', data: 'name' },
                    { title: 'Mobile', data: 'mobile' },
                    { title: 'Email', data: 'email' },
                    { 
                        title: 'User Type', 
                        data: 'user_type',
                        render: function (data) {
                            if (data === "a") return "Admin";
                            if (data === "c") return "Client";
                            return data;
                        }
                    }
                ],
                destroy: true,
                jQueryUI: true
            });
        }
    }, [data]);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-6xl">Users</h1>
            </div>

            <div className="w-full mt-6">
                <table ref={tableRef} className="display w-full"></table>
            </div>
        </>
    );
}