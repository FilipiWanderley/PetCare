import styles from './page.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      {/* Hero Skeleton */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent} style={{ width: '100%' }}>
            <div
              style={{
                height: '60px',
                width: '80%',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                animation: 'pulse 1.5s infinite',
              }}
            />
            <div
              style={{
                height: '24px',
                width: '60%',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                marginBottom: '2rem',
                animation: 'pulse 1.5s infinite',
              }}
            />
            <div
              style={{
                height: '48px',
                width: '160px',
                backgroundColor: '#f3f4f6',
                borderRadius: '9999px',
                animation: 'pulse 1.5s infinite',
              }}
            />
          </div>
          <div className={styles.heroImageWrapper} style={{ position: 'relative' }}>
            <div
              style={{
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                animation: 'pulse 1.5s infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* Services Skeleton */}
      <section style={{ width: '100%', maxWidth: '1200px', padding: '4rem 1rem' }}>
        <div
          style={{
            height: '40px',
            width: '200px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            margin: '0 auto 3rem',
            animation: 'pulse 1.5s infinite',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                height: '300px',
                backgroundColor: '#f3f4f6',
                borderRadius: '16px',
                animation: 'pulse 1.5s infinite',
              }}
            />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
