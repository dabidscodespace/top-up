import axios from "axios";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const BASE_URL = "https://akustorebd.com/wp-json";
const API_URL = `${BASE_URL}/wc/v3`;
const JWT_URL = `${BASE_URL}/jwt-auth/v1/token`;

const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;

const api = axios.create({
  baseURL: API_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
  timeout: 10000,
});

/* =========================================================
   PRODUCTS
   ========================================================= */

/**
 * Get all products (with simple client caching)
 */
export const getAllProducts = async (perPage = 12) => {
  try {
    const cached = sessionStorage.getItem("wc-products");
    if (cached) return JSON.parse(cached);

    const { data } = await api.get("/products", {
      params: { per_page: perPage, _fields: "id,name,slug,price,images,type" },
    });

    sessionStorage.setItem("wc-products", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("getAllProducts error:", err.message);
    return [];
  }
};

/**
 * Get single product by ID (full data)
 */
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
    console.error("getSingleProduct error:", err.message);
    return null;
  }
};

/**
 * Get single product by slug
 */
export const getProductBySlug = async (slug) => {
  try {
    const { data } = await api.get("/products", {
      params: { slug, _fields: "id,name,slug,price,description,images,type" },
    });
    return Array.isArray(data) && data.length ? data[0] : null;
  } catch (err) {
    console.error("getProductBySlug error:", err.message);
    return null;
  }
};

/**
 * Get all variations for a given product
 */
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
    console.error("getProductVariations error:", err.message);
    return [];
  }
};

/**
 * Get product and its variations together
 */
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

export const createAnOrder = async (orderInfo) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cartItems.length) return false;

    const lineItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const payload = { ...orderInfo, line_items: lineItems };
    const { data } = await api.post("/orders", payload);
    return data;
  } catch (err) {
    console.error("createAnOrder error:", err.response?.data || err.message);
    return null;
  }
};


/* =========================================================
   HELPER - Get stored customer data
   ========================================================= */

export const getStoredCustomer = () => {
  try {
    return JSON.parse(localStorage.getItem("user_data") || "{}");
  } catch {
    return {};
  }
};

/* =========================================================
   CUSTOMERS
   ========================================================= */

/**
 * Get WooCommerce customer by email
 */
export const getCustomerByEmail = async (email) => {
  try {
    const { data } = await api.get("/customers", {
      params: { email },
    });
    return data?.[0] || null;
  } catch (err) {
    console.error("getCustomerByEmail error:", err.message);
    return null;
  }
};

/**
 * Register new customer
 */
export const registerStoreUser = async ({ username, email, password }) => {
  try {
    const { data } = await api.post("/customers", {
      username,
      email,
      password,
      first_name: username,
    });
    return data;
  } catch (err) {
    console.error(
      "registerStoreUser error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

/**
 * Login - Returns JWT token + WooCommerce customer_id
 */
export const loginUser = async (credentials) => {
  try {
    // Step 1: JWT Authentication
    const { data: jwtData } = await axios.post(JWT_URL, credentials);

    if (!jwtData?.token) {
      throw new Error("Login failed");
    }

    // Step 2: Get WooCommerce customer by email
    const customer = await getCustomerByEmail(jwtData.user_email);

    if (!customer) {
      console.warn("No WooCommerce customer found for this email");
    }

    // Step 3: Return combined data
    return {
      token: jwtData.token,
      email: jwtData.user_email,
      username: jwtData.user_nicename,
      display_name: jwtData.user_display_name,
      customer_id: customer?.id || null,
      first_name: customer?.first_name || jwtData.user_nicename,
      last_name: customer?.last_name || "",
    };
  } catch (err) {
    console.error("loginUser error:", err.response?.data || err.message);
    throw err;
  }
};

/* =========================================================
   DIRECT ORDER - Linked to Customer
   ========================================================= */

/**
 * Create order linked to logged-in customer
 */
export const createAnOrderDirectly = async (orderInfo, singleProduct) => {
  try {
    // Get stored customer data
    const storedCustomer = getStoredCustomer();
    const customerId = storedCustomer.customer_id;
    const customerEmail = storedCustomer.email;

    console.log("Creating order for customer:", {
      customer_id: customerId,
      email: customerEmail,
    });

    // Build order payload
    const payload = {
      // Link to customer account (THIS IS THE KEY!)
      customer_id: customerId || 0,

      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: false,

      // Billing info - use customer's registered email
      billing: {
        first_name: orderInfo.name || storedCustomer.first_name,
        last_name: storedCustomer.last_name || "",
        email: customerEmail || orderInfo.email, // Use registered email
        phone: orderInfo.phone || "",
      },

      // Order meta data
      meta_data: [
        { key: "User ID", value: orderInfo.userId },
        { key: "Zone ID", value: orderInfo.zoneId },
      ],

      // Product
      line_items: [
        {
          product_id: singleProduct.id,
          variation_id: singleProduct.variation_id || 0,
          quantity: orderInfo.quantity || 1,
        },
      ],
    };

    const { data } = await api.post("/orders", payload);

    console.log("Order created:", data.id, "Customer:", data.customer_id);

    return data;
  } catch (err) {
    console.error(
      "createAnOrderDirectly error:",
      err.response?.data || err.message
    );
    return null;
  }
};

/**
 * Get orders for logged-in customer
 */
export const getCustomerOrders = async () => {
  try {
    const { customer_id } = getStoredCustomer();

    if (!customer_id) {
      console.warn("No customer_id found");
      return [];
    }

    const { data } = await api.get("/orders", {
      params: { customer: customer_id },
    });

    return data;
  } catch (err) {
    console.error("getCustomerOrders error:", err.message);
    return [];
  }
};

export default api;
