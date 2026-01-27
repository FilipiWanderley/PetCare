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
    productName: 'Brit Premium Pet Food',
    customerName: 'Ana Silva',
    date: '2024-01-26',
    amount: 120.00,
    quantity: 1,
    status: 'completed',
    image: '/assets/images/Produtos/Background1.svg'
  },
  {
    id: '2',
    productName: 'Petiscos para gatos',
    customerName: 'Carlos Oliveira',
    date: '2024-01-26',
    amount: 24.00,
    quantity: 2,
    status: 'completed',
    image: '/assets/images/Produtos/Background2.svg'
  },
  {
    id: '3',
    productName: 'Nutrição exclusiva',
    customerName: 'Mariana Santos',
    date: '2024-01-25',
    amount: 88.00,
    quantity: 1,
    status: 'pending',
    image: '/assets/images/Produtos/Background3.svg'
  },
  {
    id: '4',
    productName: 'Ração Ocean Treats',
    customerName: 'Roberto Costa',
    date: '2024-01-25',
    amount: 250.00,
    quantity: 1,
    status: 'completed',
    image: '/assets/images/Produtos/Background5.svg'
  },
  {
    id: '5',
    productName: 'Brinquedos Variados',
    customerName: 'Julia Lima',
    date: '2024-01-24',
    amount: 72.00,
    quantity: 2,
    status: 'cancelled',
    image: '/assets/images/Produtos/Background6.svg'
  }
];

export function useSales() {
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES);

  const stats = useMemo(() => {
    const totalRevenue = sales
      .filter(s => s.status === 'completed')
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    const totalSales = sales.filter(s => s.status === 'completed').length;
    const pendingSales = sales.filter(s => s.status === 'pending').length;
    const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

    return {
      totalRevenue,
      totalSales,
      averageTicket,
      pendingSales
    };
  }, [sales]);

  const addSale = (sale: Sale) => {
    setSales(prev => [sale, ...prev]);
  };

  return { sales, stats, addSale };
}
