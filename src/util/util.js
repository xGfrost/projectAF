const createProductObject = ({product_name, product_id, description, image, price}) => {
    return {
        id: product_id,
        name: product_name,
        description: description,
        image: image,
        price: price
    }
}

const cratePurchaseObject = ({id, product_id, user_id, product_created_at, product_updated_at}) => {
    return {
        id: id,
        product_id: product_id,
        user_id: user_id,
        created_at: product_created_at,
        updated_at: product_updated_at,
    }
}

const createUserObject = ({user_name, email, photo_url, role, user_created_at, user_updated_at}) => {
    return {
        user_name: user_name,
        email: email,
        photo_url: photo_url,
        role: role, 
        created_at: user_created_at,
        updated_at: user_updated_at
    }
}

module.exports = {
    cratePurchaseObject,
    createUserObject,
    createProductObject
}