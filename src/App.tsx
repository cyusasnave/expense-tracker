import { produce } from "immer";
import { useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { FieldValues } from "react-hook-form";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Grocery Shopping",
      amount: 15000,
      category: "Food",
    },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  const handleDelete = (id: string) => {
    setExpenses(
      produce((draft) => draft.filter((expense) => expense.id !== id))
    );
  };

  const handleSubmit = (data: FieldValues) => {
    setExpenses(
      produce((draft) => {
        const id = String(expenses.length + 10);
        return [{ id, ...data }, ...draft];
      })
    );
  };

  return (
    <div className="app-container">
      <h1 className="mb-3">Expense tracker</h1>
      <div className="mb-5">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
    </div>
  );
}

export default App;
