import Button from "@mui/material/Button";

type Props = {
  onClick: () => void;
  textButton: string;
};

export const AddUserButton: React.FC<Props> = ({ onClick, textButton }) => {
  return (
    <>
      <Button variant="outlined" onClick={onClick} style={{ marginTop: 30 }}>
        {textButton}
      </Button>
    </>
  );
};
