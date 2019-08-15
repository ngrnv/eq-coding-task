export class Entity {
  id: string;

  constructor() {
    this.id = undefined;
  }
}

export class Shipment extends Entity {
  type: ShipmentType;
  origin: boolean;
  destination: boolean;
  delivered: boolean;
  weight: Weight;
  office: Office;

  constructor() {
    super();
    this.type = undefined;
    this.origin = undefined;
    this.destination = undefined;
    this.delivered = undefined;
    this.weight = undefined;
    this.office = undefined;
  }
}

export class ShipmentType extends Entity {
  name: string;
}

export class Weight extends Entity {
  desc: string;
}

export class Office extends Entity {
  PLZ: number;
  name: string;
}
