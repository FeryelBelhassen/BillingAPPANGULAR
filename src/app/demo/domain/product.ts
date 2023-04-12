interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: number;
    code?: number;
    designation?: string;
    quantity?: number;
    supplier?: string;
    price?: number; 
    inventoryStatus?: InventoryStatus;
  
}