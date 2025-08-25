import CartReport from "../../assets/CartReport";
import useCartStore from "../../store/CartStore";
import { SlArrowLeftCircle } from "react-icons/sl";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, emptyCart } =
    useCartStore();
  const navigate = useNavigate();
  const totalPrice = useCartStore((state) => state.getCartItemsTotalPrice());

  return (
    <div className="container bg-gray-100 my-10 mx-auto p-5 flex flex-col items-center rounded-lg relative">
      <div className="flex flx-col justify-around w-full">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 font-bold flex w-full "
        >
          <SlArrowLeftCircle className="inline-block mr-2 text-3xl font-bold" />
        </button>
        <span className="font-bold pr-8">
          Total Price of Items: {totalPrice}$
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
                  className="bg-blue-400 text-white font-bold w-6 h-7 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-blue-400 text-white font-bold w-6 h-7 rounded "
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 h-7 text-white px-1 my-2 rounded"
              >
                Remove From Cart
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate("/payment")}
        disabled={cartItems.length === 0}
        className={`px-1 h-7 rounded text-white absolute bottom-[-36px] left-0
          ${
            cartItems.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#e97510] hover:bg-[#d4660e] cursor-pointer"
          }
        `}
      >
        Checkout
      </button>
      <button
        onClick={emptyCart}
        className="bg-red-500 text-white h-7 px-1 my-2 rounded absolute bottom-[-44px] left-20"
      >
        Empty Cart
      </button>
      <div className="absolute bottom-[-36px] right-0 ">
        <CartReport />
      </div>
    </div>
  );
};
export default Cart;
