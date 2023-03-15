interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    designation?: string;
    quantity?: number;
    supplier?: string;
    price?: number; 
    inventoryStatus?: InventoryStatus;
  
}