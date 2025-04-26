import  { useState, useEffect } from 'react';
import { 
  Package, 
  PlusCircle, 
  Edit, 
  Trash2,
  
} from 'lucide-react';

const ProductCatalog = () => {
 
  const [activeSubTab, setActiveSubTab] = useState('product-list');
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([
    { 
      id: '1', 
      name: 'Royal Pashmina Shawl', 
      category: 'Textiles', 
      description: 'Hand-woven pure Kashmiri pashmina with intricate Sozni embroidery',
      price: 125000,
      status: 'Available'
    },
    { 
      id: '2', 
      name: 'Walnut Wood Master Carving', 
      category: 'Woodwork', 
      description: 'Exquisite hand-carved walnut wood panel with traditional Kashmiri motifs',
      price: 85000,
      status: 'Auction Ready'
    },
    { 
      id: '3', 
      name: 'Silver Samavar Set', 
      category: 'Metalcraft', 
      description: 'Traditional Kashmiri tea pot with fine silver engravings and detailed craftsmanship',
      price: 110000,
      status: 'Available'
    }
  ]);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Delete product
  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Tab navigation
  const renderTabs = () => (
    <div className="overflow-x-auto pb-2">
      <div className={`flex border-b border-gray-700 mb-6 ${isMobile ? 'w-max' : ''}`}>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'product-list' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveSubTab('product-list')}
        >
          Product Catalog
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'add-product' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveSubTab('add-product')}
        >
          Add New Product
        </button>
      </div>
    </div>
  );

  // Product list display
  const renderProductList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div 
          key={product.id} 
          className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
        >
          <div className="h-48 bg-gray-700 flex items-center justify-center">
            <Package size={64} className="text-gray-500" />
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-white">{product.name}</h3>
              <div className={`px-2 py-1 rounded-full text-xs ${
                product.status === 'Available' 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-indigo-900 text-indigo-300'
              }`}>
                {product.status}
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-3">{product.category}</p>
            <p className="text-gray-300 text-sm mb-4">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">₹{product.price.toLocaleString()}</span>
              
              <div className="flex space-x-2">
                <button 
                  className="p-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600"
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="p-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800"
                  onClick={() => deleteProduct(product.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Add Product Card */}
      <div 
        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 flex items-center justify-center cursor-pointer"
        onClick={() => setActiveSubTab('add-product')}
      >
        <div className="text-center p-8">
          <div className="flex justify-center mb-4">
            <PlusCircle size={48} className="text-indigo-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Add New Product</h3>
          <p className="text-gray-400 text-sm">Showcase your latest creation</p>
        </div>
      </div>
    </div>
  );

  // Product form for adding/editing
  const renderProductForm = () => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-medium mb-6 text-white">Add New Product</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Product Name</label>
          <input 
            type="text" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="Enter product name"
          />
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-2">Category</label>
          <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white">
            <option>Textiles</option>
            <option>Woodwork</option>
            <option>Metalcraft</option>
            <option>Ceramics</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-32"
            placeholder="Describe your product in detail..."
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Price (₹)</label>
            <input 
              type="number" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              placeholder="Enter price"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Status</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white">
              <option>Available</option>
              <option>Auction Ready</option>
              <option>Sold</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">SKU</label>
            <input 
              type="text" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              placeholder="Enter SKU"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Item Condition</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white">
              <option>New/Artisan Fresh</option>
              <option>Archival Quality </option>
              <option>Aged Patina</option>
              <option>Authenticated</option>
              <option>Master Crafted</option>
              <option>Exhibition Piece</option>
              <option>Workshop Original</option>
              <option>Commissioned Work</option>
              <option>Limited Edition</option>
              <option>Heritage Piece</option>
              <option>Restored</option>
              <option>Demonstration Piece</option>
              <option>Apprentice Work</option>
              <option>Seasonal Creation</option>
              <option>Antique Original</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 p-4 border border-dashed border-gray-600 rounded-lg text-center">
          <div className="flex flex-col items-center">
            <Package size={36} className="text-gray-500 mb-2" />
            <p className="text-gray-300 text-sm">Click to upload product images</p>
            <p className="text-gray-500 text-xs mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-6">
          <button 
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
            onClick={() => setActiveSubTab('product-list')}
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <><div className="flex h-screen bg-gray-900 text-gray-200 relative">
          
          <div className={`flex-1`}>
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Product Catalog</h2>
            <p className="text-gray-400 mt-1">Manage and showcase your exquisite Kashmiri crafts</p>
          </div>
          
        
          {renderTabs()}
          
         
          {activeSubTab === 'product-list' ? renderProductList() : renderProductForm()}
        </main>
      </div>
    </div>
    </>
  );
};

export default ProductCatalog;