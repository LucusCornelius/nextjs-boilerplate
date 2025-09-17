export type WorkHour = {
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
