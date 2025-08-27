import CartReport from "../../assets/CartReport";
import Button from "../../components/Button/Button";
import useCartStore from "../../store/CartStore";
import { SlArrowLeftCircle } from "react-icons/sl";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, emptyCart } =
    useCartStore();
  const navigate = useNavigate();
  const totalPrice = useCartStore((state) => state.getCartItemsTotalPrice());

  return (
    <div className="bg-gray-100 my-10 mx-5 sm:mx-10 md:mx-20 p-3 sm:p-5 flex flex-col items-center rounded-lg relative">
      <div className="flex flx-col justify-around w-full">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 font-bold flex w-full "
        >
          <SlArrowLeftCircle className="inline-block mr-2 text-3xl font-bold" />
        </button>
        <span className="flex justify-end items-start w-full gap-1">
          Total Bill: <span className="font-bold"> {totalPrice}$</span>
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-2"> Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-50 object-contain"
              />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <h3 className="text-lg font-bold">Price: {item.price}$</h3>
              <div className="flex gap-2">
                <p className="text-lg font-bold">Qty: {item.quantity}</p>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-blue-400 text-white font-bold text-lg px-2 rounded-md"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-blue-400 text-white font-bold px-1.75 rounded-md "
                >
                  +
                </button>
              </div>
              <Button
                text="Remove"
                onClick={() => removeFromCart(item.id)}
                properties="bg-red-500  text-white mt-2"
              />
            </div>
          ))}
        </div>
      )}
      <Button
        text="Checkout"
        onClick={() => navigate("/payment")}
        disabled={cartItems.length === 0}
        properties={`text-white absolute bottom-[-44px] left-0
          ${
            cartItems.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#e97510] hover:bg-[#d4660e] cursor-pointer"
          }
        `}
      />
      <Button
        text="Empty Cart"
        onClick={emptyCart}
        properties="bg-red-500 text-white absolute bottom-[-44px] left-26"
      />
      <div className="absolute bottom-[-46px] right-0 ">
        <CartReport />
      </div>
    </div>
  );
};
export default Cart;
