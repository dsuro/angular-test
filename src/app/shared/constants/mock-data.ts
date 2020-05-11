function getAllCars(){
    const data=require('./../../../assets/json/cars.json');
    return data;
}

function getBrands(){
    const data=require('./../../../assets/json/brands.json');
    return data;
}

export const mockData={
    allCars:getAllCars(),
    allBrands:getBrands()
};