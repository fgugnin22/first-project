import { Drink, DropdownProps } from "../Interfaces";
import { useTransition, animated } from "react-spring";

const Dropdown = (props: DropdownProps<Drink>) => {
  const transition = useTransition(props.isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {transition((style, item) => {
        return item ? (
          <animated.ul
            style={style}
            className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white"
          >
            {props.isLoading && <p className="text-center">Загрузочка...</p>}
            {props.items?.map((item: Drink) => (
              <li
                key={item.idDrink}
                onClick={() => props.onClick(item)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {item.strDrink}
              </li>
            ))}
          </animated.ul>
        ) : (
          ""
        );
      })}
    </>
  );
};

export default Dropdown;