import axios from "axios";

const API_URL = "https://akustorebd.com/wp-json/wc/v3";
const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY; // never hard-code
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;

const api = axios.create({
  baseURL: API_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
  timeout: 10000,
});

/* --------------------------- PRODUCTS --------------------------- */

export const getAllProducts = async (perPage = 12) => {
  try {
    // use simple client‑side cache
    const cached = sessionStorage.getItem("wc-products");
    if (cached) return JSON.parse(cached);

    const { data } = await api.get("/products", {
      params: {
        per_page: perPage,
        _fields: "id,name,slug,price,images,type",
      },
    });

    sessionStorage.setItem("wc-products", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("getAllProducts error:", err.message);
    return [];
  }
};

/* ---------------------- SINGLE PRODUCT BY ID ---------------------- */

export const getSingleProduct = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`, {
      params: {
        _fields:
          "id,name,slug,price,description,images,attributes,variations,type",
      },
    });
    return data;
  } catch (err) {
    console.error("getSingleProduct error:", err.message);
    return null;
  }
};

/* ----------------------- PRODUCT BY SLUG -------------------------- */

export const getProductBySlug = async (slug) => {
  try {
    const { data } = await api.get("/products", {
      params: { slug, _fields: "id,name,slug,price,description,images,type" },
    });
    return Array.isArray(data) && data.length ? data[0] : null;
  } catch (err) {
    console.error("getProductBySlug error:", err.message);
    return null;
  }
};

/* -------------------------- VARIATIONS --------------------------- */

export const getProductVariations = async (productId, perPage = 20) => {
  try {
    const { data } = await api.get(`/products/${productId}/variations`, {
      params: {
        per_page: perPage,
        _fields: "id,price,regular_price,attributes,image,sku",
      },
    });
    return data;
  } catch (err) {
    console.error("getProductVariations error:", err.message);
    return [];
  }
};

/* ---------------------------- USERS ------------------------------ */

export const registerStoreUser = async (user) => {
  const { name, username, email, password } = user;
  try {
    const { data } = await api.post(
      "/customers",
      {
        email,
        first_name: name,
        username,
        password,
      },
      { auth: { username: CONSUMER_KEY, password: CONSUMER_SECRET } }
    );
    return data;
  } catch (err) {
    console.error(
      "registerStoreUser error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const loginUser = async (credentials) => {
  try {
    const url = "https://akustorebd.com/wp-json/jwt-auth/v1/token";
    const { data } = await axios.post(url, credentials);
    return data;
  } catch (err) {
    console.error("loginUser error:", err.response?.data || err.message);
    return null;
  }
};

/* ---------------------------- ORDERS ----------------------------- */

export const createAnOrder = async (orderInfo) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cartItems.length) return false;

    const lineItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const payload = {
      ...orderInfo,
      line_items: lineItems,
    };

    const { data } = await api.post("/orders", payload);
    return data;
  } catch (err) {
    console.error("createAnOrder error:", err.response?.data || err.message);
    return null;
  }
};

export const getProductAndVariations = async (slug) => {
  try {
    const prod = await getProductBySlug(slug);
    if (!prod?.id) return { product: null, variations: [] };

    const [productData, variations] = await Promise.all([
      getSingleProduct(prod.id),
      getProductVariations(prod.id),
    ]);

    return { product: productData, variations };
  } catch (err) {
    console.error("getProductAndVariations error:", err.message);
    return { product: null, variations: [] };
  }
};

// directly placing order to WooCommerce

export const createAnOrderDirectly = async (orderInfo, singleProduct) => {
  try {
    const lineItems = [
      {
        product_id: singleProduct.id,
        quantity: 1,
      },
    ];

    const payload = {
      payment_method: "bacs", // or "cod"
      payment_method_title: "Direct Bank Transfer",
      set_paid: false, // true if payment already done
      billing: {
        first_name: orderInfo.name,
        email: orderInfo.email,
        phone: orderInfo.phone,
      },
      meta_data: [
        { key: "User ID", value: orderInfo.userId },
        { key: "Zone ID", value: orderInfo.zoneId },
      ],
      line_items: lineItems,
    };

    const { data } = await api.post("/orders", payload);
    return data;
  } catch (err) {
    console.error("createAnOrder error:", err.response?.data || err.message);
    return null;
  }
};

export default api;
