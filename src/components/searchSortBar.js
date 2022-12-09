import React, { useState } from "react";

function SearchSortBar(props) {
  let sortOptions = ["Name", "Cost", "Quantity"];

  const [check, setCheck] = useState('');
  const [displayOrder, setDisplayOrder] = useState('Descending');
  const [serachText, setSearchText] = useState('');

  var handleChange = (event) => {
    setCheck(event.target.value);
    props.handleClicks({
      text: serachText,
      sortType: event.target.value,
      order: displayOrder
    });
  };

  const handleSearchInput = (e)=> {
    setSearchText(e.target.value);
    props.handleClicks({
      text: e.target.value,
      sortType: check,
      order: displayOrder
    });
  }

  const changeDisplayOrder = (e)=>{
    let order = displayOrder === 'Descending'? 'Ascending' : 'Descending';
    setDisplayOrder(order);
    props.handleClicks({
      text: serachText,
      sortType: check,
      order: order
    });
  }


  return (
    <div className="search-sort-bar">
      <input
        className="input-search"
        type={"text"}
        placeholder="Filter by Text" value={serachText}
        onChange={handleSearchInput}
      />
      <div className="sort-bar">
        <label>Sort by</label>
        {sortOptions.map((option) => (
          <label key={option}>
            <input onChange={handleChange} type="radio" checked= {check === option} value={option} />
            {option}
          </label>
        ))}
      </div>
      <button className="change-des" onClick={changeDisplayOrder} value={displayOrder}>Change to {displayOrder}</button>
    </div>
  );
}

export default SearchSortBar;
