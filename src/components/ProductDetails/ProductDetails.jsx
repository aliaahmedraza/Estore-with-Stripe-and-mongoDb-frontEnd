import React from "react";
import axios from "axios";
import useCartStore from "../../store/CartStore";
import { toast } from "react-toastify";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import ProductsList from "../Products/ProductsList";
import { SlArrowLeftCircle } from "react-icons/sl";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

const ProductDetails = ({ id }) => {
  const { addToCart, removeFromCart, cartItems } = useCartStore();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const orderQuantity = useCartStore((state) => state.getCartItemsQuantity());
  const { productId, setProductId } = useCartStore();

  React.useEffect(() => {
    const fetchProductDeatils = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
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

  const handleShowProductsList = () => setProductId(null);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">Error fetching products: {error}</p>;
  }

  return (
    <div>
      {productId ? (
        <>
          <div className="flex justify-end items-center gap-1 pr-4 mt-10">
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
          <h1 className="flex justify-center text-4xl font-bold m-6">
            <strong>Product Details</strong>
          </h1>
          <div className="m-5 p-5 bg-gray-100 rounded-lg ">
            <Button
              text={
                <SlArrowLeftCircle className="inline-block mr-2 text-3xl font-bold" />
              }
              onClick={() => handleShowProductsList()}
              properties="mb-4 font-bold underline"
            />
            <div className="flex flex-col py-5 items-center">
              <div className="w-full flex justify-center items-center mb-5">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-72 w-72 object-contain mb-2"
                />
              </div>
              <div className="w-full md:w-[50%] mx-0 md:mx-auto flex flex-col gap-1">
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p>
                  Price: <span className="font-bold">{product.price}$</span>
                </p>
                <p className="">
                  <span className="text-blue-400 font-semibold">
                    Description:{" "}
                  </span>
                  {product.description}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button
                text="Add to Cart"
                onClick={() => {
                  addToCart(product);
                  toast.success("Product added to cart");
                }}
                properties="bg-blue-500 text-white "
              />
              <Button
                text="Remove from Cart"
                onClick={() => handleRemoveFromCart()}
                properties="bg-red-500 text-white"
              />
            </div>
          </div>
        </>
      ) : (
        <ProductsList />
      )}
    </div>
  );
};

export default ProductDetails;
