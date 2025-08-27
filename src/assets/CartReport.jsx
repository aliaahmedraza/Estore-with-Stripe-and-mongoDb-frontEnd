import React, { Suspense } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import useCartStore from "../store/CartStore";

const PDFDownloadLink = React.lazy(() =>
  import("@react-pdf/renderer").then((mod) => ({
    default: mod.PDFDownloadLink,
  }))
);
const CartReportDocument = React.lazy(() => import("./CartReportDocument"));

const CartReport = () => {
  const { cartItems } = useCartStore();

  return (
    <Suspense fallback={<span>Loading PDF...</span>}>
      {cartItems.length > 0 ? (
        <PDFDownloadLink
          document={<CartReportDocument cartItems={cartItems} />}
          fileName="cart-report.pdf"
        >
          {({ loading }) =>
            loading ? (
              "Generating PDF..."
            ) : (
              <span className="border-1 border-gray-400 text-gray-600 font-bold flex px-4 py-2 rounded-md gap-x-0.5 hover:text-black">
                <>Report</> <AiFillFilePdf className="text-2xl" />
              </span>
            )
          }
        </PDFDownloadLink>
      ) : (
        <span className="border-1 border-gray-400 text-gray-400 font-bold flex px-4 py-2 rounded-md gap-x-0.5 cursor-not-allowed">
          <>Report</> <AiFillFilePdf className="text-2xl" />
        </span>
      )}
    </Suspense>
  );
};

export default CartReport;
