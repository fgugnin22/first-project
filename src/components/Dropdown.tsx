import { Drink, DropdownProps } from "../Interfaces";
import { useTransition, animated } from "react-spring";

const Dropdown = (props: DropdownProps<Drink>) => {
  const transition = useTransition(props.isVisible, {
    from: { opacity: 1 },
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
// {transition((style, item) => {
//   return item ? (
//     <animated.ul
//       style={style}
//       onMouseLeave={() => {
//         return dispatch({
//           type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
//           payload: false,
//         });
//       }}
//       onMouseEnter={() =>
//         dispatch({
//           type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
//           payload: true,
//         })
//       }
//       className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white"
//     >
//       {(isLoading || isFetching) && (
//         <p className="text-center">Загрузочка...</p>
//       )}
//       {itemssByName?.drinks?.map((items: Drink) => (
//         <li
//           key={items.idDrink}
//           onClick={() => dropdownClickHandler(items)}
//           className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
//         >
//           {items.strDrink}
//         </li>
//       ))}
//     </animated.ul>
//   ) : (
//     ""
//   );
// })}
