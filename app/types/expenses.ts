export interface ExpensesData {
  id: string;
  paidBy: {
    name: string;
    image: string;
  };
  title: string;
  amount: number;
  date: string;
}
