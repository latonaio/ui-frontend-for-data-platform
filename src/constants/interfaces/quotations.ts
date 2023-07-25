interface QuotationsItem{
	Quotation: number;
	Buyer: string;
	Seller: string;
	HeaderOrderIsDefined: boolean;
	QuoationType: string;
	IsMarkedForDeletion: boolean;
}

interface QuotationsBuyerItem extends QuotationsItem{
}

interface QuotationsSellerItem extends QuotationsItem{
}

interface QuotationsDetailListItem {
	Quotation: number;
	OrderItem: number;
	Product: number;
	OrderItemTextByBuyer: string;
	OrderItemTextBySeller: string;
	OrderQuantityInDeliveryUnit: number;
	DeliveryUnit: number;
	ConditionRateValue: string;
	RequestedDeliveryDate: string;
	NetAmount: string;
	IsMarkedForDeletion: boolean;
}

interface QuotationsDetailListHeader extends QuotationsItem{
	OrderDate: string;
	PaymentTermsName: string;
	PaymentMethodName: string;
	Currency: string;
	OrderType: string;
}

export type{
	QuotationsBuyerItem,
	QuotationsSellerItem,
	QuotationsItem,
	QuotationsDetailListItem,
	QuotationsDetailListHeader
}