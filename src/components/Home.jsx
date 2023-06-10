import React, { useEffect, useState } from "react";

const Home = () => {
  const [id, setId] = useState(0);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("data");
    if (localStorageData) {
      const dataFromLocalStorage = JSON.parse(localStorageData);
      setData(dataFromLocalStorage);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { id, amount, description };
    const newData = [...data, newItem];
    setData(newData);
    setTotalAmount(Number(totalAmount) + Number(amount));
    localStorage.setItem("data", JSON.stringify(newData));
    setId(0);
    setDescription("");
    setAmount(0);
  };
  const handleDelete = (id) => {
    const newItems = data.filter((item) => item.id !== id);
    setData(newItems);
    const amountToRemove = data.find(item => item.id === id).amount;
    setTotalAmount(Number(totalAmount) - Number(amountToRemove));
    const newData = data.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(newData));
  };
 
 

  return (
    <>
    <h1 className="font-bold text-4xl text-center mt-9 justify-between">Admin Product Details</h1>
      <form className="ml-12 flex-col mt-9 flex items-center justify-between" onSubmit={handleSubmit}>
        <label htmlFor="id" className="flex mt-4 items-center">
            
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700 ">
        Product Id
  </span>
  <input
        className="flex items-center mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  w-auto rounded-md sm:text-sm focus:ring-1"
          type="text"
          value={id}
          placeholder="Product Id"
          onChange={(e) => setId(e.target.value)}
        />
  </label>
        
        <label htmlFor="desc" className="flex mt-4 items-center">
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
        Product Name
  </span>
            
            
            <input
            className="flex items-center mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  w-auto rounded-md sm:text-sm focus:ring-1"
          type="text"
          value={description}
          placeholder="Product Name"
          onChange={(e) => setDescription(e.target.value)}
        />
            </label>
        
        <label htmlFor="amount" className="flex mt-4 items-center">
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-slate-700">
        Selling Price
  </span> 
        <input
        className="flex items-center mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  w-auto rounded-md sm:text-sm focus:ring-1"
          type="number"
          placeholder="Price"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />  
            </label>
       
        <button className=" text-center mt-10 rounded-full w-72 h-10 bg-sky-600 text-white">Add Product</button>
      </form>
    
    <div className="flex mt-2 flex-col items-center">
    {data.map((item, index) => (
            
            <ul className="">
                <li className="text-lg font-semibold">{item.description} {item.amount} <button className="text-white rounded-full w-[85px] mt-3 ml-2 h-[30px] bg-sky-600" onClick={() => handleDelete(item.id)}>Delete</button></li>
            </ul>
          
          ))}
    </div>
          

<h1 className="font-bold text-4xl text-center mt-9">Products</h1>
      <h4 className="font-bold mt-6 text-center">Total Value Worth of Products: Rs {totalAmount}</h4>
    </>
  );
};

export default Home;
