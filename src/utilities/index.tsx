export const currentTime = (): string =>
  new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

export interface OrganizationType {
  id: number,
  name: string,
}
export interface SupplierType {
  id: number,
  name: string,
}
export interface IngredientType {
  id: number;
  name: string;
  batchId: string;
  supplierId: number;
  imgUrl: string;
  certificationUrls: readonly string[];
  description: string;
  finalLocation: string;
  timestamp: number;
}
export interface ProductType {
  id: number;
  name: string;
  batchId: string;
  organizationId: number;
  imgUrl: string;
  certificationUrls: readonly string[];
  description: string;
  ingredientIds: readonly number[];
  dateOfProduction: number;
  dateOfTesting: number;
  finalLocation: string;
  timestamp: number;
}

export interface IngredientWriteType {
  name: string;
  batchId: string;
  supplierId: number;
  imgUrl: string;
  certificationUrls: readonly string[];
  description: string;
  finalLocation: string;
}

export interface ProductWriteType {
  name: string;
  batchId: string;
  organizationId: number;
  imgUrl: string;
  certificationUrls: readonly string[];
  description: string;
  ingredientIds: readonly number[];
  dateOfProduction: number;
  dateOfTesting: number;
  finalLocation: string;
}

export interface selectOptionType {
  value: number,
  label: string
}

export const required = (value: string | number | null | boolean | undefined) => (value ? undefined : "Required")

export const contract_address="0x86186f63CD4eb9e5694219E5aD6bC6aBA5519e01"