export * from './plant.service';
import { PlantService } from './plant.service';
export * from './statut.service';
import { StatutService } from './statut.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [PlantService, StatutService, UserService];
