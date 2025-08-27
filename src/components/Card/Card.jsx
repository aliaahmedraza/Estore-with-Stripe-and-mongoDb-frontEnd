import React from "react";
import useCartStore from "../../store/CartStore";
import { Input } from "antd";
const Card = ({ props }) => {
  const { setProductId } = useCartStore();
//   const [search, setSearch] = React.useState("");

//   const filteredProducts = React.useMemo(() => {
//     if (!search.trim()) return props;
//     return props.filter((p) =>
//       p.title.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, props]);

  return (
    <div className="p-5">
      {/* <div className="mb-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ width: 250 }}
        />
      </div> */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {props.map((product) => {
          return (
            <div
              key={product.id}
              className="product-card bg-gray-100 p-4 rounded-lg"
              onClick={() => setProductId(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-72 w-80 object-contain mb-2"
              />
              <h2 className="font-bold">{product.title}</h2>
              <p className="product-price py-2">Price:{product.price}$</p>
              <p className={"product-description truncate-2-lines"}>
                <span className="text-blue-400 font-semibold">
                  Description:
                </span>
                {product.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
