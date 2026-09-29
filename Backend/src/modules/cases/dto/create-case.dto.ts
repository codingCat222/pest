export interface CreateCaseDto {
  propertyName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyAddress: string;
  postcode: string;
  pest: string;
  location: string;
  productName?: string;
  deliveryFee?: number;
  courier?: string;
  userId?: string;
}