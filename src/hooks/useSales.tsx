import { useState, useMemo } from 'react';

export interface Sale {
  id: string;
  productName: string;
  customerName: string;
  date: string;
  amount: number;
  quantity: number;
  status: 'completed' | 'pending' | 'cancelled';
  image?: string;
}

export interface SalesStats {
  totalRevenue: number;
  totalSales: number;
  averageTicket: number;
  pendingSales: number;
}

const MOCK_SALES: Sale[] = [
  {
    id: '1',
    productName: 'Ração Premium Natural',
    customerName: 'Ana Silva',
    date: '2024-01-26',
    amount: 129.9,
    quantity: 1,
    status: 'completed',
    image: 'https://loremflickr.com/500/500/dog,food?lock=1',
  },
  {
    id: '2',
    productName: 'Biscoitos Naturais',
    customerName: 'Carlos Oliveira',
    date: '2024-01-26',
    amount: 31.8,
    quantity: 2,
    status: 'completed',
    image: 'https://loremflickr.com/500/500/dog,treats?lock=6',
  },
  {
    id: '3',
    productName: 'Arranhador para Gatos',
    customerName: 'Mariana Santos',
    date: '2024-01-25',
    amount: 120.0,
    quantity: 1,
    status: 'pending',
    image: 'https://loremflickr.com/500/500/cat,scratcher?lock=7',
  },
  {
    id: '4',
    productName: 'Comedouro Automático',
    customerName: 'Roberto Costa',
    date: '2024-01-25',
    amount: 250.0,
    quantity: 1,
    status: 'completed',
    image: 'https://loremflickr.com/500/500/pet,bowl?lock=9',
  },
  {
    id: '5',
    productName: 'Brinquedos Variados',
    customerName: 'Julia Lima',
    date: '2024-01-24',
    amount: 72.0,
    quantity: 2,
    status: 'cancelled',
    image: '/assets/images/Produtos/Background6.svg',
  },
];

export function useSales() {
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES);

  const stats = useMemo(() => {
    const totalRevenue = sales
      .filter((s) => s.status === 'completed')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalSales = sales.filter((s) => s.status === 'completed').length;
    const pendingSales = sales.filter((s) => s.status === 'pending').length;
    const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

    return {
      totalRevenue,
      totalSales,
      averageTicket,
      pendingSales,
    };
  }, [sales]);

  const addSale = (sale: Sale) => {
    setSales((prev) => [sale, ...prev]);
  };

  return { sales, stats, addSale };
}
