import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class Reports {
  // ------------------- sales ---------------------
  date = new Date().toISOString().split("T")[0];

  DailySales = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}sales-location-report`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  DailySalesReturn = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}sales-return-location`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  MonthlySales = async (date) => {
    const prams = new Date(date.months);
    const response = await axios({
      method: "get",
      url: `${API_URL}monthly-sales-location`,
      params: {
        month: prams.getMonth() + 1,
        year: prams.getFullYear(),
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  PeriodicSales = async (from, to) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}sales-location-report`,
      params: {
        fromDate: `${from} 00:00:00`,
        toDate: `${to} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  DetailsSales = async (from, to,paidStatus) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}details-sales-location`,
      params: {
        fromDate: `${from} 00:00:00`,
        toDate: `${to} 23:59:59`,
        paidStatus
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  SeriesBasedInvoice = async (from,to,fromDate,toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}series-based-invoices`,
      params: {
        from,
        to,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  ItemSalesByCustomer = async (from, to) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}items-sales-by-customer`,
      params: {
        fromDate: `${from} 00:00:00`,
        toDate: `${to} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  DailySalesWithPayment = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-sales-with-payment`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
  
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  CustomerReconsalation = async (from, to,code,paidStatus) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer-sales-reconciliation`,
      params: {
        fromDate: `${from} 00:00:00`,
        toDate: `${to} 23:59:59`,
        code,
        paidStatus
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  // ---------------------- stock reports ------------

  StockInHand = async (locationCode) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-in-hand`,
      params: {
        locationCode,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  StockAudit = async (itemCode) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-audit`,
      params: {
        itemCode,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  ItemInStock = async (itemCode) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}item-in-stock-by-location`,
      params: {
        itemCode,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  PeriodicStock = async (fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}periodic-stock`,
      params: {
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  StockIssue = async (fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-issue-location`,
      params: {
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  StockInHandTotalQuantity = async (itemCode) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}stock-in-hand-total-by-location`,
      params: {
        itemCode,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  // ---------------- customers ---------------
  customerList = async (customer) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer-list`,
      params: {
        code: customer,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  customerSummary = async (code, fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer-summary`,
      params: {
        code,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  creditStatement = async (code,customerTyeCode) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}credit-statement`,
      params: {
        code,
        customerTyeCode
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  creditStatementByRep = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}credit-statement-by-rep`,
      params: {
        code,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  creditStatementByRoute = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}credit-statement-by-route`,
      params: {
        code,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };


  ageingSummary = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer-aging`,
      params: {
        code,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  // -------------------- Expenses ------------------------

  DailyExpenses = async (date,categoryCode,typeCode) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-expenses-location`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
        categoryCode,
        typeCode
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

   PeriodicExpenses = async (fromDate, toDate,categoryCode,typeCode) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-expenses-location`,
      params: {
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
        categoryCode,
        typeCode
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  MonthlyExpenses = async (date) => {
    const prams = new Date(date.months);
    const response = await axios({
      method: "get",
      url: `${API_URL}monthly-expenses-location`,
      params: {
        month: prams.getMonth() + 1,
        year: prams.getFullYear(),
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  // ----------------------- Summary ------------------------

  DayEndSummary = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}day-end-summary`,
      params: {
        date: `${date}`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  DailySummary = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}summary`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  monthlySummary = async (date) => {
    const prams = new Date(date.months);
    const response = await axios({
      method: "get",
      url: `${API_URL}monthly-summary`,
      params: {
        month: prams.getMonth() + 1,
        year: prams.getFullYear(),
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  PeriodicSummary = async (fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}summary`,
      params: {
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  DayBook = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}day-book-summary`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  DayEnd = async (date) => {
    const response = await axios({
      method: "post",
      url: `${API_URL}day-end`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  DayEndView = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}day-end-view`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  

  // ---------------- Cheque Receipt reports -----------------
  ChequeByCustomer = async (customer) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}receipt-cheque-by-customer/${customer}`,
     
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  DailyCheques = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}receipt-periodic-cheque`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  chequeDeposited = async (code, fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}receipt-cheque-in-progress`,
      params: {
        code,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  
  chequeRealized = async (code, fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}receipt-cheque-in-realized`,
      params: {
        code,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  PeriodicCheques = async (from, to) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}receipt-periodic-cheque`,
      params: {
        fromDate: `${from} 00:00:00`,
        toDate: `${to} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  chequReturned = async (code, fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}receipt-cheque-returned`,
      params: {
        code,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  chequeInhand = async (code,fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}receipt-cheque-in-hand`,
      params: {
        code,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
        
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };


  //----------------Cheque Voucher Reports-------------
  ChequeBySupplier = async (supplier) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}voucher-cheque-by-supplier`,
      params: {
        code: supplier,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  VovucherChequesInHand = async (from, to) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}voucher-periodic-cheque`,
      params: {
        fromDate: `${from} 00:00:00`,
        toDate: `${to} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  DailyChequeVocuer = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}voucher-periodic-cheque`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  //-----------------Daily payment Receipt-------------

  DailyPaymentReceipt =  async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-payment-location-receipt`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  PaymentReceiptByRep = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-payment-receipt-by-rep/${code}`
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  
  PaymentReceiptByRoute = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-payment-receipt-by-route/${code}`
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  PaymentReceiptByLocation = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-payment-receipt-by-location/${code}`,
  
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  PaymentReceiptByPaymentType = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-payment-receipt-location-by-payment-type`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
  
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  PaymentReceiptFromInvoicePage = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-payment-receipt-location-by-payment-type-sales-only`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
  
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  // ---------------- Supplier reports -----------------

  SupplierList = async (supplier) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}supplier-list`,
      params: {
        code: supplier,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  // DebitStatement = async (supplier) => {
  //   const response = await axios({
  //     method: "get",
  //     url: `${API_URL}debit-statement`,
  //     params: {
  //       code: supplier,
  //     },
  //   }).catch((e) => {
  //     throw e.message;
  //   });
  //   return response.data;
  // };

  DebitStatement = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}debit-statement`,
      params: {
        code,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  supplierSummary = async (code, fromDate, toDate) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}supplier-summary`,
      params: {
        code,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };
  PaymentVoucherByPaymentType = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-payment-Voucher-location-by-payment-type`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
  
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  // PurchaseHistroy= async (date)=> {
  //   const response = await axios({
  //     method: "get",
  //     url: `${API_URL}purchase-history`,
  //     params: {
  //       fromDate: `${date} 00:00:00`,
  //       toDate: `${date} 23:59:59`,
  //     },
  //   }).catch((e) => {
  //     throw e.message;
  //   });
  //   return response.data;
  // };

  // MonthlyPurchase= async (date)=> {
  //   const response = await axios({
  //     method: "get",
  //     url: `${API_URL}monthly-purchase`,
  //     params: {
  //       fromDate: `${date} 00:00:00`,
  //       toDate: `${date} 23:59:59`,
  //     },
  //   }).catch((e) => {
  //     throw e.message;
  //   });
  //   return response.data;
  // };

  // ---------------- Purchase reports -----------------
  PurchaseList = async (code) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}purchase-list`,
      params: {
        supplierCode: code,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  DailyPurchase = async (date) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}daily-location-purchase`,
      params: {
        fromDate: `${date} 00:00:00`,
        toDate: `${date} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  DetailsPurchase = async (from, to) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}details-location-purchase`,
      params: {
        fromDate: `${from} 00:00:00`,
        toDate: `${to} 23:59:59`,
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };

  MonthlyPurchase = async (date) => {
    const prams = new Date(date.months);
    const response = await axios({
      method: "get",
      url: `${API_URL}monthly-location-purchase`,
      params: {
        month: prams.getMonth() + 1,
        year: prams.getFullYear(),
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data;
  };


}

export default new Reports();
