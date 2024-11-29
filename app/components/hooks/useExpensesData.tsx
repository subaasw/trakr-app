import { useState, useMemo } from 'react';
import { ExpensesData } from '~/types/expenses';

const ITEMS_PER_PAGE = 5;

export const mockTransactions: ExpensesData[] = [
  {
    id: 'TR-001',
    paidBy: {
      name: 'Sarah Wilson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    title: 'Website Design Project',
    amount: 2500.0,
    date: '2024-03-15',
  },
  {
    id: 'TR-002',
    paidBy: {
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    title: 'Marketing Campaign',
    amount: 1800.5,
    date: '2024-03-14',
  },
  {
    id: 'TR-003',
    paidBy: {
      name: 'Emily Rodriguez',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    title: 'Software Development',
    amount: 3200.0,
    date: '2024-03-13',
  },
  {
    id: 'TR-004',
    paidBy: {
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    title: 'UI/UX Consultation',
    amount: 950.75,
    date: '2024-03-12',
  },
  {
    id: 'TR-005',
    paidBy: {
      name: 'Lisa Thompson',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    },
    title: 'Content Creation',
    amount: 1250.0,
    date: '2024-03-11',
  },
  {
    id: 'TR-006',
    paidBy: {
      name: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    title: 'SEO Optimization',
    amount: 1600.25,
    date: '2024-03-10',
  },
];

export function useExpensesData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(
      (transaction) =>
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.paidBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const transactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, end);
  }, [currentPage, filteredTransactions]);

  return {
    transactions,
    currentPage,
    totalPages,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
  };
}
