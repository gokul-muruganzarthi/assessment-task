type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h4>{product.title}</h4>
      <p>₹{product.price}</p>
    </div>
  );
}
