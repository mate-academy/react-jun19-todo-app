import { Status } from '../types/Status';

type Props = {
  filter:string,
  setFilter: React.Dispatch<React.SetStateAction<Status>>
};

export const TodosFilter:React.FC<Props> = ({ filter, setFilter }) => {
  const changeFilterByStatusHandler = (statusVariant:Status) => {
    setFilter(statusVariant);
  };

  const filterVariants = Object.keys(Status) as Array<keyof typeof Status>;

  return (
    <ul className="filters" data-cy="todosFilter">
      {
        filterVariants.map((key) => {
          return (
            <li key={key}>
              <a
                href={`./#/${Status[key]}`}
                className={filter === Status[key] ? 'selected' : ''}
                onClick={() => changeFilterByStatusHandler(Status[key])}
              >
                {key}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};
