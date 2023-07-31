import { Injectable } from '@angular/core';
import inventoryJSON from "../../assets/json/inventory.json";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor() { }

  getInventory(): any{
    return inventoryJSON;
  }
}
