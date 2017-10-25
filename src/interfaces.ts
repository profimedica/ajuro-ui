import {
    IAfterGuiAttachedParams,
    IFilterParams,
    IFilter
} from "../main";

export interface AgFrameworkComponent<T> {
    agInit(params:T) : void;

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void;
}


export interface IFilterAngularComp extends IFilter, AgFrameworkComponent<IFilterParams> {}

export interface AgFilterComponent extends IFilterAngularComp {}
