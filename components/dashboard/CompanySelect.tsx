type CompanySelectProps = {
  companies: any[];
  selectedCompanyId: number | null;
  onChange: (id: number) => void;
};

export default function CompanySelect({
                                        companies,
                                        selectedCompanyId,
                                        onChange
                                      }: CompanySelectProps) {
  return (
    <select
      onChange={(e) => onChange(Number(e.target.value))}
      value={selectedCompanyId || ""}
      className="mb-4 text-black rounded p-2"
    >
      <option value="" disabled>
        Select a company
      </option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.company_name}
        </option>
      ))}
    </select>
  );
}
