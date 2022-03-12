import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [input, setInput] = useState("")
  const [newItem, setNewItem] = useState("")
  const [category, setCategory] = useState("produce")
  
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const oldItemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const itemsToDisplay = oldItemsToDisplay.filter((item)=> item.name.toLowerCase().includes(input.toLowerCase()))
  
  function handleSearchChange(event){
    setInput(event.target.value)
    console.log(input)
  }
  
  function itemFormSubmit(e){
    e.preventDefault()
    const form = e.target.parentNode
    setNewItem(form.name.value)
    setCategory(form.category.value)
  }

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={itemFormSubmit} newItems={newItem} category={category}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
