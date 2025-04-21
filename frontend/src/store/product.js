import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createNewProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please fill in all fields.' };
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: 'Create product successfully' };
    } catch (error) {
      console.error('Got error :', error.message);
      return { success: false, message: 'Create product failed' };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error('Got error :', error.message);
      return { success: false, message: 'Fetch products failed' };
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success)
        return { success: false, message: 'Delete product failed' };
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: 'Delete product successfully' };
    } catch (error) {
      console.error('Got error :', error.message);
      return { success: false, message: 'Delete product failed' };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
        const res = await fetch(`/api/products/${pid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success)
          return { success: false, message: 'Update product failed' };
        set((state) => ({
          products: state.products.map((product) => product._id === pid ? data.data : product),
        }));
        return { success: true, message: 'Update product successfully' };
      } catch (error) {
        console.error('Got error :', error.message);
        return { success: false, message: 'Update product failed' };
      }
  }
}));
