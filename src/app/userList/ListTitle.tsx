type Props = {
  title: string;
  className: string;
};

export const ListTitle: React.FC<Props> = ({ title, className }) => {
  return (
    <>
      <li>
        <h3 className={className}>{title}</h3>
      </li>
    </>
  );
};
