import { useState } from 'react';
import { AddItem } from '../components/AddItem';
import CategorySelector from '../components/CategorySelector';
import { UseGetCategories } from '../hooks/UseGetCategories';
import { redirect } from 'react-router';

export const AddItemPage = () => {
  const { categories: tempCategories, updateCategories } = UseGetCategories();
  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [reorderPoint, setReorderPoint] = useState(0);
  const [category, setCategory] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    purchasePrice: '',
    quantity: '',
    reorderPoint: '',
    category: '',
    storageLocation: '',
  });
  const newErrors = {
    name: '',
    purchasePrice: '',
    quantity: '',
    reorderPoint: '',
    category: '',
    storageLocation: '',
  };

  const digitRegex = /^[0-9]+$/;
  const priceRegex = /^\d+(\.\d+)?$/;

  // validate inputs

  const validate = () => {
    let valid = true;

    if (!name) {
      newErrors.name = 'Item name is required.';
      valid = false;
    }
    if (!purchasePrice) {
      newErrors.purchasePrice = 'The purchase price of the item is required.';
      valid = false;
    } else if (!priceRegex.test(purchasePrice)) {
      newErrors.purchasePrice = 'Please ensure the value is a number';
      valid = false;
    }
    if (!quantity && quantity !== 0) {
      newErrors.quantity = 'The quantity of the item is required.';
      valid = false;
    } else if (!digitRegex.test(quantity)) {
      newErrors.quantity = 'Please ensure the value is a whole number';
      valid = false;
    }

    if (!reorderPoint) {
      newErrors.reorderPoint = 'The reorder point of the item is required.';
      valid = false;
    } else if (!digitRegex.test(reorderPoint)) {
      newErrors.quantity = 'Please ensure the value is a whole number';
      valid = false;
    }
    if (!storageLocation) {
      newErrors.storageLocation =
        'Please enter a storage location for the item.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleAddItem = async () => {
    console.log('first log from handleAddItem');
    setIsLoading(true);
    if (!validate()) {
      console.log('Error with adding new item');
      setIsLoading(false);
      return;
    }

    // update categories by adding the category to existing categories if it doesn't exist using .includes
    updateCategories(category);

    // create new item
    try {
      const { data } = await server.post('/api/item/', {
        itemName,
        quantity,
        purchasePrice,
        reorderPoint,
        storageLocation,
        status: 'SUFFICIENT',
        statusColor,
        category,
      });
      console.log(data);
    } catch (error) {
      setTotalError(error.response?.data?.message);
      console.log('Log from handleAddItem:', error);
      console.log(error);
      setTotalError('');
    } finally {
      setIsLoading(false);
      redirect('/dashboard');
    }

    // show success message
    // redirect to dashboard page
  };
  return (
    <main className="flex flex-col p-4">
      <div className="flex flex-col">
        <h1 className="font-primary text-5xl font-semibold">Add Item</h1>
        <p className="text-quantGray">Add an item to your inventory here.</p>
      </div>
      <div className="bg-gray-100 h-full w-full mt-4 rounded-md p-4">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleAddItem}
        >
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-quantDark text-sm" htmlFor="item-name">
                Item Name
              </label>
              <input
                className="p-2 w-full rounded-md bg-white placeholder:font-light focus:outline-2  required:invalid:outline-red-500 focus:outline-quantHighlight required:invalid:"
                type="text"
                id="item-name"
                name="item-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-red-500 text-sm">{newErrors.name}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-quantDark text-sm"
                htmlFor="purchase-price"
              >
                Purchase Price
              </label>
              <input
                className="p-2 w-full rounded-md bg-white placeholder:font-light focus:outline-2 focus:outline-quantHighlight"
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
              <p className="text-red-500 text-sm">{newErrors.purchasePrice}</p>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-quantDark text-sm" htmlFor="item-quantity">
                Item Quantity
              </label>
              <input
                className="rounded-md p-2 required:invalid:outline-red-500"
                type="number"
                id="item-quantity"
                name="item-quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <p className="text-red-500 text-sm">{newErrors.quantity}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-quantDark text-sm" htmlFor="reorder-point">
                Reorder Point
              </label>
              <input
                className="rounded-md p-2 focus:outline-quantHighlight"
                type="number"
                id="reorder-point"
                name="reorder-point"
                value={reorderPoint}
                onChange={(e) => setReorderPoint(e.target.value)}
              />
              <p className="text-red-500 text-sm">{newErrors.reorderPoint}</p>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-quantDark text-sm" htmlFor="item-category">
                Item Category
              </label>
              {tempCategories && tempCategories.length >= 1 && (
                <CategorySelector
                  tempCategories={tempCategories}
                  setCategory={setCategory}
                  value={category}
                  onChange={setCategory}
                />
              )}
              <p className="text-red-500 text-sm">{newErrors.category}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                className="text-quantDark text-sm"
                htmlFor="storage-location"
              >
                Storage Location
              </label>
              <select
                className="rounded-md p-2 focus:outline-quantHighlight"
                id="storage-location"
                name="storage-location"
              >
                <option value=""></option>
                <option value="FOOD">Food</option>
                <option value="DRINK">Drink</option>
              </select>
              <p className="text-red-500 text-sm">
                {newErrors.storageLocation}
              </p>
            </div>
            <div className="flex gap-4 w-full items-center">
              <label className="peer" htmlFor="favourite-checkbox">
                Favourite?
              </label>
              <input
                type="checkbox"
                className="size-4 appearance-none bg-white border border-gray-700 rounded cursor-pointer checked:bg-purple-600 checked:border-purple-600 "
                name="favourite-checkbox"
                id="favourite-checkbox"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full justify-end">
            <button className="border border-quantHighlight text-quantHighlight rounded-md py-2 px-4 bg-white">
              Cancel
            </button>

            <button
              className="bg-quantHighlight text-white rounded-md py-2 px-4"
              type="submit"
              onClick={handleAddItem}
              disabled={isLoading}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        <AddItem />
      </div> */}
    </main>
  );
};
