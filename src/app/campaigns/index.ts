import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CampaignsView} from "./campaigns.view";
// import {CampaignsView} from "./CampaignsView";
// import {MoodRatingSvg} from "./MoodRatingSvg";
// import {SharedModule} from "./SharedModule";
// import {AuthService} from "../../../services/AuthService";
// import {CommBroker} from "../../../services/CommBroker";
// import {Consts} from "../../../Conts";

export const LAZY_ROUTES = [
    { path: ':folder', component: CampaignsView },
    { path: ':folder/:id', component: CampaignsView },
    { path: '**', component: CampaignsView }
];


@NgModule({
    // imports: [SharedModule, CommonModule, RouterModule.forChild(LAZY_ROUTES)], // we import the modules this module will need like CommonModule for ngIf etc
    imports: [CommonModule, RouterModule.forChild(LAZY_ROUTES)], // we import the modules this module will need like CommonModule for ngIf etc
    declarations: [CampaignsView],// we declare so this module can use the components listed
    exports: [CampaignsView], // we export components so other importing modules of this module can use the components exported
    providers: [] // list any providers, keep in mind these will be available as NEW INSTANCE provider as this is a lazy loaded module (compared to global if not lazy loaded)
})
export class CampaignsModule {

    // here we are loading the GLOBAL service of AuthService
    // notice that it is not a new instance but shared among the entire app since we
    // used in SharedModule forRoot()... to make sure we ONLY PROVIDE AuthService when SharedModule is loaded
    // via main App, but when loaded via lazyloading, we DO NO provide it as we want the global AuthService.

    constructor(){}
    // constructor(authService: AuthService, private commBroker: CommBroker) {
    //     console.log('I am shared global AuthService ' + authService + ' ' + commBroker);
    //     this.commBroker.fire({
    //         fromInstance: self,
    //         event: Consts.Events().LAZYLOAD_COMPLETED,
    //         context: '',
    //         message: {}
    //     })
    // }
}