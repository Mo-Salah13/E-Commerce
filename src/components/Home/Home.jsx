import axios from 'axios';
import Product from '../Product/Product';
import sliderImage1 from '../../Assets/images/slider-image-3.jpeg'
import sliderImage2 from '../../Assets/images/slider-image-2.jpeg'
import sliderImage3 from '../../Assets/images/grocery-banner-2.jpeg'
import sliderImage4 from '../../Assets/images/slider-2.jpeg'
import sliderImage5 from '../../Assets/images/grocery-banner.png'
import Slider from "react-slick";
import CategorySlider from '../CategorySlider/CategorySlider';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/cartContext';


// import Style from './Home.module.css'

export default function Home() {


  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);

  }
  let { data, isLoading } = useQuery('Products', getAllProducts)

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    rtl: true,
  };
  return <>
    <Helmet>
      {/* <meta charSet="utf-8" /> */}
      <title>Home FreshCart </title>
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
    <header>
      <div className="row g-1  pb-1 my-2">
        <div className="col-md-10 rounded-3 mb-4">
          <Slider {...settings}>
            <div>
              <img src={sliderImage3} className='w-100 rounded-5' alt="product_Photo" />
            </div>
            <div>
              <img src={sliderImage4} className='w-100 rounded-5' alt="product_Photo" />
            </div>
            <div>
              <img src={sliderImage5} className='w-100 rounded-5' alt="product_Photo" />
            </div>

          </Slider>
        </div>
        <div className="col-md-2">
          <img src={sliderImage1} width={310} className='rounded-5 pb-1 ps-1' alt="product_Photo" />
          <img src={sliderImage2} width={310} className='rounded-5 pt-1 ps-1 ' alt="product_Photo" />
        </div>
      </div>
    </header>
    <CategorySlider />
    <div className="row g-2 mt-5">
      {isLoading ? <><div className='d-flex align-items-center justify-content-center my-5 py-5'>
        <i className='fas fa-spinner text-main fa-spin fa-2x'></i>
      </div>
      </> : <>{data.data.data.map((product) =>
        <div key={product.id} className="col-md-3">
          <div className='border m-1'>
            <Product product={product} />
          </div>
        </div>
      )}
      </>}

    </div>
  </>
}


