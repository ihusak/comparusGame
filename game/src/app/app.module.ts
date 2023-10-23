import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SettingsPopupComponent} from './popups/settings-popup/settings-popup.component';
import {EndGamePopupComponent} from './popups/end-game-popup/end-game-popup.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfoGamePopupComponent} from './popups/info-game-popup/info-game-popup.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SettingsPopupComponent,
    EndGamePopupComponent,
    InfoGamePopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [SettingsPopupComponent, EndGamePopupComponent, InfoGamePopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
