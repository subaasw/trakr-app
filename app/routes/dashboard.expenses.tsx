// import { Pagination } from '~/components/ui/Pagination';
import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import BeautifulTable from '~/components/ExpensesDetailsTable';
import AddExpensesModal from '~/components/AddExpensesModal';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { createExpenses, getWorkspaceInfo } from '~/supabase';

export async function loader({ request }: LoaderFunctionArgs) {
  const workspaceData = (await getWorkspaceInfo(request)) || {};
  return Response.json({ ...workspaceData });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const expenseTitle = formData.get('title') as string;
  const expensePrice = (formData.get('amount') as unknown) || 0;
  const expensePaidBy = formData.get('paid_by') as string;

  if (expenseTitle && expensePrice) {
    const status = await createExpenses(request, {
      title: expenseTitle,
      price: Number(expensePrice),
      paidBy: expensePaidBy,
    });

    if (status === 201) {
      return Response.json('Successfully added');
    }

    return Response.json(
      { error: 'Failed to do action, try again!' },
      {
        status: 400,
      }
    );
  }

  return Response.json('Fields are missing!', {
    status: 404,
  });
}

export default function Expenses() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <header className="mb-3 w-full px-6">
        <h1 className="text-3xl font-semibold">Expenses</h1>
      </header>
      <BeautifulTable onAddButtonClick={setIsOpen} />
      <AddExpensesModal isOpen={isOpen} onClose={onClose} onSubmit={() => {}} />
    </>
  );
}
