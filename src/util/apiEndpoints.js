export const BASE_URL = "https://catatdulu.zeabur.app/api";
//export const BASE_URL = "http://localhost:8000/api"; // --> for local development or testing progress
const CLOUDINARY_CLOUD_NAME = "duwad91pv"

export const API_ENDPOINTS = {
    LOGIN: "/users/login",
    REGISTER: "/users/register",
    GET_USER_INFO: "/users/profile",
    GET_ALL_CATEGORIES: "/categories/get-categories",
    SAVE_CATEGORY: "/categories/save-categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}/update`,
    GET_ALL_INCOMES: "/incomes/get",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}/get-categories`,
    ADD_INCOME: '/incomes/add',
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}/delete`,
    INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
    INCOME_EMAIL_ATTACHMENT: "/email/income-excel",
    GET_ALL_EXPENSES: "/expenses/get",
    ADD_EXPENSES: "/expenses/add",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}/delete`,
    EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
    EXPENSE_EMAIL_ATTACHMENT: "/email/expense-excel",
    APPLY_FILTERS: "/filter/filter-by",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    DASHBOARD_DATA: "/dashboard/main"
}

