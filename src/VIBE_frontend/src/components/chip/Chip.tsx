import React from 'react';
import styles from './Chip.module.css';

interface ChipProps {
  label: string;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onClick }) => {
  return (
    <button className={styles.chip} onClick={onClick}>
      <span className={styles.chipText}>{label}</span>
    </button>
  );
};

export default Chip;