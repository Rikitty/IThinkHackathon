import React from 'react';
import styles from './Chip.module.css';

interface ChipProps {
  label: string;
}

const Chip: React.FC<ChipProps> = ({ label }) => {
  return (
    <div className={styles.chip}>
      <span className={styles.chipText}>{label}</span>
    </div>
  );
};

export default Chip;