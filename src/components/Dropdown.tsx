import { Drink, DropdownProps } from "../Interfaces";
import { HOME_PAGE_ACTIONS } from "../pages/HomePage";

const Dropdown = (props: DropdownProps) => {
    if (!props.isVisible) {
        return <></>;
    }
    return (
        <ul className="dropdown-content w-full rounded-none overflow-y-scroll max-h-48 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 shadow bg-base-100">
            {props.isLoading && <p className="text-center">Загрузочка...</p>}
            {props.items?.map((item: Drink) => (
                <li
                    className="py-2  px-2 hover:bg-gray-500 hover:text-gray-100"
                    key={item.idDrink}
                    onClick={() => {
                        props.dispatch({
                            type: HOME_PAGE_ACTIONS.SET_COCKTAIL,
                            payload: item,
                        });
                    }}
                >
                    {item.strDrink}
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
