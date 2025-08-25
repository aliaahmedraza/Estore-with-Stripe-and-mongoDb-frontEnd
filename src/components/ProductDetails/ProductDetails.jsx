import React from "react";
import axios from "axios";
import useCartStore from "../../store/CartStore";
import { toast } from "react-toastify";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import ProductsList from "../Products/ProductsList";
import { SlArrowLeftCircle } from "react-icons/sl";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";

const ProductDetails = ({ productId }) => {
  const { addToCart, removeFromCart, cartItems } = useCartStore();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const orderQuantity = useCartStore((state) => state.getCartItemsQuantity());

  React.useEffect(() => {
    const fetchProductDeatils = async () => {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDeatils();
  }, []);

  const handleRemoveFromCart = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
    } else if (
      cartItems.length > 0 &&
      !cartItems.some((item) => item.id === product.id)
    ) {
      toast.error("Product not in cart");
    } else if (
      cartItems.some((item) => item.id === product.id && item.quantity >= 1)
    ) {
      removeFromCart(product.id);
      toast.info("Product removed from cart");
    }
  };

  const handleShowProductsList = () => setOpen(true);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">Error fetching products: {error}</p>;
  }

  return (
    <div>
      {open ? (
        <ProductsList />
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
            <strong>Product Details</strong>
          </h1>
          <div className="container p-5 bg-gray-100 rounded-lg pt-10">
            <button
              onClick={() => handleShowProductsList()}
              className="mb-4 font-bold underline"
            >
              <SlArrowLeftCircle className="inline-block mr-2 text-3xl font-bold" />
            </button>
            <div className="flex flex-col w-2/4 mx-auto p-4 ">
              <img
                src={product.image}
                alt={product.title}
                className="h-72 w-72 object-contain mb-2"
              />
              <h2 className="font-bold">{product.title}</h2>
              <p className="">Price: {product.price}$</p>
              <p className="">
                <span className="text-blue-400 font-semibold">
                  Description:{" "}
                </span>
                {product.description}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Product added to cart");
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded h-8"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleRemoveFromCart()}
                className="bg-red-500 text-white px-2 py-1 rounded h-8"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
