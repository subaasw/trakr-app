import { Plus, Funnel, CaretLeft, CaretRight, MagnifyingGlass, Trash, Pencil } from '@phosphor-icons/react';
import Button from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { mockTransactions, useExpensesData } from './hooks/useExpensesData';
import { useState, memo } from 'react';
// import { useTransactionData } from '@/hooks/useTransactionData';
// import { Avatar } from '@/components/ui/avatar';
// import { formatDate } from '@/lib/date-utils';
// import { formatCurrency } from '@/lib/currency-utils';

export function ExpensesTable() {
  const { transactions, currentPage, totalPages, setCurrentPage, searchTerm, setSearchTerm } = useExpensesData();

  return (
    <div className="w-full space-y-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <MagnifyingGlass className="text-gray-400 h-4 w-4" />
          </div>
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ring-gray-200 focus:ring-primary/50 rounded-xl border-0 bg-white/50 pl-10 ring-1 transition-all duration-300"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="hover:bg-primary/5 ring-gray-200 hover:ring-primary/50 group gap-2 border-0 ring-1 transition-all duration-300"
          >
            <Funnel className="group-hover:text-primary h-4 w-4 transition-colors" />
            Filter
          </Button>
          <Button className="bg-primary hover:bg-primary/90 hover:shadow-primary/20 group gap-2 shadow-lg transition-all duration-300">
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            Add New
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-gray-900 px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="text-gray-900 px-6 py-4 text-left text-sm font-semibold">Paid By</th>
                <th className="text-gray-900 px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="text-gray-900 px-6 py-4 text-right text-sm font-semibold">Amount</th>
                <th className="text-gray-900 px-6 py-4 text-right text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`hover:bg-primary/5 group cursor-pointer transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  <td className="text-gray-600 px-6 py-4 text-sm font-medium">{transaction.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="ring-primary/10 group-hover:ring-primary/30 h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 transition-all duration-300">
                        <img
                          src={transaction.paidBy.image}
                          alt={transaction.paidBy.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-gray-900 text-sm font-medium">{transaction.paidBy.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-900 px-6 py-4 text-sm">{transaction.title}</td>
                  <td className="text-gray-900 px-6 py-4 text-right text-sm font-semibold">transaction.amount</td>
                  <td className="text-gray-600 px-6 py-4 text-right text-sm">transaction.date</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="hover:bg-primary/5 ring-gray-200 hover:ring-primary/50 border-0 ring-1 transition-colors"
          >
            <CaretLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[2.5rem] transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-primary hover:bg-primary/90 hover:shadow-primary/20 shadow-lg'
                    : 'hover:bg-primary/5 ring-gray-200 hover:ring-primary/50 border-0 ring-1'
                }`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="hover:bg-primary/5 ring-gray-200 hover:ring-primary/50 border-0 ring-1 transition-colors"
          >
            <CaretRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}

interface TableData {
  id: number;
  paidBy: {
    name: string;
    image: string;
  };
  title: string;
  amount: number;
  date: string;
}

const data = mockTransactions;

interface ExpensesTableProps {
  onAddButtonClick: (value: boolean) => void;
}

const BeautifulTable = ({ onAddButtonClick }: ExpensesTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const itemsPerPage = 5;

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paidBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterOption === 'all' ||
      (filterOption === 'high' && item.amount >= 2000) ||
      (filterOption === 'low' && item.amount < 2000);
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6 rounded-xl bg-white p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <MagnifyingGlass className="text-gray-400 h-4 w-4" />
          </div>
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ring-gray-200 focus:ring-primary/50 h-9 rounded-xl border-0 bg-white/50 pl-10 ring-1 transition-all duration-300"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="group gap-2 border-0 ring-1 ring-frost-400 transition-all duration-300 hover:bg-twilight/5 hover:ring-twilight/50"
          >
            <Funnel className="group-hover:text-primary h-4 w-4 transition-colors" />
            Filter
          </Button>
          <Button
            onClick={() => onAddButtonClick(true)}
            className="group gap-2 bg-twilight/95 text-white shadow-lg transition-all duration-300 hover:bg-twilight/85 hover:shadow-twilight/10"
          >
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            Add New
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="text-gray-900 px-6 py-4 font-medium">
                ID
              </th>
              <th scope="col" className="text-gray-900 px-6 py-4 font-medium">
                Paid By
              </th>
              <th scope="col" className="text-gray-900 px-6 py-4 font-medium">
                Title
              </th>
              <th scope="col" className="text-gray-900 px-6 py-4 font-medium">
                Amount
              </th>
              <th scope="col" className="text-gray-900 px-6 py-4 font-medium">
                Date
              </th>
              <th scope="col" className="text-gray-900 px-6 py-4 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-gray-100 divide-y border-t border-gray">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-frost-100">
                <td className="text-gray-900 px-6 py-4 font-medium">{item.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img className="h-8 w-8 rounded-full" src={item.paidBy.image} alt={item.paidBy.name} />
                    <span>{item.paidBy.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">${item.amount.toFixed(2)}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      //   onClick={() => handleEdit(item.id)}
                      className="text-twilight-light hover:bg-twilight-light/10 hover:shadow-sm"
                    >
                      <Pencil size={20} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      //   onClick={() => handleDelete(item.id)}
                      className="text-blossom hover:bg-blossom-light/50 hover:shadow-sm"
                    >
                      <Trash size={20} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <p className="text-sm text-frost-900">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{' '}
          {filteredData.length} entries
        </p>
        <div className="flex space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="icon"
          >
            <CaretLeft className="h-4 w-4" />
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              className={`h-8 w-8 ${currentPage === i + 1 ? 'bg-twilight-light/85 text-white' : ''}`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="icon"
          >
            <CaretRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(BeautifulTable);
