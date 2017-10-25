import {NgModule,ModuleWithProviders} from '@angular/core';
import {ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';

import {AjuroNg2} from './ajuroNg2';
import {Ng2ComponentFactory} from './ng2ComponentFactory';
import {BaseComponentFactory} from "./baseComponentFactory";
import {List} from "./ajuroColumn";

@NgModule({
    imports: [],
    declarations: [
        AjuroNg2,
        AjuroColumn
    ],
    exports: [
        AjuroNg2,
        AjuroColumn
    ]
})
export class AjuroModule {
    static withComponents(components:any):ModuleWithProviders {
        return {
            ngModule: AjuroModule,
            providers: [
                Ng2ComponentFactory,
                {provide: BaseComponentFactory, useExisting: Ng2ComponentFactory},
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ],
        };
    }

    static forRoot():ModuleWithProviders {
        console.warn("AjuroUIModule.forRoot() is deprecated - please use AjuroUIModule.withComponents([...optional components...]) instead.");
        return {
            ngModule: AjuroModule,
            providers: [
                Ng2ComponentFactory,
                {provide: BaseComponentFactory, useExisting: Ng2ComponentFactory}
            ],
        };
    }
}
