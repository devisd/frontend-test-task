import ListItem from "@mui/material/ListItem";

type Props = {
  title: string;
};

export const ListTitle: React.FC<Props> = ({ title }) => {
  return (
    <>
      <ListItem>
        <h3>{title}</h3>
      </ListItem>
    </>
  );
};
