declare namespace PaymentProvider{

    export declare const BankInvoice: {
        BankInvoice: "BankInvoice" | "Boleto Bancário";
    };
    
    export interface BankInvoiceAuthorization extends Authorization {
        paymentMethod: BankInvoice;
    }

    export declare const isBankInvoiceAuthorization: (authorization: AuthorizationRequest) => authorization is BankInvoiceAuthorization;

}

