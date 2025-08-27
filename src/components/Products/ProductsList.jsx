import React from "react";
import axios from "axios";
import "./ProductsList.css";
import ProductDetails from "../ProductDetails/ProductDetails";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import useCartStore from "../../store/CartStore";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { Input } from "antd";

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const orderQuantity = useCartStore((state) => state.getCartItemsQuantity());
  const { productId } = useCartStore();
  const [search, setSearch] = React.useState("");

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

  const filteredProducts = React.useMemo(() => {
    if (!search.trim()) return products;
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">Error fetching products: {error}</p>;
  }

  return (
    <div className="container mx-auto">
      {productId ? (
        <ProductDetails id={productId} />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
              Products List
            </h1>
            <div className="w-full sm:w-2/3 md:w-1/2">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-1">
              <Button
                text={
                  <>
                    <span className="text-2xl">🛒</span>
                    <span className="absolute -top-3 bg-[#e97510] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {orderQuantity}
                    </span>
                  </>
                }
                onClick={() => navigate("/cart")}
                properties="relative inline-flex items-center justify-center w-10 h-10"
              />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          <Card props={filteredProducts} />
        </>
      )}
    </div>
  );
};

export default ProductsList;
