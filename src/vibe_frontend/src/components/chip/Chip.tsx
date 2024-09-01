import React from "react";
import styles from "./Chip.module.css";
import { Button } from "../ui/button";

interface ChipProps {
  label: string;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onClick }) => {
  return (
    <Button className={styles.chip} onClick={onClick}>
      <span className={styles.chipText}>{label}</span>
    </Button>
  );  
};

export default Chip;
