import { supabase } from '../../utils/dbConn.js';

export const getAllItems = async (req, res) => {
  try {
    console.log('recieved request');
    const { data, error } = await supabase
      .from('inventory')
      .select()
      .order('itemName', { ascending: true });

    if (!data) {
      console.log('Empty inventory');

      return res
        .status(400)
        .json({ message: 'There are no items in inventory right now' });
    }
    if (error) {
      console.log('Error, sending message back');
      return res.status(400).json({ error, message: error.message });
    }
    console.log('Success, sending data back');
    return res.status(200).json({ data, valid: true });
  } catch (error) {
    return res.status(400).send({ error, message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('inventory')
      .select()
      .eq('id', id); //

    if (!data || data.length === 0) {
      console.log('Item not found');
      return res
        .status(409)
        .json({ message: 'This item does not exist, please try another id.' });
    }
    if (error) {
      return res.status(400).json({ error, message: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error, message: error.message });
  }
};

export const getItemByName = async (req, res) => {
  try {
    const { itemName } = req.body;
    console.log(itemName);

    const { data, error } = await supabase
      .from('inventory')
      .select()
      .ilike('itemName', `%${itemName}%`)
      .order('itemName', { ascending: true });

    console.log('server-side log: ', data);

    if (!data || data.length === 0) {
      return res.status(400).send({
        message:
          'This item does not exist! Please check spelling or try another item',
      });
    }
    if (error) {
      return res.status(400).json({ error, message: error.message });
    }
    res.status(200).json({ data, valid: true });
  } catch (error) {
    res.status(400).json({ error, message: error.message });
  }
};

export const getFavouriteItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select()
      .eq('isFavourite', true);

    if (error) {
      return res.status(404).json({ error, message: error.message });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error, message: error.message });
  }
};
export const getItemLevels = async (req, res) => {
  try {
    const { data, error } = await supabase.from('inventory').select();

    const levels = [
      data.filter((item) => item.status === 'CRITICAL').length,
      data.filter((item) => item.status === 'SUFFICIENT').length,
      data.filter((item) => item.status === 'LOW').length,
    ];
    if (error) {
      return res.status(404).json({ error, message: error.message });
    }
    res.status(200).json({ levels });
  } catch (error) {
    res.status(400).json({ error, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    console.log('getting data');
    const { data, error } = await supabase
      .from('selections')
      .select('options')
      .eq('selectionValue', 'Category');

    console.log(data);
    if (error) {
      return res.status(404).json({ error, message: error.message });
    }
    res.status(200).json({ data });
  } catch (error) {
    return res.status(400).message({ error, message: error.message });
  }
};
