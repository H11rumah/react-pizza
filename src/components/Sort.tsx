import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialState, setFilterParams, setSortBy } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

import qs from "qs";

const Sort: React.FC = () => {
    let [isHidden, setIsHidden] = useState(true);

    let sort = useRef<HTMLDivElement>(null);

    let sortBy = useSelector((state: RootState) => state.filter.sortBy);
    let dispatch = useDispatch();

    let sortFields = [
        { name: "rating", title: "популярности (возр.)" },
        { name: "-rating", title: "популярности (убыв.)" },
        { name: "price", title: "цене (возр.)" },
        { name: "-price", title: "цене (убыв.)" },
        { name: "title", title: "алфавиту (возр.)" },
        { name: "-title", title: "алфавиту (убыв.)" },
    ];

    function selectSortField(field: string) {
        dispatch(setSortBy(field));
        setIsHidden(!isHidden);
    }

    function clickSort(event: MouseEvent) {
        if (sort.current && !event.composedPath().includes(sort.current)) {
            setIsHidden(true);
        }
    }

    useEffect(() => {
        document.body.addEventListener("click", clickSort);

        return () => {
            document.body.removeEventListener("click", clickSort);
        };
    }, []);

    useEffect(() => {
        if (window.location.search) {
            let params: any = qs.parse(window.location.search.slice(1));

            if (
                params.sortBy &&
                sortFields.find((elem) => elem.name === params.sortBy) &&
                params.category &&
                +params.category &&
                +params.category >= 0 &&
                +params.category <= 5
            ) {
                dispatch(setFilterParams(params));
            } else {
                dispatch(
                    setFilterParams({
                        category: 0,
                        sortBy: "rating",
                    })
                );
            }
        }
    }, []);

    return (
        <div ref={sort} className="sort">
            <div className="sort__label">
                <b>
                    <svg
                        style={{ transform: isHidden ? "rotate(180deg)" : "" }}
                        width="10"
                        height="10"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    Сортировка по:
                </b>
                <span onClick={() => setIsHidden(!isHidden)}>
                    {sortFields[sortFields.findIndex((elem) => elem.name === sortBy)].title}
                </span>
            </div>
            {!isHidden && (
                <div className="sort__popup">
                    <ul>
                        {sortFields.map((elem, id) => {
                            return (
                                <li
                                    onClick={() => selectSortField(elem.name)}
                                    key={id}
                                    className={sortBy === elem.name ? "active" : ""}
                                >
                                    {elem.title}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
