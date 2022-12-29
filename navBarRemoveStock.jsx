// remove any item from navbar with less than min stock
// write out both the name and the number
function NavBar({ menuitems, minStock }) {
  // loop through all menuitems and build a ol 
  // rather than using loop use map  
  const filtered = menuitems.filter((item) => item.inStock > minStock);
  console.log(filtered);
  const updatedList = filtered.map((item, index) => {
    return <li key={index}>item name is {item.name} stock quantity = {item.inStock}</li>
  })

  return <ul>{updatedList}</ul>
}

const menuItems = [
  { name: 'peach', inStock: 2 },
  { name: 'pear', inStock: 3 },
  { name: 'orange', inStock: 0 },
  { name: 'apple', inStock: 3 },
  { name: 'banana', inStock: 3 }
];




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NavBar menuitems={menuItems} minStock={2} />);
