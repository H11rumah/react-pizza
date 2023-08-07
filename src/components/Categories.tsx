import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

const Categories: React.FC = () => {
    let categories = ["Всё", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

    let category = useSelector((state: RootState) => state.filter.category);
    let dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categories.map((elem, id) => {
                    return (
                        <li
                            onClick={() => {
                                dispatch(setCategory(id));
                            }}
                            className={category === id ? "active" : ""}
                            key={id}
                        >
                            {elem}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
