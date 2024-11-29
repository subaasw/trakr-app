import { FormEventHandler, memo, useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { CurrencyDollar, X } from '@phosphor-icons/react';
import classNames from '~/utils/classNames';
import Button from './ui/Button';
import { Input } from './ui/Input';
import { Dialog } from './ui/Dialog';
import BounceLoader from './Loader';

interface AddExpensesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; amount: number; paidBy: string[] }) => void;
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

const AddExpensesModal = ({ isOpen, onClose, onSubmit }: AddExpensesModalProps) => {
  const [paidUser, selectPaidUser] = useState<string>('');
  const fetcher = useFetcher();
  const isLoading = fetcher.state === 'loading';
  const isSubmitting = fetcher.state === 'submitting';

  const data: workspaceProps | unknown = fetcher.data;
  //@ts-ignore
  const members: { user_id: string; name: string }[] | null = data?.memberList;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (isLoading && isSubmitting) return null;

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append('paid_by', paidUser);
    fetcher.submit(formData, { method: 'post' });
  };

  useEffect(() => {
    if (isOpen) {
      fetcher.load('/dashboard/expenses');
    }
  }, [isOpen]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-frost-900/90 transition-colors duration-200 hover:bg-frost-100 hover:text-frost-900"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-2xl font-semibold text-frost-900">New Expenses</h2>
        <fetcher.Form method="post" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="text-gray-700 text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Enter expense title"
              required
              className="border-gray-300 ht-10 focus:border-blue-300 focus:ring-blue-200 mt-1 block w-full rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="amount" className="text-gray-700 text-sm font-medium">
              Amount
            </label>
            <div className="relative mt-1 rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <CurrencyDollar className="text-gray-400 h-5 w-5" />
              </div>
              <Input
                id="amount"
                type="number"
                name="amount"
                placeholder="0.00"
                required
                className="focus:border-blue-300 focus:ring-blue-200 block h-11 w-full rounded-md border-gray/90 pl-10 focus:ring focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-700 text-sm font-medium">Paid By</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {members &&
                members?.map((user) => (
                  <button
                    key={user.user_id}
                    type="button"
                    onClick={() => selectPaidUser(user.user_id)}
                    className={classNames(
                      'flex items-center space-x-2 rounded-full border px-3 py-1.5 transition-colors duration-200',
                      paidUser === user.user_id
                        ? 'border-twilight bg-twilight-light/5'
                        : 'border-frost-400 bg-white text-frost-900/70 hover:bg-frost-100/80'
                    )}
                  >
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" onClick={onClose} variant="outline" className="px-4 py-2">
              Cancel
            </Button>
            <Button
              type="submit"
              className={classNames(
                'bg-twilight-light px-4 py-2 text-white transition-colors duration-200 hover:bg-twilight/85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-twilight-light',
                isSubmitting ? 'bg-blossom' : ''
              )}
            >
              Add Transaction
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </Dialog>
  );
};

export default memo(AddExpensesModal);
