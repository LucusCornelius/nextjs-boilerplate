"use client";

import { useEffect, useState } from "react";

type WorkHour = {
    id: number;
    user_id: number;
    employee: string;
    date: string;
    clock_in: string;
    clock_out: string;
    total_hours: number;
    project: string;
    status: string;
};

export default function WorkHoursTable() {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    const [rows, setRows] = useState<WorkHour[]>([]);
    const [newRow, setNewRow] = useState({ date: "", clockIn: "", clockOut: "", project: "", companyId: 1});

    const [userId, setUserId ] = useState<number | 3>(3);




    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/employee");
            if (res.ok) {
                const data = await res.json();
                console.log(data.userId);
                setUserId(data.userId);
            }
        };
        fetchUser();
    }, []);



    useEffect(() => {
        const fetchCompanyDetails = async () => {
            const res = await fetch("/api/company");
            if (res.ok) {
                const data = await res.json();
                setCompanies(data.rows);
                console.log(data.rows);
            }
        };
        fetchCompanyDetails();
    }, []);

    const handleChange = (e) => {
        const id = Number(e.target.value);
        setSelectedCompanyId(id);
        setNewRow(prev => ({ ...prev, companyId: id }));
    };


    const employeeMap: Record<number, string> = {
        3: "FLISS Hoofdaccount",
        4: "Lucas",
        5: "Shaheen",
        6: "Ingmar",
        7: "Ferran",
        8: "Steyn",
    };


    const fetchRows = async (companyId: number) => {
        const res = await fetch(`/api/work-hours?companyId=${companyId}`);
        const data = await res.json();
        if (res.ok) {
            const mappedRows = data.rows.map((row: any) => ({
                ...row,
                employee: employeeMap[row.user_id] || `User ${row.user_id}`,
            }));
            setRows(mappedRows);
        }
    };


    useEffect(() => {
        if (selectedCompanyId) {
            fetchRows(selectedCompanyId);
        }
    }, [selectedCompanyId]);


    const handleAddRow = async () => {
        const res = await fetch("/api/work-hours", {
            method: "POST",
            body: JSON.stringify(newRow),
        });
        const data = await res.json();
        if (res.ok) {

            setRows([
                ...rows,
                {
                    ...data.row,
                    employee: employeeMap[data.row.user_id] || `User ${data.row.user_id}`,
                },
            ]);
            setNewRow({ date: "", clockIn: "", clockOut: "", project: "" });
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="p-4 min-h-screen backdrop-blur-sm">
            <div className="overflow-x-auto">
                <div>
                    <select onChange={handleChange} value={selectedCompanyId || ""}>
                        <option value="" disabled>
                            Select a company
                        </option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.company_name}
                            </option>
                        ))}
                    </select>

                    <p>Selected Company ID: {selectedCompanyId}</p>
                </div>
                <table className="min-w-full bg-white/30 backdrop-blur-lg border border-gray-300 rounded-xl shadow-md">
                    <thead className="bg-white/40 backdrop-blur-md">
                    <tr>
                        <th className="px-6 py-3 text-left text-gray-700">Date</th>
                        <th className="px-6 py-3 text-left text-gray-700">Employee</th>
                        <th className="px-6 py-3 text-left text-gray-700">Clock In</th>
                        <th className="px-6 py-3 text-left text-gray-700">Clock Out</th>
                        <th className="px-6 py-3 text-left text-gray-700">Total Hours</th>
                        <th className="px-6 py-3 text-left text-gray-700">Description</th>
                        <th className="px-6 py-3 text-left text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-gray-700">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className="border-b border-white/20 hover:bg-white/20 transition">
                            <td className="px-6 py-2">{row.date}</td>
                            <td className="px-6 py-2">{row.employee}</td>
                            <td className="px-6 py-2">{row.clock_in}</td>
                            <td className="px-6 py-2">{row.clock_out}</td>
                            <td className="px-6 py-2">{row.total_hours}</td>
                            <td className="px-6 py-2">{row.project}</td>
                            <td
                                className={`px-6 py-2 font-semibold ${
                                    row.status === "Pending"
                                        ? "text-yellow-500"
                                        : row.status === "Approved"
                                            ? "text-green-500"
                                            : "text-red-500"
                                }`}
                            >
                                {row.status}
                            </td>
                            <td className="px-6 py-2">—</td>
                        </tr>
                    ))}
                    <tr className="border-t border-white/20 bg-white/20 backdrop-blur-sm">
                        <td>
                            <input
                                type="date"
                                className="border border-gray-300 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm"
                                value={newRow.date}
                                onChange={(e) => setNewRow({ ...newRow, date: e.target.value })}
                            />
                        </td>
                        <td className="text-gray-700">
                            {employeeMap[userId]}
                        </td>
                        <td>
                            <input
                                type="time"
                                className="border border-gray-300 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm text-center w-full"
                                value={newRow.clockIn}
                                onChange={(e) => setNewRow({ ...newRow, clockIn: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="time"
                                className="border border-gray-300 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm text-center w-full"
                                value={newRow.clockOut}
                                onChange={(e) => setNewRow({ ...newRow, clockOut: e.target.value })}
                            />
                        </td>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="border border-gray-300 px-2 py-1 rounded-lg bg-white/50 backdrop-blur-sm"
                                value={newRow.project}
                                onChange={(e) => setNewRow({ ...newRow, project: e.target.value })}
                            />
                        </td>
                        <td></td>
                        <td>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl shadow-md transition"
                                onClick={handleAddRow}
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
