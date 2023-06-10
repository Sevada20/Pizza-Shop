import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSort,
  setSortType,
  SortPropertyEnum,
} from "../redux/slices/filterSlice";

type ListItemType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const list: ListItemType[] = [
  { name: "популярности(DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности(ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене(DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене(ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту(DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту(ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];
const SortPopup: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const sortPopupRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  const onClickListItem = (obj: ListItemType) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!sortPopupRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={sortPopupRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      <div className="sort__popup">
        <ul>
          {open &&
            list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default SortPopup;
