export class Family {

  family_id: number;
  family_name: string;

  constructor(family_id: number = 0, family_name: string = null) {
    this.family_id = family_id;
    this.family_name = family_name;
  }

}
