import styles from './page.module.css';
import { getProducts } from '@/actions/product-actions';
import { ProductsGrid } from './ProductsGrid';

export default async function ProductsPage() {
  const { data: products } = await getProducts();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Nossos Produtos</h1>

      <ProductsGrid products={products || []} />
    </main>
  );
}
