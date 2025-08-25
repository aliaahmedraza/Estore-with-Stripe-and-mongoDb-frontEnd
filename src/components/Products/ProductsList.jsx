import React from "react";
import axios from "axios";
import "./ProductsList.css";
import ProductDetails from "../ProductDetails/ProductDetails";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import useCartStore from "../../store/CartStore";
import Loader from "../Loader/Loader";

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [productId, setProductId] = React.useState(null);
  const orderQuantity = useCartStore((state) => state.getCartItemsQuantity());

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">Error fetching products: {error}</p>;
  }

  return (
    <div className="container mx-auto">
      {productId ? (
        <ProductDetails productId={productId} />
      ) : (
        <>
          <span className="flex justify-end items-center gap-2 mt-10 pr-4">
            <SignedIn>
              <UserButton />
            </SignedIn>

            <button
              onClick={() => navigate("/cart")}
              className="relative inline-flex items-center justify-center w-10 h-10"
              aria-label="Open cart"
            >
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-3 bg-[#e97510] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {orderQuantity}
              </span>
            </button>
          </span>
          <h1 className="flex justify-center text-4xl font-bold m-6">
            Products List
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => {
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
        </>
      )}
    </div>
  );
};

export default ProductsList;
