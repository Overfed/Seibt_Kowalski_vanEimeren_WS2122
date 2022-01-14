
function validateWG(WG) {

    if(WG.PersonCount != null) return true
    else return false
}

function validateProduct(newProduct) {
    
    if((newProduct.Product != null) && (newProduct.Price != null)) return true
    else return false
}



module.exports = {

    validateWG,
    validateProduct
  
}