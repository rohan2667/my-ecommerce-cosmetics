import { Link } from 'react-router-dom';

const RelatedProducts = ({ products }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-display font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-md font-semibold">{item.name}</h3>
              <p className="text-pink-600 font-bold">${item.price}</p>
            </div>+



            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
