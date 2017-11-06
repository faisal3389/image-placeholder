import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesDirective } from './index';

@NgModule({
    imports: [ 
        CommonModule
    ],
    exports: [ 
        ImagesDirective
    ],
    declarations: [ 
        ImagesDirective
    ]
})
export class AngularImagePlaceholderModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularImagePlaceholderModule,
            providers: [
                ImagesDirective
            ]
        };
    }
}
