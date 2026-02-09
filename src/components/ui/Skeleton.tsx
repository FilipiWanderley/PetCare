import styles from './Skeleton.module.css';
import clsx from 'clsx';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  borderRadius?: string | number;
}

export function Skeleton({ width, height, className, borderRadius }: SkeletonProps) {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}
