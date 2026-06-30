export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  leadId?: string;
  productId: string;
  productCode: string;
  productName: string;
  amount: number;
}
