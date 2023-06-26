import Button from "@mui/material/Button";

import styles from "../../..//assets/styles/Buttons.module.css";

type Props = {
  onClick: () => void;
  textButton: string;
};

export const AddUserButton: React.FC<Props> = ({ onClick, textButton }) => {
  return (
    <div className={styles.buttons__add}>
      <Button variant="outlined" onClick={onClick}>
        {textButton}
      </Button>
    </div>
  );
};
