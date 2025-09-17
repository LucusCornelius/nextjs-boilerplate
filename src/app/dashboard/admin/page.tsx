"use client";
import { useEffect, useState } from "react";
import Sidebar from "@components/dashboard/Sidebar";
import CompanySelect from "@components/dashboard/CompanySelect";
import WorkHoursChart from "@components/dashboard/menu/WorkHoursChart";
import { WorkHour } from "@/types/workhour";

export default function WorkHoursTable() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [rows, setRows] = useState<WorkHour[]>([]);

  const employeeMap: Record<number, string> = {
    3: "FLISS Hoofdaccount",
    4: "Lucas",
    5: "Shaheen",
    6: "Ingmar",
    7: "Ferran",
    8: "Steyn",
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const res = await fetch("/api/company");
      if (res.ok) {
        const data = await res.json();
        setCompanies(data.rows);
      }
    };
    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    if (!selectedCompanyId) return;

    const fetchRows = async () => {
      const res = await fetch(`/api/work-hours?companyId=${selectedCompanyId}`);
      if (res.ok) {
        const data = await res.json();
        const mappedRows = data.rows.map((row: any) => ({
          ...row,
          employee: employeeMap[row.user_id] || `User ${row.user_id}`,
        }));
        setRows(mappedRows);
      }
    };

    fetchRows();
  }, [selectedCompanyId]);

  return (
    <div className="p-4 min-h-screen font-sans flex">
      <Sidebar />
      <div className="flex-1 ml-6 text-white">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 col-span-2">
            <h1>Uren Statistieken</h1>
            <CompanySelect
              companies={companies}
              selectedCompanyId={selectedCompanyId}
              onChange={setSelectedCompanyId}
            />
            <WorkHoursChart rows={rows} />
          </div>
          <div className="bg-blue-500 rounded-lg p-4">Component 2</div>
          <div className="bg-red-500 rounded-lg p-4">Component 3</div>
        </div>
      </div>
    </div>
  );
}
