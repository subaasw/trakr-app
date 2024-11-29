import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { createExpenses, getWorkspaceInfo } from '~/supabase';

interface inputProps {
  label: string;
  name?: string;
  type?: 'email' | 'text' | 'password' | 'number';
  placeholder?: string;
  className?: string;
}

type workspaceProps = {
  memberList: { user_id: string; name: string }[];
  user_id: string;
  workspace: {
    name: string;
    members: String[];
    workspace_id: string;
  };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const expenseTitle = formData.get('title') as string;
  const expensePrice = (formData.get('price') as unknown) || 0;
  const expensePaidBy = formData.get('paid_by') as string;

  if (expenseTitle && expensePrice) {
    const status = await createExpenses(request, { title: expenseTitle, price: Number(expensePrice), paidBy: expensePaidBy });

    if (status === 201) {
      return json('Successfully added');
    }

    return json('Failed to do action, try again!', {
      status: 400,
    });
  }

  return json('Fields are missing!', {
    status: 404,
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const workspaceData = await getWorkspaceInfo(request);
  return json({ ...workspaceData });
}

const InputField = ({ label, placeholder, name, type = 'text' }: inputProps) => {
  const inputRandomId = 'input-' + label.replaceAll(' ', '-').toLowerCase();

  return (
    <div className="space-y-2">
      <label
        className="text-foreground text-sm font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={inputRandomId}
      >
        {label}
      </label>
      <input
        className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/20 flex h-9 w-full rounded-lg border px-3 py-2 text-sm shadow-sm shadow-black/5 transition-shadow focus-visible:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        id={inputRandomId}
        name={name}
        type={type}
        placeholder={placeholder || label}
      />
    </div>
  );
};

export default function CreateExpensesPage() {
  const data: workspaceProps = useLoaderData();
  const members = data?.memberList || [];

  return (
    <Form method="post" className="max-w-96 space-y-4 rounded-sm bg-frost-200 px-8 py-10">
      <h1 className="text-3xl font-semibold">Create Expenses</h1>
      <InputField label="Title" name="title" placeholder="Enter the expenses title" />
      <InputField label="Price" name="price" type="number" placeholder="Enter price" />
      <div className="space-y-3">
        <p className='text-sm font-medium'>Paid By (optional)</p>
        <select className="block w-full px-4 py-2" name="paid_by" id="paid_by">
          {members.map((member) => {
            return (
              <option key={member.user_id} value={member.user_id}>
                {member.name}
              </option>
            );
          })}
        </select>
      </div>
      <button className="justify-self-end rounded-md bg-twilight px-5 py-2 font-medium text-white" type="submit">
        Add
      </button>
    </Form>
  );
}
