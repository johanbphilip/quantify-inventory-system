import { supabase } from '../../utils/dbConn.js';
import { transactionLogger } from '../transactions/transactionLogger.js';

export const createNewItem = async (req, res) => {
  try {
    const {
      itemName,
      quantity,
      purchasePrice,
      reorderPoint,
      category,
      storageLocation,
      status,
      isFavourite,
    } = req.body;

    const { data, error } = await supabase
      .from('inventory')
      .insert({
        itemName: itemName,
        quantity: quantity,
        purchasePrice: purchasePrice,
        status: status,
        reorderPoint: reorderPoint,
        category: category,
        storageLocation: storageLocation,
        isFavourite: isFavourite,
      })
      .select('*');
    console.log(data);

    if (error) {
      console.log(error);
      if (error.code == '23505') {
        return res
          .status(409)
          .json({ error, message: 'An item with this name already exists' });
      }
      return res.status(400).json({ error });
    }

    console.log(data);
    await transactionLogger(data[0].id, itemName, 'Add Item', null);
    return res.status(201).json({
      data,
      success: true,
      message: `Item added to inventory successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
