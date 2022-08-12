import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    
  }, [])

  return <div>Filter Product</div>
}

export default FilterProduct;