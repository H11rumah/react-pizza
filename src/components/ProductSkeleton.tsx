import React from "react";
import ContentLoader from "react-content-loader";

const ProductSkeleton: React.FC = () => {
    return (
        <ContentLoader className="pizza-block" speed={2} width={280} height={466} viewBox="0 0 280 466" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <circle cx="140" cy="130" r="130" />
            <rect x="0" y="277" rx="4" ry="4" width="280" height="17" />
            <rect x="1" y="315" rx="14" ry="14" width="280" height="75" />
            <rect x="128" y="408" rx="20" ry="20" width="152" height="45" />
            <rect x="0" y="420" rx="10" ry="10" width="90" height="27" />
        </ContentLoader>
    );
};

export default ProductSkeleton;
