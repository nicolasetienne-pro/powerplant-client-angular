/**
 * Swagger sample app
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Conso } from './conso';
import { PlantType } from './plantType';


export interface Plant {
    /**
     * id
     */
    id?: number;
    /**
     * type
     */
    type: PlantType;
    /**
     * name
     */
    name: string;
    /**
     * capacity
     */
    capacity?: number;
    /**
     * Consumption history
     */
    consumptions?: Array<Conso>;
}