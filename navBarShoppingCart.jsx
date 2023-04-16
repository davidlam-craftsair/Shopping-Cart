var isDebug = true;
const emptyCartStatus = "Your cart is empty";

function App({ menuitems }) {
  // determine what state should we manage,
  // 1. current stock info 
  // 2. cart
  const [stock, setStock] = React.useState(menuitems);
  const [cart, setCart] = React.useState([]);
  const [cartStatus, setCartStatus] = React.useState(emptyCartStatus);
  const { Button } = ReactBootstrap;


  const getStockThatHasMinInventory = (stock) => {
    // filter out stock = 0
    const updatedStock = stock.filter(
      (item) => item.instock > 0
    )
    return updatedStock;
  }
  const getStockNameFromButton = (button) => button.value;
  // when stockButton is clicked, it means the user want to buy
  // this item, and so the inventory of this item would be decreased by 1
  // and move to shopping cart

  const getStockButtons = (stock) => {
    return getStockThatHasMinInventory(stock).map((item, index) => {
      return (
        <Button className="button_node"
          onClick={handleStockButtonClick}
          value={item.stockName} >
          {item.stockName}<br />{item.instock}
        </Button >
      )
    });
  }

  const getCartButtons = (cart) => {
    return cart.map((item) => {
      return (
        <div className="button_node"
          onClick={handleCartButtonClick}
          value={item.productName} >
          {item.productName} <br />{item.quantityPurchased}

        </div>
      )
    })
  }
  const handleCartButtonClick = (e) => {
    console.log("handleCartButtonClick is clicked");
  }

  const addToCart = (cart, productName) => {
    // add this new item by 1 if there is existing or new item
    let hasExisting = false;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productName == productName) {
        hasExisting = true;
        console.log("add to cart by 1 since it is existing");
        cart[i].quantityPurchased += 1;
      }
    }

    if (hasExisting === false) {
      cart.push({ productName: productName, quantityPurchased: 1 });
      console.log("add to cart by 1 since it is not existing");
    }
  }

  const handleStockButtonClick = (e) => {
    // update the stock with new stock inventory

    if (isDebug) {
      console.log("handleStockButtonClick is clicked");
      console.log(e)
      console.log(`value = ${e.target.value}`);

    }

    let stockNameBought = getStockNameFromButton(e.target);


    const newStock = [];
    for (let i = 0; i < stock.length; i++) {
      if (stockNameBought === stock[i].stockName) {
        stock[i].instock -= 1;
        addToCart(cart, stock[i].stockName);
      }
      newStock.push(stock[i]);
    }
    setStock(newStock);

    setCart([...cart]);
    // set cart status to empty
    if (cart.length > 0) {
      setCartStatus("");
    }
    else {
      setCartStatus(emptyCartStatus);
    }


  }

  // generate UI buttons
  const stockButtons = getStockButtons(stock);

  // 2) cart buttons, when first initialized, there is no
  const cartButtons = getCartButtons(cart);

  // return two sections, first section is products 
  // second section is current shopping cart
  return (
    <>
      <h1 className="section-title">Your Online Store</h1>
      <ul>{stockButtons}</ul>
      <h1 className="section-title">Your Shopping Cart</h1>
      <text className="cartStatus">{cartStatus}</text>
      <ul>{cartButtons}</ul>
    </>
  )
}

const menuItems = [
  { stockName: "peach", instock: 8 },
  { stockName: "pear", instock: 8 },
  { stockName: "orange", instock: 7 },
  { stockName: "apple", instock: 4 },
  { stockName: "banana", instock: 3 },
  { stockName: "watermelon", instock: 1 },

];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App menuitems={menuItems} />);
