import { Drink, DropdownProps } from "../Interfaces";
const Dropdown = (props: DropdownProps<Drink>) => {
  return (
    <ul className="dropdown-content rounded-none overflow-y-scroll max-h-48 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 shadow bg-base-100 w-[100%]">
      {props.isLoading && <p className="text-center">Загрузочка...</p>}
      {props.items?.map((item: Drink) => (
        <li
          className="py-2  px-2 hover:bg-slate-500"
          key={item.idDrink}
          onClick={() => props.onClick(item)}
        >
          {item.strDrink}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
