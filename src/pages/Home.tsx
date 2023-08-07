import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import qs from "qs";

import Categories from "../components/Categories";
import ProductBlock from "../components/ProductBlock";
import Sort from "../components/Sort";
import ProductSkeleton from "../components/ProductSkeleton";

import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

const Home = () => {
    let products = useSelector((state: RootState) => state.pizza.items);
    let loadingStatus = useSelector((state: RootState) => state.pizza.status);

    let sortBy = useSelector((state: RootState) => state.filter.sortBy);
    let category = useSelector((state: RootState) => state.filter.category);

    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    useEffect(() => {
        let queryString = qs.stringify({
            category: category,
            sortBy: sortBy,
        });

        navigate(`?${queryString}`);
    }, [category, sortBy]);

    useEffect(() => {
        dispatch(fetchPizzas({ category, sortBy }));

        window.scrollTo(0, 0);
    }, [category, sortBy]);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <div className="content__items">
                {loadingStatus === "loading" ? (
                    new Array(6).fill("").map((elem, id) => {
                        return <ProductSkeleton key={id} />;
                    })
                ) : loadingStatus === "success" ? (
                    products.map((elem: any) => {
                        return <ProductBlock {...elem} key={elem.id} />;
                    })
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <h2>Произошла ошибка</h2>
                        <p>Повторите попытку позже</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
