import "../styles/Carousel.css";

const Carousel = ({ images }) => {
  // Create a duplicated array of images for infinite scrolling effect
  const duplicatedImages = [...images, ...images];

  return (
    <div className="carousel-container">
      <div className="train-track">
        <div className="train">
          {duplicatedImages.map((image, index) => (
            <div key={index} className="train-car">
              <img src={image} alt={`Logo ${index % images.length}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
