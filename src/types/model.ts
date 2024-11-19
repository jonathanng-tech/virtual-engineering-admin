import * as THREE from 'three';

export interface WorldBound {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
  hasTopModule?: boolean;
}
export interface Model {
  product: ProductEntity;
  path: string;
  bound?: WorldBound;
  action: string;
  relatedModel?: Model | null;
  timestamp: number;
  position: [number, number, number];
}

export interface Size {
  w?: string;
  d?: string;
  h?: string;
}

// Interface for the Category entity
export interface CategoryEntity {
  id: string;
  name: string;
  thumbnail: string | null;
}

// Interface for the Product entity
export interface ProductEntity {
  id: number; // Assuming ID is a number based on the provided data
  code: string;
  SKU?: string;
  name: string;
  brandName: string | null;
  path: string;
  defaultSize: {
    d: number; // Depth
    h: number; // Height
    w: number; // Width
  };
  price: number;
  thumbnail: string;
  categoryId: string;
  enable: boolean;
  serieIds: string[]; // IDs of associated series
  storeIds: string[]; // IDs of associated stores
  createdAt: string; // ISO date string
  updatedAt: string | null; // ISO date string or null
  deletedAt: string | null; // ISO date string or null
  description: string | null;
  position: string;
  moduleType: string;
  availableSizes: string[]; // Assuming it's an array of size identifiers
  note: string | null;
  category?: CategoryEntity; // Category details
}

// Interface for the Store entity
export interface TenantEntity {
  id: string;
  name: string;
  settings: any;
  thumbnail: string;
  description: string;
}

// Interface for the Store entity
export interface StoreEntity {
  id: string;
  name: string;
  address: string;
  thumbnail?: string | null;
  email: string | null;
  phone: string | null;
  tenantId: string;
  tenantName: string;
  tenant: TenantEntity;
  serieIds: string[];
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  series: SeriesEntity[];
}

// Interface for the Style entity
export interface StyleEntity {
  id: number; // The ID of the material
  name?: string; // The name of the material
  type: string; // The type of the material
  path?: string; // The path to the material image
  tenantIds?: string[]; // An array of tenant IDs associated with the material
  serieIds?: string[]; // An array of serieIds associated with the material
  default: boolean;
}

// Interface for the Series entity
export interface SeriesEntity {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
export interface InputCustomerInfo {
  fullname: string;
  phone: string;
  email: string;
  address: string;
  checkoutForm?: object;
  storeId: string;
  tenantId: string;
  attachFile: string;
  totalPrice: number;
  shouldShowNote: boolean;
}
