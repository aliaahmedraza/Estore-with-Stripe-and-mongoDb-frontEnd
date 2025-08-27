import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import useCartStore from "../store/CartStore";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    border: "1 solid black",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid black",
    padding: 5,
    breakInside: "avoid",
  },
  tableColHeader: {
    width: "33%",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "33%",
    padding: 5,
  },
  total: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "right",
    fontWeight: "bold",
  },
});

const CartReportDocument = ({ cartItems }) => {
  if (cartItems.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No items in cart</Text>
        </Page>
      </Document>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Cart Report</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Item</Text>
            <Text style={styles.tableColHeader}>Quantity</Text>
            <Text style={styles.tableColHeader}>Price</Text>
            <Text style={styles.tableColHeader}>Picture</Text>
          </View>

          {cartItems.map((item, i) => (
            <View key={i} style={styles.tableRow} wrap={false}>
              <Text style={styles.tableCol}>{item.title}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>${item.price}</Text>
              <View style={styles.tableCol}>
                <Image
                  src={item.image}
                  alt={item.title}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Total Bill: ${total.toFixed(2)}</Text>
      </Page>
    </Document>
  );
};

const CartReport = () => {
  const { cartItems } = useCartStore();

  return cartItems.length > 0 ? (
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
  );
};

export default CartReport;
