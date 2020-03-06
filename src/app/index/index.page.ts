import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  userEmail: string;

  Users: any;
  UsersPrenom: string;
  UsersNom: string;
  UsersEntreprise: string;
  UsersPoste: string;
  UsersMail: string;
  UsersTelephone: number;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
//    if (this.authService.userDetails()) {
//      this.userEmail = this.authService.userDetails().email;
//    } else {
//      this.navCtrl.navigateBack('');
//    }
//

    this.authService.read_Users().subscribe(data => {

      this.Users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Prenom: e.payload.doc.data()['Prenom'],
          Nom: e.payload.doc.data()['Nom'],
          Entreprise: e.payload.doc.data()['Entreprise'],
          Poste: e.payload.doc.data()['Poste'],
          Email: e.payload.doc.data()['Email'],
          Telephone: e.payload.doc.data()['Telephone'],
          
        };
      })
      console.log(this.Users);
    });
  }

  CreateRecord() {
    let record = {};
    record['Prenom'] = this.UsersPrenom;
    record['Nom'] = this.UsersNom;
    record['Entreprise'] = this.UsersEntreprise;
    record['Poste'] = this.UsersPoste;
    record['Email'] = this.UsersMail;
    record['Telephone'] = this.UsersTelephone;
    this.authService.create_NewUsers(record).then(resp => {
      this.UsersPrenom = "";
      this.UsersNom = "";
      this.UsersEntreprise = "";
      this.UsersPoste = "";
      this.UsersMail = "";
      this.UsersTelephone = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
      this.navCtrl.navigateForward('user')
  }

 // RemoveRecord(rowID) {
 //   this.authService.delete_Student(rowID);
 // }

  EditRecord(record) {
    record.isEdit = true;
    record.EditPrenom = record.Prenom;
    record.EditNom = record.Nom;
    record.EditEntreprise = record.Entreprise;
    record.EditPoste = record.Poste;
    record.EditEmail = record.Email;
    record.EditTelephone = record.Telephone;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Prenom'] = recordRow.EditPrenom;
    record['Nom'] = recordRow.EditNom;
    record['Entreprise'] = recordRow.EditEntreprise;
    record['Poste'] = recordRow.EditPoste;
    record['Email'] = recordRow.EditEmail;
    record['Telephone'] = recordRow.EditTelephone;
    this.authService.update_User(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
