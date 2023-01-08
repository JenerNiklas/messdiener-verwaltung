export class Person {
  public vorname: string;
  public nachname: string;
  public email: string;
  public telefon: string;
  public geschlecht: string;
  public aktiv: boolean;
  public neu: number;
  public anmerkung: String;
  public iid: number;

  constructor(messdienerIid: number, vorname: string, nachname: string, email: string, telefon: string, geschlecht: string, 
              aktiv: boolean, neu: number, anmerkung: String) {
    this.iid = messdienerIid;
    this.vorname = vorname;
    this.nachname = nachname;
    this.email = email;
    this.telefon = telefon;
    this.geschlecht = geschlecht;
    this.aktiv = aktiv;
    this.neu = neu;
    this.anmerkung = anmerkung;
  }
}