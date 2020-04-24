import { LightningElement,api, track } from 'lwc';

export default class TrustService extends LightningElement {
    @api services;
    @api instance;

    get bannerClassName(){
        return this.instance.statusVariant+'BannerClass';
    }
}