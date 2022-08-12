import client from '.';

const filterProduct = (searchParams: any) => {
  var query = "product/filter?";
  if(searchParams.get('productName')){
    query += "productName=" + searchParams.get('productName');
  }
  if(searchParams.get('categoryTitle')){
    query += "categoryTitle=" + searchParams.get('categoryTitle');
  }
  // if(searchParams.get(''))
}