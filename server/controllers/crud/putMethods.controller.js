import { supabase } from '../../utils/dbConn.js';
import { transactionLogger } from '../transactions/transactionLogger.js';

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemName,
      quantity,
      purchasePrice,
      reorderPoint,
      storageLocation,
      category,
      status,
    } = req.body;

    console.log(itemName, quantity, purchasePrice);

    const { data, error } = await supabase
      .from('inventory')
      .update({
        itemName: itemName,
        quantity: quantity,
        purchasePrice: purchasePrice,
        status: status,
        reorderPoint: reorderPoint,
        status: status,
        storageLocation: storageLocation,
        category: category,
      })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
      if (error.code == '23505') {
        return res
          .status(409)
          .json({ error, message: 'An item with this name already exists' });
      }
      return res.status(400).json({ error, message: error.message });
    }
    console.log('about to run transactionLogger');
    await transactionLogger(data[0].id, itemName, 'Update Item', data[0]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const { data, error } = await supabase
      .from('selections')
      .update({ options: category })
      .eq('selectionId', id)
      .select();

    if (error) {
      return res.status(400).json({ error, message: error.message });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error, message: error.message });
  }
};
