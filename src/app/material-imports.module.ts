import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';

const material = [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
];

const otherImport = [
    CommonModule
];

@NgModule({
    declarations: [],
    imports: otherImport.concat(material),
    exports: material
})
export class MaterialImportsModule {
}
