// API Configuration
// This file centralizes all backend service URLs
// Uses Docker Compose services running on localhost

// Docker Compose service ports
const SERVICES = {
  AUTH: 'http://localhost:8081',
  USER: 'http://localhost:8082',
  PROPERTY: 'http://localhost:8083',
  BOOKING: 'http://localhost:8084',
  PAYMENT: 'http://localhost:8085',
  BLOG: 'http://localhost:8086',
  SOCIAL: 'http://localhost:8087',
  PROMO: 'http://localhost:8088',
  REQUEST: 'http://localhost:8089',
  AIRALO: 'http://localhost:8090',
};

export const API_ENDPOINTS = {
  // Auth Service (Port 8081) - Public + Protected
  AUTH: {
    BASE: SERVICES.AUTH,
    TOKEN: `${SERVICES.AUTH}/token`,
    TOKEN_REVOKE: `${SERVICES.AUTH}/token/revoke`,
    TOKEN_VALIDATE: `${SERVICES.AUTH}/token/validate`,
    OAUTH_LOGIN: `${SERVICES.AUTH}/oauth/login`,
    SESSIONS: `${SERVICES.AUTH}/sessions`,
  },

  // User Service (Port 8082) - Public + Protected
  USER: {
    BASE: SERVICES.USER,
    REGISTER: `${SERVICES.USER}/register`,
    LOGIN: `${SERVICES.USER}/login`,
    PASSWORD_RESET: `${SERVICES.USER}/password-reset`,
    VERIFY_EMAIL: `${SERVICES.USER}/verify-email`,
    VERIFY_PHONE: `${SERVICES.USER}/verify-phone`,
    PROFILE: `${SERVICES.USER}/profile`,
    UPDATE_PROFILE: `${SERVICES.USER}/profile`,
    UPDATE_PASSWORD: `${SERVICES.USER}/password`,
    MY_USER: (id) => `${SERVICES.USER}/myuser/${id}`,
  },

  // Property Service (Port 8083) - RUNNING ✅
  PROPERTY: {
    BASE: SERVICES.PROPERTY,
    LIST: `${SERVICES.PROPERTY}/api/properties`,
    DETAIL: (id) => `${SERVICES.PROPERTY}/api/properties/${id}`,
    CREATE: `${SERVICES.PROPERTY}/api/properties`,
    UPDATE: (id) => `${SERVICES.PROPERTY}/api/properties/${id}`,
    DELETE: (id) => `${SERVICES.PROPERTY}/api/properties/${id}`,
    SINGLE_SERVICE: (id) => `${SERVICES.PROPERTY}/singleservice/${id}`,
    PROPERTY_PROMO: (id) => `${SERVICES.PROPERTY}/propertypromo/${id}`,
    PROPERTY_VISIBILITY: (id) => `${SERVICES.PROPERTY}/propertyvisibility/${id}`,
  },

  // Booking Service (Port 8084) - RUNNING ✅
  BOOKING: {
    BASE: SERVICES.BOOKING,
    LIST: `${SERVICES.BOOKING}/api/bookings`,
    DETAIL: (id) => `${SERVICES.BOOKING}/api/bookings/${id}`,
    CREATE: `${SERVICES.BOOKING}/api/bookings`,
    UPDATE: (id) => `${SERVICES.BOOKING}/api/bookings/${id}`,
    CHECK_AVAILABILITY: `${SERVICES.BOOKING}/api/bookings/check-availability`,
    CANCEL: (id) => `${SERVICES.BOOKING}/api/bookings/${id}`,
  },

  // Payment Service (Port 8085) - RUNNING ✅
  PAYMENT: {
    BASE: SERVICES.PAYMENT,
    LIST: `${SERVICES.PAYMENT}/api/payments`,
    DETAIL: (id) => `${SERVICES.PAYMENT}/api/payments/${id}`,
    CREATE: `${SERVICES.PAYMENT}/api/payments`,
    UPDATE: (id) => `${SERVICES.PAYMENT}/api/payments/${id}`,
    REFUND: `${SERVICES.PAYMENT}/api/payments/refund`,
  },

  // Checkout Service (Port 8085) - Part of Payment Service
  CHECKOUT: {
    BASE: SERVICES.PAYMENT,
    CREATE: `${SERVICES.PAYMENT}/checkout`,
  },

  // Additional Services (Port 8085) - Part of Payment Service
  ADDITIONAL_SERVICE: {
    BASE: SERVICES.PAYMENT,
    LIST: `${SERVICES.PAYMENT}/alladditionalservice`,
    CREATE: `${SERVICES.PAYMENT}/additionalservice`,
    DETAIL: (id) => `${SERVICES.PAYMENT}/additionalservice/${id}`,
    UPDATE: (id) => `${SERVICES.PAYMENT}/additionalservice/${id}`,
    DELETE: (id) => `${SERVICES.PAYMENT}/additionalservice/${id}`,
  },

  // Features Service (Port 8088) - Part of Promo Service
  FEATURES: {
    BASE: SERVICES.PROMO,
    LIST: `${SERVICES.PROMO}/features`,
    CREATE: `${SERVICES.PROMO}/feature`,
    DELETE: (id) => `${SERVICES.PROMO}/feature/${id}`,
  },

  // Upload Service (Port 8085) - Part of Payment Service
  UPLOAD: {
    BASE: SERVICES.PAYMENT,
    UPLOAD: `${SERVICES.PAYMENT}/uploads`,
    UPLOAD_SINGLE: `${SERVICES.PAYMENT}/upload`,
  },

  // Subscribe Service (Port 8085) - Part of Payment Service  
  SUBSCRIBE: {
    BASE: SERVICES.PAYMENT,
    SUBSCRIBE: `${SERVICES.PAYMENT}/subscribe`,
  },

  // Custom Endpoints (Various ports)
  CUSTOM: {
    CHECKOUTS: (userId) => `${SERVICES.BOOKING}/checkouts/${userId}`,
    USER_PROPERTY: (userId) => `${SERVICES.PROPERTY}/userproperty/${userId}`,
    LIKED_PROPERTIES: (userId) => `${SERVICES.PROPERTY}/user/${userId}/liked_properties`,
    EMAILS: `${SERVICES.PAYMENT}/emails`,
    TRANSACTION: `${SERVICES.PAYMENT}/addtransaction`,
    TRANSACTION_STATUS: `${SERVICES.PAYMENT}/transactionstatus`,
    PESAPAL_TOKEN: `${SERVICES.PAYMENT}/get-pesapal-token`,
    ORDER_REQUEST: `${SERVICES.PAYMENT}/orderrequest`,
    REQUESTS: `${SERVICES.REQUEST}/requests`,
    REQUEST_DETAIL: (id) => `${SERVICES.REQUEST}/requests/${id}`,
    MY_REQUESTS: `${SERVICES.REQUEST}/myrequests`,
    AUTHENTICATED_USER: `${SERVICES.USER}/profile`,
    LOGIN: `${SERVICES.USER}/login`,
    LOGOUT: `${SERVICES.USER}/logout`,
    FORGOT_PASSWORD: `${SERVICES.USER}/forgot_password`,
    RESET_PASSWORD: `${SERVICES.USER}/reset_password`,
    REFRESH: `${SERVICES.USER}/refresh`,
    REGISTER: `${SERVICES.USER}/register`,
    VERIFY: `${SERVICES.USER}/verify`,
    ALL_USERS: `${SERVICES.USER}/allusers`,
    UPDATE_USER: `${SERVICES.USER}/user`,
    GET_USER: `${SERVICES.USER}/user`,
    UPDATE_USER_STATUS: (userId) => `${SERVICES.USER}/user/${userId}/status`,
    UPDATE_USER_ROLE: (userId) => `${SERVICES.USER}/user/${userId}/role`,
    GOOGLE_LOGIN: `${SERVICES.USER}/google-login`,
    SINGLE_PROPERTY: (id) => `${SERVICES.PROPERTY}/singleproperty/${id}`,
    ON_BOARDING: `${SERVICES.PROPERTY}/addonboarding`,
  },

  // Blog Service (Port 8086) - Database issues
  BLOG: {
    BASE: SERVICES.BLOG,
    // Standard CRUD endpoints
    LIST: `${SERVICES.BLOG}/blogs`,
    DETAIL: (id) => `${SERVICES.BLOG}/blogs/${id}`,
    CREATE: `${SERVICES.BLOG}/blogs`,
    UPDATE: (id) => `${SERVICES.BLOG}/blogs/${id}`,
    DELETE: (id) => `${SERVICES.BLOG}/blogs/${id}`,
    // Alternative endpoints for newer API versions
    POST_BY_SLUG: (slug) => `${SERVICES.BLOG}/posts/${slug}`,
    CATEGORY_BY_SLUG: (slug) => `${SERVICES.BLOG}/categories/${slug}`,
    CREATE_POST: `${SERVICES.BLOG}/posts`,
    UPDATE_POST: (slug) => `${SERVICES.BLOG}/posts/${slug}`,
    DELETE_POST: (slug) => `${SERVICES.BLOG}/posts/${slug}`,
    CREATE_CATEGORY: `${SERVICES.BLOG}/categories`,
    UPDATE_CATEGORY: (slug) => `${SERVICES.BLOG}/categories/${slug}`,
    DELETE_CATEGORY: (slug) => `${SERVICES.BLOG}/categories/${slug}`,
    CREATE_COMMENT: `${SERVICES.BLOG}/comments`,
    UPDATE_COMMENT: (id) => `${SERVICES.BLOG}/comments/${id}`,
    DELETE_COMMENT: (id) => `${SERVICES.BLOG}/comments/${id}`,
  },

  // Social Service (Port 8087) - Missing .env
  SOCIAL: {
    BASE: SERVICES.SOCIAL,
    CREATE_PROFILE: `${SERVICES.SOCIAL}/api/v1/profiles`,
    UPDATE_PROFILE: `${SERVICES.SOCIAL}/api/v1/profiles`,
    GET_PROFILE: `${SERVICES.SOCIAL}/api/v1/profiles`,
    CREATE_CONNECTION: `${SERVICES.SOCIAL}/api/v1/connections`,
    UPDATE_CONNECTION_STATUS: (id) => `${SERVICES.SOCIAL}/api/v1/connections/${id}/status`,
    CREATE_POST: `${SERVICES.SOCIAL}/api/v1/posts`,
    GET_POST: (id) => `${SERVICES.SOCIAL}/api/v1/posts/${id}`,
    LIST_POSTS: `${SERVICES.SOCIAL}/api/v1/posts`,
    ADD_COMMENT: (id) => `${SERVICES.SOCIAL}/api/v1/posts/${id}/comments`,
    TOGGLE_LIKE: (id) => `${SERVICES.SOCIAL}/api/v1/likes/${id}`,
    SHARE_POST: (id) => `${SERVICES.SOCIAL}/api/v1/posts/${id}/shares`,
    COMMENTS: `${SERVICES.SOCIAL}/api/v1/comments`,
    COMMENT: (id) => `${SERVICES.SOCIAL}/api/v1/comments/${id}`,
    LIKES: `${SERVICES.SOCIAL}/api/v1/likes`,
  },

  // Promo Service (Port 8088) - RUNNING ✅
  PROMO: {
    BASE: SERVICES.PROMO,
    LIST: `${SERVICES.PROMO}/api/v1/promos`,
    DETAIL: (id) => `${SERVICES.PROMO}/api/v1/promos/${id}`,
    CREATE: `${SERVICES.PROMO}/api/v1/promos`,
    UPDATE: (id) => `${SERVICES.PROMO}/api/v1/promos/${id}`,
    VALIDATE: `${SERVICES.PROMO}/api/v1/promos/validate`,
    USAGE: (id) => `${SERVICES.PROMO}/api/v1/promos/${id}/usage`,
  },

  // Request Service (Port 8089) - Missing .env
  REQUEST: {
    BASE: SERVICES.REQUEST,
    LIST: `${SERVICES.REQUEST}/api/v1/requests`,
    CREATE: `${SERVICES.REQUEST}/api/v1/requests`,
    DETAIL: (id) => `${SERVICES.REQUEST}/api/v1/requests/${id}`,
    UPDATE: (id) => `${SERVICES.REQUEST}/api/v1/requests/${id}`,
    ADD_COMMENT: (requestId) => `${SERVICES.REQUEST}/api/v1/requests/${requestId}/comments`,
    UPLOAD_ATTACHMENT: (requestId) => `${SERVICES.REQUEST}/api/v1/requests/${requestId}/attachments`,
    DELETE_ATTACHMENT: (requestId, id) => `${SERVICES.REQUEST}/api/v1/requests/${requestId}/attachments/${id}`,
  },

  // Airalo Service (Port 8090) - RUNNING ✅
  AIRALO: {
    BASE: SERVICES.AIRALO,
    TOKEN: `${SERVICES.AIRALO}/api/v1/airalo/token`,
    PACKAGES: (country) => `${SERVICES.AIRALO}/api/v1/airalo/packages/${country}`,
    ORDERS: `${SERVICES.AIRALO}/api/v1/airalo/orders`,
    TOPUP: `${SERVICES.AIRALO}/api/v1/airalo/topup`,
    INSTRUCTIONS: (iccid) => `${SERVICES.AIRALO}/api/v1/airalo/instructions/${iccid}`,
    DEVICES: `${SERVICES.AIRALO}/api/v1/airalo/devices`,
    BALANCE: `${SERVICES.AIRALO}/api/v1/airalo/balance`,
  },

  // Review Service (Port conflicts with Payment) - Not running
  REVIEW: {
    BASE: `${SERVICES.PAYMENT}`,
    LIST: `${SERVICES.PAYMENT}/api/reviews`,
    DETAIL: (id) => `${SERVICES.PAYMENT}/api/reviews/${id}`,
    CREATE: `${SERVICES.PAYMENT}/api/reviews`,
    UPDATE: (id) => `${SERVICES.PAYMENT}/api/reviews/${id}`,
    DELETE: (id) => `${SERVICES.PAYMENT}/api/reviews/${id}`,
  },

  // Analytics Service (Port conflicts with Social) - Not running
  ANALYTICS: {
    BASE: SERVICES.SOCIAL,
    PROPERTY: `${SERVICES.SOCIAL}/analytics/property`,
    USER: `${SERVICES.SOCIAL}/analytics/user`,
    PLATFORM: `${SERVICES.SOCIAL}/analytics/platform`,
  },

  // Search Service (Not in docker-compose)
  SEARCH: {
    BASE: 'http://localhost:8086',
    SEARCH_PROPERTIES: 'http://localhost:8086/search',
  },

  // Recommendation Service (Not in docker-compose)
  RECOMMENDATION: {
    BASE: 'http://localhost:8088',
    GET_RECOMMENDATIONS: 'http://localhost:8088/recommendations',
  },

  // Notification Service (Not in docker-compose)
  NOTIFICATION: {
    BASE: 'http://localhost:8087',
    LIST: 'http://localhost:8087/api/notifications',
    DETAIL: (id) => `http://localhost:8087/api/notifications/${id}`,
    CREATE: 'http://localhost:8087/api/notifications',
    UPDATE: (id) => `http://localhost:8087/api/notifications/${id}`,
    WEBSOCKET: 'http://localhost:8087/api/ws/notifications',
  },
};

// Helper function to get service base URL
export const getServiceURL = (service) => {
  return SERVICES[service] || 'http://localhost';
};

// Get current environment info
export const getEnvironmentInfo = () => {
  return {
    environment: 'docker-local',
    baseServices: SERVICES,
    timestamp: new Date().toISOString(),
    runningServices: [
      'PROPERTY (8083)',
      'BOOKING (8084)',
      'PAYMENT (8085)',
      'PROMO (8088)',
      'AIRALO (8090)',
    ],
  };
};

// Helper to check if service is available
export const isServiceAvailable = (serviceName) => {
  const runningServices = ['PROPERTY', 'BOOKING', 'PAYMENT', 'PROMO', 'AIRALO'];
  return runningServices.includes(serviceName);
};

export default API_ENDPOINTS;
